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
    "Bracket_ROOT": -0.30,
    "Housing_ROOT": 0.0,
    "Carrier_ROOT": 0.72,
    "Flange_ROOT": 1.48,
    "Cap_ROOT": 2.20,
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
    cam.location = (8.9, -13.8, 6.3)
    data.lens = 66
    data.sensor_width = 36
    look_at(cam, (0.15, -0.10, 0.05))
    scene.camera = cam
    return cam

def build_asset(materials):
    cast, satin, steel = materials

    # V0.1.1: preserve V7's authored asymmetric silhouette, but construct it as one
    # fabricated cast module rather than a generic enclosure with decorative bars.
    bracket = make_root("Bracket_ROOT", (-0.10, 0.38, 0.10))
    housing = make_root("Housing_ROOT", (0.0, 0.0, 0.0))
    carrier = make_root("Carrier_ROOT", (0.30, -0.10, 0.16))
    flange = make_root("Flange_ROOT", (0.62, -0.17, 0.34))
    cap = make_root("Cap_ROOT", (1.12, -0.24, 0.72))

    # Thin structural cradle behind the housing. Most of it is hidden in the assembled
    # state; visible shoulders/ears read as mounting structure, not a second enclosure.
    bracket_outline = [
        (-3.22, -0.70), (-2.72, -1.46), (-1.32, -1.78), (0.10, -1.62),
        (1.08, -1.82), (2.34, -1.22), (2.96, -0.34), (2.84, 0.78),
        (2.18, 1.36), (0.86, 1.64), (-0.48, 1.58), (-1.54, 1.82),
        (-2.62, 1.26), (-3.18, 0.36),
    ]
    extrude_polygon_xz("BracketCradle", bracket_outline, 0.22, bracket, satin, 0.075)

    # Four mounting ears sit outside the housing silhouette and visibly belong to the cradle.
    for idx, (x, z) in enumerate([
        (-2.74, 1.02),
        (2.42, 0.72),
        (-2.46, -1.08),
        (1.92, -1.28),
    ]):
        add_cylinder(f"MountBoss_{idx}", 0.30, 0.34, (x, -0.03, z), bracket, satin, 10, 0.040)
        add_cylinder(f"MountHole_{idx}", 0.12, 0.38, (x, -0.21, z), bracket, cast, 14, 0.018)

    # Dominant cast shell: deeper, more sculptural and intentionally asymmetric.
    housing_outline = [
        (-3.02, -0.44), (-2.56, -1.28), (-1.50, -1.66), (-0.24, -1.58),
        (0.72, -1.76), (1.82, -1.42), (2.62, -0.82), (2.94, 0.06),
        (2.62, 0.92), (1.72, 1.40), (0.54, 1.64), (-0.62, 1.50),
        (-1.42, 1.66), (-2.30, 1.18), (-2.88, 0.52),
    ]
    extrude_polygon_xz("HousingShell", housing_outline, 0.94, housing, cast, 0.145)

    # A stepped cast shoulder gives the shell construction depth without creating
    # another flat UI-like panel.
    shoulder_outline = [
        (-1.72, -0.56), (-1.24, -1.00), (-0.18, -1.16), (0.88, -0.96),
        (1.72, -0.48), (1.98, 0.18), (1.54, 0.82), (0.60, 1.10),
        (-0.52, 1.02), (-1.40, 0.62), (-1.84, 0.10),
    ]
    shoulder = extrude_polygon_xz("HousingShoulder", shoulder_outline, 0.28, housing, cast, 0.085)
    shoulder.location.y = -0.55

    # Short integrated ribs follow the shell's load path. No long bars cross the face.
    for idx, (loc, angle, length) in enumerate([
        ((-1.96, -0.58, 0.70), -18, 0.92),
        ((-1.78, -0.58, 0.24), -12, 0.82),
        ((-1.52, -0.58, -0.28), 8, 0.76),
    ]):
        add_box(
            f"HousingRib_{idx}",
            (length, 0.16, 0.13),
            loc,
            (0, math.radians(angle), 0),
            housing,
            cast,
            0.035,
        )

    # Integrated connector stays subordinate and low on the housing.
    add_box(
        "ConnectorBody",
        (0.96, 0.72, 0.62),
        (-2.62, -0.18, -1.18),
        (0, math.radians(-8), math.radians(-5)),
        housing,
        cast,
        0.075,
    )
    add_box(
        "ConnectorSocket",
        (0.46, 0.18, 0.25),
        (-2.70, -0.56, -1.18),
        (0, math.radians(-8), math.radians(-5)),
        housing,
        steel,
        0.022,
    )

    # Recessed carrier: small and dark, so it reads as the internal layer between
    # the cast shell and the bright precision interface.
    carrier_outline = [
        (-1.18, -0.72), (-0.70, -1.00), (0.32, -0.96), (1.02, -0.52),
        (1.20, 0.12), (0.84, 0.72), (0.08, 0.96), (-0.82, 0.82),
        (-1.22, 0.28),
    ]
    extrude_polygon_xz("CarrierBody", carrier_outline, 0.34, carrier, cast, 0.070)

    # Precision flange is the bright cue, but deliberately smaller than the housing.
    flange_outline = [
        (-1.16, -0.60), (-0.62, -0.94), (0.30, -0.90), (0.98, -0.46),
        (1.12, 0.16), (0.76, 0.74), (0.04, 0.92), (-0.78, 0.76),
        (-1.18, 0.22),
    ]
    extrude_polygon_xz("MachinedFlange", flange_outline, 0.26, flange, satin, 0.065)

    inner = [
        (-0.62, -0.32), (-0.18, -0.54), (0.42, -0.46), (0.66, -0.08),
        (0.52, 0.40), (0.02, 0.54), (-0.48, 0.36), (-0.68, 0.02),
    ]
    inset = extrude_polygon_xz("FlangeInset", inner, 0.10, flange, cast, 0.025)
    inset.location.y = -0.19

    for idx, (x, z) in enumerate([
        (-0.78, 0.42),
        (0.64, 0.48),
        (0.74, -0.36),
    ]):
        add_cylinder(f"FlangeBolt_{idx}", 0.095, 0.15, (x, -0.21, z), flange, steel, 6, 0.016)

    # Small service cap, offset high/right like the approved V7 object. It should read
    # as the last removable layer, not as a gadget face.
    cap_outline = [
        (-0.86, -0.46), (-0.38, -0.68), (0.34, -0.62), (0.80, -0.24),
        (0.82, 0.34), (0.36, 0.62), (-0.36, 0.58), (-0.84, 0.18),
    ]
    extrude_polygon_xz("ServiceCap", cap_outline, 0.22, cap, satin, 0.060)

    # Three restrained grip/vent slots; no screen or pause-icon language.
    for i in range(3):
        add_box(
            f"CapSlot_{i}",
            (0.11, 0.11, 0.42),
            (-0.24 + i * 0.24, -0.17, 0.00),
            (0, math.radians(-5), 0),
            cap,
            cast,
            0.016,
        )

    for root in [bracket, housing, carrier, flange, cap]:
        key_explode(root, PART_EXPLODE[root.name])

    master = bpy.data.objects.new("HeroObject_ROOT", None)
    bpy.context.collection.objects.link(master)
    master.rotation_euler = (math.radians(7), math.radians(-13), math.radians(-7))
    for root in [bracket, housing, carrier, flange, cap]:
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

    # V0.1.1 keeps the object floating like the approved V7 composition. Inter-layer
    # occlusion and raking reflections provide depth without a literal product-photo floor.
    add_area("Key_Softbox_TopLeft", (-5.2, -6.0, 7.8), 860, 5.8, (0.96, 0.98, 1.0))
    add_area("Separation_Rake_Right", (5.2, 1.8, 6.8), 760, 2.8, (0.70, 0.82, 1.0))
    add_area("Low_Front_Fill", (2.0, -5.4, 0.8), 95, 4.6, (0.76, 0.84, 1.0))

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

    cast = make_material("MAT_CastGraphite", (0.020, 0.030, 0.046), 0.34, 0.60)
    satin = make_material("MAT_SatinCoolMetal", (0.34, 0.41, 0.49), 0.88, 0.27)
    steel = make_material("MAT_SteelHardware", (0.58, 0.63, 0.68), 0.98, 0.20)
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
