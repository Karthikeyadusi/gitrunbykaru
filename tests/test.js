import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { detectProject } from '../src/engine/detect.js';
import { getStrategy } from '../src/strategies/index.js';

describe('Strategy & Detection Engine Tests', () => {
  let tempBase;

  before(() => {
    tempBase = mkdtempSync(join(tmpdir(), 'grbk-test-'));
  });

  after(() => {
    try {
      rmSync(tempBase, { recursive: true, force: true });
    } catch { /* ignore */ }
  });

  it('should detect a Node.js project', async () => {
    const dir = join(tempBase, 'node-app');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'package.json'), JSON.stringify({
      name: 'node-demo',
      scripts: { dev: 'vite' },
      dependencies: { vite: '^5.0.0' }
    }));

    const detection = await detectProject(dir);
    assert.equal(detection.type, 'node');
    assert.equal(detection.framework, 'Vite');
    assert.equal(detection.runCommand, 'npm run dev');

    const strategy = getStrategy(detection.type);
    assert.ok(strategy);
    assert.equal(strategy.name, 'node');
  });

  it('should detect a Python/Flask project', async () => {
    const dir = join(tempBase, 'python-app');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'app.py'), 'from flask import Flask\napp = Flask(__name__)');
    writeFileSync(join(dir, 'requirements.txt'), 'Flask==3.0.0');

    const detection = await detectProject(dir);
    assert.equal(detection.type, 'python');
    assert.equal(detection.framework, 'Flask');
    assert.equal(detection.runCommand, 'python app.py');

    const strategy = getStrategy(detection.type);
    assert.ok(strategy);
    assert.equal(strategy.name, 'python');
  });

  it('should detect a Go/Gin project', async () => {
    const dir = join(tempBase, 'go-app');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'go.mod'), 'module example.com/my-gin-app\n\ngo 1.22\n\nrequire github.com/gin-gonic/gin v1.9.1\n');
    writeFileSync(join(dir, 'main.go'), 'package main\nimport "github.com/gin-gonic/gin"\nfunc main() {}');

    const detection = await detectProject(dir);
    assert.equal(detection.type, 'go');
    assert.equal(detection.framework, 'Gin');
    assert.equal(detection.runCommand, 'go run .');
    assert.equal(detection.installCommand, 'go mod download');

    const strategy = getStrategy(detection.type);
    assert.ok(strategy);
    assert.equal(strategy.name, 'go');
    assert.equal(strategy.getRunCommand(detection), 'go run .');
  });

  it('should detect a Static HTML project', async () => {
    const dir = join(tempBase, 'static-app');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), '<h1>Hello World</h1>');

    const detection = await detectProject(dir);
    assert.equal(detection.type, 'static');
    assert.equal(detection.framework, 'Static HTML');

    const strategy = getStrategy(detection.type);
    assert.ok(strategy);
    assert.equal(strategy.name, 'static');
  });
});
