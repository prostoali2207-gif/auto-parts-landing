import argparse
import json
import math
import os
import sys
from pathlib import Path

import bpy
import bmesh
from mathutils import Vector

# Applied task: fictional abstract automotive mechanical hero-object.
# No real SKU, dimensions, OEM markings, brand or fitment are represented.

FRAME_ASSEMBLED = 1
FRAME_EXPLODED = 40
ASSEMBLY_AXIS = Vector((0.82, -0.28, 0.50)).normalized()

PART_EXPLODE = {
    "Backplate_ROOT": -1.00,
    "Bracket_ROOT": -0.50,
    "Housing_ROOT": 0.0,
    "Carrier_ROOT": 1.08,
    "Flange_ROOT": 1.76,
    "Cap_ROOT": 2.42,
}

def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    p = argparse.ArgumentParser()
    p.add_argument("--out-dir", required=True)
    p.add_argument("--preview", action="store_true")
    p.add_argument("--render-only", action="store_true")
    return p.parse_args(argv)

def clean_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)

def set_engine(scene, preview=False):
    try:
        scene.render.engine = "BLENDER_EEVEE_NEXT"
    except Exception:
        scene.render.engine = "BLENDER_EEVEE"
    if hasattr(scene, "eevee"):
        if hasattr(scene.eevee, "taa_render_samples"):
            scene.eevee.taa_render_samples = 32 if preview else 96
        if hasattr(scene.eevee, "use_gtao"):
            scene.eevee.use_gtao = True
            scene.eevee.gtao_distance = 3
            scene.eevee.gtao_factor = 1.2

def make_material(name, base, metallic, roughness):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*base, 1.0)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    return mat

def add_bevel(obj, width=0.07, segments=3):
    if hasattr(obj.data, "use_auto_smooth"):
        obj.data.use_auto_smooth = True
    bev = obj.modifiers.new("Edge bevel", "BEVEL")
    bev.width = width
    bev.segments = segments
    bev.limit_method = "ANGLE"
    try:
        wn = obj.modifiers.new("Weighted normals", "WEIGHTED_NORMAL")
        wn.keep_sharp = True
    except Exception:
        pass
    for poly in obj.data.polygons:
        poly.use_smooth = True

def extrude_polygon_xz(name, points, depth, parent, material, bevel=0.06):
    # points are (x,z), expected non-self-intersecting and ordered around the perimeter.
    n = len(points)
    verts = [(x, -depth / 2, z) for x, z in points] + [(x, depth / 2, z) for x, z in points]
    faces = []
    faces.append(tuple(reversed(range(n))))
    faces.append(tuple(range(n, 2 * n)))
    for i in range(n):
        j = (i + 1) % n
        faces.append((i, j, n + j, n + i))

    mesh = bpy.data.meshes.new(name + "_Mesh")
    mesh.from_pydata(verts, [], faces)
    mesh.validate()
    mesh.update()

    bm = bmesh.new()
    bm.from_mesh(mesh)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(mesh)
    bm.free()

    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.parent = parent
    obj.data.materials.append(material)
    add_bevel(obj, bevel, 4)
    return obj

def css_polygon(width_px, height_px, percent_points, scale=0.013):
    """Convert the approved CSS clip-path percentage polygon to centered Blender X/Z coordinates."""
    return [
        (((px / 100.0) - 0.5) * width_px * scale,
         (0.5 - (py / 100.0)) * height_px * scale)
        for px, py in percent_points
    ]

def add_cast_grain(mat):
    """Very restrained procedural micro-surface; construction stays readable, not phototextured."""
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    bsdf = nodes.get("Principled BSDF")
    if not bsdf:
        return
    noise = nodes.new("ShaderNodeTexNoise")
    noise.name = "Cast micrograin"
    noise.inputs["Scale"].default_value = 22.0
    noise.inputs["Detail"].default_value = 2.0
    noise.inputs["Roughness"].default_value = 0.62
    bump = nodes.new("ShaderNodeBump")
    bump.name = "Cast micro-bump"
    bump.inputs["Strength"].default_value = 0.07
    bump.inputs["Distance"].default_value = 0.035
    links.new(noise.outputs["Fac"], bump.inputs["Height"])
    links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])


def add_box(name, dims, loc, rot, parent, material, bevel=0.05):
    bpy.ops.mesh.primitive_cube_add(size=1)
    obj = bpy.context.object
    obj.name = name
    obj.parent = parent
    obj.location = loc
    obj.rotation_euler = rot
    obj.dimensions = dims
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(material)
    add_bevel(obj, bevel, 3)
    return obj

def add_cylinder(name, radius, depth, loc, parent, material, vertices=8, bevel=0.04):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth)
    obj = bpy.context.object
    obj.name = name
    obj.parent = parent
    obj.location = loc
    obj.rotation_euler = (math.radians(90), 0, 0)
    obj.data.materials.append(material)
    add_bevel(obj, bevel, 2)
    return obj

def make_root(name, loc):
    root = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(root)
    root.location = loc
    return root

def key_explode(root, distance):
    base = root.location.copy()
    root.location = base
    root.keyframe_insert(data_path="location", frame=FRAME_ASSEMBLED)
    root.location = base + ASSEMBLY_AXIS * distance
    root.keyframe_insert(data_path="location", frame=FRAME_EXPLODED)

def add_area(name, loc, energy, size, color, target=(0, 0, 0.2)):
    data = bpy.data.lights.new(name, "AREA")
    data.energy = energy
    data.shape = "DISK"
    data.size = size
    data.color = color
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    obj.location = loc
    direction = Vector(target) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    return obj

def look_at(obj, target):
    direction = Vector(target) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()

def setup_camera(scene):
    data = bpy.data.cameras.new("HeroCamera")
    cam = bpy.data.objects.new("HeroCamera", data)
    bpy.context.collection.objects.link(cam)
    cam.location = (4.8, -15.4, 4.9)
    data.lens = 72
    data.sensor_width = 36
    look_at(cam, (0.35, -0.25, 0.18))
    scene.camera = cam
    return cam

def build_asset(materials):
    cast, satin, steel = materials

    # v0.1.2 derives its primary 2D proportions directly from the approved V7 CSS geometry.
    # 3D adds real thickness, bevel response and ordered depth; it does not invent a new silhouette.
    backplate = make_root("Backplate_ROOT", (0.0, 0.58, 0.0))
    bracket = make_root("Bracket_ROOT", (0.0, 0.28, 0.0))
    housing = make_root("Housing_ROOT", (0.0, 0.00, 0.0))
    carrier = make_root("Carrier_ROOT", (0.0, -0.58, 0.0))
    flange = make_root("Flange_ROOT", (0.0, -0.88, 0.0))
    cap = make_root("Cap_ROOT", (0.0, -1.18, 0.0))

    backplate_points = css_polygon(474, 326, [
        (0,33),(9,18),(22,16),(29,6),(66,0),(83,8),(89,17),(98,21),
        (100,46),(94,66),(86,70),(78,88),(60,91),(52,100),(25,91),
        (17,80),(6,78),(0,62),
    ])
    extrude_polygon_xz("BackplateBody", backplate_points, 0.30, backplate, cast, 0.10)

    # Two explicit mounting ears from the approved rear-plate language.
    for idx, (x, z) in enumerate([(-2.55, 1.16), (2.45, -1.02)]):
        add_cylinder(f"BackplateBoss_{idx}", 0.31, 0.34, (x, -0.03, z), backplate, cast, 10, 0.04)
        add_cylinder(f"BackplateHole_{idx}", 0.115, 0.38, (x, -0.20, z), backplate, steel, 14, 0.018)

    bracket_points = css_polygon(382, 274, [
        (0,27),(8,14),(21,16),(29,5),(65,0),(74,9),(92,12),(100,31),
        (95,54),(88,57),(83,88),(70,88),(63,100),(35,94),(28,83),
        (10,82),(3,64),
    ])
    extrude_polygon_xz("BracketBody", bracket_points, 0.28, bracket, satin, 0.085)

    housing_points = css_polygon(372, 238, [
        (0,30),(10,14),(24,13),(31,5),(66,0),(77,8),(93,12),(100,34),
        (94,63),(84,70),(78,88),(57,96),(48,100),(20,90),(13,81),(4,76),
    ])
    extrude_polygon_xz("HousingShell", housing_points, 0.82, housing, cast, 0.13)

    # One stepped shell shoulder and three short structural ribs: true geometry,
    # but sourced from the current V7 construction language rather than decorative greebles.
    shoulder_points = css_polygon(250, 138, [
        (3,27),(17,10),(73,0),(97,23),(90,73),(72,93),(28,100),(4,78),
    ])
    shoulder = extrude_polygon_xz("HousingShoulder", shoulder_points, 0.24, housing, cast, 0.07)
    shoulder.location = (0.42, -0.52, -0.02)

    for idx, (loc, angle, length) in enumerate([
        ((-1.78, -0.52, 0.70), -10, 0.88),
        ((-1.64, -0.52, 0.25), -7, 0.78),
        ((-1.43, -0.52, -0.22), 6, 0.68),
    ]):
        add_box(
            f"HousingRib_{idx}",
            (length, 0.15, 0.115),
            loc,
            (0, math.radians(angle), 0),
            housing,
            cast,
            0.028,
        )

    # Connector matches the current V7 placement and remains attached to the housing family.
    add_box(
        "ConnectorBody",
        (0.98, 0.68, 0.58),
        (-2.40, -0.18, -1.46),
        (0, math.radians(-9), math.radians(-7)),
        housing,
        cast,
        0.065,
    )
    add_box(
        "ConnectorSocket",
        (0.48, 0.16, 0.25),
        (-2.49, -0.55, -1.46),
        (0, math.radians(-9), math.radians(-7)),
        housing,
        steel,
        0.020,
    )

    carrier_points = css_polygon(204, 146, [
        (6,25),(17,8),(70,0),(91,13),(100,42),(91,81),(72,100),
        (26,93),(5,74),(0,45),
    ])
    extrude_polygon_xz("CarrierBody", carrier_points, 0.34, carrier, cast, 0.070)

    # Dark carrier inset creates a pocket read while preserving the approved non-circular shape.
    carrier_inset_points = css_polygon(119, 76, [
        (8,16),(83,0),(100,24),(90,86),(14,100),(0,71),
    ])
    carrier_inset = extrude_polygon_xz("CarrierInset", carrier_inset_points, 0.10, carrier, cast, 0.025)
    carrier_inset.location.y = -0.18

    flange_points = css_polygon(230, 180, [
        (9,22),(20,7),(65,0),(86,11),(100,35),(93,71),(76,92),
        (39,100),(14,88),(0,61),
    ])
    extrude_polygon_xz("MachinedFlange", flange_points, 0.26, flange, satin, 0.065)

    flange_inset_points = css_polygon(149, 109, [
        (8,18),(75,0),(100,27),(90,82),(61,100),(11,91),(0,57),
    ])
    flange_inset = extrude_polygon_xz("FlangeInset", flange_inset_points, 0.10, flange, cast, 0.025)
    flange_inset.location.y = -0.17

    for idx, (x, z) in enumerate([
        (-0.78, 0.55),
        (0.78, 0.58),
        (0.92, -0.48),
        (-0.72, -0.55),
    ]):
        add_cylinder(f"FlangeBolt_{idx}", 0.090, 0.15, (x, -0.19, z), flange, steel, 6, 0.015)

    cap_points = css_polygon(158, 120, [
        (8,18),(73,0),(94,13),(100,43),(89,82),(63,100),(17,91),(0,63),
    ])
    extrude_polygon_xz("ServiceCap", cap_points, 0.22, cap, satin, 0.055)

    # One asymmetrical inset with five varied diagonal grip/vent ribs.
    cap_inset_points = css_polygon(86, 46, [
        (6,16),(83,0),(100,24),(90,86),(16,100),(0,66),
    ])
    cap_inset = extrude_polygon_xz("CapInset", cap_inset_points, 0.08, cap, cast, 0.018)
    cap_inset.location.y = -0.15

    vent_data = [
        (-0.32, 0.03, 0.33, -9),
        (-0.15, 0.00, 0.39, -7),
        (0.03, -0.02, 0.35, -5),
        (0.20, -0.01, 0.30, -3),
        (0.35, 0.03, 0.24, -1),
    ]
    for i, (x, z, length, angle) in enumerate(vent_data):
        add_box(
            f"CapVent_{i}",
            (0.055, 0.055, length),
            (x, -0.205, z),
            (0, 0, math.radians(angle)),
            cap,
            steel,
            0.010,
        )

    roots = [backplate, bracket, housing, carrier, flange, cap]
    for root in roots:
        key_explode(root, PART_EXPLODE[root.name])

    master = bpy.data.objects.new("HeroObject_ROOT", None)
    bpy.context.collection.objects.link(master)
    master.rotation_euler = (math.radians(7), math.radians(-10), math.radians(-8))
    for root in roots:
        root.parent = master

    return master

def setup_scene(scene, preview):
    set_engine(scene, preview)
    scene.render.resolution_x = 960 if preview else 1400
    scene.render.resolution_y = 720 if preview else 1050
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.film_transparent = False

    try:
        scene.view_settings.view_transform = "AgX"
    except Exception:
        try:
            scene.view_settings.view_transform = "Filmic"
        except Exception:
            pass

    world = bpy.data.worlds.new("World")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    bg.inputs["Color"].default_value = (0.006, 0.012, 0.022, 1)
    bg.inputs["Strength"].default_value = 0.18

    # V0.1.2: preserve raking highlights, but restore enough frontal information
    # that cast construction remains visible in the assembled hero state.
    add_area("Key_Softbox_TopLeft", (-5.0, -6.5, 7.8), 1030, 6.2, (0.96, 0.98, 1.0))
    add_area("Separation_Rake_Right", (5.5, 2.2, 6.5), 650, 3.0, (0.72, 0.83, 1.0))
    add_area("Controlled_Front_Fill", (1.0, -6.5, 1.7), 185, 5.0, (0.80, 0.87, 1.0))

    return None

def render(scene, path):
    scene.render.filepath = str(path)
    bpy.ops.render.render(write_still=True)
    if not path.exists():
        raise RuntimeError(f"render missing: {path}")

def evaluated_report(asset_objects, materials, glb_path, blender_version):
    depsgraph = bpy.context.evaluated_depsgraph_get()
    tri_count = 0
    mesh_count = 0
    object_rows = []

    for obj in asset_objects:
        if obj.type != "MESH":
            continue
        mesh_count += 1
        eval_obj = obj.evaluated_get(depsgraph)
        mesh = eval_obj.to_mesh()
        mesh.calc_loop_triangles()
        tris = len(mesh.loop_triangles)
        tri_count += tris
        object_rows.append({"name": obj.name, "triangles": tris})
        eval_obj.to_mesh_clear()

    return {
        "blender_version": blender_version,
        "frames": {"assembled": FRAME_ASSEMBLED, "exploded": FRAME_EXPLODED},
        "assembly_axis": [round(v, 6) for v in ASSEMBLY_AXIS],
        "mesh_objects": mesh_count,
        "triangles": tri_count,
        "materials": [m.name for m in materials],
        "material_count": len(materials),
        "objects": sorted(object_rows, key=lambda x: x["name"]),
        "glb_bytes": glb_path.stat().st_size if glb_path.exists() else 0,
        "truth_status": "fictional_art_direction_no_real_sku_claims",
    }

def export_glb(glb_path, asset_objects):
    bpy.ops.object.select_all(action="DESELECT")
    for obj in asset_objects:
        obj.select_set(True)

    kwargs = dict(
        filepath=str(glb_path),
        export_format="GLB",
        use_selection=True,
        export_animations=True,
    )
    try:
        bpy.ops.export_scene.gltf(**kwargs)
    except TypeError:
        kwargs.pop("export_animations", None)
        bpy.ops.export_scene.gltf(**kwargs)

    if not glb_path.exists():
        raise RuntimeError("GLB export missing")

def main():
    args = parse_args()
    out_dir = Path(args.out_dir).resolve()
    out_dir.mkdir(parents=True, exist_ok=True)

    clean_scene()
    scene = bpy.context.scene
    floor = setup_scene(scene, args.preview)

    cast = make_material("MAT_CastGraphite", (0.085, 0.110, 0.145), 0.46, 0.50)
    add_cast_grain(cast)
    satin = make_material("MAT_SatinCoolMetal", (0.43, 0.50, 0.58), 0.88, 0.27)
    steel = make_material("MAT_SteelHardware", (0.62, 0.67, 0.72), 0.98, 0.19)
    materials = [cast, satin, steel]

    master = build_asset(materials)
    cam = setup_camera(scene)

    asset_objects = [master] + list(master.children_recursive)

    # Assembled diagnostic.
    scene.frame_set(FRAME_ASSEMBLED)
    render(scene, out_dir / "hero-assembled.png")

    # Exploded hero.
    scene.frame_set(FRAME_EXPLODED)
    render(scene, out_dir / "hero-exploded.png")

    # Alternate angle for construction/thickness diagnosis.
    original_loc = cam.location.copy()
    original_rot = cam.rotation_euler.copy()
    cam.location = (-6.8, -10.2, 4.6)
    look_at(cam, (0.0, -0.2, 0.0))
    render(scene, out_dir / "hero-alt.png")
    cam.location = original_loc
    cam.rotation_euler = original_rot

    blend_path = out_dir / "hero-object.blend"
    bpy.ops.wm.save_as_mainfile(filepath=str(blend_path))

    glb_path = out_dir / "hero-object.glb"
    if not args.render_only:
        export_glb(glb_path, asset_objects)

    report = evaluated_report(asset_objects, materials, glb_path, bpy.app.version_string)
    report["camera"] = {
        "location": [round(v, 4) for v in cam.location],
        "lens_mm": cam.data.lens,
    }
    report["lights"] = [
        {"name": o.name, "energy": o.data.energy}
        for o in bpy.context.scene.objects if o.type == "LIGHT"
    ]
    (out_dir / "asset-report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

    print("SCENE_JSON " + json.dumps(report, sort_keys=True))
    print("HERO_3D_RENDER_ONLY_OK" if args.render_only else "HERO_3D_OK")

if __name__ == "__main__":
    main()
