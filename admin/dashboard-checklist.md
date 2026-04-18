# SILORA ORIENT — Dashboard Task Checklist
# SILORA ORIENT — 仪表板任务清单

**Version · 版本:** 1.0  
**Date · 日期:** April 2026 · 2026年4月  
**Purpose · 用途:** Master task list for Panel 2 of the Brand Operating Dashboard. Founder-editable. All actionable items across B2C, B2B, content, suppliers, and website.  
**主要用途:** 品牌运营仪表板第2面板的主任务列表。创始人可编辑。涵盖B2C、B2B、内容、供应商和网站的所有可操作项目。

---

## How to Use This File · 使用说明

Each task has 6 fields:
- **Priority** 🔥 Critical / 🟡 Important / ⭕ Routine
- **Status** ⬜ Not started / 🔄 In progress / ✅ Done / 🚫 Blocked
- **Owner** Founder / Co-founder / Claude / Auto
- **Due** Specific date, "This week", or "Ongoing"
- **Notes** Any context needed to execute
- **Obsidian** 🔵 Synced / ⚪ Not synced

To mark a task complete: change ⬜ → ✅ and add completion date in Notes.  
To add a new task: copy any row and fill in fields.  
To archive done tasks: move them to the "Completed Archive" section at the bottom.

---

## Section 1: B2C Sales Tasks · B2C销售任务

*Goal: Convert inquiries to commissions. Personal, warm, story-led outreach.*  
*目标：将询价转化为委托。个人化、温暖、以故事为主导的外联。*

### Ongoing Weekly Rhythm · 持续每周节奏

| # | Task | Priority | Status | Owner | Due | Notes | Obsidian |
|---|------|----------|--------|-------|-----|-------|----------|
| B2C-01 | Contact 10 new leads this week — DM or email | 🔥 Critical | ⬜ | Founder | This week | Personalize each message to their aesthetic or a specific piece | ⚪ |
| B2C-02 | Send 3 new commission quotes | 🔥 Critical | ⬜ | Founder | This week | Use pricing reference in `admin/stripe-payment-links.md` | ⚪ |
| B2C-03 | Follow up with 5 pending leads (no reply in 3 days) | 🟡 Important | ⬜ | Founder | This week | Short follow-up: "Still thinking about the piece?" | ⚪ |
| B2C-04 | Follow up with 3 quoted clients (no deposit in 5 days) | 🟡 Important | ⬜ | Founder | This week | Offer to answer questions; remind deposit secures slot | ⚪ |
| B2C-05 | Log all new inquiries in Airtable Customers table | 🟡 Important | 🚫 Blocked | Founder | Ongoing | Blocked: Airtable base not yet built (Phase 1 P0-C) | ⚪ |
| B2C-06 | Update commission stage for all active orders in Airtable | 🟡 Important | 🚫 Blocked | Founder | Ongoing | Blocked: Airtable base not yet built | ⚪ |
| B2C-07 | After delivery: invite customer to share their story | ⭕ Routine | ⬜ | Founder | After each delivery | Reference story intake SOP (Phase 2 Task 2.1.B) | ⚪ |

### One-Time Setup Tasks · 一次性配置任务

| # | Task | Priority | Status | Owner | Due | Notes | Obsidian |
|---|------|----------|--------|-------|-----|-------|----------|
| B2C-S01 | Create Stripe account + 15 payment links | 🔥 Critical | ⬜ | Founder | ASAP | Follow `admin/stripe-payment-links.md` — 6 deposit + 6 balance + 3 workshop | ⚪ |
| B2C-S02 | Create Cal.com account + replace `YOUR_CAL_USERNAME` in `custom.html` | 🟡 Important | ⬜ | Founder | ASAP | Push to git after change; Vercel auto-deploys | ⚪ |
| B2C-S03 | Test booking flow end-to-end: book → receive confirmation | 🟡 Important | ⬜ | Founder | After Cal.com active | Use personal email to test | ⚪ |

---

## Section 2: B2B Sales Tasks · B2B销售任务

*Goal: Build relationships with NYC boutiques, galleries, stylists, cultural institutions.*  
*目标：与纽约精品店、画廊、造型师、文化机构建立关系。*

### Ongoing Weekly Rhythm · 持续每周节奏

| # | Task | Priority | Status | Owner | Due | Notes | Obsidian |
|---|------|----------|--------|-------|-----|-------|----------|
| B2B-01 | Research 10 new NYC B2B targets this week | 🔥 Critical | ⬜ | Founder | This week | Use search terms in `docs/phase-2-status.md` Section 1.2.B | ⚪ |
| B2B-02 | Send 5 personalized intro emails from B2B queue | 🟡 Important | 🚫 Blocked | Founder | After 1.2.B complete | Needs 50 records in Airtable first; use Outreach Queue view | ⚪ |
| B2B-03 | Log all replies + update Airtable status | 🟡 Important | 🚫 Blocked | Founder | Ongoing | Blocked: Airtable B2B table not yet built | ⚪ |
| B2B-04 | Follow up with non-replies (day 7 after initial email) | 🟡 Important | ⬜ | Founder | Ongoing | Short follow-up only; maximum 2 follow-ups per contact | ⚪ |
| B2B-05 | Schedule intro call with any replied contacts | 🔥 Critical | ⬜ | Founder | Within 48hr of reply | Use Cal.com link in signature | ⚪ |
| B2B-06 | Send proposal to interested partners | 🔥 Critical | ⬜ | Founder | After intro call | Tailor proposal to their store aesthetic | ⚪ |
| B2B-07 | Track response rate by channel in Panel 5 | ⭕ Routine | ⬜ | Founder | Weekly | Note which channel (boutique/gallery/stylist) replies most | ⚪ |

### One-Time Setup Tasks · 一次性配置任务

| # | Task | Priority | Status | Owner | Due | Notes | Obsidian |
|---|------|----------|--------|-------|-----|-------|----------|
| B2B-S01 | Build Airtable base with B2B Partners table (27 fields) | 🔥 Critical | ⬜ | Founder | ASAP | Follow `admin/airtable-schema.md` exactly | ⚪ |
| B2B-S02 | Create Outreach Queue view in Airtable (sorted by Aesthetic Fit) | 🟡 Important | ⬜ | Founder | After Airtable built | Filter: Status = Discovered; Sort: Aesthetic Fit = Strong first | ⚪ |
| B2B-S03 | Research + enter 50 initial B2B targets in Airtable | 🟡 Important | ⬜ | Founder | After Airtable built | Target: 15 boutiques, 10 concept, 10 galleries, 10 cultural, 5 stylists | ⚪ |
| B2B-S04 | Write email template library (5 variants for different aesthetics) | ⭕ Routine | ⬜ | Founder | Before first outreach | Personal tone; reference specific work or collection | ⚪ |

---

## Section 3: Content Tasks · 内容任务

*Goal: Maintain consistent brand presence — journal, stories, social, email.*  
*目标：保持一致的品牌呈现——日志、故事、社交媒体、邮件。*

### Ongoing Content Rhythm · 持续内容节奏

| # | Task | Priority | Status | Owner | Due | Notes | Obsidian |
|---|------|----------|--------|-------|-----|-------|----------|
| C-01 | Draft 1 journal entry this month | 🟡 Important | ⬜ | Founder | Monthly | Topics: craft process, material sourcing, collection inspiration | ⚪ |
| C-02 | Publish approved journal entry to `content/journal-content.json` | 🟡 Important | ⬜ | Founder | After draft complete | Claude can format JSON; founder reviews and pushes | ⚪ |
| C-03 | Collect 1 customer story with consent this quarter | 🟡 Important | 🚫 Blocked | Founder | After first delivery | Blocked: need 1 delivered commission first | ⚪ |
| C-04 | Upload 3 new product photos this month | 🟡 Important | ⬜ | Founder | Monthly | `/images/` folder; filename: `[collection]-[item]-[angle].jpg` | ⚪ |
| C-05 | Review all published stories for consent accuracy | ⭕ Routine | ⬜ | Founder | Quarterly | Check `content/customer-stories.json` — all entries need consent confirmed | ⚪ |
| C-06 | Send quarterly email newsletter (dry run first) | 🟡 Important | 🚫 Blocked | Founder | After 50+ subscribers | Blocked: need Mailchimp active + 50+ real subscribers | ⚪ |
| C-07 | Review Mailchimp welcome sequence performance monthly | ⭕ Routine | 🚫 Blocked | Founder | Monthly | Blocked: Mailchimp not yet activated | ⚪ |

### One-Time Content Tasks · 一次性内容任务

| # | Task | Priority | Status | Owner | Due | Notes | Obsidian |
|---|------|----------|--------|-------|-----|-------|----------|
| C-S01 | Activate Mailchimp Customer Journey (3-email welcome sequence) | 🔥 Critical | ⬜ | Founder | After Mailchimp active | Follow `admin/mailchimp-welcome.md` step by step | ⚪ |
| C-S02 | Test welcome sequence with personal email | 🔥 Critical | ⬜ | Founder | After journey activated | Subscribe → confirm Emails 1, 2, 3 arrive on correct days | ⚪ |
| C-S03 | Create `workshops.html` with Cal.com workshop booking embed | 🟡 Important | ⬜ | Claude + Founder | After Cal.com active | Claude writes HTML; founder reviews + pushes | ⚪ |
| C-S04 | Add `workshops.html` link to nav on all 9 pages | 🟡 Important | ⬜ | Claude + Founder | After workshops.html created | Claude edits nav; founder pushes | ⚪ |

---

## Section 4: Supplier Coordination Tasks · 供应商协调任务

*Goal: Keep all active production projects moving. No stage should sit idle >7 days.*  
*目标：保持所有活跃生产项目推进。没有阶段应停滞>7天。*

### Template: Per-Project Checklist · 模板：每项目核查清单

Copy this block for each new commission/collection project:

```
PROJECT: [Name]
CLIENT: [Name or "Brand collection"]
STARTED: [Date]
TARGET DELIVERY: [Date]

[ ] Material samples received from supplier          | Due: __ | Owner: Founder
[ ] Material quality approved                        | Due: __ | Owner: Founder
[ ] Color palette options received                   | Due: __ | Owner: Supplier
[ ] Final color selection made + logged              | Due: __ | Owner: Founder
[ ] Style mockups received                           | Due: __ | Owner: Supplier
[ ] Mockup revisions requested (if needed)           | Due: __ | Owner: Founder
[ ] Final mockup approved                            | Due: __ | Owner: Founder
[ ] Production timeline confirmed with supplier      | Due: __ | Owner: Founder
[ ] In-production check-in (midpoint)                | Due: __ | Owner: Founder
[ ] Finished piece photos received                   | Due: __ | Owner: Supplier
[ ] Photo quality check (per standards below)        | Due: __ | Owner: Founder
[ ] Packaging design confirmed                       | Due: __ | Owner: Founder
[ ] Packaging materials received                     | Due: __ | Owner: Supplier
[ ] Final quality inspection before shipment         | Due: __ | Owner: Founder
[ ] Shipped to client                                | Due: __ | Owner: Supplier/Founder
[ ] Delivery confirmed by client                     | Due: __ | Owner: Client
[ ] Commission status updated to "delivered"         | Due: __ | Owner: Founder (Airtable)
[ ] Story invitation sent to client                  | Due: __ | Owner: Founder
```

### Active Projects Tracker · 活跃项目追踪

| Project | Stage | Last Update | Next Action | Days Since Update |
|---------|-------|-------------|-------------|-------------------|
| Sapphire Orchid | Materials phase | — | Confirm color palette with supplier | — |
| Rose Gold Memory | Materials received | — | Approve rose gold shade samples | — |

*Add rows for each active project.*

### Supplier Contact Log · 供应商联系记录

| Date | Supplier | Channel | Topic | Outcome | Next Step | Next Step Due |
|------|---------|---------|-------|---------|-----------|---------------|
| — | — | — | — | — | — | — |

*Log every supplier communication here. Full workflow in `admin/supplier-coord-workflow.md`.*

### Photo Quality Standards Summary · 照片质量标准摘要

| Category | Minimum Standard |
|----------|-----------------|
| Resolution | 1200×1200px minimum; 3000×3000px preferred |
| Background | Ivory `#FAF7F2` or natural linen; no white |
| Lighting | Natural diffused or studio softbox; no harsh shadows |
| Focus | Tack sharp on the focal element; gemstones show reflections |
| Format | JPG (web) + RAW or TIFF (archive) |
| Composition | Subject fills 60–80% of frame; breathing room on edges |

*Full standards in `admin/supplier-coord-workflow.md`.*

---

## Section 5: Website & Technical Tasks · 网站与技术任务

*Goal: Complete Phase 1 activation. Every item here unblocks downstream work.*  
*目标：完成第一阶段激活。此处每项解锁下游工作。*

| # | Task | Priority | Status | Owner | Due | Notes | Obsidian |
|---|------|----------|--------|-------|-----|-------|----------|
| W-01 | Replace `G-XXXXXXXXXX` with real GA4 ID in all 9 HTML files → push | 🔥 Critical | ⬜ | Founder | ASAP | GA4 Console → Admin → Data Streams → copy Measurement ID | ⚪ |
| W-02 | Create Mailchimp account → get API key → set 3 Vercel env vars | 🔥 Critical | ⬜ | Founder | ASAP | Vars: `MAILCHIMP_API_KEY`, `MAILCHIMP_AUDIENCE_ID`, `MAILCHIMP_DC` | ⚪ |
| W-03 | Redeploy Vercel after setting env vars | 🔥 Critical | ⬜ | Founder | After W-02 | Dashboard → Project → Deployments → Redeploy latest | ⚪ |
| W-04 | Test newsletter signup: enter email on homepage → check Mailchimp audience | 🔥 Critical | ⬜ | Founder | After W-03 | Subscribe with personal email; confirm it appears in Mailchimp within 30s | ⚪ |
| W-05 | Build Airtable base per `admin/airtable-schema.md` (3 tables) | 🔥 Critical | ⬜ | Founder | ASAP | Tables: Customers (26 fields), Commissions (24 fields), B2B Partners (27 fields) | ⚪ |
| W-06 | Configure Zapier Zap 1: Formspree → Airtable Customer + Commission | 🔥 Critical | ⬜ | Founder | After W-05 | Follow `admin/zapier-setup.md` exactly | ⚪ |
| W-07 | Configure Zapier Zap 2: Formspree contact → Airtable Customer only | 🟡 Important | ⬜ | Founder | After W-05 | Filter: subject contains "contact"; maps to Customer table only | ⚪ |
| W-08 | Test Zapier: submit `custom.html` form → verify Airtable rows created | 🔥 Critical | ⬜ | Founder | After W-06 | Submit test commission; check Airtable for both Customer + Commission records | ⚪ |
| W-09 | Create Cal.com account → set username → replace in `custom.html` → push | 🟡 Important | ⬜ | Founder | ASAP | Replace `YOUR_CAL_USERNAME` in custom.html line ~140 | ⚪ |
| W-10 | Create Stripe account → 15 payment links per `admin/stripe-payment-links.md` | 🟡 Important | ⬜ | Founder | ASAP | 6 deposit + 6 balance + 3 workshop; update pricing page with real links | ⚪ |
| W-11 | Verify all 9 pages: nav links correct, fonts loading, no console errors | ⭕ Routine | ⬜ | Founder | After all above | Open each page in Chrome → DevTools → console tab | ⚪ |
| W-12 | Check GA4 Real-Time report: confirm events firing | 🟡 Important | ⬜ | Founder | 24hr after W-01 | GA4 → Reports → Realtime; visit site → confirm `page_view` appears | ⚪ |

---

## Section 6: Phase 3 Dashboard Tasks · 第三阶段仪表板任务

*Goal: Build the interactive Brand Operating Dashboard. Begins after Phase 1 active + Phase 2 data flowing.*  
*目标：构建交互式品牌运营仪表板。在第一阶段激活且第二阶段数据流动后开始。*

| # | Task | Priority | Status | Owner | Due | Notes | Obsidian |
|---|------|----------|--------|-------|-----|-------|----------|
| D-01 | Create static `dashboard.html` (interim — works now, no API) | 🟡 Important | ⬜ | Claude | This week | 5 panels, localStorage state, PDF/CSV/Obsidian export | ⚪ |
| D-02 | Engage Next.js developer for Phase 3A | 🟡 Important | ⬜ | Founder | After Phase 2 active | Brief using `docs/dashboard-architecture.md` + `docs/phase-3-roadmap.md` | ⚪ |
| D-03 | Complete Phase 1 prerequisite checklist for Phase 3 | 🔥 Critical | ⬜ | Founder | Before Phase 3 dev starts | All 7 prerequisites in `docs/phase-3-roadmap.md` Section "Prerequisites" | ⚪ |
| D-04 | Phase 3A: Next.js scaffold + Supabase Auth | ⭕ Routine | ⬜ | Developer | Phase 3A Week 1 | See `docs/dashboard-phase-3-roadmap.md` | ⚪ |
| D-05 | Phase 3A: Airtable bridge API routes | ⭕ Routine | ⬜ | Developer | Phase 3A Week 2 | See `docs/dashboard-phase-3-roadmap.md` | ⚪ |

---

## Completed Archive · 已完成存档

Move completed tasks here with completion date and any notes.

| Task ID | Task | Completed | Notes |
|---------|------|-----------|-------|
| INFRA | Vercel deploy pipeline fix | Apr 6, 2026 | Fixed vercel.json + CommonJS conversion |
| P0-A (Claude) | GA4 script added to all 9 HTML pages | Apr 7, 2026 | Measurement ID placeholder; awaiting real ID from founder |
| P0-B (Claude) | Mailchimp subscribe API (`api/subscribe.js`) | Apr 7, 2026 | Env vars needed from founder |
| P0-C (Claude) | Airtable schema documented | Apr 7, 2026 | `admin/airtable-schema.md`; founder builds base |
| P1-A (Claude) | Zapier setup guide created | Apr 8, 2026 | `admin/zapier-setup.md`; founder activates |
| P1-B (Claude) | Cal.com embed in `custom.html` | Apr 8, 2026 | Username placeholder; founder sets real username |
| P1-C (Claude) | Stripe payment links documented | Apr 8, 2026 | `admin/stripe-payment-links.md`; founder creates links |
| 1.2.A (Claude) | Mailchimp welcome email copy + setup | Apr 8, 2026 | `admin/mailchimp-welcome.md`; founder activates in Mailchimp |

---

*Document version: 1.0 · April 2026*  
*This file is Panel 2 of the Brand Operating Dashboard — `docs/brand-operating-dashboard.md`*
