"""Original 8,192-glyph font. Not derived from the Accelerando outlines."""

from pathlib import Path

from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen

OUT = Path("/workspace/public/fonts/signal-8192.ttf")
UPM = 1000


def box(pen, x0, y0, x1, y1):
    pen.moveTo((x0, y0))
    pen.lineTo((x1, y0))
    pen.lineTo((x1, y1))
    pen.lineTo((x0, y1))
    pen.closePath()


def shape(pen, x, y, w, h, kind):
    if kind == 0:
        return
    m = 28
    x0, y0, x1, y1 = x + m, y + m, x + w - m, y + h - m
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    if kind == 1:
        box(pen, x0, cy - 18, x1, cy + 18)
    elif kind == 2:
        box(pen, cx - 18, y0, cx + 18, y1)
    elif kind == 3:
        box(pen, x0, cy - 16, x1, cy + 16)
        box(pen, cx - 16, y0, cx + 16, y1)
    elif kind == 4:
        pen.moveTo((x0, y0))
        pen.lineTo((x1, y1))
        pen.lineTo((x1 - 36, y1))
        pen.lineTo((x0, y0 + 36))
        pen.closePath()
    elif kind == 5:
        pen.moveTo((x0, y1))
        pen.lineTo((x1, y0))
        pen.lineTo((x1, y0 + 36))
        pen.lineTo((x0 + 36, y1))
        pen.closePath()
    elif kind == 6:
        pen.moveTo((cx, y0))
        pen.lineTo((x1, cy))
        pen.lineTo((cx, y1))
        pen.lineTo((x0, cy))
        pen.closePath()
    elif kind == 7:
        box(pen, x0, cy - 16, cx - 20, cy + 16)
        box(pen, cx + 20, cy - 16, x1, cy + 16)
    elif kind == 8:
        pen.moveTo((cx, y1))
        pen.lineTo((x1, y0))
        pen.lineTo((x0, y0))
        pen.closePath()
    elif kind == 9:
        pen.moveTo((x0, y1))
        pen.lineTo((x1, y1))
        pen.lineTo((cx, y0))
        pen.closePath()
    elif kind == 10:
        box(pen, x0, y0, x1, y1)
    elif kind == 11:
        box(pen, x0, y0, x0 + 36, y1)
        box(pen, x0, y0, x1, y0 + 36)
    elif kind == 12:
        box(pen, x1 - 36, y0, x1, y1)
        box(pen, x0, y1 - 36, x1, y1)
    elif kind == 13:
        box(pen, x0, y1 - 32, x1, y1)
        box(pen, cx - 16, y0, cx + 16, cy)
    elif kind == 14:
        box(pen, x0, y0, x1, y0 + 32)
        box(pen, cx - 16, cy, cx + 16, y1)
    else:
        pen.moveTo((x0, y0))
        pen.lineTo((x1, y1))
        pen.lineTo((x1 - 32, y1))
        pen.lineTo((x0, y0 + 32))
        pen.closePath()
        pen.moveTo((x0, y1))
        pen.lineTo((x0 + 32, y1))
        pen.lineTo((x1, y0 + 32))
        pen.lineTo((x1, y0))
        pen.closePath()


def draw(glyph_id: int):
    pen = TTGlyphPen(None)
    box(pen, 70, 40, 110, 760)
    cells = [(glyph_id & 15), (glyph_id >> 4) & 15, (glyph_id >> 8) & 15]
    for index, kind in enumerate(cells):
        shape(pen, 140, 70 + index * 230, 470, 210, kind)
    if glyph_id & 4096:
        box(pen, 640, 70, 700, 760)
    return pen.glyph()


def main():
    order = [".notdef"] + [f"g{i:04d}" for i in range(8192)]
    glyphs = {".notdef": draw(0)}
    metrics = {".notdef": (760, 70)}
    cmap = {}
    for i in range(8192):
        name = f"g{i:04d}"
        glyphs[name] = draw(i)
        metrics[name] = (760, 70)
        cmap[0xF0000 + i] = name
    fb = FontBuilder(UPM, isTTF=True)
    fb.setupGlyphOrder(order)
    fb.setupCharacterMap(cmap)
    fb.setupGlyf(glyphs)
    fb.setupHorizontalMetrics(metrics)
    fb.setupHorizontalHeader(ascent=860, descent=-140)
    fb.setupNameTable(
        {
            "familyName": "Signal 8192",
            "styleName": "Regular",
            "uniqueFontIdentifier": "Signal8192-Original",
            "fullName": "Signal 8192",
            "psName": "Signal8192",
            "version": "Version 1.0",
            "licenseDescription": "Original glyph set for this course. Not the Accelerando font.",
        }
    )
    fb.setupOS2(sTypoAscender=860, sTypoDescender=-140, usWinAscent=860, usWinDescent=140)
    fb.setupPost()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    fb.save(OUT)
    print(OUT, OUT.stat().st_size)


if __name__ == "__main__":
    main()
