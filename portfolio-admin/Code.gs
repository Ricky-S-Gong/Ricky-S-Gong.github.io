const ACCOUNT = '18ae961b21172ff289555af217be8732';
const SITE = '04211cb4fe9249819656603091f07a95';

function doGet() {
  const viewer = Session.getActiveUser().getEmail().toLowerCase();
  if (!viewer || viewer !== Session.getEffectiveUser().getEmail().toLowerCase()) {
    return HtmlService.createHtmlOutput('Access denied.');
  }

  let content;
  try {
    const { totals, pages, sources, countries } = analytics_();
    const total = totals[0];
    content = `<div class="totals">
      <div><span>访问次数</span><strong>${number_(total?.sum.visits ?? 0)}</strong></div>
      <div><span>页面浏览量</span><strong>${number_(total?.count ?? 0)}</strong></div>
    </div><div class="reports">
      ${ranking_('热门页面', '浏览量', pages, (row) => row.count)}
      ${ranking_('访问来源', '访问次数', sources, (row) => row.sum.visits, (name) => name || '直接访问')}
      ${ranking_('访客国家', '访问次数', countries, (row) => row.sum.visits, (name) => name || '未知')}
    </div>`;
  } catch (error) {
    console.error(error.message);
    content = '<p role="alert">暂时无法读取统计。请刷新页面重试，或检查 Cloudflare 只读凭证。</p>';
  }

  return HtmlService.createHtmlOutput(`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
    <style>
      :root{color-scheme:dark;background:#091625;color:#f3f6fb;font:16px "Avenir Next","Segoe UI",sans-serif}
      *{box-sizing:border-box}body{margin:0}main{width:min(100% - 2rem,66rem);margin:clamp(2rem,8vw,6rem) auto}
      header{border-top:3px solid #7cf7c1;padding:1rem 0 1.4rem}header p,small,span{color:#b7c6db}
      header p{margin:0;letter-spacing:.12em}h1{margin:.7rem 0;font:clamp(2.1rem,6vw,4rem) Baskerville,"Songti SC",serif}
      .totals,.reports{display:grid;gap:1rem}.totals{grid-template-columns:repeat(2,minmax(0,1fr));margin-bottom:1rem}
      .totals div,section{background:#102239;padding:clamp(.8rem,2vw,1.4rem);border:1px solid #294059}
      strong{display:block;font-size:clamp(1.7rem,6vw,3rem);font-variant-numeric:tabular-nums;color:#7cf7c1}
      .reports{grid-template-columns:1.4fr 1fr 1fr}section{min-width:0}h2{margin:0 0 .25rem;font-size:1.15rem}
      ol{padding:0;list-style:none;margin:1rem 0 0}li{margin-bottom:.85rem}.row{display:flex;gap:.6rem;justify-content:space-between}
      .row span{color:inherit;overflow-wrap:anywhere}.row b{font-variant-numeric:tabular-nums}
      .track{display:block;background:#294059;height:3px;margin-top:.35rem}.track i{display:block;background:#7cf7c1;height:100%}
      footer{margin-top:1.5rem;color:#b7c6db;font-size:.9rem}@media(max-width:760px){.reports{grid-template-columns:1fr}}
    </style></head><body><main><header><p>RICKY GONG / ADMIN</p><h1>访问看板</h1><small>最近 24 小时 · ricky-s-gong.github.io</small></header>
    ${content}<footer>数据来自 Cloudflare Web Analytics。已过滤 Cloudflare 标记的机器人流量。</footer></main></body></html>`)
    .setTitle('Portfolio Admin | Ricky Gong').addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function analytics_() {
  const token = PropertiesService.getScriptProperties().getProperty('CF_ANALYTICS_TOKEN');
  if (!token) throw new Error('Missing CF_ANALYTICS_TOKEN');

  const response = UrlFetchApp.fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: `Bearer ${token}` },
    muteHttpExceptions: true,
    payload: JSON.stringify({
      query: `query Traffic($account: string!, $filter: AccountRumPageloadEventsAdaptiveGroupsFilter_InputObject!) {
        viewer { accounts(filter: { accountTag: $account }) {
          totals: rumPageloadEventsAdaptiveGroups(limit: 1, filter: $filter) { count sum { visits } }
          pages: rumPageloadEventsAdaptiveGroups(limit: 10, filter: $filter, orderBy: [count_DESC]) {
            count dimensions { name: requestPath }
          }
          sources: rumPageloadEventsAdaptiveGroups(limit: 10, filter: $filter, orderBy: [sum_visits_DESC]) {
            sum { visits } dimensions { name: refererHost }
          }
          countries: rumPageloadEventsAdaptiveGroups(limit: 10, filter: $filter, orderBy: [sum_visits_DESC]) {
            sum { visits } dimensions { name: countryName }
          }
        } }
      }`,
      variables: { account: ACCOUNT, filter: {
        siteTag: SITE, bot: 0,
        datetime_geq: new Date(Date.now() - 86400000).toISOString(),
        datetime_lt: new Date().toISOString(),
      } },
    }),
  });
  if (response.getResponseCode() !== 200) throw new Error(`Cloudflare HTTP ${response.getResponseCode()}`);
  const result = JSON.parse(response.getContentText());
  if (result.errors?.length) throw new Error(result.errors[0].message);
  const report = result.data?.viewer.accounts[0];
  if (!report) throw new Error('Cloudflare returned no account');
  return report;
}

function ranking_(title, unit, rows, value, label = (name) => name || '/') {
  const ranked = rows.filter((row) => value(row) > 0);
  const max = Math.max(1, ...ranked.map(value));
  const items = ranked.map((row) => `<li><div class="row"><span>${escape_(label(row.dimensions.name))}</span>
    <b>${number_(value(row))}</b></div><span class="track" aria-hidden="true"><i style="width:${100 * value(row) / max}%"></i></span></li>`);
  return `<section><h2>${title}</h2><small>${unit}</small>${items.length ? `<ol>${items.join('')}</ol>` : '<p>这段时间暂无数据。</p>'}</section>`;
}

function escape_(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function number_(value) {
  return Number(value).toLocaleString('zh-CN');
}
