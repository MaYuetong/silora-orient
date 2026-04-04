# Silora Orient — How to Update the Website

A simple guide for non-technical maintenance. You do not need to edit code for any of these tasks.

---

## 1. Add a New Collection to "Other Collections"

**Step 1:** Take your product photos and put them in the `/images/` folder.
Name them clearly: e.g. `peony-blush.jpg`, `wisteria-earrings.jpg`

**Step 2:** Open `content/collections-data.json` in any text editor.

**Step 3:** Copy one of the existing collection entries (from `{` to `},`) and paste it at the end of the list.

**Step 4:** Fill in your details:
```json
{
  "id": "your-collection-id",          ← no spaces, use dashes
  "name": "Collection Name",           ← English name
  "name_zh": "系列中文名",              ← Chinese name
  "subtitle": "Short English subtitle",
  "subtitle_zh": "副标题中文",
  "description": "A few sentences about this collection...",
  "description_zh": "这个系列的中文介绍...",
  "tag": "Flower · Theme",
  "tag_zh": "花种 · 主题",
  "image_folder": "images",
  "images": ["your-image-1.jpg", "your-image-2.jpg"],
  "show_on_main": false
}
```

**Step 5:** Deploy (see Deploy section below).

> Note: The current Other Collections page uses hand-coded sections.
> For automatic rendering from JSON, you would need a developer to add a JS loader.
> The JSON file is ready for that future upgrade.

---

## 2. Update the Documentary Page Videos

**Step 1:** Upload your video to YouTube or Vimeo.

**Step 2:** Get the embed URL:
- YouTube: `https://www.youtube.com/embed/VIDEO_ID`
  (from the YouTube share → Embed menu)
- Vimeo: `https://player.vimeo.com/video/VIDEO_ID`

**Step 3:** Open `documentary.html`.

**Step 4:** Find the comment that says:
```html
<!-- When ready, uncomment and fill in your video URL: -->
```

**Step 5:** Remove the `<!--` and `-->` comment tags, and replace `YOUR_VIDEO_ID` with your actual ID.

**Step 6:** For the short clips, find the comment for each clip:
```html
<!-- <iframe src="https://www.youtube.com/embed/CLIP_1_ID" ...></iframe> -->
```
Uncomment and fill in your video ID.

**Step 7:** Deploy.

---

## 3. Update Bilingual Text (EN / 中文)

**Step 1:** Open `content/translations.json`.

**Step 2:** Find the text you want to change. Each item looks like:
```json
"tagline": {
  "en": "English text here",
  "zh": "中文内容在这里"
}
```

**Step 3:** Edit the `"en"` or `"zh"` value. Keep the quotes.

**Step 4:** Deploy.

---

## 4. Update the Instagram QR Code

**Step 1:** Save your QR code image as: `images/instagram-qr.png`

**Step 2:** Open `contact.html`.

**Step 3:** Find this section:
```html
<!-- Replace this div with your QR code image -->
<div class="qr-placeholder" id="instagram-qr">
  Instagram QR Code Place here
</div>
```

**Step 4:** Replace the `<div>` block with:
```html
<img src="images/instagram-qr.png" alt="Scan to follow on Instagram"
     style="width:120px; height:120px;" />
```

**Step 5:** To update the Instagram handle, find `@siloraorient` on the `contact.html` page and change it.

**Step 6:** Deploy.

---

## 5. Add More Images to a Page

- Product images: put them in `/images/` and reference them with `<img src="images/filename.jpg">`
- The `images/` folder currently has:
  - `orchid-collection.jpg` — the full orchid earring lineup
  - `white-orchid-earrings.jpg` — white pearl orchid earrings
  - `iris-brooch.jpg` — purple iris brooch
  - `orchid-mixed-set.jpg` — yellow/purple mixed jewelry set

---

## 6. Deploy to Vercel (Publish Changes)

Open Terminal and run:
```bash
cd ~/Desktop/work/2026/silora-orient
npx vercel --token vcp_6UOjMAr8XTq39yfbxg4e4yGb1smib3iZGy3rdSFz5AKEwxUPuD37AUvi --yes --scope yuetongma0107-6224s-projects
```

Live URL: **https://silora-orient.vercel.app**

---

## 7. China Access (GitHub Pages Mirror)

For visitors in mainland China who cannot access Vercel, deploy the same files to GitHub Pages.

**One-time setup:** Ask a developer to create a GitHub repo and connect it to GitHub Pages.

**To update:** Run the deploy command and it will publish to both Vercel (international) and GitHub Pages (China-accessible) at the same time.

The website uses no external CDN dependencies that are blocked in China (no Google Fonts CDN that requires VPN — note: Google Fonts may not load in China, so you may want to switch to a self-hosted font file if needed).

---

## File Map

```
silora-orient/
├── index.html              ← Homepage
├── about.html              ← Our Story
├── collections.html        ← Main collections
├── other-collections.html  ← Extended collections
├── custom.html             ← Custom order form
├── journal.html            ← Stories
├── contact.html            ← Contact + Formspree
├── documentary.html        ← Video documentary
├── styles.css              ← All styles (do not edit unless needed)
├── main.js                 ← Animations, modals, language switch
├── vercel.json             ← Deployment config
├── content/
│   ├── collections-data.json    ← Collection content system
│   ├── documentary-content.json ← Video content system
│   └── translations.json        ← EN / 中文 translations
└── images/
    ├── orchid-collection.jpg
    ├── white-orchid-earrings.jpg
    ├── iris-brooch.jpg
    └── orchid-mixed-set.jpg
```
