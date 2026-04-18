# SILORA ORIENT — Sales Pipeline Template
# SILORA ORIENT — 销售管道模板

**Version · 版本:** 1.0  
**Date · 日期:** April 2026 · 2026年4月  
**Purpose · 用途:** Complete tracking structure for B2C commissions and B2B partnerships. Powers Panel 3 of the Brand Operating Dashboard.  
**主要用途:** B2C定制委托和B2B合作关系的完整追踪结构。驱动品牌运营仪表板第3面板。

---

## Part 1: B2C Commission Pipeline · B2C定制委托管道

### 1.1 Stage Definitions · 阶段定义

Every B2C inquiry flows through 8 stages. Each stage has clear entry criteria, time limits, and a specific action.

每个B2C询价通过8个阶段流转。每个阶段有明确的进入条件、时限和具体操作。

| Stage · 阶段 | Entry Criteria · 进入条件 | Max Time · 最大时长 | Required Action · 必要操作 |
|-------------|--------------------------|--------------------|-----------------------------|
| **1. New Inquiry** · 新询价 | First contact received (DM, email, form) | 24 hours | Respond personally; understand their vision |
| **2. Consultation** · 咨询中 | Reply sent; client is engaged | 7 days | Ask about eyes, memories, what the piece means |
| **3. Consultation Complete** · 咨询完成 | Story understood; enough to design | 3 days | Internal: sketch concept; prepare quote |
| **4. Quote Sent** · 报价已发 | Formal quote delivered to client | 7 days | Follow up day 5 if no response |
| **5. Deposit Paid** · 定金已付 | Deposit Stripe payment confirmed | 2 days | Confirm production timeline; send schedule |
| **6. In Production** · 生产中 | Supplier has started work | Per timeline | Mid-point check-in; update client weekly |
| **7. Quality Review** · 质检 | Piece received from supplier | 3 days | Review against original vision; approve or request revision |
| **8. Shipped → Delivered** · 已发货→已交付 | Shipped to client | Track to delivery | Confirm receipt; invite to share story |

### 1.2 B2C Pipeline Snapshot · B2C管道快照

Update this table weekly (every Monday):

| Date | Stage 1: New Inquiry | Stage 2–3: Consulting | Stage 4: Quoted | Stage 5: Deposit | Stage 6: Production | Stage 7–8: Delivery |
|------|---------------------|----------------------|-----------------|------------------|--------------------|--------------------|
| Apr 10, 2026 | 0 | 0 | 0 | 0 | 0 | 0 |
| Apr 17, 2026 | | | | | | |
| Apr 24, 2026 | | | | | | |
| May 1, 2026 | | | | | | |

### 1.3 Individual Commission Tracker · 个人委托追踪

Use one row per commission. Pre-Airtable: maintain this table. Post-Airtable: this mirrors the Airtable Commissions view.

| Commission ID | Client Name | Stage | Piece Description | Quote Value | Deposit Paid | Balance Due | Target Delivery | Notes |
|--------------|-------------|-------|-------------------|-------------|--------------|-------------|-----------------|-------|
| COM-001 | — | — | — | — | — | — | — | — |

**Commission ID format:** `COM-[year]-[3-digit sequence]`  
Example: `COM-2026-001`

### 1.4 B2C Conversion Metrics · B2C转化指标

Track weekly. Calculate after minimum 20 total inquiries for meaningful rates.

| Funnel Stage | Count (cumulative) | Conversion Rate | Target Rate |
|-------------|-------------------|-----------------|-------------|
| Total inquiries received | 0 | — | — |
| Consultations completed | 0 | 0% inquiry → consult | >70% |
| Quotes sent | 0 | 0% consult → quote | >80% |
| Deposits received | 0 | 0% quote → deposit | >33% |
| Successfully delivered | 0 | 0% deposit → delivered | >95% |

**Revenue by quarter:**

| Quarter | Deposits | Balances | Workshop | Total |
|---------|----------|----------|----------|-------|
| Q1 2026 | $0 | $0 | $0 | $0 |
| Q2 2026 | $0 | $0 | $0 | $0 |
| Q3 2026 | $0 | $0 | $0 | $0 |
| Q4 2026 | $0 | $0 | $0 | $0 |

### 1.5 B2C Pricing Reference · B2C定价参考

Full payment links in `admin/stripe-payment-links.md`. Summary:

| Tier | Deposit | Balance | Total Range | Example Piece |
|------|---------|---------|-------------|---------------|
| Tier 1 | $150 | $150 | $300 | Simple single-gemstone earrings |
| Tier 2 | $250 | $250 | $500 | Two-gemstone earrings or simple pendant |
| Tier 3 | $350 | $350 | $700 | Complex earrings or layered pendant |
| Tier 4 | $500 | $500 | $1,000 | Statement piece or full set |
| Tier 5 | $750 | $750 | $1,500 | Heirloom commission |
| Tier 6 | $1,000 | $1,000 | $2,000+ | Fully custom, multi-consultation |

### 1.6 B2C Weekly Action Cadence · B2C每周行动节奏

| Day | Action |
|-----|--------|
| Monday | Review pipeline; follow up all open stages stuck >3 days |
| Tuesday | New inquiry outreach (DM/email 10 new contacts) |
| Wednesday | Send quotes for consultations completed this week |
| Thursday | Follow up on quotes sent with no reply |
| Friday | Log all updates in Airtable; note this week's conversions |
| Weekend | No scheduled outreach; respond to inbound only |

---

## Part 2: B2B Partnership Pipeline · B2B合作伙伴管道

### 2.1 Stage Definitions · 阶段定义

| Stage · 阶段 | Entry Criteria · 进入条件 | Max Time · 最大时长 | Required Action · 必要操作 |
|-------------|--------------------------|--------------------|-----------------------------|
| **1. Discovered** · 已发现 | Business researched; basic info recorded | — | Qualify: aesthetic fit? contactable email? |
| **2. Qualified** · 已筛选 | Strong aesthetic fit confirmed; email found | 7 days | Move to Outreach Queue |
| **3. Outreach Sent** · 已外联 | Personalized intro email delivered | 7 days | Track open/delivery; follow up day 7 if no reply |
| **4. Follow-up Sent** · 已跟进 | First follow-up sent (day 7) | 7 days | Maximum 1 more follow-up then mark Stale |
| **5. Replied** · 已回复 | Any response received (positive or negative) | 48 hours | Respond within 48hr; propose intro call if positive |
| **6. Intro Call Scheduled** · 通话已安排 | Call confirmed on Cal.com or email | Per call date | Prepare: review their store, prepare lookbook |
| **7. Proposal Sent** · 提案已发 | Formal partnership proposal delivered | 14 days | Follow up day 10 if no response |
| **8. Negotiating** · 谈判中 | Active discussion on terms | Per discussion | Respond promptly; document all agreements |
| **9. Partner** · 已成为合作伙伴 | Agreement confirmed | — | Onboard; set review cadence |
| **Stale** · 已停滞 | No reply after 2 follow-ups | — | Archive; re-approach in 6 months if still relevant |

### 2.2 B2B Pipeline Snapshot · B2B管道快照

Update weekly:

| Date | Discovered | Qualified | Outreach Sent | Replied | Call / Proposal | Partner | Stale |
|------|------------|-----------|---------------|---------|-----------------|---------|-------|
| Apr 10, 2026 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Apr 17, 2026 | | | | | | | |
| Apr 24, 2026 | | | | | | | |

### 2.3 B2B Contact Master List · B2B联系方式主列表

Pre-Airtable: use this table (add rows). Post-Airtable: maintained there.

| ID | Business Name | Category | City | Email | Aesthetic Fit | Stage | Date Contacted | Last Contact | Notes |
|----|--------------|----------|------|-------|---------------|-------|----------------|-------------|-------|
| B2B-001 | — | — | NYC | — | — | Discovered | — | — | — |

**B2B ID format:** `B2B-[year]-[3-digit sequence]`  
**Category options:** Boutique / Concept / Gallery / Cultural / Stylist  
**Aesthetic Fit:** Strong / Good / Possible / Weak

### 2.4 Outreach Email Templates · 外联邮件模板

Use as base; personalize each email with 2–3 specific details about the recipient's store/work.

**Template A: Boutique Introduction · 精品店介绍**

```
Subject: SILORA ORIENT — Handcrafted botanical jewelry, NYC introduction

Dear [Name],

I came across [Store Name] through [specific detail — their Instagram, a feature, a referral],
and was drawn immediately to [specific aesthetic quality you noticed].

I'm [Founder name], founder of SILORA ORIENT — a studio making handcrafted botanical
jewelry from silk flower techniques rooted in Chinese craft tradition. Each piece starts
with a conversation about the wearer: what they see, what they remember, what a flower
means to them. The result is something made for the specific person, not a general style.

I think [Store Name]'s customers might respond to that kind of intentionality.

If you'd be open to seeing a lookbook, or a brief call — I'd love to explore whether
there's a fit. No pressure either way.

Warm regards,
[Founder name]
SILORA ORIENT · silora-orient.vercel.app
```

**Template B: Stylist Introduction · 造型师介绍**

```
Subject: SILORA ORIENT jewelry — collaboration inquiry

Hi [Name],

I've been following your work for a while — particularly [specific editorial or look].
The way you use [specific aesthetic quality] stood out to me as having real alignment
with what we make.

SILORA ORIENT makes handcrafted botanical jewelry — each piece designed around the
specific person who will wear it. Not mass-produced; made slowly, with intention.

I'd love to send you a piece to work with, or set up a time to talk. Happy to share
a lookbook first if that's easier.

Best,
[Founder name]
SILORA ORIENT · silora-orient.vercel.app
```

**Template C: Gallery / Cultural Institution · 画廊/文化机构**

```
Subject: SILORA ORIENT — craft jewelry, potential exhibition or shop interest

Dear [Name / Curator],

[Institution name]'s focus on [specific focus — Asian craft, contemporary jewelry,
handmade work] brought SILORA ORIENT to mind.

We make botanical jewelry rooted in Chinese silk flower (绢花) craft tradition,
reinterpreted for contemporary wearers. Each piece is handmade and commission-designed —
the maker and the wearer in direct conversation.

I'd be glad to share more about the studio practice and whether there might be a fit —
whether for the shop, an exhibition context, or simply an introduction.

With respect,
[Founder name]
SILORA ORIENT · silora-orient.vercel.app
```

### 2.5 B2B Conversion Metrics · B2B转化指标

| Funnel Stage | Count (cumulative) | Rate | Target |
|-------------|-------------------|------|--------|
| Total discovered | 0 | — | 50 (Phase 2) |
| Qualified (strong fit + email) | 0 | 0% | >60% |
| Outreach sent | 0 | 0% of qualified | 100% |
| Reply received | 0 | 0% of sent | >25% boutiques; >40% stylists |
| Intro call completed | 0 | 0% of replied | >60% |
| Proposal sent | 0 | 0% of calls | >80% |
| Partner signed | 0 | 0% of proposals | >30% |

### 2.6 B2B Channel Performance Log · B2B渠道表现记录

Update monthly with real data:

| Channel | Outreach Sent | Replied | Rate | Notes | Strategy Adjustment |
|---------|--------------|---------|------|-------|---------------------|
| Boutiques | 0 | 0 | — | — | — |
| Concept stores | 0 | 0 | — | — | — |
| Galleries | 0 | 0 | — | — | — |
| Cultural institutions | 0 | 0 | — | — | — |
| Stylists | 0 | 0 | — | — | — |

### 2.7 B2B Weekly Action Cadence · B2B每周行动节奏

| Day | Action |
|-----|--------|
| Monday | Review pipeline; identify contacts stuck >7 days → send follow-up |
| Tuesday | Research 10 new targets; enter in Airtable or table above |
| Wednesday | Write and send 5 personalized outreach emails from Outreach Queue |
| Thursday | Respond to any replies within 24hr; schedule calls |
| Friday | Log all updates; calculate weekly response rate by channel |

---

## Part 3: Revenue Tracking · 收入追踪

### 3.1 Monthly Revenue Log · 月度收入记录

| Month | Commission Deposits | Commission Balances | Workshop Revenue | Total | vs. Prior Month |
|-------|---------------------|--------------------|-----------------:|-------|-----------------|
| Apr 2026 | $0 | $0 | $0 | $0 | — |
| May 2026 | | | | | |
| Jun 2026 | | | | | |
| Q2 2026 | | | | | |

### 3.2 Commission Value Distribution · 委托价值分布

Track which tiers clients choose — informs pricing strategy.

| Tier | Total Price Range | Count This Quarter | % of Total |
|------|------------------|-------------------|------------|
| Tier 1 | $300 | 0 | — |
| Tier 2 | $500 | 0 | — |
| Tier 3 | $700 | 0 | — |
| Tier 4 | $1,000 | 0 | — |
| Tier 5 | $1,500 | 0 | — |
| Tier 6 | $2,000+ | 0 | — |

### 3.3 Pipeline Value (Weighted) · 加权管道价值

Conservative estimate of expected revenue from current pipeline:

| Stage | Count | Avg Value | Probability | Weighted Value |
|-------|-------|-----------|-------------|----------------|
| Consulting | 0 | $700 | 30% | $0 |
| Quote sent | 0 | $700 | 50% | $0 |
| Deposit paid | 0 | $700 | 95% | $0 |
| **Total pipeline** | | | | **$0** |

---

## Part 4: Lead Source Tracking · 线索来源追踪

Understanding where inquiries originate drives content and outreach decisions.

| Source | B2C Inquiries | B2B Contacts | Notes |
|--------|--------------|--------------|-------|
| Instagram DM | 0 | 0 | — |
| Website contact form | 0 | 0 | — |
| Referral (existing client) | 0 | 0 | — |
| Workshop attendee | 0 | 0 | — |
| Cold outreach (B2B only) | — | 0 | — |
| Other | 0 | 0 | — |

*Review monthly. Double down on highest-performing sources.*

---

## Part 5: Airtable Integration Notes · Airtable集成说明

Once Airtable is active (Phase 1 P0-C), all tables in this document are superseded by Airtable views. This document becomes a reference for field definitions and logic, not the live data source.

**Airtable views to create for this pipeline:**

| View Name | Table | Filters | Sort | Purpose |
|-----------|-------|---------|------|---------|
| B2C Active Pipeline | Commissions | Status ≠ Complete, ≠ Archived | Stage ascending | Weekly review |
| Quotes Pending | Commissions | Status = proposal_sent | Date sent ascending | Follow-up triggers |
| Deposits Received | Commissions | Status = deposit_paid | Date ascending | Production scheduling |
| B2B Outreach Queue | B2B Partners | Status = Qualified | Aesthetic Fit desc | Who to email next |
| B2B Active | B2B Partners | Status ≠ Stale, ≠ Discovered | Stage ascending | Relationship management |
| Revenue This Month | Commissions | Deposit date = this month | Value desc | Revenue tracking |

---

*Document version: 1.0 · April 2026*  
*Feeds Panel 3 of `docs/brand-operating-dashboard.md`*  
*Data source post-Airtable: Airtable Customers + Commissions + B2B Partners tables*
