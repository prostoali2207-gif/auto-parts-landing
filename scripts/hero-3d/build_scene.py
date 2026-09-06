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
    "Cap_ROOT": 2.28,
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
    if bevel > 0:
        add_bevel(obj, bevel, 4)
    return obj

def loft_polygon_xz(name, points, profiles, parent, material, bevel=0.06):
    """Build a drafted/tapered solid from the same 2D envelope at several Y-depth profiles.
    profiles: [(y, scale_x, scale_z, offset_x, offset_z), ...] front-to-back.
    """
    n = len(points)
    verts = []
    for y, sx, sz, ox, oz in profiles:
        verts.extend([(x * sx + ox, y, z * sz + oz) for x, z in points])

    faces = []
    # Front/back caps.
    faces.append(tuple(reversed(range(n))))
    back_start = (len(profiles) - 1) * n
    faces.append(tuple(range(back_start, back_start + n)))

    # Connect profile rings.
    for p in range(len(profiles) - 1):
        a = p * n
        b = (p + 1) * n
        for i in range(n):
            j = (i + 1) % n
            faces.append((a + i, a + j, b + j, b + i))

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
    if bevel > 0:
        add_bevel(obj, bevel, 4)
    return obj

def boolean_difference(target, cutter, name="Recess cut"):
    """Apply one deterministic local pocket/opening cut, then remove the cutter."""
    bpy.ops.object.select_all(action="DESELECT")
    target.select_set(True)
    bpy.context.view_layer.objects.active = target
    mod = target.modifiers.new(name, "BOOLEAN")
    mod.operation = "DIFFERENCE"
    if hasattr(mod, "solver"):
        mod.solver = "EXACT"
    mod.object = cutter
    bpy.ops.object.modifier_apply(modifier=mod.name)
    bpy.data.objects.remove(cutter, do_unlink=True)

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

    # v0.1.3 preserves V7's asymmetric envelope, but stops treating every layer as a flat plate.
    # The main shell is a drafted lofted volume with a real recessed pocket and integrated bosses.
    backplate = make_root("Backplate_ROOT", (0.0, 0.52, 0.0))
    bracket = make_root("Bracket_ROOT", (-0.05, 0.24, 0.02))
    housing = make_root("Housing_ROOT", (0.0, 0.0, 0.0))
    carrier = make_root("Carrier_ROOT", (0.50, -0.40, 0.16))
    flange = make_root("Flange_ROOT", (0.78, -0.98, 0.34))
    cap = make_root("Cap_ROOT", (1.58, -1.30, 0.88))

    backplate_points = css_polygon(474, 326, [
        (0,33),(9,18),(22,16),(29,6),(66,0),(83,8),(89,17),(98,21),
        (100,46),(94,66),(86,70),(78,88),(60,91),(52,100),(25,91),
        (17,80),(6,78),(0,62),
    ])
    loft_polygon_xz(
        "BackplateBody",
        backplate_points,
        [(-0.16, 0.96, 0.96, 0.08, -0.02),
         (0.02, 1.00, 1.00, 0.00, 0.00),
         (0.20, 1.03, 1.02, -0.05, 0.03)],
        backplate, cast, 0.085
    )

    for idx, (x, z) in enumerate([(-2.55, 1.10), (2.42, -1.04)]):
        add_cylinder(f"BackplateBoss_{idx}", 0.30, 0.34, (x, -0.08, z), backplate, cast, 12, 0.038)
        add_cylinder(f"BackplateFastener_{idx}", 0.105, 0.10, (x, -0.28, z), backplate, steel, 8, 0.015)

    bracket_points = css_polygon(382, 274, [
        (0,27),(8,14),(21,16),(29,5),(65,0),(74,9),(92,12),(100,31),
        (95,54),(88,57),(83,88),(70,88),(63,100),(35,94),(28,83),
        (10,82),(3,64),
    ])
    bracket_body = loft_polygon_xz(
        "BracketBody",
        bracket_points,
        [(-0.17, 0.94, 0.94, 0.10, -0.02),
         (0.02, 0.99, 0.99, 0.00, 0.00),
         (0.19, 1.02, 1.01, -0.06, 0.03)],
        bracket, satin, 0.0
    )
    bracket_open_points = css_polygon(250, 168, [
        (5,28),(18,10),(67,0),(92,16),(100,39),(91,72),(74,92),
        (38,100),(14,88),(0,61),
    ])
    bracket_cutter = extrude_polygon_xz(
        "BracketOpening_CUTTER", bracket_open_points, 0.58, None, cast, 0.0
    )
    bracket_cutter.location = (0.18, 0.0, -0.02)
    boolean_difference(bracket_body, bracket_cutter, "Open structural bracket")
    add_bevel(bracket_body, 0.065, 3)

    housing_points = css_polygon(372, 238, [
        (0,30),(10,14),(24,13),(31,5),(66,0),(77,8),(93,12),(100,34),
        (94,63),(84,70),(78,88),(57,96),(48,100),(20,90),(13,81),(4,76),
    ])

    housing_body = loft_polygon_xz(
        "HousingShell",
        housing_points,
        [(-0.58, 0.84, 0.88, 0.24, -0.04),
         (-0.30, 0.91, 0.94, 0.14, -0.01),
         (0.06, 0.98, 1.00, 0.02, 0.00),
         (0.48, 1.04, 1.03, -0.12, 0.03)],
        housing, cast, 0.0
    )

    # Genuine shallow pocket in the cast shell, not another dark plate laid on top.
    pocket_points = css_polygon(214, 126, [
        (4,29),(17,12),(71,0),(96,22),(90,72),(70,94),(28,100),(4,78),
    ])
    pocket_cutter = extrude_polygon_xz(
        "HousingPocket_CUTTER", pocket_points, 0.34, None, cast, 0.0
    )
    pocket_cutter.location = (0.34, -0.60, -0.02)
    boolean_difference(housing_body, pocket_cutter, "Housing recessed pocket")

    # Deep keyed mating cavity: visible cast wall depth behind the precision flange.
    mating_cavity_points = css_polygon(170, 112, [
        (6,22),(20,7),(72,0),(94,18),(100,43),(88,82),(66,100),
        (25,92),(5,72),(0,42),
    ])
    mating_cavity_cutter = extrude_polygon_xz(
        "HousingMatingCavity_CUTTER", mating_cavity_points, 0.74, None, cast, 0.0
    )
    mating_cavity_cutter.location = (0.50, -0.46, 0.16)
    boolean_difference(housing_body, mating_cavity_cutter, "Deep keyed mating cavity")
    add_bevel(housing_body, 0.115, 4)

    # Two front interface bosses plus two protruding mounting ears.
    for idx, (x, z, r) in enumerate([
        (-1.46, 0.62, 0.22),
        (1.22, -0.58, 0.20),
    ]):
        add_cylinder(f"HousingBoss_{idx}", r, 0.24, (x, -0.52, z), housing, cast, 12, 0.038)
        add_cylinder(f"HousingBossSeat_{idx}", r * 0.36, 0.072, (x, -0.68, z), housing, steel, 8, 0.011)

    # Mounting ears extend the silhouette and make the object's attachment logic explicit.
    ear_specs = [
        ("UpperLeft", (-2.36, -0.12, 0.92), (-2.72, -0.16, 1.02), -10),
        ("LowerRight", (2.12, -0.12, -0.78), (2.46, -0.16, -0.92), 12),
    ]
    for name, stem_loc, boss_loc, angle in ear_specs:
        add_box(
            f"HousingEarStem_{name}",
            (0.74, 0.42, 0.32),
            stem_loc,
            (0, math.radians(angle), 0),
            housing,
            cast,
            0.055,
        )
        add_cylinder(
            f"HousingEarBoss_{name}",
            0.28, 0.34, boss_loc, housing, cast, 12, 0.040
        )
        add_cylinder(
            f"HousingEarHole_{name}",
            0.105, 0.10, (boss_loc[0], -0.36, boss_loc[2]), housing, steel, 8, 0.014
        )

    # Short cast ribs grow from the left-side mass; no bars cross the face.
    for idx, (loc, angle, length) in enumerate([
        ((-1.82, -0.54, 0.38), -12, 0.76),
        ((-1.67, -0.54, -0.05), -3, 0.66),
        ((-1.48, -0.54, -0.46), 8, 0.56),
    ]):
        add_box(
            f"HousingRib_{idx}",
            (length, 0.15, 0.11),
            loc,
            (0, math.radians(angle), 0),
            housing,
            cast,
            0.026,
        )

    add_box(
        "ConnectorBody",
        (0.92, 0.66, 0.56),
        (-2.26, -0.16, -1.30),
        (0, math.radians(-10), math.radians(-7)),
        housing,
        cast,
        0.060,
    )
    add_box(
        "ConnectorSocket",
        (0.44, 0.15, 0.24),
        (-2.35, -0.52, -1.30),
        (0, math.radians(-10), math.radians(-7)),
        housing,
        steel,
        0.018,
    )

    # Compact open cradle: structural support around the precision interface, not another skin.
    carrier_points = css_polygon(148, 104, [
        (6,25),(18,8),(70,0),(91,14),(100,42),(91,81),(72,100),
        (26,93),(5,74),(0,45),
    ])
    carrier_body = loft_polygon_xz(
        "CarrierBody",
        carrier_points,
        [(-0.19, 0.90, 0.92, 0.10, -0.02),
         (0.00, 0.98, 0.99, 0.00, 0.00),
         (0.17, 1.02, 1.02, -0.04, 0.02)],
        carrier, cast, 0.0
    )
    carrier_open_points = css_polygon(108, 74, [
        (8,18),(75,0),(100,27),(90,82),(61,100),(11,91),(0,57),
    ])
    carrier_cutter = extrude_polygon_xz(
        "CarrierOpening_CUTTER", carrier_open_points, 0.52, None, cast, 0.0
    )
    carrier_cutter.location = (0.02, 0.0, 0.0)
    boolean_difference(carrier_body, carrier_cutter, "Open carrier cradle")
    add_bevel(carrier_body, 0.050, 3)

    # Machined interface is a true open flange, concentrating the bright precision material.
    flange_points = css_polygon(192, 146, [
        (9,22),(20,7),(65,0),(86,11),(100,35),(93,71),(76,92),
        (39,100),(14,88),(0,61),
    ])
    flange_body = loft_polygon_xz(
        "MachinedFlange",
        flange_points,
        [(-0.16, 0.96, 0.96, 0.05, -0.01),
         (0.00, 1.00, 1.00, 0.00, 0.00),
         (0.16, 1.02, 1.02, -0.02, 0.01)],
        flange, satin, 0.0
    )
    flange_open_points = css_polygon(146, 102, [
        (8,18),(75,0),(100,27),(90,82),(61,100),(11,91),(0,57),
    ])
    flange_cutter = extrude_polygon_xz(
        "FlangeOpening_CUTTER", flange_open_points, 0.52, None, cast, 0.0
    )
    flange_cutter.location = (0.03, 0.0, 0.0)
    boolean_difference(flange_body, flange_cutter, "Machined opening")
    add_bevel(flange_body, 0.052, 3)

    for idx, (x, z) in enumerate([
        (-0.70, 0.48),
        (0.64, 0.50),
        (0.72, -0.42),
    ]):
        add_cylinder(f"FlangeBolt_{idx}", 0.085, 0.13, (x, -0.22, z), flange, steel, 6, 0.014)

    # Small service cap: no grille, no screen, no pause/menu pattern.
    cap_points = css_polygon(76, 56, [
        (8,18),(73,0),(94,13),(100,43),(89,82),(63,100),(17,91),(0,63),
    ])
    loft_polygon_xz(
        "ServiceCap",
        cap_points,
        [(-0.13, 0.94, 0.94, 0.05, -0.01),
         (0.02, 1.00, 1.00, 0.00, 0.00),
         (0.15, 1.02, 1.02, -0.02, 0.01)],
        cap, satin, 0.050
    )
    for idx, (x, z) in enumerate([(-0.20, 0.11), (0.17, -0.09)]):
        add_cylinder(f"CapFastener_{idx}", 0.075, 0.095, (x, -0.18, z), cap, steel, 6, 0.012)

    roots = [backplate, bracket, housing, carrier, flange, cap]
    for root in roots:
        key_explode(root, PART_EXPLODE[root.name])

    master = bpy.data.objects.new("HeroObject_ROOT", None)
    bpy.context.collection.objects.link(master)
    master.rotation_euler = (math.radians(8), math.radians(-12), math.radians(-8))
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
    add_area("Key_Softbox_TopLeft", (-5.4, -6.8, 8.2), 1120, 6.5, (0.97, 0.985, 1.0))
    add_area("Separation_Rake_Right", (5.6, 1.8, 6.8), 720, 2.7, (0.72, 0.84, 1.0))
    add_area("Controlled_Front_Fill", (0.8, -6.8, 1.6), 170, 5.2, (0.80, 0.87, 1.0))

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

    cast = make_material("MAT_CastGraphite", (0.052, 0.058, 0.066), 0.22, 0.62)
    add_cast_grain(cast)
    satin = make_material("MAT_SatinCoolMetal", (0.49, 0.56, 0.63), 0.92, 0.22)
    steel = make_material("MAT_SteelHardware", (0.69, 0.73, 0.77), 0.99, 0.16)
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
