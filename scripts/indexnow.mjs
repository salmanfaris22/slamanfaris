// Tells Bing, Yandex and other IndexNow engines about the site's URLs. Run after a production deploy:
//   node scripts/indexnow.mjs            (reads the live sitemap)
// The key is public by design: search engines fetch it from the site to confirm ownership.
const KEY = '74f8ce86f5740ec9b98b69e0cb229158';
const HOST = 'www.salmanfaris.in';

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (!urls.length) throw new Error('No URLs found in the sitemap');

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URLs, status ${response.status}`);
if (!response.ok && response.status !== 202) process.exit(1);
