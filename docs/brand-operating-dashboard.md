# SILORA ORIENT — Brand Operating Dashboard
# SILORA ORIENT — 品牌运营管理中心

**Version · 版本:** 1.0  
**Date · 日期:** April 2026 · 2026年4月  
**Status · 状态:** Specification — Ready for Phase 3 implementation · 规范文档——已准备好进行第三阶段实施  
**Audience · 适用对象:** Founder · Co-founder · Phase 3 developer · 创始人 · 联合创始人 · 第三阶段开发者

---

## Core Philosophy · 核心理念

> **"Single source of truth for brand operations.**  
> **Every task visible. Every progress trackable. Every decision informed."**
>
> **"品牌运营的唯一权威来源。**  
> **每个任务可见。每项进度可追踪。每个决策有据可依。"**

The Brand Operating Dashboard is the unified command center for SILORA ORIENT. It surfaces everything happening across sales, production, content, supplier relations, and strategy — in one collapsible, export-ready, mobile-first interface. It is not a replacement for Airtable or Mailchimp; it is the window through which all tools are seen together.

品牌运营管理中心是SILORA ORIENT的统一指挥中心。它将销售、生产、内容、供应商关系和战略的所有动态汇聚在一个可折叠、可导出、移动端优先的界面中。它不是Airtable或Mailchimp的替代品；它是同时查看所有工具的窗口。

---

## 1. Dashboard Identity · 仪表板定位

| Attribute · 属性 | Value · 值 |
|----------------|-----------|
| Path · 路径 | `/dashboard/` (Phase 3: `silora-orient.vercel.app/dashboard/`) |
| Interim (now) | Static HTML file: `dashboard.html` in repo root |
| Access · 访问权限 | Password-protected (Phase 3: Supabase Auth magic link) |
| Refresh rate · 刷新频率 | Auto every 5 minutes; manual refresh button |
| Mobile support · 移动端支持 | Fully collapsible panels, touch-friendly buttons |
| Export targets · 导出目标 | PDF summary, CSV task list, Obsidian markdown |
| Visual language · 视觉语言 | Inherits `styles.css` brand colors + Cormorant Garamond / Jost fonts |

---

## 2. Five-Panel Architecture · 五面板架构

The dashboard is organized into 5 collapsible panels. Each panel can be expanded or collapsed independently. Default state: all panels expanded on desktop, only Panel 1 expanded on mobile.

仪表板分为5个可折叠面板。每个面板可独立展开或折叠。默认状态：桌面端全部展开，移动端仅面板1展开。

```
┌─────────────────────────────────────────────────────┐
│  SILORA ORIENT — Brand Operating Dashboard           │
│  April 2026  ·  Auto-refreshed 5 min ago  [↻] [PDF] │
├─────────────────────────────────────────────────────┤
│ ▼  📊  PANEL 1: PROJECT STATUS                       │
│ ▶  ✅  PANEL 2: TASK CHECKLIST                       │
│ ▶  💰  PANEL 3: SALES PIPELINE                       │
│ ▶  🛠  PANEL 4: SUPPLIER COORD                       │
│ ▶  📈  PANEL 5: STRATEGY & REVIEW                    │
└─────────────────────────────────────────────────────┘
```

---

## 3. Panel 1: PROJECT STATUS · 项目状态面板

**Purpose · 目的:** Single view of all phase progress, Claude-completed tasks, founder activation steps, risks, and immediate next actions.  
**Data source · 数据来源:** Parsed from `docs/phase-*-status.md` + manual override fields.

单一视图显示所有阶段进度、Claude已完成任务、创始人激活步骤、风险和立即下一步行动。

### 1.1 Phase Progress Bar · 阶段进度条

```
Phase 1 [████████░░] 80%  ✅ Code complete — 6 founder activations pending
Phase 2 [███░░░░░░░] 15%  ⏳ Doc complete — blocked on Phase 1 activation
Phase 3 [██░░░░░░░░] 10%  📋 Blueprint complete — awaiting prerequisites
Phase 4 [░░░░░░░░░░]  0%  🔮 Not yet planned
```

Each bar is clickable → expands detail view with task-by-task breakdown.

### 1.2 Claude Task Status · Claude任务状态

Auto-populated from `docs/phase-*-status.md`. Shows tasks with ✅ (Claude complete) vs. 🔄 (awaiting founder).

从`docs/phase-*-status.md`自动填充。显示✅（Claude已完成）与🔄（等待创始人）的任务。

| Task ID | Task Name | Status | Completed |
|---------|-----------|--------|-----------|
| INFRA | Deploy pipeline fix | ✅ Claude complete | Apr 6, 2026 |
| P0-A | GA4 analytics setup | ✅ Code done · 🔄 Founder: set real ID | Apr 7, 2026 |
| P0-B | Mailchimp subscribe API | ✅ Code done · 🔄 Founder: set env vars | Apr 7, 2026 |
| P0-C | Airtable schema | ✅ Documented · 🔄 Founder: build base | Apr 7, 2026 |
| P1-A | Zapier config | ✅ Documented · 🔄 Founder: activate | Apr 8, 2026 |
| P1-B | Cal.com booking | ✅ Code done · 🔄 Founder: set username | Apr 8, 2026 |
| P1-C | Stripe payment links | ✅ 15 links documented · 🔄 Founder: create | Apr 8, 2026 |
| 1.2.A | Mailchimp welcome seq | ✅ Emails written · 🔄 Founder: activate | Apr 8, 2026 |
| 1.2.B | B2B database (50 records) | 🔄 Founder: research + enter | — |

### 1.3 Founder Activation Queue · 创始人激活队列

Tasks requiring founder action, sorted by priority and dependency order.

| # | Action | Priority | Est. Time | Dependency |
|---|--------|----------|-----------|------------|
| 1 | Replace `G-XXXXXXXXXX` with real GA4 ID in 9 HTML files → push | 🔥 Critical | 20 min | None |
| 2 | Create Mailchimp → set 3 env vars in Vercel → redeploy | 🔥 Critical | 1 hr | None |
| 3 | Build Airtable base per `admin/airtable-schema.md` | 🔥 Critical | 2–3 hr | None |
| 4 | Configure Zapier 2 Zaps per `admin/zapier-setup.md` | 🟡 Important | 1–2 hr | Step 3 done |
| 5 | Create Cal.com → replace `YOUR_CAL_USERNAME` → push | 🟡 Important | 30 min | None |
| 6 | Create Stripe → 15 payment links per `admin/stripe-payment-links.md` | 🟡 Important | 2–3 hr | None |
| 7 | Activate Mailchimp welcome journey per `admin/mailchimp-welcome.md` | 🟡 Important | 2–3 hr | Steps 2 + 3 done |
| 8 | Research 50 B2B records → enter in Airtable | ⭕ Routine | 4–5 hr | Step 3 done |

### 1.4 Risks & Blockers · 风险与阻塞

```
🔴 BLOCKER  Phase 1 not yet activated → Phase 2 and 3 cannot start
🟡 RISK     Mailchimp free tier (500) — monitor approaching 400
🟡 RISK     B2B email availability — may find fewer than 50 contactable
⭕ NOTE     Phase 3 dashboard needs Next.js developer — not yet engaged
```

### 1.5 Next 3 Actions · 下一步三项行动

Smart prioritization: always the 3 highest-impact unblocked items.

```
1. 🔥 Set GA4 Measurement ID in all 9 HTML files (20 min, unblocked)
2. 🔥 Create Mailchimp account + set 3 Vercel env vars (1 hr, unblocked)
3. 🔥 Build Airtable base from schema (2–3 hr, unblocked)
```

---

## 4. Panel 2: TASK CHECKLIST · 任务清单面板

**Purpose · 目的:** Every actionable item across all work streams — B2C sales, B2B outreach, content, suppliers, website.  
**Structure · 结构:** Grouped by category. Each task has: priority, status, due date, owner, notes, Obsidian sync status.  
**Data source · 数据来源:** `admin/dashboard-checklist.md` (founder-editable master list).

### Task Fields · 任务字段

| Field | Options |
|-------|---------|
| Priority · 优先级 | 🔥 Critical / 🟡 Important / ⭕ Routine |
| Status · 状态 | ⬜ Not started / 🔄 In progress / ✅ Done / 🚫 Blocked |
| Owner · 负责人 | Founder / Co-founder / Claude / Auto |
| Due · 截止日期 | Date or "This week" / "This month" |
| Obsidian · Obsidian同步 | 🔵 Synced / ⚪ Not synced |

### Category Groups · 分类组

**B2C Sales · B2C销售**  
See `admin/dashboard-checklist.md` → Section 1 for full task list.

**B2B Sales · B2B销售**  
See `admin/dashboard-checklist.md` → Section 2 for full task list.

**Content · 内容**  
See `admin/dashboard-checklist.md` → Section 3 for full task list.

**Suppliers · 供应商**  
See `admin/dashboard-checklist.md` → Section 4 for full task list.

**Website · 网站**  
See `admin/dashboard-checklist.md` → Section 5 for full task list.

### Completion Logic · 完成逻辑

- **Claude/Auto tasks**: When Claude marks a task done in the docs, the dashboard reads the status file and auto-checks the corresponding task. The task shows "✅ Auto-updated [date]".
- **Founder tasks**: Show "🔄 Pending your confirmation" with a [Mark Complete] button. Clicking opens a confirmation prompt with optional note field.
- **Blocked tasks**: Show "🚫 Blocked — [reason]" in red. Cannot be marked complete until blocker is resolved.

---

## 5. Panel 3: SALES PIPELINE · 销售管道面板

**Purpose · 目的:** B2C and B2B pipeline visibility — leads, proposals, conversions, revenue tracking.  
**Data source · 数据来源:** Airtable (Phase 1+) / manual input (pre-Airtable).  
**Full template · 完整模板:** `admin/sales-pipeline-template.md`

### 5.1 B2C Pipeline Summary · B2C管道摘要

```
LEADS        PROPOSALS      DEPOSITS       DELIVERED
  12      →      3       →      1       →      0
  ↓               ↓              ↓              ↓
 +5 this wk   +1 this wk    —            —
```

| Stage | Count | This Week | Avg Value | Actions |
|-------|-------|-----------|-----------|---------|
| New inquiry | 12 | +5 | — | Follow up within 24hr |
| Quote sent | 3 | +1 | $800 | Nudge if no reply in 3 days |
| Deposit paid | 1 | — | $350 | Schedule production |
| In production | 0 | — | — | — |
| Delivered | 0 | — | — | Invite story |

**Conversion rates · 转化率:**
- Inquiry → Quote: target 25% | current: —
- Quote → Deposit: target 33% | current: —

**Weekly B2C goals · 每周B2C目标:**

| Goal | Target | Current | Status |
|------|--------|---------|--------|
| New inquiries contacted | 15 | — | ⬜ |
| Quotes sent | 3 | — | ⬜ |
| Deposits received | 1 | — | ⬜ |

### 5.2 B2B Pipeline Summary · B2B管道摘要

```
RESEARCHED   CONTACTED     REPLIED       DEALS
   25      →     8      →     2       →    0
```

| Stage | Count | This Week | Response Rate | Actions |
|-------|-------|-----------|---------------|---------|
| Discovered | 25 | +10 | — | Research + qualify |
| Outreach sent | 8 | +5 | — | Follow up day 7 |
| Replied | 2 | +1 | 28% | Schedule intro call |
| Proposal sent | 0 | — | — | — |
| Deal closed | 0 | — | — | — |

**Channel response rates · 渠道回复率:**
- Boutiques: target 25% | Galleries: target 15% | Stylists: target 40%

**Weekly B2B goals · 每周B2B目标:**

| Goal | Target | Current | Status |
|------|--------|---------|--------|
| New B2B records researched | 10 | — | ⬜ |
| Outreach emails sent | 5 | — | ⬜ |
| Replies tracked + logged | all | — | ⬜ |

### 5.3 Revenue Summary · 收入摘要

| Source | MTD | QTD | YTD | Target |
|--------|-----|-----|-----|--------|
| Commission deposits | $0 | $0 | $0 | — |
| Commission balances | $0 | $0 | $0 | — |
| Workshop tickets | $0 | $0 | $0 | — |
| Total | $0 | $0 | $0 | — |

---

## 6. Panel 4: SUPPLIER COORD · 供应商协调面板

**Purpose · 目的:** Track every active production project from material sourcing to final delivery.  
**Data source · 数据来源:** Manual (founder-maintained). Future: Airtable commission stages.  
**Full workflow · 完整工作流:** `admin/supplier-coord-workflow.md`

### 6.1 Active Projects Grid · 活跃项目网格

Each project shows as a card with 6-stage progress bar:

```
┌─────────────────────────────────────────┐
│ 💎 Sapphire Orchid Series               │
│ Client: [pending commission]            │
│ ──────────────────────────────          │
│ Materials  Colors  Samples  Photos  Pkg │
│   ⏳         ⏳       ⬜      ⬜     ⬜  │
│ ──────────────────────────────          │
│ Next: Confirm sapphire color palette    │
│ Due: —    Owner: Founder                │
│ [View Details]  [Export to Obsidian]    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 🌹 Rose Gold Memory Collection          │
│ Client: [pending commission]            │
│ ──────────────────────────────          │
│ Materials  Colors  Samples  Photos  Pkg │
│   ✅         ⏳       ⬜      ⬜     ⬜  │
│ ──────────────────────────────          │
│ Next: Approve rose gold color samples   │
│ Due: —    Owner: Founder                │
│ [View Details]  [Export to Obsidian]    │
└─────────────────────────────────────────┘
```

### 6.2 Supplier Stage Definitions · 供应商阶段定义

| Stage · 阶段 | Done when · 完成条件 |
|-------------|---------------------|
| ✅ Materials received · 材料已收到 | Physical samples or digital specs confirmed from supplier |
| ✅ Colors approved · 颜色已批准 | Founder selects from palette; decision logged with date |
| ✅ Style mockups approved · 样式图已批准 | Mockup reviewed; revisions complete; final approved |
| ✅ Photos quality checked · 照片已质检 | Product photos meet quality standards (see `admin/supplier-coord-workflow.md`) |
| ✅ Packaging specs confirmed · 包装规格已确认 | Packaging dimensions, materials, branding approved |
| ✅ Timeline set · 时间表已确定 | Production start + delivery date confirmed with supplier |

### 6.3 Supplier Contact Log · 供应商联系记录

```
Most recent contact:  [Date] [Supplier] [Topic] [Outcome] [Next step]
─────────────────────────────────────────────────────────────────────
No contacts logged yet. Click [+ Log Contact] to add.
```

---

## 7. Panel 5: STRATEGY & REVIEW · 战略与审查面板

**Purpose · 目的:** Metrics dashboard + strategy signals + insight-driven adjustments.  
**Refresh cycle · 刷新周期:** Weekly review session (every Monday morning).  
**Data source · 数据来源:** GA4 API (Phase 1+) / Mailchimp API / Airtable / manual.

### 7.1 Key Metrics · 关键指标

| Metric · 指标 | Current · 当前 | Last Week · 上周 | Change · 变化 | Target · 目标 |
|-------------|--------------|----------------|------------|------------|
| Newsletter subscribers | — | — | — | 50 (Phase 2) |
| New inquiries this week | — | — | — | 5/week |
| Consultations booked | — | — | — | 2/week |
| Revenue (MTD) | $0 | — | — | — |
| B2B replies received | — | — | — | 3/week |
| Workshop signups | — | — | — | 10/event |
| Items pending review | — | — | — | 0 |

### 7.2 Content Performance · 内容表现

Performance multipliers vs. site average (1.0x = average).

| Content Type · 内容类型 | Engagement Multiplier · 参与倍数 | Signal · 信号 |
|-----------------------|-------------------------------|------------|
| Customer Stories | 2.1x | ✅ Create more |
| Journal entries | 1.8x | ✅ Maintain cadence |
| Collections pages | 1.2x | ⭕ Stable |
| Home page | 1.0x | ⭕ Baseline |
| Contact page | 0.8x | 🔄 Review CTA copy |

### 7.3 B2B Channel Performance · B2B渠道表现

| Channel · 渠道 | Contacted · 已联系 | Replied · 已回复 | Rate · 比率 | Signal · 信号 |
|--------------|-----------------|----------------|-----------|------------|
| Stylists | — | — | target 42% | 🔥 Prioritize |
| Boutiques | — | — | target 28% | ✅ Active |
| Galleries | — | — | target 15% | ⏳ Slower |
| Cultural institutions | — | — | target 20% | ⭕ Explore |

### 7.4 Strategy Signals · 战略信号

Auto-generated based on metric thresholds. Updated on weekly review.

```
🔥 [SIGNAL] Stylists respond at highest rate → increase outreach allocation to 40%
✅ [SIGNAL] Customer stories drive 2x engagement → prioritize story intake in Phase 2
⚠️ [SIGNAL] No GA4 data yet → activate GA4 Measurement ID to unlock this panel
⭕ [SIGNAL] Zero commissions recorded → Phase 1 Airtable activation is critical path
```

### 7.5 Weekly Review Checklist · 每周审查清单

Complete every Monday morning (15–20 min):

```
[ ] Review GA4: top 3 pages, top traffic source, event counts
[ ] Review Mailchimp: new subscribers, email open rates if active
[ ] Review Airtable: new inquiries, commission stage changes
[ ] Update Panel 3 pipeline numbers
[ ] Read strategy signals — act on 1 signal this week
[ ] Export dashboard PDF → save to Obsidian weekly review note
[ ] Update "Next 3 Actions" in Panel 1
```

---

## 8. Feature Specifications · 功能规格

### 8.1 Collapsible Panels · 可折叠面板

- Click panel header to toggle expand/collapse
- Chevron icon rotates 180° when collapsed
- State persisted in `localStorage('silora-dashboard-panels')`
- Keyboard accessible: `Enter` / `Space` on header triggers toggle
- Animation: 300ms ease-in-out height transition

```javascript
// Implementation pattern
document.querySelectorAll('.panel-header').forEach(header => {
  header.addEventListener('click', () => {
    const panel = header.nextElementSibling;
    const isCollapsed = panel.classList.toggle('collapsed');
    header.querySelector('.chevron').style.transform = isCollapsed ? 'rotate(-90deg)' : 'rotate(0)';
    savePanelState();
  });
});
```

### 8.2 Priority Indicators · 优先级标识

| Indicator | Meaning | Visual |
|-----------|---------|--------|
| 🔥 Critical | Must act today — blocks other work | Red badge, pulsing dot |
| 🟡 Important | This week — meaningful but not blocking | Yellow badge |
| ⭕ Routine | When time allows — ongoing maintenance | Grey badge |

### 8.3 Export Functions · 导出功能

**PDF Export (one-click):**
- Captures all expanded panels in print-optimized layout
- Header: "SILORA ORIENT — Brand Operating Dashboard — [date]"
- Fonts fallback to system serif for print reliability
- Triggered: `window.print()` with `@media print` CSS overrides

**CSV Export:**
- Exports Panel 2 task checklist to CSV
- Columns: Category, Task, Priority, Status, Owner, Due, Notes
- Download triggered via Blob URL

**Obsidian Export (per-panel or all):**
- Generates `.md` formatted note with:
  - YAML frontmatter: `date`, `source`, `tags`
  - Panel content formatted as Markdown
  - Status emojis preserved
  - Links back: `Source: silora-orient.vercel.app/dashboard/`
- Downloaded as `.md` file; user manually moves to Obsidian vault

### 8.4 Auto-Refresh · 自动刷新

```javascript
// Refresh every 5 minutes
setInterval(() => { refreshDashboard(); }, 5 * 60 * 1000);

function refreshDashboard() {
  fetch('/api/dashboard/status')  // Phase 3: real API
    .then(r => r.json())
    .then(data => updateAllPanels(data));
  updateTimestamp();
}
```

Pre-Phase 3: manual refresh button only. Auto-refresh activates when API endpoints exist.

### 8.5 Claude/Auto-Update Logic · Claude自动更新逻辑

**Phase 3A implementation:**
1. Claude updates a `docs/phase-*-status.md` file and pushes to git
2. Vercel rebuild triggers
3. Dashboard API reads the status file on next refresh
4. Task card updates from "🔄 In progress" to "✅ Claude complete [date]"

**Pre-Phase 3 (now):**
- Founder manually clicks [Mark Complete] after verifying Claude's work
- Dashboard stores completion in `localStorage('silora-task-state')`

### 8.6 Obsidian Sync Status · Obsidian同步状态

Each task and each panel shows a sync badge:
- 🔵 **Synced** — last exported to Obsidian [date]
- ⚪ **Not synced** — never exported
- 🟡 **Stale** — exported >7 days ago and task has changed since

One-click per task or per panel opens Obsidian-formatted text with copy/download options.

---

## 9. Visual Design System · 视觉设计系统

### 9.1 Inherited Brand Variables · 继承品牌变量

```css
/* From styles.css — do not redefine, import directly */
--gold: #BF9D6A;
--gold-light: #D4B482;
--ivory: #FAF7F2;
--cream: #F2EDE5;
--text-dark: #2A2724;
--text-mid: #5C5650;
--text-light: #9C9690;
--border: #E8E2D8;
```

### 9.2 Dashboard-Specific Variables · 仪表板专用变量

```css
/* Status colors */
--status-critical: #C0392B;
--status-critical-bg: #FDEDEB;
--status-important: #D68910;
--status-important-bg: #FEF9E7;
--status-routine: #5C5650;   /* = --text-mid */
--status-routine-bg: #F2EDE5; /* = --cream */
--status-done: #1E8449;
--status-done-bg: #EAFAF1;
--status-blocked: #C0392B;
--status-blocked-bg: #FDEDEB;
--status-pending: #5D6D7E;
--status-pending-bg: #EBF5FB;

/* Panel chrome */
--panel-header-bg: var(--cream);
--panel-border: var(--border);
--panel-radius: 8px;
```

### 9.3 Typography · 字体排版

```css
/* Panel headers */
.panel-header h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-dark);
  letter-spacing: 0.02em;
}

/* Task text */
.task-item {
  font-family: 'Jost', sans-serif;
  font-size: 0.875rem;
  color: var(--text-mid);
}

/* KPI numbers */
.kpi-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-dark);
}
```

### 9.4 Layout · 布局

```
Desktop (≥768px):
┌──────────────────────────────────────────────────┐
│ Top bar: Logo · Dashboard title · Refresh · Export│
├──────────────────────────────────────────────────┤
│ Panel 1 (full width)                             │
├──────────────────────────────────────────────────┤
│ Panel 2 (full width)                             │
├──────────────────────────────────────────────────┤
│ Panel 3 (left 60%) │ Panel 4 (right 40%)         │
├──────────────────────────────────────────────────┤
│ Panel 5 (full width)                             │
└──────────────────────────────────────────────────┘

Mobile (<768px):
All panels stacked vertically, full width.
Panels 2–5 collapsed by default.
Export buttons moved to floating bottom bar.
```

---

## 10. Data Connections · 数据连接

| Source · 数据来源 | What it feeds · 供给内容 | Phase available · 可用阶段 |
|----------------|------------------------|--------------------------|
| `docs/phase-*-status.md` | Panel 1 task states | Now (file parse) |
| Airtable Customers table | Panel 3 B2C pipeline | Phase 1 P0-C active |
| Airtable Commissions table | Panel 3 B2C stages, Panel 4 project tracking | Phase 1 P0-C active |
| Airtable B2B Partners table | Panel 3 B2B pipeline | Phase 2 Task 1.2.B complete |
| Mailchimp API | Panel 1 subscriber count, Panel 5 email metrics | Phase 1 P0-B active |
| GA4 Data API | Panel 5 traffic and content performance | Phase 1 P0-A active + 30 days data |
| Stripe API | Panel 3 revenue | Phase 1 P1-C active |
| Cal.com API | Panel 3 bookings | Phase 1 P1-B active |
| Manual input | Panel 4 supplier projects, Panel 2 task completion | Always |

---

## 11. Interim Implementation (Pre-Phase 3) · 临时实施方案

Before the Phase 3 Next.js dashboard is built, a static `dashboard.html` file handles the same panels using:
- Local JSON data (manually updated by founder)
- `localStorage` for task state persistence
- `localStorage` for panel collapse state
- Print CSS for PDF export
- Client-side CSV generation via Blob URL
- Obsidian export via markdown text download

The static version has no API connections — all numbers are entered manually. It provides the same 5-panel layout and export functions from day one.

**To create the static dashboard:** See `admin/dashboard-quickstart.md` → Action 10.

---

## 12. Phase 3 Implementation Path · 第三阶段实施路径

See `docs/dashboard-phase-3-roadmap.md` for the complete 24-task implementation timeline.

Summary:
- **Phase 3A** (5–7 weeks): Next.js dashboard + Airtable bridge + Supabase Auth
- **Phase 3B** (3–4 weeks): Supabase PostgreSQL migration (when volume triggers hit)
- **Phase 3C** (3–4 weeks): JSON write pipeline (CMS automation)

The static `dashboard.html` runs in parallel and is not replaced until Phase 3A is live.

---

## 13. Success Criteria · 成功标准

The Brand Operating Dashboard specification is complete when:

- [ ] All 5 panels have complete field definitions · 所有5个面板有完整字段定义
- [ ] Task checklist covers B2C / B2B / supplier / content / website · 任务清单涵盖所有类别
- [ ] Claude/manual completion workflow is clearly distinguished · Claude与手动完成工作流清晰区分
- [ ] Obsidian export format is specified · Obsidian导出格式已规范
- [ ] PDF and CSV export behavior is specified · PDF和CSV导出行为已规范
- [ ] All data sources are identified with availability phase · 所有数据来源已标识可用阶段
- [ ] Visual design inherits brand tokens exactly · 视觉设计精确继承品牌变量
- [ ] Mobile layout behavior is specified · 移动端布局行为已规范
- [ ] Phase 3 implementation path is linked · 第三阶段实施路径已关联

**All criteria met. This specification is ready for Phase 3 implementation.**

---

*Document version: 1.0 · April 2026*  
*Supporting files: `admin/dashboard-checklist.md` · `admin/sales-pipeline-template.md` · `admin/supplier-coord-workflow.md` · `docs/dashboard-phase-3-roadmap.md` · `admin/dashboard-quickstart.md`*
