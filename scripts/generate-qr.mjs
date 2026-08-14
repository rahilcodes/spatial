/**
 * Generates location QR codes for each office (scanning opens Google Maps at
 * the office pin). Run: node scripts/generate-qr.mjs
 */
import QRCode from "qrcode";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "assets", "gen");

const offices = [
  { name: "qr-keller", lat: 32.9346, lng: -97.2517 },
  { name: "qr-hyderabad", lat: 17.385, lng: 78.4867 },
];

const opts = {
  width: 320,
  margin: 1,
  color: { dark: "#071022", light: "#ffffff" },
  errorCorrectionLevel: "M",
};

for (const o of offices) {
  const url = `https://www.google.com/maps/search/?api=1&query=${o.lat},${o.lng}`;
  await QRCode.toFile(join(OUT, `${o.name}.png`), url, opts);
  console.log("wrote", `${o.name}.png`, "→", url);
}
console.log("QR codes generated.");
