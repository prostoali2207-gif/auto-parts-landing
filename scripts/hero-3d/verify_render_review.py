import hashlib
import json
import sys
from pathlib import Path

out = Path(sys.argv[1])
required = [
    "hero-assembled.png",
    "hero-exploded.png",
    "hero-alt.png",
    "hero-object.blend",
    "asset-report.json",
]
missing = [name for name in required if not (out / name).exists()]
if missing:
    raise SystemExit(f"missing render-review artifacts: {missing}")

report = json.loads((out / "asset-report.json").read_text())
if report["triangles"] <= 0 or report["triangles"] > 150000:
    raise SystemExit(f"triangle diagnostic failed: {report['triangles']}")
if report["material_count"] != 3:
    raise SystemExit(f"material-family diagnostic failed: {report['material_count']}")
if report.get("truth_status") != "fictional_art_direction_no_real_sku_claims":
    raise SystemExit("truth status missing")
if report.get("glb_bytes") != 0:
    raise SystemExit("render-only stage unexpectedly produced GLB")

for name in required:
    p = out / name
    digest = hashlib.sha256(p.read_bytes()).hexdigest()
    print(f"{name}\t{p.stat().st_size}\tsha256:{digest}")

print("HERO_3D_RENDER_REVIEW_VERIFY_OK")
