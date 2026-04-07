# SILORA ORIENT — Brand Operating System Design
# 品牌运营系统设计文档

**Version:** 1.0  
**Date:** April 2026  
**Status:** Internal working document — Phase 1 architecture complete  
**Authors:** Founder + Claude Code (architecture assistant)  
**Audience:** Founders, co-founder, future technical collaborators

---

> This document is a living internal blueprint for building the SILORA ORIENT brand operating system on top of the existing website. It is not a marketing plan. It is not a technical specification. It is a structured design document that answers the question: *how does this brand actually work, end to end, as a real operating business?*

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Current Workspace Summary](#2-current-workspace-summary)
3. [System Principles](#3-system-principles)
4. [Architecture Direction](#4-architecture-direction)
5. [Unified Backend Vision](#5-unified-backend-vision)
6. [Internal Admin System Concept](#6-internal-admin-system-concept)
7. [CRM and Customer Relationship Model](#7-crm-and-customer-relationship-model)
8. [Content Workflow System](#8-content-workflow-system)
9. [B2B and Outreach Workflow](#9-b2b-and-outreach-workflow)
10. [Booking, Payment, Newsletter, Analytics](#10-booking-payment-newsletter-analytics)
11. [Phased Roadmap](#11-phased-roadmap)
12. [Risks and Dependencies](#12-risks-and-dependencies)
13. [Implementation Record](#13-implementation-record)

---

## 1. Project Overview

### What SILORA ORIENT Is

SILORA ORIENT is a handmade jewelry and artisan-cultural brand rooted in Chinese intangible cultural heritage — specifically the craft of 缠花 (*Chan Hua*), or traditional silk flower wrapping. The brand was born from five years of studio practice in China and is now establishing its presence in New York in spring 2026.

The brand is not a conventional jewelry store. It is a storytelling, community, and craft-transmission project expressed through jewelry. Every piece carries emotional weight — built around the customer's eyes, memories, identity, and personal narrative. Collections are named like poems. Customer stories are documented like literature. The brand publishes a quarterly journal. It hosts workshops. It teaches craft.

SILORA ORIENT operates in both B2C and B2B markets and aspires to become a cultural reference point for Chinese craft in the contemporary global design world.

### Brand Mission

To preserve and transmit traditional Chinese silk flower craft through contemporary jewelry design, editorial storytelling, community education, and emotionally resonant custom commissions — one story at a time.

### Why This System Is Needed

The public-facing website already exists and works. It is beautiful, bilingual, editorial, and culturally precise. The problem is that almost no business operation behind it actually functions as a system.

Right now:
- Inquiries arrive by email and are manually handled, with no tracking.
- The newsletter form collects no real subscribers.
- There are no analytics. There is no data on who visits or what they do.
- Custom commissions have no status tracking. Orders can and do fall through gaps.
- There is no CRM. No customer profiles. No follow-up logic.
- There is no B2B outreach system.
- There is no booking system for consultations or workshops.
- Content updates require a git push — no non-technical team member can publish independently.
- There is no quarterly email dispatch system.
- There is no payment infrastructure.

The brand is ready to operate at a higher level. This document defines what that looks like and how to build it.

### What Problem the System Solves

| Problem | Current State | System Solution |
|---------|--------------|-----------------|
| Inquiries fall through | Email only, no log | Airtable CRM + Formspree sync |
| No subscriber list | Fake button UI | Mailchimp integration |
| No traffic data | No analytics | Google Analytics 4 |
| No commission tracking | Manual email threads | Airtable board with status stages |
| No booking | No booking infrastructure | Cal.com embeds |
| No B2B pipeline | Ad hoc, scattered | Airtable B2B database |
| Content requires git push | Manual deployment | Airtable/Notion forms + JSON edits |
| No payment infrastructure | Off-platform, inconsistent | Stripe payment links |
| No editorial workflow | Direct publish only | Notion draft/review/publish pipeline |

---

## 2. Current Workspace Summary

### Public Website — What Exists

The current website is a static HTML/CSS/JS site deployed automatically to Vercel via GitHub Actions. It is bilingual (English/Chinese), animated, mobile-responsive, and uses a consistent design system.

**Pages:**

| Page | Purpose | Status |
|------|---------|--------|
| `index.html` | Homepage: hero, manifesto, gallery, newsletter | Working |
| `about.html` | Brand story and founder narrative | Working |
| `collections.html` | Main collections: Eye Color, Orchid, Memory, Wedding | Working |
| `other-collections.html` | Waterfall card layout, story modals, additional series | Working |
| `custom.html` | Multi-step custom order form → Formspree | Working (form is live but basic) |
| `stories.html` | Customer stories — auto-renders from JSON | Working (1 story only) |
| `journal.html` | Editorial journal — hardcoded content | Working (not CMS-driven) |
| `documentary.html` | Video placeholders — renders from JSON | Working (no videos yet) |
| `contact.html` | General contact form → Formspree | Working |

**Content Layer:**

| File | Controls |
|------|---------|
| `content/translations.json` | All bilingual text via `data-i18n` attributes |
| `content/customer-stories.json` | Customer story cards and modals |
| `content/documentary-content.json` | Video embeds and descriptions |
| `content/collections-data.json` | Collection metadata and variant details |

**Technical Infrastructure:**

- **Deploy:** GitHub push → GitHub Actions → Vercel auto-deploy (~30 seconds)
- **Forms:** Formspree endpoint `xlgopzqb` — submissions arrive as emails only
- **i18n:** `localStorage('silora-lang')` persists language; `data-i18n` attributes map to JSON keys
- **Animations:** Intersection Observer scroll-reveal, hero parallax, gallery stagger
- **Fonts:** Cormorant Garamond (serif) + Jost (sans) via Google Fonts
- **Live URL:** https://silora-orient.vercel.app

### What Is Already Working

- The visual identity is precise, refined, and consistent.
- The bilingual system is fully functional and extensible.
- The content JSON layer makes non-HTML updates possible for stories, videos, and collections.
- The scroll-reveal and animation system is production quality.
- Vercel deployment is instant and reliable.
- The custom order form reaches the founder by email.

### What Is Still Fake, Missing, or Manual

| Area | Reality |
|------|---------|
| Newsletter signup | Button changes color and says "Thank you" — no subscriber is actually stored anywhere |
| Analytics | Zero. No tracking of any kind is installed. |
| Custom order tracking | Formspree sends an email. There is no status board, no follow-up system, no record. |
| Booking | Does not exist anywhere on the site. |
| Payment | No payment infrastructure. All commerce is handled off-platform. |
| CRM | No customer profiles exist. No follow-up logic. No purchase history. |
| B2B outreach | Ad hoc. No database, no status tracking, no proposal system. |
| Content workflow | JSON edits → git push → live. No draft/review/approve stage. |
| Journal publishing | Content is hardcoded in HTML. Not driven by data or a workflow. |
| Community / workshops | No public pages. No booking. No capacity management. |
| Documentary | All videos are placeholders. |

---

## 3. System Principles

These principles govern all decisions about how to build and extend this system. They should be referenced whenever there is ambiguity about which path to take.

### 3.1 Preserve the Brand Identity

The public website is the brand's face. Its visual direction — editorial, poetic, refined, culturally rooted — must not be touched by the operational layer. The system exists to support the brand, not to reshape it.

### 3.2 Build On the Current Workspace

Nothing in the existing website gets deleted or redesigned. Every new system module is additive. The existing HTML, CSS, JS, JSON, and deployment infrastructure remain the base.

### 3.3 Keep the System Modular

Each module — CRM, booking, newsletter, B2B, content workflow — should be independently functional. If one tool is replaced, the rest should not break. No single point of failure. No monolithic dependency.

### 3.4 Support Small-Team Collaboration

The brand is run by two founders, with potential collaborators in the future (editor, community manager, B2B lead). The system should make it easy for a small team to divide work, review each other's contributions, and operate without the founder being a bottleneck.

### 3.5 Support Customer Storytelling and Community Growth

The brand's competitive advantage is emotional depth — the custom commission process, the customer story archive, the workshop community. The system should treat each customer as a human being with a story, not a transaction record.

### 3.6 Make the System Scalable Over Time

Start simple. Use SaaS tools in Phase 1. Build a unified backend only when the operational volume justifies it. Design data structures today that will transfer cleanly to a real database later.

---

## 4. Architecture Direction

### Short-Term Architecture (Phase 1 and 2): SaaS Layer

In the near term, the website remains a static HTML site. Business operations are handled by best-in-class SaaS tools connected through lightweight integrations. This minimizes build time and maximizes reliability.

```
┌─────────────────────────────────────────────────────────────┐
│               PUBLIC WEBSITE (Vercel / Static)              │
│         HTML · CSS · JS · JSON — unchanged                  │
└──────────────┬──────────────────────────────┬──────────────┘
               │                              │
     ┌─────────▼──────────┐        ┌──────────▼──────────┐
     │  CUSTOMER LAYER    │        │  OPERATIONS LAYER   │
     │                    │        │                     │
     │  · Newsletter form │        │  · Commission board │
     │  · Custom order    │        │  · B2B pipeline     │
     │  · Booking widget  │        │  · Editorial review │
     │  · Payment link    │        │  · Analytics dash   │
     └─────────┬──────────┘        └──────────┬──────────┘
               │                              │
   ┌───────────┼──────────────────────────────┼──────────────┐
   │           │        SaaS Tools Layer       │              │
   │           │                              │              │
   │  Mailchimp│     Airtable      Notion    GA4  Cal.com    │
   │  (email)  │     (CRM/B2B)    (content)  (analytics)    │
   │           │                    Stripe (payments)        │
   └───────────┴──────────────────────────────┴──────────────┘
```

**Tool Selection Rationale:**

| Tool | Role | Why |
|------|------|-----|
| **Mailchimp** | Newsletter + email automation | Free to 500, automations, open tracking, quarterly dispatch |
| **Airtable** | CRM, commissions, B2B pipeline | Relational DB with non-technical UI, forms, automations |
| **Notion** | Editorial workflow, internal docs | Draft/review/publish pipeline; easy for non-technical editors |
| **Cal.com** | Consultation and workshop booking | Open source, calendar sync, capacity, confirmation emails |
| **Stripe** | Payments | Deposits, installments, invoices, refunds, payment links |
| **Google Analytics 4** | Traffic and conversion tracking | Industry standard, geographic, source, conversion data |
| **Zapier / Make** | Integration glue | Formspree → Airtable, Airtable → Mailchimp, etc. |

### Long-Term Architecture (Phase 3 and 4): Unified Backend

When the SaaS layer reaches its limits — typically when the team grows, data volume increases, or cross-module automation becomes complex — the system should migrate toward a unified backend.

```
┌─────────────────────────────────────────────────────────────┐
│               PUBLIC WEBSITE (Vercel / Static)              │
│         Reads from API — no structural change needed        │
└──────────────┬──────────────────────────────┬──────────────┘
               │ REST / JSON APIs             │
     ┌─────────▼──────────────────────────────▼──────────┐
     │                 UNIFIED BACKEND                    │
     │                                                    │
     │  Supabase (PostgreSQL + Auth + Storage + Realtime) │
     │  or equivalent open-source backend                 │
     │                                                    │
     │  · Customers     · Commissions    · Bookings       │
     │  · B2B Partners  · Proposals      · Payments       │
     │  · Content       · Subscriptions  · Analytics      │
     │  · Assets        · Tasks          · Consent        │
     └──────────────────────┬─────────────────────────────┘
                            │
              ┌─────────────▼───────────────┐
              │      ADMIN INTERFACE        │
              │  (internal team dashboard)  │
              │                             │
              │  Next.js or similar         │
              │  Role-based access          │
              │  Per-module panels          │
              └─────────────────────────────┘
```

**Recommended backend platform:** Supabase (PostgreSQL, row-level security, storage, auth, real-time). Open source, self-hostable if needed, strong free tier. Data exports cleanly from Airtable CSV.

### Public vs. Internal System Boundary

| Layer | Audience | Access | Built When |
|-------|----------|--------|-----------|
| Public website | Everyone | Open | Already exists |
| SaaS tools (Airtable, Notion, etc.) | Internal team | Login | Phase 1–2 |
| Admin dashboard | Internal team only | Role-based auth | Phase 3 |
| Unified backend API | Website + admin | API key / session | Phase 3–4 |

---

## 5. Unified Backend Vision

A unified backend becomes necessary when the brand reaches the point where managing six separate SaaS tools creates friction: data lives in multiple places, automation rules multiply, and the team spends time reconciling information instead of doing meaningful work.

The unified backend is not a replacement for the public website — it is an invisible engine beneath it. The website continues to look and feel exactly as it does now. But instead of reading from static JSON files, it reads from a live API. Instead of submitting to Formspree, forms post to a real database.

### Core Entities in the Unified Backend

**Customer**
```
id, name, email, phone, location, language_preference
type: B2C | B2B
story_notes (text), color_preferences (text)
family_memory_notes (text)
subscription_status: active | unsubscribed | not_subscribed
consent_date, consent_source
created_at, updated_at, last_contact_date
→ Commissions[], Bookings[], Payments[], StorySubmissions[]
```

**Commission**
```
id, customer_id, inquiry_date, inquiry_source
flower_type, flower_type_zh
colors[], materials[], symbolism_notes
quote_amount, deposit_amount, balance_due, currency
status:
  inquiry → consultation_scheduled → consultation_complete
  → proposal_sent → approved → deposit_paid
  → in_production → quality_review → shipped → delivered
  → post_sale_followup → story_submitted → complete
production_notes, revision_history[]
shipping_carrier, tracking_number, delivery_date
created_at, updated_at
→ Payments[], Assets[], CustomerStory?
```

**CustomerStory**
```
id, customer_id, commission_id?
name, name_zh, location, date_en, date_zh
flower_piece_description, eye_color
quote, quote_zh, story_en, story_zh
photo_url, video_url
consent_given: boolean, consent_date, consent_notes
publication_status: draft | approved | published | archived
featured: boolean
tags[], tag_zh[]
→ Assets[]
```

**JournalIssue**
```
id, title, title_zh, issue_number, season, year
status: planning | drafting | review | approved | scheduled | published | archived
publish_date, scheduled_send_date, email_sent_date
articles[]
editor_id, reviewer_id
newsletter_sent: boolean, subscriber_count_at_send
created_at, updated_at
```

**B2BPartner**
```
id, business_name, website, email, phone, address
category: boutique | gallery | concept_store | stylist | museum | agent | artisan_org
contact_person, contact_title
discovery_source, discovery_date
notes (text), interest_level: low | medium | high
status:
  discovered → outreach_pending → outreached → no_reply
  → replied → interested | not_interested
  → proposal_sent → sample_sent → negotiating | declined | deal_closed
outreach_date, last_follow_up_date, next_action_date
proposal_version_history[]
created_at, updated_at
→ Proposals[], OutreachLog[]
```

**Booking**
```
id, customer_id, type: consultation | workshop | course | event | b2b_meeting
event_id?, workshop_id?
datetime, duration_minutes, seats_reserved
status: pending | confirmed | attended | cancelled | no_show
payment_status: unpaid | deposit_paid | paid | refunded | waived
confirmation_sent: boolean, reminder_sent: boolean
cancellation_reason
notes
→ Payments[]
```

**Payment**
```
id, customer_id, booking_id?, commission_id?
type: full | deposit | installment | balance | refund
amount, currency, stripe_payment_id
status: pending | paid | failed | refunded | partially_refunded
paid_at, refunded_at
notes
```

**Subscriber**
```
id, email, name, signup_date, consent_date, consent_source
status: active | unsubscribed | bounced | cleaned
mailchimp_id (for sync reference)
segments[]
→ IssuesSent[]
```

**Workshop / Event**
```
id, title, title_zh, type: workshop | course | event | community
instructor_id, guest_artisan?
date, time, location, online_url?
capacity, seats_booked, waitlist[]
materials_list, description, description_zh
status: draft | published | booking_open | full | complete | cancelled
post_event_notes, feedback_summary
→ Bookings[], Assets[]
```

**Asset**
```
id, file_name, file_url, file_type: image | video | document | brand
category: product | process | story | editorial | workshop | brand | misc
related_to_type, related_to_id
credit, usage_rights
status: active | archived
uploaded_by, uploaded_at
```

**Task**
```
id, title, description, assigned_to, created_by
related_to_type, related_to_id (polymorphic)
priority: low | medium | high | urgent
status: open | in_progress | blocked | done
due_date, completed_at
comments[]
```

---

## 6. Internal Admin System Concept

The internal admin system is the working environment for the SILORA ORIENT team. It is not visible to customers. It is not the public website. It is the operational cockpit from which the team manages every part of the brand's workflow.

### Who Uses It

| Role | Primary Modules |
|------|----------------|
| **Founder** | Final approvals, publishing decisions, business overview |
| **Co-founder / Artisan** | Product uploads, commission notes, production tracking |
| **Editor** | Journal drafts, story editing, publication scheduling |
| **Community Manager** | Workshop management, booking oversight, newsletter |
| **B2B Manager** | Partner database, outreach log, proposals |

### What the Admin System Must Support

**1. Upload and Draft**
Any team member with the right role can upload images, write product descriptions, add craft details, and save as draft. Drafts are private until reviewed.

**2. Organize**
Content, assets, and records are tagged, categorized, and searchable. No more digging through email threads or image folders.

**3. Preview**
Before anything goes live, a preview link shows exactly how it will appear on the public website.

**4. Review**
A reviewer (usually the founder or editor) is assigned to each submission. They can leave inline comments, request revisions, or approve.

**5. Approve**
Only approved content can be scheduled or published. Approval is logged with timestamp and reviewer name.

**6. Publish or Schedule**
Approved content can be published immediately or scheduled for a specific date and time. Scheduled publishing fires automatically.

**7. Track**
Every entity — commission, booking, outreach, story — has a visible status that updates as it moves through the workflow. The team can see the current state of everything at a glance.

**8. Archive**
Published and completed items are moved to archive automatically or manually. Archives are searchable and linked to their analytics data.

### Admin Module Map

```
Dashboard
├── Commissions
│   ├── Active (kanban by status)
│   ├── New Inquiries
│   ├── In Production
│   └── Complete / Archive
├── Customers
│   ├── All profiles
│   ├── Story submissions
│   └── Consent tracker
├── Content
│   ├── Journal issues
│   ├── Customer stories
│   ├── Product / collections
│   ├── Documentary clips
│   └── Announcements
├── Community
│   ├── Workshops
│   ├── Courses
│   ├── Events
│   └── Bookings
├── B2B
│   ├── Partner database
│   ├── Outreach log
│   ├── Proposals
│   └── Deal tracker
├── Newsletter
│   ├── Subscribers
│   ├── Campaigns / Issues
│   └── Automations
├── Assets
│   ├── Product images
│   ├── Story images
│   └── Brand files
├── Analytics
│   └── Traffic · Sources · Conversions
└── Settings
    ├── Team / Roles
    └── Integrations
```

### Phase-by-Phase Admin Reality

In Phase 1 and 2, this admin interface is **Airtable + Notion** — no custom build needed. Each module above maps directly to an Airtable table or a Notion database. In Phase 3, this becomes a purpose-built internal dashboard when the volume and complexity justify the investment.

---

## 7. CRM and Customer Relationship Model

### Philosophy

Every customer who commissions a piece from SILORA ORIENT is not placing a product order. They are beginning a creative relationship. The CRM should reflect this. A customer profile is not a transaction log — it is a portrait: their story, their memories, their preferences, the piece that was made for them, and what came after.

### Customer Profile Structure

**Identity**
- Full name, preferred name
- Email address
- Phone (optional)
- City, country
- Language preference: EN | ZH | both
- First contact date and source

**Story and Preferences**
- Eye color (if relevant to their commission)
- Color preferences and palette notes
- Flower preferences
- Family memory notes (e.g., "grandmother's garden," "her mother's wedding flowers")
- Personal narrative summary — written by the team after the consultation
- Symbolism notes — what the piece was meant to carry

**Commission History**
- List of all commissions with status and piece description
- Dates: inquiry, consultation, proposal, payment, delivery
- Total value across all commissions

**Community Participation**
- Workshops attended
- Courses enrolled
- Events participated in

**Newsletter and Communication**
- Subscription status
- Consent date and source (form, in-person, verbal with record)
- Quarterly issues received
- Last email open date (if available)
- Communication preference: email | WeChat | in-person | none

**Follow-Up Logic**
- Last contact date
- Next scheduled follow-up date
- Follow-up type: check-in | story invitation | workshop invitation | new collection notice
- Notes from last conversation

**Story Submission**
- Whether a story has been submitted
- Consent for publication
- Publication status

### Customer Journey Map

```
First contact (inquiry, referral, event, social)
     ↓
Consultation (in-person, video call, or email exchange)
     ↓
Proposal sent → Customer approves
     ↓
Deposit paid → Production begins
     ↓
Piece complete → Quality review → Shipped / Delivered
     ↓
Follow-up (2 weeks after delivery) — how does she feel?
     ↓
Story invitation (if appropriate)
     ↓
Story submitted → Consent obtained → Published (if approved)
     ↓
Newsletter subscriber → Quarterly issues → Workshop invitations
     ↓
Long-term community member → Repeat commission → Ambassador
```

---

## 8. Content Workflow System

### The Problem This Solves

Currently, all content changes go directly live when a JSON file is edited and pushed to GitHub. There is no review stage. There is no draft state. The founder must personally push every update. A non-technical team member (editor, co-founder) cannot publish anything independently.

The content workflow system fixes this by introducing statuses, roles, and approval gates between creation and publication.

### Content Types

| Type | Where It Lives (Public) | Where It's Managed (Internal) |
|------|------------------------|-------------------------------|
| Product / collection | `collections.html`, `other-collections.html` | Airtable → JSON export OR CMS |
| Customer story | `stories.html` | Airtable form + approval → JSON |
| Journal / editorial | `journal.html` | Notion draft → HTML update |
| Documentary clips | `documentary.html` | JSON file → direct edit |
| Workshop / event page | (not yet public) | Airtable → new HTML page |
| Announcements | Homepage banner | Translation JSON |

### Universal Content Status Flow

```
Draft → Internal Review → Revision Requested → Approved → Scheduled → Published → Archived
```

| Status | Who Sets It | What It Means |
|--------|------------|---------------|
| **Draft** | Creator (artisan, editor, founder) | Incomplete. Not ready for review. |
| **Internal Review** | Creator | Submitted for review. Awaiting feedback. |
| **Revision Requested** | Reviewer | Changes needed. Creator notified. |
| **Approved** | Founder / Editor | Content cleared. Ready to schedule. |
| **Scheduled** | Founder / Editor | Set to publish at a future datetime. |
| **Published** | System (auto) or Founder | Live on public website. |
| **Archived** | Admin / Founder | Removed from active display. Kept in record. |

### Content Fields (Universal)

Every piece of content, regardless of type, should store:

- Title (EN + ZH)
- Subtitle (EN + ZH)
- Author / creator
- Editor / reviewer
- Category and tags
- Short description (EN + ZH)
- Full body (EN + ZH)
- Image(s) with alt text and credit
- Call to action (link + label)
- Publish date / scheduled date
- SEO title, meta description
- Social sharing image and description
- Status
- Version history (brief revision notes)

### Customer Story Workflow (Detailed)

The customer story is the most emotionally significant content type. Its workflow requires the most care.

```
1. Story Intake
   Customer shares their story (post-commission, in-person, or via form)
   → Team member writes a draft based on the conversation

2. Internal Drafting
   Draft saved in Airtable / Notion
   Status: Draft

3. Founder Review
   Founder reads for accuracy, tone, brand voice
   Status: Internal Review → Approved or Revision Requested

4. Consent Obtained
   Team contacts customer: "May we share your story?"
   Consent recorded with date, method, and customer name
   Status: Consent Pending → Consent Granted (or Declined)

5. Final Edit
   Copy edited for tone and length
   Photo selected or commissioned

6. Publication Approval
   Final sign-off from founder
   Status: Approved

7. Published to stories.html
   JSON file updated → git push → Vercel auto-deploy
   Status: Published

8. Archive
   After 12+ months or if customer requests removal
   Status: Archived
```

### Journal / Quarterly Workflow (Detailed)

```
Issue Planning (6 weeks before publish date)
   → Define theme, article count, authors, visual direction

Article Assignment (5 weeks before)
   → Assign each article to a writer or the founder
   → Create Notion page per article with brief

Draft Submission (3 weeks before)
   → Writer submits draft in Notion
   → Status: Draft → Internal Review

Editorial Review (2.5 weeks before)
   → Editor reviews copy, leaves comments
   → Status: Revision Requested or Approved

Final Edit + Image Selection (2 weeks before)
   → Images sourced and credited
   → Copy finalized

Layout and Preview (1 week before)
   → HTML page drafted or updated
   → Internal preview link shared

Final Approval (5 days before)
   → Founder signs off
   → Status: Approved → Scheduled

Email Campaign Prepared (4 days before)
   → Mailchimp campaign drafted
   → Test send to internal team

Publication Day
   → HTML goes live (Vercel deploy)
   → Mailchimp campaign sends to all active subscribers
   → Status: Published

Analytics Review (1 week after)
   → Open rate, click rate, new subscriptions logged
   → Notes added to issue record
   → Status: Archived (content remains live, workflow complete)
```

---

## 9. B2B and Outreach Workflow

### Context

SILORA ORIENT's B2B opportunity is real and significant. New York's handmade jewelry, gallery, concept store, and cultural institution landscape is a natural home for the brand. However, outreach without a system means effort without memory — emails sent and forgotten, leads that went cold because no one followed up, proposals that were never tracked.

The B2B system should function as a lightweight sales pipeline purpose-built for a cultural brand: relational, story-forward, not transactional.

### Partner Categories

| Category | Examples | Approach |
|----------|---------|----------|
| Handmade jewelry boutiques | Independent New York stores | Wholesale / consignment |
| Concept stores | Design and lifestyle multibrand stores | Wholesale / placement |
| Galleries | Art and craft galleries | Exhibition / pop-up / sale |
| Cultural institutions | Museums, cultural centers, Chinese cultural organizations | Program / event / merchandise |
| Stylists | Editorial and celebrity stylists | Loan / gifting |
| Artisan organizations | Craft councils, cultural heritage bodies | Collaboration / program |
| Hospitality | Hotels, spas, high-end venues | Gifting / amenity program |
| Agents / resellers | Representatives in new markets | Licensing / wholesale |

### B2B Partner Record Fields

**Basic Info**
- Business name, website, email, phone, physical address
- Category (from list above)
- Contact person name and title
- Notes: first impression, aesthetic fit assessment

**Discovery**
- Discovery source: Google, Instagram, referral, event, walk-in
- Discovery date

**Outreach Status**
```
Discovered → Outreach Pending → Outreached → No Reply (auto after 14 days)
→ Replied → Interested | Not Interested | Unclear
→ Proposal Sent → Sample Sent → Negotiating
→ Deal Closed | Declined | Paused
```

**Tracking Fields**
- First outreach date
- Last follow-up date
- Next action date (with reminder)
- Email content log (brief summary, not full email)
- Reply received: boolean + date + summary
- Interest level: low | medium | high
- Sample requested: boolean + date + items
- Proposal version (v1, v2, etc.) + date sent
- Proposal link or file reference

### Proposal System

In Phase 1 and 2, proposals are built in Notion from templates and exported as PDF.

**Proposal Types:**

| Type | Use Case |
|------|---------|
| Brand Introduction | Cold outreach — who we are, why we're reaching out |
| Wholesale Proposal | Product selection, pricing tiers, minimum orders, terms |
| Consignment Proposal | Product on loan, revenue share, terms |
| Workshop Collaboration | Co-hosted craft workshop, logistics, costs |
| B2B Gift Program | Corporate gifting, custom commissions for organizations |

**Proposal Template Fields:**
- Recipient name and business
- Date
- Brand story section (editable short version)
- Selected products with images and pricing
- Terms: payment, minimums, lead time, return policy
- Brand values alignment paragraph
- Contact details
- Next steps / call to action

In Phase 3, proposals are generated from a template engine in the admin system with auto-pulled product data from the database.

### Outreach Tracking Dashboard (Airtable)

Views needed:
- **All Partners** (full table)
- **Outreach Queue** (status = Outreach Pending)
- **Awaiting Reply** (status = Outreached, no reply after 7 days)
- **Active Leads** (status = Interested or Negotiating)
- **Follow-Up Today** (next_action_date = today)
- **Won Deals** (status = Deal Closed)

---

## 10. Booking, Payment, Newsletter, Analytics

### 10.1 Booking System

**Platform:** Cal.com (free, open source, embeddable)

**Booking Types:**

| Type | Duration | Capacity | Payment Required |
|------|---------|----------|-----------------|
| Custom consultation | 30–60 min | 1 customer | Optional deposit |
| Design follow-up | 30 min | 1 customer | No |
| Workshop: Chan Hua intro | 2–3 hours | 6–12 seats | Yes (full or deposit) |
| Course: multi-session | Per session | 6–8 seats | Yes (full) |
| Community event | Variable | Variable | Free or ticketed |
| B2B meeting | 30–60 min | 1 contact | No |

**Booking Logic:**
- Customer selects date and time from available slots
- Confirmation email sent automatically
- Reminder email sent 24 hours before
- Capacity enforced — booking closes when full
- Waitlist option enabled for workshops and courses
- Cancellation policy included in confirmation email
- If payment required, Stripe link included in confirmation

**Integration Path:**
- Phase 1: Cal.com embed on `custom.html` for consultation bookings only
- Phase 2: Cal.com expanded for workshops with capacity limits
- Phase 3: Booking data synced to Airtable / unified backend automatically

### 10.2 Payment System

**Platform:** Stripe

**Payment Scenarios:**

| Scenario | Structure |
|----------|-----------|
| Custom commission | 50% deposit on approval, 50% balance before shipping |
| Workshop seat | Full payment at booking, or 50% deposit + balance at event |
| Course registration | Full payment at enrollment |
| B2B wholesale invoice | Net-30 invoice via Stripe Invoicing |
| Product purchase (if added) | Full payment at checkout |
| Refund | Processed via Stripe, logged in system |

**Payment Status Values:** `pending → paid → partially_paid → refunded → waived`

**Phase 1 Implementation:** Stripe payment links (no-code) embedded in confirmation emails and custom order follow-up emails. No website checkout integration needed yet.

**Phase 3 Implementation:** Stripe Checkout embedded in site, synced to booking and commission records in the backend.

### 10.3 Newsletter and Subscription System

**Platform:** Mailchimp (free to 500 subscribers, $13/month to 500–1500)

**Subscriber Flow:**

```
Visitor enters email on homepage → Mailchimp API receives it
→ Subscriber added to "Silora Orient Main List"
→ Tag applied: source (homepage | custom_form | event | in_person)
→ Automated welcome email sent immediately
→ Added to quarterly issue audience
```

**Welcome Email Content:**
- Thank you for joining
- Brief brand introduction (2–3 sentences)
- One story or image
- What they will receive: quarterly issues, new collection notices, workshop invitations
- Unsubscribe link clearly visible

**Quarterly Issue Email:**
- Subject line: "Silora Orient · [Season] [Year] · [Issue Title]"
- Beautiful, minimal HTML email matching brand aesthetic
- Link to read the full issue on the website
- One featured piece from the collection
- One sentence from a customer story
- Upcoming workshop if applicable
- Sent to all active subscribers

**Subscriber Segments:**
- All subscribers
- B2C customers (have commissioned or purchased)
- Workshop participants
- B2B contacts (separate list or tag)
- VIP (repeat customers, ambassadors)

**Automation Sequences:**
1. Welcome series (3 emails over 2 weeks)
2. Post-commission follow-up (triggered when commission = delivered)
3. Workshop invitation (triggered 3 weeks before an event)
4. Quarterly issue dispatch (manual trigger after publication)
5. Re-engagement (for subscribers inactive 6+ months)

### 10.4 Analytics System

**Platform:** Google Analytics 4

**Implementation:** A single `<script>` tag added to the `<head>` of all 9 HTML pages. Takes approximately 30 minutes to implement and verify. Data begins flowing immediately.

**Key Metrics to Track:**

| Category | Metric |
|----------|--------|
| Traffic | Total users, sessions, page views per week/month |
| Sources | Organic search, direct, social (Instagram, WeChat, Pinterest), referral |
| Geography | Country, city (especially NYC, Chinese cities, UK, Europe) |
| Pages | Most-visited pages, time on page, bounce rate |
| Conversion events | Newsletter signup, custom form submission, contact form submission |
| Content | Which journal / story pages drive the most engagement |
| Seasonal | Traffic patterns by week and month |

**Custom Events to Configure:**
- `newsletter_signup` — fires when newsletter form submitted
- `custom_form_submit` — fires on custom order form submission
- `contact_form_submit` — fires on contact form submission
- `booking_click` — fires when a Cal.com booking link is clicked
- `language_switch` — fires when user toggles EN/ZH

**Analytics Review Cadence:**
- Weekly: traffic totals, source breakdown
- Monthly: conversion rates, top content, geographic breakdown
- Quarterly: seasonal trends, B2B vs. B2C lead sources, campaign attribution

---

## 11. Phased Roadmap

### Phase 1 — Immediate Operational Fixes
**Timeline:** 1–2 weeks  
**Goal:** Stop losing leads. Start collecting real data. Fix the fake states.

| Priority | Task | Tool | Effort |
|----------|------|------|--------|
| **P0** | Install GA4 on all 9 HTML pages | GA4 | 1 hour |
| **P0** | Fix newsletter form → real Mailchimp API | Mailchimp + JS | 2–3 hours |
| **P0** | Set up Airtable commission tracker | Airtable | 2–3 hours |
| **P0** | Zapier: Formspree → Airtable auto-sync | Zapier | 1–2 hours |
| **P1** | Embed Cal.com booking on `custom.html` | Cal.com | 2 hours |
| **P1** | Stripe payment links for commissions | Stripe | 1 hour |
| **P2** | Set up Mailchimp welcome automation | Mailchimp | 2–3 hours |
| **P2** | NYC B2B partner database (initial 50 targets) | Airtable | 3–4 hours research |

**What Stays Manual in Phase 1:**
- Journal publishing (still requires HTML edit + git push)
- Workshop booking (no public page yet)
- Proposal generation (Notion doc + PDF)
- Community / course management

**What Should NOT Be Attempted Yet:**
- Custom backend or database
- Admin dashboard build
- Automated proposal generation

---

### Phase 2 — Internal Operations Foundation
**Timeline:** 2–5 weeks after Phase 1  
**Goal:** Team can operate without the founder as a bottleneck. Every workflow has a status.

| Priority | Task | Tool | Notes |
|----------|------|------|-------|
| **P0** | Notion editorial workspace | Notion | Journal draft → review → approve |
| **P0** | Airtable commission kanban | Airtable | Full status board, all active commissions |
| **P0** | Customer story intake form | Airtable form | Consent tracking included |
| **P1** | Workshop public page | New HTML page | `workshops.html`, booking via Cal.com |
| **P1** | Stripe deposit flows for commissions | Stripe | Deposit invoice sent on approval |
| **P1** | Quarterly issue workflow | Notion + Mailchimp | First end-to-end dry run |
| **P2** | B2B outreach tracking views | Airtable | Follow-up reminders, Outreach Queue view |
| **P2** | Newsletter archive page | Static HTML | `newsletter-archive.html`, manually updated |
| **P2** | Customer story — second entry | `customer-stories.json` | Demonstrates the intake-to-publish process |

**What Stays Manual in Phase 2:**
- Asset management (images folder + Google Drive)
- Proposal design (Notion → PDF)
- Analytics review (manual weekly check)

**What Should NOT Be Attempted Yet:**
- Custom admin dashboard
- Backend database
- Automated proposal system

---

### Phase 3 — Unified Backend and Admin Expansion
**Timeline:** 2–4 months after Phase 2, when team grows or SaaS friction is felt  
**Goal:** Single source of truth. Admin dashboard. Automation across modules.

| Task | What It Replaces |
|------|-----------------|
| Supabase backend setup | Airtable (gradually) |
| Admin dashboard (Next.js) | Manual Airtable views |
| Commission management panel | Airtable commission board |
| Customer profile panel | Airtable CRM |
| Content workflow with draft/publish | Notion + manual JSON edits |
| Asset library in admin | Images folder + Google Drive |
| B2B pipeline in admin | Airtable B2B table |
| Mailchimp sync → internal subscriber table | Mailchimp standalone |
| GA4 data surfaced in admin | GA4 standalone |

**Prerequisites for Phase 3:**
- Team size justifies the investment (2+ full-time collaborators beyond founders)
- SaaS tool limits are being hit (Airtable rows, Mailchimp subscribers, Cal.com capacity)
- OR: operational complexity creates real coordination cost

---

### Phase 4 — Scaling and Refinement
**Timeline:** 6–12 months from now, if growth targets are met

- E-commerce integration (if moving beyond custom-only)
- Member portal for workshop alumni and community subscribers
- Subscription-based community access (courses, archives, content)
- International expansion tooling (multi-currency, timezone-aware booking)
- Advanced analytics (cohort analysis, LTV tracking, campaign attribution)
- Mobile app consideration (community, booking, story submission)
- Potential standalone Chinese-market platform (WeChat Mini Program)

---

## 12. Risks and Dependencies

### Critical Risks (Address in Phase 1)

| Risk | Severity | Current Impact | Mitigation |
|------|----------|---------------|-----------|
| **Formspree submissions lost** | Critical | Inquiries missed if email is not checked immediately | Zapier sync to Airtable — all submissions logged with timestamp |
| **Newsletter collects zero real subscribers** | Critical | Building zero email audience despite real traffic | Replace fake JS with Mailchimp API call — immediate fix |
| **No analytics — zero data** | Critical | Cannot make any evidence-based decisions | GA4 install is one script tag — 1 hour total work |
| **Commission status invisible** | High | Work-in-progress falls through gaps | Airtable commission board — Phase 1 |

### Operational Risks (Address in Phase 2)

| Risk | Severity | Mitigation |
|------|----------|-----------|
| **Content requires git push** | Medium | Non-technical team cannot publish independently. Accept for now; address in Phase 2 with Notion workflow |
| **No payment infrastructure** | Medium | Revenue relies on informal payment arrangements. Stripe payment links in Phase 1–2 |
| **No booking system** | Medium | Consultations scheduled by email — hard to scale. Cal.com embed in Phase 1 |
| **Customer records exist only in email** | Medium | If inbox is lost, customer history is lost. Airtable CRM as first priority |

### Strategic Risks (Monitor Ongoing)

| Risk | Notes |
|------|-------|
| **GDPR / privacy compliance** | As subscriber and customer data grows, explicit consent tracking and a privacy policy become legally necessary. Build consent into every form from Day 1. |
| **Over-engineering too early** | The temptation to build a custom backend before the business volume justifies it. Resist. SaaS tools are the right answer for Phase 1–2. |
| **Tool sprawl** | Using too many disconnected SaaS tools creates its own coordination cost. Limit to: Airtable, Notion, Mailchimp, Cal.com, Stripe, GA4. No more until Phase 3. |
| **Brand voice dilution in automation** | Automated emails must be written in the brand's voice. Generic Mailchimp templates will feel wrong. All automated copy must be custom-written. |
| **Dependence on a single founder as bottleneck** | If the founder must approve and push every change, the system doesn't scale. Phase 2 must address approval workflows and publishing permissions. |

### Key Dependencies

```
Mailchimp integration depends on: having a Mailchimp account and API key
Cal.com booking depends on: Google Calendar (or Outlook) connected
Stripe payment links depend on: Stripe account verified with banking details
Airtable Formspree sync depends on: Zapier account (free tier sufficient)
Analytics depends on: GA4 property created and measurement ID retrieved
Phase 3 depends on: Phase 1 and 2 being stable and operational
```

---

## 13. Implementation Record

*This section is a living log. Update it as decisions are made, questions are answered, and work is completed.*

---

### Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| April 2026 | Keep static HTML site as public face | No rebuild. Preserve brand identity. |
| April 2026 | Use Airtable for CRM and B2B in Phase 1 | Fastest path to structured data without custom backend |
| April 2026 | Use Mailchimp for newsletter | Automation, open tracking, free tier to 500 subscribers |
| April 2026 | Use Cal.com for booking | Open source, no per-booking fees, embeddable |
| April 2026 | Use Stripe for payments | Industry standard, deposit logic, link-based (no code required in Phase 1) |
| April 2026 | Use Notion for editorial workflow | Non-technical editors can use it without git access |
| April 2026 | Defer custom backend to Phase 3 | SaaS tools are sufficient for Phase 1–2 volume |

---

### Open Questions

- [ ] What is the target monthly booking capacity for consultations? (affects Cal.com configuration)
- [ ] Should workshops be invitation-only or open public booking?
- [ ] Is there a WeChat channel that needs to integrate with the newsletter or community system?
- [ ] What is the brand's policy on customer story publication — opt-in or opt-out?
- [ ] Is there a target B2B deal structure — wholesale, consignment, or both?
- [ ] What quarterly issue cadence is realistic — 4/year, 2/year?
- [ ] Are there existing customers from the China studio period whose data should be migrated?
- [ ] Should the B2B outreach be handled by the founder, or will someone else own this module?
- [ ] What is the privacy policy and terms of service status?

---

### Completed Milestones

- [x] Phase 1 architecture report produced
- [x] System design document created
- [ ] GA4 installed on all pages
- [ ] Newsletter form connected to Mailchimp
- [ ] Airtable commission tracker built
- [ ] Formspree → Airtable Zapier sync live
- [ ] Cal.com booking embedded on custom.html
- [ ] Mailchimp welcome automation configured
- [ ] B2B target database populated (initial 50 records)

---

### Future Improvements and Ideas

- **Bilingual newsletter:** Mailchimp supports conditional content blocks — could allow EN/ZH segmentation in a single campaign.
- **Customer story QR code:** Physical card sent with commissioned pieces linking to the customer's published story page.
- **WeChat integration:** If Chinese market becomes primary, a WeChat Mini Program would replace or supplement the newsletter flow.
- **Instagram/social proof loop:** Published customer stories could be formatted for Instagram sharing — a systematic content recycling workflow.
- **Workshop video archive:** Recorded workshop sessions could form the basis of a paid course library (Phase 4).
- **Craft documentation:** A dedicated page or section documenting the 缠花 technique — both as brand storytelling and as SEO content.
- **Quarterly print edition:** If the brand reaches sufficient scale, a physical printed quarterly becomes a premium subscriber offering.

---

### Notes for Co-founder Review

This document reflects the brand's current operational state and a practical path forward. The most important observation is that the public website already represents the brand exceptionally well — it does not need to change. What is missing is the infrastructure behind it that makes real business operations possible.

**The three things that will have the biggest immediate impact:**
1. Installing analytics (one hour of work, immediate insight)
2. Fixing the newsletter form (a few hours, starts building the list we need)
3. Setting up the Airtable commission tracker (organizes the core revenue workflow)

Everything else in this document is important but can be sequenced. These three should happen this week.

The system outlined here is designed to grow with the brand — starting lean and SaaS-based, scaling toward a unified backend only when the volume and team size justify it. The goal is always operational clarity in service of the brand's creative and cultural mission.

---

*Document maintained by: SILORA ORIENT founding team*  
*Last updated: April 2026*  
*Next review: After Phase 1 completion*
