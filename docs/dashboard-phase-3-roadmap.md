# SILORA ORIENT — Brand Operating Dashboard: Phase 3 Implementation Roadmap
# SILORA ORIENT — 品牌运营仪表板：第三阶段实施路线图

**Version · 版本:** 1.0  
**Date · 日期:** April 2026 · 2026年4月  
**Status · 状态:** Planning — Specification complete; awaiting Phase 1/2 prerequisites · 规划中——规范已完成；等待第一/二阶段前提条件  
**Audience · 适用对象:** Founder · Phase 3 Next.js developer · 创始人 · 第三阶段Next.js开发者

---

## Overview · 概述

This document is the implementation roadmap specifically for the **Brand Operating Dashboard** — the 5-panel operational hub specified in `docs/brand-operating-dashboard.md`. It complements (and extends) the broader `docs/phase-3-roadmap.md` with dashboard-specific task breakdowns, timelines, and the interim static implementation that can be deployed immediately.

本文档是**品牌运营仪表板**的专项实施路线图——`docs/brand-operating-dashboard.md`中规范的5面板运营中心。它补充（并扩展）了更广泛的`docs/phase-3-roadmap.md`，包含仪表板专项任务分解、时间表以及可立即部署的临时静态实施方案。

---

## 1. Two-Track Approach · 双轨方式

The dashboard ships in two tracks running in parallel:

仪表板通过两条并行轨道交付：

```
TRACK A: Static Dashboard (Now → Phase 3A live)
─────────────────────────────────────────────────
dashboard.html in repo root
localStorage for task state
Manual data entry by founder
PDF/CSV/Obsidian export via client-side JS
No API, no authentication, no build step
Ships: This week (Claude builds; founder reviews + pushes)

TRACK B: Next.js Dashboard (Phase 3A → ongoing)
─────────────────────────────────────────────────
/dashboard/* on silora-orient.vercel.app
Supabase Auth (magic link login)
Airtable bridge API for live data
Real-time refresh from APIs
Full role-based permissions
Ships: Phase 3A complete (~5–7 weeks of dev time)
```

Track A is replaced by Track B when Phase 3A goes live. Track A data (localStorage) is migrated to Supabase at that point.

---

## 2. Track A: Static Dashboard · 轨道A：静态仪表板

### 2A.1 What Gets Built · 构建内容

A single `dashboard.html` file in the repo root, using the same fonts and CSS variables as `styles.css`.

**Panels:**
- Panel 1: Project Status — hardcoded phase progress, founder activation queue
- Panel 2: Task Checklist — loaded from inline JSON; checked state in localStorage
- Panel 3: Sales Pipeline — manually-entered numbers in inline JSON
- Panel 4: Supplier Coord — project cards from inline JSON
- Panel 5: Strategy & Review — manually-entered metrics

**Features:**
- Collapsible panels (localStorage persistence)
- Priority badges (🔥 / 🟡 / ⭕)
- Mark Complete buttons (localStorage)
- PDF export via `window.print()` + print CSS
- CSV export via Blob URL (Panel 2 tasks)
- Obsidian export via markdown text download
- "Last updated" timestamp
- Mobile-responsive (panels collapse by default on mobile)

**No API calls** — all data is inline or in localStorage. Founder edits the JSON data blocks in `dashboard.html` to update numbers.

### 2A.2 File Structure · 文件结构

```
repo root/
├── dashboard.html          ← New file (Track A dashboard)
├── styles.css              ← Existing (imported by dashboard.html)
├── main.js                 ← Existing (not used by dashboard.html)
└── dashboard-data.js       ← New (inline data; founder edits this)
```

`dashboard-data.js` contains all the panel data as a JS object. Founder edits this file to update pipeline numbers and task states. Claude can update this file when tasks are marked complete.

### 2A.3 Track A Task List · 轨道A任务列表

| # | Task | Owner | Effort | Status |
|---|------|-------|--------|--------|
| A-01 | Build `dashboard.html` — 5-panel layout with brand CSS | Claude | 2–3 hr | ⬜ |
| A-02 | Build `dashboard-data.js` — data structure for all panels | Claude | 1 hr | ⬜ |
| A-03 | Implement collapsible panels with localStorage persistence | Claude | 1 hr | ⬜ |
| A-04 | Implement PDF export (`window.print()` + print CSS) | Claude | 1 hr | ⬜ |
| A-05 | Implement CSV export (Panel 2 tasks → Blob download) | Claude | 1 hr | ⬜ |
| A-06 | Implement Obsidian export (markdown download per panel) | Claude | 1 hr | ⬜ |
| A-07 | Implement "Mark Complete" buttons with confirmation + localStorage | Claude | 1 hr | ⬜ |
| A-08 | Mobile layout testing + responsive adjustments | Claude | 1 hr | ⬜ |
| A-09 | Founder review + content accuracy check | Founder | 30 min | ⬜ |
| A-10 | Push to git → Vercel auto-deploys | Founder | 5 min | ⬜ |

**Total Track A effort: ~10 hours (Claude) + 35 minutes (Founder)**  
**Target: Deployed within 1 week of this document being created**

---

## 3. Track B: Next.js Dashboard · 轨道B：Next.js仪表板

### 3B.0 Prerequisites · 前提条件

All must be true before Track B development begins:

| Prerequisite | Provided by | Threshold |
|-------------|-------------|-----------|
| Real subscribers in Mailchimp | Phase 1 P0-B | 50+ |
| Real commissions in Airtable | Phase 1 P0-C + Zapier | 5+ |
| B2B records in Airtable | Phase 2 Task 1.2.B | 20+ |
| GA4 data | Phase 1 P0-A | 30+ days |
| Team members needing access | Operations | 2+ |
| Next.js developer available | Founder to engage | 1 |
| Phase 2 Mailchimp welcome live | Phase 2 Task 1.2.A | Active |

### 3B.1 Phase 3A: Dashboard MVP · 第3A阶段：仪表板MVP

**Duration:** 5–7 weeks of developer time  
**Goal:** Replace Track A static dashboard with fully live, API-connected, authenticated dashboard

#### 3A Week 1: Foundation · 基础设施

| Task ID | Task | Owner | Effort | Depends on |
|---------|------|-------|--------|-----------|
| 3A-01 | Initialize Next.js 14 App Router project in `/dashboard/` | Developer | 4 hr | — |
| 3A-02 | Update `vercel.json` to add `@vercel/next` builder for `dashboard/**` | Developer | 1 hr | 3A-01 |
| 3A-03 | Verify static HTML pages still deploy correctly alongside Next.js | Developer | 2 hr | 3A-02 |
| 3A-04 | Install Tailwind CSS + shadcn/ui; configure brand color tokens | Developer | 2 hr | 3A-01 |
| 3A-05 | Set up Supabase project; configure Auth (magic link, email only) | Developer | 3 hr | — |
| 3A-06 | Implement login page at `/dashboard/login` | Developer | 3 hr | 3A-04, 3A-05 |
| 3A-07 | Implement auth middleware protecting all `/dashboard/*` routes | Developer | 2 hr | 3A-06 |
| 3A-08 | Create 6-role user table in Supabase; add founder as first user | Developer + Founder | 1 hr | 3A-05 |

#### 3A Week 2: Airtable Bridge · Airtable桥接

| Task ID | Task | Owner | Effort | Depends on |
|---------|------|-------|--------|-----------|
| 3A-09 | Create `/api/dashboard/airtable-customers` bridge endpoint | Developer | 3 hr | 3A-07 |
| 3A-10 | Create `/api/dashboard/airtable-commissions` bridge endpoint | Developer | 3 hr | 3A-07 |
| 3A-11 | Create `/api/dashboard/airtable-b2b` bridge endpoint | Developer | 3 hr | 3A-07 |
| 3A-12 | Create `/api/dashboard/mailchimp-stats` endpoint | Developer | 2 hr | 3A-07 |
| 3A-13 | Test all bridge endpoints; confirm data returns correctly | Developer | 2 hr | 3A-09–12 |
| 3A-14 | Add response caching (5-minute TTL per endpoint) | Developer | 2 hr | 3A-13 |

#### 3A Weeks 3–4: Dashboard Panels · 仪表板面板

| Task ID | Task | Owner | Effort | Depends on |
|---------|------|-------|--------|-----------|
| 3A-15 | Build global layout: top bar + sidebar (220px) + main content | Developer | 4 hr | 3A-04 |
| 3A-16 | Build Panel 1: Project Status — phase bars, task table, activation queue | Developer | 6 hr | 3A-13 |
| 3A-17 | Build Panel 2: Task Checklist — from `admin/dashboard-checklist.md` structure | Developer | 5 hr | 3A-15 |
| 3A-18 | Build Panel 3: Sales Pipeline — B2C + B2B stages, conversion rates | Developer | 6 hr | 3A-13 |
| 3A-19 | Build Panel 4: Supplier Coord — project cards, stage tracker | Developer | 5 hr | 3A-15 |
| 3A-20 | Build Panel 5: Strategy & Review — metrics + signals + weekly checklist | Developer | 5 hr | 3A-13 |
| 3A-21 | Implement collapsible panel behavior (matches Track A UX) | Developer | 2 hr | 3A-15 |

#### 3A Week 5: Export + Polish · 导出与完善

| Task ID | Task | Owner | Effort | Depends on |
|---------|------|-------|--------|-----------|
| 3A-22 | Implement PDF export (print CSS + server-side render) | Developer | 3 hr | 3A-16–20 |
| 3A-23 | Implement CSV export (Panel 2 tasks) | Developer | 2 hr | 3A-17 |
| 3A-24 | Implement Obsidian export (per-panel + all-panels markdown download) | Developer | 3 hr | 3A-16–20 |
| 3A-25 | Implement 5-minute auto-refresh (SWR or React Query) | Developer | 2 hr | 3A-13 |
| 3A-26 | Implement "Mark Complete" with confirmation + Supabase write | Developer | 3 hr | 3A-05 |
| 3A-27 | Mobile layout audit — all panels functional on iOS Safari + Android Chrome | Developer | 4 hr | 3A-15 |
| 3A-28 | Founder UAT: review all panels for accuracy + usability | Founder | 2 hr | 3A-27 |
| 3A-29 | Fix UAT issues | Developer | 3 hr | 3A-28 |
| 3A-30 | Deploy to production; verify all routes working; retire Track A | Developer | 2 hr | 3A-29 |

### 3B.2 Phase 3B: Supabase Migration · 第3B阶段：Supabase迁移

**Trigger:** Migrate from Airtable bridge when ANY of these thresholds are hit:
- >20 commissions/month
- >3 active team members needing dashboard access
- Airtable API cost >$40/month
- Consistent Airtable 429 (rate limit) errors
- Need for complex cross-table queries

**Duration:** 3–4 weeks  
**Goal:** Replace Airtable bridge with Supabase PostgreSQL + RLS

| Task ID | Task | Effort |
|---------|------|--------|
| 3B-01 | Design Supabase schema (customers, commissions, b2b_partners) | 4 hr |
| 3B-02 | Set up Row Level Security (RLS) policies per role | 4 hr |
| 3B-03 | Build data migration script: Airtable → Supabase | 8 hr |
| 3B-04 | Run migration in staging; verify data integrity | 4 hr |
| 3B-05 | Update API routes to use Supabase instead of Airtable bridge | 6 hr |
| 3B-06 | Update dashboard write operations (Mark Complete, task notes) | 4 hr |
| 3B-07 | Run parallel test (both sources) for 1 week | Ongoing |
| 3B-08 | Cut over to Supabase; disable Airtable bridge endpoints | 2 hr |
| 3B-09 | Supabase Storage: set up 7 buckets with RLS for media | 4 hr |

### 3B.3 Phase 3C: CMS Automation · 第3C阶段：内容管理系统自动化

**Goal:** Dashboard can write to `content/*.json` files → triggers Vercel redeploy → public site updates without manual file editing.

**Duration:** 3–4 weeks

| Task ID | Task | Effort |
|---------|------|--------|
| 3C-01 | Build `/api/dashboard/publish-journal` endpoint (writes to journal JSON) | 6 hr |
| 3C-02 | Build `/api/dashboard/publish-story` endpoint (writes to stories JSON) | 6 hr |
| 3C-03 | Build `/api/dashboard/publish-collection` endpoint (writes to collections JSON) | 6 hr |
| 3C-04 | Integrate Vercel Deploy Hook — trigger redeploy after JSON write | 2 hr |
| 3C-05 | Add publish flow to Brand CMS (M-1) dashboard pages | 6 hr |

---

## 4. Task Master Table · 任务主表

All 34 Track A tasks + 30 Track B tasks:

| ID | Task | Phase | Owner | Priority | Effort | Status |
|----|------|-------|-------|----------|--------|--------|
| A-01 | Build dashboard.html layout | Track A | Claude | 🔥 | 2–3 hr | ⬜ |
| A-02 | Build dashboard-data.js | Track A | Claude | 🔥 | 1 hr | ⬜ |
| A-03 | Collapsible panels + localStorage | Track A | Claude | 🔥 | 1 hr | ⬜ |
| A-04 | PDF export | Track A | Claude | 🟡 | 1 hr | ⬜ |
| A-05 | CSV export | Track A | Claude | 🟡 | 1 hr | ⬜ |
| A-06 | Obsidian export | Track A | Claude | 🟡 | 1 hr | ⬜ |
| A-07 | Mark Complete buttons | Track A | Claude | 🟡 | 1 hr | ⬜ |
| A-08 | Mobile responsive | Track A | Claude | 🟡 | 1 hr | ⬜ |
| A-09 | Founder review | Track A | Founder | 🔥 | 30 min | ⬜ |
| A-10 | Push to git | Track A | Founder | 🔥 | 5 min | ⬜ |
| 3A-01 | Next.js init | 3A | Dev | 🔥 | 4 hr | ⬜ |
| 3A-02 | vercel.json update | 3A | Dev | 🔥 | 1 hr | ⬜ |
| 3A-03 | Verify static coexistence | 3A | Dev | 🔥 | 2 hr | ⬜ |
| 3A-04 | Tailwind + shadcn + brand tokens | 3A | Dev | 🔥 | 2 hr | ⬜ |
| 3A-05 | Supabase Auth setup | 3A | Dev | 🔥 | 3 hr | ⬜ |
| 3A-06 | Login page | 3A | Dev | 🔥 | 3 hr | ⬜ |
| 3A-07 | Auth middleware | 3A | Dev | 🔥 | 2 hr | ⬜ |
| 3A-08 | User/role table + seed | 3A | Dev + Founder | 🔥 | 1 hr | ⬜ |
| 3A-09 | Airtable customers bridge | 3A | Dev | 🔥 | 3 hr | ⬜ |
| 3A-10 | Airtable commissions bridge | 3A | Dev | 🔥 | 3 hr | ⬜ |
| 3A-11 | Airtable B2B bridge | 3A | Dev | 🔥 | 3 hr | ⬜ |
| 3A-12 | Mailchimp stats bridge | 3A | Dev | 🟡 | 2 hr | ⬜ |
| 3A-13 | Test all bridges | 3A | Dev | 🔥 | 2 hr | ⬜ |
| 3A-14 | Response caching | 3A | Dev | 🟡 | 2 hr | ⬜ |
| 3A-15 | Global layout shell | 3A | Dev | 🔥 | 4 hr | ⬜ |
| 3A-16 | Panel 1: Project Status | 3A | Dev | 🔥 | 6 hr | ⬜ |
| 3A-17 | Panel 2: Task Checklist | 3A | Dev | 🔥 | 5 hr | ⬜ |
| 3A-18 | Panel 3: Sales Pipeline | 3A | Dev | 🔥 | 6 hr | ⬜ |
| 3A-19 | Panel 4: Supplier Coord | 3A | Dev | 🔥 | 5 hr | ⬜ |
| 3A-20 | Panel 5: Strategy + Review | 3A | Dev | 🟡 | 5 hr | ⬜ |
| 3A-21 | Collapsible behavior | 3A | Dev | 🔥 | 2 hr | ⬜ |
| 3A-22 | PDF export | 3A | Dev | 🟡 | 3 hr | ⬜ |
| 3A-23 | CSV export | 3A | Dev | 🟡 | 2 hr | ⬜ |
| 3A-24 | Obsidian export | 3A | Dev | 🟡 | 3 hr | ⬜ |
| 3A-25 | Auto-refresh | 3A | Dev | 🟡 | 2 hr | ⬜ |
| 3A-26 | Mark Complete + Supabase write | 3A | Dev | 🔥 | 3 hr | ⬜ |
| 3A-27 | Mobile audit | 3A | Dev | 🔥 | 4 hr | ⬜ |
| 3A-28 | Founder UAT | 3A | Founder | 🔥 | 2 hr | ⬜ |
| 3A-29 | UAT fixes | 3A | Dev | 🔥 | 3 hr | ⬜ |
| 3A-30 | Production deploy + Track A retirement | 3A | Dev | 🔥 | 2 hr | ⬜ |

---

## 5. Timeline · 时间表

```
NOW ─────────────────────── PHASE 1 ACTIVE ────── PHASE 2 ACTIVE ──── DEV AVAILABLE

Week 0: Track A planning + build (Claude, this week)
  ├── A-01 through A-08: Claude builds dashboard.html
  └── A-09, A-10: Founder reviews + pushes

Weeks 1–N: Phase 1 + Phase 2 activation (Founder)
  ├── GA4, Mailchimp, Airtable, Zapier, Cal.com, Stripe
  └── Mailchimp welcome, B2B database, outreach

[Prerequisites met → Engage developer]

Week P+1 through P+5: Phase 3A build (Developer)
  ├── Week 1: Foundation (3A-01 → 3A-08)
  ├── Week 2: Airtable bridge (3A-09 → 3A-14)
  ├── Weeks 3–4: All 5 panels (3A-15 → 3A-21)
  ├── Week 5: Export + polish + UAT (3A-22 → 3A-30)
  └── Phase 3A live → Track A retired

[Volume triggers met → Phase 3B]

Weeks P+6 through P+10: Phase 3B (Supabase migration)
  └── 3B-01 through 3B-09

[Phase 3B stable → Phase 3C]

Weeks P+11 through P+14: Phase 3C (CMS automation)
  └── 3C-01 through 3C-05
```

---

## 6. Developer Handoff Package · 开发者交接包

When engaging a Next.js developer for Phase 3A, provide all of these:

| Document | Location | What it contains |
|----------|----------|-----------------|
| Dashboard specification | `docs/brand-operating-dashboard.md` | 5-panel design, features, all field specs |
| Architecture blueprint | `docs/dashboard-architecture.md` | System design, routing, tech stack, modules |
| UI wireframes | `admin/dashboard-ui-spec.md` | ASCII wireframes for every page |
| Upload workflow | `admin/dashboard-upload-workflow.md` | 8-state workflow, Supabase storage buckets |
| Phase 3 roadmap | `docs/phase-3-roadmap.md` | Full 24-task master plan |
| This document | `docs/dashboard-phase-3-roadmap.md` | Dashboard-specific tasks + Track A/B detail |

**Day 1 developer instructions:**

```
1. Read docs/brand-operating-dashboard.md in full (main spec)
2. Read docs/dashboard-architecture.md Sections 1–5 (architecture + routing)
3. Review admin/dashboard-ui-spec.md Panel layouts
4. Set up Supabase project (free tier is fine for Phase 3A)
5. Begin with 3A-01: Next.js init in /dashboard/ directory
6. Do NOT touch any existing HTML files in repo root
7. Test vercel.json change on a branch before merging to main
```

---

## 7. Risk Register · 风险登记册

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Track A becomes permanent (no developer engaged) | Medium | No live data; founder stuck with manual updates | Build Track A robustly so manual updates are easy; set a review date 3 months out |
| Airtable API rate limits hit during Phase 3A | Low | Dashboard data lags | Caching in 3A-14; migrate to Supabase 3B if persistent |
| Next.js + static HTML coexistence breaks Vercel routing | Medium | Public site 404s | Test on branch first; keep explicit routes in vercel.json |
| Supabase Auth magic link goes to spam | Low | Founder/team can't log in | Set up Supabase custom SMTP (SendGrid or Mailgun) before launch |
| Track A localStorage cleared by browser | Low | Task states lost | Export to Obsidian regularly; note states are non-critical (source of truth is docs/) |
| Phase 3A built before real data exists | Medium | Dashboard shows all zeros; hard to validate | Enforce prerequisites table in Section 3B.0 |

---

## 8. Success Criteria for Track A Launch · 轨道A发布成功标准

- [ ] `dashboard.html` loads without errors in Chrome + Safari + mobile
- [ ] All 5 panels render with correct content
- [ ] Collapsible panels open/close; state persists on page reload
- [ ] Mark Complete works; completed task shows checkmark and date
- [ ] PDF export prints all panels cleanly
- [ ] CSV downloads with correct task data
- [ ] Obsidian export produces valid markdown
- [ ] Mobile: all panels readable; export buttons accessible
- [ ] No console errors on load

## 9. Success Criteria for Phase 3A Launch · 第3A阶段发布成功标准

- [ ] `/dashboard/` accessible only after magic link login
- [ ] Founder can log in with their email
- [ ] All 5 panels load with real data from Airtable bridge
- [ ] Data refreshes automatically every 5 minutes
- [ ] Mark Complete writes to Supabase + updates UI
- [ ] PDF, CSV, Obsidian export all work
- [ ] Mobile fully functional on iOS Safari
- [ ] No existing static HTML pages broken
- [ ] Track A (`dashboard.html`) retired

---

*Document version: 1.0 · April 2026*  
*Main dashboard spec: `docs/brand-operating-dashboard.md`*  
*Broader Phase 3 plan: `docs/phase-3-roadmap.md`*
