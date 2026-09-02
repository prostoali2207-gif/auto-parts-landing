import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SOURCE_DIR = path.join(process.cwd(), ".proof-assets");
const OUTPUT_DIR = path.join(process.cwd(), "public", "proof");

// Proof-bearing binaries are reconstructed from text chunks and integrity-checked before every dev/build.
const assets = {
  "supplier-environment-desktop.webp": {
    prefix: "supplier-environment-desktop.webp",
    bytes: 41396,
    sha256: "6d4566dd2234e8de87c907665957f2fa7ff49b40ce66697e4da25b209ea49729",
  },
  "supplier-environment-mobile.webp": {
    prefix: "supplier-environment-mobile.webp",
    bytes: 39662,
    sha256: "f6f096a0c397ee74a6f61c27dc0ee2d06599dafff0f2d724499ef39a134c9351",
  },
  "supplier-walkthrough-8s.mp4": {
    prefix: "supplier-walkthrough-8s.mp4",
    bytes: 122522,
    sha256: "9d9a6cc73cab95b4aaf290c60c0c64f2d81e6a8f56d4ddf050996a90c42bd4e7",
  },
};

await mkdir(OUTPUT_DIR, { recursive: true });
const entries = await readdir(SOURCE_DIR);

for (const [filename, expected] of Object.entries(assets)) {
  const chunks = entries
    .filter((entry) => entry.startsWith(`${expected.prefix}.`) && entry.endsWith(".b64"))
    .sort();

  if (chunks.length === 0) throw new Error(`Missing proof source chunks for ${filename}`);

  let encoded = "";
  for (const chunk of chunks) {
    encoded += (await readFile(path.join(SOURCE_DIR, chunk), "utf8")).trim();
  }

  const bytes = Buffer.from(encoded, "base64");
  const digest = createHash("sha256").update(bytes).digest("hex");
  if (bytes.length !== expected.bytes || digest !== expected.sha256) {
    throw new Error(`Proof asset integrity mismatch for ${filename}: ${bytes.length} bytes / ${digest}`);
  }

  await writeFile(path.join(OUTPUT_DIR, filename), bytes);
  console.log(`materialized ${filename} (${bytes.length} bytes)`);
}
