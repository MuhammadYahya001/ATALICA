# Deployment and operations

## Local verification

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm start
```

Use `.env.example` as a template for `.env.local`. Never put real secrets in source control.

## Production requirements

Host this App Router application on a Node.js platform that supports Next.js route handlers. Configure these variables in the host’s secret settings:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes for production inquiries | Authenticates outbound inquiry email |
| `LEADS_TO_EMAIL` | Yes | Recipient mailbox |
| `LEADS_FROM_EMAIL` | Yes | Sender address authorized in Resend |
| `NEXT_PUBLIC_GA_ID` | No | Enables Google Analytics when set to a valid GA4 ID |

The production inquiry endpoint returns a setup error when email delivery is not configured or Resend rejects the request. A successful Resend API response means the provider accepted the message for delivery; it does not guarantee inbox placement.

The development-only local lead file is ignored by Git and is not durable storage. Do not rely on local filesystem writes in serverless production. If durable lead retention is required, configure an approved database or CRM before launch.

Connect `atalica.com.pk` using the hosting provider’s current domain instructions. DNS and email records are outside this repository and must be reviewed separately; do not remove existing mail records while configuring the website.

## Post-deployment checks

- Confirm `/`, `/projects`, `/services`, `/about`, `/contact`, `/consultation`, and `/privacy` load.
- Confirm `/robots.txt` and `/sitemap.xml` use the production domain.
- Verify the Resend sender and recipient configuration with an explicitly approved test inquiry before accepting live leads.
- Check inquiry delivery and the host’s error logs without logging personal inquiry contents.
- Verify mobile navigation, contact links, WhatsApp, and project filters on a real device.
