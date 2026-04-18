# SILORA ORIENT — Dashboard Quickstart
# SILORA ORIENT — 仪表板快速启动指南

**Version · 版本:** 1.0  
**Date · 日期:** April 10, 2026  
**Purpose · 用途:** Your next 10 actions, in exact order. Start here. Everything else can wait.  
**主要用途:** 你的下一步10项行动，按准确顺序排列。从这里开始。其他一切可以等待。

---

## Your Top 5 Actions: Next 48 Hours · 未来48小时的前5项行动

These 5 actions unlock everything else. They are ordered by dependency — do them in sequence.

这5项行动解锁其他所有工作。按依赖关系排序——按顺序执行。

---

### 🔥 Action 1: Set Your GA4 Measurement ID
### 🔥 行动1：设置你的GA4测量ID

**Time needed · 所需时间:** 20 minutes  
**Why first · 为何优先:** Every day without GA4 is data you'll never recover. 30 days of real traffic data is required before Phase 2 analytics review.

**Steps:**
1. Go to [analytics.google.com](https://analytics.google.com)
2. Create an account if you don't have one → New property → "SILORA ORIENT"
3. Navigate: Admin → Data Streams → Web → Add stream → enter `silora-orient.vercel.app`
4. Copy the **Measurement ID** — it looks like `G-XXXXXXXXXX`
5. Open each of these 9 files and replace `G-XXXXXXXXXX` with your real ID:
   - `index.html`
   - `about.html`
   - `collections.html`
   - `other-collections.html`
   - `custom.html`
   - `stories.html`
   - `journal.html`
   - `documentary.html`
   - `contact.html`
6. Search in each file: `G-XXXXXXXXXX` → Replace with: `G-[your real ID]`
7. Push to git:
   ```bash
   git add -A && git commit -m "Set GA4 Measurement ID" && git push
   ```
8. Wait 30 seconds → visit [silora-orient.vercel.app](https://silora-orient.vercel.app)
9. In GA4: Reports → Realtime → confirm your visit appears

**Verify success:** You see your visit in GA4 Real-Time report.

---

### 🔥 Action 2: Activate Mailchimp Newsletter Signup
### 🔥 行动2：激活Mailchimp邮件订阅

**Time needed · 所需时间:** 1 hour  
**Why second · 为何第二:** Every visitor who enters their email before this is active is lost forever. The welcome sequence cannot start until this is live.

**Steps:**
1. Go to [mailchimp.com](https://mailchimp.com) → Create free account
2. Create an audience (your email list) → name it "SILORA ORIENT"
3. Navigate: Account → Extras → API Keys → Create A Key → copy it
4. Find your Audience ID: Audience → Settings → Audience name and defaults → copy the Audience ID
5. Find your data center (DC): look at your API key — the letters after the last `-` are your DC (e.g., `us21`)
6. Go to Vercel dashboard → Your project → Settings → Environment Variables
7. Add these 3 variables:
   - `MAILCHIMP_API_KEY` = `[your API key]`
   - `MAILCHIMP_AUDIENCE_ID` = `[your audience ID]`
   - `MAILCHIMP_DC` = `[your DC, e.g., us21]`
8. Vercel → Deployments → Redeploy latest deployment
9. Go to [silora-orient.vercel.app](https://silora-orient.vercel.app) → enter your personal email in the newsletter box
10. Check Mailchimp → Audience → All contacts → confirm your email appears

**Verify success:** Your email appears in Mailchimp within 30 seconds of subscribing.

---

### 🔥 Action 3: Build Your Airtable Base
### 🔥 行动3：建立你的Airtable数据库

**Time needed · 所需时间:** 2–3 hours  
**Why third · 为何第三:** Every commission inquiry received before Airtable is live is tracked only in your memory. This is your operational backbone.

**Steps:**
1. Go to [airtable.com](https://airtable.com) → Create free account
2. Create a new base → name it "SILORA ORIENT Operations"
3. Build **Table 1: Customers** (26 fields per `admin/airtable-schema.md`)
   - Key fields: Name, Email, Phone, Source, Status, Language, Notes, Date Added
4. Build **Table 2: Commissions** (24 fields per schema)
   - Key fields: Customer (link to Table 1), Status (14-state single select), Piece Description, Total Price, Deposit Amount, Deposit Paid (checkbox), Target Delivery
   - Status options (in order): inquiry → consultation_scheduled → consultation_complete → proposal_sent → approved → deposit_paid → in_production → quality_review → shipped → delivered → followup_sent → story_invited → complete
5. Build **Table 3: B2B Partners** (27 fields per schema)
   - Key fields: Business Name, Category, Email, Website, Aesthetic Fit (Strong/Good/Possible/Weak), Status, Date Contacted
6. Get your API key: Account → Developer Hub → Personal access tokens → Create token (read/write scope on your base)
7. Get your Base ID: open your base → URL shows `airtable.com/[BASE_ID]/...`
8. Add to Vercel Environment Variables:
   - `AIRTABLE_API_KEY` = `[your token]`
   - `AIRTABLE_BASE_ID` = `[your base ID]`

**Verify success:** Base has 3 tables. You can manually create a test record in Customers.

**Full schema reference:** `admin/airtable-schema.md`

---

### 🟡 Action 4: Configure Zapier (Connect Forms to Airtable)
### 🟡 行动4：配置Zapier（将表单连接至Airtable）

**Time needed · 所需时间:** 1–2 hours  
**Why fourth · 为何第四:** Without Zapier, inquiries submitted through your website don't reach Airtable — you'd have to manually copy them.  
**Depends on · 依赖:** Action 3 complete (Airtable base must exist)

**Steps:**
1. Go to [zapier.com](https://zapier.com) → Create free account
2. **Zap 1: Commission Inquiry → Airtable**
   - Trigger: Formspree → New Submission → Form ID: `xlgopzqb`
   - Action 1: Airtable → Create Record → Table: Customers → map fields
   - Action 2: Airtable → Create Record → Table: Commissions → map fields + link to Customer
3. **Zap 2: Contact Form → Airtable Customer Only**
   - Trigger: Formspree → New Submission → Form ID: `xlgopzqb`
   - Filter: Subject contains "contact" (to separate contact from commission)
   - Action: Airtable → Create Record → Table: Customers only
4. Test each Zap: submit the form on your website → check Airtable for new records
5. Turn on both Zaps

**Verify success:** Submit `custom.html` form → see new rows in both Customers + Commissions tables in Airtable.

**Full setup reference:** `admin/zapier-setup.md`

---

### 🟡 Action 5: Set Up Cal.com Booking
### 🟡 行动5：设置Cal.com预约

**Time needed · 所需时间:** 30 minutes  
**Why fifth · 为何第五:** Enables consultation bookings and the workshop page. Currently shows a placeholder on your custom orders page.

**Steps:**
1. Go to [cal.com](https://cal.com) → Create free account
2. Set your username (e.g., `silora-orient` or your name)
3. Create event type: "Commission Consultation" → 30 minutes → your availability
4. Open `custom.html` in your code editor
5. Find the line with `YOUR_CAL_USERNAME` (around line 140)
6. Replace `YOUR_CAL_USERNAME` with your actual Cal.com username
7. Save and push:
   ```bash
   git add custom.html && git commit -m "Activate Cal.com booking embed" && git push
   ```
8. Visit [silora-orient.vercel.app/custom.html](https://silora-orient.vercel.app/custom.html) → confirm booking widget loads

**Verify success:** You can book a test appointment on your own page.

---

## Actions 6–10: Next 2 Weeks · 第6–10项行动：未来2周

After the top 5 are done, continue in this order:

---

### Action 6: Create Stripe Payment Links
### 行动6：创建Stripe支付链接

**Time needed · 所需时间:** 2–3 hours  
**Steps:** Follow `admin/stripe-payment-links.md` exactly — create 6 deposit links + 6 balance links + 3 workshop links. Add real links to your pricing/custom pages.

---

### Action 7: Activate Mailchimp Welcome Email Sequence
### 行动7：激活Mailchimp欢迎邮件序列

**Time needed · 所需时间:** 2–3 hours  
**Depends on:** Action 2 complete (Mailchimp active) + at least 1 real subscriber  
**Steps:** Follow `admin/mailchimp-welcome.md` step by step — 3-email Customer Journey, A/B test on Email 1. Test with personal email before activating.

---

### Action 8: Research + Enter 50 B2B Records
### 行动8：调研并录入50条B2B记录

**Time needed · 所需时间:** 4–5 hours (can split across multiple sessions)  
**Depends on:** Action 3 complete (Airtable active)  
**Categories:** 15 NYC boutiques + 10 concept stores + 10 galleries + 10 cultural institutions + 5 stylists  
**Search terms:** `admin/dashboard-checklist.md` → Section 2, Task B2B-S03  
**Minimum fields per record:** Business Name, Email, Category, Aesthetic Fit, Status = Discovered

---

### Action 9: Send First B2B Outreach Batch
### 行动9：发送首批B2B外联邮件

**Time needed · 所需时间:** 3–4 hours  
**Depends on:** Action 8 complete (50 B2B records in Airtable)  
**Steps:**
1. Sort Airtable B2B Partners by Aesthetic Fit = Strong first
2. Write 15–20 personalized emails using templates in `admin/sales-pipeline-template.md` Part 2.4
3. Personalize each: mention something specific about their store or work
4. Send from your brand email (not personal Gmail)
5. Update Airtable: change Status from Discovered → Outreach Sent; add contact date

---

### Action 10: Ask Claude to Build the Static Dashboard
### 行动10：请Claude构建静态仪表板

**Time needed · 所需时间:** 10 min (you) + Claude builds + 30 min review  
**What you get:** Working `dashboard.html` with all 5 panels, collapsible, PDF/CSV/Obsidian export — usable today, no API required  
**How to ask:** Say to Claude: *"Build the static dashboard.html as described in Track A of docs/dashboard-phase-3-roadmap.md. Include all 5 panels with the data from admin/dashboard-checklist.md, admin/sales-pipeline-template.md, and admin/supplier-coord-workflow.md. Use brand CSS variables from styles.css."*

---

## Quick Reference: What Unlocks What · 速查：什么解锁什么

```
Action 1 (GA4 ID)
  └── Unlocks: Real traffic data → Panel 5 Strategy metrics (30 days later)

Action 2 (Mailchimp active)
  └── Unlocks: Newsletter signups work → Action 7 (welcome sequence)
               → Panel 1 subscriber count
               → Eventually: Phase 2 quarterly issue

Action 3 (Airtable built)
  ├── Unlocks: Action 4 (Zapier connects forms to Airtable)
  ├── Unlocks: Action 8 (B2B database)
  ├── Unlocks: Panel 3 (real pipeline data)
  └── Unlocks: Phase 3A (Airtable bridge)

Action 4 (Zapier active)
  └── Unlocks: Commission inquiries auto-tracked → Panel 3 B2C numbers

Action 5 (Cal.com active)
  └── Unlocks: Booking widget works on custom.html
               → Phase 2: workshops.html page

Action 6 (Stripe links)
  └── Unlocks: Commission payments → Panel 3 revenue tracking

Action 7 (Welcome sequence)
  └── Unlocks: Every subscriber gets 3 nurture emails → Panel 5 email metrics
               → Phase 2 quarterly issue (needs 50+ subscribers)

Action 8 (50 B2B records)
  └── Unlocks: Action 9 (first outreach batch) → Panel 3 B2B pipeline

Action 9 (First outreach)
  └── Unlocks: Panel 5 B2B channel response rates
               → Real B2B relationship data

Action 10 (Static dashboard)
  └── Unlocks: Visible brand operating system — all work tracked in one place
               → Foundation for Phase 3A Next.js dashboard
```

---

## How to Update the Dashboard (Before Phase 3A) · 如何更新仪表板（第3A阶段前）

Until the Phase 3A Next.js dashboard is live, `dashboard.html` uses manually updated data. Here's how to keep it current:

**Weekly update routine (15 minutes every Monday):**

1. Open `dashboard-data.js` in your editor
2. Update `pipeline.b2c` numbers (count your current leads at each stage)
3. Update `pipeline.b2b` numbers (count your B2B contacts at each stage)
4. Update `metrics` block (subscriber count from Mailchimp, revenue from Stripe)
5. Add any new supplier projects to the `supplierProjects` array
6. Check off completed tasks: find the task in the `tasks` array → set `status: 'done'`
7. Push:
   ```bash
   git add dashboard-data.js && git commit -m "Weekly dashboard update" && git push
   ```

**When Claude completes a task:**
Claude will update the relevant `docs/phase-*-status.md` file. You then update the corresponding task in `dashboard-data.js` to reflect the completion.

---

## Obsidian Sync Routine · Obsidian同步常规

**Daily (2 minutes):**
- After completing any task: click [Export to Obsidian] on that task card in `dashboard.html`
- Save the downloaded `.md` file to your Obsidian vault: `/SILORA ORIENT/Tasks/Completed/`

**Weekly (5 minutes, every Monday):**
- Click [Export All Panels] to download full dashboard snapshot
- Save to Obsidian vault: `/SILORA ORIENT/Weekly Reviews/[date]-dashboard.md`
- Add your own notes: what worked, what didn't, what to change

**Obsidian vault structure recommended:**
```
SILORA ORIENT/
├── Weekly Reviews/
│   └── 2026-04-14-dashboard.md
├── Tasks/
│   ├── Active/
│   └── Completed/
├── Supplier Projects/
│   ├── Sapphire-Orchid.md
│   └── Rose-Gold-Memory.md
├── B2B/
│   └── Outreach-Log.md
└── Strategy/
    └── Monthly-Signal-Review.md
```

---

## If Something Isn't Working · 如果出现问题

| Problem | Most likely cause | Quick fix |
|---------|------------------|-----------|
| Newsletter signup shows error | Mailchimp env vars not set or Vercel not redeployed | Redo Action 2 step 6–8 |
| GA4 Real-Time shows nothing | Wrong Measurement ID or Vercel not redeployed | Verify ID in GA4; check HTML file has correct ID |
| Zapier Zap fails | Airtable field names don't match exactly | Check field names in Airtable match exactly what Zapier is mapping to |
| Cal.com widget blank | Wrong username in `custom.html` | Verify username at cal.com/[username]; update HTML |
| Dashboard.html doesn't exist yet | Action 10 not done | Ask Claude to build it |
| Stripe payment link goes nowhere | Links not created yet | Do Action 6 |

---

## Your Brand Operating System at Full Activation · 完全激活后的品牌运营系统

When all 10 actions are complete, here's what's running:

```
VISITOR LANDS ON SITE
  ↓
GA4 tracks every page, every click, every event ──────────────→ Panel 5

VISITOR SUBSCRIBES
  ↓
Mailchimp captures email ──────────────────────────────────────→ Panel 1 (subscriber count)
  ↓
Welcome email sequence fires automatically (Emails 1, 2, 3) ──→ Panel 5 (email metrics)

VISITOR BOOKS CONSULTATION
  ↓
Cal.com books slot ────────────────────────────────────────────→ Panel 3 (bookings)
  ↓
You consult → send quote → client pays deposit via Stripe ────→ Panel 3 (revenue)
  ↓
Airtable tracks commission through 14 stages ─────────────────→ Panel 4 (supplier project)
  ↓
Piece delivered → invite story ───────────────────────────────→ Panel 2 (content task)

FOUNDER DOES B2B OUTREACH
  ↓
Records in Airtable B2B table ────────────────────────────────→ Panel 3 (B2B pipeline)
  ↓
Reply tracked + call scheduled ───────────────────────────────→ Panel 5 (response rate by channel)

CLAUDE COMPLETES A TASK
  ↓
Updates docs/phase-*-status.md ───────────────────────────────→ Panel 1 (auto-updated)
  ↓
Founder marks task done in dashboard ─────────────────────────→ Panel 2 (checked off)
  ↓
Exported to Obsidian ─────────────────────────────────────────→ Permanent record
```

**This is your brand operating system. Every thread visible. Every decision trackable.**  
**这是你的品牌运营系统。每条线索可见。每个决策可追踪。**

---

*Document version: 1.0 · April 10, 2026*  
*Start here. Everything else follows.*
