export const environment = {
  production: false,
  // ❌ قمنا بحذف الـ apiKey تماماً من هنا لحمايته
  // ✅ أضفنا مسار الـ API الخاص بـ Netlify Function
  apiUrl: '/.netlify/functions/gemini' 
};