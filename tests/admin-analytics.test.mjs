import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const source = readFileSync(new URL('../portfolio-admin/Code.gs', import.meta.url), 'utf8');
const report = { totals: [{ sum: { visits: 2 }, count: 3 }], pages: [], sources: [], countries: [] };
const user = { getEmail: () => 'owner@example.com' };
let requests;
class FixedDate extends Date {
  constructor(value = "2026-11-17T00:00:00Z") { super(value); }
}
const context = vm.createContext({
  Date: FixedDate,
  Session: { getActiveUser: () => user, getEffectiveUser: () => user },
  HtmlService: { createHtmlOutput: (html) => ({ html, setTitle() { return this; }, addMetaTag() { return this; } }) },
  PropertiesService: { getScriptProperties: () => ({ getProperty: () => 'test-token' }) },
  UrlFetchApp: { fetchAll: (options) => {
    requests = options.map(({ payload }) => JSON.parse(payload));
    return requests.map((_, index) => ({
      getResponseCode: () => 200,
      getContentText: () => JSON.stringify({ data: { viewer: { accounts: [
        index === 0 ? { ...report, totals: [] } : report,
      ] } } }),
    }));
  } },
});
vm.runInContext(source, context);

test('monthly window starts at dashboard creation and rolls after 30 days', () => {
  assert.equal(context.reportStart_(new Date('2026-11-15T00:00:00Z')), '2026-11-06T14:45:00.000Z');
  assert.equal(context.reportStart_(new Date('2026-12-15T00:00:00Z')), '2026-11-15T00:00:00.000Z');
  context.analytics_();
  assert.equal(requests.length, 2);
  const [older, request] = requests;
  assert.equal(older.variables.filter.datetime_geq, '2026-11-06T14:45:00.000Z');
  assert.equal(request.variables.filter.datetime_geq, '2026-11-10T00:00:00.000Z');
  assert.equal(older.variables.filter.datetime_lt, request.variables.filter.datetime_geq);
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

test('dashboard renders visits and page views returned by Cloudflare', () => {
  const { html } = context.doGet();
  assert.match(html, /访问次数<\/span><strong>2<\/strong>/);
  assert.match(html, /页面浏览量<\/span><strong>3<\/strong>/);
});

test('monthly report combines repeated country and page groups across windows', () => {
  const day = (count) => ({
    totals: [{ count, sum: { visits: count } }],
    pages: [{ dimensions: { name: '/' }, count }],
    sources: [],
    countries: [{ dimensions: { name: 'United States' }, sum: { visits: count } }],
  });
  const merged = context.mergeReports_([day(2), day(3)]);
  assert.equal(merged.totals[0].count, 5);
  assert.equal(merged.pages[0].count, 5);
  assert.equal(merged.countries[0].sum.visits, 5);
});
