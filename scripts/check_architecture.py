#!/usr/bin/env python3
"""Validate the architecture/ tree of olaa-platform.

Checks:
  1. Exactly 22 branch folders 00..21 exist, each with the required files.
  2. Every module listed in OLAA_MASTER_ARCHITECTURE.md section 4 has a spec file
     and exactly one row in MODULE_REGISTRY.md (and no extra rows).
  3. No empty files anywhere in the repository (outside .git and node_modules).
  4. Relative Markdown links under architecture/ and the root docs resolve.
  5. Legacy names (AtoZ, OLAA Habit/Note, olaa-habitstracker, olaa-note) appear only
     in allowed history files.

Standard library only. Exit code 1 on any failure.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ARCH = ROOT / "architecture"
REQUIRED = ["README.md", "CHANGELOG.md", "requirements/README.md", "modules/README.md",
            "api-contracts/README.md", "database/README.md", "tests/README.md"]
LEGACY = re.compile(r"\bAtoZ\b|ATOZ_|OLAA (Habit|Note)\b|olaa-habitstracker|olaa-note\b")
LEGACY_ALLOWED = {"architecture/OLAA_MASTER_ARCHITECTURE.md", "architecture/INTEGRATION_CHANGELOG.md",
                  "CHANGELOG.md", "scripts/check_architecture.py"}
LEGACY_ALLOWED_DIRS = ("architecture/DECISIONS/",)

errors = []


def err(msg):
    errors.append(msg)


# 1. branch folders
branch_dirs = sorted(p for p in ARCH.iterdir() if p.is_dir() and re.match(r"\d\d-", p.name))
nums = [p.name[:2] for p in branch_dirs]
if nums != [f"{i:02d}" for i in range(22)]:
    err(f"expected branch folders 00..21, found {nums}")
for d in branch_dirs:
    for rel in REQUIRED:
        if not (d / rel).is_file():
            err(f"{d.name}: missing {rel}")
    if not re.fullmatch(r"\d\d-[a-z0-9]+(-[a-z0-9]+)*", d.name):
        err(f"{d.name}: folder name is not lowercase-kebab-case")

# 2. modules vs master doc vs registry
doc = (ARCH / "OLAA_MASTER_ARCHITECTURE.md").read_text(encoding="utf-8")
sec4 = doc.split("## 4.", 1)[1].split("## 5.", 1)[0]
doc_mods = re.findall(r"- \*\*(\d\d\.\d\d) ([a-z0-9-]+)\*\*", sec4)
registry = (ARCH / "MODULE_REGISTRY.md").read_text(encoding="utf-8")
reg_rows = re.findall(r"^\| (\d\d\.\d\d) \| ([a-z0-9-]+) \|", registry, flags=re.M)
if sorted(doc_mods) != sorted(reg_rows):
    missing = set(doc_mods) - set(reg_rows)
    extra = set(reg_rows) - set(doc_mods)
    err(f"MODULE_REGISTRY mismatch: missing={sorted(missing)} extra={sorted(extra)}")
if len(reg_rows) != len(set(reg_rows)):
    err("MODULE_REGISTRY has duplicate rows")
for mid, slug in doc_mods:
    d = next((p for p in branch_dirs if p.name.startswith(mid[:2] + "-")), None)
    if d and not (d / "modules" / f"{mid}-{slug}.md").is_file():
        err(f"missing module spec {d.name}/modules/{mid}-{slug}.md")

# 3. empty files
SKIP_DIRS = {".git", "node_modules"}

for p in ROOT.rglob("*"):
    if SKIP_DIRS & set(p.relative_to(ROOT).parts):
        continue
    if p.is_file() and p.stat().st_size == 0:
        err(f"empty file: {p.relative_to(ROOT)}")

# 4. relative links
md_files = list(ARCH.rglob("*.md")) + list(ROOT.glob("*.md"))
for f in md_files:
    text = re.sub(r"```.*?```", "", f.read_text(encoding="utf-8"), flags=re.S)
    for target in re.findall(r"\]\(([^)#\s]+)(?:#[^)]*)?\)", text):
        if re.match(r"[a-z]+://", target):
            continue
        if not (f.parent / target).resolve().exists():
            err(f"broken link in {f.relative_to(ROOT)}: {target}")

# 5. legacy names
for f in ROOT.rglob("*"):
    rel = f.relative_to(ROOT).as_posix()
    if (
        not f.is_file()
        or SKIP_DIRS & set(f.relative_to(ROOT).parts)
        or rel in LEGACY_ALLOWED
        or rel.startswith(LEGACY_ALLOWED_DIRS)
    ):
        continue
    try:
        text = f.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        continue
    for i, line in enumerate(text.splitlines(), 1):
        if LEGACY.search(line):
            err(f"legacy name in {rel}:{i}: {line.strip()[:80]}")

if errors:
    print(f"FAIL: {len(errors)} problem(s)")
    for e in errors:
        print(" -", e)
    sys.exit(1)
print(f"OK: 22 branches, {len(reg_rows)} modules, {len(md_files)} markdown files checked")
