# SILORA ORIENT — Airtable Base Schema
# Airtable 数据库结构定义

**Base name · 数据库名称:** `SILORA ORIENT — Operations`  
**Version · 版本:** 1.0 · April 2026  
**Purpose · 用途:** Phase 1 operational backend — commissions, customers, B2B pipeline  
**Setup time estimate · 预计配置时间:** 2–3 hours

---

## How to set up · 配置步骤

1. Go to airtable.com → Create a new base
2. Name it exactly: **SILORA ORIENT — Operations**
3. Create the three tables below in order (Customers first — Commissions links to it)
4. For each table, delete Airtable's default fields and add the fields listed
5. After creating all tables, set up the linked record fields and views

---

## Table 1: Customers · 客户表

**Purpose · 用途:** Master record for every person who has contacted, commissioned, or subscribed. Community portrait, not a transaction log.

| Field Name | Airtable Field Type | Options / Notes |
|-----------|--------------------|--------------  |
| **Name** *(primary field)* | Single line text | This is the table's primary field |
| Email | Email | |
| Phone | Phone number | |
| Location | Single line text | City, country |
| Language | Single select | Options: English · Chinese · Both |
| Customer Type | Single select | Options: B2C · B2B · Community |
| Source | Single select | Options: Website Form · Referral · Event · Social · Walk-in · B2B |
| Eye Color | Single line text | e.g. "Mediterranean blue with morning grey" |
| Color Preferences | Long text | Free-form palette notes |
| Flower Preferences | Single line text | Which flowers resonate |
| Story Notes | Long text | Personal narrative from consultation |
| Family Memory Notes | Long text | Symbolic references, ancestry, places |
| Brand Relationship Stage | Single select | Options: Prospect · First Commission · Repeat Customer · Community Member · Ambassador |
| Consent Given | Checkbox | For data storage and communications |
| Consent Date | Date | |
| Consent Method | Single select | Options: Written · Verbal Logged · Form Checkbox |
| Story Consent Given | Checkbox | Separate consent for publishing their story |
| Story Consent Date | Date | |
| Newsletter Status | Single select | Options: Subscribed · Unsubscribed · Not Subscribed |
| Communication Preference | Single select | Options: Email · WeChat · In-Person · Any |
| First Contact Date | Date | |
| Last Contact Date | Date | |
| Next Follow-up Date | Date | |
| Follow-up Type | Single select | Options: Check-In · Story Invitation · Workshop Invitation · New Collection Notice · General |
| Follow-up Notes | Long text | Notes from last interaction |
| Interaction Log | Long text | Append-only chronological record of all touchpoints |
| Commissions | Link to Commissions table | |
| Bookings | Link to Bookings table *(add in Phase 2)* | |

---

## Table 2: Commissions · 定制订单表

**Purpose · 用途:** Full lifecycle of every custom order — from inquiry through delivery and story follow-up.

| Field Name | Airtable Field Type | Options / Notes |
|-----------|--------------------|--------------  |
| **Commission ID** *(primary field)* | Autonumber | Auto-increments: C-001, C-002, etc. (use prefix in display) |
| Customer | Link to Customers table | Link to the customer who placed this order |
| Customer Name | Lookup (from Customer) | Pulls name automatically once linked |
| Customer Email | Lookup (from Customer) | |
| Status | Single select | See full status list below |
| Payment Status | Single select | Options: Unpaid · Deposit Pending · Deposit Paid · Balance Pending · Paid in Full · Refunded · Waived |
| Inquiry Date | Date | |
| Inquiry Source | Single select | Options: Website Form · Email · Event · Referral · Social |
| Flower Type | Single line text | e.g. Orchid, Wisteria, Iris, Custom |
| Colors | Multiple select | Options: White · Ivory · Blush · Rose · Lavender · Blue · Sage · Yellow · Gold · Purple · Navy · Coral · Other |
| Materials | Multiple select | Options: Silk · Gold Wire · Silver Wire · Pearl · Enamel · Crystal · Ribbon · Other |
| Symbolism Notes | Long text | What the piece is meant to carry |
| Design Reference URLs | URL | Links to inspiration images |
| Quote Amount (USD) | Currency | USD |
| Deposit Amount (USD) | Currency | |
| Balance Due (USD) | Currency | |
| Stripe Deposit Link | URL | Paste Stripe payment link here |
| Stripe Balance Link | URL | |
| Production Notes | Long text | Maker's log during production |
| Revision Log | Long text | Record of any design changes requested |
| Shipping Carrier | Single line text | |
| Tracking Number | Single line text | |
| Shipped Date | Date | |
| Delivered Date | Date | |
| Follow-up Sent | Checkbox | Post-delivery follow-up sent |
| Story Invited | Checkbox | Customer invited to share story |
| Notes | Long text | General notes |
| Created At | Created time | Auto-set by Airtable |
| Updated At | Last modified time | Auto-set by Airtable |

**Commission Status Values (copy exactly) · 定制订单状态值:**

```
Inquiry
Consultation Scheduled
Consultation Complete
Proposal Sent
Approved
Deposit Pending
Deposit Paid
In Production
Quality Review
Shipped
Delivered
Follow-up Sent
Story Invited
Complete
On Hold
Revision Requested
Cancelled
```

---

## Table 3: B2B Partners · B2B合作方表

**Purpose · 用途:** Pipeline for all commercial partner outreach — boutiques, galleries, cultural institutions.

| Field Name | Airtable Field Type | Options / Notes |
|-----------|--------------------|--------------  |
| **Business Name** *(primary field)* | Single line text | |
| Website | URL | |
| Email | Email | |
| Phone | Phone number | |
| Address | Single line text | Street address |
| City | Single line text | |
| Country | Single line text | Default: USA |
| Category | Single select | Options: Boutique · Concept Store · Gallery · Cultural Institution · Stylist · Artisan Org · Hospitality · Agent/Reseller |
| Contact Person | Single line text | |
| Contact Title | Single line text | |
| Discovery Source | Single select | Options: Google · Instagram · Referral · Event · Walk-in · Press |
| Discovery Date | Date | |
| Aesthetic Fit | Single select | Options: Strong · Moderate · Weak · Unknown |
| Interest Level | Single select | Options: Low · Medium · High · Unknown |
| Notes | Long text | Fit assessment, context, observations |
| Status | Single select | See status list below |
| Outreach Date | Date | Date of first outreach |
| Last Follow-up Date | Date | |
| Next Action Date | Date | Set a reminder here |
| Reply Received | Checkbox | |
| Reply Date | Date | |
| Reply Summary | Long text | Brief note on reply content |
| Proposal Sent | Checkbox | |
| Proposal Version | Single line text | v1, v2, v3 |
| Proposal Sent Date | Date | |
| Proposal Link | URL | Link to Notion PDF or Drive |
| Sample Sent | Checkbox | |
| Sample Sent Date | Date | |
| Sample Items | Long text | Which pieces were sent |
| Deal Type | Single select | Options: Wholesale · Consignment · Placement · Workshop Collab · Gift Program |
| Deal Status | Single select | Options: None · Negotiating · Closed · Declined · Paused |
| Created At | Created time | |
| Updated At | Last modified time | |

**B2B Partner Status Values (copy exactly) · B2B合作方状态值:**

```
Discovered
Outreach Pending
Outreached
No Reply
Replied
Interested
Not Interested
Proposal Sent
Sample Sent
Negotiating
Deal Closed
Declined
Paused
```

---

## Views to Create · 需创建的视图

### Customers table views · 客户表视图

| View Name | Type | Filter | Purpose |
|-----------|------|--------|---------|
| All Customers | Grid | None | Full list |
| Follow-up Today | Grid | Next Follow-up Date = today | Daily action list |
| Follow-up Overdue | Grid | Next Follow-up Date < today | Catch missed follow-ups |
| Active Commissions | Grid | Commission status not in [Complete, Cancelled] | Customers with open orders |
| Subscribed | Grid | Newsletter Status = Subscribed | Newsletter audience |
| B2B Contacts | Grid | Customer Type = B2B | B2B-only view |

### Commissions table views · 定制订单表视图

| View Name | Type | Filter | Purpose |
|-----------|------|--------|---------|
| Active Commissions | Grid | Status not in [Complete, Cancelled] | Daily ops dashboard |
| New Inquiries | Grid | Status = Inquiry | Review within 24h |
| In Production | Grid | Status = In Production | Track current work |
| Awaiting Payment | Grid | Payment Status = Unpaid AND Status = Approved | Chase deposits |
| Follow-up Queue | Grid | Follow-up Sent = false AND Status = Delivered | Post-delivery actions |
| All Commissions | Grid | None | Full history |
| Kanban by Status | Kanban | Group by: Status | Visual workflow board |

### B2B Partners table views · B2B合作方表视图

| View Name | Type | Filter | Purpose |
|-----------|------|--------|---------|
| All Partners | Grid | None | Full database |
| Outreach Queue | Grid | Status = Outreach Pending | Priority contact list |
| Awaiting Reply | Grid | Status = Outreached | Follow-up targets |
| Active Leads | Grid | Status in [Interested, Negotiating] | Warm pipeline |
| Follow-up Today | Grid | Next Action Date = today | Daily action |
| Won Deals | Grid | Status = Deal Closed | Wins tracker |
| Pipeline Kanban | Kanban | Group by: Status | Visual pipeline |

---

## Zapier Automation (Formspree → Airtable) · Zapier自动化配置

### Zap 1: Custom order form → Airtable

**Trigger:** Formspree — New Submission  
Form ID: `xlgopzqb`

**Action 1:** Airtable — Create Record (Customers table)

| Airtable Field | Formspree Field / Value |
|---------------|------------------------|
| Name | `{{name}}` from form |
| Email | `{{email}}` from form |
| Customer Type | Static value: `B2C` |
| Source | Static value: `Website Form` |
| First Contact Date | Static value: `{{zap_meta_human_now}}` |
| Last Contact Date | Static value: `{{zap_meta_human_now}}` |
| Story Notes | `{{message}}` from form |

**Action 2:** Airtable — Create Record (Commissions table)

| Airtable Field | Formspree Field / Value |
|---------------|------------------------|
| Customer | Link to record created in Action 1 |
| Inquiry Date | `{{zap_meta_human_now}}` |
| Status | Static value: `Inquiry` |
| Payment Status | Static value: `Unpaid` |
| Inquiry Source | Static value: `Website Form` |
| Notes | Full message body from Formspree |

---

## Phase 2 Additions · 第二阶段追加

The following tables will be added in Phase 2. Do not create them yet.

- **Bookings** — workshop and consultation bookings (linked from Cal.com)
- **Payments** — individual payment records (linked from Stripe)
- **Events / Workshops** — upcoming and past community events
- **Customer Stories** — story submissions with consent tracking

---

*Document version: 1.0 · April 2026*  
*Maintained by: SILORA ORIENT founding team*
