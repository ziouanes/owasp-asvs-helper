export const environment = {
  production: true,
  // ❌ قمنا بحذف الـ apiKey تماماً من هنا لحمايته
  // ✅ أضفنا مسار الـ API الخاص بـ Netlify Function
  apiUrl: '/.netlify/functions/grok'
};