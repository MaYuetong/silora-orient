# Silora Orient — CLAUDE.md

Static HTML/CSS/JS site (no build step). All files at repo root.

## Stack
- Styles: `styles.css` (single file, CSS custom properties)
- Scripts: `main.js` (animations, i18n, modals)
- Fonts: Cormorant Garamond (serif) + Jost (sans) — Google Fonts import
- Forms: Formspree endpoint `xlgopzqb` (`https://formspree.io/f/xlgopzqb`)
- Deploy: Vercel auto-deploy via GitHub Actions on push to `main`

## Key patterns
- `data-i18n="nav.home"` — bilingual; translations in `content/translations.json`
- Language stored in `localStorage('silora-lang')` — `en` or `zh`
- `content/*.json` — all editable content (collections, videos, translations, stories)
- Scroll reveal: add class `reveal` (and optionally `reveal-delay-1/2/3/4`) to any element
- Modals: injected by `main.js` (`injectModals()`); pricing modal uses `.btn-pricing[data-product]`

## Nav template (copy for new pages)
```html
<ul class="nav-links">
  <li><a href="index.html"            class="nav-link" data-i18n="nav.home">Home</a></li>
  <li><a href="about.html"            class="nav-link" data-i18n="nav.our_story">Our Story</a></li>
  <li><a href="collections.html"      class="nav-link" data-i18n="nav.collections">Collections</a></li>
  <li><a href="other-collections.html"class="nav-link" data-i18n="nav.other_collections">Other Collections</a></li>
  <li><a href="journal.html"          class="nav-link" data-i18n="nav.journal">Journal</a></li>
  <li><a href="stories.html"          class="nav-link" data-i18n="nav.stories">Stories</a></li>
  <li><a href="contact.html"          class="nav-link" data-i18n="nav.contact">Contact</a></li>
</ul>
```
Add `class="nav-link active"` on the current page link.
Mobile menu mirrors same links inside `<div class="mobile-menu" id="mobileMenu">`.

## How to add a collection (other-collections.html)
Open `other-collections.html`, find the `COLLECTIONS` array in the `<script>` block. Add one object:
```js
{
  id: 'unique-id',
  series: 'Series label EN', series_zh: '系列标签',
  title: 'Collection Name', title_zh: '系列名称',
  tagline: 'One-line description.', tagline_zh: '一句话描述。',
  story: 'Full story EN (use \\n\\n for paragraphs).',
  story_zh: '完整故事中文',
  image: 'images/your-image.jpg',  // or null for placeholder
  tags: ['Tag1', 'Tag2']
}
```
Card and modal auto-render. No HTML changes needed.

## How to add a customer story
Edit `content/customer-stories.json`. Copy an existing object, change fields. Set `"featured": true` on the one to highlight. Page auto-renders.

## How to update documentary videos
Edit `content/documentary-content.json`. Set `video_url` to YouTube embed URL (`https://www.youtube.com/embed/VIDEO_ID`), set `show_placeholder: false`.

## Deploy
```bash
git add -A && git commit -m "description" && git push
```
Vercel auto-deploys within 30 seconds.

Manual deploy (no GitHub push needed):
```bash
npx vercel --token YOUR_VERCEL_TOKEN --scope yuetongma0107-6224s-projects --prod --yes
```
*(Store the real token in GitHub Actions secret `VERCEL_TOKEN` — never hardcode it here)*

## Vercel / deployment IDs
- Project ID: `prj_DN5UT9QgOIjH7iglkh8l7SunT3Mw`
- Org ID: `team_wvSHIRMeGmTf6MA6Lv4qoftJ`
- Scope: `yuetongma0107-6224s-projects`
- Live URL: https://silora-orient.vercel.app

## Colors (CSS vars)
`--gold: #BF9D6A` · `--gold-light: #D4B482` · `--ivory: #FAF7F2` · `--cream: #F2EDE5`
`--text-dark: #2A2724` · `--text-mid: #5C5650` · `--text-light: #9C9690` · `--border: #E8E2D8`
