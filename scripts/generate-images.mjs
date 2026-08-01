/**
 * Procedural brand-imagery generator for Spatial Alphabet.
 * Renders domain-authentic geospatial/engineering visuals (LiDAR point clouds,
 * hillshade terrain, cadastral maps, BIM wireframes, orthophotos) as PNGs —
 * no external dependencies, everything drawn per-pixel/per-point in Node.
 *
 * Run: node scripts/generate-images.mjs
 * Output: public/assets/gen/*.png
 */
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "assets", "gen");
mkdirSync(OUT, { recursive: true });

/* ---------------- PNG encoder ---------------- */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}
function encodePNG(w, h, rgb) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type RGB
  const raw = Buffer.alloc(h * (1 + w * 3));
  for (let y = 0; y < h; y++) {
    raw[y * (1 + w * 3)] = 0; // filter none
    rgb.copy(raw, y * (1 + w * 3) + 1, y * w * 3, (y + 1) * w * 3);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, pngChunk("IHDR", ihdr), pngChunk("IDAT", idat), pngChunk("IEND", Buffer.alloc(0))]);
}

/* ---------------- Canvas ---------------- */
class Canvas {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.buf = new Float64Array(w * h * 3);
  }
  fill([r, g, b]) {
    for (let i = 0; i < this.buf.length; i += 3) {
      this.buf[i] = r;
      this.buf[i + 1] = g;
      this.buf[i + 2] = b;
    }
  }
  vGradient(top, bottom) {
    for (let y = 0; y < this.h; y++) {
      const t = y / (this.h - 1);
      const r = top[0] + (bottom[0] - top[0]) * t;
      const g = top[1] + (bottom[1] - top[1]) * t;
      const b = top[2] + (bottom[2] - top[2]) * t;
      for (let x = 0; x < this.w; x++) {
        const i = (y * this.w + x) * 3;
        this.buf[i] = r;
        this.buf[i + 1] = g;
        this.buf[i + 2] = b;
      }
    }
  }
  px(x, y, [r, g, b], a = 1) {
    x |= 0;
    y |= 0;
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    const i = (y * this.w + x) * 3;
    this.buf[i] += (r - this.buf[i]) * a;
    this.buf[i + 1] += (g - this.buf[i + 1]) * a;
    this.buf[i + 2] += (b - this.buf[i + 2]) * a;
  }
  disc(cx, cy, rad, color, a = 1) {
    const r2 = rad * rad;
    for (let y = Math.floor(cy - rad); y <= cy + rad; y++)
      for (let x = Math.floor(cx - rad); x <= cx + rad; x++) {
        const d2 = (x - cx) ** 2 + (y - cy) ** 2;
        if (d2 <= r2) this.px(x, y, color, a * (1 - Math.sqrt(d2) / (rad + 0.6)) ** 0.6);
      }
  }
  line(x0, y0, x1, y1, color, width = 1, a = 1) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.hypot(dx, dy);
    const steps = Math.max(2, Math.ceil(len / Math.max(0.5, width * 0.4)));
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      this.disc(x0 + dx * t, y0 + dy * t, width / 2, color, a);
    }
  }
  polyline(pts, color, width = 1, a = 1) {
    for (let i = 0; i < pts.length - 1; i++) this.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], color, width, a);
  }
  dashedPolyline(pts, color, width, a, dash = 10, gap = 8) {
    let dist = 0;
    let draw = true;
    let acc = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i];
      const [x1, y1] = pts[i + 1];
      const segLen = Math.hypot(x1 - x0, y1 - y0);
      const steps = Math.ceil(segLen);
      for (let s = 0; s < steps; s++) {
        const t = s / steps;
        acc += segLen / steps;
        const lim = draw ? dash : gap;
        if (acc > lim) {
          acc = 0;
          draw = !draw;
        }
        if (draw) this.disc(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, width / 2, color, a);
      }
      dist += segLen;
    }
  }
  rect(x, y, w, h, color, a = 1) {
    for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) this.px(xx, yy, color, a);
  }
  rectOutline(x, y, w, h, color, width = 1, a = 1) {
    this.line(x, y, x + w, y, color, width, a);
    this.line(x + w, y, x + w, y + h, color, width, a);
    this.line(x + w, y + h, x, y + h, color, width, a);
    this.line(x, y + h, x, y, color, width, a);
  }
  vignette(strength = 0.35) {
    const cx = this.w / 2;
    const cy = this.h / 2;
    const maxD = Math.hypot(cx, cy);
    for (let y = 0; y < this.h; y++)
      for (let x = 0; x < this.w; x++) {
        const d = Math.hypot(x - cx, y - cy) / maxD;
        const f = 1 - strength * d * d;
        const i = (y * this.w + x) * 3;
        this.buf[i] *= f;
        this.buf[i + 1] *= f;
        this.buf[i + 2] *= f;
      }
  }
  save(name) {
    const rgb = Buffer.alloc(this.w * this.h * 3);
    for (let i = 0; i < this.buf.length; i++) rgb[i] = Math.max(0, Math.min(255, Math.round(this.buf[i])));
    writeFileSync(join(OUT, name), encodePNG(this.w, this.h, rgb));
    console.log("wrote", name);
  }
}

/* ---------------- Random + noise ---------------- */
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hash2(ix, iy, seed) {
  let h = Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + Math.imul(seed, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
const smooth = (t) => t * t * (3 - 2 * t);
function noise2(x, y, seed = 0) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const a = hash2(ix, iy, seed);
  const b = hash2(ix + 1, iy, seed);
  const c = hash2(ix, iy + 1, seed);
  const d = hash2(ix + 1, iy + 1, seed);
  const u = smooth(fx);
  const v = smooth(fy);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y, oct = 5, seed = 0, lac = 2, gain = 0.5) {
  let amp = 0.5;
  let f = 1;
  let sum = 0;
  let norm = 0;
  for (let o = 0; o < oct; o++) {
    sum += amp * noise2(x * f, y * f, seed + o * 101);
    norm += amp;
    amp *= gain;
    f *= lac;
  }
  return sum / norm;
}
const lerp = (a, b, t) => a + (b - a) * t;
function ramp(stops, t) {
  t = Math.max(0, Math.min(1, t));
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, c0] = stops[i];
    const [t1, c1] = stops[i + 1];
    if (t <= t1) {
      const k = (t - t0) / (t1 - t0 || 1);
      return [lerp(c0[0], c1[0], k), lerp(c0[1], c1[1], k), lerp(c0[2], c1[2], k)];
    }
  }
  return stops[stops.length - 1][1];
}

/* Brand colors */
const NAVY = [7, 16, 34];
const NAVY2 = [8, 20, 38];
const ACCENT = [0, 168, 232];
const ACCENT_LIGHT = [95, 200, 238];
const GOLD = [232, 163, 30];
const LIGHT = [242, 245, 248];
const INK = [12, 27, 51];

/* ================= 1. LiDAR transmission corridor ================= */
function lidarCorridor() {
  const W = 1600;
  const H = 900;
  const c = new Canvas(W, H);
  const R = mulberry32(11);
  c.vGradient([4, 10, 22], NAVY2);
  const groundY = (x) => 610 + fbm(x * 0.0016, 3.7, 4, 5) * 160;
  // ground returns
  for (let i = 0; i < 52000; i++) {
    const x = R() * W;
    const gy = groundY(x);
    const y = gy + R() * R() * 46;
    const intensity = 0.35 + fbm(x * 0.01, y * 0.01, 3, 9) * 0.65;
    const col = ramp(
      [
        [0, [96, 66, 30]],
        [0.55, [150, 104, 46]],
        [1, [196, 150, 84]],
      ],
      intensity
    );
    c.px(x, y, col, 0.5 + 0.5 * R());
  }
  // vegetation clusters
  for (let k = 0; k < 26; k++) {
    const cx = R() * W;
    const hgt = 55 + R() * 130;
    const rad = 26 + R() * 60;
    const base = groundY(cx);
    for (let i = 0; i < 750; i++) {
      const a = R() * Math.PI * 2;
      const rr = Math.sqrt(R()) * rad;
      const x = cx + Math.cos(a) * rr;
      const y = base - hgt / 2 + Math.sin(a) * rr * (hgt / (rad * 2));
      const shade = 0.4 + R() * 0.6;
      c.px(x, y, [40 * shade + 20, 120 * shade + 25, 70 * shade + 18], 0.55 + R() * 0.4);
    }
  }
  // poles + conductors
  const polesX = [];
  for (let x = 120; x < W - 40; x += 300 + R() * 70) polesX.push(x);
  const topY = polesX.map(() => 268 + R() * 26);
  polesX.forEach((x, p) => {
    const gy = groundY(x);
    for (let y = topY[p]; y < gy; y += 1.4) c.disc(x + (R() - 0.5) * 2.2, y, 1.4, [216, 224, 232], 0.8);
    for (let dx = -46; dx <= 46; dx += 1.6) c.disc(x + dx, topY[p] + 8 + (R() - 0.5) * 2, 1.3, [216, 224, 232], 0.85);
  });
  for (let p = 0; p < polesX.length - 1; p++) {
    for (const off of [-38, 0, 38]) {
      const x0 = polesX[p] + off;
      const x1 = polesX[p + 1] + off;
      const y0 = topY[p] + 12;
      const y1 = topY[p + 1] + 12;
      for (let s = 0; s <= 420; s++) {
        const t = s / 420;
        const x = lerp(x0, x1, t);
        const y = lerp(y0, y1, t) + 4 * 42 * t * (1 - t);
        c.px(x, y, ACCENT_LIGHT, 0.85);
        c.disc(x, y, 1.6, ACCENT, 0.12);
      }
    }
  }
  c.vignette(0.4);
  c.save("lidar-corridor.png");
}

/* ================= 2. Terrain hillshade + contours ================= */
function terrainHillshade(name = "terrain-hillshade.png", opts = {}) {
  const W = opts.w ?? 1200;
  const H = opts.h ?? 800;
  const c = new Canvas(W, H);
  const seed = opts.seed ?? 21;
  const sc = 0.0034;
  const hAt = (x, y) => fbm(x * sc, y * sc, 6, seed);
  const light = [-0.62, -0.62, 0.48];
  const stops = opts.palette ?? [
    [0, [40, 70, 88]],
    [0.35, [58, 100, 82]],
    [0.55, [110, 132, 84]],
    [0.75, [176, 160, 112]],
    [1, [226, 216, 190]],
  ];
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const h = hAt(x, y);
      const hx = hAt(x + 1.5, y) - hAt(x - 1.5, y);
      const hy = hAt(x, y + 1.5) - hAt(x, y - 1.5);
      let nx = -hx * 90;
      let ny = -hy * 90;
      let nz = 1;
      const nl = Math.hypot(nx, ny, nz);
      const shade = Math.max(0, (nx * light[0] + ny * light[1] + nz * light[2]) / nl / Math.hypot(...light) + 0.15);
      let col = ramp(stops, h);
      const f = 0.34 + 0.72 * shade;
      col = [col[0] * f, col[1] * f, col[2] * f];
      // contours
      const levels = 14;
      const hh = h * levels;
      const grad = Math.max(0.12, Math.hypot(hx, hy) * levels * 1.5);
      const fr = Math.abs(hh - Math.round(hh));
      if (fr < 0.05 * grad * 8) {
        const idx = Math.round(hh) % 4 === 0 ? 0.4 : 0.22;
        col = [col[0] * (1 - idx), col[1] * (1 - idx), col[2] * (1 - idx)];
      }
      c.px(x, y, col, 1);
    }
  if (opts.route !== false) {
    const pts = [];
    for (let x = -10; x <= W + 10; x += 14) pts.push([x, H * 0.55 + Math.sin(x * 0.004 + 1.2) * 120 + fbm(x * 0.01, 5, 3, seed + 7) * 60 - 30]);
    c.polyline(pts, [10, 20, 34], 6, 0.5);
    c.polyline(pts, opts.routeColor ?? ACCENT, 3, 0.95);
    if (opts.ticks) {
      for (let i = 4; i < pts.length - 4; i += 4) {
        const [x, y] = pts[i];
        const [x2, y2] = pts[i + 1];
        const dx = x2 - x;
        const dy = y2 - y;
        const l = Math.hypot(dx, dy);
        const px = (-dy / l) * (i % 20 === 0 ? 12 : 7);
        const py = (dx / l) * (i % 20 === 0 ? 12 : 7);
        c.line(x - px, y - py, x + px, y + py, LIGHT, 2, 0.85);
      }
    }
  }
  c.vignette(0.22);
  c.save(name);
}

/* ================= 3. PLS-CADD style sag profile ================= */
function sagProfile() {
  const W = 1600;
  const H = 900;
  const c = new Canvas(W, H);
  c.fill(NAVY);
  for (let x = 0; x < W; x += 44) c.line(x, 0, x, H, ACCENT, 1, 0.045);
  for (let y = 0; y < H; y += 44) c.line(0, y, W, y, ACCENT, 1, 0.045);
  // station axis
  for (let x = 60; x < W; x += 100) {
    c.line(x, H - 46, x, H - (x % 500 === 60 % 500 ? 62 : 54), LIGHT, 1.6, 0.5);
  }
  c.line(0, H - 46, W, H - 46, LIGHT, 1.4, 0.35);
  // ground profile
  const gpts = [];
  for (let x = 0; x <= W; x += 10) gpts.push([x, 690 + fbm(x * 0.002, 1.1, 4, 31) * 90]);
  c.polyline(gpts, [180, 195, 210], 2.4, 0.7);
  // structures (lattice towers)
  const towers = [140, 560, 1000, 1430];
  const attach = towers.map((x) => 250 + fbm(x * 0.01, 2, 2, 5) * 40);
  towers.forEach((x, i) => {
    const gy = 690 + fbm(x * 0.002, 1.1, 4, 31) * 90;
    const top = attach[i];
    c.line(x - 26, gy, x - 6, top + 24, LIGHT, 2.4, 0.85);
    c.line(x + 26, gy, x + 6, top + 24, LIGHT, 2.4, 0.85);
    // bracing
    for (let k = 0; k < 6; k++) {
      const t0 = k / 6;
      const t1 = (k + 1) / 6;
      const xa = lerp(x - 26, x - 6, t0);
      const xb = lerp(x + 26, x + 6, t1);
      const ya = lerp(gy, top + 24, t0);
      const yb = lerp(gy, top + 24, t1);
      c.line(xa, ya, xb, yb, LIGHT, 1.3, 0.5);
      c.line(x - (xb - x), yb, x + (x - xa), ya, LIGHT, 1.3, 0.5);
    }
    // crossarms
    c.line(x - 44, top + 20, x + 44, top + 20, LIGHT, 2.6, 0.9);
    c.line(x - 30, top, x + 30, top, LIGHT, 2.4, 0.9);
  });
  // conductors: 2 arms x catenaries with glow
  for (let i = 0; i < towers.length - 1; i++) {
    for (const [ay, sag] of [
      [20, 92],
      [0, 78],
    ]) {
      const x0 = towers[i];
      const x1 = towers[i + 1];
      const y0 = attach[i] + ay;
      const y1 = attach[i + 1] + ay;
      const pts = [];
      for (let s = 0; s <= 120; s++) {
        const t = s / 120;
        pts.push([lerp(x0, x1, t), lerp(y0, y1, t) + 4 * sag * t * (1 - t)]);
      }
      c.polyline(pts, ACCENT, 5.5, 0.1);
      c.polyline(pts, ACCENT_LIGHT, 1.8, 0.95);
      // clearance envelope
      const cl = pts.map(([x, y]) => [x, y + 64]);
      if (ay === 20) c.dashedPolyline(cl, GOLD, 1.6, 0.55, 9, 9);
    }
  }
  // left elevation axis
  for (let y = 120; y < H - 60; y += 60) c.line(46, y, 58, y, LIGHT, 1.4, 0.5);
  c.line(52, 100, 52, H - 46, LIGHT, 1.2, 0.3);
  c.vignette(0.3);
  c.save("sag-profile.png");
}

/* ================= 4. Contour blueprint survey ================= */
function contourBlueprint() {
  const W = 1200;
  const H = 800;
  const c = new Canvas(W, H);
  c.fill(NAVY2);
  const seed = 77;
  const sc = 0.004;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const h = fbm(x * sc, y * sc, 5, seed);
      const levels = 26;
      const hh = h * levels;
      const fr = Math.abs(hh - Math.round(hh));
      const hx = fbm((x + 2) * sc, y * sc, 5, seed) - fbm((x - 2) * sc, y * sc, 5, seed);
      const hy = fbm(x * sc, (y + 2) * sc, 5, seed) - fbm(x * sc, (y - 2) * sc, 5, seed);
      const grad = Math.max(0.1, Math.hypot(hx, hy) * levels * 2.2);
      const major = Math.round(hh) % 5 === 0;
      if (fr < (major ? 0.075 : 0.045) * grad * 6) c.px(x, y, major ? ACCENT : ACCENT, major ? 0.34 : 0.16);
    }
  // survey traverse
  const R = mulberry32(9);
  const stations = [];
  for (let i = 0; i < 6; i++) stations.push([120 + (i * (W - 240)) / 5 + (R() - 0.5) * 80, 180 + R() * (H - 360)]);
  for (let i = 0; i < stations.length - 1; i++) c.line(...stations[i], ...stations[i + 1], GOLD, 1.6, 0.65);
  stations.forEach(([x, y]) => {
    c.line(x, y - 9, x - 8, y + 6, GOLD, 1.6, 0.9);
    c.line(x - 8, y + 6, x + 8, y + 6, GOLD, 1.6, 0.9);
    c.line(x + 8, y + 6, x, y - 9, GOLD, 1.6, 0.9);
    c.disc(x, y + 1, 1.6, GOLD, 0.9);
  });
  // benchmarks
  for (let i = 0; i < 7; i++) {
    const x = 80 + R() * (W - 160);
    const y = 80 + R() * (H - 160);
    c.line(x - 7, y, x + 7, y, LIGHT, 1.3, 0.6);
    c.line(x, y - 7, x, y + 7, LIGHT, 1.3, 0.6);
    c.disc(x, y, 3.4, LIGHT, 0.18);
  }
  c.vignette(0.3);
  c.save("contour-blueprint.png");
}

/* ================= 5. BIM isometric wireframe ================= */
function bimIso() {
  const W = 1600;
  const H = 900;
  const c = new Canvas(W, H);
  c.fill(NAVY);
  for (let y = 0; y < H; y += 26)
    for (let x = 0; x < W; x += 26) c.disc(x, y, 0.9, ACCENT, 0.09);
  const GX = 9;
  const GY = 6;
  const FLOORS = 7;
  const s = 62;
  const cx = W * 0.5;
  const cy = H * 0.94;
  const iso = (x, y, z) => [cx + (x - GX / 2 - (y - GY / 2)) * 0.866 * s, cy + (x - GX / 2 + (y - GY / 2)) * 0.5 * s * 0.58 - z * s * 1.55];
  const wire = (p0, p1, col, w, a) => c.line(...iso(...p0), ...iso(...p1), col, w, a);
  // slabs
  for (let f = 0; f <= FLOORS; f++) {
    const a = f === 3 ? 0.85 : 0.42;
    wire([0, 0, f], [GX, 0, f], LIGHT, 1.4, a);
    wire([GX, 0, f], [GX, GY, f], LIGHT, 1.4, a);
    wire([GX, GY, f], [0, GY, f], LIGHT, 1.4, a);
    wire([0, GY, f], [0, 0, f], LIGHT, 1.4, a);
    // slab grid hint on highlighted floor
    if (f === 3) {
      for (let gx = 1; gx < GX; gx++) wire([gx, 0, f], [gx, GY, f], ACCENT, 1, 0.14);
      for (let gy = 1; gy < GY; gy++) wire([0, gy, f], [GX, gy, f], ACCENT, 1, 0.14);
    }
  }
  // columns
  for (let gx = 0; gx <= GX; gx += 2)
    for (let gy = 0; gy <= GY; gy += 2) {
      wire([gx, gy, 0], [gx, gy, FLOORS], LIGHT, 1.2, 0.3);
    }
  // core
  for (let f = 0; f < FLOORS; f++) {
    wire([4, 2, f], [7, 2, f], ACCENT_LIGHT, 1.2, 0.3);
    wire([7, 2, f], [7, 5, f], ACCENT_LIGHT, 1.2, 0.3);
    wire([7, 5, f], [4, 5, f], ACCENT_LIGHT, 1.2, 0.3);
    wire([4, 5, f], [4, 2, f], ACCENT_LIGHT, 1.2, 0.3);
  }
  for (const [gx, gy] of [
    [4, 2],
    [7, 2],
    [7, 5],
    [4, 5],
  ])
    wire([gx, gy, 0], [gx, gy, FLOORS], ACCENT_LIGHT, 1.3, 0.4);
  // MEP runs on floor 3
  const mep = (pts, col) => {
    for (let i = 0; i < pts.length - 1; i++) wire([...pts[i], 3.25], [...pts[i + 1], 3.25], col, 2.2, 0.9);
    pts.forEach((p) => c.disc(...iso(...p, 3.25), 2.6, col, 0.9));
  };
  mep(
    [
      [0.5, 5.5],
      [4.5, 5.5],
      [4.5, 3],
      [8.5, 3],
    ],
    ACCENT
  );
  mep(
    [
      [0.5, 0.5],
      [3, 0.5],
      [3, 4.2],
      [7.2, 4.2],
      [7.2, 5.6],
    ],
    GOLD
  );
  c.vignette(0.34);
  c.save("bim-iso.png");
}

/* ================= 6. Scan-to-BIM facade point cloud ================= */
function pointcloudBuilding() {
  const W = 1200;
  const H = 800;
  const c = new Canvas(W, H);
  c.vGradient([5, 11, 24], NAVY2);
  const R = mulberry32(41);
  const x0 = 130;
  const x1 = W - 110;
  const y0 = 90;
  const y1 = H - 120;
  const cols = 15;
  const rows = 8;
  for (let i = 0; i < 95000; i++) {
    const u = R();
    const v = R();
    const x = lerp(x0, x1, u) + (R() - 0.5) * 2.4;
    // slight perspective: right side compressed
    const y = lerp(y0 + u * 26, y1 - u * 12, v) + (R() - 0.5) * 2.4;
    const gu = (u * cols) % 1;
    const gv = (v * rows) % 1;
    const isWindow = gu > 0.28 && gu < 0.78 && gv > 0.3 && gv < 0.82;
    // dropout patches
    const drop = fbm(u * 5, v * 5, 3, 8) > 0.72;
    if (drop && R() > 0.25) continue;
    const intensity = 0.35 + fbm(u * 9, v * 9, 3, 15) * 0.65;
    if (isWindow) {
      c.px(x, y, [22 + 40 * intensity, 52 + 70 * intensity, 92 + 90 * intensity], 0.5);
    } else {
      const col = ramp(
        [
          [0, [60, 110, 150]],
          [0.6, [120, 190, 224]],
          [1, [210, 240, 252]],
        ],
        intensity
      );
      c.px(x, y, col, 0.72);
    }
  }
  // ground scatter
  for (let i = 0; i < 9000; i++) {
    const x = R() * W;
    const y = y1 + R() * (H - y1);
    c.px(x, y, [120, 96, 60], 0.3 + R() * 0.3);
  }
  c.vignette(0.4);
  c.save("pointcloud-building.png");
}

/* ================= 7. Dark vector web map ================= */
function vectorMapDark() {
  const W = 1600;
  const H = 900;
  const c = new Canvas(W, H);
  c.fill([10, 22, 38]);
  // water
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const v = fbm(x * 0.0022 + 4, y * 0.0022, 4, 55);
      if (v > 0.63 - (x / W) * 0.16) c.px(x, y, [13, 33, 56], 1);
    }
  // parks
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x += 1) {
      const v = fbm(x * 0.004, y * 0.004, 3, 91);
      if (v > 0.66) c.px(x, y, [16, 38, 32], 0.8);
    }
  const ang = 0.14;
  const cosA = Math.cos(ang);
  const sinA = Math.sin(ang);
  const road = (p, q, col, w, a) => c.line(p[0], p[1], q[0], q[1], col, w, a);
  const rot = (x, y) => [x * cosA - y * sinA + 120, x * sinA + y * cosA - 160];
  // minor grid
  for (let gx = -400; gx < W + 400; gx += 56) {
    const jitter = fbm(gx * 0.01, 3, 2, 12) * 22;
    road(rot(gx + jitter, -400), rot(gx + jitter, H + 400), [34, 58, 84], 1.4, 0.55);
  }
  for (let gy = -400; gy < H + 400; gy += 56) {
    const jitter = fbm(gy * 0.01, 8, 2, 13) * 22;
    road(rot(-400, gy + jitter), rot(W + 400, gy + jitter), [34, 58, 84], 1.4, 0.5);
  }
  // major arterials
  for (let gx = -400; gx < W + 400; gx += 224) road(rot(gx, -400), rot(gx, H + 400), [52, 84, 118], 3.4, 0.9);
  for (let gy = -400; gy < H + 400; gy += 224) road(rot(-400, gy), rot(W + 400, gy), [52, 84, 118], 3.4, 0.85);
  // route
  const route = [
    [180, 700],
    [420, 660],
    [430, 480],
    [700, 440],
    [710, 300],
    [1030, 270],
    [1040, 420],
    [1330, 400],
  ];
  c.polyline(route, [5, 12, 24], 8, 0.8);
  c.polyline(route, ACCENT, 4.4, 0.98);
  c.disc(180, 700, 9, LIGHT, 0.95);
  c.disc(180, 700, 4.4, NAVY, 1);
  c.disc(1330, 400, 11, GOLD, 0.28);
  c.disc(1330, 400, 5.4, GOLD, 1);
  c.vignette(0.3);
  c.save("vector-map-dark.png");
}

/* ================= 8. City grid at night ================= */
function cityGridNight() {
  const W = 1200;
  const H = 800;
  const c = new Canvas(W, H);
  c.vGradient([3, 7, 16], [7, 13, 26]);
  const R = mulberry32(71);
  const cx = W * 0.56;
  const cy = H * 0.46;
  const glowLine = (x0, y0, x1, y1, baseA) => {
    const len = Math.hypot(x1 - x0, y1 - y0);
    const steps = Math.ceil(len / 2.4);
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const x = lerp(x0, x1, t);
      const y = lerp(y0, y1, t);
      const d = Math.hypot(x - cx, y - cy);
      const falloff = Math.max(0.16, 1 - d / 760);
      const flicker = 0.4 + fbm(x * 0.02, y * 0.02, 3, 33) * 0.9;
      const a = baseA * falloff * flicker;
      c.px(x, y, [235, 178, 92], a);
      if (R() < 0.06) c.disc(x, y, 1.8, [255, 208, 130], a * 0.8);
    }
  };
  // grid + diagonals
  for (let gx = -100; gx < W + 100; gx += 44) glowLine(gx + fbm(gx, 1, 2, 3) * 18, 0, gx + fbm(gx, 9, 2, 4) * 18, H, 0.5);
  for (let gy = -100; gy < H + 100; gy += 44) glowLine(0, gy + fbm(gy, 4, 2, 5) * 18, W, gy + fbm(gy, 7, 2, 6) * 18, 0.45);
  for (let k = 0; k < 5; k++) {
    const a0 = R() * Math.PI;
    glowLine(cx - Math.cos(a0) * 900, cy - Math.sin(a0) * 900, cx + Math.cos(a0) * 900, cy + Math.sin(a0) * 900, 0.8);
  }
  // river: dark cut
  const river = [];
  for (let y = -20; y <= H + 20; y += 16) river.push([W * 0.24 + Math.sin(y * 0.008) * 90 + fbm(y * 0.01, 2, 3, 44) * 60, y]);
  c.polyline(river, [3, 8, 18], 42, 0.95);
  c.polyline(river, [12, 40, 64], 3, 0.35);
  // downtown bloom
  for (let i = 0; i < 2600; i++) {
    const a = R() * Math.PI * 2;
    const r = Math.abs(R() + R() - 1) * 190;
    c.disc(cx + Math.cos(a) * r * 1.3, cy + Math.sin(a) * r, 1.2 + R() * 1.4, [255, 214, 140], 0.16);
  }
  c.vignette(0.42);
  c.save("city-grid-night.png");
}

/* ================= 9. Density heatmap ================= */
function dataHeatmap() {
  const W = 1600;
  const H = 900;
  const c = new Canvas(W, H);
  c.fill(NAVY);
  for (let x = 0; x < W; x += 120) c.line(x, 0, x, H, LIGHT, 1, 0.05);
  for (let y = 0; y < H; y += 120) c.line(0, y, W, y, LIGHT, 1, 0.05);
  const R = mulberry32(19);
  const blobs = [];
  for (let i = 0; i < 13; i++)
    blobs.push({
      x: 120 + R() * (W - 240),
      y: 100 + R() * (H - 200),
      s: 60 + R() * 170,
      a: 0.35 + R() * 0.75,
    });
  let maxV = 0;
  const vals = new Float64Array(W * H);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      let v = 0;
      for (const b of blobs) {
        const d2 = (x - b.x) ** 2 + (y - b.y) ** 2;
        v += b.a * Math.exp(-d2 / (2 * b.s * b.s));
      }
      vals[y * W + x] = v;
      if (v > maxV) maxV = v;
    }
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const t = vals[y * W + x] / maxV;
      if (t < 0.03) continue;
      const col = ramp(
        [
          [0, NAVY],
          [0.25, [10, 52, 88]],
          [0.5, [0, 113, 159]],
          [0.75, [0, 168, 232]],
          [0.92, [95, 200, 238]],
          [1, [214, 240, 250]],
        ],
        t
      );
      c.px(x, y, col, Math.min(1, t * 2.2));
      // contour rings
      const lv = t * 8;
      if (Math.abs(lv - Math.round(lv)) < 0.03 && t > 0.1) c.px(x, y, LIGHT, 0.12);
    }
  c.vignette(0.3);
  c.save("data-heatmap.png");
}

/* ================= 10. AI annotation tiles ================= */
function annotationTiles() {
  const W = 1200;
  const H = 800;
  const c = new Canvas(W, H);
  c.fill([11, 21, 38]);
  const R = mulberry32(87);
  const cols = 4;
  const rows = 3;
  const gut = 16;
  const tw = (W - gut * (cols + 1)) / cols;
  const th = (H - gut * (rows + 1)) / rows;
  for (let r = 0; r < rows; r++)
    for (let col = 0; col < cols; col++) {
      const ox = gut + col * (tw + gut);
      const oy = gut + r * (th + gut);
      const seed = r * 7 + col * 13 + 5;
      // mini-ortho: field patches
      for (let y = 0; y < th; y++)
        for (let x = 0; x < tw; x++) {
          const region = Math.floor(fbm(x * 0.012, y * 0.012, 2, seed) * 6);
          const palette = [
            [86, 104, 62],
            [116, 128, 72],
            [140, 130, 88],
            [96, 116, 80],
            [124, 110, 70],
            [78, 96, 66],
          ];
          const base = palette[region % palette.length];
          const n = 0.85 + fbm(x * 0.06, y * 0.06, 3, seed + 3) * 0.3;
          c.px(ox + x, oy + y, [base[0] * n, base[1] * n, base[2] * n], 1);
        }
      // roads on tile
      const ry = 20 + R() * (th - 40);
      c.line(ox, oy + ry, ox + tw, oy + ry + (R() - 0.5) * 30, [206, 200, 182], 2.2, 0.8);
      const rx = 20 + R() * (tw - 40);
      c.line(ox + rx, oy, ox + rx + (R() - 0.5) * 30, oy + th, [206, 200, 182], 2, 0.7);
      const selected = r === 1 && col === 1;
      c.rectOutline(ox, oy, tw, th, selected ? ACCENT_LIGHT : [40, 62, 92], selected ? 2.6 : 1.4, selected ? 1 : 0.9);
      // bounding boxes
      const nBox = 1 + Math.floor(R() * 3);
      for (let b = 0; b < nBox; b++) {
        const bw = 34 + R() * 70;
        const bh = 26 + R() * 54;
        const bx = ox + 8 + R() * (tw - bw - 16);
        const by = oy + 8 + R() * (th - bh - 16);
        const col2 = R() < 0.75 ? ACCENT : GOLD;
        c.rectOutline(bx, by, bw, bh, col2, 1.8, 0.95);
        c.rect(bx, by - 7, Math.min(38, bw), 7, col2, 0.9);
        // corner ticks
        for (const [cx2, cy2] of [
          [bx, by],
          [bx + bw, by],
          [bx, by + bh],
          [bx + bw, by + bh],
        ])
          c.disc(cx2, cy2, 2.2, col2, 1);
      }
    }
  c.save("annotation-tiles.png");
}

/* ================= 11. Dual-shore network graph ================= */
function networkGraph() {
  const W = 1600;
  const H = 900;
  const c = new Canvas(W, H);
  c.vGradient([5, 11, 24], NAVY2);
  const R = mulberry32(29);
  const cluster = (cx, cy, n, spread) => {
    const nodes = [];
    for (let i = 0; i < n; i++) {
      const a = R() * Math.PI * 2;
      const r = Math.abs(R() + R() - 1) * spread;
      nodes.push([cx + Math.cos(a) * r * 1.25, cy + Math.sin(a) * r, 1.8 + R() * R() * 4.2]);
    }
    return nodes;
  };
  const A = cluster(430, 430, 30, 240);
  const B = cluster(1170, 470, 38, 260);
  const edges = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
      // connect to 2 nearest
      const d = nodes
        .map((n, j) => [Math.hypot(n[0] - nodes[i][0], n[1] - nodes[i][1]), j])
        .sort((a, b) => a[0] - b[0])
        .slice(1, 4);
      for (const [, j] of d) c.line(nodes[i][0], nodes[i][1], nodes[j][0], nodes[j][1], ACCENT, 1.1, 0.13);
    }
  };
  edges(A);
  edges(B);
  // bridges
  const hubsA = A.slice()
    .sort((a, b) => b[2] - a[2])
    .slice(0, 3);
  const hubsB = B.slice()
    .sort((a, b) => b[2] - a[2])
    .slice(0, 3);
  for (let i = 0; i < 3; i++) {
    const [x0, y0] = hubsA[i];
    const [x1, y1] = hubsB[(i + 1) % 3];
    const mid = [(x0 + x1) / 2, Math.min(y0, y1) - 130 - i * 40];
    const pts = [];
    for (let s = 0; s <= 60; s++) {
      const t = s / 60;
      pts.push([
        (1 - t) ** 2 * x0 + 2 * (1 - t) * t * mid[0] + t * t * x1,
        (1 - t) ** 2 * y0 + 2 * (1 - t) * t * mid[1] + t * t * y1,
      ]);
    }
    c.polyline(pts, i === 0 ? GOLD : ACCENT_LIGHT, i === 0 ? 2.2 : 1.7, 0.5);
  }
  const drawNodes = (nodes, hubs) => {
    nodes.forEach(([x, y, s]) => {
      c.disc(x, y, s * 3.2, ACCENT, 0.08);
      c.disc(x, y, s, ACCENT_LIGHT, 0.95);
    });
    hubs.forEach(([x, y, s]) => {
      c.disc(x, y, s * 4, ACCENT, 0.14);
      c.disc(x, y, s + 1.4, LIGHT, 0.95);
    });
  };
  drawNodes(A, hubsA.slice(0, 1));
  drawNodes(B, hubsB.slice(0, 1));
  c.vignette(0.36);
  c.save("network-graph.png");
}

/* ================= 12. Globe wireframe with offices ================= */
function globeTimezones() {
  const W = 1200;
  const H = 800;
  const c = new Canvas(W, H);
  c.vGradient([4, 9, 20], [8, 17, 34]);
  const R = mulberry32(3);
  for (let i = 0; i < 240; i++) c.px(R() * W, R() * H, LIGHT, R() * 0.25);
  const cx = W * 0.52;
  const cy = H * 0.52;
  const rad = 300;
  // sphere outline
  for (let a = 0; a < Math.PI * 2; a += 0.004) c.px(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad, ACCENT_LIGHT, 0.5);
  // meridians
  for (let m = -75; m <= 75; m += 15) {
    const rx = rad * Math.sin((m * Math.PI) / 180);
    for (let a = -Math.PI / 2; a <= Math.PI / 2; a += 0.006) {
      const x = cx + rx * Math.cos(a) * 1;
      const y = cy + rad * Math.sin(a);
      c.px(x, y, ACCENT, 0.16);
    }
  }
  // parallels
  for (let p = -75; p <= 75; p += 15) {
    const py = rad * Math.sin((p * Math.PI) / 180);
    const pr = rad * Math.cos((p * Math.PI) / 180);
    for (let a = 0; a < Math.PI * 2; a += 0.006) {
      const x = cx + Math.cos(a) * pr;
      const y = cy + py + Math.sin(a) * pr * 0.16;
      if ((x - cx) ** 2 / (pr * pr || 1) + 0 < 1.02) c.px(x, y, ACCENT, 0.13);
    }
  }
  // dot-matrix land hint (random continents-ish blobs on sphere)
  for (let i = 0; i < 15000; i++) {
    const a = R() * Math.PI * 2;
    const r = Math.sqrt(R()) * rad * 0.98;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    const v = fbm((x - cx) * 0.006 + 9, (y - cy) * 0.006, 4, 61);
    if (v > 0.56) c.px(x, y, ACCENT_LIGHT, 0.3);
  }
  // offices + arc
  const keller = [cx - rad * 0.62, cy - rad * 0.28];
  const hyd = [cx + rad * 0.55, cy - rad * 0.06];
  const mid = [(keller[0] + hyd[0]) / 2, Math.min(keller[1], hyd[1]) - 150];
  const pts = [];
  for (let s = 0; s <= 90; s++) {
    const t = s / 90;
    pts.push([
      (1 - t) ** 2 * keller[0] + 2 * (1 - t) * t * mid[0] + t * t * hyd[0],
      (1 - t) ** 2 * keller[1] + 2 * (1 - t) * t * mid[1] + t * t * hyd[1],
    ]);
  }
  c.polyline(pts, ACCENT, 2, 0.85);
  c.disc(...keller, 12, ACCENT, 0.25);
  c.disc(...keller, 5, ACCENT_LIGHT, 1);
  c.disc(...hyd, 12, GOLD, 0.25);
  c.disc(...hyd, 5, GOLD, 1);
  c.vignette(0.3);
  c.save("globe-timezones.png");
}

/* ================= 13. Systems integration diagram ================= */
function flowIntegration() {
  const W = 1600;
  const H = 900;
  const c = new Canvas(W, H);
  c.fill(NAVY);
  for (let x = 0; x < W; x += 40) c.line(x, 0, x, H, ACCENT, 1, 0.035);
  for (let y = 0; y < H; y += 40) c.line(0, y, W, y, ACCENT, 1, 0.035);
  const box = (x, y, w, h, col, glow) => {
    c.rect(x, y, w, h, [12, 30, 54], 0.92);
    c.rectOutline(x, y, w, h, col, glow ? 2.4 : 1.5, glow ? 1 : 0.6);
    if (glow) {
      c.rectOutline(x - 4, y - 4, w + 8, h + 8, col, 5, 0.1);
    }
    // port ticks
    c.disc(x + w, y + h / 2, 3, col, 0.9);
    c.disc(x, y + h / 2, 3, col, 0.9);
  };
  const elbow = (x0, y0, x1, y1, col, w, a, goldPath) => {
    const mx = (x0 + x1) / 2;
    c.line(x0, y0, mx, y0, col, w, a);
    c.line(mx, y0, mx, y1, col, w, a);
    c.line(mx, y1, x1, y1, col, w, a);
    // arrowhead
    c.line(x1, y1, x1 - 12, y1 - 7, col, w, a);
    c.line(x1, y1, x1 - 12, y1 + 7, col, w, a);
  };
  const leftYs = [150, 330, 510, 690];
  leftYs.forEach((y) => box(120, y, 240, 110, [150, 175, 200], false));
  box(660, 330, 300, 220, ACCENT, true);
  const rightYs = [180, 400, 620];
  rightYs.forEach((y) => box(1260, y, 240, 110, [150, 175, 200], false));
  leftYs.forEach((y, i) =>
    elbow(360, y + 55, 660, 380 + i * 35, i === 1 ? GOLD : ACCENT_LIGHT, i === 1 ? 2.6 : 1.8, i === 1 ? 0.9 : 0.5)
  );
  rightYs.forEach((y, i) => elbow(960, 400 + i * 45, 1260, y + 55, i === 0 ? GOLD : ACCENT_LIGHT, i === 0 ? 2.6 : 1.8, i === 0 ? 0.9 : 0.5));
  // pulse dots along gold path
  const R = mulberry32(6);
  for (let i = 0; i < 7; i++) c.disc(400 + i * 80, 385 + Math.sin(i) * 2, 2.6, GOLD, 0.5);
  c.vignette(0.32);
  c.save("flow-integration.png");
}

/* ================= 14. QC control chart ================= */
function qcScatter() {
  const W = 1200;
  const H = 800;
  const c = new Canvas(W, H);
  c.fill(NAVY);
  const R = mulberry32(50);
  const x0 = 100;
  const x1 = W - 70;
  const mean = 430;
  // grid
  for (let y = 120; y < H - 80; y += 62) c.line(x0, y, x1, y, LIGHT, 1, 0.06);
  // control band (sigma shrinks over time — QC improving)
  const sigA = 150;
  const sigB = 52;
  for (let x = x0; x <= x1; x++) {
    const t = (x - x0) / (x1 - x0);
    const s = lerp(sigA, sigB, t);
    for (let y = mean - s; y <= mean + s; y++) c.px(x, y, ACCENT, 0.035);
  }
  const bandPts = (sign) => {
    const pts = [];
    for (let x = x0; x <= x1; x += 8) {
      const t = (x - x0) / (x1 - x0);
      pts.push([x, mean + sign * lerp(sigA, sigB, t)]);
    }
    return pts;
  };
  c.dashedPolyline(bandPts(1), GOLD, 1.6, 0.6, 10, 8);
  c.dashedPolyline(bandPts(-1), GOLD, 1.6, 0.6, 10, 8);
  c.line(x0, mean, x1, mean, LIGHT, 1.4, 0.4);
  // axes
  c.line(x0, 90, x0, H - 70, LIGHT, 1.6, 0.4);
  c.line(x0, H - 70, x1, H - 70, LIGHT, 1.6, 0.4);
  for (let x = x0; x <= x1; x += 62) c.line(x, H - 70, x, H - 62, LIGHT, 1.4, 0.5);
  // points
  const n = 74;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = lerp(x0 + 18, x1 - 14, t);
    const s = lerp(sigA, sigB, t) * 0.55;
    let y = mean + (R() + R() + R() + R() - 2) * s;
    const outlier = i === 9 || i === 23;
    if (outlier) y = mean - lerp(sigA, sigB, t) - 40 - R() * 30;
    c.disc(x, y, 4.4, outlier ? GOLD : ACCENT_LIGHT, 0.95);
    c.disc(x, y, 8.5, outlier ? GOLD : ACCENT, 0.14);
    if (outlier) {
      for (let a = 0; a < Math.PI * 2; a += 0.05) c.px(x + Math.cos(a) * 13, y + Math.sin(a) * 13, GOLD, 0.7);
    }
  }
  c.vignette(0.3);
  c.save("qc-scatter.png");
}

/* ================= 15. Pipeline route over terrain ================= */
function pipelineRoute() {
  terrainHillshade("pipeline-route.png", {
    seed: 63,
    routeColor: GOLD,
    ticks: true,
    palette: [
      [0, [46, 66, 58]],
      [0.35, [66, 92, 64]],
      [0.6, [104, 118, 74]],
      [0.8, [148, 138, 96]],
      [1, [196, 186, 156]],
    ],
  });
}

/* ================= 16. Cadastral parcel map ================= */
function parcelMap() {
  const W = 1200;
  const H = 800;
  const c = new Canvas(W, H);
  const R = mulberry32(14);
  const seeds = [];
  for (let i = 0; i < 110; i++) seeds.push([R() * W, R() * H, R()]);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      let d1 = 1e9;
      let d2 = 1e9;
      let owner = 0;
      for (let i = 0; i < seeds.length; i++) {
        const d = (x - seeds[i][0]) ** 2 + (y - seeds[i][1]) ** 2;
        if (d < d1) {
          d2 = d1;
          d1 = d;
          owner = i;
        } else if (d < d2) d2 = d;
      }
      const edge = Math.sqrt(d2) - Math.sqrt(d1);
      const tintSeed = seeds[owner][2];
      let col =
        tintSeed < 0.12
          ? [224, 236, 243] // a few accent-tinted parcels
          : tintSeed < 0.5
            ? [238, 242, 246]
            : [244, 247, 250];
      c.px(x, y, col, 1);
      if (edge < 1.6) c.px(x, y, [70, 88, 110], 0.75);
      else if (edge < 3.2) c.px(x, y, [70, 88, 110], 0.18);
    }
  // roads along straight corridors
  const roads = [
    [
      [0, 240],
      [W, 300],
    ],
    [
      [0, 580],
      [W, 520],
    ],
    [
      [380, 0],
      [330, H],
    ],
    [
      [840, 0],
      [900, H],
    ],
  ];
  for (const [p, q] of roads) {
    c.line(p[0], p[1], q[0], q[1], [92, 108, 128], 11, 0.9);
    c.line(p[0], p[1], q[0], q[1], [252, 253, 254], 7.5, 1);
  }
  // dimension ticks on some parcels
  for (let i = 0; i < 26; i++) {
    const s = seeds[Math.floor(R() * seeds.length)];
    const a = R() * Math.PI;
    const l = 18 + R() * 26;
    c.line(s[0] - Math.cos(a) * l, s[1] - Math.sin(a) * l, s[0] + Math.cos(a) * l, s[1] + Math.sin(a) * l, [140, 155, 172], 1.2, 0.5);
  }
  // survey monuments
  for (let i = 0; i < 12; i++) {
    const x = 60 + R() * (W - 120);
    const y = 60 + R() * (H - 120);
    c.disc(x, y, 3.2, [0, 113, 159], 0.9);
    for (let a = 0; a < Math.PI * 2; a += 0.06) c.px(x + Math.cos(a) * 6.4, y + Math.sin(a) * 6.4, [0, 113, 159], 0.6);
  }
  c.save("parcel-map.png");
}

/* ================= 17/18. Office city maps ================= */
function officeMap(name, opts) {
  const W = 1200;
  const H = 800;
  const c = new Canvas(W, H);
  c.fill([238, 242, 246]);
  const R = mulberry32(opts.seed);
  // blocks tint
  for (let y = 0; y < H; y += 2)
    for (let x = 0; x < W; x += 2) {
      const v = fbm(x * 0.003, y * 0.003, 3, opts.seed);
      if (v > 0.58) c.rect(x, y, 2, 2, [231, 236, 241], 1);
    }
  const road = (p, q, w, major) => {
    c.line(p[0], p[1], q[0], q[1], [188, 198, 210], w + 3, 0.9);
    c.line(p[0], p[1], q[0], q[1], [255, 255, 255], w, 1);
    if (major) c.dashedPolyline([p, q], [212, 190, 130], 1.4, 0.9, 14, 12);
  };
  if (opts.style === "grid") {
    // suburban grid + diagonal highway
    for (let gx = 40; gx < W; gx += 118 + Math.floor(R() * 30)) road([gx, 0], [gx + (R() - 0.5) * 40, H], 5, false);
    for (let gy = 30; gy < H; gy += 92 + Math.floor(R() * 26)) road([0, gy], [W, gy + (R() - 0.5) * 40], 5, false);
    road([-40, H * 0.78], [W + 40, H * 0.28], 13, true);
    // parks
    for (let i = 0; i < 3; i++) {
      const px = 100 + R() * (W - 300);
      const py = 80 + R() * (H - 260);
      c.rect(px, py, 120 + R() * 90, 90 + R() * 60, [214, 228, 210], 0.9);
    }
    // pond
    c.disc(W * 0.72, H * 0.68, 46, [205, 222, 238], 1);
    c.disc(W * 0.72, H * 0.68, 46, [166, 190, 214], 0.25);
  } else {
    // organic dense web + lake + ring road
    const nodes = [];
    for (let i = 0; i < 46; i++) nodes.push([R() * W, R() * H]);
    for (const n of nodes) {
      const near = nodes
        .map((m) => [Math.hypot(m[0] - n[0], m[1] - n[1]), m])
        .sort((a, b) => a[0] - b[0])
        .slice(1, 4);
      for (const [, m] of near) road(n, m, 3.6, false);
    }
    // ring road
    const ring = [];
    for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.14)
      ring.push([W * 0.5 + Math.cos(a) * (330 + fbm(a, 2, 2, 8) * 60), H * 0.5 + Math.sin(a) * (250 + fbm(a, 5, 2, 9) * 50)]);
    for (let i = 0; i < ring.length - 1; i++) road(ring[i], ring[i + 1], 9, i % 3 === 0);
    // lake
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const d = Math.hypot((x - W * 0.3) / 130, (y - H * 0.34) / 95);
        if (d < 1 + fbm(x * 0.01, y * 0.01, 3, 12) * 0.3 - 0.15) c.px(x, y, [199, 219, 237], 1);
      }
  }
  // office marker
  const [mx, my] = opts.marker;
  c.disc(mx, my, 26, opts.markerColor, 0.16);
  for (let a = 0; a < Math.PI * 2; a += 0.03) c.px(mx + Math.cos(a) * 15, my + Math.sin(a) * 15, opts.markerColor, 0.9);
  c.disc(mx, my, 8.4, opts.markerColor, 1);
  c.disc(mx, my, 3.2, [255, 255, 255], 1);
  c.save(name);
}

/* ================= 19. Rail corridor LiDAR cross-section ================= */
function railCorridorScan() {
  const W = 1600;
  const H = 700;
  const c = new Canvas(W, H);
  c.vGradient([4, 10, 22], [8, 18, 34]);
  const R = mulberry32(23);
  const cx = W / 2;
  const gy = 500;
  // surrounding terrain scatter
  for (let i = 0; i < 26000; i++) {
    const x = R() * W;
    const dy = fbm(x * 0.003, 6, 4, 71) * 90;
    const y = gy + 40 - dy + R() * R() * 60;
    const t = 0.3 + fbm(x * 0.01, y * 0.01, 3, 5) * 0.7;
    c.px(x, y, ramp(
      [
        [0, [70, 86, 60]],
        [0.6, [110, 122, 78]],
        [1, [160, 158, 110]],
      ],
      t
    ), 0.5);
  }
  // ballast prism
  for (let i = 0; i < 30000; i++) {
    const u = R() * 2 - 1;
    const x = cx + u * 300;
    const top = gy - 36 * (1 - Math.min(1, Math.abs(u) * 1.35));
    const y = top + R() * (gy + 30 - top);
    const t = 0.3 + R() * 0.7;
    c.px(x, y, [96 * t + 40, 88 * t + 38, 80 * t + 36], 0.6);
  }
  // sleepers
  for (let sx = -280; sx <= 280; sx += 34) {
    for (let i = 0; i < 60; i++) c.px(cx + sx + R() * 22 - 11, gy - 38 + R() * 5, [120, 96, 70], 0.8);
  }
  // rails: bright dense clusters
  for (const rx of [-110, 110]) {
    for (let i = 0; i < 5200; i++) {
      const x = cx + rx + (R() - 0.5) * 7;
      const y = gy - 46 - R() * 14;
      c.px(x, y, [225, 244, 252], 0.85);
      if (R() < 0.2) c.disc(x, y, 1.8, ACCENT_LIGHT, 0.25);
    }
  }
  // catenary masts + wire
  for (const mx of [cx - 420, cx + 420]) {
    for (let y = 130; y < gy; y += 1.6) c.disc(mx + (R() - 0.5) * 2.4, y, 1.4, [210, 220, 230], 0.8);
    for (let x = 0; x < 130; x += 1.6) c.disc(mx + (mx < cx ? x : -x), 150 + (R() - 0.5) * 2, 1.2, [210, 220, 230], 0.8);
  }
  // contact + messenger wires with droppers
  const w0 = [cx - 420 + 118, 168];
  const w1 = [cx + 420 - 118, 168];
  for (let s = 0; s <= 500; s++) {
    const t = s / 500;
    const x = lerp(w0[0], w1[0], t);
    const yM = lerp(w0[1], w1[1], t) + 4 * 34 * t * (1 - t);
    const yC = 236;
    c.px(x, yM, ACCENT_LIGHT, 0.9);
    c.px(x, yC, ACCENT_LIGHT, 0.9);
    if (s % 42 === 0) c.line(x, yM, x, yC, ACCENT, 1.1, 0.5);
  }
  c.vignette(0.4);
  c.save("rail-corridor-scan.png");
}

/* ================= 20. Aerial farmland orthophoto ================= */
function orthoFarmland() {
  const W = 1600;
  const H = 700;
  const c = new Canvas(W, H);
  const R = mulberry32(35);
  // BSP fields
  const fields = [];
  const split = (x, y, w, h, depth) => {
    if (depth <= 0 || (w < 220 && h < 160) || (depth < 3 && R() < 0.22)) {
      fields.push({ x, y, w, h, tone: R(), dir: R() < 0.5 });
      return;
    }
    if (w > h) {
      const cut = w * (0.35 + R() * 0.3);
      split(x, y, cut, h, depth - 1);
      split(x + cut, y, w - cut, h, depth - 1);
    } else {
      const cut = h * (0.35 + R() * 0.3);
      split(x, y, w, cut, depth - 1);
      split(x, y + cut, w, h - cut, depth - 1);
    }
  };
  split(0, 0, W, H, 5);
  const palettes = [
    [96, 118, 62],
    [122, 134, 70],
    [148, 138, 88],
    [86, 106, 64],
    [166, 152, 104],
    [108, 96, 60],
    [76, 98, 70],
  ];
  for (const f of fields) {
    const base = palettes[Math.floor(f.tone * palettes.length) % palettes.length];
    for (let y = f.y; y < f.y + f.h; y++)
      for (let x = f.x; x < f.x + f.w; x++) {
        const n = 0.82 + fbm(x * 0.02, y * 0.02, 3, 44) * 0.36;
        // tractor striping
        const stripe = f.dir ? Math.sin(x * 0.9) : Math.sin(y * 0.9);
        const st = 1 + stripe * 0.035;
        c.px(x, y, [base[0] * n * st, base[1] * n * st, base[2] * n * st], 1);
      }
    // field boundary road
    c.rectOutline(f.x, f.y, f.w, f.h, [206, 198, 174], 2.6, 0.85);
  }
  // farmsteads
  for (let i = 0; i < 6; i++) {
    const fx = 80 + R() * (W - 160);
    const fy = 60 + R() * (H - 120);
    for (let b = 0; b < 3 + R() * 3; b++) {
      c.rect(fx + R() * 44 - 22, fy + R() * 34 - 17, 10 + R() * 12, 7 + R() * 9, [206, 202, 194], 1);
    }
    for (let t = 0; t < 14; t++) c.disc(fx + (R() - 0.5) * 90, fy + (R() - 0.5) * 70, 2.6 + R() * 2.4, [52, 74, 44], 0.9);
  }
  // atmosphere haze + vignette
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x += 1) {
      const hz = fbm(x * 0.002, y * 0.002, 3, 90);
      if (hz > 0.62) c.px(x, y, [232, 238, 240], (hz - 0.62) * 0.55);
    }
  c.vignette(0.24);
  c.save("ortho-farmland.png");
}

/* ---------------- run all ---------------- */
lidarCorridor();
terrainHillshade();
sagProfile();
contourBlueprint();
bimIso();
pointcloudBuilding();
vectorMapDark();
cityGridNight();
dataHeatmap();
annotationTiles();
networkGraph();
globeTimezones();
flowIntegration();
qcScatter();
pipelineRoute();
parcelMap();
officeMap("keller-map.png", { seed: 57, style: "grid", marker: [640, 380], markerColor: [0, 113, 159] });
officeMap("hyderabad-map.png", { seed: 58, style: "organic", marker: [660, 420], markerColor: [201, 137, 16] });
railCorridorScan();
orthoFarmland();
console.log("All 20 images generated.");
