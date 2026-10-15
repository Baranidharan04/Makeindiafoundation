# Cloudflare-only form API

`worker/index.js` is a Cloudflare Worker for the three site forms:

- `POST /api/register` appends registrations to Google Sheets.
- `POST /api/contact` sends a notification through Cloudflare Email Service.
- `POST /api/subscribe` sends a newsletter-signup notification through Cloudflare Email Service.

No Resend key, Gmail app password, SMTP account, or separate backend is used.

## Required Cloudflare email setup

Cloudflare Email Sending is currently available on the Workers Paid plan. Before deploying, in the Cloudflare dashboard:

1. Go to **Compute → Email Service** and onboard `makeindiafoundation.org`.
2. Add the displayed SPF and DKIM DNS records, then wait until the sending domain is verified.
3. Under **Email Routing → Destination Addresses**, add and verify `makeindialab@gmail.com`.
4. Keep `MAIL_FROM` on the verified domain, for example `Make India Foundation <hello@makeindiafoundation.org>`.

The `EMAIL` binding in `wrangler.toml` is intentionally restricted to `makeindialab@gmail.com` so the Worker cannot send to arbitrary recipients.

## Required Worker variables and secrets

| Name | Type | Value |
| --- | --- | --- |
| `MAIL_FROM` | Variable | `Make India Foundation <hello@makeindiafoundation.org>` |
| `MAIL_TO` | Variable | `makeindialab@gmail.com` |
| `SHEET_ID` | Variable | ID in the Google Sheet URL |
| `SHEET_RANGE` | Variable | `Sheet1!A:I` unless the tab has another name |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Variable | Service-account email |
| `GOOGLE_PRIVATE_KEY` | Secret | Private key from the service-account JSON, including PEM lines |

Share the Google Sheet with the service-account email as an **Editor**. The expected columns are Timestamp, Name, Grade, Track, Stream, School, Email, Mobile, Project Idea.

## Deploy

1. Configure the variables/secrets above in **Workers & Pages → make-india-foundation-api → Settings → Variables and Secrets**.
2. Run `npm run deploy:worker`.
3. In **Settings → Triggers**, add `makeindiafoundation.org/api/*` (and the `www` route if used).
4. Submit each form once. Contact and subscription messages should reach `makeindialab@gmail.com`; registrations should appear in the Sheet.

Secrets must never be stored in frontend code, Git, `.dev.vars`, or `wrangler.toml`.
