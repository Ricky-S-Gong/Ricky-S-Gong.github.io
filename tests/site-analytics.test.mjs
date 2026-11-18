import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const source = readFileSync(new URL('../site-analytics.js', import.meta.url), 'utf8');

function visit(search = '', preferences = new Map()) {
  const scripts = [];
  const window = {
    location: { href: `https://example.com/${search}` },
    localStorage: {
      getItem: (key) => preferences.get(key),
      setItem: (key, value) => preferences.set(key, value),
      removeItem: (key) => preferences.delete(key),
    },
    history: { replaceState() {} },
  };
  const document = { createElement: () => ({ dataset: {} }), body: { append: (script) => scripts.push(script) } };
  runInNewContext(source, { document, window, URL });
  return scripts;
}

test('normal visits give the Cloudflare module a discoverable site token', () => {
  const [beacon] = visit();
  assert.equal(beacon.type, 'module');
  assert.equal(beacon.src, 'https://static.cloudflareinsights.com/beacon.min.js');
  const config = JSON.parse(beacon.dataset.cfBeacon);
  assert.match(config.token, /^[a-f0-9]{32}$/);
  assert.equal(config.spa, false);
});

test('opt-out prevents the beacon from loading on this and subsequent visits', () => {
  const preferences = new Map();
  assert.deepEqual(visit('?analytics=off', preferences), []);
  assert.deepEqual(visit('', preferences), []);
  assert.equal(visit('?analytics=on', preferences).length, 1);
});
