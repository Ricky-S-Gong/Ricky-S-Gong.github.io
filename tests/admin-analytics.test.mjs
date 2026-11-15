import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const source = readFileSync(new URL('../portfolio-admin/Code.gs', import.meta.url), 'utf8');
const report = { totals: [], pages: [], sources: [], countries: [] };
let request;
const context = vm.createContext({
  PropertiesService: { getScriptProperties: () => ({ getProperty: () => 'test-token' }) },
  UrlFetchApp: { fetch: (_, options) => {
    request = JSON.parse(options.payload);
    return { getResponseCode: () => 200, getContentText: () => JSON.stringify({ data: { viewer: { accounts: [report] } } }) };
  } },
});
vm.runInContext(source, context);

test('monthly window starts at dashboard creation and rolls after 30 days', () => {
  assert.equal(context.reportStart_(new Date('2026-11-15T00:00:00Z')), '2026-11-06T14:45:00.000Z');
  assert.equal(context.reportStart_(new Date('2026-12-15T00:00:00Z')), '2026-11-15T00:00:00.000Z');
  context.analytics_();
  assert.equal(request.variables.filter.bot, 0);
  assert.equal(request.variables.filter.siteTag, '04211cb4fe9249819656603091f07a95');
  assert.match(request.query, /countries: rumPageloadEventsAdaptiveGroups\(limit: 250/);
});

test('map handles no countries, excludes unknown locations, and escapes script content', () => {
  const empty = context.map_([]);
  assert.match(empty, /暂无可定位的访问数据/);
  assert.match(empty, /addColumn\('number', '访问次数'\)/);
  assert.match(empty, /data.addRows\(\[\]\)/);
  const html = context.map_([
    { dimensions: { name: 'United States' }, sum: { visits: 3 } },
    { dimensions: { name: '' }, sum: { visits: 9 } },
    { dimensions: { name: '</script><script>alert(1)' }, sum: { visits: 1 } },
  ]);
  assert.match(html, /\["United States",3\]/);
  assert.doesNotMatch(html, /\["",9\]/);
  assert.doesNotMatch(html, /<script>alert\(1\)/);
});
