/** Make India Foundation API — Cloudflare Worker. Bind to /api/* on the site domain. */
const MAX_BODY_BYTES = 16_384;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cors(request, env) {
  const origin = request.headers.get('Origin');
  return {
    ...(env.ALLOWED_ORIGIN && origin === env.ALLOWED_ORIGIN ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {}),
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}
function reply(request, env, status, payload) {
  return new Response(JSON.stringify(payload), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...cors(request, env) } });
}
async function body(request) {
  if (Number(request.headers.get('Content-Length') || 0) > MAX_BODY_BYTES) throw new Error('Request body is too large.');
  const value = await request.text();
  if (value.length > MAX_BODY_BYTES) throw new Error('Request body is too large.');
  try { return value ? JSON.parse(value) : {}; } catch { throw new Error('Invalid JSON body.'); }
}
const field = (value, length = 2_000) => typeof value === 'string' ? value.trim().slice(0, length) : '';
function html(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
const time = () => new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'medium', timeZone: 'Asia/Kolkata' }).format(new Date());

async function mail(env, { subject, text, content, replyTo }) {
  if (!env.EMAIL || !env.MAIL_FROM || !env.MAIL_TO) throw new Error('Cloudflare Email Service is not configured.');
  await env.EMAIL.send({
    from: env.MAIL_FROM,
    to: env.MAIL_TO,
    subject,
    text,
    html: content,
    ...(replyTo ? { replyTo } : {}),
  });
}
function b64url(value) {
  const bytes = value instanceof ArrayBuffer ? new Uint8Array(value) : new TextEncoder().encode(value);
  let binary = ''; for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function keyData(pem) {
  const raw = pem.replace(/\\n/g, '\n').replace(/-----BEGIN [^-]+-----/, '').replace(/-----END [^-]+-----/, '').replace(/\s+/g, '');
  const binary = atob(raw), bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}
async function googleToken(env) {
  if (!env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !env.GOOGLE_PRIVATE_KEY) throw new Error('Google Sheets credentials are not configured.');
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64url(JSON.stringify({ iss: env.GOOGLE_SERVICE_ACCOUNT_EMAIL, scope: 'https://www.googleapis.com/auth/spreadsheets', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }))}`;
  const cryptoKey = await crypto.subtle.importKey('pkcs8', keyData(env.GOOGLE_PRIVATE_KEY), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(unsigned));
  const result = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${b64url(signature)}` }) });
  if (!result.ok) throw new Error(`Google OAuth returned ${result.status}.`);
  return (await result.json()).access_token;
}
async function append(env, values, range = env.SHEET_RANGE || 'Sheet1!A:I') {
  if (!env.SHEET_ID) throw new Error('Google Sheet is not configured.');
  const result = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.SHEET_ID)}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`, { method: 'POST', headers: { Authorization: `Bearer ${await googleToken(env)}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ values: [values] }) });
  if (!result.ok) throw new Error(`Google Sheets returned ${result.status}.`);
}
async function register(request, env) {
  const data = await body(request), name = field(data.fullName, 160), email = field(data.email, 254).toLowerCase();
  if (!name || !EMAIL.test(email)) return reply(request, env, 400, { ok: false, error: 'A valid full name and email are required.' });
  await append(env, [time(), name, field(data.grade, 32), field(data.track, 64), field(data.stream, 64), field(data.school, 200), email, field(data.mobile, 32), field(data.projectIdea)]);
  return reply(request, env, 200, { ok: true });
}
async function volunteerRegister(request, env) {
  const data = await body(request);
  const name = field(data.fullName, 160), email = field(data.email, 254).toLowerCase();
  const mobile = field(data.mobile, 32), city = field(data.city, 160);
  const organisation = field(data.organisation, 200), interests = field(data.areasOfInterest, 500);
  const availability = field(data.availability, 160), message = field(data.message, 2_000);
  if (!name || !EMAIL.test(email) || !mobile || !city || !interests || !availability) {
    return reply(request, env, 400, { ok: false, error: 'Please provide a valid name, email, mobile number, city, areas of interest, and availability.' });
  }
  await append(env, [time(), name, email, mobile, city, organisation, interests, availability, message], env.VOLUNTEER_SHEET_RANGE || 'Volunteers!A:I');
  return reply(request, env, 200, { ok: true });
}
async function contact(request, env) {
  const data = await body(request), name = field(data.name, 160), email = field(data.email, 254).toLowerCase(), phone = field(data.phone, 32), category = field(data.category, 100), message = field(data.message);
  if (!name || !EMAIL.test(email) || !message) return reply(request, env, 400, { ok: false, error: 'A valid name, email and message are required.' });
  const fields = [['Name', name], ['Email', email], ['Phone', phone || '-'], ['Category', category || '-']];
  await mail(env, { subject: `Contact form: ${name}`, text: ['New contact form submission', ...fields.map(([label, value]) => `${label}: ${value}`), '', 'Message:', message].join('\n'), content: `<h2>New contact form submission</h2><table>${fields.map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${html(value)}</td></tr>`).join('')}</table><p><strong>Message</strong></p><p>${html(message).replace(/\n/g, '<br>')}</p>`, replyTo: email });
  return reply(request, env, 200, { ok: true });
}
async function subscribe(request, env) {
  const email = field((await body(request)).email, 254).toLowerCase();
  if (!EMAIL.test(email)) return reply(request, env, 400, { ok: false, error: 'A valid email is required.' });
  const subscribed = time();
  await mail(env, { subject: `Newsletter subscription: ${email}`, text: `New newsletter subscription\n\nEmail: ${email}\nSubscribed: ${subscribed}`, content: `<h2>New newsletter subscription</h2><p><strong>Email:</strong> ${html(email)}</p><p><strong>Subscribed:</strong> ${html(subscribed)}</p>` });
  return reply(request, env, 200, { ok: true });
}
const routes = { '/api/register': register, '/api/contact': contact, '/api/subscribe': subscribe, '/api/volunteer-register': volunteerRegister };
export default { async fetch(request, env) {
  const path = new URL(request.url).pathname;
  if (request.method === 'OPTIONS' && routes[path]) return new Response(null, { status: 204, headers: cors(request, env) });
  if (request.method !== 'POST' || !routes[path]) return env.ASSETS.fetch(request);
  if (env.FORMS_ENABLED !== 'true') {
    return reply(request, env, 503, { ok: false, error: 'Forms are temporarily unavailable. Please try again later.' });
  }
  try { return await routes[path](request, env); } catch (error) {
    console.error(`[${path}]`, error instanceof Error ? error.message : error);
    const bad = error instanceof Error && /Invalid JSON|too large/.test(error.message);
    return reply(request, env, bad ? 400 : 500, { ok: false, error: bad ? error.message : 'Request failed. Please try again.' });
  }
} };
