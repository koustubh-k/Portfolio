# Portfolio

Modern Next.js portfolio powered by a single content seed file.

## Single Source of Truth

All portfolio text, links, and design tokens are read from:

`./portfolio-content.md`

Update only that file to change portfolio content.

Content blocks currently supported:

- `projects`, `skills`, `experience`, `education`, `achievements`
- `github_projects` (pinned/manual GitHub repo controls)
- `ui` (navigation links, section headings, button labels, helper text)
- `theme` (visual tokens)

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- gray-matter

## Local Setup

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run start
```

## Contact Email Setup

To receive contact form submissions in your inbox, create `.env.local` using `.env.example` and set:

- `RESEND_API_KEY`: API key from Resend
- `CONTACT_FROM_EMAIL`: verified sender in Resend (or `onboarding@resend.dev` for quick testing)
- `CONTACT_TO_EMAIL`: your destination email (defaults to `email` in `portfolio-content.md` if empty)

### Contact setup checklist

1. Create a Resend account and copy your API key.
2. Put the key into `.env.local` as `RESEND_API_KEY`.
3. Keep `CONTACT_FROM_EMAIL` as `onboarding@resend.dev` for testing, or verify your domain in Resend and use your own sender.
4. Set `CONTACT_TO_EMAIL` to your inbox.
5. Restart dev server and submit the Contact form.
6. Check API response in browser network tab if email fails.

## GitHub Pinned Repos Setup

`portfolio-content.md` controls GitHub repo sync via `github_projects`:

- `mode: "pinned_only"`: only pinned repos
- `mode: "pinned_plus_manual"`: pinned repos + `manual_repo_names`
- `mode: "manual_only"`: only `manual_repo_names`
- `exclude_repo_names`: hide selected repos
- `max_items`: cap displayed repos

Optional but recommended:

- `GITHUB_TOKEN`: GitHub token for more reliable pinned repo sync and fewer rate-limit issues

## Deploy to Vercel

```bash
vercel --prod
```
