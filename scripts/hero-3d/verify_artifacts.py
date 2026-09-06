import hashlib
import json
import sys
from pathlib import Path

out = Path(sys.argv[1])
required = [
    "hero-assembled.png",
    "hero-exploded.png",
    "hero-alt.png",
    "hero-object.glb",
    "hero-object.blend",
    "asset-report.json",
]
missing = [name for name in required if not (out / name).exists()]
if missing:
    raise SystemExit(f"missing artifacts: {missing}")

report = json.loads((out / "asset-report.json").read_text())
if report["triangles"] <= 0 or report["triangles"] > 150000:
    raise SystemExit(f"triangle budget failed: {report['triangles']}")
if report["material_count"] > 3:
    raise SystemExit(f"material budget failed: {report['material_count']}")
if report["glb_bytes"] <= 1000 or report["glb_bytes"] > 8_000_000:
    raise SystemExit(f"GLB byte budget failed: {report['glb_bytes']}")
if report.get("truth_status") != "fictional_art_direction_no_real_sku_claims":
    raise SystemExit("truth status missing")

for name in required:
    p = out / name
    digest = hashlib.sha256(p.read_bytes()).hexdigest()
    print(f"{name}\t{p.stat().st_size}\tsha256:{digest}")

print("HERO_3D_VERIFY_OK")
