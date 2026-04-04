# Silora Orient — Website

Handmade silk flower jewelry brand. Born in China, now in New York.

**Live site:** https://silora-orient.vercel.app

---

## Project Structure

```
silora-orient/
├── index.html               Homepage
├── about.html               Brand story & timeline
├── collections.html         Core collections (Eye Color, Orchid, Mother & Daughter, Wedding)
├── other-collections.html   Extended collections (Flavour Series, Iris, Wisteria, Plum)
├── custom.html              5-step custom order form
├── journal.html             Stories & editorial
├── contact.html             Contact form (Formspree)
├── documentary.html         Documentary video page
├── styles.css               All styles — single source of truth
├── main.js                  Animations, language switcher, modals
├── vercel.json              Vercel deploy config
├── content/
│   ├── collections-data.json    Collection content (add new collections here)
│   ├── documentary-content.json Video content (add video URLs here)
│   └── translations.json        EN / 中文 bilingual text
├── images/                  All product photography
└── .github/workflows/
    └── deploy.yml           Auto-deploy to Vercel on every push
```

---

## How to Run Locally

No build step required — this is a plain HTML/CSS/JS site.

```bash
# Option 1: Python (built-in)
cd silora-orient
python3 -m http.server 8080
# Open http://localhost:8080

# Option 2: Node
npx serve .
```

---

## How to Connect GitHub → Vercel (One-Time Setup)

### Step 1 — Push this repo to GitHub

```bash
cd silora-orient
git remote add origin https://github.com/YOUR_USERNAME/silora-orient.git
git push -u origin main
```

### Step 2 — Add GitHub Secrets

In your GitHub repo → **Settings → Secrets and variables → Actions**, add:

| Secret name | Value |
|---|---|
| `VERCEL_TOKEN` | `vcp_6UOjMAr8XTq39yfbxg4e4yGb1smib3iZGy3rdSFz5AKEwxUPuD37AUvi` |
| `VERCEL_SCOPE` | `yuetongma0107-6224s-projects` |
| `VERCEL_ORG_ID` | `team_wvSHIRMeGmTf6MA6Lv4qoftJ` |
| `VERCEL_PROJECT_ID` | `prj_DN5UT9QgOIjH7iglkh8l7SunT3Mw` |

### Step 3 — Done

Every `git push` to `main` now auto-deploys to https://silora-orient.vercel.app.

---

## How Future Updates Work

### Everyday content edits

| What to update | Which file to edit |
|---|---|
| Collections text | `content/collections-data.json` |
| EN / 中文 translations | `content/translations.json` |
| Documentary videos | `content/documentary-content.json` — paste YouTube embed URL |
| Product images | Drop files in `images/`, reference by filename |
| Contact / pricing emails | Formspree dashboard at formspree.io |
| Instagram QR code | Replace `images/instagram-qr.png` |

### To add a new silk color to the custom order form

Open `custom.html`, find `SILK_COLORS`, and add one line:
```js
{ id: 'coral', label: 'Coral', bg: '#E8836A' },
```
The chip will appear automatically — no other changes needed.

### To add a new collection

1. Add images to `images/`
2. Add an entry to `content/collections-data.json`
3. Add a section to `other-collections.html` (copy an existing section block)
4. `git push` — Vercel deploys automatically

### To publish any change

```bash
git add -A
git commit -m "Your update description"
git push
```
Vercel auto-deploys within ~30 seconds.

---

## China Accessibility — Recommended Architecture

### Current setup
- **Vercel** — international CDN, very fast globally. May be slow or blocked in mainland China.

### Recommended for China: Cloudflare Pages mirror

**Why Cloudflare Pages:**
- Free tier is generous
- Edge nodes throughout Asia (Hong Kong, Singapore, Tokyo, Seoul)
- `*.pages.dev` domains work in mainland China without ICP license (unlike Vercel's `.vercel.app`)
- No separate codebase — the same repo deploys to both
- GitHub Action is already prepared in `.github/workflows/deploy.yml` (uncomment the `deploy-cloudflare` job)

**One-time Cloudflare setup (15 minutes):**
1. Create a free account at cloudflare.com
2. Go to **Pages → Create a project → Connect to Git**
3. Select this GitHub repo, set build settings:
   - Framework: `None`
   - Build command: *(leave blank)*
   - Build output directory: `/`
4. Deploy once manually
5. Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to GitHub Secrets
6. Uncomment the `deploy-cloudflare` job in `.github/workflows/deploy.yml`

After that, every `git push` auto-deploys to **both**:
- `https://silora-orient.vercel.app` (international, fast)
- `https://silora-orient.pages.dev` (China-accessible, no VPN needed)

You maintain **one codebase** — no manual sync.

### Why not GitHub Pages?
GitHub Pages (`.github.io`) is also blocked in mainland China intermittently. Cloudflare Pages has significantly better China connectivity.

### Why not a CDN-only solution?
CDNs like Alibaba Cloud OSS or Tencent Cloud COS require an ICP license for custom domains in China. Cloudflare Pages does not — making it the lowest-friction option for a brand at early stage.

### Font note
Google Fonts (`fonts.googleapis.com`) is blocked in China. The current site imports fonts from Google Fonts. To ensure correct font rendering for Chinese visitors:
- Download `Cormorant Garamond` and `Jost` from Google Fonts
- Put the `.woff2` files in `fonts/`
- Update the `@import` in `styles.css` to use `@font-face` with local files

---

## Deployment Reference

| Platform | URL | Deploy |
|---|---|---|
| Vercel (primary) | https://silora-orient.vercel.app | Auto on push to `main` |
| Cloudflare Pages (China) | https://silora-orient.pages.dev | Auto after setup |
| Manual Vercel deploy | — | `npx vercel --token YOUR_TOKEN --scope yuetongma0107-6224s-projects --prod --yes` |
