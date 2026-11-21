"""Split the Olaa icon sheet into one SVG per icon.

Usage: python3 scripts/split_icon_sheet.py packages/design-system/source/olaa-icons-sheet.svg packages/design-system/icons

Each path is assigned to the label below it (grid of 5 columns x 4 rows). The output is
cropped to a square viewBox with 6% padding and uses fill="currentColor" so the icon takes
the colour of the surrounding text.
"""
import re, sys, os
src = open(sys.argv[1]).read()
out = sys.argv[2]
paths = re.findall(r'<path d="([^"]+)"/>', src)
labels = re.findall(r'<text x="(\d+)" y="(\d+)"[^>]*>([^<]+)</text>', src)
cols = sorted({int(x) for x,_,_ in labels}); rows = sorted({int(y) for _,y,_ in labels})
names = {(int(x),int(y)): n for x,y,n in labels}
groups = {}
for d in paths:
    nums = list(map(int, re.findall(r'-?\d+', d)))
    xs, ys = nums[0::2], nums[1::2]
    cx, cy = (min(xs)+max(xs))/2, (min(ys)+max(ys))/2
    col = min(cols, key=lambda c: abs(c-cx))
    row = min((r for r in rows if r > cy), default=rows[-1])
    groups.setdefault((col,row), []).append((d, xs, ys))
os.makedirs(out, exist_ok=True)
for key, items in sorted(groups.items(), key=lambda k:(k[0][1],k[0][0])):
    name = names[key]
    X = [x for _,xs,_ in items for x in xs]; Y = [y for _,_,ys in items for y in ys]
    w, h = max(X)-min(X), max(Y)-min(Y); s = max(w,h); pad = round(s*0.06)
    vx = min(X) - (s-w)/2 - pad; vy = min(Y) - (s-h)/2 - pad; vs = s + 2*pad
    # shift coordinates so viewBox starts at 0
    def shift(d):
        res=[]; i=0
        for tok in re.split(r'(-?\d+)', d):
            if re.fullmatch(r'-?\d+', tok):
                v = int(tok) - (vx if i%2==0 else vy); i+=1
                res.append(f'{v:g}' if v==int(v) else f'{v:.1f}')
            else: res.append(tok)
        return ''.join(res)
    body = ''.join(f'<path d="{shift(d)}"/>' for d,_,_ in items)
    slug = name.lower()
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vs:g} {vs:g}" fill="currentColor" fill-rule="evenodd" aria-hidden="true">{body}</svg>\n'
    open(f'{out}/{slug}.svg','w').write(svg)
    print(slug, len(items), 'paths', f'{w}x{h}')
