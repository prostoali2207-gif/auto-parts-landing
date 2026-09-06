import json
import struct
import sys
from pathlib import Path

path = Path(sys.argv[1])
if not path.exists():
    raise SystemExit(f"missing GLB: {path}")

data = path.read_bytes()
if len(data) < 20:
    raise SystemExit("GLB too small")

magic, version, total_len = struct.unpack_from("<4sII", data, 0)
if magic != b"glTF":
    raise SystemExit(f"invalid GLB magic: {magic!r}")
if version != 2:
    raise SystemExit(f"unexpected GLB version: {version}")
if total_len != len(data):
    raise SystemExit(f"GLB length mismatch: header={total_len} actual={len(data)}")

offset = 12
json_doc = None
bin_chunks = 0
while offset + 8 <= len(data):
    chunk_len, chunk_type = struct.unpack_from("<II", data, offset)
    offset += 8
    chunk = data[offset:offset + chunk_len]
    offset += chunk_len
    if chunk_type == 0x4E4F534A:  # JSON
        json_doc = json.loads(chunk.rstrip(b" \t\r\n\x00").decode("utf-8"))
    elif chunk_type == 0x004E4942:  # BIN
        bin_chunks += 1

if json_doc is None:
    raise SystemExit("GLB JSON chunk missing")

asset = json_doc.get("asset", {})
if asset.get("version") != "2.0":
    raise SystemExit(f"unexpected glTF asset version: {asset}")

nodes = json_doc.get("nodes", [])
meshes = json_doc.get("meshes", [])
materials = json_doc.get("materials", [])
animations = json_doc.get("animations", [])
scenes = json_doc.get("scenes", [])

node_names = {n.get("name") for n in nodes if n.get("name")}
material_names = {m.get("name") for m in materials if m.get("name")}

required_nodes = {
    "HeroObject_ROOT",
    "Backplate_ROOT",
    "Bracket_ROOT",
    "Housing_ROOT",
    "Carrier_ROOT",
    "Flange_ROOT",
    "Cap_ROOT",
    "HousingShell",
    "MachinedFlange",
    "ServiceCap",
}
missing_nodes = sorted(required_nodes - node_names)
if missing_nodes:
    raise SystemExit(f"required nodes missing: {missing_nodes}")

required_materials = {
    "MAT_CastGraphite",
    "MAT_SatinCoolMetal",
    "MAT_SteelHardware",
}
if not required_materials.issubset(material_names):
    raise SystemExit(f"required materials missing: {sorted(required_materials - material_names)}")

if len(materials) > 3:
    raise SystemExit(f"material budget exceeded: {len(materials)}")
if len(meshes) <= 0:
    raise SystemExit("no meshes in GLB")
if len(scenes) <= 0:
    raise SystemExit("no scene in GLB")
if len(animations) <= 0:
    raise SystemExit("no animation exported")

channel_count = sum(len(a.get("channels", [])) for a in animations)
sampler_count = sum(len(a.get("samplers", [])) for a in animations)
if channel_count < 6:
    raise SystemExit(f"too few animation channels: {channel_count}")
if sampler_count < 6:
    raise SystemExit(f"too few animation samplers: {sampler_count}")

size = len(data)
if size < 10_000:
    raise SystemExit(f"GLB suspiciously small: {size}")
if size > 8_000_000:
    raise SystemExit(f"GLB byte budget exceeded: {size}")

summary = {
    "file": path.name,
    "bytes": size,
    "nodes": len(nodes),
    "meshes": len(meshes),
    "materials": len(materials),
    "animations": len(animations),
    "animation_channels": channel_count,
    "animation_samplers": sampler_count,
    "scenes": len(scenes),
    "bin_chunks": bin_chunks,
    "generator": asset.get("generator"),
    "required_nodes_present": True,
    "required_materials_present": True,
}
print(json.dumps(summary, indent=2, sort_keys=True))
print("HERO_GLTF_VERIFY_OK")
