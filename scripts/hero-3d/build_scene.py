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
ASSEMBLY_AXIS = Vector((0.55, -1.0, 0.36)).normalized()

PART_EXPLODE = {
    "Bracket_ROOT": -0.55,
    "Housing_ROOT": 0.0,
    "Carrier_ROOT": 0.78,
    "Flange_ROOT": 1.42,
    "Cap_ROOT": 2.02,
}

def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    p = argparse.ArgumentParser()
    p.add_argument("--out-dir", required=True)
    p.add_argument("--preview", action="store_true")
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
    cam.location = (7.6, -11.8, 5.6)
    data.lens = 58
    data.sensor_width = 36
    look_at(cam, (0.15, -0.25, 0.1))
    scene.camera = cam
    return cam

def build_asset(materials):
    cast, satin, steel = materials

    bracket = make_root("Bracket_ROOT", (0, 0.42, 0))
    housing = make_root("Housing_ROOT", (0, 0.0, 0))
    carrier = make_root("Carrier_ROOT", (0.22, -0.08, 0.12))
    flange = make_root("Flange_ROOT", (0.48, -0.16, 0.24))
    cap = make_root("Cap_ROOT", (0.72, -0.22, 0.34))

    bracket_outline = [
        (-3.15, -0.75), (-2.72, -1.48), (-1.48, -1.76), (-0.45, -1.66),
        (0.18, -1.98), (1.32, -1.58), (2.38, -1.12), (2.86, -0.18),
        (2.62, 0.90), (1.78, 1.45), (0.66, 1.66), (-0.35, 1.52),
        (-1.18, 1.76), (-2.30, 1.34), (-2.84, 0.62), (-3.22, 0.05),
    ]
    extrude_polygon_xz("BracketBody", bracket_outline, 0.28, bracket, satin, 0.08)

    # Mounting ears and structural ribs.
    for idx, (x, z) in enumerate([(-2.55, 1.04), (2.24, 0.72), (-2.42, -1.05), (1.88, -1.18)]):
        add_cylinder(f"BracketEar_{idx}", 0.34, 0.36, (x, -0.02, z), bracket, satin, 8, 0.045)
        add_cylinder(f"BracketEarHole_{idx}", 0.13, 0.39, (x, -0.205, z), bracket, cast, 12, 0.02)

    add_box("BracketRib_A", (2.85, 0.18, 0.16), (-0.88, -0.19, 0.58), (0, math.radians(-8), 0), bracket, satin, 0.035)
    add_box("BracketRib_B", (2.25, 0.18, 0.15), (0.58, -0.19, -0.68), (0, math.radians(20), 0), bracket, satin, 0.035)

    housing_outline = [
        (-2.72, -0.58), (-2.18, -1.35), (-0.84, -1.66), (0.28, -1.54),
        (1.08, -1.75), (2.05, -1.18), (2.62, -0.32), (2.52, 0.74),
        (1.72, 1.36), (0.42, 1.66), (-0.84, 1.56), (-1.78, 1.28),
        (-2.46, 0.62), (-2.80, 0.00),
    ]
    extrude_polygon_xz("HousingShell", housing_outline, 0.62, housing, cast, 0.10)

    # Raised construction ribs on the cast shell.
    add_box("HousingRib_A", (3.55, 0.15, 0.14), (-0.55, -0.39, 0.72), (0, math.radians(-9), 0), housing, cast, 0.035)
    add_box("HousingRib_B", (2.75, 0.15, 0.13), (0.28, -0.39, -0.46), (0, math.radians(24), 0), housing, cast, 0.035)
    add_box("HousingSpine", (0.18, 0.17, 2.25), (-1.42, -0.39, -0.04), (0, math.radians(-7), 0), housing, cast, 0.035)

    # Side connector integrated with housing.
    add_box("ConnectorBody", (1.05, 0.62, 0.74), (-2.64, -0.16, -1.18), (0, math.radians(-7), math.radians(-8)), housing, cast, 0.07)
    add_box("ConnectorSocket", (0.55, 0.16, 0.30), (-2.72, -0.52, -1.17), (0, math.radians(-7), math.radians(-8)), housing, steel, 0.025)

    carrier_outline = [
        (-1.45, -0.82), (-0.95, -1.14), (0.42, -1.05), (1.22, -0.62),
        (1.42, 0.16), (1.02, 0.82), (0.18, 1.08), (-0.92, 0.94),
        (-1.42, 0.38),
    ]
    extrude_polygon_xz("CarrierBody", carrier_outline, 0.40, carrier, cast, 0.075)
    add_box("CarrierRecess", (1.35, 0.16, 0.72), (0.05, -0.29, 0.0), (0, math.radians(-7), 0), carrier, cast, 0.04)

    flange_outline = [
        (-1.48, -0.82), (-0.78, -1.20), (0.42, -1.18), (1.28, -0.58),
        (1.50, 0.26), (1.06, 0.96), (0.16, 1.22), (-0.96, 1.02), (-1.52, 0.30),
    ]
    extrude_polygon_xz("MachinedFlange", flange_outline, 0.30, flange, satin, 0.07)
    # Keyed central opening language via a recessed dark carrier plate, deliberately non-circular.
    inner = [
        (-0.82, -0.42), (-0.28, -0.72), (0.52, -0.62), (0.86, -0.10),
        (0.68, 0.52), (0.10, 0.72), (-0.62, 0.52), (-0.88, 0.04),
    ]
    inner_obj = extrude_polygon_xz("FlangeInset", inner, 0.08, flange, cast, 0.025)
    inner_obj.location.y = -0.19

    for idx, (x, z) in enumerate([(-0.98, 0.56), (0.82, 0.64), (1.02, -0.46), (-0.72, -0.72)]):
        add_cylinder(f"FlangeBolt_{idx}", 0.11, 0.16, (x, -0.22, z), flange, steel, 6, 0.018)

    cap_outline = [
        (-1.04, -0.62), (-0.42, -0.88), (0.48, -0.74), (1.02, -0.20),
        (0.96, 0.54), (0.34, 0.86), (-0.54, 0.78), (-1.08, 0.28),
    ]
    extrude_polygon_xz("ServiceCap", cap_outline, 0.24, cap, satin, 0.065)
    # Mechanical vent/grip slots — no screen/lens semantics.
    for i in range(4):
        add_box(
            f"CapSlot_{i}",
            (0.18, 0.10, 0.62),
            (-0.42 + i * 0.28, -0.17, -0.02 + (i % 2) * 0.04),
            (0, math.radians(-6), math.radians(-4)),
            cap,
            cast,
            0.02,
        )

    for root in [bracket, housing, carrier, flange, cap]:
        key_explode(root, PART_EXPLODE[root.name])

    master = bpy.data.objects.new("HeroObject_ROOT", None)
    bpy.context.collection.objects.link(master)
    master.rotation_euler = (math.radians(4), math.radians(-6), math.radians(-4))
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

    # Dark studio floor: gives soft physical grounding without making the hero a literal product photo.
    bpy.ops.mesh.primitive_plane_add(size=30, location=(0, 1.4, -2.55))
    floor = bpy.context.object
    floor.name = "StudioFloor"
    floor_mat = bpy.data.materials.new("StudioFloorMat")
    floor_mat.use_nodes = True
    bsdf = floor_mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.008, 0.016, 0.030, 1)
    bsdf.inputs["Roughness"].default_value = 0.72
    floor.data.materials.append(floor_mat)

    add_area("Key_Softbox_TopLeft", (-4.5, -5.5, 7.5), 1050, 5.5, (0.94, 0.97, 1.0))
    add_area("Fill_FrontRight", (5.4, -4.2, 2.5), 300, 4.5, (0.72, 0.82, 1.0))
    add_area("Separation_Rake", (3.8, 2.8, 6.2), 780, 3.0, (0.72, 0.84, 1.0))
    add_area("Low_Fill", (-1.0, -2.0, -0.6), 120, 3.5, (0.80, 0.86, 1.0), target=(0, 0, -0.3))

    return floor

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

    cast = make_material("MAT_CastGraphite", (0.065, 0.085, 0.115), 0.58, 0.48)
    satin = make_material("MAT_SatinCoolMetal", (0.36, 0.43, 0.51), 0.82, 0.29)
    steel = make_material("MAT_SteelHardware", (0.52, 0.58, 0.64), 0.92, 0.23)
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
    print("HERO_3D_OK")

if __name__ == "__main__":
    main()
