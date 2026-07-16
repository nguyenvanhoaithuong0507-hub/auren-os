python3 - <<'PY'
from pathlib import Path

f = Path("artifacts/auren-workspace/vite.config.ts")
s = f.read_text()

old = '''const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}'''

new = '''const port = Number(process.env.PORT || 3000);

const basePath = process.env.BASE_PATH || "/";'''

f.write_text(s.replace(old, new))
print("vite.config.ts updated")
PY
