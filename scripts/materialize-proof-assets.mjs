import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SOURCE_DIR = path.join(process.cwd(), ".proof-assets");
const OUTPUT_DIR = path.join(process.cwd(), "public", "proof");

// Proof-bearing images are reconstructed from text chunks and integrity-checked before every dev/build.
const chunkedAssets = {
  "supplier-environment-desktop.webp": {
    prefix: "supplier-environment-desktop.webp",
    bytes: 19784,
    sha256: "433ea550d67c6b3406f0c310fac122e6bfbdb348fbd2e8cb6d79b2871d849960",
  },
  "supplier-environment-mobile.webp": {
    prefix: "supplier-environment-mobile.webp",
    bytes: 22698,
    sha256: "532aff9c09651da7b1d631d7d40d973d1fa125af5dd787cf4c805d28ed28b77c",
  },
};

// The walkthrough is committed directly because the quality-preserving web derivative is binary and substantially larger.
const directAssets = {
  "supplier-walkthrough-8s.mp4": {
    bytes: 9301355,
    sha256: "c3c9b63b2f6529399c9e36377158ec62741fdde3640a18eb96402e34290bfa8d",
  },
};

await mkdir(OUTPUT_DIR, { recursive: true });
const entries = await readdir(SOURCE_DIR);

for (const [filename, expected] of Object.entries(chunkedAssets)) {
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

for (const [filename, expected] of Object.entries(directAssets)) {
  const bytes = await readFile(path.join(OUTPUT_DIR, filename));
  const digest = createHash("sha256").update(bytes).digest("hex");
  if (bytes.length !== expected.bytes || digest !== expected.sha256) {
    throw new Error(`Proof asset integrity mismatch for ${filename}: ${bytes.length} bytes / ${digest}`);
  }

  console.log(`verified ${filename} (${bytes.length} bytes)`);
}
