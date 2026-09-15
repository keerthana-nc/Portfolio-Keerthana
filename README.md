# Portfolio

Personal site: work, projects, research, contact. Static HTML and CSS, no build step,
hosted on GitHub Pages.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole page. All content lives here. |
| `style.css` | Styles. Colours and spacing are CSS variables at the top. |
| `script.js` | Footer year and left-rail section highlighting. |
| `assets/` | Résumé PDF and any images. |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is. |

## Deploying

1. Push this folder to a public repo (for example `portfolio`).
2. Repo → **Settings** → **Pages**.
3. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Live in about a minute at `https://<username>.github.io/portfolio/`.

Every push to `main` redeploys.

## Before going live

Replace these placeholders in `index.html`:

- `YOUR-EMAIL@example.com` (appears once, in the contact section)
- `YOUR-LINKEDIN` (appears twice)
- Add `assets/Keerthana_Resume.pdf`
- Point each `Repository` link at the actual repo instead of the profile

## Editing later

Content is plain HTML. To add a job, copy an existing `<article class="entry">` block.
To add a project, copy an `<article class="card">` block. Nothing else needs to change.

## Custom domain

Buy a domain, add a `CNAME` file containing just the domain, then set it under
Settings → Pages → Custom domain and add the DNS records GitHub shows you.
