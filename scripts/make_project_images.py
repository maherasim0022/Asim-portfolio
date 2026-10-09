"""Builds showcase images for each project from the big Figma exports.
Usage: compose.py <src_dir> <out_dir> [slug ...]"""
import sys, os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

Image.MAX_IMAGE_PIXELS = None
SRC, OUT = sys.argv[1], sys.argv[2]
ONLY = set(sys.argv[3:])
os.makedirs(OUT, exist_ok=True)

W, H = 2000, 1250
INSET = 2

def hex2rgb(h):
    h = h.lstrip('#'); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

# ---------------------------------------------------------------- background
def background(base, glow1, glow2):
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    b = np.array(hex2rgb(base), np.float32)
    img = np.zeros((H, W, 3), np.float32) + b
    # soft vertical lift
    img += (yy / H)[..., None] * 10
    for (cx, cy, r, col, a) in [(0.18, 0.12, 0.75, glow1, 0.55), (0.92, 0.95, 0.7, glow2, 0.45)]:
        d = np.sqrt(((xx - cx * W) / W) ** 2 + ((yy - cy * H) / W) ** 2)
        m = np.clip(1 - d / r, 0, 1) ** 2.2 * a
        img = img * (1 - m[..., None]) + np.array(hex2rgb(col), np.float32) * m[..., None]
    # dot grid
    grid = ((xx % 40 < 2) & (yy % 40 < 2)).astype(np.float32) * 10
    img += grid[..., None]
    # grain
    rng = np.random.default_rng(7)
    img += rng.normal(0, 3.2, (H, W, 1))
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8), 'RGB').convert('RGBA')

# ---------------------------------------------------------------- helpers
_cache = {}
def load(name):
    if name not in _cache:
        _cache.clear()
        _cache[name] = Image.open(os.path.join(SRC, name)).convert('RGB')
    return _cache[name]

REFINE = True

def crop(name, box):
    """Crop a frame; trims rows/cols that are mostly canvas background (detected boxes are approximate)."""
    im = load(name)
    x0, y0, x1, y1 = box
    if not REFINE:
        return im.crop((x0, y0, x1, y1))
    pad = 12
    X0, Y0 = max(0, x0 - pad), max(0, y0 - pad)
    X1, Y1 = min(im.width, x1 + pad), min(im.height, y1 + pad)
    a = np.asarray(im.crop((X0, Y0, X1, Y1))).astype(int)
    bg = np.array(im.getpixel((2, 2)))
    fg = np.abs(a - bg).max(axis=2) > 10
    rows = np.where(fg.mean(axis=1) > 0.6)[0]
    cols = np.where(fg.mean(axis=0) > 0.6)[0]
    # an edge that falls inside the frame (sub-crop) keeps the requested coordinate
    top = y0 if rows[0] == 0 else Y0 + rows[0]
    bot = y1 if rows[-1] + 1 == fg.shape[0] else Y0 + rows[-1] + 1
    l = x0 if cols[0] == 0 else X0 + cols[0]
    r = x1 if cols[-1] + 1 == fg.shape[1] else X0 + cols[-1] + 1
    I = INSET
    return im.crop((l + I, top + I, r - I, bot - I))

def rounded_mask(size, r):
    m = Image.new('L', size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], r, fill=255)
    return m

def fit_w(img, w):
    h = round(img.height * w / img.width)
    return img.resize((w, h), Image.LANCZOS)

def paste_shadow(canvas, el, pos, blur=38, dy=34, alpha=150):
    a = el.split()[-1]
    pad = blur * 3
    sh = Image.new('L', (el.width + pad * 2, el.height + pad * 2), 0)
    sh.paste(a.point(lambda v: alpha if v > 0 else 0), (pad, pad))
    sh = sh.filter(ImageFilter.GaussianBlur(blur))
    black = Image.new('RGBA', sh.size, (0, 0, 0, 255))
    black.putalpha(sh)
    canvas.alpha_composite(black, (int(pos[0] - pad), int(pos[1] - pad + dy)))
    canvas.alpha_composite(el, (int(pos[0]), int(pos[1])))

# ---------------------------------------------------------------- devices
def browser(shot, width, dark=True):
    shot = fit_w(shot, width)
    bar = max(26, round(width * 0.03))
    r = round(width * 0.014)
    w, h = width, shot.height + bar
    el = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    body = Image.new('RGBA', (w, h), (28, 28, 32, 255) if dark else (236, 238, 242, 255))
    body.alpha_composite(shot.convert('RGBA'), (0, bar))
    d = ImageDraw.Draw(body)
    cy = bar // 2
    dr = max(4, bar // 6)
    for i, col in enumerate([(255, 95, 87), (254, 188, 46), (40, 200, 64)]):
        cx = bar * 0.6 + i * dr * 3.2
        d.ellipse([cx - dr, cy - dr, cx + dr, cy + dr], fill=col)
    pw = w * 0.34
    d.rounded_rectangle([w / 2 - pw / 2, cy - bar * 0.26, w / 2 + pw / 2, cy + bar * 0.26], bar * 0.26,
                        fill=(44, 44, 50) if dark else (255, 255, 255))
    el.paste(body, (0, 0), rounded_mask((w, h), r))
    d2 = ImageDraw.Draw(el)
    d2.rounded_rectangle([0, 0, w - 1, h - 1], r, outline=(255, 255, 255, 34), width=2)
    return el

def phone(shot, screen_w, aspect):
    shot = fit_w(shot, screen_w)
    sh_h = round(screen_w * aspect)
    if shot.height < sh_h:  # pad with last row colour
        pad = Image.new('RGB', (screen_w, sh_h), shot.getpixel((screen_w // 2, shot.height - 1)))
        pad.paste(shot, (0, 0)); shot = pad
    shot = shot.crop((0, 0, screen_w, sh_h))
    bz = round(screen_w * 0.045)
    w, h = screen_w + bz * 2, sh_h + bz * 2
    R = round(w * 0.15)
    el = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    frame = Image.new('RGBA', (w, h), (14, 14, 16, 255))
    el.paste(frame, (0, 0), rounded_mask((w, h), R))
    scr = shot.convert('RGBA')
    el.paste(scr, (bz, bz), rounded_mask(scr.size, R - bz))
    d = ImageDraw.Draw(el)
    d.rounded_rectangle([0, 0, w - 1, h - 1], R, outline=(90, 90, 98, 255), width=3)
    d.rounded_rectangle([3, 3, w - 4, h - 4], R - 3, outline=(30, 30, 34, 255), width=2)
    return el

def card(shot, max_w, max_h, r=22):
    s = min(max_w / shot.width, max_h / shot.height)
    shot = shot.resize((round(shot.width * s), round(shot.height * s)), Image.LANCZOS).convert('RGBA')
    el = Image.new('RGBA', shot.size, (0, 0, 0, 0))
    el.paste(shot, (0, 0), rounded_mask(shot.size, r))
    ImageDraw.Draw(el).rounded_rectangle([0, 0, el.width - 1, el.height - 1], r, outline=(255, 255, 255, 40), width=2)
    return el

# ---------------------------------------------------------------- layouts
def L_cover(cv, name, spec):
    desk = crop(name, spec['desktop'])
    b = browser(desk, 1330)
    if 'phone' in spec:
        p = phone(crop(name, spec['phone']), 400, 2.12)
        total = 1330 + p.width - 150
        x0 = (W - total) // 2
        by = (H - b.height) // 2 - 40
        paste_shadow(cv, b, (x0, by))
        paste_shadow(cv, p, (x0 + 1330 - 150, (H - p.height) // 2 + 40), blur=30, dy=30, alpha=190)
    else:
        b = browser(desk, 1700)
        paste_shadow(cv, b, ((W - b.width) // 2, (H - b.height) // 2))

def L_browser(cv, name, spec):
    shot = crop(name, spec['box'])
    w = 1640
    b = browser(shot, w)
    if b.height > H - 140:
        w = int(w * (H - 140) / b.height); b = browser(shot, w)
    paste_shadow(cv, b, ((W - b.width) // 2, (H - b.height) // 2))

def L_browsers2(cv, name, spec):
    a = browser(crop(name, spec['a']), 1240)
    b = browser(crop(name, spec['b']), 1240)
    paste_shadow(cv, a, (150, 95))
    paste_shadow(cv, b, (W - 150 - 1240, H - 95 - b.height))

def L_cascade3(cv, name, spec):
    els = [browser(crop(name, bx), 900, dark=False) for bx in spec['boxes']]
    xs = [120, 550, 980]
    ys = [90, 340, 590]
    for e, x, y in zip(els, xs, ys):
        if y + e.height > H - 40:
            e = e.crop((0, 0, e.width, H - 40 - y))
        paste_shadow(cv, e, (x, y), blur=30, dy=26, alpha=140)

def L_phones(cv, name, spec):
    shots = [crop(name, bx) for bx in spec['boxes']]
    aspect = min(2.12, min(s.height / s.width for s in shots))
    widths = [372, 420, 372]
    ph = [phone(s, w, aspect) for s, w in zip(shots, widths)]
    gap = 70
    total = sum(p.width for p in ph) + gap * 2
    x = (W - total) // 2
    for i, p in enumerate(ph):
        y = (H - p.height) // 2 + (0 if i == 1 else 50)
        if i == 1:
            continue
        paste_shadow(cv, p, (x if i == 0 else x + ph[0].width + ph[1].width + gap * 2, y), blur=30, dy=30, alpha=170)
    paste_shadow(cv, ph[1], (x + ph[0].width + gap, (H - ph[1].height) // 2 - 10), blur=32, dy=34, alpha=190)

def L_phones5(cv, name, spec):
    shots = [crop(name, bx) for bx in spec['boxes']]
    aspect = min(2.12, min(s.height / s.width for s in shots))
    widths = [292, 336, 384, 336, 292]
    offs = [-640, -350, 0, 350, 640]
    drops = [110, 55, -10, 55, 110]
    ph = [phone(s, w, aspect) for s, w in zip(shots, widths)]
    for i in [0, 4, 1, 3, 2]:  # back to front
        p = ph[i]
        x = W // 2 + offs[i] - p.width // 2
        y = (H - p.height) // 2 + drops[i]
        paste_shadow(cv, p, (x, y), blur=30, dy=30, alpha=200 if i == 2 else 170)

def L_flat(cv, name, spec):
    c = card(crop(name, spec['box']), 1760, 1080)
    paste_shadow(cv, c, ((W - c.width) // 2, (H - c.height) // 2))

LAYOUTS = dict(phones5=L_phones5, cover=L_cover, browser=L_browser, browsers2=L_browsers2, cascade3=L_cascade3, phones=L_phones, flat=L_flat)

# ---------------------------------------------------------------- projects
P = {
 'velari-forge': dict(file='VELARI FORGE.png', bg=('#0d0a08', '#7a3a00', '#e07000'), shots=[
    dict(t='cover', desktop=[3690, 7711, 5138, 8618], phone=[2312, 963, 2720, 1830]),
    dict(t='browsers2', a=[5314, 7725, 6762, 8632], b=[7044, 11487, 8492, 12392]),
    dict(t='phones', boxes=[[4379, 963, 4773, 1820], [5455, 977, 5848, 1830], [2812, 970, 3212, 1835]]),
    dict(t='browsers2', a=[14622, 1230, 15648, 1871], b=[10123, 1230, 11149, 1873]),
 ]),
 'le-jeu-de-la-voix': dict(file='le jeu de la voix.png', bg=('#100b22', '#4c3aa8', '#f2994a'), shots=[
    dict(t='phones5', boxes=[[273, 605, 667, 1453], [1912, 605, 2307, 1453], [1094, 605, 1486, 1453], [3963, 605, 4353, 1453], [3143, 605, 3537, 1453]]),
    dict(t='phones', boxes=[[1503, 605, 1895, 1453], [1094, 1468, 1486, 2309], [2322, 605, 2716, 1453]]),
    dict(t='phones', boxes=[[2733, 605, 3125, 1453], [3552, 605, 3946, 1453], [4370, 605, 4762, 1453]]),
    dict(t='phones', boxes=[[4779, 605, 5171, 1453], [5189, 605, 5583, 1453], [5598, 605, 5992, 1453]]),
 ]),
 'tara': dict(file='tera.png', bg=('#0a1226', '#1d4ed8', '#38bdf8'), shots=[
    dict(t='browser', box=[526, 7319, 1977, 8234]),
    dict(t='browsers2', a=[1950, 1367, 3428, 2290], b=[6829, 1358, 8317, 2218]),
    dict(t='browsers2', a=[10083, 1358, 11571, 2218], b=[13345, 1358, 14833, 2218]),
    dict(t='cascade3', boxes=[[9399, 7116, 10785, 7948], [10924, 7116, 12310, 7982], [14112, 7181, 15498, 8047]]),
 ]),
 'khirki': dict(file='khirki app.png', bg=('#121722', '#475569', '#c8a97e'), shots=[
    dict(t='cover', desktop=[1804, 576, 3249, 1479], phone=[44, 600, 424, 1423]),
    dict(t='phones', boxes=[[600, 600, 980, 1423], [1180, 620, 1560, 1443], [1180, 1400, 1560, 2176]]),
    dict(t='phones', boxes=[[1380, 5193, 1760, 5985], [2296, 5265, 2676, 6088], [1820, 5193, 2200, 6016]]),
    dict(t='flat', box=[180, 7206, 3593, 9318]),
 ]),
 'timeless-jump': dict(file='timeless jump (1).png', bg=('#0a0a08', '#5c5200', '#ffe100'), shots=[
    dict(t='cover', desktop=[924, 468, 2374, 1374], phone=[206, 468, 643, 1415]),
    dict(t='browser', box=[924, 1990, 2374, 2896]),
    dict(t='browsers2', a=[924, 3640, 2374, 4546], b=[924, 9380, 2374, 10286]),
    dict(t='phones', boxes=[[206, 3330, 643, 4277], [206, 6600, 643, 7547], [206, 12500, 643, 13447]]),
 ]),
 'visago': dict(file='visa app.png', bg=('#08130f', '#1f4d3f', '#6fbf9b'), shots=[
    dict(t='cover', desktop=[3599, 628, 5052, 1536], phone=[5643, 740, 6027, 1572]),
    dict(t='browser', box=[3599, 1360, 5052, 2320]),
    dict(t='browsers2', a=[253, 628, 1706, 1536], b=[3599, 2950, 5052, 3858]),
    dict(t='phones', boxes=[[6515, 7740, 6918, 8613], [6515, 10130, 6918, 11003], [6515, 3200, 6918, 4073]]),
 ]),
 'banking-app': dict(file='BANKING APP.png', refine=False, bg=('#0b0712', '#6d28d9', '#ec4899'), shots=[
    dict(t='cover', desktop=[0, 0, 1440, 900]),
    dict(t='browser', box=[0, 1950, 1440, 2850]),
    dict(t='browsers2', a=[0, 1050, 1440, 1950], b=[0, 4420, 1440, 5320]),
    dict(t='browser', box=[0, 6990, 1440, 7817]),
 ]),
 'mobile-template': dict(file='mobile template.png', refine=False, bg=('#071433', '#1e56c8', '#60a5fa'), shots=[
    dict(t='cover', desktop=[0, 0, 1440, 900]),
    dict(t='browser', box=[0, 1960, 1440, 2860]),
    dict(t='browser', box=[0, 2890, 1440, 3790]),
    dict(t='browsers2', a=[0, 5080, 1440, 5980], b=[0, 5980, 1440, 6760]),
 ]),
}

for slug, proj in P.items():
    if ONLY and slug not in ONLY:
        continue
    REFINE = proj.get('refine', True)
    bgimg = background(*proj['bg'])
    for i, spec in enumerate(proj['shots'], 1):
        cv = bgimg.copy()
        LAYOUTS[spec['t']](cv, proj['file'], spec)
        rgb = cv.convert('RGB')
        rgb.save(os.path.join(OUT, f'{slug}-{i}.webp'), 'WEBP', quality=84, method=6)
        rgb.resize((1200, 750), Image.LANCZOS).save(os.path.join(OUT, f'{slug}-{i}-md.webp'), 'WEBP', quality=82, method=6)
        print('ok', slug, i)
