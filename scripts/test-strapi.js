#!/usr/bin/env node
/*
 Simple Node script to test Strapi homepage single-type endpoints
 Usage:
   STRAPI_URL=http://localhost:1337 node scripts/test-strapi.js
*/

const BASE = process.env.STRAPI_URL || 'http://localhost:1337';
const endpoints = [
  '/api/home-page?populate=*',
  '/api/homepage?populate=*',
  '/api/home-page',
  '/api/homepage'
];

async function tryFetch(url) {
  try {
    console.log(`Fetching ${url}...`);
    const res = await fetch(url, { method: 'GET' });
    const text = await res.text();
    if (!res.ok) {
      console.error(`→ ${res.status} ${res.statusText}`);
      console.error(text);
      return false;
    }

    try {
      const data = JSON.parse(text);
      console.log('--- JSON response start ---');
      console.log(JSON.stringify(data, null, 2));
      console.log('--- JSON response end ---');
    } catch (e) {
      console.log('Response (non-JSON):');
      console.log(text);
    }
    return true;
  } catch (err) {
    console.error(`Request error: ${err.message}`);
    return false;
  }
}

(async () => {
  for (const ep of endpoints) {
    const url = `${BASE}${ep}`;
    const ok = await tryFetch(url);
    if (ok) process.exit(0);
  }
  console.error('All tested endpoints failed.');
  process.exit(1);
})();
