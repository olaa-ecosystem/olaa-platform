/* Olaa Takenote: iPad home prototype. Plain browser JavaScript, no dependencies. See ../README.md */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const SW = 720, SH = 520;
let PW = 720, PH = 520, CW = 0, CH = 0;
const vw = () => innerWidth, vh = () => innerHeight;
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

/* ---------- spring easings for CSS / WAAPI ---------- */
const hasLinear = CSS.supports('transition-timing-function', 'linear(0, 1)');
function springEase(k, d, fallback) {
  let x = 0, v = 0, t = 0; const dt = 1 / 240, pts = [0];
  for (let i = 1; i < 2400; i++) {
    v += (-k * (x - 1) - d * v) * dt; x += v * dt; t += dt;
    if (i % 8 === 0) pts.push(+x.toFixed(4));
    if (Math.abs(x - 1) < .0015 && Math.abs(v) < .02) break;
  }
  pts.push(1);
  return { e: hasLinear ? `linear(${pts.join(',')})` : fallback, d: reduceMotion ? 1 : Math.round(t * 1000) };
}
const SPR = springEase(170, 17, 'cubic-bezier(.3,1.5,.5,1)');
const SPR_FAST = springEase(320, 26, 'cubic-bezier(.3,1.3,.5,1)');
const SPR_SOFT = springEase(150, 21, 'cubic-bezier(.2,1.1,.3,1)');
const SPR_OPEN = springEase(210, 23, 'cubic-bezier(.2,.95,.3,1)');   // file opening: barely overshoots
document.documentElement.style.setProperty('--spr-e', SPR_SOFT.e);
document.documentElement.style.setProperty('--spr-d', SPR_SOFT.d + 'ms');

/* ---------- physics bodies ---------- */
const active = new Set(); let raf = 0, lastT = 0, zTop = 30;
function wake(b) { active.add(b); if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(tick); } }
function tick(now) {
  const dt = Math.min(.05, Math.max(.001, (now - lastT) / 1000)); lastT = now;
  const n = Math.ceil(dt / .008);
  for (const b of [...active]) {
    let busy = false;
    for (let i = 0; i < n; i++) busy = b.step(dt / n);
    b.render();
    if (!busy) active.delete(b);
  }
  resolveCollisions();
  raf = active.size ? requestAnimationFrame(tick) : 0;
}
/* files never overlap: touching tiles push each other apart with a little pop.
   A slow drag lets you hover over a file (to make a folder); a fast drag shoves files aside. */
const groups = new Set();
function resolveCollisions() {
  for (const g of groups) {
    if (g.container && !g.container.isConnected) { groups.delete(g); continue; }
    if (g.skip && g.skip()) continue;
    const bs = g.bodies();
    // fixed obstacles (the Files header): files slide off them, the obstacle never moves
    for (const o of (g.obstacles ? g.obstacles() : [])) for (const b of bs) {
      if (b.mode !== 'free') continue;            // only a file you just let go of can be nudged
      const ox = Math.min(b.x + 80, o.x + o.w) - Math.max(b.x, o.x), oy = Math.min(b.y + 96, o.y + o.h) - Math.max(b.y, o.y);
      if (ox <= 0 || oy <= 0) continue;
      const below = b.y + 48 > o.y + o.h / 2;
      if (oy < ox) b.vy += (below ? 1 : -1) * oy * 16; else b.vx += (b.x + 40 > o.x + o.w / 2 ? 1 : -1) * ox * 16;
      if (b.mode === 'rest') b.mode = 'free'; wake(b);
    }
    for (let i = 0; i < bs.length; i++) for (let j = i + 1; j < bs.length; j++) {
      const a = bs[i], b = bs[j];
      if (a.mode === 'spring' || b.mode === 'spring' || (a.mode !== 'free' && b.mode !== 'free')) continue;   // resting files never push each other
      const dx = b.x - a.x, dy = b.y - a.y, ox = 78 - Math.abs(dx), oy = 94 - Math.abs(dy);
      if (ox <= 4 || oy <= 4) continue;                       // a light touch is fine; only real overlap pops
      const aD = a.mode === 'drag', bD = b.mode === 'drag';
      if (aD || bD) continue;                                 // a file under your finger never shoves others
      const d = Math.hypot(dx, dy); let nx = dx / (d || 1), ny = dy / (d || 1);
      if (d < 1) { const t = Math.random() * 6.28; nx = Math.cos(t); ny = Math.sin(t); }
      const kv = (Math.min(ox, oy) - 4) * 7;
      for (const [body, sign, solo] of [[a, -1, bD || b.pinned], [b, 1, aD || a.pinned]]) {
        if (body.mode === 'drag' || body.pinned) continue;
        const f = solo ? 1 : .5;
        body.vx += sign * nx * kv * f; body.vy += sign * ny * kv * f;
        const sp = Math.hypot(body.vx, body.vy); if (sp > 520) { body.vx *= 520 / sp; body.vy *= 520 / sp; }
        if (body.mode === 'rest') body.mode = 'free';
        if (!body.bumped) {
          body.bumped = true; const l = body.el.querySelector('.lift');
          if (l && !reduceMotion) l.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.04, .97)' }, { transform: 'scale(1)' }], { duration: 360, easing: 'cubic-bezier(.3,1.6,.5,1)' });
          setTimeout(() => body.bumped = false, 380);
        }
        wake(body);
      }
    }
  }
}
class Body {
  constructor(el, o = {}) {
    Object.assign(this, { el, x: o.x || 0, y: o.y || 0, s: o.s || 1, vx: 0, vy: 0, vs: 0, ts: null, tilt: 0,
      tiltK: o.tiltK ?? 1, mode: 'rest', bounds: o.bounds || null, onRender: o.onRender || null, samples: [], raise: o.raise ?? true });
    this.render();
  }
  render() {
    this.el.style.transform = `translate3d(${this.x.toFixed(2)}px,${this.y.toFixed(2)}px,0)` + (this.s !== 1 ? ` scale(${this.s.toFixed(4)})` : '');
    if (this.tiltK) this.el.style.setProperty('--tilt', this.tilt.toFixed(2) + 'deg');
    this.onRender && this.onRender(this);
  }
  place(x, y) { this.x = x; this.y = y; this.vx = this.vy = 0; this.mode = 'rest'; active.delete(this); this.render(); }
  grab() { this.mode = 'drag'; this.samples = []; this.el.classList.add('dragging'); if (this.raise) this.el.style.zIndex = ++zTop; wake(this); }
  dragTo(x, y, t) {
    if (this.bounds && this.mode === 'drag' && !this.noRubber) {      // past an edge the corner resists, like iPadOS windows
      const b = this.bounds(this), rb = (v, lo, hi) => { hi = Math.max(lo, hi); const d = v < lo ? lo - v : v > hi ? v - hi : 0; if (!d) return v; const e = d * .45 / (1 + d / 260); return v < lo ? lo - e : hi + e; };
      x = rb(x, b.minX, b.maxX); y = rb(y, b.minY, b.maxY);
    }
    const s = this.samples; s.push({ t, x, y });
    while (s.length > 2 && t - s[0].t > 90) s.shift();
    if (s.length > 1) { const a = s[s.length - 2], dt = Math.max(4, t - a.t); this.vx = this.vx * .55 + (x - a.x) / dt * 1000 * .45; this.vy = this.vy * .55 + (y - a.y) / dt * 1000 * .45; }
    this.x = x; this.y = y; this.render();
  }
  velocity(t) {
    const s = this.samples; if (s.length < 2) return { x: 0, y: 0 };
    const a = s[0], b = s[s.length - 1];
    if (t - b.t > 70) return { x: 0, y: 0 };
    const dt = Math.max(16, b.t - a.t) / 1000; let x = (b.x - a.x) / dt, y = (b.y - a.y) / dt; const m = Math.hypot(x, y);
    if (m > 3400) { x *= 3400 / m; y *= 3400 / m; }
    return { x, y };
  }
  release(vx = 0, vy = 0) { this.el.classList.remove('dragging'); this.vx = vx; this.vy = vy; this.mode = 'free'; wake(this); }
  springTo(x, y, s, k = 200, d = 24) { this.tx = x; this.ty = y; if (s != null) { this.ts = s; this.sk = k; this.sd = d; } this.k = k; this.d = d; this.mode = 'spring'; wake(this); }
  settle() { if (this.mode !== 'drag') { this.mode = 'free'; wake(this); } }
  step(dt) {
    let busy = false;
    if (this.mode === 'free') {
      const b = this.bounds && this.bounds(this);
      let still = true;
      for (const [p, v, lo, hi] of [['x', 'vx', 'minX', 'maxX'], ['y', 'vy', 'minY', 'maxY']]) {
        const c = b ? clamp(this[p], b[lo], Math.max(b[lo], b[hi])) : this[p];
        if (Math.abs(c - this[p]) > .4) { this[v] += (-(this[p] - c) * 190 - this[v] * 22) * dt; still = false; }
        else this[v] *= Math.pow(.004, dt);
        this[p] += this[v] * dt;
        if (Math.abs(this[v]) > 6) still = false;
      }
      if (still) { if (b) { this.x = clamp(this.x, b.minX, Math.max(b.minX, b.maxX)); this.y = clamp(this.y, b.minY, Math.max(b.minY, b.maxY)); } this.vx = this.vy = 0; this.mode = 'rest'; }
      else busy = true;
    } else if (this.mode === 'spring') {
      this.vx += (-this.k * (this.x - this.tx) - this.d * this.vx) * dt; this.vy += (-this.k * (this.y - this.ty) - this.d * this.vy) * dt;
      this.x += this.vx * dt; this.y += this.vy * dt;
      if (Math.hypot(this.x - this.tx, this.y - this.ty) < .3 && Math.hypot(this.vx, this.vy) < 4) { this.x = this.tx; this.y = this.ty; this.vx = this.vy = 0; this.mode = 'rest'; }
      else busy = true;
    } else if (this.mode === 'drag') { busy = true; this.vx *= Math.pow(.02, dt); this.vy *= Math.pow(.02, dt); }
    if (this.ts != null) {
      this.vs += (-(this.sk || 260) * (this.s - this.ts) - (this.sd || 28) * this.vs) * dt; this.s += this.vs * dt;
      if (Math.abs(this.s - this.ts) < .0006 && Math.abs(this.vs) < .003) { this.s = this.ts; this.ts = null; this.vs = 0; this.onScaleSettled && this.onScaleSettled(); }
      else busy = true;
    }
    if (this.tiltK) {
      const target = this.mode === 'rest' ? 0 : clamp(this.vx * .006, -7, 7) * this.tiltK;
      this.tilt += (target - this.tilt) * Math.min(1, dt * 11);
      if (Math.abs(this.tilt) > .02 || Math.abs(target) > .02) busy = true; else this.tilt = 0;
    }
    return busy;
  }
}
function draggable(body, handle, o = {}) {
  let id = null, sx, sy, px, py, moved = false, tgt = null, holdT = 0, held = false;
  handle.addEventListener('pointerdown', e => {
    if (id !== null || (e.pointerType === 'mouse' && e.button !== 0)) return;
    if (e.target.closest('button, input, .lights')) return;
    if (o.accept && !o.accept(e)) return;
    e.stopPropagation();
    id = e.pointerId; tgt = e.target; try { handle.setPointerCapture(id); } catch (_) {}
    sx = body.x; sy = body.y; px = e.clientX; py = e.clientY; moved = false;
    body.grab(); body.samples.push({ t: e.timeStamp, x: sx, y: sy }); o.down && o.down(e);
    held = false; clearTimeout(holdT); if (o.hold) holdT = setTimeout(() => { if (!moved && id !== null) { held = true; o.hold(e); } }, 500);
  });
  handle.addEventListener('pointermove', e => {
    if (e.pointerId !== id) return;
    const dx = e.clientX - px, dy = e.clientY - py;
    if (!moved && Math.hypot(dx, dy) > (held ? 12 : 6)) { moved = true; clearTimeout(holdT); if (held) { held = false; o.holdCancel && o.holdCancel(); } o.moveStart && o.moveStart(); }
    if (moved) { const k = o.scale ? o.scale() : 1; body.dragTo(sx + dx / k, sy + dy / k, e.timeStamp); o.move && o.move(e); }
  });
  const end = e => {
    if (e.pointerId !== id) return; id = null; o.up && o.up(e);
    clearTimeout(holdT);
    if (!moved) { body.el.classList.remove('dragging'); body.vx = body.vy = 0; body.mode = 'rest'; wake(body); if (held) { held = false; return; } if (e.type === 'pointerup') o.tap && o.tap(e, tgt); return; }
    const v = body.velocity(e.timeStamp);
    if (o.end && o.end(e, v) === false) { body.el.classList.remove('dragging'); return; }
    body.release(v.x, v.y);
  };
  handle.addEventListener('pointerup', end); handle.addEventListener('pointercancel', end);
}
document.addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  const g = e.target.closest && e.target.closest('.glass'); if (!g) return;
  const r = g.getBoundingClientRect();
  g.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
  g.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
}, { passive: true });

function slidePill(pill, btn, instant) {
  const l = btn.offsetLeft, r = l + btn.offsetWidth;
  const cur = parseFloat(getComputedStyle(pill).getPropertyValue('--l')) || l;
  const right = l > cur;
  pill.style.transition = instant || reduceMotion ? 'none' :
    (right ? `--r ${SPR_FAST.d}ms ${SPR_FAST.e}, --l ${SPR.d}ms ${SPR.e} 40ms, opacity .3s` : `--l ${SPR_FAST.d}ms ${SPR_FAST.e}, --r ${SPR.d}ms ${SPR.e} 40ms, opacity .3s`);
  pill.style.setProperty('--l', l + 'px'); pill.style.setProperty('--r', r + 'px');
}
// FLIP a window's glass shell from where it was to where it ends up
function morph(inner, mutate, opts = {}) {
  const a = inner.getBoundingClientRect();
  mutate();
  const b = inner.getBoundingClientRect();
  if (reduceMotion || !b.width || !b.height) return;
  const ps = opts.parentScale || 1;
  inner.animate([
    { transform: `translate(${(a.left - b.left) / ps}px,${(a.top - b.top) / ps}px) scale(${a.width / b.width},${a.height / b.height})` },
    { transform: 'none' }], { duration: (opts.spr || SPR_OPEN).d, easing: (opts.spr || SPR_OPEN).e });
  for (const c of inner.children) if (!c.classList.contains('lights')) c.animate([{ opacity: 0 }, { opacity: 0, offset: .2 }, { opacity: 1 }], { duration: 360, easing: 'cubic-bezier(.2,.8,.2,1)' });
}

/* ---------- day mood (Apple emoji images) ---------- */
// t = which of the 8 base moods it behaves like (background palette + app suggestions)
const TONES = [
  ['#f6d9a0', '#f3bba6', '#f7e8c6', '#d8e6cf'], ['#f3e2b3', '#cfe3d6', '#f2c9b8', '#dcd6ea'], ['#bdd5cf', '#c8d2e6', '#d7e4d3', '#a9c3bf'], ['#cfe3d6', '#e4dcef', '#f3e6cf', '#bcd8ca'],
  ['#dcd6ea', '#c9cfe6', '#efdfe6', '#d1dae8'], ['#f4bea5', '#f6d59b', '#f0a99b', '#f3e2c4'], ['#e1e5e9', '#d9d3ea', '#cfe3d6', '#eee5d5'], ['#b8c3dc', '#cabfdb', '#a8b8ce', '#dfd2c2']];
const MOODS = [
  ['2600-fe0f', 'Sunny', 0], ['1f324-fe0f', 'Bright', 1], ['1f327-fe0f', 'Rainy', 2], ['1f60c', 'Calm', 3], ['1f971', 'Sleepy', 4], ['1f525', 'Fired up', 5], ['1f4ad', 'Thoughtful', 6], ['1f319', 'Late night', 7],
  // feelings
  ['1f60a', 'Happy', 1], ['1f642', 'Fine', 3], ['1f604', 'Cheerful', 0], ['1f970', 'Loved', 0], ['1f60d', 'Smitten', 5], ['1f929', 'Excited', 5], ['1f60e', 'Confident', 0], ['1f973', 'Celebrating', 5],
  ['1f607', 'Grateful', 3], ['1f979', 'Touched', 3], ['1f914', 'Curious', 6], ['1f610', 'Flat', 6], ['1fae0', 'Melting', 4], ['1f62e-200d-1f4a8', 'Relieved', 3], ['1f614', 'Down', 2], ['1f622', 'Sad', 2],
  ['1f62d', 'Crying', 2], ['1f624', 'Frustrated', 5], ['1f621', 'Angry', 5], ['1f92f', 'Overwhelmed', 6], ['1f634', 'Tired', 4], ['1f62a', 'Drowsy', 4], ['1f912', 'Unwell', 4], ['1f637', 'Sick', 4],
  // weather & seasons
  ['26c5', 'Cloudy', 1], ['2601-fe0f', 'Grey', 2], ['26c8-fe0f', 'Stormy', 2], ['1f308', 'Rainbow', 1], ['2744-fe0f', 'Cold', 2], ['1f338', 'Spring', 3], ['1f342', 'Autumn', 0], ['1f30a', 'Wavy', 2], ['1f33f', 'Fresh', 3],
  // the day
  ['2615', 'Coffee', 0], ['1f4da', 'Studying', 6], ['1f3a7', 'Music', 3], ['1f4f7', 'Shooting film', 1], ['1f3c3', 'Active', 5], ['1f9d8', 'Mindful', 3], ['1f389', 'Party', 5], ['1f4aa', 'Strong', 5],
  ['2764-fe0f', 'Love', 0], ['2728', 'Sparkly', 1], ['1f4a1', 'Inspired', 6], ['1f35c', 'Comfort food', 7],
].map(([u, n, t]) => ({ u, n, t, c: TONES[t] }));
MOODS.push(...[
  ["1f600", "Grinning", 0],
  ["1f601", "Beaming", 0],
  ["1f602", "Laughing", 5],
  ["1f923", "Rolling with laughter", 5],
  ["1f605", "Phew", 1],
  ["1f606", "Giggly", 0],
  ["1f609", "Playful", 1],
  ["1f60b", "Yum", 0],
  ["1f61c", "Silly", 5],
  ["1f92a", "Goofy", 5],
  ["1f917", "Huggy", 3],
  ["1f92d", "Giggling", 1],
  ["1f92b", "Quiet", 6],
  ["1f928", "Doubtful", 6],
  ["1f611", "Blank", 6],
  ["1f644", "Eye roll", 6],
  ["1f60f", "Smug", 5],
  ["1f612", "Unimpressed", 2],
  ["1f62c", "Awkward", 6],
  ["1f615", "Confused", 6],
  ["1f61f", "Worried", 2],
  ["1f641", "A bit sad", 2],
  ["1f62e", "Surprised", 1],
  ["1f632", "Amazed", 1],
  ["1f633", "Embarrassed", 5],
  ["1f97a", "Pleading", 3],
  ["1f628", "Scared", 2],
  ["1f630", "Anxious", 2],
  ["1f625", "Disappointed", 2],
  ["1f613", "Stressed", 2],
  ["1f629", "Weary", 4],
  ["1f62b", "Exhausted", 4],
  ["1f924", "Hungry", 0],
  ["1f922", "Queasy", 4],
  ["1f927", "Sneezy", 2],
  ["1f975", "Too hot", 5],
  ["1f976", "Freezing", 2],
  ["1f974", "Woozy", 4],
  ["1f635", "Dizzy", 4],
  ["1f913", "Nerdy", 6],
  ["1f9d0", "Focused", 6],
  ["1f636", "Speechless", 6],
  ["1f978", "Incognito", 7],
  ["1fae1", "Ready", 0],
  ["1fae3", "Shy", 3],
  ["1fae2", "Gasp", 1],
  ["1fae4", "Meh", 6],
  ["1f972", "Bittersweet", 3],
  ["1f9e1", "Warm heart", 0],
  ["1f49b", "Sunny heart", 0],
  ["1f49a", "Green heart", 3],
  ["1f499", "Blue heart", 2],
  ["1f49c", "Purple heart", 7],
  ["1f90e", "Brown heart", 0],
  ["1f5a4", "Black heart", 7],
  ["1f90d", "White heart", 3],
  ["1fa77", "Pink heart", 3],
  ["1fa75", "Light blue heart", 2],
  ["1f494", "Heartbroken", 2],
  ["1f495", "Two hearts", 3],
  ["1f496", "Sparkling heart", 1],
  ["1f49d", "Gift of love", 5],
  ["1f31e", "Sun face", 0],
  ["2b50", "Star", 1],
  ["1f31f", "Shining", 1],
  ["26a1", "Electric", 5],
  ["1f32a-fe0f", "Tornado", 2],
  ["1f32b-fe0f", "Foggy", 2],
  ["1f321-fe0f", "Feverish", 5],
  ["2603-fe0f", "Snowy", 2],
  ["1f343", "Breezy", 3],
  ["1f341", "Maple", 0],
  ["1f33b", "Sunflower", 0],
  ["1f337", "Tulip", 3],
  ["1f339", "Rose", 5],
  ["1f335", "Prickly", 0],
  ["1f340", "Lucky", 3],
  ["1f344", "Forest", 6],
  ["1f3d4-fe0f", "Mountains", 2],
  ["1f3d6-fe0f", "Beach day", 0],
  ["1f305", "Sunrise", 0],
  ["1f307", "Sunset", 0],
  ["1f303", "City night", 7],
  ["1f30c", "Stargazing", 7],
  ["1f315", "Full moon", 7],
  ["1f431", "Cat", 3],
  ["1f436", "Dog", 0],
  ["1f430", "Bunny", 3],
  ["1f43c", "Panda", 3],
  ["1f98a", "Fox", 0],
  ["1f427", "Penguin", 2],
  ["1f425", "Chick", 1],
  ["1f98b", "Butterfly", 1],
  ["1f41d", "Busy bee", 5],
  ["1f422", "Slow day", 4],
  ["1f375", "Tea", 3],
  ["1f9cb", "Bubble tea", 1],
  ["1f370", "Cake", 5],
  ["1f369", "Donut", 0],
  ["1f34e", "Apple", 3],
  ["1f353", "Strawberry", 5],
  ["1f951", "Avocado", 3],
  ["1f355", "Pizza", 5],
  ["1f35d", "Pasta", 0],
  ["1f363", "Sushi", 3],
  ["1f957", "Salad", 3],
  ["1f964", "Iced drink", 1],
  ["1f377", "Wine", 7],
  ["1f37a", "Beer", 7],
  ["1f3a8", "Creative", 6],
  ["1f3ac", "Movie night", 7],
  ["1f3ae", "Gaming", 5],
  ["1f3b8", "Guitar", 0],
  ["1f3a4", "Karaoke", 5],
  ["1f3b5", "Humming", 1],
  ["26bd", "Football", 5],
  ["1f3c0", "Basketball", 5],
  ["1f6b4", "Cycling", 1],
  ["1f3ca", "Swimming", 2],
  ["1f6b6", "Walking", 3],
  ["1f3cb-fe0f", "Lifting", 5],
  ["2708-fe0f", "Travelling", 1],
  ["1f686", "Train ride", 2],
  ["1f6b2", "Bike ride", 1],
  ["1f697", "Driving", 0],
  ["1f3e0", "At home", 3],
  ["1f3eb", "School", 6],
  ["1f3e2", "Work", 6],
  ["26fa", "Camping", 0],
  ["1f3a1", "Day out", 1],
  ["1f5fa-fe0f", "Exploring", 1],
  ["1f4bb", "Laptop", 6],
  ["1f4f1", "Phone", 6],
  ["1f4dd", "Writing", 6],
  ["270f-fe0f", "Sketching", 6],
  ["1f4d6", "Reading", 3],
  ["1f4c5", "Busy day", 5],
  ["23f0", "Early start", 0],
  ["1f381", "Gift", 5],
  ["1f388", "Balloon", 1],
  ["1f56f-fe0f", "Candlelight", 7],
  ["1f6cf-fe0f", "Bedtime", 4],
  ["1f6c1", "Bath", 3],
  ["1f9f9", "Cleaning", 1],
  ["1f48a", "Medicine", 4],
  ["1f4fc", "Retro", 7],
  ["1f39e-fe0f", "Film", 7],
  ["1f4f8", "Snapshot", 1],
  ["2705", "Done", 3],
  ["274c", "Nope", 5],
  ["2757", "Important", 5],
  ["2753", "Unsure", 6],
  ["1f4af", "Perfect", 5],
  ["1f4a4", "Zzz", 4],
  ["1f4ac", "Chatty", 1],
  ["1f4ab", "Dazed", 4],
  ["1f3c6", "Winning", 5],
  ["1f947", "First place", 5],
  ["1f3af", "On target", 5]
].map(([u, n, t]) => ({ u, n, t, c: TONES[t] })));
// common feelings: [emoji, name, a line for the day, words people type for it, family]
const EMOTIONS = [
  ['1f60a', 'Happy', 'Have a nice day!', 'good glad nice great fine', 'bright'],
  ['1f604', 'Cheerful', 'Go chase the good light.', 'joy joyful bright sunny', 'bright'],
  ['1f602', 'Laughing', 'Keep that laugh close.', 'funny lol haha', 'bright'],
  ['1f970', 'Loved', 'You are cared for.', 'love warm cared', 'bright'],
  ['1f60d', 'In love', 'Write this day down.', 'crush adore romance', 'bright'],
  ['1f973', 'Celebrating', 'Well done. Enjoy it.', 'party win birthday proud', 'bright'],
  ['1f929', 'Excited', 'Aim it at one good thing.', 'thrilled pumped hyped', 'bright'],
  ['1f60e', 'Confident', 'You’ve got this.', 'proud cool strong', 'bright'],
  ['1f607', 'Grateful', 'Name one small thank-you.', 'thankful blessed lucky', 'bright'],
  ['1f979', 'Touched', 'Let it sink in.', 'moved hopeful emotional', 'calm'],
  ['1f60c', 'Calm', 'Slow is fine today.', 'peaceful relaxed chill', 'calm'],
  ['1f642', 'Content', 'An okay day is a good day.', 'okay fine alright', 'calm'],
  ['1f62e-200d-1f4a8', 'Relieved', 'That’s behind you now.', 'phew relief finally', 'calm'],
  ['1f61c', 'Playful', 'Make something for fun.', 'silly goofy fun', 'bright'],
  ['1f914', 'Curious', 'Follow the question.', 'wonder thinking interested', 'calm'],
  ['1f9d0', 'Focused', 'One thing at a time.', 'busy work study productive', 'calm'],
  ['1f610', 'Meh', 'Small steps still count.', 'bored flat neutral blah', 'low'],
  ['1f644', 'Annoyed', 'Let it pass you by.', 'irritated bothered', 'tense'],
  ['1f615', 'Confused', 'Not knowing yet is okay.', 'lost unsure puzzled', 'tense'],
  ['1f633', 'Embarrassed', 'Nobody’s keeping score.', 'awkward ashamed', 'tense'],
  ['1f62e', 'Surprised', 'Well, that was new.', 'shocked wow amazed', 'bright'],
  ['1fae3', 'Shy', 'Quiet is allowed.', 'nervous timid', 'calm'],
  ['1f634', 'Tired', 'Rest is part of the work.', 'sleep sleepy rest', 'tired'],
  ['1f971', 'Sleepy', 'Do the smallest thing first.', 'yawn drowsy tired', 'tired'],
  ['1f62b', 'Exhausted', 'You’ve done enough today.', 'drained burnt out worn tired', 'tired'],
  ['1fae0', 'Melting', 'Step away for ten minutes.', 'hot overwhelmed done', 'tired'],
  ['1f622', 'Sad', 'This feeling will pass.', 'unhappy blue upset', 'low'],
  ['1f614', 'Down', 'Be kind to yourself today.', 'low gloomy unmotivated', 'low'],
  ['1f62d', 'Crying', 'You don’t have to be okay.', 'cry upset tears', 'low'],
  ['1f97a', 'Lonely', 'Reach out to one person.', 'alone miss missing', 'low'],
  ['1f494', 'Heartbroken', 'Go easy on yourself.', 'breakup hurt grief', 'low'],
  ['1f972', 'Bittersweet', 'Both can be true today.', 'nostalgic mixed', 'calm'],
  ['1f61f', 'Worried', 'Write the worry down.', 'concerned uneasy', 'tense'],
  ['1f630', 'Anxious', 'Breathe in four, out six.', 'nervous panic anxiety', 'tense'],
  ['1f628', 'Scared', 'Brave can feel like this.', 'afraid fear', 'tense'],
  ['1f613', 'Stressed', 'Do just the first task.', 'pressure deadline busy', 'tense'],
  ['1f92f', 'Overwhelmed', 'Pick one thing only.', 'too much swamped', 'tense'],
  ['1f624', 'Frustrated', 'Take a short walk.', 'stuck annoyed', 'tense'],
  ['1f621', 'Angry', 'Let it cool first.', 'mad furious rage', 'tense'],
  ['1f912', 'Unwell', 'Rest and drink water.', 'sick ill fever', 'tired'],
  ['1f525', 'Fired up', 'Start with the hard part.', 'motivated energy driven', 'bright'],
];
const EMO = EMOTIONS.map(([u, n, q, kw, fam]) => { const i = MOODS.findIndex(m => m.u === u); if (i < 0) return -1; Object.assign(MOODS[i], { n, q, kw: (n + ' ' + kw).toLowerCase(), fam }); return i; }).filter(i => i >= 0);
for (let i = EMO.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [EMO[i], EMO[j]] = [EMO[j], EMO[i]]; }   // no fixed order
const FAMS = [['all', 'All', '2728'], ['bright', 'Bright', '1f60a'], ['calm', 'Calm', '1f60c'], ['low', 'Low', '1f614'], ['tense', 'Tense', '1f630'], ['tired', 'Tired', '1f634']];
// emoji: bundled Apple images when present, otherwise the device's own emoji font (Apple Color Emoji on iPad and Mac)
const emoChar = u => String.fromCodePoint(...u.split('-').map(h => parseInt(h, 16)));
const emoImg = (u, px = 16, cls = 'emo', label = '', extra = '') => EMOJI[u]
  ? `<img class="${cls}" src="${EMOJI[u]}" width="${px}" height="${px}" alt="${esc(label)}" draggable="false"${extra}>`
  : `<span class="${cls} emo-t" style="font-size:${Math.round(px * .86)}px;width:${px}px;height:${px}px" role="img" aria-label="${esc(label)}">${emoChar(u)}</span>`;
const emoU = (u, px = 16) => emoImg(u, px);
const emo = (i, px = 16) => emoImg(MOODS[i].u, px, 'emo', MOODS[i].n);
const APPS = {
  lang: { name: 'Olaa Language', tip: 'English practice', sug: [
    'Good energy. Try 15 minutes of speaking practice.', 'Learn 10 new words while the day is light.', 'Stay in with a podcast episode and its transcript.',
    'A slow reading session suits today.', 'Keep it light: a 5-minute flashcard review.', 'Take on the weekly challenge.',
    'Write a short journal entry in English.', 'One short review, then sleep.'] },
  habit: { name: 'Olaa Habits', tip: 'Habit tracking', sug: [
    'A good day for your outdoor habits.', 'Tick off your morning routine first.', 'Indoor habits first: stretch, then read.',
    'Keep the streak alive with something small.', 'Do the smallest habit on your list.', 'Go for the hardest habit today.',
    'Look back at this week’s streaks.', 'Log today’s habits before bed.'] },
};
const field = $('#field'), moodsEl = $('#moods'), moodPill = $('#moodPill');
let recents = [0, 1, 2, 3, 4, 5, 6, 7];
try { const r = JSON.parse(localStorage.getItem('olaa-recent-moods') || 'null'); if (Array.isArray(r)) { const ok = r.filter(n => MOODS[n]); if (ok.length) recents = ok.slice(0, 8); } } catch (_) {}
function renderQuick() {
  moodsEl.querySelectorAll('.mood').forEach(b => b.remove());
  recents.forEach(i => {
    const m = MOODS[i], b = document.createElement('button'); b.className = 'mood'; b.dataset.i = i; b.innerHTML = emo(i, 26);
    b.setAttribute('aria-label', m.n); b.setAttribute('aria-pressed', String(current && current.mood === i)); b.title = m.n;
    b.addEventListener('click', () => { setMood(i, true); setTimeout(() => toggleMoodRow(false), 380); });
    moodsEl.append(b);
  });
  const more = document.createElement('button'); more.className = 'mood more'; more.setAttribute('aria-label', 'All emoji'); more.title = 'All emoji';
  more.innerHTML = '<svg class="i" viewBox="0 0 24 24"><circle cx="6" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="18" cy="12" r="1.3"/></svg>';
  more.addEventListener('click', () => openEmojiPop()); moodsEl.append(more);
}
function useRecent(i) { recents = [i, ...recents.filter(x => x !== i)].slice(0, 8); try { localStorage.setItem('olaa-recent-moods', JSON.stringify(recents)); } catch (_) {} renderQuick(); }
const moodBtn = $('#moodBtn');
function syncMoodBtn() {
  const m = current && current.mood;
  $('#moodFace').innerHTML = m == null ? '<i class="ph"></i>' : emo(m, 28);
}
function toggleMoodRow(open) {
  const was = !moodsEl.hidden; if (open === undefined) open = !was; if (open === was) return;
  closeEmojiPop();
  const wasCentered = Math.abs(W.today.body.x - (vw() - $('#topWin').offsetWidth * W.today.body.s) / 2) < 8 || !!fullKey;
  morph($('#topWin'), () => {
    moodsEl.hidden = !open; moodBtn.setAttribute('aria-expanded', String(open)); $('#topbar').classList.toggle('picking', open);
    if (wasCentered && fullKey !== 'today') centerTop(false);
  }, { spr: SPR_OPEN });
  if (open) {
    if (current.mood != null && moodsEl.querySelector(`[data-i="${current.mood}"]`)) { slidePill(moodPill, moodsEl.querySelector(`[data-i="${current.mood}"]`), true); moodPill.classList.add('on'); } else moodPill.classList.remove('on');
    moodsEl.querySelectorAll('.mood').forEach((b, i) => b.animate([{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }], { duration: SPR.d, easing: SPR.e, delay: i * 22, fill: 'backwards' }));
  }
}
moodBtn.addEventListener('click', () => emojiOpen ? closeEmojiPop() : openEmojiPop());
moodBtn.addEventListener('keydown', e => { if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEmojiPop(); } });
// full emoji picker
const emojiPop = $('#emojiPop'); let emojiOpen = false;
const emoBtn = i => `<button data-i="${i}" aria-label="${esc(MOODS[i].n)}" title="${esc(MOODS[i].n)}">${emo(i, 28)}</button>`;
const CAT_TONE = { 'Smileys & People': 1, 'Animals & Nature': 3, 'Food & Drink': 0, 'Activity': 5, 'Travel & Places': 1, 'Objects': 6, 'Symbols': 6, 'Flags': 1 };
const CAT_ICON = [['Feelings', '1f60a'], ['Smileys & People', '1f604'], ['Animals & Nature', '1f431'], ['Food & Drink', '1f35c'], ['Activity', '26bd'], ['Travel & Places', '2708-fe0f'], ['Objects', '1f4a1'], ['Symbols', '2764-fe0f'], ['Flags', null]];
let pickerBuilt = false, allEmoji = null, allLoading = null;
const nameOf = {}, catOf = {};
function quoteOf(i) { return i == null ? '' : (MOODS[i].q || MOODS[i].n); }
function setPreview(i) {
  $('#ePrevE').innerHTML = i == null ? '<i class="ph"></i>' : emo(i, 36);
  $('#ePrevN').textContent = i == null ? "How's today?" : MOODS[i].n;
  $('#ePrevQ').textContent = i == null ? 'Pick a feeling, or any emoji.' : quoteOf(i);
}
function previewCode(u) { $('#ePrevE').innerHTML = emoU(u, 36); $('#ePrevN').textContent = nameOf[u] || ''; $('#ePrevQ').textContent = catOf[u] || ''; }
function moodIndexFor(u) {        // any emoji can be today's: it borrows colours from its category
  let i = MOODS.findIndex(m => m.u === u); if (i >= 0) return i;
  const t = CAT_TONE[catOf[u]] ?? 3; MOODS.push({ u, n: nameOf[u] || 'Emoji', t, c: TONES[t] }); return MOODS.length - 1;
}
function suggestions() {
  const h = new Date().getHours();
  const byTime = h < 11 ? ['1f60a', '1f971', '1f60c', '1f929', '1f9d0'] : h < 17 ? ['1f9d0', '1f642', '1f634', '1f914', '1f613'] : h < 22 ? ['1f60c', '1f607', '1f634', '1f60a', '1f62b'] : ['1f971', '1f634', '1f972', '1f60c', '1f97a'];
  const ids = [...recents.slice(0, 2), ...byTime.map(u => MOODS.findIndex(m => m.u === u))];
  return [...new Set(ids)].filter(i => i >= 0 && MOODS[i]).slice(0, 6);
}
function loadAllEmoji() {
  if (allEmoji || allLoading) return allLoading;
  allLoading = fetch('data/emoji-all.json').then(r => r.json()).then(d => {
    if (d.img) for (const k in d.img) if (!EMOJI[k]) EMOJI[k] = 'data:image/webp;base64,' + d.img[k];
    d.cats.forEach(([c, rows]) => rows.forEach(([u, n, kw]) => { nameOf[u] = n; catOf[u] = c; }));
    allEmoji = d; return d;
  }).catch(() => { allLoading = null; const n = $('#eLoad'); if (n) n.textContent = 'Couldn’t load the full emoji set. Try again in a moment.'; });
  return allLoading;
}
function fillCategory(sec) {
  if (sec.dataset.done || !allEmoji) return; sec.dataset.done = '1';
  const rows = allEmoji.cats.find(c => c[0] === sec.dataset.g)[1];
  sec.querySelector('.egrid').innerHTML = rows.map(([u, n]) => `<button data-u="${u}" title="${esc(n)}" aria-label="${esc(n)}">${emoImg(u, 28, 'emo', '', ' loading="lazy" decoding="async"')}</button>`).join('');
  sec.querySelector('.egrid').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260 });
}
let io = null;
function buildPicker() {
  emojiPop.innerHTML = `<div class="ehd"><span class="eprev" id="ePrevE"></span><div class="eprevt"><b id="ePrevN"></b><small id="ePrevQ"></small></div><button class="ghost" id="eReset">Standard icon</button></div>
    <input class="esearch" id="eSearch" type="search" placeholder="Type how you feel, or search all emoji" aria-label="Search emoji" autocomplete="off">
    <div class="escroll" id="eScroll">
      <section data-g="Results" hidden><h5>Results</h5><div class="egrid" id="eRes"></div><p class="enone" hidden>No emoji match that word.</p></section>
      <section data-g="Feelings"><h5 id="eSugT">Suggested for you</h5><div class="egrid" id="eSug"></div><h5>Feelings</h5><div class="egrid" id="eAll">${EMO.map(emoBtn).join('')}</div></section>
      ${CAT_ICON.slice(1).map(([g]) => `<section data-g="${g}" class="ecat"><h5>${g}</h5><div class="egrid"><p class="eload" id="${g === 'Smileys & People' ? 'eLoad' : ''}">Loading…</p></div></section>`).join('')}
    </div>
    <div class="etabs" id="eFam">${CAT_ICON.map(([g, u]) => `<button data-f="${g}" title="${g}" aria-label="${g}">${u ? emoU(u, 22) : '<svg class="i" viewBox="0 0 24 24"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>'}</button>`).join('')}</div>`;
  emojiPop.addEventListener('click', e => {
    const b = e.target.closest('.egrid button');
    if (b && pickFor) { const u = b.dataset.u || MOODS[+b.dataset.i].u, list = pickFor; closeEmojiPop(); return setIcons(list, u); }
    if (b) { const i = b.dataset.u ? moodIndexFor(b.dataset.u) : +b.dataset.i; useRecent(i); setMood(i, true); setPreview(i); markPressed(); setTimeout(closeEmojiPop, 380); return; }
    if (e.target.closest('#eReset')) { const list = pickFor; closeEmojiPop(); return setIcons(list, null); }
    const t = e.target.closest('.etabs button');
    if (t) { const sec = emojiPop.querySelector(`section[data-g="${t.dataset.f}"]`); if ($('#eSearch').value) { $('#eSearch').value = ''; filterPicker(); }
      loadAllEmoji(); $('#eScroll').scrollTo({ top: sec.offsetTop - 4, behavior: reduceMotion ? 'auto' : 'smooth' }); markTab(t.dataset.f); }
  });
  const sc = $('#eScroll');
  sc.addEventListener('pointerover', e => { const b = e.target.closest('.egrid button'); if (!b || e.pointerType !== 'mouse') return; b.dataset.u ? previewCode(b.dataset.u) : setPreview(+b.dataset.i); });
  sc.addEventListener('pointerleave', () => { if (!pickFor) setPreview(current.mood); });
  sc.addEventListener('scroll', () => { const secs = [...emojiPop.querySelectorAll('section:not([hidden])')]; const top = sc.scrollTop + 30; let cur = secs[0]; secs.forEach(x => { if (x.offsetTop <= top) cur = x; }); if (cur) markTab(cur.dataset.g); }, { passive: true });
  io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { loadAllEmoji().then(() => fillCategory(en.target)); } }), { root: sc, rootMargin: '300px' });
  emojiPop.querySelectorAll('section.ecat').forEach(x => io.observe(x));
  $('#eSearch').addEventListener('input', filterPicker);
  pickerBuilt = true;
}
function markTab(g) { $('#eFam').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === g))); }
function markPressed() { emojiPop.querySelectorAll('.egrid button[data-i]').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.i === current.mood))); }
function filterPicker() {
  const q = $('#eSearch').value.trim().toLowerCase(), words = q.split(/\s+/).filter(Boolean), res = emojiPop.querySelector('section[data-g="Results"]');
  emojiPop.querySelectorAll('section:not([data-g="Results"])').forEach(x => x.hidden = !!words.length);
  res.hidden = !words.length;
  $('#eSug').innerHTML = suggestions().map(emoBtn).join('');
  if (!words.length) { setPreview(current.mood); markPressed(); return; }
  // auto-suggest: feelings first, then every emoji whose name matches
  const feel = EMO.filter(i => words.every(w => MOODS[i].kw.includes(w)));
  const more = [];
  if (allEmoji) for (const [, rows] of allEmoji.cats) for (const [u, n, kw] of rows) { const hay = (n + ' ' + kw).toLowerCase(); if (words.every(w => hay.includes(w)) && !feel.some(i => MOODS[i].u === u)) more.push([u, n]); if (more.length > 80) break; }
  else loadAllEmoji().then(() => { if ($('#eSearch').value.trim()) filterPicker(); });
  $('#eRes').innerHTML = feel.map(emoBtn).join('') + more.map(([u, n]) => `<button data-u="${u}" title="${esc(n)}" aria-label="${esc(n)}">${emoU(u, 28)}</button>`).join('');
  res.querySelector('.enone').hidden = !!(feel.length || more.length);
  if (feel.length) setPreview(feel[0]); else if (more.length) previewCode(more[0][0]);
}
let pickFor = null;
function setIcons(list, u) {
  (list || []).forEach(f => { if (u) f.icon = u; else delete f.icon; refreshTile(f); if (f.kind === 'folder') refreshFolder(f); });
  if (railOn) enterRail();
  toast(u ? `New icon for ${list.length === 1 ? `“${list[0].name}”` : list.length + ' files'}` : 'Back to the standard icon');
  if (selecting) endSelect();
}
function openEmojiPop(opts = {}) {
  closePop(); if (!pickerBuilt) buildPicker();
  pickFor = opts.targets || null; emojiPop.classList.toggle('iconmode', !!pickFor);
  $('#eSearch').value = ''; filterPicker(); setPreview(current.mood); markTab('Feelings');
  emojiPop.hidden = false; emojiOpen = true; $('#eScroll').scrollTop = 0;
  if (pickFor) { $('#ePrevE').innerHTML = pickFor[0].icon ? emoU(pickFor[0].icon, 36) : '<i class="ph"></i>'; $('#ePrevN').textContent = 'Choose an icon'; $('#ePrevQ').textContent = pickFor.length === 1 ? `For “${pickFor[0].name}”` : `For ${pickFor.length} files`; }
  const r = (opts.anchor || moodBtn).getBoundingClientRect(), w = emojiPop.offsetWidth, h = emojiPop.offsetHeight;
  const below = r.bottom + 12 + h < vh() - 8 || r.top < vh() / 2;
  emojiPop.style.left = clamp(r.left + r.width / 2 - w / 2, 10, vw() - w - 10) + 'px'; emojiPop.style.top = clamp(below ? r.bottom + 12 : r.top - h - 12, 8, vh() - h - 8) + 'px';
  emojiPop.style.transformOrigin = `${r.left + r.width / 2 - parseFloat(emojiPop.style.left)}px 0px`;
  emojiPop.animate([{ opacity: 0, transform: 'scale(.9) translateY(-6px)' }, { opacity: 1, transform: 'none' }], { duration: SPR_OPEN.d, easing: SPR_OPEN.e });
  setTimeout(loadAllEmoji, 400);
}
function closeEmojiPop() {
  if (!emojiOpen) return; emojiOpen = false; pickFor = null;
  emojiPop.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(.95)' }], { duration: 160 }).onfinish = () => { if (!emojiOpen) emojiPop.hidden = true; };
}
document.addEventListener('pointerdown', e => {
  if (emojiOpen && !e.target.closest('#emojiPop, #moodBtn')) closeEmojiPop();
  else if (!moodsEl.hidden && !emojiOpen && !e.target.closest('#topbar')) toggleMoodRow(false);
});
function applyPalette(c) { ['--b1', '--b2', '--b3', '--b4'].forEach((k, j) => field.style.setProperty(k, c[j])); }
function setMood(i, user) {
  if (user && current.mood === i) i = null;
  current.mood = i;
  [...moodsEl.querySelectorAll('.mood[data-i]')].forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.i === i)));
  syncMoodBtn();
  if (user && i != null && !moodsEl.querySelector(`[data-i="${i}"]`)) useRecent(i);
  $('#moodName').textContent = i == null ? "How's today?" : quoteOf(i); $('#moodName').title = i == null ? '' : `${MOODS[i].n}. ${quoteOf(i)}`;
  if (i == null) { moodPill.classList.remove('on'); applyPalette(MOODS[1].c); }
  else {
    const target = moodsEl.querySelector(`[data-i="${i}"]`);
    if (target && !moodsEl.hidden) { slidePill(moodPill, target, !moodPill.classList.contains('on')); moodPill.classList.add('on'); }
    applyPalette(MOODS[i].c);
    if (user && !reduceMotion) ripple(target && !moodsEl.hidden ? target : moodBtn, MOODS[i].c[0]);
    if (user) moodBtn.animate([{ transform: 'scale(.6) rotate(-12deg)' }, { transform: 'none' }], { duration: SPR.d, easing: SPR.e });
  }
  updateMeta(); renderToday(); if (popApp) renderPop(popApp);
}
function ripple(el, color) {
  const r = el.getBoundingClientRect(); const d = document.createElement('div'); d.className = 'ripple';
  d.style.left = r.left + r.width / 2 + 'px'; d.style.top = r.top + r.height / 2 + 'px';
  d.style.background = `radial-gradient(closest-side, ${color}, transparent)`;
  document.body.append(d);
  const scale = Math.hypot(vw(), vh()) / 14;
  d.animate([{ transform: 'scale(.2)', opacity: .9 }, { transform: `scale(${scale})`, opacity: 0 }], { duration: 1400, easing: 'cubic-bezier(.2,.7,.2,1)' }).onfinish = () => d.remove();
}
const fmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const todayStr = fmt.format(new Date());
$('#today').textContent = todayStr;

/* ---------- app shortcuts (integrations come later) ---------- */
const appPop = $('#appPop'); let popApp = null;
function renderPop(key) {
  const a = APPS[key], m = current.mood, btn = $(`#topbar .app[data-app="${key}"]`);
  appPop.innerHTML = `<div class="hd"><span class="app app-${key === 'lang' ? 'lang' : 'habit'}">${btn.innerHTML}</span><div><b>${a.name}</b><small>${a.tip}</small></div></div>
    <p>${m == null ? 'Pick today’s mood and you’ll get a suggestion that fits it.' : `${emo(m, 18)} ${esc(MOODS[m].n)} today. ${esc(a.sug[MOODS[m].t])}`}</p>
    ${key === 'habit' ? `<div class="st"><b>${habitsFor(todayKey).size} of ${HABITS.length}</b> habits done today. Tick them off in the Today view (tap the date).</div>` : ''}
    <div class="st">Not connected yet. The link to the app comes in a later build.</div>
    <button class="cta" id="popOpen">Open ${a.name}</button>`;
  $('#popOpen').addEventListener('click', () => { toast(`${a.name} isn’t connected yet`); closePop(); });
}
function openPop(key, btn) {
  if (popApp === key) return closePop();
  popApp = key; renderPop(key); appPop.hidden = false;
  const r = btn.getBoundingClientRect(), w = appPop.offsetWidth;
  appPop.style.left = clamp(r.left + r.width / 2 - w / 2, 12, vw() - w - 12) + 'px'; appPop.style.top = r.bottom + 14 + 'px';
  appPop.animate([{ opacity: 0, transform: 'translateY(-10px) scale(.9)', filter: 'blur(8px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: SPR.d, easing: SPR.e });
}
function closePop() {
  if (!popApp) return; popApp = null;
  appPop.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(-6px) scale(.96)' }], { duration: 180 }).onfinish = () => { if (!popApp) appPop.hidden = true; };
}
document.querySelectorAll('#topbar .app').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); openPop(b.dataset.app, b); }));
document.addEventListener('pointerdown', e => { if (popApp && !e.target.closest('#appPop, #topbar .app')) closePop(); });

/* ---------- Today (full-screen view of the top window) ---------- */
/* ---------- Today: calendar, habits checklist and notes for any day ---------- */
const dkey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const TODAY = new Date(), todayKey = dkey(TODAY);
const hashKey = k => [...k].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7);
const daysAgo = k => { const [y, m, d] = k.split('-').map(Number); return Math.round((new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()) - new Date(y, m - 1, d)) / 864e5); };
const HABITS = [['water', 'Drink water', '1f964'], ['read', 'Read 10 pages', '1f4da'], ['photo', 'Take one photo', '1f4f7'], ['move', 'Move for 20 minutes', '1f4aa'], ['english', '10 minutes of English', '1f3a7', 'lang'], ['quiet', 'Five quiet minutes', '1f9d8']];
const EVENTS = [['07:00', 'Market shoot, Đà Lạt'], ['09:30', 'Film lab pickup'], ['10:00', 'Camera repair shop'], ['14:00', 'Study group'], ['15:30', 'Coffee with Linh'], ['18:30', 'English class'], ['19:30', 'Darkroom session']];
const habitLog = {}, touched = new Set(), dayMood = {};
try { const o = JSON.parse(localStorage.getItem('olaa-habits') || '{}'); for (const k in o) { if (!/^\d{4}-\d{2}-\d{2}$/.test(k) || !Array.isArray(o[k])) continue; habitLog[k] = new Set(o[k].filter(id => HABITS.some(h => h[0] === id))); touched.add(k); } } catch (_) {}   // only well-formed days and known habits are read back
function saveHabits() { try { const o = {}; touched.forEach(k => { o[k] = [...habitLog[k]]; }); localStorage.setItem('olaa-habits', JSON.stringify(o)); } catch (_) {} }
function habitsFor(k) {
  if (!habitLog[k]) { const ago = daysAgo(k); if (ago > 0 && ago <= 60) { const r = rng(hashKey(k)); habitLog[k] = new Set(HABITS.filter(() => r() < .6).map(h => h[0])); } else habitLog[k] = new Set(); }
  return habitLog[k];
}
const notesOn = k => [...walk(root)].filter(f => f.kind === 'note' && f.added && dkey(new Date(f.added)) === k);
function moodFor(k) {
  if (k === todayKey) return current.mood == null ? null : current.mood;
  if (k in dayMood) return dayMood[k];
  const n = notesOn(k).find(f => f.mood != null); if (n) return dayMood[k] = n.mood;
  const ago = daysAgo(k); if (ago > 0 && ago <= 60) { const r = rng(hashKey(k) + 3); return dayMood[k] = r() < .85 ? EMO[Math.floor(r() * EMO.length)] : null; }
  return dayMood[k] = null;
}
function eventsFor(k) {
  const r = rng(hashKey(k) + 11), n = Math.floor(r() * 3), out = new Map();
  for (let i = 0; i < n; i++) { const e = EVENTS[Math.floor(r() * EVENTS.length)]; out.set(e[1], e); }
  return [...out.values()].sort((a, b) => a[0].localeCompare(b[0]));
}
function streak() { let n = 0, d = new Date(TODAY); if (habitsFor(todayKey).size < 3) d.setDate(d.getDate() - 1); for (;;) { if (habitsFor(dkey(d)).size >= 3) { n++; d.setDate(d.getDate() - 1); } else return n; } }
const ringSvg = p => `<svg class="ring" viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="14"/><circle cx="18" cy="18" r="14" style="stroke-dasharray:${(p * 87.96).toFixed(1)} 88"/></svg>`;
let calMonth = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1), selKey = todayKey;
function renderCal() {
  const grid = $('#calGrid'); if (!grid || !$('#topbar').classList.contains('full')) return;
  $('#calTitle').textContent = calMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  const first = (calMonth.getDay() + 6) % 7, n = new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 0).getDate();
  let h = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => `<span class="wd">${d}</span>`).join('') + '<span></span>'.repeat(first);
  for (let d = 1; d <= n; d++) {
    const k = dkey(new Date(calMonth.getFullYear(), calMonth.getMonth(), d)), fut = k > todayKey;
    const m = fut ? null : moodFor(k), hb = fut ? 0 : habitsFor(k).size / HABITS.length, nd = !fut && notesOn(k).length;
    h += `<button class="cd${k === todayKey ? ' today' : ''}${k === selKey ? ' sel' : ''}" data-k="${k}" ${fut ? 'disabled' : ''} aria-label="${k}"><b>${d}</b>${m != null ? emo(m, 20) : '<i class="e0"></i>'}<span class="hb"><span style="width:${Math.round(hb * 100)}%"></span></span>${nd ? '<span class="nd"></span>' : ''}</button>`;
  }
  grid.innerHTML = h;
  $('#calNext').disabled = calMonth.getFullYear() === TODAY.getFullYear() && calMonth.getMonth() === TODAY.getMonth();
}
function renderDay() {
  const v = $('#dayView'); if (!v || !$('#topbar').classList.contains('full')) return;
  const [y, mo, d] = selKey.split('-').map(Number), date = new Date(y, mo - 1, d), isToday = selKey === todayKey, ago = daysAgo(selKey);
  const m = moodFor(selKey), done = habitsFor(selKey), ev = eventsFor(selKey), notes = notesOn(selKey);
  v.innerHTML = `<header class="dvhd"><div><b>${date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</b><small>${isToday ? 'Today' : ago === 1 ? 'Yesterday' : ago + ' days ago'}</small></div></header>
    <button class="dvmood" ${isToday ? '' : 'disabled'}>${m != null ? emo(m, 36) : '<i class="e0 big"></i>'}<span><b>${m != null ? esc(MOODS[m].n) : isToday ? 'How’s today?' : 'No feeling saved'}</b><small>${m != null ? esc(quoteOf(m)) : isToday ? 'Tap to pick a feeling.' : ''}</small></span></button>
    <section class="card"><h3><svg class="i" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>Calendar<small>Apple Calendar · sample events</small></h3>
      ${ev.length ? `<ul class="evs">${ev.map(([t, n]) => `<li><time>${t}</time><span>${esc(n)}</span></li>`).join('')}</ul>` : '<p class="note-s">Nothing on the calendar.</p>'}</section>
    <section class="card habits"><h3><span class="app app-habit sm"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.2" stroke-opacity=".38"/><path d="M12 4.8a7.2 7.2 0 1 1-6.85 4.97"/></svg></span>Habits<small>${done.size} of ${HABITS.length} done${ago > 0 && !touched.has(selKey) ? ' · sample' : ''}</small>${ringSvg(done.size / HABITS.length)}</h3>
      <div class="hlist">${HABITS.map(([id, n, e, from]) => `<button class="hab${done.has(id) ? ' on' : ''}" data-h="${id}" aria-pressed="${done.has(id)}"><span class="ck"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg></span>${emoU(e, 20)}<span class="hn">${esc(n)}</span>${from === 'lang' ? '<span class="from"><span class="app app-lang xs"><span class="gl">Aa</span></span>Language</span>' : ''}</button>`).join('')}</div>
      <p class="note-s">Streak: ${streak()} day${streak() === 1 ? '' : 's'} with at least half done.</p></section>
    <section class="card"><h3>Notes<small>${notes.length || 'none'}</small></h3>${notes.length ? `<div class="chips">${notes.map(f => `<button class="chip" data-id="${f.id}">${f.mood != null ? emo(f.mood, 16) : ''}${esc(f.name)}<small>${f.strokes.length} stroke${f.strokes.length === 1 ? '' : 's'}</small></button>`).join('')}</div>` : '<p class="note-s">No notes this day.</p>'}</section>
    <section class="card"><h3><span class="app app-lang sm"><span class="gl">Aa</span></span>Olaa Language</h3><p class="tip">${m != null ? esc(APPS.lang.sug[MOODS[m].t]) : 'Pick a feeling for a suggestion.'}</p></section>`;
}
function renderToday() { renderCal(); renderDay(); }
$('#calGrid').addEventListener('click', e => { const b = e.target.closest('.cd'); if (!b || b.disabled) return; selKey = b.dataset.k; renderToday(); $('#dayView').animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'ease-out' }); });
function slideCal(dir) { $('#calGrid').animate([{ opacity: 0, transform: `translateX(${dir * 22}px)` }, { opacity: 1, transform: 'none' }], { duration: 340, easing: 'cubic-bezier(.32,.72,0,1)' }); }
$('#calPrev').addEventListener('click', () => { calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1); renderCal(); slideCal(-1); });
$('#calNext').addEventListener('click', () => { calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1); renderCal(); slideCal(1); });
$('#dayView').addEventListener('click', e => {
  const h = e.target.closest('.hab');
  if (h) { const set = habitsFor(selKey), id = h.dataset.h; set.has(id) ? set.delete(id) : set.add(id); touched.add(selKey); saveHabits(); renderToday();
    const nb = $(`#dayView .hab[data-h="${id}"] .ck`); if (nb) nb.animate([{ transform: 'scale(.6)' }, { transform: 'scale(1.15)' }, { transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.3,1.6,.5,1)' }); return; }
  if (e.target.closest('.dvmood')) return openEmojiPop();
  const c = e.target.closest('.chip'); if (c) { const f = [...walk(root)].find(x => x.id === c.dataset.id); exitFull(); setTimeout(() => loadNote(f), 220); }
});

/* ---------- ink colours ---------- */
const INKS = ['graphite', 'fuji', 'kodak', 'ochre', 'sky'];
const INK_NAMES = { graphite: 'Graphite', fuji: 'Fuji green', kodak: 'Kodak red', ochre: 'Ochre', sky: 'Faded blue' };
const PALETTE = ['#2a2a2a', '#6d7173', '#a3a6a4', '#5b3a29', '#8c5a3c', '#b0473b', '#d8735a', '#e7a48f',
  '#e0a84f', '#c9a227', '#f2e3b5', '#8a9a4b', '#3d7c65', '#7fb59c', '#4f8f8a', '#cfe3d6',
  '#1f3a5f', '#5a7cab', '#9db8e0', '#7a6aa8', '#b9a2d6', '#b06a8f', '#e9b8c8', '#ffffff'];
let colorCache = {};
const themeColor = n => colorCache[n] || (colorCache[n] = getComputedStyle(document.documentElement).getPropertyValue(n).trim() || '#888');
const inkColor = n => n && n[0] === '#' ? n : themeColor('--ink-' + n);
const colorName = n => n && n[0] === '#' ? n.toUpperCase() : INK_NAMES[n];
// pencil grain: a tinted noise tile used as the stroke pattern
const grainTiles = {};
function pencilPattern(ctx, col) {
  let t = grainTiles[col];
  if (!t) {
    t = document.createElement('canvas'); t.width = t.height = 48; const g = t.getContext('2d'), r = rng(77);
    g.fillStyle = col;
    for (let i = 0; i < 950; i++) { g.globalAlpha = .22 + r() * .78; g.fillRect(r() * 48, r() * 48, .6 + r() * 1.1, .6 + r() * 1.1); }
    grainTiles[col] = t;
  }
  return ctx.createPattern(t, 'repeat');
}

/* ---------- stroke rendering ---------- */
// pen types: fountain (pressure + nib angle), ballpoint (even line), brush (strong pressure, tapered ends)
function widthFn(s, n) {
  const base = s.size, pr = s.pr !== false;
  if (s.tool === 'pencil') return p => base * (pr ? .45 + p * .9 : .9);
  if (s.type === 'ball') return p => base * (pr ? .82 + p * .32 : 1);
  if (s.type === 'brush') return (p, i) => { const tp = Math.max(0, Math.min(1, i / 7, (n - 1 - i) / 7)); return base * (pr ? .12 + p * 2.1 : 1.3) * (.25 + .75 * Math.pow(tp, .6)); };
  return (p, i, a, b) => { const ang = Math.atan2(b.y - a.y, b.x - a.x); return base * (pr ? .3 + p * 1.1 : .8) * (.72 + .5 * Math.abs(Math.sin(ang - Math.PI / 4))); };
}
function tracePath(ctx, pts, closed) {
  const n = pts.length; ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  if (n === 1) ctx.lineTo(pts[0].x + .01, pts[0].y);
  for (let i = 1; i < n - 1; i++) ctx.quadraticCurveTo(pts[i].x, pts[i].y, (pts[i].x + pts[i + 1].x) / 2, (pts[i].y + pts[i + 1].y) / 2);
  if (n > 1) ctx.lineTo(pts[n - 1].x, pts[n - 1].y);
  if (closed) ctx.closePath();
}
function drawStroke(ctx, s, extra) {
  const pts = extra && extra.length ? s.pts.concat(extra) : s.pts; const n = pts.length; if (!n) return;
  const col = inkColor(s.color);
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = col; ctx.fillStyle = col;
  if (s.tool === 'hl') {
    ctx.globalAlpha *= s.op || .3; ctx.lineWidth = s.size; if (s.flat) ctx.lineCap = 'butt';
    tracePath(ctx, pts); ctx.stroke(); ctx.restore(); return;
  }
  if (s.tool === 'pencil') { ctx.strokeStyle = ctx.fillStyle = pencilPattern(ctx, col); }
  if (s.tool === 'shape' || s.shaped) {
    ctx.lineWidth = s.size * (s.tool === 'shape' ? 1 : .95); tracePath(ctx, pts, s.closed);
    if (s.closed && s.fill) { ctx.save(); ctx.globalAlpha *= .16; ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
    ctx.stroke(); ctx.restore(); return;
  }
  const w = widthFn(s, n);
  if (n === 1) { ctx.beginPath(); ctx.arc(pts[0].x, pts[0].y, w(pts[0].p, 3, pts[0], pts[0]) / 2, 0, 7); ctx.fill(); ctx.restore(); return; }
  let px = pts[0].x, py = pts[0].y;
  for (let i = 1; i < n; i++) {
    const a = pts[i], last = i === n - 1;
    const mx = last ? a.x : (a.x + pts[i + 1].x) / 2, my = last ? a.y : (a.y + pts[i + 1].y) / 2;
    ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(a.x, a.y, mx, my);
    ctx.lineWidth = w((pts[i - 1].p + a.p) / 2, i, pts[Math.max(0, i - 3)], pts[Math.min(n - 1, i + 2)]); ctx.stroke(); px = mx; py = my;
  }
  ctx.restore();
}
function drawLaser(ctx, pts, color, alpha) {
  if (!pts.length) return;
  ctx.save(); ctx.globalAlpha = alpha; ctx.lineCap = ctx.lineJoin = 'round';
  ctx.strokeStyle = inkColor(color); ctx.shadowColor = inkColor(color); ctx.shadowBlur = 14; ctx.lineWidth = 5; tracePath(ctx, pts); ctx.stroke();
  ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 1.6; ctx.stroke(); ctx.restore();
}
function extent(strokes) { let w = SW, h = SH; for (const s of strokes) { const b = bbox(s); w = Math.max(w, b[2] + 24); h = Math.max(h, b[3] + 24); } return { w, h }; }
function paintStrokes(canvas, strokes, cssW, cssH) {
  const k = 2; canvas.width = Math.round(cssW * k); canvas.height = Math.round(cssH * k);
  const e = extent(strokes), ctx = canvas.getContext('2d'); const sc = Math.min(cssW / e.w, cssH / e.h) * k; ctx.setTransform(sc, 0, 0, sc, 0, 0);
  for (const s of strokes) drawStroke(ctx, s);
}

/* ---------- sample content ---------- */
function handwriting(seed, { x0 = 56, y0 = 120, lines = 5, gap = 46, size = 13, maxX = 640, color = 'graphite', pen = 2.2, words } = {}) {
  const r = rng(seed), out = [];
  for (let L = 0; L < lines; L++) {
    let x = x0 + (L === 0 ? 0 : r() * 8); const base = y0 + L * gap + (r() - .5) * 3;
    const end = maxX - (L === lines - 1 ? 180 + r() * 160 : r() * 60); let wc = 0;
    while (x < end && (!words || wc < words)) {
      const len = clamp(28 + r() * 70, 20, end - x); if (len < 18) break;
      const pts = [], cw = size * .72, ph0 = r() * 6; const hs = [];
      for (let t = 0; t <= len; t += 1.1) {
        const li = Math.floor(t / cw); if (hs[li] == null) hs[li] = size * (r() < .22 ? 1.55 : (.62 + r() * .3));
        const ph = t / cw * Math.PI * 2; const h = hs[li] * (.5 - .5 * Math.cos(ph));
        const y = base - h + Math.sin(t * .03 + ph0) * 1.2; const xx = x + t - size * .17 * Math.sin(ph) + (base - y) * .22;
        pts.push({ x: +xx.toFixed(1), y: +y.toFixed(1), p: +(.5 + .18 * Math.sin(t * .09 + ph0)).toFixed(2) });
      }
      out.push({ tool: 'pen', color, size: pen, pts }); x += len + 12 + r() * 10; wc++;
    }
  }
  return out;
}
function lineStroke(x1, y1, x2, y2, color, size, tool = 'pen', wob = 1.2, seed = 3) {
  const r = rng(seed), pts = [], n = Math.ceil(Math.hypot(x2 - x1, y2 - y1) / 3);
  for (let i = 0; i <= n; i++) { const t = i / n; pts.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t + Math.sin(t * 6 + r()) * wob, p: .45 + Math.sin(t * Math.PI) * .25 }); }
  return { tool, color, size, pts };
}
function loopStroke(cx, cy, rx, ry, color, size, seed = 5) {
  const r = rng(seed), pts = [];
  for (let a = -.4; a < Math.PI * 2.15; a += .06) pts.push({ x: cx + Math.cos(a) * rx * (1 + (r() - .5) * .04), y: cy + Math.sin(a) * ry * (1 + (r() - .5) * .04), p: .55 });
  return { tool: 'pen', color, size, pts };
}
const noteC41 = () => [...handwriting(11, { y0: 100, lines: 1, size: 19, pen: 2.8, maxX: 420, color: 'fuji', words: 3 }), lineStroke(56, 112, 330, 115, 'fuji', 2.2, 'pen', 1.5, 2),
  ...handwriting(12, { y0: 170, lines: 6, gap: 44 }), loopStroke(560, 214, 70, 26, 'kodak', 2), lineStroke(60, 300, 400, 300, 'ochre', 16, 'hl', .6, 4)];
const noteGrain = () => [...handwriting(21, { y0: 100, lines: 1, size: 19, pen: 2.8, maxX: 400, color: 'sky', words: 3 }), ...handwriting(22, { y0: 168, lines: 3, gap: 44 }),
  lineStroke(70, 330, 640, 330, 'graphite', 2, 'pen', .8, 7), lineStroke(70, 330, 70, 440, 'graphite', 2, 'pen', .5, 8),
  ...[[110, 420], [210, 400], [320, 380], [440, 352], [560, 345]].map(([x, y], i) => loopStroke(x, y, 6, 6, 'kodak', 2.4, 30 + i)),
  ...handwriting(23, { y0: 470, x0: 90, lines: 1, size: 11, maxX: 400, words: 4 })];
function noteGroceries() {
  const s = [...handwriting(31, { y0: 96, lines: 1, size: 19, pen: 2.8, maxX: 360, words: 2 })];
  for (let i = 0; i < 6; i++) {
    s.push(loopStroke(76, 158 + i * 46 - 6, 7, 7, 'graphite', 1.8, 40 + i));
    s.push(...handwriting(50 + i, { x0: 100, y0: 158 + i * 46, lines: 1, maxX: 420, words: 2 }));
    if (i < 3) s.push(lineStroke(96, 152 + i * 46, 300, 150 + i * 46, 'kodak', 2, 'pen', 1, 60 + i));
  }
  return s;
}
const noteItinerary = () => [...handwriting(71, { y0: 96, lines: 1, size: 19, pen: 2.8, maxX: 380, color: 'ochre', words: 2 }), ...handwriting(72, { y0: 160, lines: 7, gap: 42, maxX: 560 }),
  lineStroke(600, 170, 640, 400, 'sky', 2.4, 'pen', 4, 5)];
function photo(seed, pal, w = 360, h = 270) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); const r = rng(seed);
  const sky = x.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, pal[0]); sky.addColorStop(.7, pal[1]); x.fillStyle = sky; x.fillRect(0, 0, w, h);
  const sx = w * (.25 + r() * .5), sy = h * (.25 + r() * .2); const sun = x.createRadialGradient(sx, sy, 0, sx, sy, h * .45);
  sun.addColorStop(0, pal[2]); sun.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = sun; x.fillRect(0, 0, w, h);
  for (let L = 0; L < 3; L++) {
    x.fillStyle = pal[3 + L]; x.beginPath(); x.moveTo(0, h); const by = h * (.55 + L * .13), a = 10 + r() * 22, f = .006 + r() * .012, o = r() * 9;
    for (let i = 0; i <= w; i += 4) x.lineTo(i, by + Math.sin(i * f + o) * a + Math.sin(i * f * 3.1 + o) * a * .3);
    x.lineTo(w, h); x.fill();
  }
  const id = x.getImageData(0, 0, w, h), d = id.data;
  for (let i = 0; i < d.length; i += 4) { const g = (r() - .5) * 26; d[i] += g; d[i + 1] += g; d[i + 2] += g; }
  x.putImageData(id, 0, 0);
  const v = x.createRadialGradient(w / 2, h / 2, h * .3, w / 2, h / 2, h * .85); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(40,30,20,.32)');
  x.fillStyle = v; x.fillRect(0, 0, w, h);
  return c.toDataURL('image/jpeg', .82);
}

let uid = 0; const nid = () => 'f' + (++uid);
const mk = {
  note: (name, strokes = [], date = todayStr, mood = null, paper = 'grid') => ({ id: nid(), kind: 'note', name, strokes, date, mood, paper, undo: [], redo: [] }),
  folder: (name, children) => ({ id: nid(), kind: 'folder', name, children }),
  image: (name, src) => ({ id: nid(), kind: 'image', name, src }),
  text: (name, body) => ({ id: nid(), kind: 'text', name, body }),
  doc: (name, ext, size) => ({ id: nid(), kind: 'doc', name, ext, size }),
};
let current = Object.assign(mk.note('Untitled'), { draft: true });
const root = [
  current,
  mk.folder('Film chemistry', [
    mk.note('C-41 process', noteC41(), 'Tue 12 Nov', 6, 'lines'),
    mk.note('Grain & ISO', noteGrain(), 'Thu 14 Nov', 3, 'grid'),
    mk.image('Contact sheet', photo(7, ['#cbd9d6', '#efe3c9', '#fff3d6', '#8fae9f', '#6f8c7f', '#4f6a60'])),
    mk.text('reading-list.txt', 'Reading list\n\n1. Developer temperature: why C-41 is run at 37.8 °C\n2. Bleach vs. fix: what each bath removes\n3. Push processing and what it does to grain\n4. Expired stock: add one stop per decade\n\nAsk Linh for her notes from week 3.'),
    mk.folder('Old exams', [mk.text('quiz-2025.txt', 'Quiz, week 5\n\nQ1. Name the four C-41 steps in order.\nQ2. Why does colour negative film have an orange mask?\nQ3. What changes when you push Portra 400 to 800?')]),
  ]),
  mk.folder('Đà Lạt trip', [
    mk.image('Pine hill', photo(21, ['#c9d7dc', '#e9e0cc', '#fff6e0', '#a7bba3', '#7f9a83', '#5c765f'])),
    mk.image('Morning fog', photo(33, ['#dfe3e4', '#ece8e1', '#ffffff', '#c3cdc8', '#a9b7b1', '#8a9a94'])),
    mk.note('Itinerary', noteItinerary(), 'Sat 2 Nov', 0),
  ]),
  mk.image('Xuân Hương lake', photo(45, ['#f1d6c2', '#f4e3c4', '#fff0d0', '#d3a38c', '#a9826f', '#6e5b52'])),
  mk.note('Groceries', noteGroceries(), 'Mon 18 Nov', 1, 'lines'),
  mk.doc('Portra 400 datasheet', 'PDF', '1.4 MB'),
  mk.text('ideas.txt', 'Things to try this week\n\n- Shoot one roll at golden hour, Đà Lạt market\n- Scan at 3000 dpi and compare with lab scans\n- Write up the C-41 notes as a clean page\n- Find a cheap point-and-shoot for Minh'),
];
function* walk(list) { for (const f of list) { yield f; if (f.children) yield* walk(f.children); } }
// when each file was added (for Sort by date). Sample notes use their own date; other samples are a few days old.
(() => {
  const MON = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }, now = Date.now(); let k = 0;
  for (const f of walk(root)) {
    const m = f.kind === 'note' && /(\d{1,2}) (\w{3})/.exec(f.date);
    f.added = m ? new Date(new Date().getFullYear(), MON[m[2]], +m[1], 12).getTime() : f === current ? now : now - (3 + (k++ % 9)) * 864e5;
  }
  for (const key of Object.keys(mk)) { const fn = mk[key]; mk[key] = (...a) => Object.assign(fn(...a), { added: Date.now() }); }
})();

/* ---------- canvas + ink engine ---------- */
const sheetEl = $('#sheet'), sheetWin = $('#sheetWin'), baseC = $('#base'), liveC = $('#live'), hint = $('#hint'), cursorEl = $('#cursor'), paper = $('#sheet .paper');
const bctx = baseC.getContext('2d');
const lctx = liveC.getContext('2d', { desynchronized: true }) || liveC.getContext('2d');
let sheet;
// keep a window's corners on screen; a window bigger than the screen can still be panned across it
function span(size, view, m) { return size <= view - 2 * m ? [m, view - size - m] : [view - size - m, m]; }
function sheetBounds(b) { const m = fullKey === 'canvas' ? 0 : 8, [x0, x1] = span(PW * b.s, vw(), m), [y0, y1] = span(PH * b.s, vh(), m); return { minX: x0, maxX: x1, minY: y0, maxY: y1 }; }
let canvasK = 0;
// canvases match the window size (with headroom while resizing), never stretched
function allocCanvas(w, h, k) {
  CW = Math.ceil(w); CH = Math.ceil(h); canvasK = k;
  for (const [c, x] of [[baseC, bctx], [liveC, lctx]]) {
    c.width = Math.round(CW * k); c.height = Math.round(CH * k); c.style.width = CW + 'px'; c.style.height = CH + 'px'; x.setTransform(k, 0, 0, k, 0, 0);
  }
  redrawBase();
}
function sizeCanvases(force) {
  const k = Math.min(3, (devicePixelRatio || 1) * clamp(sheet.s, 1, 2));
  if (!force && Math.abs(k - canvasK) < .05 && CW === Math.ceil(PW) && CH === Math.ceil(PH)) return;
  allocCanvas(PW, PH, k);
}
function ensureCanvas(w, h) { if (w > CW || h > CH) allocCanvas(Math.max(w, CW) + 160, Math.max(h, CH) + 120, canvasK || (devicePixelRatio || 1)); }
function redrawBase() { bctx.clearRect(0, 0, CW, CH); const ex = sel ? new Set(sel.strokes) : null; for (const s of current.strokes) if (!ex || !ex.has(s)) drawStroke(bctx, s); }
function setSize(w, h) {
  PW = w; PH = h; ensureCanvas(w, h);
  sheetEl.style.setProperty('--pw', w.toFixed(1) + 'px'); sheetEl.style.setProperty('--ph', h.toFixed(1) + 'px');
  $('#sizetag').textContent = `${Math.round(w)} × ${Math.round(h)}`;
}
const MIN_W = 380, MIN_H = 280;
const maxSize = () => ({ w: Math.max(MIN_W, (vw() - 12 - Math.max(0, sheet.x)) / sheet.s), h: Math.max(MIN_H, (vh() - 12 - Math.max(0, sheet.y)) / sheet.s) });
let sizeAnim = 0;
function animateSize(tw, th, done, K = 190, D = 27) {     // same spring as the window position, so size and place move as one
  cancelAnimationFrame(sizeAnim);
  ensureCanvas(Math.max(tw, PW), Math.max(th, PH));
  sheetEl.classList.add('resizing');
  let w = PW, h = PH, vw_ = 0, vh_ = 0, last = performance.now();
  const step = now => {
    const dt = Math.min(.034, (now - last) / 1000); last = now;
    for (let i = 0; i < 4; i++) { const d = dt / 4; vw_ += (-K * (w - tw) - D * vw_) * d; vh_ += (-K * (h - th) - D * vh_) * d; w += vw_ * d; h += vh_ * d; }
    if ((Math.abs(w - tw) < .4 && Math.abs(h - th) < .4 && Math.abs(vw_) + Math.abs(vh_) < 6) || reduceMotion) {
      setSize(tw, th); sheetEl.classList.remove('resizing'); sizeCanvases(true); done && done(); return;
    }
    setSize(w, h); sizeAnim = requestAnimationFrame(step);
  };
  sizeAnim = requestAnimationFrame(step);
}

const TOOLS = {
  pen:    { label: 'Pen', type: 'fountain', sizes: [1.4, 2.4, 4], si: 1, color: 'graphite', pressure: true, smooth: .3 },
  pencil: { label: 'Pencil', sizes: [1.6, 2.6, 4.2], si: 1, color: 'graphite', pressure: true, smooth: .2 },
  hl:     { label: 'Highlighter', sizes: [12, 18, 26], si: 1, color: 'ochre', opacity: .32, straight: false, smooth: .4 },
  eraser: { label: 'Eraser', sizes: [8, 16, 30], si: 1, mode: 'stroke', hlOnly: false },
  lasso:  { label: 'Lasso' },
  shape:  { label: 'Shapes', sizes: [1.6, 2.4, 4], si: 1, color: 'sky', fill: false },
  laser:  { label: 'Laser pointer', color: 'kodak' },
};
const prefs = { holdShape: true };
let tool = 'pen', fingerDraws = false;
const sizeFor = t => TOOLS[t].sizes ? TOOLS[t].sizes[TOOLS[t].si] : 4;
const inkTool = t => !!TOOLS[t].color && t !== 'laser';

let ink = null, fading = [], lasers = [], sel = null, liveRaf = 0, lastPen = -1e9, ants = 0;
function scheduleLive() { if (!liveRaf) liveRaf = requestAnimationFrame(frame); }
function frame() {
  liveRaf = 0; lctx.clearRect(0, 0, CW, CH); let again = false; const t = performance.now();
  if (sel) { lctx.save(); lctx.translate(sel.dx, sel.dy); lctx.shadowColor = themeColor('--accent'); lctx.shadowBlur = 6; for (const s of sel.strokes) drawStroke(lctx, s); lctx.restore(); }
  if (ink && ink.stroke) drawStroke(lctx, ink.stroke, ink.pred);
  if (ink && ink.lasso && ink.lasso.length > 1) {
    lctx.save(); lctx.setLineDash([6, 6]); ants = (ants + .6) % 12; lctx.lineDashOffset = -ants; lctx.lineWidth = 1.5;
    lctx.strokeStyle = themeColor('--accent'); lctx.fillStyle = themeColor('--accent-soft');
    lctx.beginPath(); ink.lasso.forEach((p, i) => i ? lctx.lineTo(p.x, p.y) : lctx.moveTo(p.x, p.y)); lctx.closePath(); lctx.fill(); lctx.stroke(); lctx.restore(); again = true;
  }
  lasers = lasers.filter(L => {
    if (!L.end) L.pts = L.pts.filter(p => t - p.t < 900);
    const a = L.end ? 1 - (t - L.end) / 650 : 1; if (a <= 0) return false;
    drawLaser(lctx, L.pts, L.color, a); again = true; return true;
  });
  if (fading.length) {
    fading = fading.filter(f => { const a = 1 - (t - f.t) / 280; if (a <= 0) return false; lctx.save(); lctx.globalAlpha = a; drawStroke(lctx, f.s); lctx.restore(); return true; });
    if (fading.length) again = true;
  }
  if (again) scheduleLive();
}
function toLocal(ev, r, k) { return { x: (ev.clientX - r.left) / k, y: (ev.clientY - r.top) / k }; }
function makePt(ev) {
  const q = toLocal(ev, ink.r, ink.k); let p;
  const pts = ink.stroke.pts, prev = pts[pts.length - 1];
  if (ev.pointerType === 'pen') { p = ev.pressure > 0 ? ev.pressure : ink.lastP; p = ink.lastP * .35 + p * .65; }
  else if (prev) { const dt = Math.max(1, ev.timeStamp - ink.lastT); const sp = Math.hypot(q.x - prev.x, q.y - prev.y) / dt; p = ink.lastP * .75 + clamp(.8 - sp * .3, .28, .8) * .25; }
  else p = .6;
  ink.lastP = p; ink.lastT = ev.timeStamp; ink.raw = q;
  let x = q.x, y = q.y;
  if (ink.smooth && prev) { const f = 1 - ink.smooth * .78; x = prev.x + (q.x - prev.x) * f; y = prev.y + (q.y - prev.y) * f; }   // stroke stabiliser
  return { x: +x.toFixed(2), y: +y.toFixed(2), p: +p.toFixed(3) };
}
function startInk(e) {
  const r = paper.getBoundingClientRect();
  ink = { id: e.pointerId, type: e.pointerType, r, k: r.width / PW, stroke: null, lastP: .5, lastT: e.timeStamp, pred: [], removed: false, before: current.strokes.slice(), anchor: null, hold: 0, smooth: 0 };
  try { sheetEl.setPointerCapture(e.pointerId); } catch (_) {}
  document.body.classList.add('inking'); cursorEl.classList.remove('on'); closeToolPop();
  const q = toLocal(e, r, ink.k);
  if (tool === 'eraser') { ink.erase = true; eraseAt(q); return; }
  if (tool === 'lasso') {
    if (sel && inSel(q)) { ink.move = { x: q.x, y: q.y, dx: sel.dx, dy: sel.dy }; selMenu.hidden = true; }
    else { clearSel(); ink.lasso = [q]; }
    scheduleLive(); return;
  }
  if (tool === 'laser') { ink.laser = { pts: [{ ...q, t: performance.now() }], color: TOOLS.laser.color, end: 0 }; lasers.push(ink.laser); scheduleLive(); return; }
  clearSel();
  const T = TOOLS[tool];
  ink.smooth = T.smooth || 0;
  ink.stroke = { tool, type: T.type, color: T.color, size: sizeFor(tool), pr: T.pressure !== false, pts: [] };
  if (tool === 'hl') ink.stroke.op = T.opacity;
  if (tool === 'shape') ink.stroke.fill = T.fill;
  ink.stroke.pts.push(makePt(e)); ink.anchor = ink.stroke.pts[0];
  hint.classList.add('gone'); scheduleLive();
}
function moveInk(e) {
  const evs = (e.getCoalescedEvents && e.getCoalescedEvents()) || []; const list = evs.length ? evs : [e];
  if (ink.erase) { for (const ev of list) eraseAt(toLocal(ev, ink.r, ink.k)); return; }
  if (ink.move) { const q = toLocal(e, ink.r, ink.k); sel.dx = ink.move.dx + q.x - ink.move.x; sel.dy = ink.move.dy + q.y - ink.move.y; updateSelUI(true); scheduleLive(); return; }
  if (ink.lasso) { for (const ev of list) ink.lasso.push(toLocal(ev, ink.r, ink.k)); scheduleLive(); return; }
  if (ink.laser) { const t = performance.now(); for (const ev of list) ink.laser.pts.push({ ...toLocal(ev, ink.r, ink.k), t }); scheduleLive(); return; }
  if (!ink.stroke) return;
  const pts = ink.stroke.pts;
  for (const ev of list) { const pt = makePt(ev), l = pts[pts.length - 1]; if (Math.hypot(pt.x - l.x, pt.y - l.y) > .35) pts.push(pt); }
  if (ink.stroke.tool === 'hl' && TOOLS.hl.straight) { ink.stroke.pts = [pts[0], { ...ink.raw, p: pts[0].p }]; ink.stroke.flat = true; ink.pred = []; }
  else if (!ink.stroke.shaped) {
    const pr = (e.getPredictedEvents && e.getPredictedEvents()) || [];
    ink.pred = pr.slice(0, 2).map(ev => { const q = toLocal(ev, ink.r, ink.k); return { x: q.x, y: q.y, p: ink.lastP }; });
  }
  const last = ink.stroke.pts[ink.stroke.pts.length - 1];
  if (Math.hypot(last.x - ink.anchor.x, last.y - ink.anchor.y) > 3) { ink.anchor = last; clearTimeout(ink.hold); ink.hold = setTimeout(holdSnap, 520); }
  scheduleLive();
}

/* ---------- shape recognition (shape tool, or draw and hold with pen/pencil) ---------- */
function rdp(pts, eps) {
  if (pts.length < 3) return pts.slice();
  const a = pts[0], b = pts[pts.length - 1]; let idx = 0, md = 0;
  for (let i = 1; i < pts.length - 1; i++) { const d = segDist(pts[i], a, b); if (d > md) { md = d; idx = i; } }
  if (md <= eps) return [a, b];
  return rdp(pts.slice(0, idx + 1), eps).slice(0, -1).concat(rdp(pts.slice(idx), eps));
}
function pruneCollinear(poly) {
  let changed = true;
  while (changed && poly.length > 3) {
    changed = false;
    for (let i = 0; i < poly.length; i++) {
      const a = poly[(i - 1 + poly.length) % poly.length], b = poly[i], c = poly[(i + 1) % poly.length];
      let d = Math.abs(Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(b.y - a.y, b.x - a.x)); if (d > Math.PI) d = 2 * Math.PI - d;
      if (d < .45) { poly.splice(i, 1); changed = true; break; }
    }
  }
  return poly;
}
function densify(poly, closed, p) {
  const out = [], seq = closed ? poly.concat([poly[0]]) : poly;
  for (let i = 0; i < seq.length - 1; i++) {
    const a = seq[i], b = seq[i + 1], n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 4));
    for (let j = 0; j < n; j++) out.push({ x: a.x + (b.x - a.x) * j / n, y: a.y + (b.y - a.y) * j / n, p });
  }
  const z = seq[seq.length - 1]; out.push({ x: z.x, y: z.y, p }); return out;
}
function recognize(pts, lineOnly) {
  const n = pts.length; if (n < 6) return null;
  let len = 0; for (let i = 1; i < n; i++) len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  const a = pts[0], b = pts[n - 1], chord = Math.hypot(b.x - a.x, b.y - a.y);
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; for (const q of pts) { x0 = Math.min(x0, q.x); y0 = Math.min(y0, q.y); x1 = Math.max(x1, q.x); y1 = Math.max(y1, q.y); }
  const bw = x1 - x0, bh = y1 - y0, diag = Math.hypot(bw, bh), pAvg = pts.reduce((s, q) => s + q.p, 0) / n;
  if (diag < 20) return null;
  if (chord / len > .9) return { kind: 'line', closed: false, pts: densify([a, b], false, pAvg) };
  if (lineOnly) return null;
  const closed = chord < Math.max(22, len * .16);
  if (!closed) { const simp = rdp(pts, diag * .06); return simp.length <= 4 ? { kind: 'angle', closed: false, pts: densify(simp, false, pAvg) } : null; }
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, rx = Math.max(1, bw / 2), ry = Math.max(1, bh / 2);
  let err = 0; for (const q of pts) err += Math.abs(Math.hypot((q.x - cx) / rx, (q.y - cy) / ry) - 1); err /= n;
  let poly = rdp(pts, diag * .08);
  if (poly.length > 1 && Math.hypot(poly[0].x - poly[poly.length - 1].x, poly[0].y - poly[poly.length - 1].y) < diag * .2) poly.pop();
  poly = pruneCollinear(poly);
  if (poly.length === 3 && err > .07) return { kind: 'triangle', closed: true, pts: densify(poly, true, pAvg) };
  if (poly.length === 4 && err > .07) {
    const axis = poly.every((q, i) => { const r = poly[(i + 1) % 4]; const ang = Math.abs(Math.atan2(r.y - q.y, r.x - q.x)) % (Math.PI / 2); return ang < .22 || ang > Math.PI / 2 - .22; });
    const quad = axis ? [{ x: x0, y: y0 }, { x: x1, y: y0 }, { x: x1, y: y1 }, { x: x0, y: y1 }] : poly;
    return { kind: 'rectangle', closed: true, pts: densify(quad, true, pAvg) };
  }
  if (err < .16) {
    let Rx = rx, Ry = ry; if (Math.abs(rx - ry) < Math.max(rx, ry) * .14) Rx = Ry = (rx + ry) / 2;
    const out = []; for (let i = 0; i <= 96; i++) { const t = i / 96 * Math.PI * 2 - Math.PI / 2; out.push({ x: cx + Math.cos(t) * Rx, y: cy + Math.sin(t) * Ry, p: pAvg }); }
    return { kind: Rx === Ry ? 'circle' : 'ellipse', closed: true, pts: out };
  }
  return null;
}
function applyShape(s, res) { s.pts = res.pts; s.closed = res.closed; s.shaped = true; s.bb = null; liveC.classList.remove('flash'); void liveC.offsetWidth; liveC.classList.add('flash'); }
function holdSnap() {
  if (!ink || !ink.stroke || ink.stroke.shaped) return;
  const s = ink.stroke, hl = s.tool === 'hl';
  if (!prefs.holdShape && !hl) return;
  const res = recognize(s.pts, hl); if (!res) return;
  applyShape(s, res); ink.pred = []; ink.anchor = s.pts[s.pts.length - 1]; scheduleLive();
}
function endInk() {
  if (!ink) return; clearTimeout(ink.hold);
  const s = ink.stroke;
  if (ink.move) { if (sel.dx || sel.dy) commitSelMove(); else updateSelUI(); }
  else if (ink.lasso) finishLasso(ink.lasso);
  else if (ink.laser) ink.laser.end = performance.now();
  else if (s && s.pts.length) {
    if (s.tool === 'hl' && s.flat) s.pts = densify([s.pts[0], s.pts[s.pts.length - 1]], false, s.pts[0].p);
    else if (ink.raw && !s.shaped) { const l = s.pts[s.pts.length - 1]; if (Math.hypot(ink.raw.x - l.x, ink.raw.y - l.y) > .5) s.pts.push({ x: ink.raw.x, y: ink.raw.y, p: l.p }); }
    if (s.tool === 'shape' && !s.shaped) { const res = recognize(s.pts); if (res) applyShape(s, res); }
    ink.pred = []; commit(ink.before); current.strokes.push(s); drawStroke(bctx, s);
  } else if (ink.removed) commit(ink.before);
  ink = null; scheduleLive();
  document.body.classList.remove('inking');
  noteChanged();
}
function commit(before) { current.undo.push(before); if (current.undo.length > 80) current.undo.shift(); current.redo = []; }
function bbox(s) {
  if (s.bb) return s.bb; let a = 1e9, b = 1e9, c = -1e9, d = -1e9;
  for (const p of s.pts) { a = Math.min(a, p.x); b = Math.min(b, p.y); c = Math.max(c, p.x); d = Math.max(d, p.y); }
  return (s.bb = [a, b, c, d]);
}
function segDist(p, a, b) { const dx = b.x - a.x, dy = b.y - a.y, l = dx * dx + dy * dy; const t = l ? clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / l, 0, 1) : 0; return Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy); }
function eraseAt(q) {
  const T = TOOLS.eraser, r = sizeFor('eraser'); let hit = false;
  for (let i = current.strokes.length - 1; i >= 0; i--) {
    const s = current.strokes[i]; if (T.hlOnly && s.tool !== 'hl') continue;
    const bb = bbox(s), pad = r + s.size;
    if (q.x < bb[0] - pad || q.x > bb[2] + pad || q.y < bb[1] - pad || q.y > bb[3] + pad) continue;
    const pts = s.pts, lim = r + s.size / 2;
    if (T.mode === 'precise') {        // cut out only the touched part
      const runs = [[]]; let touched = false;
      for (const p of pts) { if (Math.hypot(p.x - q.x, p.y - q.y) < lim) { touched = true; if (runs[runs.length - 1].length) runs.push([]); } else runs[runs.length - 1].push(p); }
      if (!touched) continue;
      const pieces = runs.filter(x => x.length > 1).map(x => ({ ...s, pts: x, bb: null, closed: false }));
      current.strokes.splice(i, 1, ...pieces); hit = true; continue;
    }
    let h = false;
    for (let j = 0; j < pts.length && !h; j++) h = (j ? segDist(q, pts[j - 1], pts[j]) : Math.hypot(q.x - pts[0].x, q.y - pts[0].y)) < lim;
    if (h) { current.strokes.splice(i, 1); fading.push({ s, t: performance.now() }); hit = true; }
  }
  if (hit) { ink.removed = true; redrawBase(); scheduleLive(); }
}
function clearPage() {
  if (!current.strokes.length) return toast('This page is already empty');
  clearSel(); commit(current.strokes.slice());
  const t = performance.now(); current.strokes.forEach(s => fading.push({ s, t })); current.strokes = [];
  redrawBase(); scheduleLive(); noteChanged(); toast('Page cleared. Undo brings it back.');
}

/* ---------- lasso selection ---------- */
function pip(pt, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j]; if ((a.y > pt.y) !== (b.y > pt.y) && pt.x < (b.x - a.x) * (pt.y - a.y) / (b.y - a.y) + a.x) c = !c; } return c; }
function finishLasso(poly) {
  if (poly.length < 4) return;
  const picked = current.strokes.filter(s => { const step = Math.max(1, Math.floor(s.pts.length / 24)); let inn = 0, tot = 0; for (let i = 0; i < s.pts.length; i += step) { tot++; if (pip(s.pts[i], poly)) inn++; } return inn / tot >= .5; });
  if (!picked.length) { toast('Nothing inside the loop'); return; }
  sel = { strokes: picked, dx: 0, dy: 0 }; redrawBase(); updateSelUI(); scheduleLive();
}
function selBounds() {
  let a = 1e9, b = 1e9, c = -1e9, d = -1e9;
  for (const s of sel.strokes) { const q = bbox(s), m = s.size / 2 + 2; a = Math.min(a, q[0] - m); b = Math.min(b, q[1] - m); c = Math.max(c, q[2] + m); d = Math.max(d, q[3] + m); }
  return { x: a + sel.dx, y: b + sel.dy, w: c - a, h: d - b };
}
function inSel(q) { const b = selBounds(); return q.x > b.x - 12 && q.x < b.x + b.w + 12 && q.y > b.y - 12 && q.y < b.y + b.h + 12; }
function clearSel() { if (!sel) return; sel = null; selBox.hidden = selMenu.hidden = true; redrawBase(); scheduleLive(); }
function replaceSel(fn) {        // immutable update, so undo keeps the old strokes
  const before = current.strokes.slice(), map = new Map();
  sel.strokes.forEach(s => map.set(s, fn(s)));
  current.strokes = current.strokes.map(s => map.has(s) ? map.get(s) : s).filter(Boolean);
  sel.strokes = sel.strokes.map(s => map.get(s)).filter(Boolean);
  commit(before);
}
const shifted = (s, dx, dy) => ({ ...s, bb: null, pts: s.pts.map(p => ({ x: p.x + dx, y: p.y + dy, p: p.p })) });
function commitSelMove() { const { dx, dy } = sel; sel.dx = sel.dy = 0; replaceSel(s => shifted(s, dx, dy)); redrawBase(); updateSelUI(); noteChanged(); }
function undo() { clearSel(); if (!current.undo.length) return pulse($('#undo')); current.redo.push(current.strokes.slice()); current.strokes = current.undo.pop(); redrawBase(); noteChanged(); }
function redo() { clearSel(); if (!current.redo.length) return pulse($('#redo')); current.undo.push(current.strokes.slice()); current.strokes = current.redo.pop(); redrawBase(); noteChanged(); }
function pulse(el) { el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], { duration: 260 }); }
let thumbTimer = 0;
function noteChanged() {
  hint.classList.toggle('gone', current.strokes.length > 0);
  updateMeta(); clearTimeout(thumbTimer); thumbTimer = setTimeout(() => { repaintThumbs(current); renderToday(); }, 120);
}
function updateMeta() {
  const n = current.strokes.length, m = current.mood;
  $('#noteMeta').innerHTML = `${esc(current.date)}${m != null ? ' · ' + emo(m, 13) : ''}${n ? ` · ${n} stroke${n > 1 ? 's' : ''}` : ''} · ${current.draft ? '<span class="draft">Draft, not saved</span>' : 'Saved'}`;
}
function setPaper(v) { current.paper = v; paper.className = 'paper pp-' + v; }

// Pencil inks, finger moves/pinches, mouse inks (middle button or Space to move)
const touches = new Map(); let gest = null, spaceDown = false;
sheetEl.addEventListener('pointerdown', e => {
  if (e.target.closest('.grip, .title, .lights, .resize, .selmenu')) return;
  e.preventDefault();
  const collapsed = sheetEl.classList.contains('collapsed');
  if (e.pointerType === 'pen') { lastPen = e.timeStamp; if (gest) endGesture(e, true); if (!ink && !collapsed) startInk(e); return; }
  if (e.pointerType === 'mouse') { if (e.button === 1 || spaceDown || (collapsed && e.button === 0)) return addTouch(e); if (e.button === 0 && !ink) startInk(e); return; }
  if (ink && ink.type === 'pen') return;
  if (e.width > 44 && e.height > 44) return;
  if (fingerDraws && !collapsed && !ink && !touches.size && e.timeStamp - lastPen > 900) { startInk(e); return; }
  if (ink && ink.type === 'touch') { const keep = ink.id; ink.stroke = null; ink.removed = false; lctx.clearRect(0, 0, CW, CH); ink = null; document.body.classList.remove('inking'); touches.set(keep, { x: e.clientX, y: e.clientY }); }
  if (!fingerDraws && e.timeStamp - lastPen < 500) return;
  addTouch(e);
});
function addTouch(e) { try { sheetEl.setPointerCapture(e.pointerId); } catch (_) {} touches.set(e.pointerId, { x: e.clientX, y: e.clientY }); startGesture(e); }
function centroid(p) { return p.length > 1 ? { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 } : p[0]; }
function startGesture() {
  const pts = [...touches.values()].slice(0, 2);
  gest = { x0: sheet.x, y0: sheet.y, s0: sheet.s, c0: centroid(pts), d0: pts.length > 1 ? Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) : 0, n: pts.length };
  if (sheet.mode !== 'drag') sheet.grab();
  clearTimeout(cornerT); sheetEl.classList.add('near-corner');      // finger on the window: reveal the grip
}
function moveGesture(e) {
  touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
  const pts = [...touches.values()].slice(0, 2); if (pts.length !== gest.n) return startGesture(e);
  const c = centroid(pts); let s = gest.s0;
  if (gest.n > 1 && gest.d0 > 10) { const raw = gest.s0 * Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) / gest.d0; s = raw < .45 ? .45 - (.45 - raw) * .25 : raw > 2.2 ? 2.2 + (raw - 2.2) * .25 : raw; }
  const px = (gest.c0.x - gest.x0) / gest.s0, py = (gest.c0.y - gest.y0) / gest.s0;
  sheet.s = s; sheet.dragTo(c.x - px * s, c.y - py * s, e.timeStamp);
}
function endGesture(e, all) {
  if (all) touches.clear(); else touches.delete(e.pointerId);
  if (touches.size) return startGesture(e);
  const v = sheet.velocity(e.timeStamp); gest = null;
  if (sheet.s < .45 || sheet.s > 2.2) sheet.ts = clamp(sheet.s, .45, 2.2);
  sheet.release(v.x, v.y); setTimeout(() => sizeCanvases(), 60);
  cornerT = setTimeout(() => sheetEl.classList.remove('near-corner'), 1600);
}
sheetEl.addEventListener('pointermove', e => {
  if (ink && e.pointerId === ink.id) return moveInk(e);
  if (touches.has(e.pointerId) && gest) return moveGesture(e);
  if (e.pointerType !== 'touch' && !e.buttons) { const r = paper.getBoundingClientRect(), q = toLocal(e, r, r.width / PW); sheetEl.classList.toggle('near-corner', PW - q.x < 90 && PH - q.y < 90); }
  if (e.pointerType !== 'touch' && !e.buttons && !e.target.closest('.grip, .title, .lights, .resize, .selmenu') && !sheetEl.classList.contains('collapsed')) showCursor(e);
  else cursorEl.classList.remove('on');
}, { passive: true });
const upHandler = e => {
  if (ink && e.pointerId === ink.id) { if (e.pointerType === 'pen') lastPen = e.timeStamp; return endInk(); }
  if (touches.has(e.pointerId)) endGesture(e);
};
sheetEl.addEventListener('pointerup', upHandler); sheetEl.addEventListener('pointercancel', upHandler);
let cornerT = 0;
sheetEl.addEventListener('pointerleave', () => { cursorEl.classList.remove('on'); if (!sheetEl.classList.contains('resizing')) sheetEl.classList.remove('near-corner'); });
function showCursor(e) {
  const r = paper.getBoundingClientRect(), k = r.width / PW, q = toLocal(e, r, k);
  let d, bg = 'transparent';
  if (tool === 'eraser') d = sizeFor('eraser') * 2;
  else if (tool === 'lasso') d = 10;
  else if (tool === 'laser') { d = 10; bg = inkColor(TOOLS.laser.color); }
  else { d = tool === 'hl' ? sizeFor('hl') : Math.max(5, sizeFor(tool) * 2.2); bg = inkColor(TOOLS[tool].color); }
  cursorEl.style.width = cursorEl.style.height = d + 'px';
  cursorEl.style.transform = `translate(${q.x - d / 2}px,${q.y - d / 2}px)`;
  cursorEl.style.background = bg;
  cursorEl.classList.add('on');
}
addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (emojiOpen) return closeEmojiPop(); if (!moodsEl.hidden) return toggleMoodRow(false); if (popKind) return closeToolPop(); if (sel) return clearSel(); if (popApp) return closePop(); if (ctxState) return closeCtx(); if (viewer.open) return viewer.full ? setViewerMode('normal') : closeViewer(); if (fullKey) return exitFull(); }
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') { e.preventDefault(); if (ctxState) closeCtx(true); openCtx(current, ctxFor(current), $('#noteChip')); return showSave(current, ctxFor(current)); }
  if (e.target.tagName === 'INPUT') return;
  if (e.code === 'Space') { spaceDown = true; sheetEl.style.cursor = 'grab'; e.preventDefault(); }
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
});
addEventListener('keyup', e => { if (e.code === 'Space') { spaceDown = false; sheetEl.style.cursor = ''; } });

(() => {
  const h = $('#resize'); let id = null, s0;
  const rubber = (v, lo, hi) => v < lo ? lo - (lo - v) * .3 : v > hi ? hi + (v - hi) * .3 : v;
  h.addEventListener('pointerdown', e => {
    if (id !== null) return; e.stopPropagation(); e.preventDefault();
    if (fullKey === 'canvas') exitFull(true);
    canvas75 = false; syncRail();
    id = e.pointerId; try { h.setPointerCapture(id); } catch (_) {}
    cancelAnimationFrame(sizeAnim);
    s0 = { w: PW, h: PH, x: e.clientX, y: e.clientY, s: sheet.s };
    sheetEl.classList.add('resizing', 'userresize'); document.body.classList.add('inking');
  });
  h.addEventListener('pointermove', e => {
    if (e.pointerId !== id) return;
    const m = maxSize();
    setSize(rubber(s0.w + (e.clientX - s0.x) / s0.s, MIN_W, m.w), rubber(s0.h + (e.clientY - s0.y) / s0.s, MIN_H, m.h));
  });
  const end = e => {
    if (e.pointerId !== id) return; id = null; document.body.classList.remove('inking');
    const m = maxSize();
    animateSize(clamp(PW, MIN_W, m.w), clamp(PH, MIN_H, m.h), () => { home = computeHome(); sheetEl.classList.remove('userresize'); });
  };
  h.addEventListener('pointerup', end); h.addEventListener('pointercancel', end);
  h.tabIndex = 0;
  h.addEventListener('keydown', e => {
    const d = e.shiftKey ? 60 : 20, m = maxSize();
    const mv = { ArrowRight: [d, 0], ArrowLeft: [-d, 0], ArrowDown: [0, d], ArrowUp: [0, -d] }[e.key]; if (!mv) return;
    e.preventDefault(); animateSize(clamp(PW + mv[0], MIN_W, m.w), clamp(PH + mv[1], MIN_H, m.h));
  });
})();

// names are read-only until you double-tap them
function dblTapRename(input) {
  let last = 0, lx = 0, ly = 0;
  const start = () => { input.readOnly = false; input.focus(); input.select(); };
  input.addEventListener('pointerdown', e => { if (input.readOnly) e.preventDefault(); });
  input.addEventListener('mousedown', e => { if (input.readOnly) e.preventDefault(); });
  input.addEventListener('pointerup', e => {
    if (!input.readOnly) return;
    if (e.timeStamp - last < 380 && Math.hypot(e.clientX - lx, e.clientY - ly) < 24) { last = 0; start(); }
    else { last = e.timeStamp; lx = e.clientX; ly = e.clientY; }
  });
  input.addEventListener('keydown', e => {
    if (input.readOnly) { if (e.key === 'Enter') { e.preventDefault(); start(); } return; }
    if (e.key === 'Enter' || e.key === 'Escape') input.blur();
  });
  input.addEventListener('blur', () => { input.readOnly = true; input.setSelectionRange(0, 0); });
}
const titleIn = $('#noteTitle');
titleIn.addEventListener('input', () => renameFile(current, titleIn.value));
dblTapRename(titleIn);
function renameFile(f, v) {
  f.name = v.trim() || (f.kind === 'folder' ? 'New folder' : 'Untitled');
  document.querySelectorAll(`.item[data-id="${f.id}"] .label`).forEach(l => l.innerHTML = labelHTML(f));
  if (f === current && document.activeElement !== titleIn) titleIn.value = f.name;
  if (f === current) syncNoteChip();
  renderToday();
}

/* ---------- dock: tools, colours, sizes, options ---------- */
const dock = $('#dock'), toolPill = $('#toolPill'), swatches = $('#swatches'), sizesEl = $('#sizes'), toolPop = $('#toolPop');
const selBox = $('#selBox'), selMenu = $('#selMenu');
let customColor = '#7a6aa8';
function renderSwatches() {
  swatches.innerHTML = '';
  [...INKS, customColor].forEach(c => {
    const b = document.createElement('button'); b.className = 'sw'; b.dataset.c = c; b.style.setProperty('--c', c[0] === '#' ? c : `var(--ink-${c})`);
    b.innerHTML = '<i></i>'; b.setAttribute('aria-label', colorName(c)); b.title = colorName(c);
    b.addEventListener('click', () => pickColor(c));
    swatches.append(b);
  });
  const add = document.createElement('button'); add.className = 'sw add'; add.innerHTML = '<i></i>'; add.setAttribute('aria-label', 'More colours'); add.title = 'More colours';
  add.addEventListener('click', () => popKind === 'colors' ? closeToolPop() : openToolPop('colors', add)); swatches.append(add);
}
function pickColor(c) {
  const t = inkTool(tool) || tool === 'laser' ? tool : 'pen';
  TOOLS[t].color = c; if (t !== tool) setTool(t); syncDock(); if (popKind && popKind !== 'colors') renderToolPop();
}
function setTool(t) { if (t !== 'lasso') clearSel(); tool = t; syncDock(); }
const SIZE_RANGE = { pen: [.6, 8], pencil: [.6, 8], hl: [4, 40], eraser: [4, 50] };
const bubble = document.createElement('div'); bubble.id = 'sizeBubble'; bubble.className = 'glass'; bubble.hidden = true; document.body.append(bubble);
function showBubble(btn, t) {
  const v = sizeFor(t), [lo, hi] = SIZE_RANGE[t], d = 6 + (v - lo) / (hi - lo) * 30, c = TOOLS[t].color ? inkColor(TOOLS[t].color) : 'var(--ink-3)';
  bubble.innerHTML = `<i style="width:${d.toFixed(1)}px;height:${d.toFixed(1)}px;background:${t === 'eraser' ? 'transparent' : c};${t === 'eraser' ? 'border:1.5px dashed var(--ink-2)' : ''}${t === 'hl' ? ';opacity:.45;border-radius:4px' : ''}"></i><b>${v.toFixed(1)} pt</b>`;
  if (bubble.hidden) { bubble.hidden = false; bubble.animate([{ opacity: 0, transform: 'translateY(6px) scale(.9)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.32,.72,0,1)' }); }
  const r = btn.getBoundingClientRect(); bubble.style.left = (r.left + r.width / 2 - bubble.offsetWidth / 2) + 'px'; bubble.style.top = (r.top - bubble.offsetHeight - 12) + 'px';
}
function hideBubble() { if (bubble.hidden) return; bubble.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(4px) scale(.94)' }], { duration: 180 }).onfinish = () => { bubble.hidden = true; }; }
// press a pen and slide up (thicker) or down (thinner); a plain tap still selects it or opens its options
document.querySelectorAll('.tb[data-tool]').forEach(b => b.addEventListener('pointerdown', e => {
  const t = b.dataset.tool, T = TOOLS[t]; if (!T.sizes) return;
  const x0 = e.clientX, y0 = e.clientY, s0 = sizeFor(t), [lo, hi] = SIZE_RANGE[t]; let on = false;
  const mv = ev => {
    if (ev.pointerId !== e.pointerId) return;
    const dy = y0 - ev.clientY, dx = ev.clientX - x0, d = Math.abs(dy) >= Math.abs(dx) ? dy : dx;
    if (!on && Math.abs(d) < 7) return;
    if (!on) { on = true; if (tool !== t) setTool(t); closeToolPop(); }
    T.sizes[T.si] = +clamp(s0 + d * (hi - lo) / 150, lo, hi).toFixed(1); showBubble(b, t); syncMini();
  };
  const up = ev => { if (ev.pointerId !== e.pointerId) return; removeEventListener('pointermove', mv); removeEventListener('pointerup', up); removeEventListener('pointercancel', up); if (on) { b._dragEnd = performance.now(); setTimeout(hideBubble, 350); } };
  addEventListener('pointermove', mv); addEventListener('pointerup', up); addEventListener('pointercancel', up);
}));
document.querySelectorAll('.tb[data-tool]').forEach(b => b.addEventListener('click', () => {
  if (performance.now() - (b._dragEnd || 0) < 350) return;      // that was a thickness drag, not a tap
  const t = b.dataset.tool;
  if (tool === t) { popKind === t ? closeToolPop() : openToolPop(t, b); return; }   // tap the active tool again for its options
  closeToolPop(); setTool(t);
}));
function syncDock(instant) {
  document.querySelectorAll('.tb[data-tool]').forEach(b => {
    const t = b.dataset.tool, on = t === tool; b.setAttribute('aria-pressed', String(on));
    const c = TOOLS[t].color; b.style.setProperty('--c', c ? inkColor(c) : 'transparent');
    if (on) slidePill(toolPill, b, instant);
  });
  const T = TOOLS[tool];
  swatches.classList.toggle('off', !T.color);
  swatches.querySelectorAll('.sw[data-c]').forEach(b => b.setAttribute('aria-pressed', String(!!T.color && b.dataset.c === T.color)));
  sizesEl.classList.toggle('off', !T.sizes);
  const sz = (T.sizes || TOOLS.pen.sizes), max = Math.max(...sz);
  sizesEl.querySelectorAll('.szb').forEach((b, i) => {
    b.setAttribute('aria-pressed', String(!!T.sizes && i === T.si)); b.setAttribute('aria-label', `Thickness ${sz[i].toFixed(1)}`);
    const d = 4 + Math.sqrt(sz[i] / max) * 9; b.firstChild.style.width = b.firstChild.style.height = d.toFixed(1) + 'px';
  });
  syncMini();
}
function syncMini() {
  const mb = $('#miniBtn'), b = $(`.tb[data-tool="${tool}"] svg`); if (!mb || !b) return;
  const c = TOOLS[tool].color; mb.style.setProperty('--c', c ? inkColor(c) : 'var(--ink-3)');
  mb.innerHTML = b.outerHTML + (c ? '<i class="mdot"></i>' : ''); mb.setAttribute('aria-label', `${TOOLS[tool].label}. Tap to open the toolbar`);
}
function setDockMini(on) {
  closeToolPop(); if (dock.classList.contains('circle') === on) return;
  morph($('#dock .win'), () => dock.classList.toggle('circle', on), { spr: SPR_OPEN });
  if (!on) setTimeout(() => { syncDock(true); W.tools.body.settle(); }, 40);
}
$('#dockMin').addEventListener('click', () => setDockMini(true));
$('#miniBtn').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setDockMini(false); } });
sizesEl.querySelectorAll('.szb').forEach((b, i) => b.addEventListener('click', () => {
  const T = TOOLS[tool]; if (!T.sizes) return;
  if (T.si === i) return popKind === tool ? closeToolPop() : openToolPop(tool, $(`.tb[data-tool="${tool}"]`));
  T.si = i; syncDock(); if (popKind === tool) renderToolPop();
}));
$('#undo').addEventListener('click', undo); $('#redo').addEventListener('click', redo);
$('#pageBtn').addEventListener('click', e => popKind === 'paper' ? closeToolPop() : openToolPop('paper', e.currentTarget));
$('#finger').addEventListener('click', e => { fingerDraws = !fingerDraws; e.currentTarget.setAttribute('aria-pressed', String(fingerDraws)); toast(fingerDraws ? 'Finger draws. Use the handle to move the page.' : 'Finger moves the page. Pencil draws.'); });

// options popover
let popKind = null, popAnchor = null;
function openToolPop(kind, anchor) {
  popKind = kind; popAnchor = anchor; toolPop.hidden = false; renderToolPop();
  toolPop.getAnimations().forEach(a => a.cancel());
  toolPop.animate([{ opacity: 0, transform: 'translateY(8px) scale(.95)', filter: 'blur(6px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: SPR_OPEN.d, easing: SPR_OPEN.e });
}
function placeToolPop() {
  const r = popAnchor.getBoundingClientRect(), w = toolPop.offsetWidth, h = toolPop.offsetHeight;
  const x = clamp(r.left + r.width / 2 - w / 2, 10, vw() - w - 10);
  const y = r.top - h - 14 > 10 ? r.top - h - 14 : Math.min(r.bottom + 14, vh() - h - 10);
  toolPop.style.left = x + 'px'; toolPop.style.top = y + 'px';
  toolPop.style.transformOrigin = `${r.left + r.width / 2 - x}px ${y < r.top ? h : 0}px`;
}
function closeToolPop() {
  if (!popKind) return; popKind = null;
  toolPop.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(6px) scale(.97)' }], { duration: 160 }).onfinish = () => { if (!popKind) toolPop.hidden = true; };
}
document.addEventListener('pointerdown', e => { if (popKind && !e.target.closest('#toolPop, #dock')) closeToolPop(); });
const segH = (key, opts, val) => `<div class="seg" data-k="${key}">${opts.map(([v, l]) => `<button data-v="${v}" aria-pressed="${v === val}">${l}</button>`).join('')}</div>`;
const sliderH = (key, label, min, max, step, val, txt) => `<div class="ctl"><label for="r-${key}">${label}<b>${txt}</b></label><input id="r-${key}" type="range" data-k="${key}" min="${min}" max="${max}" step="${step}" value="${val}"></div>`;
const switchH = (key, label, val) => `<div class="row2"><span>${label}</span><button class="switch" role="switch" data-k="${key}" aria-checked="${val}" aria-label="${label}"></button></div>`;
const pct = v => Math.round(v * 100) + '%';
function renderToolPop() {
  const k = popKind; if (!k) return; let h = ''; const h0 = toolPop.hidden ? 0 : toolPop.offsetHeight, y0 = toolPop.offsetTop;
  if (k === 'colors') {
    h = `<h4>Colours</h4><div class="palette">${PALETTE.map(c => `<button style="--c:${c}" data-c="${c}" aria-label="${c}" title="${c}"></button>`).join('')}</div>
      <div class="row2"><span>Any colour</span><input type="color" id="nativeColor" value="${customColor}" aria-label="Any colour"></div>
      <p class="tip">Your pick fills the last colour slot in the toolbar.</p>`;
  } else if (k === 'paper') {
    h = `<h4>Page</h4><div class="papers">${[['dots', 'Dots'], ['lines', 'Lines'], ['grid', 'Grid'], ['blank', 'Blank']].map(([v, l]) => `<button data-p="${v}" aria-pressed="${current.paper === v}"><i class="pp-${v}"></i>${l}</button>`).join('')}</div><p class="tip">Applies to this note.</p>`;
  } else {
    const T = TOOLS[k], sz = sizeFor(k);
    h = `<h4>${T.label}${T.sizes ? `<small id="szTxt">${sz.toFixed(1)} pt</small>` : ''}</h4>`;
    if (k !== 'lasso') h += '<canvas class="pv" id="pv"></canvas>';
    if (k === 'pen') h += segH('type', [['fountain', 'Fountain'], ['ball', 'Ballpoint'], ['brush', 'Brush']], T.type);
    if (k === 'eraser') h += segH('mode', [['stroke', 'Whole stroke'], ['precise', 'Precise']], T.mode);
    if (T.sizes) { const lo = k === 'hl' || k === 'eraser' ? 4 : .6, hi = k === 'hl' ? 40 : k === 'eraser' ? 50 : 8; h += sliderH('size', 'Thickness', lo, hi, .1, sz, sz.toFixed(1)); }
    if (k === 'hl') h += sliderH('opacity', 'Opacity', .1, .7, .01, T.opacity, pct(T.opacity));
    if ('smooth' in T) h += sliderH('smooth', 'Stroke smoothing', 0, 1, .05, T.smooth, pct(T.smooth));
    if ('pressure' in T) h += switchH('pressure', 'Pressure sensitivity', T.pressure);
    if (k === 'hl') h += switchH('straight', 'Straight lines only', T.straight) + '<p class="tip">Hold still at the end of a stroke to straighten it.</p>';
    if (k === 'shape') h += switchH('fill', 'Fill closed shapes', T.fill) + '<p class="tip">Draw a line, circle, triangle or rectangle. It snaps to a clean shape when you lift.</p>';
    if (k === 'pen' || k === 'pencil') h += switchH('holdShape', 'Draw and hold to make a shape', prefs.holdShape) + '<p class="tip">Draw a line, circle, triangle or rectangle, then keep the Pencil still for half a second. It snaps to a clean shape.</p>';
    if (k === 'eraser') h += switchH('hlOnly', 'Erase highlighter only', T.hlOnly) + '<button class="ghost danger" id="clearPage">Clear page</button>';
    if (k === 'lasso') h += '<p class="tip">Draw a loop around strokes to select them. Drag inside the selection to move it. The menu above it recolours, duplicates or deletes.</p><button class="ghost" id="selAll">Select everything</button>';
    if (k === 'laser') h += '<p class="tip">Point at things while you explain. The trail fades on its own and is never saved. Pick its colour in the toolbar.</p>';
  }
  toolPop.innerHTML = h;
  wirePop(); drawPreview(); placeToolPop();
  const h1 = toolPop.offsetHeight; if (h0 && Math.abs(h1 - h0) > 2 && !reduceMotion) toolPop.animate([{ height: h0 + 'px', transform: `translateY(${y0 - toolPop.offsetTop}px)` }, { height: h1 + 'px', transform: 'none' }], { duration: 360, easing: 'cubic-bezier(.32,.72,0,1)' });
}
function wirePop() {
  const k = popKind, T = TOOLS[k];
  toolPop.querySelectorAll('.seg').forEach(sg => sg.querySelectorAll('button').forEach(b => b.addEventListener('click', () => { T[sg.dataset.k] = b.dataset.v; renderToolPop(); syncDock(); })));
  toolPop.querySelectorAll('input[type=range]').forEach(r => {
    const set = live => {
      const v = +r.value, key = r.dataset.k;
      if (live) { if (key === 'size') T.sizes[T.si] = v; else T[key] = v; }
      r.style.setProperty('--p', ((v - r.min) / (r.max - r.min) * 100) + '%');
      r.previousElementSibling.querySelector('b').textContent = key === 'size' ? v.toFixed(1) : pct(v);
      if (key === 'size') $('#szTxt').textContent = v.toFixed(1) + ' pt';
      if (live) { drawPreview(); syncDock(); }
    };
    r.addEventListener('input', () => set(true)); set(false);
  });
  toolPop.querySelectorAll('.switch').forEach(sw => sw.addEventListener('click', () => {
    const key = sw.dataset.k, v = sw.getAttribute('aria-checked') !== 'true';
    if (key === 'holdShape') prefs.holdShape = v; else T[key] = v;
    sw.setAttribute('aria-checked', String(v)); drawPreview();
  }));
  const cp = $('#clearPage'); if (cp) cp.addEventListener('click', () => { closeToolPop(); clearPage(); });
  const sa = $('#selAll'); if (sa) sa.addEventListener('click', () => {
    closeToolPop(); if (!current.strokes.length) return toast('This page is empty');
    sel = { strokes: current.strokes.slice(), dx: 0, dy: 0 }; redrawBase(); updateSelUI(); scheduleLive();
  });
  if (k === 'colors') {
    toolPop.querySelectorAll('.palette button').forEach(b => b.addEventListener('click', () => setCustom(b.dataset.c)));
    const nc = $('#nativeColor'); nc.addEventListener('input', () => setCustom(nc.value, true));
  }
  if (k === 'paper') toolPop.querySelectorAll('.papers button').forEach(b => b.addEventListener('click', () => { setPaper(b.dataset.p); renderToolPop(); }));
}
function setCustom(c, keepOpen) { customColor = c; renderSwatches(); pickColor(c); if (!keepOpen) closeToolPop(); }
function drawPreview() {
  const c = $('#pv'); if (!c || !popKind || !TOOLS[popKind]) return; const w = c.clientWidth || 268, h = 64; c.width = w * 2; c.height = h * 2;
  const x = c.getContext('2d'); x.scale(2, 2);
  const k = popKind, T = TOOLS[k], pts = [];
  for (let i = 0; i <= 80; i++) { const t = i / 80; pts.push({ x: 22 + t * (w - 44), y: h / 2 + Math.sin(t * Math.PI * 2) * 13, p: .2 + .75 * Math.sin(t * Math.PI) }); }
  if (k === 'eraser') { const r = Math.min(sizeFor('eraser'), 28); x.strokeStyle = themeColor('--ink-2'); x.setLineDash([4, 4]); x.lineWidth = 1.2; x.beginPath(); x.arc(w / 2, h / 2, r, 0, 7); x.stroke(); return; }
  if (k === 'laser') return drawLaser(x, pts, T.color, 1);
  const s = { tool: k, type: T.type, color: T.color, size: sizeFor(k), pr: T.pressure !== false, op: T.opacity, fill: T.fill, pts };
  if (k === 'hl' && T.straight) { s.pts = densify([pts[0], pts[pts.length - 1]], false, .5); s.flat = true; }
  if (k === 'shape') { s.pts = []; for (let i = 0; i <= 64; i++) { const t = i / 64 * Math.PI * 2; s.pts.push({ x: w / 2 + Math.cos(t) * 50, y: h / 2 + Math.sin(t) * 20, p: .5 }); } s.closed = s.shaped = true; }
  drawStroke(x, s);
}

// selection menu
selMenu.innerHTML = INKS.map(c => `<button class="sw" data-c="${c}" style="--c:var(--ink-${c})" aria-label="Recolour ${INK_NAMES[c]}" title="${INK_NAMES[c]}"><i></i></button>`).join('')
  + '<span class="sep"></span><button class="txt" data-a="dup">Duplicate</button><button class="txt danger" data-a="del">Delete</button>';
selMenu.addEventListener('pointerdown', e => e.stopPropagation());
selMenu.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b || !sel) return;
  if (b.dataset.c) { const c = b.dataset.c; replaceSel(s => ({ ...s, color: c })); }
  else if (b.dataset.a === 'dup') { const before = current.strokes.slice(), copies = sel.strokes.map(s => shifted(s, 24, 24)); current.strokes.push(...copies); commit(before); sel.strokes = copies; }
  else if (b.dataset.a === 'del') { const before = current.strokes.slice(), gone = new Set(sel.strokes), t = performance.now(); current.strokes = current.strokes.filter(s => !gone.has(s)); sel.strokes.forEach(s => fading.push({ s: shifted(s, sel.dx, sel.dy), t })); commit(before); sel = null; }
  else if (b.dataset.a === 'done') return clearSel();
  redrawBase(); updateSelUI(); scheduleLive(); noteChanged();
});
function updateSelUI(moving) {
  if (!sel) { selBox.hidden = selMenu.hidden = true; return; }
  const b = selBounds(); selBox.hidden = false;
  Object.assign(selBox.style, { transform: `translate(${(b.x - 6).toFixed(1)}px,${(b.y - 6).toFixed(1)}px)`, width: b.w + 12 + 'px', height: b.h + 12 + 'px' });
  if (moving) return;
  const wasHidden = selMenu.hidden; selMenu.hidden = false;
  const mw = selMenu.offsetWidth, mh = selMenu.offsetHeight;
  const mx = clamp(b.x + b.w / 2 - mw / 2, 8, PW - mw - 8), my = b.y - mh - 16 > 8 ? b.y - mh - 16 : Math.min(b.y + b.h + 16, PH - mh - 8);
  selMenu.style.transform = `translate(${mx.toFixed(1)}px,${my.toFixed(1)}px)`;
  if (wasHidden) selMenu.animate([{ opacity: 0, filter: 'blur(6px)', scale: '.9' }, { opacity: 1, filter: 'blur(0)', scale: '1' }], { duration: SPR_OPEN.d, easing: SPR_OPEN.e });
}
renderSwatches();

/* ---------- light / dark ---------- */
const themeTg = $('#themeTg');
const isDark = () => { const t = document.documentElement.dataset.theme; return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; };
function syncThemeTg() { const d = isDark(); themeTg.setAttribute('aria-checked', String(d)); themeTg.title = d ? 'Switch to light mode' : 'Switch to dark mode'; }
try { const saved = localStorage.getItem('olaa-theme'); if (saved === 'dark' || saved === 'light') document.documentElement.dataset.theme = saved; } catch (_) {}
syncThemeTg();
themeTg.addEventListener('click', () => {
  const next = isDark() ? 'light' : 'dark';
  const apply = () => { document.documentElement.dataset.theme = next; syncThemeTg(); };
  try { localStorage.setItem('olaa-theme', next); } catch (_) {}
  // crossfade every colour, plus a soft wash spreading from the button; nothing blocks your taps meanwhile
  const r = themeTg.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  if (reduceMotion) return apply();
  document.body.classList.add('theming'); apply(); setTimeout(() => document.body.classList.remove('theming'), 650);
  themeTg.querySelector('.knob').animate([{ transform: 'rotate(-90deg) scale(.6)' }, { transform: 'none' }], { duration: SPR.d, easing: SPR.e });
  const d = document.createElement('div'); d.className = 'ripple'; d.style.left = cx + 'px'; d.style.top = cy + 'px';
  d.style.background = `radial-gradient(closest-side, ${getComputedStyle(document.documentElement).getPropertyValue('--bg')}, transparent)`; document.body.append(d);
  d.animate([{ transform: 'scale(.3)', opacity: .9 }, { transform: `scale(${Math.hypot(vw(), vh()) / 14})`, opacity: 0 }], { duration: 900, easing: 'cubic-bezier(.32,.72,0,1)' }).onfinish = () => d.remove();
});

/* ---------- floating files ---------- */
const filesLayer = $('#files');
function area() {
  const W = vw(), H = vh();
  if (W >= 760) { const w = clamp(W * .25, 228, 320); return { x: W - w - 10, y: 96, w, h: H - 96 - 12, side: 'right' }; }
  return { x: 10, y: H - 236, w: W - 20, h: 226, side: 'bottom' };
}
const icon = {
  plus: '<svg class="i" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  import: '<svg class="i" viewBox="0 0 24 24"><path d="M12 4v11"/><path d="M7.5 10.5L12 15l4.5-4.5"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>',
  canvas: '<svg class="i" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 14c2-3 3 1 5-2s2 0 3-1"/></svg>',
  tools: '<svg class="i" viewBox="0 0 24 24"><path d="M4 20l1.2-4.4L15.8 5a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.4 18.8z"/></svg>',
  files: '<svg class="i" viewBox="0 0 24 24"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H10l2 2h5.5A2.5 2.5 0 0 1 20 9.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z"/></svg>',
  today: '<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/></svg>',
};
function labelHTML(f) {
  const sub = f.kind === 'folder' ? `${f.children.length} item${f.children.length === 1 ? '' : 's'}` : f.kind === 'note' ? (f.draft ? 'Draft' : f.date) : f.kind === 'doc' ? f.size : f.kind === 'image' ? 'Image' : 'Text';
  return `${esc(f.name)}<small>${esc(sub)}</small>`;
}
function tileInner(f) { return (f.icon ? `${emoImg(f.icon, 40, 'ficon')}${f.kind === 'folder' ? `<span class="fcount">${f.children.length}</span>` : ''}${f.kind === 'note' ? '<b class="live"></b>' : ''}` : tileBase(f)) + (f.fav ? '<svg class="favb" viewBox="0 0 24 24" aria-label="Favourite"><path d="M12 3.8l2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z"/></svg>' : ''); }
function tileBase(f) {
  switch (f.kind) {
    case 'folder': return `<div class="peek">${f.children.slice(0, 3).map((c, i) => `<i class="pk pk${i} pk-${c.kind}"${c.kind === 'image' ? ` style="background-image:url('${c.src}')"` : ''}></i>`).join('')}</div><div class="pocket"><span>${f.children.length}</span></div>`;
    case 'note': return `<div class="mini"><canvas data-note="${f.id}" width="92" height="68"></canvas></div><b class="live"></b>`;
    case 'image': return `<img src="${f.src}" alt="" draggable="false">`;
    case 'text': return `<div class="lines"><i></i><i></i><i></i><i></i></div><span class="ext">${esc((f.name.split('.').pop() || 'TXT').toUpperCase().slice(0, 4))}</span>`;
    default: return `<span class="ext big">${esc(f.ext)}</span>`;
  }
}
function repaintThumbs(f) { document.querySelectorAll(`canvas[data-note="${f.id}"]`).forEach(c => paintStrokes(c, f.strokes, 46, 34)); }
function updateCount() { const n = root.length; $('#fileCount').textContent = 'Files'; $('#qFiles').title = `Open all files (${n})`; }

const rootCtx = { parent: null, list: root, container: filesLayer, views: new Map(), bounds: () => ({ minX: -6, maxX: vw() - 74, minY: 0, maxY: vh() - 96 }), root: true };
function makeItem(f, ctx, x, y, extraClass = '') {
  const el = document.createElement('div'); el.className = `body item ${extraClass}`; el.dataset.id = f.id;
  const r = rng(parseInt(f.id.slice(1), 10) * 13 + 7);
  el.innerHTML = `<div class="bob" style="animation-duration:${(5 + r() * 3).toFixed(2)}s;animation-delay:-${(r() * 6).toFixed(2)}s"><div class="lift"><i class="plate"></i><div class="tile glass k-${f.kind}">${tileInner(f)}</div><div class="label">${labelHTML(f)}</div></div></div>`;
  ctx.container.append(el);
  if (f.kind === 'note') { paintStrokes(el.querySelector('canvas'), f.strokes, 46, 34); el.classList.toggle('current', f === current); }
  const b = new Body(el, { x, y, bounds: ctx.bounds, raise: !ctx.root, onRender: ctx.root ? null : bb => { f._pos = { x: bb.x, y: bb.y }; } });
  if (!ctx.root) b.noRubber = true;      // inside a folder, nothing holds the file back from the edge
  ctx.views.set(f.id, { el, b, f });
  let popped = false;
  draggable(b, el, {
    scale: ctx.root ? null : () => viewer.body.s,
    accept: e => { if (el.classList.contains('inrail')) return false; if (e.target.closest('.rn')) return false; if (ctx.root && filesState.piled) { togglePanel('files', 'collapse'); return false; } return true; },
    down: e => { pinTo(el, e); document.body.classList.add('file-drag'); if (ctx.root) liftItem(el); },
    up: () => document.body.classList.remove('file-drag'),
    tap: (e, t) => {
      if (selecting && ctx.root) return togglePick(f, el);
      const open = () => {
        if (ctx.root && fullKey === 'files') { exitFull(); return setTimeout(() => f.kind === 'note' ? loadNote(f) : openViewer(f, el.querySelector('.tile')), 420); }
        if (ctx.root && f === current && W.canvas.min) return restore('canvas'); ctx.root ? openViewer(f, el.querySelector('.tile')) : pushView(f);
      };
      if (!(t || e.target).closest('.label')) return open();
      if (labelTap.id === f.id && e.timeStamp - labelTap.t < 380) { clearTimeout(labelTap.timer); labelTap = {}; return renameInline(f, el); }
      clearTimeout(labelTap.timer); labelTap = { id: f.id, t: e.timeStamp, timer: setTimeout(() => { labelTap = {}; open(); }, 300) };
    },
    move: e => {
      if (popped) return;
      if (!ctx.root && viewer.open && wantsOut(e, b)) { popped = true; return popOutOfFolder(f, ctx, e, el); }
      hoverCheck(f, ctx);
    },
    hold: () => openCtx(f, ctx, el),
    holdCancel: () => closeCtx(),
    end: () => {
      if (popped) return false;
      if (dropOn(f, ctx)) return false;
      if (ctx.grid || (ctx.root && fullKey === 'files')) {        // inside a folder: drop back into a tidy slot (reorders)
        const to = ctx.slotAt(ctx.views.get(f.id).b.x, ctx.views.get(f.id).b.y);
        ctx.list.splice(ctx.list.indexOf(f), 1); ctx.list.splice(to, 0, f); ctx.layout(); return false;
      }
    },
  });
  el.addEventListener('contextmenu', e => { e.preventDefault(); openCtx(f, ctx, el); });
  // in the left column files don't move: tap opens, press and hold shows the menu, swipe scrolls
  el.addEventListener('click', () => { if (!el.classList.contains('inrail')) return; if (railHeld) { railHeld = false; return; } if (selecting) return togglePick(f, el); if (f === current && W.canvas.min) return restore('canvas'); openViewer(f, el.querySelector('.tile')); });
  el.addEventListener('pointerdown', e => {
    if (!el.classList.contains('inrail')) return;
    railHeld = false; const sx = e.clientX, sy = e.clientY;
    const t = setTimeout(() => { railHeld = true; openCtx(f, rootCtx, el); }, 500);
    const done = () => { clearTimeout(t); removeEventListener('pointermove', mv); removeEventListener('pointerup', done); removeEventListener('pointercancel', done); };
    const mv = ev => { if (Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) done(); };
    addEventListener('pointermove', mv); addEventListener('pointerup', done); addEventListener('pointercancel', done);
  });
  return { el, b };
}

/* iPhone-style grouping: hold a file over another to make a folder, or over a folder to file it */
let hover = { id: null };
const centerOf = el => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
function clearHover() { clearTimeout(hover.timer); if (hover.v) hover.v.el.classList.remove('near', 'merge', 'new', 'into'); if (hover.me) hover.me.classList.remove('merging'); hover = { id: null }; }
function hoverCheck(f, ctx) {
  const me = ctx.views.get(f.id); if (!me) return; const c = centerOf(me.el.querySelector('.tile'));
  let best = null, bd = 30;
  for (const [id, v] of ctx.views) { if (id === f.id) continue; const p = centerOf(v.el.querySelector('.tile')); const d = Math.hypot(c.x - p.x, c.y - p.y); if (d < bd) { bd = d; best = v; } }
  const id = best ? best.f.id : null;
  if (id === hover.id) return;
  clearHover(); if (!best) return;
  hover = { id, v: best, me: me.el, armed: false };
  best.el.classList.add('near');
  hover.timer = setTimeout(() => { hover.armed = true; best.el.classList.add('merge', best.f.kind === 'folder' ? 'into' : 'new'); me.el.classList.add('merging'); }, 650);
}
function dropOn(f, ctx) {
  const h = hover; clearHover();
  let target = h.armed && h.v && ctx.views.has(h.id) ? h.v.f : null;
  if (!target) return false;
  if (target.kind === 'folder') absorb(f, target, ctx); else groupIntoFolder(f, target, ctx);
  return true;
}
function flyInto(v, tx, ty) {
  active.delete(v.b);
  v.el.animate([{ transform: v.el.style.transform, opacity: 1 }, { transform: `translate3d(${tx}px,${ty}px,0) scale(.3)`, opacity: 0 }],
    { duration: 380, easing: 'cubic-bezier(.5,0,.3,1)', fill: 'forwards' }).onfinish = () => v.el.remove();
}
function absorb(f, target, ctx) {
  const me = ctx.views.get(f.id), tv = ctx.views.get(target.id);
  flyInto(me, tv.b.x, tv.b.y); ctx.views.delete(f.id); ctx.list.splice(ctx.list.indexOf(f), 1); delete f._pos;
  target.children.push(f);
  setTimeout(() => refreshFolder(target), 280);
  if (ctx.grid) setTimeout(() => ctx.layout(), 200);
  toast(`Moved “${f.name}” into ${target.name}`); afterTreeChange();
}
function suggestName(a, b) {
  const k = new Set([a.kind, b.kind]);
  if (k.size === 1 && k.has('image')) return 'Photos';
  if (k.size === 1 && k.has('note')) return 'Notes';
  if ([...k].every(x => x === 'text' || x === 'doc')) return 'Documents';
  return 'New folder';
}
function groupIntoFolder(f, target, ctx) {
  const me = ctx.views.get(f.id), tv = ctx.views.get(target.id), x = tv.b.x, y = tv.b.y;
  const folder = mk.folder(suggestName(f, target), [target, f]);
  ctx.list.splice(ctx.list.indexOf(target), 1, folder); ctx.list.splice(ctx.list.indexOf(f), 1);
  delete f._pos; delete target._pos;
  flyInto(me, x, y); flyInto(tv, x, y); ctx.views.delete(f.id); ctx.views.delete(target.id);
  setTimeout(() => {
    const { el } = makeItem(folder, ctx, x, y, 'pop');
    if (ctx.root) { ctx.layout(); setTimeout(() => openViewer(folder, el.querySelector('.tile'), { rename: true }), 420); }
    else { toast(`Made “${folder.name}”`); ctx.layout(); }
  }, 200);
  afterTreeChange();
}
function afterTreeChange() {
  updateCount();
  if (viewer.open) { viewer.stack.forEach(refreshFolder); const top = viewer.stack[viewer.stack.length - 1]; $('#pSub').innerHTML = subtitle(top); }
}
function refreshFolder(f) {
  if (f.kind !== 'folder') return;
  document.querySelectorAll(`.item[data-id="${f.id}"]`).forEach(el => {
    el.querySelector('.tile').innerHTML = tileInner(f); el.querySelector('.label').innerHTML = labelHTML(f);
    el.classList.remove('gulp'); void el.offsetWidth; el.classList.add('gulp');
  });
}
function freeSpot(ctx, a) {
  const taken = [...ctx.views.values()].map(v => ({ x: v.b.x, y: v.b.y }));
  let best = null, bestD = -1;
  for (let i = 0; i < 80; i++) {
    const top = a.side === 'right' ? 8 : 30, p = { x: a.x + Math.random() * Math.max(1, a.w - 80), y: a.y + top + Math.random() * Math.max(1, a.h - top - 100) };
    const d = taken.reduce((m, t) => Math.min(m, Math.hypot(t.x - p.x, t.y - p.y)), 1e9);
    if (d > bestD) { best = p; bestD = d; } if (d > 130) break;
  }
  return best;
}
const orbs = [];
function makeOrb(kind, label, svg, x, y, onTap) {
  const el = document.createElement('div'); el.className = 'body item orb';
  el.innerHTML = `<div class="bob" style="animation-duration:${kind === 'new' ? 6.5 : 7.3}s"><div class="lift"><div class="tile glass" role="button" tabindex="0" aria-label="${label}">${svg}</div><div class="label">${label}</div></div></div>`;
  filesLayer.append(el);
  const b = new Body(el, { x, y, bounds: rootCtx.bounds }); b.pinned = true;   // buttons hold their place; files bounce off them
  draggable(b, el, { accept: () => { if (filesState.piled) { togglePanel('files', 'collapse'); return false; } return true; }, tap: onTap,
    down: e => { pinTo(el, e); document.body.classList.add('file-drag'); }, up: () => document.body.classList.remove('file-drag') });
  el.querySelector('.tile').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTap(); } });
  orbs.push({ el, b, kind }); return b;
}
let labelTap = {};
function renameInline(f, el) {
  const label = el.querySelector('.label');
  label.innerHTML = `<input class="rn" maxlength="40" aria-label="Rename ${esc(f.name)}" value="${esc(f.name)}">`; const isChip = el.id === 'noteChip';
  const inp = label.querySelector('input'); let done = false;
  const finish = keep => { if (done) return; done = true; if (keep) renameFile(f, inp.value); label.innerHTML = labelHTML(f); if (isChip) label.textContent = f.name; };
  inp.addEventListener('pointerdown', e => e.stopPropagation());
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') finish(true); if (e.key === 'Escape') finish(false); });
  inp.addEventListener('blur', () => finish(true));
  inp.focus(); inp.select();
}
// scale and tilt around the exact point you touched, so the file never slides out from under your finger
function pinTo(el, e) {
  for (const sel of ['.lift', '.tile']) {
    const n = el.querySelector(sel); if (!n) continue; const r = n.getBoundingClientRect();
    n.style.transformOrigin = `${clamp(e.clientX - r.left, 0, r.width).toFixed(1)}px ${clamp(e.clientY - r.top, 0, r.height).toFixed(1)}px`;
  }
}
const allFileBodies = () => root.map(f => rootCtx.views.get(f.id)).filter(Boolean).map(v => v.b);
function quickPos(id) { const r = $(`#${id}`).getBoundingClientRect(); return { x: r.left, y: r.bottom + 6 }; }

/* ---------- layout ---------- */
let home = { x: 0, y: 0, s: 1 };
function computeHome() {
  const a = area(), W = vw(), H = vh(), top = 84, dockH = 74, L = 16;
  const right = a.side === 'right' ? a.x - 20 : W - 16, availW = right - L, availH = (a.side === 'right' ? H : a.y) - top - dockH - 16;
  const s = clamp(Math.min(availW / PW, availH / PH), .4, 1);
  return { x: L + Math.max(0, (availW - PW * s) / 2), y: top + Math.max(0, Math.min(H > W ? 24 : 1e9, (availH - PH * s) / 2)), s };
}
function settleNew(b) { if (railOn || fullKey === 'files') return rootCtx.layout(); const sp = freeSpot(rootCtx, area()); b.springTo(sp.x, sp.y, null, 170, 20); }
function rootGeo() { const a = area(), cols = Math.max(2, Math.floor((a.w - 8) / 88)); return { a, cols, colW: (a.w - 8) / cols, rowH: a.side === 'right' ? 104 : 96, y0: a.y + (a.side === 'right' ? 6 : 18) }; }
function fileTargets() {
  const g = rootGeo(), bodies = allFileBodies();
  return bodies.map((b, i) => ({ b, x: g.a.x + 4 + (i % g.cols) * g.colW + (g.colW - 80) / 2, y: g.y0 + Math.floor(i / g.cols) * g.rowH }));
}
// files keep fixed slots: dragging one reorders it (or groups it); it never stays where you dropped it
rootCtx.grid = false;
rootCtx.layout = () => {
  if (railOn) return enterRail();
  if (fullKey === 'files') return fullGrid();
  if (filesState.piled) return;
};
// a new file flies from its button to the nearest free spot
rootCtx.slotAt = (x, y) => {
  if (fullKey === 'files') { const cols = Math.max(2, Math.floor((vw() - 48) / 104)), colW = (vw() - 48) / cols; return clamp(Math.max(0, Math.round((y - 164) / 120)) * cols + clamp(Math.round((x - 24 - (colW - 80) / 2) / colW), 0, cols - 1), 0, root.length - 1); }
  const g = rootGeo(), col = clamp(Math.round((x - g.a.x - 4 - (g.colW - 80) / 2) / g.colW), 0, g.cols - 1), row = Math.max(0, Math.round((y - g.y0) / g.rowH));
  return clamp(row * g.cols + col, 0, root.length - 1);
};
function filesHdrHome() { const a = area(); return { x: a.x + 6, y: a.side === 'right' ? a.y - 8 : a.y - 46 }; }

/* ---------- windows: minimize / collapse / full screen ---------- */
const LIGHT_SVG = {
  min: '<svg viewBox="0 0 12 12"><path d="M3 6h6"/></svg>',
  close: '<svg viewBox="0 0 12 12"><path d="M3.6 3.6l4.8 4.8M8.4 3.6L3.6 8.4"/></svg>',
  collapse: '<svg viewBox="0 0 12 12"><path d="M3 6h6"/></svg>',
  full: '<svg viewBox="0 0 12 12"><path d="M3 9V5.2L6.8 9z"/><path d="M9 3v3.8L5.2 3z"/></svg>',
};
const W_INFO = {
  today: { label: 'Today', icon: 'today' }, canvas: { label: 'Canvas', icon: 'canvas' },
  tools: { label: 'Tools', icon: 'tools', noFull: true }, files: { label: 'Files', icon: 'files' }, viewer: { label: 'File', close: true },
};
document.querySelectorAll('.lights[data-panel]').forEach(l => {
  const k = l.dataset.panel, info = W_INFO[k];
  l.innerHTML = `${k === 'today' ? '' : `<button class="lt lt-r" data-act="min" aria-label="Close" title="Close">${LIGHT_SVG.close}</button>`}
    <button class="lt lt-y" data-act="collapse" aria-label="Shrink to 65%" title="Shrink to 65%">${LIGHT_SVG.collapse}</button>
    <button class="lt lt-g" data-act="full" aria-label="Full screen" title="${info.noFull ? 'This window has a fixed size' : 'Full screen'}" ${info.noFull ? 'disabled' : ''}>${LIGHT_SVG.full}</button>`;
  l.addEventListener('pointerdown', e => e.stopPropagation());
  l.querySelectorAll('.lt').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); togglePanel(k, b.dataset.act); }));
});
let fullKey = null; const saved = {};
const filesState = { piled: false, min: false };
let W; // window registry, filled at boot
function syncLights() {
  const qf = $('#qFiles'); if (qf) qf.setAttribute('aria-pressed', String(fullKey === 'files'));
  document.querySelectorAll('.lights[data-panel]').forEach(l => {
    const k = l.dataset.panel, y = l.querySelector('[data-act="collapse"]'), g = l.querySelector('[data-act="full"]');
    const yt = k === 'canvas' ? 'Window, 75% of the screen' : k === 'viewer' ? (viewer.collapsed ? 'Unfold' : viewer.mode === 'full' ? 'Window, 75% of the screen' : 'Fold to title bar')
      : k === 'files' ? (fullKey === 'files' ? 'Back to window' : filesState.piled ? 'Spread files out' : 'Gather files') : 'Back to window';
    y.setAttribute('aria-label', yt); y.title = yt; g.setAttribute('aria-label', 'Full screen'); g.title = 'Full screen';
  });
}
function togglePanel(k, act) {
  if (k === 'viewer') return act === 'min' ? closeViewer() : act === 'full' ? setViewerMode('full') : viewer.mode === 'full' ? setViewerMode('win75') : toggleViewerCollapse();
  if (act === 'min') return minimize(k);
  if (act === 'full') return fullKey === k ? nudge(W[k].inner) : enterFull(k);      // green only ever goes full screen
  if (act === 'collapse') return windowed(k);                                       // yellow only ever goes to the 75% window
}
function fullGrid(stagger) {
  const bodies = allFileBodies(), cols = Math.max(2, Math.floor((vw() - 48) / 104)), colW = (vw() - 48) / cols;
  bodies.forEach((b, i) => { const go = () => b.springTo(24 + (i % cols) * colW + (colW - 80) / 2, 164 + Math.floor(i / cols) * 120, null, 190, 27); stagger ? setTimeout(go, i * 22) : go(); });
}
let fileSort = null;
function sizeOf(f) {
  if (f.kind === 'folder') return f.children.reduce((t, c) => t + sizeOf(c), 0);
  if (f.kind === 'note') return JSON.stringify(f.strokes).length;
  if (f.kind === 'image') return f.src.length * .75;
  if (f.kind === 'text') return f.body.length;
  const m = /([\d.]+)\s*(KB|MB)/i.exec(f.size || ''); return m ? parseFloat(m[1]) * (m[2].toUpperCase() === 'MB' ? 1e6 : 1e3) : 0;
}
function sortRoot(by) {
  fileSort = by; const order = { folder: 0, note: 1, image: 2, text: 3, doc: 4 };
  const cmp = { date: (a, b) => (b.added || 0) - (a.added || 0), name: (a, b) => a.name.localeCompare(b.name), kind: (a, b) => (order[a.kind] - order[b.kind]) || a.name.localeCompare(b.name), size: (a, b) => sizeOf(b) - sizeOf(a) }[by];
  root.sort(cmp); syncFilesBar(); if (fullKey === 'files') fullGrid(true);
  toast(`Sorted by ${{ date: 'date added', name: 'name', kind: 'type', size: 'size' }[by]}`);
}
function syncFilesBar() {
  $('#fbCount').textContent = `All files · ${root.length}`;
  $('#fbSort').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.s === fileSort)));
}
$('#fbSort').addEventListener('click', e => { const b = e.target.closest('button'); if (b) sortRoot(b.dataset.s); });
function nudge(el) { el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.015)' }, { transform: 'scale(1)' }], { duration: 300, easing: 'ease-out' }); }
function leaveFull() { sheetEl.classList.remove('fullbleed'); fullKey = null; delete document.body.dataset.full; $('#exitFull').hidden = true; $('#filesBar').hidden = true; syncLights(); }
function windowed(k) {
  if (k !== 'canvas') { if (fullKey === k) exitFull(); else if (k === 'files') { toggleFilesPile(); syncLights(); } else nudge(W[k].inner); return; }
  if (W.canvas.min) restore('canvas');
  const tw = Math.round(vw() * .75), th = Math.round(vh() * .75);
  if (fullKey === 'canvas') { W.tools.body.springTo(saved.dock.x, saved.dock.y, null, 170, 22); leaveFull(); }
  else if (Math.abs(PW - tw) < 2 && Math.abs(PH - th) < 2 && Math.abs(sheet.s - 1) < .01) { canvas75 = true; syncRail(); return nudge(sheetWin); }
  sheet.springTo((vw() - tw) / 2, clamp((vh() - th) / 2, 80, vh()), 1, 190, 27);
  animateSize(tw, th, () => { home = computeHome(); });
  const dw = $('#dock .win').offsetWidth, ty = clamp((vh() - th) / 2, 80, vh());
  W.tools.body.springTo((vw() - dw) / 2, Math.min(ty + th + 10, vh() - 64), null, 190, 27);     // the pen bar sits under the note, clear of the file column
  canvas75 = true; syncRail();
}
function centerTop(spring) {
  const w = $('#topWin').offsetWidth, x = (vw() - w) / 2, y = 10;
  spring ? W.today.body.springTo(x, y, null, 220, 26) : W.today.body.place(x, y);
}

// full screen: only one window stays, everything else fades away
function enterFull(k) {
  if (fullKey) exitFull(true);
  if (railOn) exitRail();
  fullKey = k; document.body.dataset.full = k; closePop();
  const xb = $('#exitFull'); xb.hidden = false; xb.animate([{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }], { duration: SPR.d, easing: SPR.e });
  const w = W[k];
  if (k === 'today' && w.shrunk) { w.shrunk = false; w.outer.classList.remove('shrunk'); w.body.ts = null; w.body.s = 1; w.body.render(); }
  if (k === 'today') { selKey = todayKey; calMonth = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1); }
  if (k === 'canvas') {
    saved.canvas = { x: sheet.x, y: sheet.y, s: sheet.s, w: PW, h: PH, c75: canvas75 }; saved.dock = { x: W.tools.body.x, y: W.tools.body.y }; canvas75 = false;
    sheetEl.classList.add('fullbleed'); bringToFront('sheet');
    sheet.springTo(0, 0, 1, 190, 27); animateSize(vw(), vh());
    const dw = $('#dock .win').offsetWidth; W.tools.body.springTo((vw() - dw) / 2, vh() - 78, null, 190, 27);
  } else if (k === 'today') {
    saved.today = { x: W.today.body.x, y: W.today.body.y };
    morph($('#topWin'), () => {
      $('#topbar').classList.add('full'); renderToday();
      const r = $('#topWin'); W.today.body.place((vw() - r.offsetWidth) / 2, Math.max(16, (vh() - r.offsetHeight) / 2));
    });
  } else if (k === 'files') {
    if (filesState.piled) toggleFilesPile(true);
    saved.files = allFileBodies().map(b => ({ b, x: b.x, y: b.y })); saved.hdr = { x: W.files.body.x, y: W.files.body.y };
    W.files.body.springTo(24, 20, null, 190, 27);
    fullGrid(true); syncFilesBar();
    const fb = $('#filesBar'); fb.hidden = false; fb.animate([{ opacity: 0, transform: 'translate(-50%, -12px)' }, { opacity: 1, transform: 'translate(-50%, 0)' }], { duration: SPR_OPEN.d, easing: SPR_OPEN.e });
  }
  syncLights();
}
function exitFull(quick) {
  const k = fullKey; if (!k) return;
  fullKey = null; delete document.body.dataset.full; $('#exitFull').hidden = true; $('#filesBar').hidden = true;
  if (k === 'canvas') {
    sheetEl.classList.remove('fullbleed'); canvas75 = !!saved.canvas.c75;
    if (quick) { cancelAnimationFrame(sizeAnim); sheet.place(saved.canvas.x, saved.canvas.y); sheet.ts = null; sheet.s = saved.canvas.s; sheet.render(); setSize(saved.canvas.w, saved.canvas.h); sizeCanvases(true); sheetEl.classList.remove('resizing'); }
    else { sheet.springTo(saved.canvas.x, saved.canvas.y, saved.canvas.s, 190, 27); animateSize(saved.canvas.w, saved.canvas.h); }
    W.tools.body.springTo(saved.dock.x, saved.dock.y, null, 170, 22);
  }
  else if (k === 'today') {
    morph($('#topWin'), () => { $('#topbar').classList.remove('full'); W.today.body.place(saved.today.x, saved.today.y); });
    if (current.mood != null) setTimeout(() => slidePill(moodPill, moodsEl.querySelector(`[data-i="${current.mood}"]`), true), 30);
  }
  else if (k === 'files') { W.files.body.springTo(saved.hdr.x, saved.hdr.y, null, 170, 22); saved.files.forEach(({ b, x, y }, i) => setTimeout(() => b.springTo(x, y, null, 190, 26), i * 16)); allFileBodies().filter(b => !saved.files.some(q => q.b === b)).forEach(settleNew); }
  syncLights(); syncRail();
}

// collapse the file field into a pile under its header
function toggleFilesPile(instant) {
  const on = !filesState.piled; filesState.piled = on;
  W.files.outer.classList.toggle('collapsed', on); filesLayer.classList.toggle('piled', on);
  const bodies = allFileBodies();
  if (on) {
    saved.pile = bodies.map(b => ({ b, x: b.x, y: b.y }));
    const hx = W.files.body.x + 10, hy = W.files.body.y + 52;
    bodies.forEach((b, i) => { b.el.style.zIndex = 30 + bodies.length - i; b.tilt = (i % 2 ? 1 : -1) * (2 + i * .6); b.springTo(hx + i * 2.5, hy + i * 3, null, 190, 20); });
  } else {
    saved.pile.forEach(({ b, x, y }, i) => instant ? b.place(x, y) : setTimeout(() => b.springTo(x, y, null, 190, 24), i * 25));
  }
}

// minimize to the tray, genie-style
const tray = $('#tray');
function addChip(k) {
  const info = W_INFO[k], c = document.createElement('button'); c.className = 'tchip'; c.dataset.k = k;
  c.innerHTML = `<span class="ic">${icon[info.icon]}</span>${info.label}`; c.setAttribute('aria-label', `Restore ${info.label}`);
  c.addEventListener('click', () => restore(k));
  tray.hidden = false; tray.append(c); return c;
}
function minimize(k) {
  if (fullKey === k) exitFull(true);
  const w = W[k]; if (w.min) return; w.min = true; closePop();
  if (k === 'canvas') {
    closeToolPop(); clearSel();
    canvas75 = false; syncRail();
    const pk = showParked();
    const c = pk.querySelector('.tile').getBoundingClientRect();
    genie(w, c).onfinish = () => {
      w.outer.hidden = true; document.body.classList.add('canvas-closed');
      pk.querySelector('.tile').animate([{ transform: 'scale(.7)' }, { transform: 'none' }], { duration: SPR.d, easing: SPR.e });
    };
    toast(`“${current.name}” closed. It waits in the toolbar; tap it for options.`);
    return;
  }
  const chip = addChip(k); chip.style.opacity = 0;
  const c = chip.getBoundingClientRect();
  const done = () => { chip.style.opacity = ''; chip.animate([{ transform: 'scale(.4)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: SPR.d, easing: SPR.e }); };
  if (k === 'files') {
    const bodies = allFileBodies();
    bodies.forEach((b, i) => { const r = b.el.getBoundingClientRect(); b.el.querySelector('.lift').animate([{ transform: 'none', opacity: 1 }, { transform: `translate(${c.left - r.left}px,${c.top - r.top}px) scale(.2)`, opacity: 0 }], { duration: 420, delay: i * 18, easing: 'cubic-bezier(.5,0,.3,1)', fill: 'forwards' }); });
    genie(w, c).onfinish = () => { w.outer.hidden = true; filesLayer.hidden = true; done(); };
    return;
  }
  genie(w, c).onfinish = () => { w.outer.hidden = true; done(); };
}
function genie(w, c) {
  const a = w.inner.getBoundingClientRect(), ps = w.body.s || 1;
  return w.inner.animate([{ transform: 'none', opacity: 1 },
    { opacity: 1, offset: .55 },
    { transform: `translate(${(c.left - a.left) / ps}px,${(c.top - a.top) / ps}px) scale(${c.width / a.width},${c.height / a.height})`, opacity: 0 }],
    { duration: 520, easing: 'cubic-bezier(.32,.72,0,1)' });
}
function showParked() { syncNoteChip(); return $('#noteChip'); }
function noteAnchor() {
  if (W.canvas.min || document.body.classList.contains('canvas-closed')) return $('#noteChip .tile').getBoundingClientRect();
  const v = rootCtx.views.get(current.id);
  return (v && !filesLayer.hidden && !filesState.piled ? v.el.querySelector('.tile') : $('#filesWin')).getBoundingClientRect();
}
$('#noteChip').addEventListener('click', e => { if (e.target.closest('.rn')) return; if (ctxState) return closeCtx(); openCtx(current, ctxFor(current), $('#noteChip')); });
function restore(k) {
  const w = W[k]; if (!w.min) return; w.min = false;
  if (k === 'canvas') {
    const c = noteAnchor(); w.outer.hidden = false; w.body.settle(); bringToFront('sheet'); setTimeout(() => document.body.classList.remove('canvas-closed'), 60);
    const pk = $('#parked'); if (!pk.hidden) pk.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(.8)' }], { duration: 220 }).onfinish = () => { pk.hidden = true; };
    const a = w.inner.getBoundingClientRect(), ps = w.body.s || 1;
    w.inner.animate([{ transform: `translate(${(c.left - a.left) / ps}px,${(c.top - a.top) / ps}px) scale(${c.width / a.width},${c.height / a.height})`, opacity: 0, filter: 'blur(6px)' },
      { transform: 'none', opacity: 1, filter: 'blur(0)' }], { duration: SPR_OPEN.d, easing: SPR_OPEN.e });
    return;
  }
  const chip = tray.querySelector(`[data-k="${k}"]`), c = chip.getBoundingClientRect();
  w.outer.hidden = false;
  if (k === 'files') { filesLayer.hidden = false; allFileBodies().forEach((b, i) => { const l = b.el.querySelector('.lift'); l.getAnimations().forEach(x => x.cancel()); const r = b.el.getBoundingClientRect();
    l.animate([{ transform: `translate(${c.left - r.left}px,${c.top - r.top}px) scale(.2)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: SPR.d, delay: i * 22, easing: SPR.e, fill: 'backwards' }); }); }
  w.body.settle();
  const a = w.inner.getBoundingClientRect(), ps = w.body.s || 1;
  w.inner.animate([{ transform: `translate(${(c.left - a.left) / ps}px,${(c.top - a.top) / ps}px) scale(${c.width / a.width},${c.height / a.height})`, opacity: 0, filter: 'blur(6px)' },
    { transform: 'none', opacity: 1, filter: 'blur(0)' }], { duration: SPR_SOFT.d, easing: SPR_SOFT.e });
  chip.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(.6)' }], { duration: 200 }).onfinish = () => { chip.remove(); tray.hidden = !tray.children.length; };
  if (k === 'tools' || k === 'today') setTimeout(() => { syncDock(true); if (current.mood != null) slidePill(moodPill, moodsEl.querySelector(`[data-i="${current.mood}"]`), true); }, 30);
}

/* ---------- file viewer window ---------- */
const panelPos = $('#panelPos'), panelEl = $('#panel'), pBody = $('#pBody'), scrim = $('#scrim'), pTitle = $('#pTitle');
const viewer = { open: false, full: false, collapsed: false, stack: [], origin: null, body: new Body(panelPos, { tiltK: 0, raise: false }) };
viewer.body.bounds = () => { const [x0, x1] = span(panelEl.offsetWidth, vw(), 6), [y0, y1] = span(panelEl.offsetHeight, vh(), 6); return { minX: x0, maxX: x1, minY: y0, maxY: y1 }; };
draggable(viewer.body, $('#pHead'), {
  accept: () => !viewer.full,
  end: (e, v) => { if (Math.hypot(v.x, v.y) > 1800) { closeViewer(v); return false; } },
});
$('#pBack').addEventListener('click', () => popView());
scrim.addEventListener('click', () => closeViewer());
$('#exitFull').addEventListener('click', () => exitFull());
// tap the empty background to leave the Today or Files full-screen view
document.addEventListener('pointerdown', e => {
  if (viewer.open || !fullKey) return;
  if (e.target.closest('#ctxMenu, #ctxCatch, #emojiPop')) return;
  if (fullKey === 'today' && !e.target.closest('#topbar, #appPop, #exitFull')) exitFull();
});
pTitle.addEventListener('input', () => { const f = viewer.stack[viewer.stack.length - 1]; renameFile(f, pTitle.value); });
dblTapRename(pTitle);
function viewerSize() {
  if (viewer.mode === 'full') return { w: vw() - 32, h: vh() - 32 - 64 };
  if (viewer.mode === 'win75') return { w: Math.round(vw() * .75), h: Math.round(vh() * .75) - 64 };
  return { w: Math.min(600, vw() - 24), h: Math.min(400, vh() - 190) };
}
function markOpened(tileEl) { document.querySelectorAll('.item.opened').forEach(e => e.classList.remove('opened')); const it = tileEl && tileEl.closest('.item'); if (it) it.classList.add('opened'); }
function openViewer(f, tileEl, opt = {}) {
  if (viewer.open) {        // already open: show this file in the same window instead
    if (viewer.stack.length === 1 && viewer.stack[0] === f) return bringToFront('panelPos');
    if (viewer.origin) viewer.origin.style.visibility = '';
    viewer.origin = tileEl; if (!railOn) tileEl.style.visibility = 'hidden'; markOpened(tileEl);
    viewer.stack = [f]; renderView(1); bringToFront('panelPos'); return;
  }
  closePop();
  viewer.open = true; viewer.full = false; viewer.mode = 'normal'; viewer.collapsed = false; panelEl.classList.remove('collapsed'); viewer.shrunk = false; viewer.body.ts = null; viewer.body.s = 1; viewer.stack = [f]; viewer.origin = tileEl;
  const { w, h } = viewerSize();
  panelEl.style.width = w + 'px'; pBody.style.height = h + 'px';
  panelPos.hidden = false; pBody.innerHTML = '';
  renderView(0);
  const ph = panelEl.offsetHeight;
  viewer.body.place((vw() - w) / 2, clamp((vh() - ph) / 2, 12, vh()));
  const fr = panelEl.getBoundingClientRect(), or = tileEl.getBoundingClientRect();
  if (!railOn) tileEl.style.visibility = 'hidden';
  bringToFront('panelPos'); markOpened(tileEl);
  panelEl.animate([
    { transform: `translate(${or.left - fr.left}px,${or.top - fr.top}px) scale(${or.width / fr.width},${or.height / fr.height})`, borderRadius: '60px', opacity: .5 },
    { transform: 'none', borderRadius: '32px', opacity: 1 }], { duration: SPR_OPEN.d, easing: SPR_OPEN.e });
  for (const el of [$('#pHead'), pBody]) el.animate([{ opacity: 0, filter: 'blur(10px)' }, { opacity: 0, filter: 'blur(10px)', offset: .25 }, { opacity: 1, filter: 'blur(0)' }], { duration: Math.max(420, SPR_SOFT.d * .7), easing: 'ease-out' });
  syncLights();
  if (opt.rename) setTimeout(() => toast('New folder. Double-tap its name to rename it.'), 350);
}
function closeViewer(v) {
  if (!viewer.open) return; viewer.open = false; viewer.full = false; viewer.mode = 'normal'; markOpened(null); setTimeout(syncRail, 0);
  const tile = viewer.origin, fr = panelEl.getBoundingClientRect();
  active.delete(viewer.body);
  let anim;
  if (v) anim = panelPos.animate([{ transform: panelPos.style.transform, opacity: 1 }, { transform: `translate3d(${viewer.body.x + v.x * .25}px,${viewer.body.y + v.y * .25}px,0) scale(.9)`, opacity: 0 }], { duration: 320, easing: 'cubic-bezier(.2,.6,.3,1)' });
  else if (tile && tile.isConnected) {
    const or = tile.getBoundingClientRect();
    anim = panelEl.animate([{ transform: 'none', opacity: 1, borderRadius: '32px' },
      { transform: `translate(${or.left - fr.left}px,${or.top - fr.top}px) scale(${or.width / fr.width},${or.height / fr.height})`, opacity: .4, borderRadius: '70px' }],
      { duration: 460, easing: 'cubic-bezier(.32,.72,0,1)' });
    $('#pHead').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' });
    pBody.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' });
  } else anim = panelEl.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(.94)' }], { duration: 240 });
  anim.onfinish = () => {
    panelPos.hidden = true; pBody.innerHTML = ''; $('#pHead').getAnimations().forEach(a => a.cancel()); pBody.getAnimations().forEach(a => a.cancel());
    if (tile) { tile.style.visibility = ''; const it = tile.closest('.item'); if (it) { it.classList.remove('pop'); void it.offsetWidth; it.classList.add('pop'); } }
  };
}
function toggleViewerCollapse() {        // yellow on an open file folds it to its title bar; tap again to unfold
  viewer.collapsed = !viewer.collapsed; panelEl.classList.toggle('collapsed', viewer.collapsed);
  pBody.style.height = viewer.collapsed ? '0px' : viewerSize().h + 'px'; syncLights();
}
function setViewerMode(mode) {
  if (viewer.collapsed) { viewer.collapsed = false; panelEl.classList.remove('collapsed'); }
  if (viewer.mode === mode) return nudge(panelEl);
  morph(panelEl, () => {
    viewer.mode = mode; viewer.full = mode === 'full';
    const { w, h } = viewerSize(); panelEl.style.width = w + 'px';
    pBody.style.transition = 'none'; pBody.style.height = h + 'px'; void pBody.offsetHeight; pBody.style.transition = '';
    renderView(0);
    viewer.body.place((vw() - w) / 2, mode === 'full' ? 16 : Math.max(12, (vh() - panelEl.offsetHeight) / 2));
  });
  syncLights(); syncRail();
}
function pushView(f) { viewer.stack.push(f); renderView(1); }
function popView() { if (viewer.stack.length > 1) { viewer.stack.pop(); renderView(-1); } }
function subtitle(f) {
  if (f.kind === 'folder') return `${f.children.length} item${f.children.length === 1 ? '' : 's'} · hold one file over another to group them`;
  if (f.kind === 'note') return `Handwritten note · ${esc(f.date)}${f.mood != null ? ' · ' + emo(f.mood, 14) + ' ' + MOODS[f.mood].n : ''}`;
  if (f.kind === 'image') return f.file ? `Image · ${esc(f.file)}` : 'Image';
  if (f.kind === 'doc') return `${esc(f.ext)} · ${esc(f.size)}`;
  return 'Text file';
}
function renderView(dir) {
  const f = viewer.stack[viewer.stack.length - 1];
  pTitle.value = f.name; $('#pSub').innerHTML = subtitle(f);
  $('#pBack').hidden = viewer.stack.length < 2;
  const old = pBody.querySelector('.view:not(.leaving)');
  const view = document.createElement('div'); view.className = 'view'; pBody.append(view);
  if (f.kind === 'folder') buildFolder(view, f); else buildDetail(view, f);
  if (!old) return;
  if (!dir) { old.remove(); return; }
  old.classList.add('leaving');
  old.animate([{ transform: 'none', opacity: 1, filter: 'blur(0)' }, { transform: `translateX(${-dir * 60}px) scale(.96)`, opacity: 0, filter: 'blur(8px)' }], { duration: 300, easing: 'cubic-bezier(.4,0,.2,1)' }).onfinish = () => old.remove();
  view.animate([{ transform: `translateX(${dir * 36}px)`, opacity: 0, filter: 'blur(8px)' }, { transform: 'none', opacity: 1, filter: 'blur(0)' }], { duration: SPR_OPEN.d, easing: SPR_OPEN.e });
}
function buildFolder(view, f) {
  view.classList.add('scroll');
  const space = document.createElement('div'); space.className = 'space grid'; view.append(space);
  if (!f.children.length) { space.innerHTML = '<div class="empty"><b>This folder is empty</b><small>Drag a file onto it to add one.</small></div>'; space.style.height = '100%'; return; }
  const ROW = 112, ctx = { parent: f, list: f.children, container: space, views: new Map(), grid: true };
  const geo = () => { const w = space.clientWidth || 560, cols = Math.max(2, Math.floor(w / 104)); return { cols, colW: w / cols }; };
  const slot = i => { const { cols, colW } = geo(); return { x: (i % cols) * colW + (colW - 80) / 2, y: 8 + Math.floor(i / cols) * ROW }; };
  const fit = () => { space.style.height = Math.ceil(f.children.length / geo().cols) * ROW + 12 + 'px'; };
  ctx.layout = () => { fit(); f.children.forEach((c, i) => { const v = ctx.views.get(c.id); if (v) { const q = slot(i); v.b.springTo(q.x, q.y, null, 260, 30); } }); };
  ctx.slotAt = (x, y) => { const { cols, colW } = geo(); const col = clamp(Math.round((x - (colW - 80) / 2) / colW), 0, cols - 1), row = Math.max(0, Math.round((y - 8) / ROW)); return clamp(row * cols + col, 0, f.children.length - 1); };
  ctx.bounds = () => ({ minX: -24, maxX: space.clientWidth - 56, minY: -16, maxY: space.clientHeight - 70 });
  fit();
  f.children.forEach((c, i) => {
    const q = slot(i); const { el } = makeItem(c, ctx, q.x, q.y);
    if (!reduceMotion) el.querySelector('.lift').animate([{ transform: 'scale(.92)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: SPR_OPEN.d, easing: SPR_OPEN.e, delay: 40 + i * 30, fill: 'backwards' });
  });
}
function buildDetail(view, f) {
  const d = document.createElement('div'); d.className = 'detail'; view.append(d);
  const stage = document.createElement('div'); stage.className = 'stage'; d.append(stage);
  const foot = document.createElement('div'); foot.className = 'foot'; d.append(foot);
  if (f.kind === 'note') {
    const c = document.createElement('canvas'); stage.append(c);
    const e = extent(f.strokes), h = parseFloat(pBody.style.height) - 20 - 60 - 14, w = Math.min(parseFloat(panelEl.style.width) - 40, h * e.w / e.h);
    c.style.width = w + 'px'; c.style.height = w * e.h / e.w + 'px'; paintStrokes(c, f.strokes, w, w * e.h / e.w);
    const isCur = f === current && !W.canvas.min;
    foot.innerHTML = `<small>${f.strokes.length ? f.strokes.length + (f.strokes.length === 1 ? ' stroke' : ' strokes') : 'Empty page'}</small><button class="cta">Open</button>`;
    foot.querySelector('.cta').addEventListener('click', () => { closeViewer(); setTimeout(() => loadNote(f), 140); });
  } else if (f.kind === 'image') {
    stage.innerHTML = `<img src="${f.src}" alt="${esc(f.name)}" draggable="false">`;
    foot.innerHTML = `<small>${f.file ? 'Imported today' : 'Sample photo'}</small>`;
  } else if (f.kind === 'text') {
    const pre = document.createElement('pre'); pre.textContent = f.body; stage.append(pre);
    pre.addEventListener('pointerdown', e => e.stopPropagation());
    foot.innerHTML = `<small>${f.body.split(/\s+/).filter(Boolean).length} words</small>`;
  } else {
    stage.innerHTML = `<div class="nopreview"><div class="tile glass k-doc" style="width:96px;height:120px;border-radius:20px"><span class="ext big">${esc(f.ext)}</span></div><b>${esc(f.name)}</b><small>${esc(f.size)} · Preview is not part of this demo.</small></div>`;
  }
}

/* ---------- notes: open / new ---------- */
function syncNoteChip() {
  const ch = $('#noteChip'); if (!ch) return; const cv = ch.querySelector('canvas'); cv.dataset.note = current.id; paintStrokes(cv, current.strokes, 34, 26);
  if (!ch.querySelector('.rn')) ch.querySelector('.label').textContent = current.name;
}
function setCurrentMarker() { syncNoteChip(); document.querySelectorAll('.item.current').forEach(e => e.classList.remove('current')); document.querySelectorAll(`.item[data-id="${current.id}"]`).forEach(e => e.classList.add('current')); }
function loadNote(f) {
  if (!f) return;
  bringToFront('sheet');
  if (f === current) { if (W.canvas.min) restore('canvas'); return; }
  if (W.canvas.min) restore('canvas');
  if (sheetEl.classList.contains('collapsed')) sheetEl.classList.remove('collapsed');
  const inkEl = $('#sheet .ink');
  const swap = () => {
    clearSel(); current = f; titleIn.value = f.name; setPaper(f.paper || 'grid'); redrawBase(); setMood(f.mood, false); noteChanged(); setCurrentMarker();
    inkEl.animate([{ opacity: 0, filter: 'blur(10px)', transform: 'scale(1.02)' }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { duration: SPR_SOFT.d, easing: SPR_SOFT.e });
  };
  if (reduceMotion) return swap();
  inkEl.animate([{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(10px)', transform: 'scale(.98)' }], { duration: 200, easing: 'ease-in' }).onfinish = swap;
}
function newNote() {
  if (fullKey === 'files') exitFull(true); else if (fullKey === 'today') exitFull();
  if (W.files.min) restore('files');
  if (filesState.piled) toggleFilesPile(true);
  const f = Object.assign(mk.note('Untitled', [], todayStr, current.mood, 'grid'), { draft: true }); root.unshift(f);
  const orb = quickPos('qNew'); const spot = freeSpot(rootCtx, area());
  settleNew(makeItem(f, rootCtx, orb.x, orb.y, 'pop').b);
  updateCount(); loadNote(f); toast('New note. Double-tap its name to rename it.');
}

/* ---------- import ---------- */
const fileInput = $('#fileInput');
fileInput.addEventListener('change', () => { importFiles([...fileInput.files], null, importTarget); importTarget = null; fileInput.value = ''; });
fileInput.addEventListener('cancel', () => { importTarget = null; });
addEventListener('dragover', e => e.preventDefault());
addEventListener('drop', e => { e.preventDefault(); const fs = [...(e.dataTransfer && e.dataTransfer.files || [])]; if (fs.length) importFiles(fs, { x: e.clientX - 40, y: e.clientY - 40 }); });
function humanSize(n) { return n > 1e6 ? (n / 1e6).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1e3)) + ' KB'; }
function importFiles(files, at, into) {
  const big = files.filter(f => f.size > MAX_IMPORT); files = files.filter(f => f.size <= MAX_IMPORT);
  if (big.length) toast(`${big.length} file${big.length > 1 ? 's are' : ' is'} over 25 MB and wasn’t imported`);
  if (!files.length) return;
  if (into) {
    let done = 0;
    files.forEach(file => readFile(file, f => { into.children.push(f); if (++done === files.length) { refreshFolder(into); afterTreeChange(); toast(`Imported ${files.length} into ${into.name}`); } }));
    return;
  }
  if (W.files.min) restore('files');
  if (filesState.piled) toggleFilesPile(true);
  const orb = quickPos('qImport'); let done = 0;
  files.forEach((file, i) => {
    const place = f => {
      root.push(f); const spot = at ? { x: at.x + i * 24, y: at.y + i * 18 } : freeSpot(rootCtx, area());
      const { b } = makeItem(f, rootCtx, at ? spot.x : orb.x, at ? spot.y : orb.y, 'pop');
      setTimeout(() => settleNew(b), 60 + i * 40);
      if (++done === files.length) { toast(`Imported ${files.length} file${files.length > 1 ? 's' : ''}`); updateCount(); syncFilesBar(); if (fullKey === 'files') setTimeout(() => fullGrid(), 350); }
    };
    readFile(file, place);
  });
}
const MAX_IMPORT = 25 * 1024 * 1024;   // 25 MB per file: keeps the page responsive and memory bounded
function readFile(file, place) {
  if (file.size > MAX_IMPORT) { toast(`“${file.name.slice(0, 40)}” is over 25 MB, so it wasn’t imported`); return; }
  const ext = (file.name.split('.').pop() || '').toUpperCase().slice(0, 4);
  const rd = new FileReader();
  if (file.type.startsWith('image/')) { rd.onload = () => place(Object.assign(mk.image(file.name, rd.result), { file: humanSize(file.size) })); rd.readAsDataURL(file); }
  else if (file.type.startsWith('text/') || /\.(txt|md|csv|json)$/i.test(file.name)) { rd.onload = () => place(mk.text(file.name, String(rd.result).slice(0, 20000))); rd.readAsText(file); }
  else place(mk.doc(file.name.replace(/\.[^.]+$/, ''), ext || 'FILE', humanSize(file.size)));
}

/* ---------- toast ---------- */
const toastEl = $('#toast'); let toastAnim;
function toast(msg) {
  toastEl.textContent = msg; toastAnim && toastAnim.cancel();
  toastAnim = toastEl.animate([
    { opacity: 0, transform: 'translate(-50%, 16px) scale(.9)', filter: 'blur(6px)' },
    { opacity: 1, transform: 'translate(-50%, 0) scale(1)', filter: 'blur(0)', offset: .12 },
    { opacity: 1, transform: 'translate(-50%, 0) scale(1)', filter: 'blur(0)', offset: .85 },
    { opacity: 0, transform: 'translate(-50%, 8px) scale(.96)', filter: 'blur(4px)' }], { duration: 2800, easing: 'ease-out' });
}

/* ---------- theme ---------- */
function themeChanged() { colorCache = {}; redrawBase(); scheduleLive(); for (const f of walk(root)) if (f.kind === 'note') repaintThumbs(f); syncDock(true); syncThemeTg(); drawPreview(); }
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', themeChanged);
new MutationObserver(themeChanged).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

/* ---------- long-press menu ---------- */
const MI = {
  open: '<path d="M14 4h6v6"/><path d="M20 4l-8 8"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
  canvas: '<path d="M4 20l1.2-4.4L15.8 5a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.4 18.8z"/>',
  rename: '<path d="M4 7V5h16v2"/><path d="M12 5v14"/><path d="M9 19h6"/>',
  dup: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  move: '<path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h3.6l2 2H18a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 18 19H6a2.5 2.5 0 0 1-2.5-2.5z"/><path d="M10 13h5M13 10.5l2.5 2.5-2.5 2.5"/>',
  fav: '<path d="M12 3.8l2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z"/>',
  home: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.8"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.8"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.8"/><path d="M16.75 14v5.5M14 16.75h5.5"/>',
  share: '<path d="M12 15V4"/><path d="M8 8l4-4 4 4"/><path d="M6 12v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
  trash: '<path d="M5 7h14"/><path d="M9 7V5h6v2"/><path d="M7 7l1 12a2 2 0 0 0 2 1.8h4a2 2 0 0 0 2-1.8l1-12"/><path d="M10 11v6M14 11v6"/>',
  newnote: '<path d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z"/><path d="M12 10v6M9 13h6"/>',
  import: '<path d="M12 4v11"/><path d="M7.5 10.5L12 15l4.5-4.5"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
  sort: '<path d="M7 5v14M4 16l3 3 3-3"/><path d="M13 7h7M13 12h5M13 17h3"/>',
  ungroup: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/><path d="M14 7h3.5a2 2 0 0 1 2 2v2M10 17H6.5a2 2 0 0 1-2-2v-2" stroke-dasharray="2 2"/>',
  pin: '<path d="M9 4h6l-1 5 3 3H7l3-3z"/><path d="M12 12v8"/>',
  save: '<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4"/><rect x="8" y="13" width="8" height="5" rx="1"/>',
  smile: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 14a4 4 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01"/>',
  select: '<circle cx="12" cy="12" r="8.5"/><path d="M8 12.3l2.7 2.7L16 9.5"/>',
  back: '<path d="M15 6l-6 6 6 6"/>', chev: '<path d="M9 6l6 6-6 6"/>', check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
};
const ico = (k, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24">${MI[k]}</svg>`;
const KIND = { note: 'Handwritten note', folder: 'Folder', image: 'Image', text: 'Text file', doc: 'Document' };
let ctxState = null;
const ctxMenu = $('#ctxMenu'), ctxCatch = $('#ctxCatch');
ctxCatch.addEventListener('pointerdown', e => { e.preventDefault(); closeCtx(); });
function ctxItems(f, ctx) {
  const folder = f.kind === 'folder', note = f.kind === 'note';
  if (folder) return [
    [['open', 'Open', 'open'], ['rename', 'Rename', 'rename'], ['newnote', 'New note inside', 'newnote'], ['import', 'Import into folder', 'import']],
    [['sort', 'Sort items', 'sort', 'sub'], ['ungroup', 'Ungroup', 'ungroup'], ['move', 'Move to…', 'move', 'sub'], ['fav', f.fav ? 'Remove from Favourites' : 'Add to Favourites', 'fav']],
    [['home', 'Add to Home Screen', 'home'], ['share', 'Share folder…', 'share'], ['info', 'Get info', 'info', 'sub']],
    [['delete', `Delete folder${f.children.length ? ` and ${f.children.length} item${f.children.length > 1 ? 's' : ''}` : ''}`, 'trash', 'danger']],
  ];
  return [
    [...(note ? [['newnote', 'New note', 'newnote'], ['save', f.draft ? 'Save…' : 'Save a copy…', 'save', 'sub']] : []), ...(note && f === current && !W.canvas.min ? [] : [note ? ['canvas', 'Open', 'canvas'] : ['open', 'Open', 'open']]), ['rename', 'Rename', 'rename'], ['dup', 'Duplicate', 'dup']],
    [['move', 'Move to…', 'move', 'sub'], ['icon', 'Change icon', 'smile'], ['fav', f.fav ? 'Remove from Favourites' : 'Add to Favourites', 'fav']],
    [['home', 'Add to Home Screen', 'home'], ['share', `Share ${note ? 'note' : 'file'}…`, 'share'], ['info', 'Get info', 'info', 'sub']],
    [['delete', `Delete ${note ? 'note' : 'file'}`, 'trash', 'danger']],
  ];
}
function kindIcon(f) { return f.kind === 'folder' ? MI.move.split('<path d="M10')[0] : f.kind === 'note' ? MI.canvas : f.kind === 'image' ? '<rect x="4" y="5" width="16" height="14" rx="2.5"/><path d="M4 16l4.5-4.5 4 4 2.5-2.5 5 5"/>' : MI.newnote.split('<path d="M12')[0]; }
function menuHead(f) { return `<button class="mhead" data-act="head" title="Open" aria-label="Open ${esc(f.name)}"><span class="k"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${kindIcon(f)}</svg></span><div><b>${esc(f.name)}</b><small>${KIND[f.kind]}</small></div>${ico('chev', 'go')}</button>`; }
function renderMenu(groups, head) {
  ctxMenu.innerHTML = head + groups.map(g => g.map(([act, label, icon, flag]) =>
    `<button class="mi${flag === 'danger' ? ' danger' : ''}" role="menuitem" data-act="${act}">${ico(icon)}<span>${esc(label)}</span>${flag === 'sub' ? ico('chev', 'chev') : ''}</button>`).join('')).join('<div class="msep"></div>');
}
function openCtx(f, ctx, el) {
  closeCtx(true); clearHover(); closePop(); closeToolPop && closeToolPop();
  ctxState = { f, ctx, el };
  el.classList.add('ctx'); ctx.container.classList.add('ctx-mode'); if (ctx === rootCtx) bringToFront('files');
  renderMenu(ctxItems(f, ctx), menuHead(f));
  ctxCatch.hidden = false; ctxMenu.hidden = false; placeCtx();
  ctxMenu.animate([{ opacity: 0, transform: 'scale(.86)', filter: 'blur(8px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: SPR_OPEN.d, easing: SPR_OPEN.e });
}
function placeCtx() {
  const r = (ctxState.el.querySelector('.tile') || ctxState.el).getBoundingClientRect(), w = ctxMenu.offsetWidth, h = ctxMenu.offsetHeight;
  const right = r.right + 14 + w < vw() - 8, x = right ? r.right + 14 : Math.max(8, r.left - 14 - w), y = clamp(r.top - 4, 10, vh() - h - 10);
  ctxMenu.style.left = x + 'px'; ctxMenu.style.top = y + 'px'; ctxMenu.style.transformOrigin = `${right ? 0 : w}px ${clamp(r.top + r.height / 2 - y, 0, h)}px`;
}
function closeCtx(quick) {
  if (!ctxState) return; const { el, ctx } = ctxState; ctxState = null; ctxMenu.onclick = null;
  el.classList.remove('ctx'); ctx.container.classList.remove('ctx-mode'); ctxCatch.hidden = true;
  if (quick) { ctxMenu.hidden = true; return; }
  ctxMenu.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(.94)' }], { duration: 150 }).onfinish = () => { if (!ctxState) ctxMenu.hidden = true; };
}
// every page change in the menu slides and the menu resizes smoothly
function swapMenu(build, dir) {
  const r0 = ctxMenu.getBoundingClientRect();
  build(); placeCtx();
  const r1 = ctxMenu.getBoundingClientRect();
  if (reduceMotion) return;
  ctxMenu.style.overflow = 'hidden';
  ctxMenu.animate([{ height: r0.height + 'px', transform: `translate(${r0.left - r1.left}px,${r0.top - r1.top}px)` }, { height: r1.height + 'px', transform: 'none' }],
    { duration: 380, easing: 'cubic-bezier(.32,.72,0,1)' }).onfinish = () => { ctxMenu.style.overflow = ''; };
  [...ctxMenu.children].forEach((c, i) => c.animate([{ opacity: 0, transform: `translateX(${dir * 26}px)` }, { opacity: 1, transform: 'none' }],
    { duration: 340, delay: Math.min(i, 10) * 14, easing: 'cubic-bezier(.32,.72,0,1)', fill: 'backwards' }));
}
function backToMenu() { ctxMenu.onclick = null; swapMenu(() => renderMenu(ctxItems(ctxState.f, ctxState.ctx), menuHead(ctxState.f)), -1); }
function subMenu(title, rows, onPick) {
  swapMenu(() => {
    ctxMenu.innerHTML = `<button class="mi" data-act="back">${ico('back')}<span><b>${esc(title)}</b></span></button><div class="msep"></div>` +
      rows.map(([v, label, icon, on]) => `<button class="mi" data-v="${v}">${ico(icon)}<span>${esc(label)}</span>${on ? ico('check', 'chev') : ''}</button>`).join('');
  }, 1);
  ctxMenu.onclick = e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.act === 'back') return backToMenu(); onPick(b.dataset.v); };
}
function showSave(f, ctx) {
  const copy = !f.draft, here = ctx.parent || null, locs = [null, ...[...walk(root)].filter(x => x.kind === 'folder' && x !== f)];
  let dest = here;
  const name0 = copy ? f.name + ' copy' : f.name === 'Untitled' ? `Note · ${f.date}` : f.name;
  swapMenu(() => {
    ctxMenu.innerHTML = `<button class="mi" data-act="back">${ico('back')}<span><b>${copy ? 'Save a copy' : 'Save note'}</b></span></button><div class="msep"></div>
      <label class="sfield"><span>Name</span><input id="saveName" maxlength="40" value="${esc(name0)}"></label>
      <div class="slabel">Save in</div><div class="sloc">${locs.map(l => `<button class="mi" data-loc="${l ? l.id : 'root'}">${ico('move')}<span>${esc(l ? l.name : 'Files')}</span><i class="tick">${ico('check', 'chev')}</i></button>`).join('')}</div>
      <div class="sact"><button class="cta" id="saveGo">${copy ? 'Save copy' : 'Save'}</button></div>`;
  }, 1);
  const mark = () => ctxMenu.querySelectorAll('[data-loc]').forEach(b => b.classList.toggle('on', b.dataset.loc === (dest ? dest.id : 'root')));
  mark();
  const inp = $('#saveName'); inp.addEventListener('pointerdown', e => e.stopPropagation()); inp.addEventListener('keydown', e => { if (e.key === 'Enter') $('#saveGo').click(); });
  ctxMenu.onclick = e => {
    if (e.target.closest('[data-act="back"]')) return backToMenu();
    const l = e.target.closest('[data-loc]'); if (l) { dest = l.dataset.loc === 'root' ? null : locs.find(x => x && x.id === l.dataset.loc); return mark(); }
    if (!e.target.closest('#saveGo')) return;
    const name = inp.value.trim() || `Note · ${f.date}`, where = dest ? dest.name : 'Files';
    closeCtx();
    if (copy) {
      const c = cloneFile(f); c.name = name; c.draft = false; c.added = Date.now();
      if (dest) { dest.children.push(c); refreshFolder(dest); } else { root.push(c); const q = quickPos('qFiles'); settleNew(makeItem(c, rootCtx, q.x, q.y, 'pop').b); }
      afterTreeChange(); toast(`Saved a copy, “${name}”, in ${where}`);
    } else {
      f.draft = false; renameFile(f, name);
      if (dest !== here) moveTo(f, ctx, dest); else refreshTile(f);
      updateMeta(); syncNoteChip(); toast(`Saved “${name}” in ${where}. Changes save on their own from now on.`);
    }
  };
  setTimeout(() => { inp.focus(); inp.select(); }, 200);
}
ctxMenu.addEventListener('click', e => {
  if (ctxMenu.onclick || !ctxState) return;
  if (e.target.closest('.mhead')) { const { f, ctx, el } = ctxState; closeCtx(); return openItem(f, ctx, el); }
  const b = e.target.closest('.mi'); if (!b) return;
  const { f, ctx, el } = ctxState, act = b.dataset.act;
  if (act === 'delete') {
    if (!b.classList.contains('arm')) { b.classList.add('arm'); b.querySelector('span').textContent = 'Tap again to delete'; b.animate([{ transform: 'scale(1)' }, { transform: 'scale(.96)' }, { transform: 'scale(1)' }], { duration: 300, easing: 'cubic-bezier(.32,.72,0,1)' }); return; }
    closeCtx(); return deleteFile(f, ctx);
  }
  if (act === 'move') return subMenu('Move to', moveTargets(f, ctx).map(t => [t ? t.id : 'root', t ? t.name : 'Files (top level)', 'move']), v => { closeCtx(); moveTo(f, ctx, v === 'root' ? null : [...walk(root)].find(x => x.id === v)); });
  if (act === 'sort') return subMenu('Sort items', [['name', 'By name', 'sort', f.sortBy === 'name'], ['kind', 'By kind', 'sort', f.sortBy === 'kind']], v => { closeCtx(); sortFolder(f, v); });
  if (act === 'info') return showInfo(f, ctx);
  if (act === 'save') return showSave(f, ctx);
  if (act === 'icon') { closeCtx(); return openEmojiPop({ anchor: el.querySelector('.tile') || el, targets: [f] }); }
  closeCtx();
  if (act === 'open') return ctx.root ? openViewer(f, el.querySelector('.tile')) : pushView(f);
  if (act === 'canvas') { if (viewer.open) closeViewer(); return setTimeout(() => loadNote(f), viewer.open ? 140 : 0); }
  if (act === 'rename') return setTimeout(() => renameInline(f, el), 60);
  if (act === 'dup') return duplicate(f, ctx);
  if (act === 'fav') { f.fav = !f.fav; refreshTile(f); return toast(f.fav ? `Added “${f.name}” to Favourites` : `Removed from Favourites`); }
  if (act === 'newnote') return f.kind === 'folder' ? newNoteIn(f) : newNote();
  if (act === 'import') { importTarget = f; return fileInput.click(); }
  if (act === 'ungroup') return ungroup(f, ctx);
  if (act === 'home') return toast('Home Screen shortcuts are part of the iPad app. This demo can’t add one.');
  if (act === 'share') return toast('Sharing opens the iPad share sheet in the app. This demo can’t share yet.');
});
function showInfo(f, ctx) {
  const where = ctx.parent ? ctx.parent.name : 'Files';
  const rows = [['Kind', KIND[f.kind]], ['Where', where]];
  if (f.kind === 'note') rows.push(['Status', f.draft ? 'Draft, not saved' : 'Saved'], ['Date', f.date], ['Strokes', String(f.strokes.length)], ['Page', f.paper || 'dots'], ['Mood', f.mood != null ? MOODS[f.mood].n : '—']);
  if (f.kind === 'folder') { const all = [...walk(f.children)]; rows.push(['Items', String(f.children.length)], ['Inside, in total', String(all.length)]); }
  if (f.kind === 'doc' || (f.kind === 'image' && f.file)) rows.push(['Size', f.size || f.file]);
  if (f.kind === 'text') rows.push(['Words', String(f.body.split(/\s+/).filter(Boolean).length)]);
  rows.push(['Favourite', f.fav ? 'Yes' : 'No']);
  swapMenu(() => { ctxMenu.innerHTML = `<button class="mi" data-act="back">${ico('back')}<span><b>Info</b></span></button><div class="msep"></div><dl class="info">${rows.map(([a, b]) => `<dt>${a}</dt><dd>${esc(b)}</dd>`).join('')}</dl>`; }, 1);
  ctxMenu.onclick = e => { if (e.target.closest('[data-act="back"]')) backToMenu(); };
}
// out only on purpose: past the window's edge, or close to it while still moving outward
function wantsOut(e, b) {
  const r = panelEl.getBoundingClientRect(), m = 28;
  if (e.clientX < r.left - 6 || e.clientX > r.right + 6 || e.clientY < r.top - 6 || e.clientY > r.bottom + 6) return true;
  const sx = e.clientX < r.left + m ? -1 : e.clientX > r.right - m ? 1 : 0, sy = e.clientY < r.top + m ? -1 : e.clientY > r.bottom - m ? 1 : 0;
  return (sx && Math.sign(b.vx) === sx && Math.abs(b.vx) > 60) || (sy && Math.sign(b.vy) === sy && Math.abs(b.vy) > 60);
}
function outsidePanel(e) { const r = panelEl.getBoundingClientRect(); return e.clientX < r.left - 10 || e.clientX > r.right + 10 || e.clientY < r.top - 10 || e.clientY > r.bottom + 10; }
// the file leaves the folder under your finger: the folder closes and you keep dragging it on the desktop
function popOutOfFolder(f, ctx, e, oldEl) {
  const t = oldEl.querySelector('.tile').getBoundingClientRect(), offX = e.clientX - t.left + 8, offY = e.clientY - t.top;
  ctx.list.splice(ctx.list.indexOf(f), 1); ctx.views.delete(f.id); delete f._pos; oldEl.remove();
  root.push(f);
  const { b } = makeItem(f, rootCtx, e.clientX - offX, e.clientY - offY);
  liftItem(b.el); b.grab(); b.el.querySelector('.lift').style.transform = 'scale(1.09)';
  const pid = e.pointerId;
  const mv = ev => { if (ev.pointerId !== pid) return; b.dragTo(ev.clientX - offX, ev.clientY - offY, ev.timeStamp); hoverCheck(f, rootCtx); };
  const up = ev => {
    if (ev.pointerId !== pid) return;
    removeEventListener('pointermove', mv); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
    document.body.classList.remove('file-drag'); b.el.querySelector('.lift').style.transform = '';
    if (dropOn(f, rootCtx)) { b.el.classList.remove('dragging'); return; }
    const v = b.velocity(ev.timeStamp); b.release(v.x, v.y);
  };
  addEventListener('pointermove', mv); addEventListener('pointerup', up); addEventListener('pointercancel', up);
  const from = ctx.parent; afterTreeChange(); refreshFolder(from); closeViewer();
  toast(`Moved “${f.name}” out of ${from.name}`);
}
function ctxFor(f) {
  if (root.includes(f)) return rootCtx;
  const parent = [...walk(root)].find(x => x.kind === 'folder' && x.children.includes(f));
  return { parent, list: parent ? parent.children : root, views: new Map(), container: filesLayer };
}
function openItem(f, ctx, el) {      // tap a menu's header: open the file straight away, on top of everything
  if (f.kind === 'note') { const was = viewer.open; if (was) closeViewer(); return setTimeout(() => loadNote(f), was ? 140 : 0); }
  if (ctx.root || !viewer.open) return openViewer(f, (el.querySelector('.tile') || el));
  pushView(f);
}
function refreshTile(f) {
  document.querySelectorAll(`.item[data-id="${f.id}"]`).forEach(el => { el.querySelector('.tile').innerHTML = tileInner(f); el.querySelector('.label').innerHTML = labelHTML(f); });
  if (f.kind === 'note') repaintThumbs(f); setCurrentMarker();
}
function fadeOut(v) {
  if (!v) return; active.delete(v.b);
  v.el.animate([{ opacity: 1, transform: v.el.style.transform, filter: 'blur(0)' }, { opacity: 0, transform: v.el.style.transform + ' scale(.4)', filter: 'blur(8px)' }],
    { duration: 320, easing: 'cubic-bezier(.5,0,.3,1)', fill: 'forwards' }).onfinish = () => v.el.remove();
}
function deleteFile(f, ctx) {
  const v = ctx.views.get(f.id);
  ctx.list.splice(ctx.list.indexOf(f), 1); ctx.views.delete(f.id); fadeOut(v);
  const gone = new Set(walk([f]));
  if (gone.has(current)) {
    const next = [...walk(root)].find(x => x.kind === 'note');
    if (next) loadNote(next);
    else { const n = mk.note('Untitled'); root.unshift(n); const spot = freeSpot(rootCtx, area()); makeItem(n, rootCtx, spot.x, spot.y, 'pop'); loadNote(n); }
  }
  if (ctx.layout) setTimeout(() => ctx.layout(), 200);
  afterTreeChange(); toast(`Deleted “${f.name}”`);
}
function cloneFile(f) {
  const c = JSON.parse(JSON.stringify(f, (k, v) => (k === '_pos' || k === 'undo' || k === 'redo') ? undefined : v));
  const reid = x => { x.id = nid(); if (x.kind === 'note') { x.undo = []; x.redo = []; } if (x.children) x.children.forEach(reid); };
  reid(c); c.name = f.name.replace(/(\.[a-z0-9]+)?$/i, ' copy$1'); return c;
}
function duplicate(f, ctx) {
  const c = cloneFile(f), v = ctx.views.get(f.id);
  ctx.list.splice(ctx.list.indexOf(f) + 1, 0, c); c.added = Date.now();
  if (v) { const { b } = makeItem(c, ctx, v.b.x + 16, v.b.y + 16, 'pop'); if (ctx.grid) ctx.layout(); else b.settle(); }
  else if (ctx.parent) refreshFolder(ctx.parent);
  afterTreeChange(); toast(`Made “${c.name}”`);
}
function moveTargets(f, ctx) {
  const inside = new Set(walk([f])), out = [];
  if (ctx.parent) out.push(null);
  for (const x of walk(root)) if (x.kind === 'folder' && !inside.has(x) && x !== ctx.parent) out.push(x);
  return out;
}
function moveTo(f, ctx, dest) {
  ctx.list.splice(ctx.list.indexOf(f), 1); fadeOut(ctx.views.get(f.id)); ctx.views.delete(f.id); delete f._pos;
  if (dest) { dest.children.push(f); refreshFolder(dest); }
  else { root.push(f); const q = quickPos('qFiles'); settleNew(makeItem(f, rootCtx, q.x, q.y, 'pop').b); }
  if (ctx.layout) setTimeout(() => ctx.layout(), 200);
  afterTreeChange(); toast(`Moved “${f.name}” to ${dest ? dest.name : 'Files'}`);
}
function sortFolder(f, by) {
  f.sortBy = by; const order = { folder: 0, note: 1, image: 2, text: 3, doc: 4 };
  f.children.sort((a, b) => by === 'kind' ? (order[a.kind] - order[b.kind]) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name));
  refreshFolder(f); if (viewer.open && viewer.stack[viewer.stack.length - 1] === f) renderView(0);
  toast(`Sorted ${f.name} by ${by}`);
}
function ungroup(f, ctx) {
  const v = ctx.views.get(f.id), x = v ? v.b.x : 0, y = v ? v.b.y : 0, kids = f.children.slice();
  ctx.list.splice(ctx.list.indexOf(f), 1, ...kids); ctx.views.delete(f.id); fadeOut(v);
  kids.forEach((c, i) => {
    delete c._pos; const { b } = makeItem(c, ctx, x, y, 'pop');
    if (!ctx.grid) { const a = i / Math.max(1, kids.length) * Math.PI * 2; b.vx = Math.cos(a) * 320; b.vy = Math.sin(a) * 320; b.settle(); }
  });
  if (ctx.grid) ctx.layout();
  afterTreeChange(); toast(kids.length ? `Ungrouped ${kids.length} item${kids.length > 1 ? 's' : ''}` : 'Removed the empty folder');
}
function newNoteIn(folder) {
  const n = Object.assign(mk.note('Untitled', [], todayStr, current.mood, 'grid'), { draft: true });
  folder.children.unshift(n); refreshFolder(folder); afterTreeChange();
  if (viewer.open) closeViewer();
  setTimeout(() => loadNote(n), 150); toast(`New note in ${folder.name}`);
}
let importTarget = null;

document.addEventListener('pointerdown', e => {
  if (e.pointerType === 'mouse') return;
  const b = e.target.closest && e.target.closest('button, [role="button"], .cd, .hab, .chip');
  if (!b || b.matches('.minibtn, input')) return;
  try { b.setPointerCapture(e.pointerId); } catch (_) {}
}, true);
let palmUntil = 0;
document.addEventListener('pointerdown', e => {
  if (e.pointerType !== 'touch' || e.target.closest('#sheet')) return;
  if ((ink && ink.type === 'pen') || (e.timeStamp - lastPen < 300 && (e.width > 24 || e.height > 24))) { palmUntil = e.timeStamp + 500; e.stopPropagation(); e.preventDefault(); }
}, true);
document.addEventListener('click', e => { if (e.timeStamp < palmUntil) { e.stopPropagation(); e.preventDefault(); } }, true);
/* sliders: tap anywhere on the track to jump there, keep dragging to fine-tune (finger or Apple Pencil) */
document.addEventListener('pointerdown', e => {
  const r = e.target.closest && e.target.closest('input[type=range]'); if (!r) return;
  e.preventDefault(); try { r.setPointerCapture(e.pointerId); } catch (_) {}
  const set = ev => {
    const b = r.getBoundingClientRect(), t = clamp((ev.clientX - b.left - 11) / Math.max(1, b.width - 22), 0, 1), min = +r.min, max = +r.max, step = +r.step || 1;
    const v = +(Math.round((min + t * (max - min)) / step) * step).toFixed(3); if (+r.value !== v) { r.value = v; r.dispatchEvent(new Event('input', { bubbles: true })); }
  };
  set(e);
  const mv = ev => { if (ev.pointerId === e.pointerId) set(ev); };
  const up = ev => { if (ev.pointerId !== e.pointerId) return; r.removeEventListener('pointermove', mv); r.removeEventListener('pointerup', up); r.removeEventListener('pointercancel', up); };
  r.addEventListener('pointermove', mv); r.addEventListener('pointerup', up); r.addEventListener('pointercancel', up);
}, true);

/* ---------- selecting files: long-press the background ---------- */
const selSet = new Set(); let selecting = false;
const bgAnchor = document.createElement('div'); bgAnchor.id = 'bgAnchor'; document.body.append(bgAnchor);
function isBackground(t) { return t === document.body || t === document.documentElement || (t.closest && (t.closest('#field') || t.id === 'files')); }
document.addEventListener('pointerdown', e => {
  if (!isBackground(e.target) || ctxState || emojiOpen) return;
  const sx = e.clientX, sy = e.clientY;
  const t = setTimeout(() => openBgMenu(sx, sy), 550);
  const done = () => { clearTimeout(t); removeEventListener('pointermove', mv); removeEventListener('pointerup', done); removeEventListener('pointercancel', done); };
  const mv = ev => { if (Math.hypot(ev.clientX - sx, ev.clientY - sy) > 10) done(); };
  addEventListener('pointermove', mv); addEventListener('pointerup', done); addEventListener('pointercancel', done);
});
document.addEventListener('contextmenu', e => { if (isBackground(e.target)) { e.preventDefault(); openBgMenu(e.clientX, e.clientY); } });
function openBgMenu(x, y) {
  closeCtx(true); closePop(); closeToolPop();
  Object.assign(bgAnchor.style, { left: x + 'px', top: y + 'px' });
  ctxState = { f: null, ctx: rootCtx, el: bgAnchor, bg: true };
  const rows = [['select', 'Select files', 'select'], ['icons', 'Change file icons', 'smile'], ['newfolder', 'New folder', 'move'], ['tidy', 'Tidy up', 'sort']];
  ctxMenu.innerHTML = `<div class="mhead"><span class="k"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h3.6l2 2H18a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 18 19H6a2.5 2.5 0 0 1-2.5-2.5z"/></svg></span><div><b>Files</b><small>${root.length} on this screen</small></div></div>`
    + rows.slice(0, 2).map(([a, l, i]) => `<button class="mi" data-bg="${a}">${ico(i)}<span>${l}</span></button>`).join('') + '<div class="msep"></div>'
    + rows.slice(2).map(([a, l, i]) => `<button class="mi" data-bg="${a}">${ico(i)}<span>${l}</span></button>`).join('')
    + '<p class="tip" style="padding:6px 12px 8px">Select files to group them into a folder, delete them or give them an emoji icon.</p>';
  ctxMenu.onclick = e => {
    const b = e.target.closest('[data-bg]'); if (!b) return; const a = b.dataset.bg; closeCtx();
    if (a === 'select') startSelect();
    if (a === 'icons') { startSelect(); toast('Tap the files to change, then tap Change icon'); }
    if (a === 'newfolder') {
      const fo = mk.folder('New folder', []); root.push(fo);
      makeItem(fo, rootCtx, clamp(x - 40, 0, vw() - 80), clamp(y - 40, 0, vh() - 100), 'pop');
      if (fullKey === 'files') fullGrid(); if (railOn) enterRail(); afterTreeChange(); toast('New folder. Double-tap its name to rename it.');
    }
    if (a === 'tidy') { if (fullKey === 'files') return fullGrid(true); fileTargets().forEach((t, i) => setTimeout(() => t.b.springTo(t.x, t.y, null, 200, 24), i * 18)); }
  };
  ctxCatch.hidden = false; ctxMenu.hidden = false; placeCtx();
  ctxMenu.animate([{ opacity: 0, transform: 'scale(.86)' }, { opacity: 1, transform: 'none' }], { duration: SPR_OPEN.d, easing: SPR_OPEN.e });
}
// tapping anywhere that isn't a file (or the bar for the selection) finishes selecting; the same for a lasso selection
document.addEventListener('pointerdown', e => {
  const t = e.target;
  if (selecting && !t.closest('#files .item, #railList .item, #selBar, #emojiPop, #ctxMenu, #ctxCatch')) endSelect();
  if (sel && !t.closest('#sheet, #dock, #toolPop')) clearSel();
}, true);
function startSelect() {
  closeViewer(); selecting = true; selSet.clear(); document.body.classList.add('selecting'); syncSelBar(); toast('Tap files to pick them. Tap empty space when you’re finished.');
  const sb = $('#selBar'); sb.hidden = false; sb.animate([{ opacity: 0, transform: 'translate(-50%, 16px)' }, { opacity: 1, transform: 'translate(-50%, 0)' }], { duration: SPR_OPEN.d, easing: SPR_OPEN.e });
}
function endSelect() {
  if (!selecting) return; selecting = false; selSet.clear(); document.body.classList.remove('selecting');
  document.querySelectorAll('.item.picked').forEach(x => x.classList.remove('picked'));
  const sb = $('#selBar'); sb.animate([{ opacity: 1 }, { opacity: 0, transform: 'translate(-50%, 12px)' }], { duration: 200 }).onfinish = () => { if (!selecting) sb.hidden = true; };
}
function togglePick(f, el) {
  selSet.has(f) ? selSet.delete(f) : selSet.add(f); el.classList.toggle('picked', selSet.has(f));
  el.querySelector('.tile').animate([{ transform: 'scale(.9)' }, { transform: 'scale(1.04)' }, { transform: 'none' }], { duration: 300, easing: 'cubic-bezier(.32,.72,0,1)' }); syncSelBar();
}
function syncSelBar() {
  const n = selSet.size; $('#selCount').textContent = n ? `${n} selected` : 'Select files';
  $('#sbGroup').disabled = n < 2; $('#sbIcon').disabled = !n; $('#sbDel').disabled = !n;
  const d = $('#sbDel'); d.classList.remove('arm'); d.querySelector('span').textContent = 'Delete';
}
$('#sbIcon').addEventListener('click', () => openEmojiPop({ anchor: $('#sbIcon'), targets: root.filter(f => selSet.has(f)) }));
$('#sbDel').addEventListener('click', () => {
  const d = $('#sbDel'), list = root.filter(f => selSet.has(f));
  if (!d.classList.contains('arm')) { d.classList.add('arm'); d.querySelector('span').textContent = `Delete ${list.length}?`; return; }
  list.forEach(f => deleteFile(f, rootCtx)); endSelect(); toast(`Deleted ${list.length} file${list.length > 1 ? 's' : ''}`);
});
$('#sbGroup').addEventListener('click', () => {
  const list = root.filter(f => selSet.has(f)); if (list.length < 2) return;
  const v0 = rootCtx.views.get(list[0].id), x = v0.b.x, y = v0.b.y;
  const same = list.every(f => f.kind === list[0].kind), folder = mk.folder(same ? suggestName(list[0], list[1]) : 'New folder', list.slice());
  root.splice(root.indexOf(list[0]), 0, folder);
  list.forEach(f => { root.splice(root.indexOf(f), 1); const v = rootCtx.views.get(f.id); if (v) { flyInto(v, x, y); rootCtx.views.delete(f.id); } delete f._pos; });
  setTimeout(() => { makeItem(folder, rootCtx, x, y, 'pop'); if (fullKey === 'files') fullGrid(); if (railOn) enterRail(); }, 240);
  endSelect(); afterTreeChange(); toast(`Grouped ${list.length} files into “${folder.name}”. Double-tap the name to rename it.`);
});
addEventListener('keydown', e => { if (e.key === 'Escape' && selecting && !emojiOpen && !ctxState) endSelect(); });

/* ---------- the left column of files (while a window sits at 75%) ---------- */
let railOn = false, railHeld = false, canvas75 = false;
function syncRail() { const want = !fullKey && ((viewer.open && viewer.mode === 'win75') || canvas75); want ? enterRail() : exitRail(); }
function railOrder() {
  const rank = f => f.kind === 'folder' ? 0 : f.kind === 'note' && (f.draft || f.name === 'Untitled') ? 1 : 2;
  return root.map((f, i) => [rank(f), i, f]).sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(x => x[2]);
}
function enterRail() {
  const list = $('#railList'), rail = $('#rail'), views = railOrder().map(f => rootCtx.views.get(f.id)).filter(Boolean);
  if (railOn) { views.forEach(v => { v.el.classList.add('inrail'); active.delete(v.b); list.append(v.el); }); return; }
  railOn = true; rail.hidden = false; saved.free = new Map(views.map(v => [v.f.id, { x: v.b.x, y: v.b.y }]));
  const first = views.map(v => v.el.getBoundingClientRect());
  views.forEach(v => { active.delete(v.b); v.el.classList.add('inrail'); list.append(v.el); });
  if (viewer.origin) viewer.origin.style.visibility = '';
  rail.animate([{ opacity: 0, transform: 'translateX(-24px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.32,.72,0,1)' });
  views.forEach((v, i) => { const r = v.el.getBoundingClientRect(), a = first[i];
    v.el.animate([{ translate: `${a.left - r.left}px ${a.top - r.top}px` }, { translate: '0px 0px' }], { duration: SPR_OPEN.d + i * 18, easing: SPR_OPEN.e }); });
}
function exitRail() {
  if (!railOn) return; railOn = false;
  const rail = $('#rail'), views = root.map(f => rootCtx.views.get(f.id)).filter(Boolean);
  const first = views.map(v => v.el.getBoundingClientRect());
  views.forEach((v, i) => { v.el.classList.remove('inrail'); filesLayer.append(v.el); v.b.place(first[i].left, first[i].top); });
  rail.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateX(-24px) scale(.96)' }], { duration: 300, easing: 'cubic-bezier(.32,.72,0,1)' }).onfinish = () => { if (!railOn) rail.hidden = true; };
  if (viewer.open && viewer.origin) viewer.origin.style.visibility = 'hidden';
  views.forEach((v, i) => { const q = saved.free && saved.free.get(v.f.id); if (q) setTimeout(() => v.b.springTo(q.x, q.y, null, 190, 26), i * 14); else settleNew(v.b); });
}

/* the window or file you touch rises above everything else; the rest drop back a layer */
const layerOrder = ['sheet', 'filesHdr', 'topbar', 'panelPos'];
let liftedItem = null;
function liftItem(el) { if (liftedItem && liftedItem !== el) liftedItem.style.zIndex = ''; liftedItem = el; el.style.zIndex = '47'; }
function dropItem() { if (liftedItem) { liftedItem.style.zIndex = ''; liftedItem = null; } }
function bringToFront(id) {
  if (!layerOrder.includes(id)) return;
  dropItem();
  if (layerOrder[layerOrder.length - 1] === id) return;
  layerOrder.splice(layerOrder.indexOf(id), 1); layerOrder.push(id);
  layerOrder.forEach((k, j) => { $('#' + k).style.zIndex = 20 + j * 3; $('#' + k).classList.toggle('front', j === layerOrder.length - 1); });
}
layerOrder.forEach(k => $('#' + k).addEventListener('pointerdown', () => bringToFront(k), true));
layerOrder.forEach((k, j) => { $('#' + k).style.zIndex = 20 + j * 3; });
document.addEventListener('touchmove', e => { if (!e.target.closest('pre, .view.scroll, .escroll, #ctxMenu, .dayview, #rail')) e.preventDefault(); }, { passive: false });
['gesturestart', 'gesturechange'].forEach(t => document.addEventListener(t, e => e.preventDefault()));
document.addEventListener('contextmenu', e => { if (!e.target.closest('input, pre')) e.preventDefault(); });

/* ---------- boot ---------- */
function boot() {
  home = computeHome();
  sheet = new Body(sheetEl, { x: home.x, y: home.y + 40, s: home.s * .96, tiltK: 0, bounds: sheetBounds });
  sheet.onScaleSettled = () => sizeCanvases();
  sizeCanvases(true);
  draggable(sheet, $('#grip'), { tap: () => { if (fullKey === 'canvas') return; canvas75 = false; syncRail(); sheet.springTo(home.x, home.y, home.s, 180, 22); } });

  const topBody = new Body($('#topbar'), { tiltK: 0, raise: false, bounds: () => { const r = $('#topWin'); return { minX: 6, maxX: vw() - r.offsetWidth - 6, minY: 6, maxY: vh() - r.offsetHeight - 6 }; } });
  draggable(topBody, $('#topDrag'), { accept: () => fullKey !== 'today' }); draggable(topBody, $('#topDrag2'), { accept: () => fullKey !== 'today', tap: () => enterFull('today') });

  const dockWin = $('#dock .win');
  const dk = new Body(dock, { tiltK: 0, raise: false, bounds: () => ({ minX: 6, maxX: vw() - dockWin.offsetWidth - 6, minY: 6, maxY: vh() - dockWin.offsetHeight - 6 }) });
  draggable(dk, $('#dgrip'));
  draggable(dk, $('#miniBtn'), { tap: () => setDockMini(false) });

  const hdr = new Body($('#filesHdr'), { tiltK: 0, raise: false, bounds: () => ({ minX: 4, maxX: vw() - 120, minY: 60, maxY: vh() - 60 }) });
  draggable(hdr, $('#filesWin'), { tap: () => { if (filesState.piled) toggleFilesPile(); } });

  groups.add({ skip: () => filesState.piled || filesLayer.hidden || railOn || fullKey === 'files', bodies: allFileBodies,
    obstacles: () => { const o = [];
      if (!W.files.min && !W.files.outer.hidden) o.push({ x: W.files.body.x, y: W.files.body.y, w: $('#filesWin').offsetWidth, h: $('#filesWin').offsetHeight + 6 });
      for (const [win, host] of [['#dock .win', 'dock'], ['#topWin', 'topbar']]) {      // the toolbar and the top bar are solid too
        const hostEl = $('#' + host); if (hostEl.hidden || getComputedStyle(hostEl).opacity < .5) continue;
        const r = $(win).getBoundingClientRect(); if (r.width) o.push({ x: r.left - 6, y: r.top - 6, w: r.width + 12, h: r.height + 12 });
      }
      return o; } });
  W = {
    today: { outer: $('#topbar'), inner: $('#topWin'), body: topBody },
    canvas: { outer: sheetEl, inner: sheetWin, body: sheet },
    tools: { outer: dock, inner: dockWin, body: dk },
    files: { outer: $('#filesHdr'), inner: $('#filesWin'), body: hdr },
  };
  centerTop(false);
  $('#topbar').animate([{ opacity: 0, transform: `translate3d(${topBody.x}px,-30px,0)` }, { opacity: 1, transform: `translate3d(${topBody.x}px,${topBody.y}px,0)` }], { duration: SPR_SOFT.d, easing: SPR_SOFT.e });

  const placeDock = spring => {
    const dw = dockWin.offsetWidth, cx = home.x + PW * home.s / 2;
    const x = clamp(cx - dw / 2, 8, vw() - dw - 8), y = Math.min(home.y + PH * home.s + 16, vh() - 66);
    spring ? dk.springTo(x, y, null, 160, 20) : (dk.place(x, y + 30), dk.springTo(x, y, null, 120, 16));
  };
  placeDock(false);
  syncDock(true);

  const a = area(), hh = filesHdrHome();
  hdr.place(hh.x + 40, hh.y); hdr.springTo(hh.x, hh.y, null, 140, 18);
  $('#qNew').addEventListener('click', newNote);
  $('#qImport').addEventListener('click', () => fileInput.click());
  $('#qFiles').addEventListener('click', () => fullKey === 'files' ? exitFull() : enterFull('files'));
  const r = rng(4);
  root.forEach(f => makeItem(f, rootCtx, a.x + a.w + 40, a.y + r() * a.h));
  fileTargets().forEach((t, i) => {
    if (reduceMotion) return t.b.place(t.x, t.y);
    setTimeout(() => t.b.springTo(t.x, t.y, null, 120 + i * 4, 15), 120 + i * 55);
  });
  sheet.springTo(home.x, home.y, home.s, 140, 18);
  renderQuick(); syncMoodBtn(); applyPalette(MOODS[1].c); setCurrentMarker(); noteChanged(); updateCount(); renderToday(); syncLights(); centerTop(false);
  paper.animate([{ opacity: 0, filter: 'blur(14px)' }, { opacity: 1, filter: 'blur(0)' }], { duration: 700, easing: 'ease-out' });

  let rt = 0;
  addEventListener('resize', () => {
    clearTimeout(rt); rt = setTimeout(() => {
      if (fullKey) exitFull();
      const prev = home; home = computeHome();
      if (Math.abs(sheet.x - prev.x) < 2 && Math.abs(sheet.y - prev.y) < 2) sheet.springTo(home.x, home.y, home.s); else sheet.settle();
      placeDock(true); centerTop(true);
      const h2 = filesHdrHome(); hdr.springTo(h2.x, h2.y);
      if (!filesState.piled) fileTargets().forEach(t => t.b.springTo(t.x, t.y, null, 150, 18));
      const mp = moodsEl.querySelector('.mood[aria-pressed="true"]'); if (mp && !moodsEl.hidden) slidePill(moodPill, mp, true);
      syncDock(true); setTimeout(() => sizeCanvases(), 500);
    }, 120);
  });
}
if (document.fonts && document.fonts.ready) document.fonts.ready.then(boot); else boot();
})();
