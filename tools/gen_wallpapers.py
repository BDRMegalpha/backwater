"""
Generate four 1920x1080 wallpapers for the Backwater downloads section.
Pure Pillow — no external assets.

Outputs to public/wallpaper_*.png.

Usage:
    python tools/gen_wallpapers.py
"""
from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

P = {
    "bg":      (10, 11, 14),
    "fg":      (200, 196, 184),
    "dim":     (110, 106, 93),
    "rust":    (138, 58, 31),
    "bone":    (216, 207, 184),
    "bruise":  (58, 33, 72),
    "sick":    (111, 138, 58),
    "dark":    (26, 28, 32),
}

OUT = Path(__file__).resolve().parent.parent / "public"
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1920, 1080


def font(size: int) -> ImageFont.ImageFont:
    # Try a couple of common system fonts; fall back to default.
    for name in ("courbd.ttf", "cour.ttf", "consola.ttf", "DejaVuSansMono.ttf"):
        try:
            return ImageFont.truetype(name, size=size)
        except (OSError, IOError):
            continue
    return ImageFont.load_default()


def add_scanlines(img: Image.Image, opacity: int = 30) -> Image.Image:
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for y in range(0, img.size[1], 3):
        d.line([(0, y), (img.size[0], y)], fill=(0, 0, 0, opacity))
    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")


def add_vignette(img: Image.Image, strength: int = 110) -> Image.Image:
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    cx, cy = img.size[0] / 2, img.size[1] / 2
    max_d = math.hypot(cx, cy)
    # cheap radial: draw many circles inside out
    for r in range(int(max_d), int(max_d * 0.55), -8):
        a = int(strength * (1 - (r / max_d)))
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(0, 0, 0, a))
    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")


def text(draw: ImageDraw.ImageDraw, xy, s, fill, size: int = 28) -> None:
    draw.text(xy, s, fill=fill, font=font(size))


def wallpaper_terminal() -> Image.Image:
    img = Image.new("RGB", (W, H), P["bg"])
    d = ImageDraw.Draw(img)
    # dim grid
    for x in range(0, W, 48):
        d.line([(x, 0), (x, H)], fill=(20, 22, 26))
    for y in range(0, H, 48):
        d.line([(0, y), (W, y)], fill=(20, 22, 26))
    # giant title
    text(d, (W // 2 - 360, H // 2 - 140), "BACKW@TER", P["bone"], size=200)
    text(d, (W // 2 - 360, H // 2 + 80),  "a server graveyard", P["dim"], size=44)
    text(d, (60, 60), "// signal: weak", P["rust"], size=24)
    text(d, (60, 100), "// listeners: 1247", P["dim"], size=22)
    text(d, (60, H - 80), "// last updated 11/04/2009", P["dim"], size=22)
    img = add_scanlines(img, opacity=22)
    img = add_vignette(img, strength=120)
    return img


def wallpaper_lobby() -> Image.Image:
    img = Image.new("RGB", (W, H), P["bg"])
    d = ImageDraw.Draw(img)
    # tile floor in perspective
    horizon = int(H * 0.55)
    for i in range(-30, 31):
        x = W // 2 + i * 60
        d.line([(x, horizon), (W // 2, H)], fill=(30, 32, 36))
        d.line([(W // 2, H), (x, horizon)], fill=(30, 32, 36))
    for j in range(20):
        y = horizon + j * 30
        d.line([(0, y), (W, y)], fill=(30, 32, 36))
    # ceiling glow
    for y in range(0, horizon, 4):
        a = int(80 * (1 - y / horizon))
        d.line([(0, y), (W, y)], fill=(P["bg"][0] + a // 6, P["bg"][1] + a // 6, P["bg"][2] + a // 4))
    # central terminal
    cx = W // 2
    cy = int(H * 0.45)
    d.rectangle([cx - 80, cy - 120, cx + 80, cy + 60], fill=P["dark"], outline=P["rust"], width=2)
    d.rectangle([cx - 60, cy - 100, cx + 60, cy + 20], fill=(20, 8, 6), outline=P["rust"], width=1)
    text(d, (cx - 56, cy - 92), "OLD LOBBY", P["rust"], size=18)
    text(d, (cx - 56, cy - 60), "queue:01", P["fg"], size=18)
    text(d, (cx - 56, cy - 30), ">_", P["sick"], size=22)
    # rust glow
    for r in range(40, 100):
        a = int(140 * (1 - (r - 40) / 60))
        d.ellipse([cx - r, cy - 40 - r, cx + r, cy - 40 + r], outline=(P["rust"][0], 0, 0))
    img = add_scanlines(img, opacity=18)
    img = add_vignette(img, strength=140)
    return img


def wallpaper_water() -> Image.Image:
    img = Image.new("RGB", (W, H), P["bruise"])
    d = ImageDraw.Draw(img)
    rng = random.Random(13)
    for y in range(H):
        shift = int(8 * math.sin(y / 18))
        for x in range(0, W, 2):
            phase = (x + shift) % 16
            if phase < 5:
                d.point((x, y), fill=P["bruise"])
            elif phase < 11:
                d.point((x, y), fill=(74, 50, 92))
            else:
                d.point((x, y), fill=(110, 96, 124))
    # sparkles
    for _ in range(W * 2):
        x = rng.randrange(W)
        y = rng.randrange(H)
        d.point((x, y), fill=P["bone"])
    # title
    text(d, (60, H - 100), "// undersea build — water has no top", P["bone"], size=24)
    img = add_vignette(img, strength=130)
    return img


def wallpaper_backyard() -> Image.Image:
    """Eternal-dusk backyard with fence + tree."""
    img = Image.new("RGB", (W, H), (76, 96, 50))
    d = ImageDraw.Draw(img)
    # gradient sky
    for y in range(0, int(H * 0.55)):
        f = y / (H * 0.55)
        r = int(34 + (138 - 34) * f)
        g = int(20 + (58 - 20) * f)
        b = int(16 + (31 - 16) * f)
        d.line([(0, y), (W, y)], fill=(r, g, b))
    # horizon line of fence
    fence_y = int(H * 0.55)
    plank = 18
    for x in range(0, W, plank):
        d.rectangle([x, fence_y, x + plank - 2, fence_y + 48], fill=(96, 64, 36))
    # grass texture
    rng = random.Random(101)
    for _ in range(W * 3):
        x = rng.randrange(W)
        y = rng.randrange(fence_y + 50, H)
        d.point((x, y), fill=(58, 84, 38))
    # tree
    tx, ty = int(W * 0.78), int(H * 0.75)
    d.rectangle([tx - 6, ty, tx + 6, ty + 200], fill=(50, 30, 18))
    d.ellipse([tx - 110, ty - 220, tx + 110, ty], fill=(34, 52, 28))
    text(d, (60, H - 100), "// backyard — stuck on sunset", P["bone"], size=24)
    img = add_vignette(img, strength=140)
    return img


def wallpaper_culdesac() -> Image.Image:
    """Top-down five-house ring."""
    img = Image.new("RGB", (W, H), (42, 42, 46))
    d = ImageDraw.Draw(img)
    cx, cy = W / 2, H / 2
    # road ring
    for r in range(380, 250, -2):
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(26, 26, 30))
    # five houses
    for i in range(5):
        ang = -3.14159 / 2 + i * (2 * 3.14159 / 5)
        r = 320
        hx, hy = cx + math.cos(ang) * r, cy + math.sin(ang) * r
        d.rectangle([hx - 60, hy - 60, hx + 60, hy + 60], fill=(168, 160, 140))
        d.polygon([(hx - 70, hy - 60), (hx + 70, hy - 60), (hx, hy - 130)], fill=(96, 56, 40))
    text(d, (60, H - 100), "// cul-de-sac loop — five houses, repeating forever", P["bone"], size=24)
    img = add_vignette(img, strength=130)
    return img


def wallpaper_bigbox() -> Image.Image:
    """Walmart aisles at night, no shoppers, slowed music."""
    img = Image.new("RGB", (W, H), (24, 24, 28))
    d = ImageDraw.Draw(img)
    horizon = int(H * 0.5)
    d.rectangle([0, horizon, W, H], fill=(48, 48, 52))
    cx = W / 2
    for x in range(0, W, 80):
        d.line([(x, H), (cx, horizon)], fill=(70, 70, 74), width=1)
    for shelf_i in range(-3, 4):
        x = int(cx + shelf_i * 110)
        d.line([(x, H), (cx + shelf_i * 18, horizon)], fill=(110, 80, 50), width=2)
        for y_frac in (0.55, 0.62, 0.7, 0.78):
            y = int(horizon + (H - horizon) * (y_frac - 0.5) * 2)
            x_near = int(cx + shelf_i * 110)
            x_far = int(cx + shelf_i * 18 + (110 - 18) * (1 - (y_frac - 0.5) * 2))
            d.line([(x_near, y), (x_far, y)], fill=(70, 50, 30), width=1)
    for y in range(0, horizon, 16):
        d.line([(0, y), (W, y)], fill=(34, 34, 38))
    d.rectangle([cx - 90, 30, cx + 90, 50], fill=(220, 220, 200))
    text(d, (60, 60), "// big box — no shoppers", P["bone"], size=26)
    text(d, (60, 100), "music: same song. 25% slower.", P["dim"], size=18)
    img = add_vignette(img, strength=150)
    return img


def wallpaper_serverroom() -> Image.Image:
    """Rows of racks with blinking LEDs."""
    img = Image.new("RGB", (W, H), (12, 14, 18))
    d = ImageDraw.Draw(img)
    d.rectangle([0, int(H * 0.6), W, H], fill=(34, 38, 42))
    rng = random.Random(73)
    for col in range(8):
        for row in range(3):
            x = 80 + col * 220
            y = int(H * 0.18) + row * 240
            d.rectangle([x, y, x + 160, y + 200], fill=(20, 22, 26), outline=(58, 60, 64))
            for slot in range(10):
                sy = y + 10 + slot * 18
                d.rectangle([x + 10, sy, x + 150, sy + 12], fill=(10, 12, 14))
                for li in range(3):
                    if rng.random() < 0.6:
                        c = (111, 138, 58) if rng.random() < 0.7 else (138, 58, 31)
                        d.rectangle([x + 12 + li * 6, sy + 4, x + 16 + li * 6, sy + 8], fill=c)
    text(d, (60, H - 90), "// server room — the game knows it's a game", P["bone"], size=24)
    img = add_scanlines(img, opacity=12)
    img = add_vignette(img, strength=140)
    return img


def wallpaper_liminalpool() -> Image.Image:
    """Empty natatorium, half-flooded, fluorescent buzz."""
    img = Image.new("RGB", (W, H), (186, 188, 188))
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, int(H * 0.28)], fill=(214, 214, 208))
    d.rectangle([0, int(H * 0.28), W, int(H * 0.42)], fill=(200, 200, 196))
    pool_top = int(H * 0.42)
    pool_bot = H
    d.rectangle([0, pool_top, W, pool_top + 8], fill=(160, 160, 156))
    for y in range(pool_top + 8, pool_bot):
        f = (y - pool_top - 8) / (pool_bot - pool_top - 8)
        r = int(94 + (40 - 94) * f)
        g = int(130 - 130 * f * 0.3)
        b = int(144 - 60 * f * 0.5)
        d.line([(0, y), (W, y)], fill=(r, max(0, g), max(0, b)))
    rng = random.Random(13)
    for y in range(pool_top + 12, pool_bot, 8):
        for x in range(0, W, 18):
            if rng.random() < 0.18:
                d.line([(x, y), (x + 8, y)], fill=(160, 180, 190))
    for i in range(5):
        x = 120 + i * 360
        d.rectangle([x, 20, x + 200, 32], fill=(230, 230, 210))
    text(d, (60, 60), "// liminal pool — fluorescent buzz, half-flooded", P["dim"], size=22)
    img = add_vignette(img, strength=130)
    return img


def wallpaper_static() -> Image.Image:
    rng = random.Random(99)
    img = Image.new("RGB", (W, H), P["bg"])
    px = img.load()
    for y in range(H):
        for x in range(W):
            r = rng.randrange(255)
            if r < 200:
                v = rng.randrange(20, 60)
            elif r < 245:
                v = rng.randrange(80, 130)
            else:
                v = rng.randrange(170, 220)
            px[x, y] = (v, v, v)
    img = add_scanlines(img, opacity=40)
    d = ImageDraw.Draw(img)
    text(d, (60, 60), "NO SIGNAL", P["rust"], size=56)
    text(d, (60, 130), "BACKWATER // ch.??", P["fg"], size=24)
    img = add_vignette(img, strength=160)
    return img


def main() -> None:
    print("[backwater/wallpapers] generating…")
    pairs = [
        ("wallpaper_terminal.png", wallpaper_terminal),
        ("wallpaper_lobby.png",    wallpaper_lobby),
        ("wallpaper_water.png",    wallpaper_water),
        ("wallpaper_backyard.png", wallpaper_backyard),
        ("wallpaper_culdesac.png", wallpaper_culdesac),
        ("wallpaper_bigbox.png",   wallpaper_bigbox),
        ("wallpaper_serverroom.png", wallpaper_serverroom),
        ("wallpaper_liminalpool.png", wallpaper_liminalpool),
        ("wallpaper_static.png",   wallpaper_static),
    ]
    for name, fn in pairs:
        img = fn()
        out = OUT / name
        img.save(out, optimize=True)
        size = out.stat().st_size // 1024
        print(f"  wrote public/{name}  ({W}x{H}, {size} KB)")
    print("[backwater/wallpapers] done.")


if __name__ == "__main__":
    main()
