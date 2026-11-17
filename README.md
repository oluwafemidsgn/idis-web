# IDIS Digital website

Marketing site and content admin for IDIS Digital — Next.js (App Router) + Tailwind CSS 4.

- **Website:** https://idis-web-mu.vercel.app
- **Admin:** `/admin` — blog posts, Works & Campaigns case studies, testimonials and analytics.

## Deploying

The site is hosted on the IDIS Vercel account and connected to this repository:
**every push to `main` deploys automatically.** Content edited in `/admin` goes live
immediately and needs no deploy.

## Configuration (Vercel → Settings → Environment Variables)

| Variable | Purpose |
| --- | --- |
| `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` | Content database (added by the Turso integration) |
| `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` | Admin login |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER` | Image uploads from the admin |

See `.env.example`. Secrets never go in this repository.

## Local development

```bash
npm install
npm run dev
```

Without Turso settings the site uses a local SQLite file (`data/idis.db`), seeded with the
current content on first run. The local admin password is `admin` unless `ADMIN_PASSWORD` is set.
