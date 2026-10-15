import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const root = resolve('.');
const port = Number(process.env.PORT) || 4173;
const types = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

// ---------------------------------------------------------------------------
// Email (Nodemailer + Gmail SMTP)
// ---------------------------------------------------------------------------
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS; // Gmail "App Password", not your login password
const MAIL_TO = process.env.MAIL_TO || 'makeindialab@gmail.com';

let transporter = null;
function getTransporter() {
  if (!MAIL_USER || !MAIL_PASS) {
    throw new Error('MAIL_USER and MAIL_PASS environment variables are not configured.');
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: MAIL_USER, pass: MAIL_PASS }
    });
  }
  return transporter;
}

async function sendEmail({ subject, text, html }) {
  const info = await getTransporter().sendMail({
    from: `"Make India Foundation" <${MAIL_USER}>`,
    to: MAIL_TO,
    subject,
    text,
    html
  });
  return info;
}

// ---------------------------------------------------------------------------
// Google Sheets (registrations)
// ---------------------------------------------------------------------------
const SHEET_ID = process.env.SHEET_ID;          // e.g. the long id in the sheet URL
const SHEET_RANGE = process.env.SHEET_RANGE || 'Sheet1!A:H';

async function appendRegistration(row) {
  if (!SHEET_ID) {
    throw new Error('SHEET_ID environment variable is not configured.');
  }
  // Uses GOOGLE_APPLICATION_CREDENTIALS (service-account JSON) implicitly.
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: SHEET_RANGE,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] }
  });
  return res.data;
}

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------
function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) request.destroy();
    });
    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error('Invalid JSON body'));
      }
    });
    request.on('error', reject);
  });
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  });
  response.end(JSON.stringify(payload));
}

// ---------------------------------------------------------------------------
// Route handlers
// ---------------------------------------------------------------------------
async function handleRegister(request, response) {
  const data = await readJsonBody(request);
  const {
    fullName, grade, track, stream, school, email, mobile, projectIdea
  } = data;

  if (!fullName || !email) {
    return sendJson(response, 400, { ok: false, error: 'Full name and email are required.' });
  }

  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const row = [
    submittedAt, fullName, grade || '', track || '', stream || '',
    school || '', email, mobile || '', projectIdea || ''
  ];

  await appendRegistration(row);
  return sendJson(response, 200, { ok: true });
}

async function handleContact(request, response) {
  const data = await readJsonBody(request);
  const { name, email, phone, category, message } = data;

  if (!name || !email || !message) {
    return sendJson(response, 400, { ok: false, error: 'Name, email and message are required.' });
  }

  const text = [
    'New contact form submission',
    '-----------------------------',
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Phone:    ${phone || '-'}`,
    `Category: ${category || '-'}`,
    '',
    'Message:',
    message
  ].join('\n');

  const html = [
    '<h2 style="margin:0 0 12px">New contact form submission</h2>',
    '<table cellpadding="4" style="border-collapse:collapse">',
    `<tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>`,
    `<tr><td><b>Email</b></td><td>${escapeHtml(email)}</td></tr>`,
    `<tr><td><b>Phone</b></td><td>${escapeHtml(phone || '-')}</td></tr>`,
    `<tr><td><b>Category</b></td><td>${escapeHtml(category || '-')}</td></tr>`,
    '</table>',
    '<p><b>Message:</b></p>',
    `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`
  ].join('');

  await sendEmail({ subject: 'New Contact Message', text, html });
  return sendJson(response, 200, { ok: true });
}

async function handleSubscribe(request, response) {
  const data = await readJsonBody(request);
  const { email } = data;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return sendJson(response, 400, { ok: false, error: 'A valid email is required.' });
  }

  const text = [
    'New newsletter subscription',
    '-----------------------------',
    `Email: ${email}`,
    `Subscribed: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
  ].join('\n');

  const html = [
    '<h2 style="margin:0 0 12px">New newsletter subscription</h2>',
    `<p><b>Email:</b> ${escapeHtml(email)}</p>`,
    `<p><b>Subscribed:</b> ${escapeHtml(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))}</p>`
  ].join('');

  await sendEmail({ subject: 'New Newsletter Subscription', text, html });
  return sendJson(response, 200, { ok: true });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------
createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return sendJson(response, 204, {});
  }

  // API routes
  if (request.method === 'POST' && pathname === '/api/register') {
    try {
      await handleRegister(request, response);
    } catch (err) {
      console.error('[/api/register]', err);
      sendJson(response, 500, { ok: false, error: 'Failed to save registration.' });
    }
    return;
  }

  if (request.method === 'POST' && pathname === '/api/contact') {
    try {
      await handleContact(request, response);
    } catch (err) {
      console.error('[/api/contact]', err);
      sendJson(response, 500, { ok: false, error: 'Failed to send message.' });
    }
    return;
  }

  if (request.method === 'POST' && pathname === '/api/subscribe') {
    try {
      await handleSubscribe(request, response);
    } catch (err) {
      console.error('[/api/subscribe]', err);
      sendJson(response, 500, { ok: false, error: 'Failed to subscribe.' });
    }
    return;
  }

  // Static file serving
  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = normalize(join(root, relativePath));

  if (!filePath.startsWith(`${root}/`) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'Content-Type': types[extname(filePath).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-cache'
  });
  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`Make India Foundation site running at: http://localhost:${port}`);
});