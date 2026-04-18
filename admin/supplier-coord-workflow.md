# SILORA ORIENT — Supplier Coordination Workflow
# SILORA ORIENT — 供应商协调工作流程

**Version · 版本:** 1.0  
**Date · 日期:** April 2026 · 2026年4月  
**Purpose · 用途:** End-to-end supplier management for every production project — materials, colors, samples, photos, packaging, timelines. Powers Panel 4 of the Brand Operating Dashboard.  
**主要用途:** 每个生产项目从头到尾的供应商管理——材料、颜色、样品、照片、包装、时间表。驱动品牌运营仪表板第4面板。

---

## Part 1: Supplier Relationship Overview · 供应商关系概述

### 1.1 Supplier Categories · 供应商分类

| Category · 分类 | What They Supply · 供应内容 | Lead Time · 交货周期 | Communication Frequency · 沟通频率 |
|----------------|--------------------------|--------------------|------------------------------------|
| Silk flower material | Raw silk, wire, dye materials for 绢花 craft | 3–6 weeks | Monthly + per order |
| Gemstones | Sapphires, garnets, moonstones, other stones | 2–4 weeks | Per commission |
| Precious metals | Gold fill, sterling silver, rose gold components | 1–3 weeks | Per commission |
| Packaging | Gift boxes, tissue, ribbon, cards | 4–8 weeks | Per collection or seasonal |
| Photography | Product photo shoots | 1–2 weeks booking | Per collection or batch |

### 1.2 Supplier Contact Master List · 供应商联系方式主列表

| ID | Name | Category | Contact | Email | Country | Lead Time | Relationship Status | Notes |
|----|------|----------|---------|-------|---------|-----------|--------------------|----|
| SUP-001 | — | — | — | — | — | — | Active | — |

*Add one row per supplier. ID format: `SUP-[3-digit number]`*

---

## Part 2: Per-Project Workflow · 单项目工作流程

### 2.1 Project Stage Map · 项目阶段图

Every production project (commission or brand collection) follows this 6-stage path:

```
STAGE 1          STAGE 2          STAGE 3          STAGE 4          STAGE 5          STAGE 6
Materials     →  Colors        →  Samples       →  Photos        →  Packaging     →  Production
                                                                                      Timeline
─────────────────────────────────────────────────────────────────────────────────────────────
Supplier sends   Founder selects  Supplier makes   Finished piece   Packaging        Final
samples or       from palette     prototype or     photographed     specs confirmed  schedule
specs            or confirms      sends mockup                      & received       agreed
                 from options
─────────────────────────────────────────────────────────────────────────────────────────────
Owner: Both      Owner: Founder   Owner: Both      Owner: Founder   Owner: Both      Owner: Both
Max: 7 days      Max: 3 days      Max: 14 days     Max: 5 days      Max: 7 days      Max: 3 days
after receipt    to decide        per revision     to review                         to confirm
```

### 2.2 Stage 1: Materials · 第一阶段：材料

**Goal:** Confirm supplier can source the required materials; receive samples or detailed specs.

**Checklist:**
```
[ ] Contact supplier with specific material requirements (type, grade, color range, quantity)
[ ] Request physical samples OR detailed spec sheet with photos
[ ] Set expected delivery date for samples
[ ] Receive samples or specs
[ ] Inspect: material quality, workability, consistency
[ ] Decision: Approve → advance to Stage 2 | Request alternative → restart Stage 1 | Reject supplier → find alternative
[ ] Log outcome with date in Supplier Contact Log
```

**Decision criteria:**
- Silk: consistent fiber weight, no tearing, dye takes evenly
- Gemstones: color matches spec, no visible inclusions (or inclusions are as described), calibrated size
- Metals: gauge correct, finish is consistent, no corrosion

**If rejected:** Document reason clearly. Contact alternative supplier. Do not advance to color stage until materials are confirmed.

### 2.3 Stage 2: Colors · 第二阶段：颜色

**Goal:** Finalize the exact color palette for the piece or collection.

**Checklist:**
```
[ ] Receive color palette options from supplier (physical swatches preferred; digital photos acceptable)
[ ] Photograph swatches in natural daylight for accurate reference
[ ] Compare against commission brief or collection mood board
[ ] Make final color selection — maximum 3 rounds of revision
[ ] Log decision: [Date] [Color name/code] [Supplier reference ID] [Reason for selection]
[ ] Send written confirmation to supplier with reference photos
[ ] Supplier confirms they can produce selected color
```

**Color documentation format:**
```
PROJECT: [Name]
COLOR DECISION DATE: [Date]
SELECTED COLORS:
  1. [Color name] — Supplier ref: [ID] — Use: [component/element]
  2. [Color name] — Supplier ref: [ID] — Use: [component/element]
APPROVED BY: Founder
SUPPLIER CONFIRMATION: [Date received]
```

### 2.4 Stage 3: Samples & Mockups · 第三阶段：样品与样图

**Goal:** Review prototype or mockup before full production begins.

**Checklist:**
```
[ ] Supplier sends mockup/prototype (physical preferred; digital 3D or photo acceptable for first round)
[ ] Review against original design brief:
    [ ] Proportions match intended wearability
    [ ] Colors match approved swatches
    [ ] Finishing quality meets brand standards
    [ ] Gemstone placement as designed
    [ ] Weight feels appropriate for the intended piece
[ ] Decision: Approve → advance | Request revision → document specific changes
[ ] If revising: send written revision notes (specific, not subjective — e.g., "reduce petal size by 15%", not "make it smaller")
[ ] Revision limit: 3 rounds. After 3 revisions, escalate decision.
[ ] Log final approval with date
```

**Revision note format:**
```
REVISION REQUEST — [Project] — Round [#] — [Date]

Changes required:
1. [Specific change] — because [reason]
2. [Specific change] — because [reason]

Please send updated sample/photos by: [date]
```

### 2.5 Stage 4: Photography · 第四阶段：照片

**Goal:** Product photos that meet brand quality standards for use on website and in marketing.

**Photo Quality Standards · 照片质量标准:**

| Standard | Requirement |
|----------|-------------|
| Resolution | Minimum 1200×1200px; preferred 3000×3000px or higher |
| Background | Ivory `#FAF7F2` or natural linen texture; never pure white |
| Lighting | Natural diffused light or professional softbox; no harsh shadows |
| Focus | Tack sharp on focal element; gemstones show internal reflections |
| Composition | Subject fills 60–80% of frame; meaningful negative space |
| Angles required | Hero (front), 45° angle, detail (macro of key feature), flat lay |
| File format | JPG for web delivery + RAW or TIFF for archive |
| Naming | `[collection]-[item]-[angle]-[date].jpg` |
| Color accuracy | Must be calibrated; supplier photos must include a color reference card |

**Photo Review Checklist:**
```
[ ] Receive photos from supplier or photographer
[ ] Check each required angle is present
[ ] Check resolution meets minimum (open in Preview → Get Info → check dimensions)
[ ] Check background is correct color
[ ] Check focus: zoom to 100% — is focal element sharp?
[ ] Check color accuracy: does it match the approved physical piece?
[ ] Check composition: does subject fill 60–80% of frame?
[ ] Decision: Approve → save to /images/ | Request reshoot → send specific notes
[ ] Save approved photos to: /images/[collection]/
[ ] Update image reference in relevant JSON content file
```

**If photos don't meet standards:**
Send a specific reshoot brief — reference which photos failed and exactly why, with example of what's needed.

### 2.6 Stage 5: Packaging · 第五阶段：包装

**Goal:** Confirm packaging design, materials, and branding match SILORA ORIENT brand standards.

**Packaging Brand Standards · 包装品牌标准:**

| Element | Standard |
|---------|----------|
| Primary box | Rigid, matte finish; color: ivory `#FAF7F2` or deep `#2A2724` |
| Logo placement | Debossed or foil-stamped; never printed flat on primary surface |
| Tissue wrap | Ivory or cream; brand-color ribbon tie |
| Insert card | Brand story or piece-specific note; bilingual EN/ZH |
| Outer shipping | Plain kraft or white corrugated; branded tape optional |
| Size | Custom-fitted to piece; no rattling or excessive void |

**Packaging Confirmation Checklist:**
```
[ ] Receive packaging specs or physical samples from supplier
[ ] Check size: fits the piece without movement or excessive padding
[ ] Check finish: matte, correct color, no visible seams or defects
[ ] Check logo: correct placement, crisp impression, correct depth
[ ] Check insert: correct text, bilingual, correct paper weight
[ ] Check tissue/ribbon: correct colors, good drape quality
[ ] Approve: send written confirmation with order quantity and delivery date
[ ] Log: [Date] [Supplier] [Quantity ordered] [Expected delivery]
```

### 2.7 Stage 6: Production Timeline · 第六阶段：生产时间表

**Goal:** Confirm a realistic production schedule that meets client or collection delivery targets.

**Timeline Template · 时间表模板:**
```
PROJECT: [Name]
COMMISSION / COLLECTION: [Type]
CLIENT DELIVERY TARGET: [Date]

Backward-planned schedule:
  [Date] — Ship to client
  [Date] — Final QC and packaging
  [Date] — Photos delivered and approved
  [Date] — Production complete; piece received from supplier
  [Date] — Production start (supplier begins)
  [Date] — Timeline confirmed with supplier
  [Date - TODAY] — This document created
```

**Buffer rules:**
- Always build in 7-day buffer before client delivery date
- Photo stage: allocate minimum 5 days (receive + review + possible reshoot)
- Add 3 days for international shipping from supplier to studio

---

## Part 3: Supplier Communication Standards · 供应商沟通标准

### 3.1 Communication Principles · 沟通原则

1. **Written record always** — Every decision confirmed in writing (email or messaging app message). No verbal-only agreements.
2. **Specific over vague** — "Reduce petal width by 10%" not "make it smaller." "Ivory #FAF7F2" not "cream."
3. **Timelines in every message** — Always specify when you need a response or delivery.
4. **Log every contact** — See Contact Log below.

### 3.2 Standard Message Formats · 标准信息格式

**Initial Project Brief · 项目初始简报:**
```
Project: [Name]
Piece type: [earrings / pendant / ring / set]
Materials needed: [list]
Colors: [reference swatches or Pantone if possible]
Quantity: [pieces]
Target completion: [date — when you need finished piece]
Questions: [any unclear requirements]
```

**Revision Request · 修改要求:**
```
Project: [Name] — Revision round [#]
Date: [today]

Thank you for the [samples / photos / mockup].

Changes needed:
1. [Specific change + reason]
2. [Specific change + reason]

Please confirm:
- You can make these changes
- Updated [sample / photos / mockup] will be ready by: [date]
```

**Approval Confirmation · 批准确认:**
```
Project: [Name]
Date: [today]

Approved: [what was approved — colors / samples / photos / packaging]

Please proceed with:
[Next step — production / final packaging / shipping]

Target delivery to us: [date]
```

### 3.3 Supplier Contact Log · 供应商联系记录

Maintain one log per supplier. Template for each entry:

| Date | Supplier | Contact Method | Topic | Summary | Decision/Outcome | Next Step | Next Step Due | Logged By |
|------|---------|---------------|-------|---------|-----------------|-----------|---------------|-----------|
| — | — | Email / WeChat / Call | — | — | — | — | — | Founder |

---

## Part 4: Quality Control Protocol · 质量控制协议

### 4.1 Quality Checkpoints · 质量检查节点

Quality is reviewed at 4 points — not just at the end.

| Checkpoint | When | What to Check | Pass / Fail Criteria |
|-----------|------|---------------|---------------------|
| **QC-1: Materials** | Stage 1 | Raw material quality | Consistent grade, correct type, no damage |
| **QC-2: Samples** | Stage 3 | Prototype quality | Proportions, colors, finish, craftsmanship |
| **QC-3: Finished piece** | After production complete | Final piece | All QC-2 criteria + correct gemstone placement |
| **QC-4: Photos** | Stage 4 | Photo quality | Resolution, color accuracy, all angles present |

### 4.2 Defect Classification · 缺陷分类

| Class | Description | Action |
|-------|-------------|--------|
| **Critical** | Structural defect, wrong gemstone, wrong metal, color significantly off | Reject; request remake |
| **Major** | Finish inconsistency, minor proportion issue, packaging defect | Request correction before delivery |
| **Minor** | Photo angle missing, documentation incomplete | Accept piece; request correction of documentation only |

### 4.3 Rejection Protocol · 拒收协议

1. Document defect with photos and written description
2. Send rejection notice within 48 hours of receiving piece
3. Include: what is wrong, what correct looks like, proposed resolution (remake / repair / partial refund)
4. Agree on timeline for resolution in writing
5. Log in Contact Log

---

## Part 5: Project Templates · 项目模板

### 5.1 New Project Brief Template · 新项目简报模板

Copy and fill in for every new commission or collection:

```markdown
## PROJECT BRIEF — [Project Name]
## 项目简报 — [项目名称]

**Type:** Commission / Collection item
**Client:** [Name or "Brand collection"]
**Created:** [Date]
**Target delivery to client:** [Date]

### Piece Description · 作品描述
[Describe the piece: type, size, key elements]

### Client Story / Inspiration · 客户故事/灵感
[What the client told us, or the brand narrative behind this piece]

### Materials Required · 所需材料
- [ ] [Material 1] — quantity — supplier
- [ ] [Material 2] — quantity — supplier

### Color Direction · 颜色方向
[Describe intended colors, reference images, Pantone or hex if known]

### Reference Images · 参考图片
[Attach or link to mood board / reference photos]

### Supplier Contacts · 供应商联系
- Materials: [Supplier name + ID]
- Gemstones: [Supplier name + ID]
- Packaging: [Supplier name + ID]

### Budget · 预算
- Materials cost: $—
- Production cost: $—
- Photography: $—
- Packaging: $—
- Total COGS: $—

### Stage Tracker · 阶段追踪
- [ ] Stage 1: Materials received and approved — Due: [date]
- [ ] Stage 2: Colors confirmed — Due: [date]
- [ ] Stage 3: Samples approved — Due: [date]
- [ ] Stage 4: Photos delivered and approved — Due: [date]
- [ ] Stage 5: Packaging confirmed — Due: [date]
- [ ] Stage 6: Timeline agreed — Due: [date]
- [ ] Production complete — Due: [date]
- [ ] QC passed — Due: [date]
- [ ] Shipped — Due: [date]
- [ ] Delivered — Due: [date]
```

### 5.2 Collection Planning Template · 系列规划模板

For brand collections (not individual commissions):

```markdown
## COLLECTION PLAN — [Collection Name]
## 系列规划 — [系列名称]

**Launch target:** [Season / Date]
**Number of pieces:** [N]
**Price range:** [$ — $]

### Collection Narrative · 系列叙事
[The story behind this collection — what it's about, who it's for]

### Pieces in Collection · 系列作品

| # | Piece | Materials | Colors | Price Tier | Status |
|---|-------|-----------|--------|------------|--------|
| 1 | [name] | [list] | [palette] | Tier [N] | ⬜ |

### Production Schedule · 生产时间表
[Fill in Stage Tracker above for each piece]

### Photography Plan · 摄影计划
- Shoot date: [Date]
- Location: [Studio / natural light setting]
- Pieces to shoot: [list all]
- Shot list: Hero / 45° / Detail / Flat lay / Model (if applicable)

### Launch Checklist · 发布核查清单
- [ ] All pieces produced and QC passed
- [ ] All product photos approved and uploaded to /images/
- [ ] JSON content files updated (collections.json or other-collections.json)
- [ ] Collection page tested on desktop + mobile
- [ ] Pushed to git → Vercel deployed
- [ ] Mailchimp announcement draft ready
```

---

## Part 6: Obsidian Export Format · Obsidian导出格式

When exporting a supplier project to Obsidian, use this frontmatter:

```yaml
---
tags: [supplier, production, silora-orient]
project: [Project Name]
stage: [current stage]
last_updated: [date]
supplier: [supplier ID + name]
source: silora-orient-dashboard/panel-4
---
```

Followed by the Project Brief content and current Stage Tracker state.

---

*Document version: 1.0 · April 2026*  
*Feeds Panel 4 of `docs/brand-operating-dashboard.md`*  
*Related: `admin/dashboard-upload-workflow.md` for media upload standards after photos are approved*
