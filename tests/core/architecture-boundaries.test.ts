import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const projectRoot = process.cwd();
const srcRoot = path.join(projectRoot, "src");
const coreRoot = path.join(srcRoot, "core");

function toPosix(input: string): string {
  return input.split(path.sep).join("/");
}

function collectSourceFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(absolute));
      continue;
    }

    if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      files.push(absolute);
    }
  }

  return files;
}

function resolveRelativeImport(importerFile: string, specifier: string): string | null {
  const base = path.resolve(path.dirname(importerFile), specifier);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  return null;
}

function getCoreModuleName(filePath: string): string | null {
  const relativeToCore = path.relative(coreRoot, filePath);
  if (relativeToCore.startsWith("..")) {
    return null;
  }

  const [moduleName] = relativeToCore.split(path.sep);
  return moduleName || null;
}

function findRelativeSpecifiers(fileContent: string): string[] {
  const specs: string[] = [];
  const pattern = /(?:import|export)\s[^"']*?from\s*["']([^"']+)["']/g;
  for (const match of fileContent.matchAll(pattern)) {
    const specifier = match[1];
    if (specifier.startsWith(".")) {
      specs.push(specifier);
    }
  }
  return specs;
}

test("core modules expose a public index entrypoint", () => {
  const moduleDirs = fs
    .readdirSync(coreRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const missingEntrypoints = moduleDirs.filter((moduleName) => {
    const entrypoint = path.join(coreRoot, moduleName, "index.ts");
    return !fs.existsSync(entrypoint);
  });

  assert.deepEqual(missingEntrypoints, []);
});

test("cross-module imports target module public APIs only", () => {
  const sourceFiles = collectSourceFiles(srcRoot);
  const violations: string[] = [];

  for (const sourceFile of sourceFiles) {
    const importerModule = getCoreModuleName(sourceFile);
    const content = fs.readFileSync(sourceFile, "utf8");
    const relativeSpecifiers = findRelativeSpecifiers(content);

    for (const specifier of relativeSpecifiers) {
      const resolved = resolveRelativeImport(sourceFile, specifier);
      if (!resolved) {
        continue;
      }

      const targetModule = getCoreModuleName(resolved);
      if (!targetModule) {
        continue;
      }

      if (targetModule === importerModule) {
        continue;
      }

      const targetModuleIndex = path.join(coreRoot, targetModule, "index.ts");
      if (resolved === targetModuleIndex) {
        continue;
      }

      violations.push(
        `${toPosix(path.relative(projectRoot, sourceFile))} imports ${specifier} -> ${toPosix(path.relative(projectRoot, resolved))}`,
      );
    }
  }

  assert.deepEqual(violations, []);
});
