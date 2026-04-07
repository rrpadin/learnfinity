import math
import struct
import zlib
from pathlib import Path

W = H = 1024
BG = (244, 248, 255, 255)
BLUE = (44, 94, 204, 255)
TRANSPARENT = (255, 255, 255, 0)


def new_canvas(fill):
    return [[list(fill) for _ in range(W)] for _ in range(H)]


def blend(canvas, x, y, color):
    if 0 <= x < W and 0 <= y < H:
      alpha = color[3] / 255.0
      dst = canvas[y][x]
      inv = 1 - alpha
      dst[0] = int(color[0] * alpha + dst[0] * inv)
      dst[1] = int(color[1] * alpha + dst[1] * inv)
      dst[2] = int(color[2] * alpha + dst[2] * inv)
      dst[3] = 255


def circle_outline(canvas, cx, cy, radius, thickness, color):
    x0 = max(0, int(cx - radius - thickness - 2))
    x1 = min(W, int(cx + radius + thickness + 3))
    y0 = max(0, int(cy - radius - thickness - 2))
    y1 = min(H, int(cy + radius + thickness + 3))
    inner = radius - thickness / 2
    outer = radius + thickness / 2

    for y in range(y0, y1):
        dy = y - cy
        for x in range(x0, x1):
            dx = x - cx
            distance = math.hypot(dx, dy)
            if inner <= distance <= outer:
                blend(canvas, x, y, color)


def line_segment(canvas, x1, y1, x2, y2, thickness, color):
    pad = thickness + 2
    xmin = max(0, int(min(x1, x2) - pad))
    xmax = min(W, int(max(x1, x2) + pad + 1))
    ymin = max(0, int(min(y1, y2) - pad))
    ymax = min(H, int(max(y1, y2) + pad + 1))
    dx = x2 - x1
    dy = y2 - y1
    length_squared = dx * dx + dy * dy

    if length_squared == 0:
        return

    radius = thickness / 2
    for y in range(ymin, ymax):
        for x in range(xmin, xmax):
            t = ((x - x1) * dx + (y - y1) * dy) / length_squared
            t = max(0.0, min(1.0, t))
            px = x1 + t * dx
            py = y1 + t * dy
            if math.hypot(x - px, y - py) <= radius:
                blend(canvas, x, y, color)


def filled_circle(canvas, cx, cy, radius, color):
    x0 = max(0, int(cx - radius - 1))
    x1 = min(W, int(cx + radius + 2))
    y0 = max(0, int(cy - radius - 1))
    y1 = min(H, int(cy + radius + 2))
    radius_squared = radius * radius

    for y in range(y0, y1):
        dy = y - cy
        for x in range(x0, x1):
            dx = x - cx
            if dx * dx + dy * dy <= radius_squared:
                blend(canvas, x, y, color)


def draw_background_accent(canvas):
    accent_cx, accent_cy, accent_radius = 780, 290, 170
    step = 18

    for yy in range(int(accent_cy - accent_radius), int(accent_cy + accent_radius) + 1, step):
        for xx in range(int(accent_cx - accent_radius), int(accent_cx + accent_radius) + 1, step):
            if math.hypot(xx - accent_cx, yy - accent_cy) <= accent_radius:
                alpha = max(0.0, 1.0 - math.hypot(xx - accent_cx, yy - accent_cy) / accent_radius)
                filled_circle(canvas, xx, yy, 3, (BLUE[0], BLUE[1], BLUE[2], int(255 * 0.12 * alpha)))


def write_png(path, pixels):
    height = len(pixels)
    width = len(pixels[0])
    raw = bytearray()

    for row in pixels:
        raw.append(0)
        for r, g, b, a in row:
            raw.extend((r, g, b, a))

    def chunk(tag, data):
        return (
            struct.pack("!I", len(data))
            + tag
            + data
            + struct.pack("!I", zlib.crc32(tag + data) & 0xFFFFFFFF)
        )

    png = bytearray(b"\x89PNG\r\n\x1a\n")
    png.extend(chunk(b"IHDR", struct.pack("!IIBBBBB", width, height, 8, 6, 0, 0, 0)))
    png.extend(chunk(b"IDAT", zlib.compress(bytes(raw), 9)))
    png.extend(chunk(b"IEND", b""))
    path.write_bytes(png)


def main():
    assets_dir = Path(__file__).resolve().parents[1] / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)

    icon = new_canvas(BG)
    draw_background_accent(icon)
    write_png(assets_dir / "icon.png", icon)
    write_png(assets_dir / "adaptive-icon.png", icon)

    splash = [[list(TRANSPARENT) for _ in range(512)] for _ in range(512)]
    scale = 512 / W
    for y in range(512):
        sy = min(H - 1, int(y / scale))
        for x in range(512):
            sx = min(W - 1, int(x / scale))
            pixel = icon[sy][sx]
            if pixel[:3] != list(BG):
                splash[y][x] = pixel[:]

    write_png(assets_dir / "splash-icon.png", splash)


if __name__ == "__main__":
    main()
