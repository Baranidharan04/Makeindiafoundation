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

## Deploy the website

The production Worker is **still-cloud-542a**, in account
`52bc94af9df5f9a09ccd0db911c4424f`. It serves the website and its existing form
routes. Form delivery remains disabled (`FORMS_ENABLED = "false"`) until the
email and Google Sheets setup above is complete.

1. Run `npm ci`, then `npm run build` and `npm test`.
2. Push the changes to `main`. The existing Cloudflare Workers Builds integration
   deploys that branch to production.
3. Alternatively, check `npx wrangler whoami` for access to the production
   account, then run `npm run deploy:worker`. The account is pinned in
   `wrangler.toml` to prevent deployment to an unrelated account.
4. Check `https://makeindiafoundation.org/#/stem-workshops` after deployment.

Wrangler's custom build runs `npm run build` before every deployment. This
rebuilds Tailwind CSS and replaces `.cloudflare-assets` with the current
`index.html`, `src/`, and `public/` frontend files, including the workshop photos
and volunteer page. Do not copy the whole repository into the upload directory.
Private files, dependencies, hidden files, and symlinks are excluded.

To enable form delivery later, configure the variables/secrets on
**Workers & Pages → still-cloud-542a → Settings → Variables and Secrets**,
configure the required email binding, and explicitly enable `FORMS_ENABLED`.
Website deployments do not require changes to the existing domain routes.

Secrets must never be stored in frontend code, Git, `.dev.vars`, or `wrangler.toml`.
