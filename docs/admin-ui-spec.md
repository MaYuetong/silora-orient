# SILORA ORIENT — Internal Admin Panel UI Specification
# SILORA ORIENT — 内部管理后台界面规范

**Version 文档版本:** 1.0  
**Date 日期:** April 2026 · 2026年4月  
**Status 状态:** Internal — UI Specification · 内部文档 — 界面规范  
**Audience 阅读对象:** Founders · Future frontend/backend developers  
**阅读对象:** 创始人 · 未来前端/后端开发者  
**Depends on 依赖文档:** `docs/architecture.md` (M-1 through M-6 data models)

---

> This document specifies the internal admin panel for SILORA ORIENT staff. It is entirely separate from the public website. The public website (`silora-orient.vercel.app`) remains unchanged. This admin panel is an internal tool — accessed only by the team, behind authentication, never visible to customers.
>
> 本文档规范了 SILORA ORIENT 内部管理后台。它与公开网站完全分离。公开网站（`silora-orient.vercel.app`）保持不变。管理后台是纯内部工具——仅供团队访问，需身份验证，客户不可见。

---

## Table of Contents · 目录

1. [Admin Panel Overview · 后台总览](#1-admin-panel-overview)
2. [Role-Based Access · 基于角色的访问控制](#2-role-based-access)
3. [Module Pages · 模块页面规范](#3-module-pages)
   - [M-1 Client CRM · 客户关系管理](#m-1-client-crm)
   - [M-2 Product Studio · 产品工作室](#m-2-product-studio)
   - [M-3 Brand CMS · 品牌内容管理](#m-3-brand-cms)
   - [M-4 B2B Pipeline · B2B拓展管道](#m-4-b2b-pipeline)
   - [M-5 Community Hub · 社群中心](#m-5-community-hub)
   - [M-6 Analytics & Ops · 分析与运营](#m-6-analytics--ops)
4. [Universal Workflows · 通用工作流](#4-universal-workflows)
5. [Dashboards & Lookboards · 仪表盘与看板](#5-dashboards--lookboards)
6. [Technical Notes · 技术说明](#6-technical-notes)

---

## 1. Admin Panel Overview
## 一、后台总览

### 1.1 Purpose · 用途

The admin panel is the internal operating environment for the SILORA ORIENT team. It is not a public-facing product. Its job is to make every business workflow — commissions, content, outreach, bookings, analytics — structured, trackable, and operable by a small team without the founder being a bottleneck.

管理后台是 SILORA ORIENT 团队的内部运营环境，不面向公众。其职责是将每个业务工作流——定制、内容、外联、预约、数据分析——结构化、可追踪，使小团队能够独立运营，无需创始人成为瓶颈。

---

### 1.2 Layout Structure · 布局结构

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER · 顶栏                                                   │
│  [Logo]  [Page title]          [Search] [Notifications] [User] │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│   SIDEBAR    │   MAIN CONTENT AREA · 主内容区                   │
│   侧边栏     │                                                  │
│              │   ┌──────────────────────────────────────────┐  │
│  Dashboard   │   │  Page Header (title + primary actions)   │  │
│  ──────────  │   │  页面标题 + 主要操作按钮                  │  │
│  M-1 CRM     │   ├──────────────────────────────────────────┤  │
│  M-2 Studio  │   │                                          │  │
│  M-3 CMS     │   │  Content (table / form / kanban /        │  │
│  M-4 B2B     │   │          detail view)                    │  │
│  M-5 Hub     │   │                                          │  │
│  M-6 Ops     │   │                                          │  │
│              │   └──────────────────────────────────────────┘  │
│  ──────────  │                                                  │
│  Settings    │                                                  │
│  Logout      │                                                  │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

**Sidebar · 侧边栏**

- Fixed position, always visible on desktop · 固定位置，桌面端始终可见
- Collapses to icon-only mode at medium breakpoint · 中等断点折叠为仅图标模式
- Active section highlighted with gold left border (`--gold: #BF9D6A`) · 当前区块以金色左边框高亮
- Role-based: menu items hidden if user has no access · 基于角色：无权限的菜单项隐藏

**Header · 顶栏**

- Fixed, always visible · 固定，始终可见
- Left: Silora Orient logo (small wordmark) + current page breadcrumb · 左：品牌标志+当前页面路径
- Center: global search (searches across all modules) · 中：全局搜索（跨所有模块）
- Right: notification bell (pending reviews, overdue follow-ups) + user avatar + role badge · 右：通知铃（待审核、过期跟进）+用户头像+角色标签

**Main Content Area · 主内容区**

- Scrollable, independent of sidebar and header · 可滚动，独立于侧边栏和顶栏
- Page header: title (left) + primary action button (right, gold) · 页面标题（左）+主操作按钮（右，金色）
- Tabs for sub-sections within a module · 模块内子区块使用标签页
- Breadcrumb trail for deep navigation · 深层导航使用面包屑路径

---

### 1.3 Navigation Flow · 导航流程

```
Login
  └─→ Dashboard (role-specific) · 仪表盘（角色专属）
        ├─→ M-1 CRM
        │     ├─→ All Customers (list) · 所有客户（列表）
        │     │     └─→ Customer Profile (detail) · 客户档案（详情）
        │     │           └─→ Edit Customer · 编辑客户
        │     └─→ Story Submissions · 故事投稿
        │           └─→ Story Detail / Review · 故事详情/审核
        ├─→ M-2 Product Studio
        │     ├─→ Commissions (kanban) · 定制订单（看板）
        │     │     └─→ Commission Detail · 订单详情
        │     └─→ Products (list) · 产品（列表）
        │           └─→ Product Detail / Edit / Publish · 产品详情/编辑/发布
        ├─→ M-3 Brand CMS
        │     ├─→ Journal Issues · 季刊
        │     │     └─→ Issue Detail / Edit · 期刊详情/编辑
        │     ├─→ Customer Stories · 客户故事
        │     └─→ Collections · 系列作品
        ├─→ M-4 B2B Pipeline
        │     ├─→ Partners (list + kanban) · 合作方（列表+看板）
        │     │     └─→ Partner Detail · 合作方详情
        │     └─→ Proposals · 提案
        ├─→ M-5 Community Hub
        │     ├─→ Events & Workshops · 活动与工作坊
        │     │     └─→ Event Detail / Bookings · 活动详情/预约
        │     └─→ Bookings (all) · 所有预约
        └─→ M-6 Analytics & Ops
              ├─→ Traffic Overview · 流量概览
              ├─→ Newsletter · 邮件订阅
              └─→ Conversion Tracker · 转化追踪
```

---

### 1.4 Responsive Behavior · 响应式行为

| Breakpoint · 断点 | Sidebar · 侧边栏 | Layout · 布局 |
|------------------|----------------|--------------|
| Desktop (≥1280px) | Full — labels visible · 完整，标签可见 | Two-column (sidebar + main) · 双栏 |
| Tablet (768–1279px) | Collapsed — icons only · 折叠，仅图标 | Two-column, narrower sidebar · 双栏，较窄侧边栏 |
| Mobile (<768px) | Hidden — accessible via hamburger · 隐藏，通过汉堡菜单访问 | Single column · 单栏 |

Mobile access is secondary — the admin panel is primarily a desktop tool. Mobile should support read-only views and basic status updates.

移动端访问为次要场景——管理后台主要为桌面工具。移动端应支持只读视图和基本状态更新。

---

### 1.5 Visual Theme · 视觉主题

The admin panel is visually restrained — it uses the brand's color palette and typography but in a functional, high-information-density layout. It should feel like the same brand, not a generic SaaS dashboard.

管理后台视觉克制——使用品牌色板与字体，但以功能性、高信息密度的布局呈现。应有品牌感，而非通用SaaS后台的外观。

**Color tokens · 颜色变量（继承自 `styles.css`）**

| Token | Value | Admin Usage · 后台用途 |
|-------|-------|----------------------|
| `--gold` | `#BF9D6A` | Primary buttons, active nav, status badges · 主按钮、激活导航、状态标签 |
| `--gold-light` | `#D4B482` | Hover states, secondary accents · 悬停状态、次要强调 |
| `--ivory` | `#FAF7F2` | Page background · 页面背景 |
| `--cream` | `#F2EDE5` | Sidebar background, card backgrounds · 侧边栏背景、卡片背景 |
| `--text-dark` | `#2A2724` | Primary text, headings · 主文字、标题 |
| `--text-mid` | `#5C5650` | Secondary text, labels · 次要文字、标签 |
| `--text-light` | `#9C9690` | Placeholder, disabled · 占位符、禁用状态 |
| `--border` | `#E8E2D8` | Table borders, dividers · 表格边框、分隔线 |
| `--status-green` | `#7AAB7A` | Published, paid, complete · 已发布、已付款、已完成 |
| `--status-amber` | `#C4963A` | Pending, in review, in production · 待处理、审核中、生产中 |
| `--status-red` | `#B85C5C` | Rejected, cancelled, overdue · 已拒绝、已取消、已逾期 |

**Typography · 字体**

- Headings: Cormorant Garamond (serif) — same as public site · 标题：Cormorant Garamond（衬线）
- Body / labels / tables: Jost (sans-serif) — same as public site · 正文/标签/表格：Jost（无衬线）
- Code / IDs: `monospace`, `--text-mid` color · 代码/ID：等宽字体

---

## 2. Role-Based Access
## 二、基于角色的访问控制

### 2.1 Role Definitions · 角色定义

| Role · 角色 | Description · 描述 |
|------------|-------------------|
| **Founder** · 创始人 | Full access to all modules. Final approval authority. Can publish, delete, and manage team members. |
| **Co-founder / Artisan** · 联合创始人/匠人 | Access to production-related content: commissions, products, story notes. Cannot publish or approve. |
| **Editor** · 编辑 | Access to content modules only: journal, stories, collections. Can draft and submit for review. |
| **Community Manager** · 社群管理员 | Access to Community Hub and subscriber management. Cannot access CRM story notes or commissions. |
| **B2B Manager** · B2B负责人 | Access to B2B Pipeline and product catalogue (read). Cannot access customer personal data. |

---

### 2.2 Module Access Matrix · 模块访问权限矩阵

| Module · 模块 | Founder | Co-founder | Editor | Community Mgr | B2B Mgr |
|--------------|:-------:|:----------:|:------:|:-------------:|:-------:|
| **M-1 Client CRM** | Full · 完整 | Story + commission fields only · 仅故事与订单字段 | Read · 只读 | Newsletter + booking fields · 订阅与预约字段 | B2B contacts only · 仅B2B联系人 |
| **M-2 Product Studio** | Full · 完整 | Full production write · 完整生产填写 | Read · 只读 | Read · 只读 | Product catalogue read · 产品目录只读 |
| **M-3 Brand CMS** | Full · 完整 | Draft + edit (product content) · 草稿与编辑（产品内容） | Draft + submit review · 草稿与提交审核 | Workshop pages only · 仅工作坊页面 | Read · 只读 |
| **M-4 B2B Pipeline** | Full · 完整 | Product selection only · 仅产品选择 | None · 无 | Read · 只读 | Full · 完整 |
| **M-5 Community Hub** | Full · 完整 | View + event details · 查看与活动详情 | None · 无 | Full · 完整 | View · 查看 |
| **M-6 Analytics & Ops** | Full · 完整 | View analytics · 查看分析 | Campaign drafts · 活动草稿 | Subscriber mgmt · 订阅者管理 | View analytics · 查看分析 |
| **Settings / Team** · 设置/团队 | Full · 完整 | None · 无 | None · 无 | None · 无 | None · 无 |

---

### 2.3 Action-Level Permissions · 操作级权限

| Action · 操作 | Founder | Co-founder | Editor | Community Mgr | B2B Mgr |
|--------------|:-------:|:----------:|:------:|:-------------:|:-------:|
| Create draft · 创建草稿 | ✓ | ✓ | ✓ | ✓ (Hub only) | ✓ (B2B only) |
| Submit for review · 提交审核 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Approve content · 审批内容 | ✓ | — | — | — | — |
| Publish / schedule · 发布/排期 | ✓ | — | — | — | — |
| Archive · 归档 | ✓ | — | — | — | — |
| Delete · 删除 | ✓ | — | — | — | — |
| Manage team · 管理团队 | ✓ | — | — | — | — |
| Send email campaign · 发送邮件活动 | ✓ | — | — | ✓ (drafts only) | — |
| Issue refunds · 退款 | ✓ | — | — | — | — |
| Export data · 导出数据 | ✓ | — | — | — | — |

---

## 3. Module Pages
## 三、模块页面规范

---

### M-1 Client CRM
### M-1 客户关系管理

**Nav label · 导航标签:** `CRM` · `客户管理`  
**Icon:** person outline  
**Access · 访问权限:** All roles (with restrictions) · 所有角色（有限制）

---

#### M-1-A: Customer List Page · 客户列表页

**Route · 路由:** `/admin/crm`

**Purpose · 用途:** Master list of all customers — B2C, B2B, community. The starting point for all customer-related work.

所有客户的主列表——B2C、B2B、社群成员。所有客户相关工作的起点。

**Page Layout · 页面布局:**

```
[Page title: Customers · 客户]            [+ New Customer · 新建客户]
[Search bar] [Filter: Type] [Filter: Status] [Filter: Newsletter] [Export ↓]

┌──────────────────────────────────────────────────────────────────┐
│  Name · 姓名  │ Email · 邮箱  │ Type · 类型 │ Status · 状态 │ Last Contact · 最近联系 │ Follow-up · 跟进 │
├──────────────────────────────────────────────────────────────────┤
│  Ana M.       │ ana@...       │ B2C         │ Active        │ 2 weeks ago             │ ⚠ Overdue       │
│  Lin W.       │ lin@...       │ B2C         │ In Commission │ 3 days ago              │ Apr 14           │
│  …            │               │             │               │                         │                  │
└──────────────────────────────────────────────────────────────────┘
[Pagination · 分页]
```

**Table Columns · 表格列:**

| Column · 列 | Sortable · 可排序 | Notes · 说明 |
|------------|:----------------:|-------------|
| Name · 姓名 | ✓ | Links to detail page · 链接至详情页 |
| Email · 邮箱 | — | Masked for non-Founder roles · 非创始人角色显示脱敏 |
| Type · 类型 | ✓ | B2C / B2B / Community badge · 类型标签 |
| Commission Status · 订单状态 | ✓ | Latest active commission status · 最新活跃订单状态 |
| Newsletter · 订阅状态 | ✓ | Subscribed / Unsubscribed / None |
| Last Contact · 最近联系 | ✓ | Relative date · 相对日期 |
| Follow-up · 跟进 | ✓ | Date or "Overdue" badge · 日期或"逾期"标签 |

**Filters · 筛选器:** Type (B2C / B2B / Community) · Newsletter status · Has active commission · Follow-up overdue

**Actions per row · 行操作:** `View` · `Quick note` · `New commission`

---

#### M-1-B: Customer Profile Page · 客户档案详情页

**Route · 路由:** `/admin/crm/:id`

**Purpose · 用途:** The full portrait of one customer — personal details, story, all commissions, bookings, payment history, newsletter status, and follow-up log.

单一客户的完整档案——个人信息、故事、所有订单、预约、支付历史、订阅状态及跟进记录。

**Page Layout · 页面布局:**

```
← Back to Customers                    [Edit · 编辑]  [New Commission · 新建订单]

┌─────────────────────┬────────────────────────────────────────────┐
│  IDENTITY PANEL     │  TABS · 标签页                              │
│  身份信息面板        │                                            │
│                     │  [Overview] [Commissions] [Bookings]       │
│  Ana                │  [Payments] [Story] [Notes]                │
│  ana@email.com      │                                            │
│  Manhattan, NYC     ├────────────────────────────────────────────┤
│  B2C · Subscribed   │                                            │
│                     │  TAB CONTENT AREA · 标签内容区              │
│  ── Story Notes     │                                            │
│  Mediterranean blue │                                            │
│  eyes. Spanish      │                                            │
│  pianist. Left the  │                                            │
│  sea behind.        │                                            │
│                     │                                            │
│  ── Color Prefs     │                                            │
│  Pale blue, blush,  │                                            │
│  pearl white        │                                            │
│                     │                                            │
│  ── Follow-up       │                                            │
│  Next: Apr 14       │                                            │
│  [+ Log interaction]│                                            │
└─────────────────────┴────────────────────────────────────────────┘
```

**Tab: Overview · 概览**
- Summary cards: total commissions, total paid, active bookings, newsletter status
- Quick action buttons: New commission / Log interaction / Send Stripe link

**Tab: Commissions · 定制订单**
- All commissions for this customer, most recent first
- Status badge, amount, date, flower type
- Click through to commission detail (M-2)

**Tab: Bookings · 预约**
- All consultation and event bookings, with status and date

**Tab: Payments · 支付**
- All payment records: amount, type, status, date, Stripe reference

**Tab: Story · 故事**
- Story draft or published story linked to this customer
- Consent status with date
- Link to CMS story record (M-3)

**Tab: Notes · 备注**
- Chronological interaction log
- Each entry: timestamp, author, note text
- [+ Add note] button always visible at top

---

#### M-1-C: New Customer Form · 新建客户表单

**Route · 路由:** `/admin/crm/new`

**Fields · 字段:**

```
Section 1: Identity · 身份信息
  Full name *         Email *          Phone
  Location (city)     Language pref    Customer type *

Section 2: Story · 故事信息
  Eye color           Color preferences (textarea)
  Family memory notes (textarea)
  Story notes (textarea)
  How did they find us? (Source dropdown)

Section 3: Consent · 授权
  Consent given (toggle)
  Consent date        Consent method (dropdown)

Section 4: Subscription · 订阅
  Newsletter status (dropdown)
```

**Actions · 操作:** `Save as Draft` · `Save & Create Commission` · `Cancel`

---

#### M-1-D: Story Submission Review · 故事投稿审核

**Route · 路由:** `/admin/crm/stories`

**Purpose · 用途:** Separate queue for customer story submissions awaiting consent verification and publication approval.

待授权验证和发布审批的客户故事提交队列。

**List columns · 列表列:** Customer name · Submission date · Consent status · Publication status · Reviewer

**Actions · 操作:** `Review` → opens story detail with approve / request revision / decline options

---

### M-2 Product Studio
### M-2 产品工作室

**Nav label · 导航标签:** `Studio` · `工作室`  
**Icon:** diamond outline  
**Access · 访问权限:** Founder + Co-founder (full); others read-only

---

#### M-2-A: Commission Kanban · 定制订单看板

**Route · 路由:** `/admin/studio/commissions`

**Purpose · 用途:** The operational heart of the brand's revenue workflow. Every active commission is visible at a glance, with its current status and owner.

品牌收入工作流的运营核心。每笔活跃订单一目了然，显示当前状态与负责人。

**Page Layout · 页面布局:**

```
[Page: Commissions · 定制订单]          [+ New Commission]
[View: Kanban ▼] [Filter: Owner] [Filter: Month] [Search]

┌──────────┬──────────────┬────────────┬────────────┬──────────────┬──────────────┐
│ INQUIRY  │ CONSULTATION │  APPROVED  │IN PRODUCTION│  SHIPPED    │  COMPLETE   │
│  询价    │    咨询中    │   已审批   │   生产中   │   已发货    │   已完成    │
│──────────│──────────────│────────────│────────────│─────────────│─────────────│
│ ┌──────┐ │ ┌──────────┐ │ ┌────────┐ │ ┌────────┐ │ ┌─────────┐ │ ┌─────────┐ │
│ │ Ana  │ │ │  Lin W.  │ │ │ Mei J. │ │ │ Sara K.│ │ │ Yuki T. │ │ │ Emma L. │ │
│ │Orchid│ │ │ Wisteria │ │ │Orchid  │ │ │ Custom │ │ │ Iris    │ │ │ Orchid  │ │
│ │$320  │ │ │  $480    │ │ │ $280   │ │ │ $560   │ │ │  $390   │ │ │  $310   │ │
│ │Apr 2 │ │ │  Apr 5   │ │ │ Apr 3  │ │ │ Mar 28 │ │ │  Apr 1  │ │ │  Mar 15 │ │
│ └──────┘ │ └──────────┘ │ └────────┘ │ └────────┘ │ └─────────┘ │ └─────────┘ │
└──────────┴──────────────┴────────────┴────────────┴─────────────┴─────────────┘
```

**Kanban columns · 看板列:** Inquiry · Consultation Scheduled · Consultation Complete · Proposal Sent · Approved · Deposit Paid · In Production · Quality Review · Shipped · Delivered · Complete

Scrollable horizontally. Each card: customer name, flower type, quote amount, date, status indicator, payment status dot.

可横向滚动。每张卡片：客户姓名、花型、报价金额、日期、状态指示器、支付状态圆点。

**View toggle · 视图切换:** Kanban (default) · Table view · Calendar view (by scheduled delivery date)

---

#### M-2-B: Commission Detail Page · 定制订单详情页

**Route · 路由:** `/admin/studio/commissions/:id`

**Page Layout · 页面布局:**

```
← Back to Commissions                   [Update Status ▼] [Send Stripe Link] [Edit]

Commission #042 — Ana · Orchid Earrings                     Status: IN PRODUCTION ●

┌──────────────────────────────┬────────────────────────────────────────────────────┐
│  COMMISSION INFO · 订单信息  │  ACTIVITY LOG · 活动记录                           │
│                              │                                                    │
│  Customer: Ana M.  [→ CRM]  │  Apr 7  Co-founder: "Started silk wrapping. First  │
│  Flower: Orchid              │          layer complete. Photos attached."          │
│  Colors: Pale blue, blush   │  Apr 5  Founder: "Deposit confirmed. Stripe #xxx"  │
│  Materials: Silk, gold wire, │  Apr 3  Founder: "Proposal sent. Awaiting reply." │
│            pearl             │  Apr 2  Founder: "Inquiry received via form."      │
│  Symbolism: "The sea she    │                                                    │
│  left behind"               │  [+ Add note · 添加备注]                           │
│                              │                                                    │
│  ── Financials · 财务        │  ── Attachments · 附件                             │
│  Quote: $320                 │  [Upload images · 上传图片]                        │
│  Deposit: $160 ✓ PAID       │  [Image: process-1.jpg]                            │
│  Balance: $160  ○ UNPAID    │  [Image: process-2.jpg]                            │
│  [Send balance link →]      │                                                    │
│                              │  ── Production checklist · 生产清单               │
│  ── Delivery · 交付          │  ☑ Materials prepared · 材料准备完毕               │
│  Carrier: —                 │  ☑ Silk wrapping started · 缠花已开始               │
│  Tracking: —                │  ☐ First review · 初步检验                          │
│  [Mark shipped →]           │  ☐ Final quality check · 最终质检                  │
└──────────────────────────────┴────────────────────────────────────────────────────┘
```

**Status update UI · 状态更新界面:** Dropdown with all valid next states. Only forward progression shown (plus `on_hold`, `cancelled`). Changing status logs it automatically in activity log with timestamp and user.

状态下拉菜单只显示有效的下一步状态（加上"暂停"和"已取消"）。状态变更自动记录至活动日志，含时间戳和操作人。

---

#### M-2-C: Product List & Detail · 产品列表与详情

**Route · 路由:** `/admin/studio/products` · `/admin/studio/products/:id`

**List columns · 列表列:** Thumbnail · Name (EN + ZH) · Collection · Status · Stock · Published date

**Detail page tabs · 详情页标签:** Info · Images · Variants · Publish

**Publish tab · 发布标签页:**

```
Publication Status · 发布状态: [Draft ▼]

Schedule for:  [Date picker]  [Time picker]
               OR [Publish Now · 立即发布]

Preview link:  [Open preview →]
               (Shows exactly how it will appear on collections page)
```

---

#### M-2-D: Upload Interface · 上传界面

Accessible from Commission detail and Product detail pages · 可从订单详情和产品详情页访问

```
┌─────────────────────────────────────────────────────┐
│  Upload Images · 上传图片                            │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │                                             │   │
│  │   Drag & drop images here                  │   │
│  │   拖放图片至此处                             │   │
│  │                                             │   │
│  │   or [Browse files · 浏览文件]              │   │
│  │                                             │   │
│  │   Accepted: JPG, PNG, WebP · Max: 10MB     │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  Uploaded · 已上传                                  │
│  [img-1.jpg ×]  [img-2.jpg ×]  [img-3.jpg ×]      │
│                                                     │
│  Category · 分类: [Product photo ▼]                │
│  Credit · 归属: [Text field]                        │
│  Usage rights · 使用权: [Internal only ▼]          │
│                                                     │
│  [Save · 保存]                                      │
└─────────────────────────────────────────────────────┘
```

---

### M-3 Brand CMS
### M-3 品牌内容管理

**Nav label · 导航标签:** `CMS` · `内容管理`  
**Icon:** document stack  
**Access · 访问权限:** Founder + Co-founder + Editor; B2B Mgr read-only

---

#### M-3-A: Content List Page · 内容列表页

**Route · 路由:** `/admin/cms`

**Purpose · 用途:** Master view of all content across all types, with filter to isolate by type, status, or author.

跨所有内容类型的主视图，可按类型、状态或作者筛选。

**Tabs across content types · 内容类型标签页:**

`Journal Issues · 季刊` · `Customer Stories · 客户故事` · `Collections · 系列作品` · `Announcements · 公告`

**Common list columns · 通用列表列:** Title · Type · Author · Status badge · Last updated · Reviewer · Publish date

**Status badges · 状态标签:**

| Status · 状态 | Badge Color · 标签颜色 |
|--------------|----------------------|
| Draft · 草稿 | Grey · 灰色 |
| Internal Review · 内部审核中 | Amber · 琥珀色 |
| Revision Requested · 请求修改 | Orange · 橙色 |
| Approved · 已审批 | Blue · 蓝色 |
| Scheduled · 已排期 | Purple · 紫色 |
| Published · 已发布 | Green · 绿色 |
| Archived · 已归档 | Light grey · 浅灰色 |

---

#### M-3-B: Journal Issue Detail · 季刊详情页

**Route · 路由:** `/admin/cms/journal/:id`

**Page Layout · 页面布局:**

```
← CMS                                   [Submit for Review]  [Approve]  [Schedule ▼]

Issue #3 — Summer 2026 · 2026夏                              Status: INTERNAL REVIEW

┌──────────────────────────┬─────────────────────────────────────────────────────────┐
│  ISSUE INFO · 期刊信息   │  ARTICLES · 文章列表                                    │
│                          │                                                         │
│  Title EN: Summer Light  │  #  │ Title                  │ Author  │ Status  │ Due  │
│  Title ZH: 夏日之光      │  ─────────────────────────────────────────────────────  │
│  Issue #: 3              │  1  │ The Color of Memory    │ Founder │ ✓ Done  │ —    │
│  Season: Summer 2026     │  2  │ Five Years of Thread   │ Co-f.   │ Drafting│ Apr9 │
│                          │  3  │ Ana's Earrings Story   │ Editor  │ Review  │ Apr8 │
│  Target publish: Apr 20  │  4  │ Workshop Notes         │ Comm.Mgr│ Draft   │ Apr10│
│  Email dispatch: Apr 20  │                                                         │
│                          │  [+ Add article · 添加文章]                             │
│  Editor: [name]          │                                                         │
│  Reviewer: [Founder]     ├─────────────────────────────────────────────────────────┤
│                          │  REVIEW COMMENTS · 审核意见                             │
│  ── Email Campaign       │                                                         │
│  Mailchimp status: Draft │  Apr 7, Founder: "Article 3 needs the consent note     │
│  [Open in Mailchimp →]  │  added before we can publish. Otherwise looks great."  │
│                          │                                                         │
│  ── Preview              │  [+ Add comment · 添加意见]                             │
│  [Open preview →]       │                                                         │
└──────────────────────────┴─────────────────────────────────────────────────────────┘
```

---

#### M-3-C: Content Create / Edit Form · 内容创建/编辑表单

**Route · 路由:** `/admin/cms/new` · `/admin/cms/:type/:id/edit`

Universal form used for all content types, with type-specific field sections shown/hidden.

适用于所有内容类型的通用表单，根据内容类型显示/隐藏特定字段区。

**Form sections · 表单区块:**

```
Section 1: Basics · 基础信息
  Content type *      Title EN *         Title ZH *
  Subtitle EN         Subtitle ZH
  Category *          Tags (multi-select)
  Author *            Reviewer (assign)

Section 2: Body · 正文内容
  Short description EN *  (textarea, 160 chars max)
  Short description ZH *  (textarea)
  Full body EN *      (rich text editor with image insertion)
  Full body ZH *      (rich text editor)

Section 3: Media · 媒体
  [Upload hero image]
  Image credit        Alt text EN         Alt text ZH
  [Upload additional images]

Section 4: Call to Action · 行动召唤
  CTA label EN        CTA label ZH
  CTA link

Section 5: SEO · 搜索优化
  SEO title           Meta description (160 chars max)
  OG image (social share image)

Section 6: Status & Schedule · 状态与排期
  Status [Draft ▼]
  Publish date / time  (if status = Scheduled)
```

**Toolbar · 工具栏:** `Save Draft` · `Preview` · `Submit for Review` (if ready)

---

#### M-3-D: Review and Approval Interface · 审核与审批界面

**Route · 路由:** `/admin/cms/:type/:id/review`

**Purpose · 用途:** Side-by-side reading view with comment thread and action buttons. Used by reviewers (Founder, Editor) to approve or request revisions.

左右对照阅读视图，带评论线程和操作按钮。供审核者（创始人、编辑）审批或请求修改。

**Page Layout · 页面布局:**

```
[← Back]                     REVIEW: "Summer Light — Issue 3"         [Founder | Editor]

┌────────────────────────────────────┬────────────────────────────────────────────────┐
│  CONTENT PREVIEW · 内容预览        │  REVIEW PANEL · 审核面板                       │
│                                    │                                                │
│  [Rendered content as it will      │  Status: Internal Review                      │
│   appear on the public page,       │                                                │
│   including images, bilingual      │  Comments · 评论                               │
│   layout, and typography]          │  ─────────────────────────────────────────     │
│                                    │  Apr 7, Founder:                               │
│                                    │  "Paragraph 3 — ZH translation needs           │
│                                    │  adjustment. Too formal."                      │
│                                    │                                                │
│                                    │  Apr 7, Editor: "Will revise by EOD."         │
│                                    │                                                │
│                                    │  [+ Add comment · 添加评论]                    │
│                                    │                                                │
│                                    │  ─────────────────────────────────────────     │
│                                    │                                                │
│                                    │  DECISION · 审核决定                           │
│                                    │  [Request Revision · 请求修改]                 │
│                                    │  [Approve · 审批通过]                          │
│                                    │                                                │
│                                    │  (Founder only · 仅创始人可操作)               │
└────────────────────────────────────┴────────────────────────────────────────────────┘
```

---

#### M-3-E: Publish / Schedule Interface · 发布/排期界面

Accessible from content detail page after status = Approved · 内容状态为"已审批"后可从详情页访问

```
┌──────────────────────────────────────────────────────┐
│  Publish "Summer Light — Issue 3" · 发布             │
│                                                      │
│  ● Publish now · 立即发布                             │
│  ○ Schedule · 排期发布                                │
│      Date: [Apr 20, 2026]  Time: [09:00 AM EDT]      │
│                                                      │
│  Also send newsletter? · 同时发送邮件通知？           │
│  ☑ Yes — trigger Mailchimp campaign on publish date  │
│    Recipients: All active subscribers (312)          │
│                                                      │
│  Preview one more time: [Open preview →]            │
│                                                      │
│  [Cancel · 取消]          [Confirm Publish · 确认发布]│
└──────────────────────────────────────────────────────┘
```

---

### M-4 B2B Pipeline
### M-4 B2B拓展管道

**Nav label · 导航标签:** `B2B` · `商业拓展`  
**Icon:** briefcase outline  
**Access · 访问权限:** Founder + B2B Manager (full); Co-founder (product selection only); others read-only

---

#### M-4-A: Partner List · 合作方列表

**Route · 路由:** `/admin/b2b`

**View toggle · 视图切换:** Table (default) · Kanban by status

**Table columns · 表格列:** Business name · Category · Location · Status badge · Interest level · Last contact · Next action · Proposal sent

**Kanban columns (by status) · 看板列（按状态）:**

```
Discovered | Outreached | Replied | Proposal Sent | Sample Sent | Negotiating | Closed
已发现     | 已外联     | 已回复  |  提案已发送   |  样品已寄   |   谈判中    |  已成交
```

**Quick filters · 快速筛选:** Category · City · Interest level · Follow-up overdue · Has replied

---

#### M-4-B: Partner Detail Page · 合作方详情页

**Route · 路由:** `/admin/b2b/:id`

**Page Layout · 页面布局:**

```
← Partners                              [Log Outreach · 记录外联]  [New Proposal]  [Edit]

Botanica NYC · Independent Boutique                              Status: INTERESTED ●●●

┌──────────────────────────────┬────────────────────────────────────────────────────┐
│  PARTNER INFO · 合作方信息   │  OUTREACH TIMELINE · 外联时间线                    │
│                              │                                                    │
│  botanicanyc.com             │  Apr 7  Founder: "Replied! Very interested in      │
│  contact@botanica.com        │          orchid series. Wants pricing."             │
│  212-555-0110                │  Mar 30 Founder: "Follow-up sent. No reply yet."  │
│  Lower East Side, NYC        │  Mar 23 Founder: "First outreach email sent."     │
│                              │  Mar 20 B2B Mgr: "Discovered via Instagram."      │
│  Contact: Sarah T.           │                                                    │
│  Title: Owner                │  [+ Log note · 记录备注]                           │
│                              │                                                    │
│  Category: Boutique          │  ── PROPOSALS · 提案                               │
│  Aesthetic fit: Strong ●●●●  │  v1 · Mar 29 · Wholesale · [View PDF]             │
│  Interest: High              │  [+ New proposal · 新建提案]                       │
│                              │                                                    │
│  ── Next Action · 下次行动   │  ── SAMPLES · 样品                                 │
│  Date: Apr 10                │  [No samples sent yet · 暂无寄出样品]              │
│  Action: Send pricing sheet  │  [Log sample send · 记录样品寄出]                  │
│                              │                                                    │
│  [Set reminder · 设置提醒]  │                                                    │
└──────────────────────────────┴────────────────────────────────────────────────────┘
```

---

#### M-4-C: Proposal Builder · 提案构建器

**Route · 路由:** `/admin/b2b/:id/proposals/new`

**Purpose · 用途:** Generates a structured proposal from template with auto-populated partner and product data. Exports as PDF.

从模板生成结构化提案，自动填入合作方与产品数据，可导出为PDF。

**Page Layout · 页面布局:**

```
New Proposal for Botanica NYC · 新建提案

Template · 模板: [Wholesale ▼]
  (Options: Wholesale · Consignment · Workshop Collab · Brand Intro · Gift Program)

┌──────────────────────────────────────────────────────────────┐
│  PROPOSAL PREVIEW · 提案预览              ← Live as you edit │
│                                                              │
│  [Logo]  SILORA ORIENT                    [Partner name]    │
│          Wholesale Proposal                                  │
│          April 2026                                          │
│                                                              │
│  Dear Sarah,                                                 │
│  [editable intro paragraph]                                  │
│                                                              │
│  SELECTED WORKS · 精选作品                                    │
│  [Product selection grid — drag to add/remove]              │
│                                                              │
│  PRICING · 价格                                               │
│  [Editable pricing table]                                    │
│                                                              │
│  TERMS · 条款                                                 │
│  [Editable terms section]                                    │
└──────────────────────────────────────────────────────────────┘

[Save Draft · 保存草稿]   [Export PDF · 导出PDF]   [Mark as Sent · 标记已发送]
```

---

### M-5 Community Hub
### M-5 社群中心

**Nav label · 导航标签:** `Community` · `社群`  
**Icon:** calendar outline  
**Access · 访问权限:** Founder + Community Manager (full); Co-founder (view + event details); B2B Mgr (view)

---

#### M-5-A: Events & Workshops List · 活动与工作坊列表

**Route · 路由:** `/admin/community`

**Tabs · 标签页:** `Upcoming · 即将举行` · `Past · 已结束` · `Drafts · 草稿`

**List columns · 列表列:** Event name · Type · Date · Location · Capacity (booked/total) · Status · Booking status

**Capacity indicator · 容量指示器:**

```
Workshop: Silk Flower Intro    Apr 18    8/12 seats  ● Booking Open
Workshop: Advanced 缠花        Apr 25    12/12 seats ● Full — Waitlist active
```

---

#### M-5-B: Event Detail Page · 活动详情页

**Route · 路由:** `/admin/community/events/:id`

**Page Layout · 页面布局:**

```
← Events                               [Edit Event]  [Manage Bookings]  [Send Reminder]

Chan Hua Intro Workshop — April 18, 2026                    Status: BOOKING OPEN ●

┌──────────────────────────────┬────────────────────────────────────────────────────┐
│  EVENT INFO · 活动信息       │  BOOKINGS · 预约记录                               │
│                              │                                                    │
│  Type: Workshop              │  8 confirmed · 4 remaining · 0 waitlist            │
│  Date: April 18, 2026        │                                                    │
│  Time: 2:00 PM – 5:00 PM     │  Name         │ Email     │ Status    │ Paid      │
│  Location: Studio, SoHo      │  ─────────────────────────────────────────────     │
│  Instructor: Co-founder      │  Ana M.       │ ana@...   │ Confirmed │ ✓ $85    │
│                              │  Lin W.       │ lin@...   │ Confirmed │ ✓ $85    │
│  Capacity: 12                │  Sara K.      │ sara@...  │ Pending   │ ○ Unpaid │
│  Booked: 8                   │  …            │           │           │           │
│  Price: $85 / seat           │                                                    │
│  Payment: Cal.com + Stripe   │  [+ Add booking manually · 手动添加预约]           │
│                              │                                                    │
│  Materials: Silk thread,     ├────────────────────────────────────────────────────┤
│  gold wire, scissors,        │  POST-EVENT · 活动后记录                           │
│  small pliers                │                                                    │
│                              │  Attendance confirmed: [  ] of 8                  │
│  [Open Cal.com page →]      │  Post-event notes: [textarea]                     │
│                              │  [Mark complete · 标记完成]                        │
└──────────────────────────────┴────────────────────────────────────────────────────┘
```

---

#### M-5-C: New Event Form · 新建活动表单

**Route · 路由:** `/admin/community/events/new`

```
Section 1: Event Info · 活动信息
  Title EN *          Title ZH *
  Type *              (Workshop / Course / Community event / Pop-up)
  Date *              Start time *        End time *
  Location *          Online link (optional)
  Instructor          Guest artisan (optional)

Section 2: Capacity & Pricing · 容量与定价
  Capacity (seats) *  Price per seat *
  Enable waitlist     Cancellation policy

Section 3: Description · 描述
  Description EN *    (rich text)
  Description ZH *    (rich text)
  Materials list EN   Materials list ZH

Section 4: Booking · 预约设置
  Cal.com event link  Payment: [Stripe link or free]
  Booking opens       Booking closes

Section 5: Publication · 发布
  Status [Draft ▼]   Publish date (if scheduled)
```

---

#### M-5-D: All Bookings View · 所有预约视图

**Route · 路由:** `/admin/community/bookings`

**Purpose · 用途:** Cross-event booking management — useful for spotting payment gaps and overdue confirmations.

跨活动预约管理——便于发现支付缺口和逾期确认。

**Filters · 筛选器:** Event · Status · Payment status · Date range

**Columns · 列:** Customer · Event name · Date · Seats · Status · Payment status · Confirmation sent

---

### M-6 Analytics & Ops
### M-6 分析与运营

**Nav label · 导航标签:** `Analytics` · `分析`  
**Icon:** chart line  
**Access · 访问权限:** Founder (full); Co-founder + B2B Mgr (view analytics); Community Mgr (newsletter only)

---

#### M-6-A: Traffic Overview · 流量概览

**Route · 路由:** `/admin/analytics`

**Purpose · 用途:** Embedded GA4 data surfaced in the admin panel context, so the team doesn't need to open a separate GA4 browser tab.

在管理后台中展示GA4数据，团队无需打开独立GA4标签页。

**Dashboard cards · 仪表盘卡片:**

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│  Users       │  Page views  │  Avg session │  Top source  │
│  本周用户     │  本周页面浏览 │  平均会话时长 │  主要来源    │
│  1,240       │  3,891       │  2m 34s      │  Instagram   │
│  ↑ 12% vs lw │  ↑ 8%       │  → same      │  31% of all  │
└──────────────┴──────────────┴──────────────┴──────────────┘

Top Pages · 热门页面
  1. /collections.html          ████████████████  32%
  2. /index.html                ████████████      24%
  3. /custom.html               ████████          18%
  4. /stories.html              █████             10%
  5. /journal.html              ████              8%

Traffic Sources · 流量来源
  Instagram Direct  ████████  31%
  Organic Search    ██████    24%
  Direct            █████     19%
  Referral          ████      16%
  Other Social      ██        10%

Geographic · 地理分布      Conversions · 转化
  New York    42%           Newsletter signups today:  3
  California  11%           Custom form submissions:   1
  UK          8%            Contact form submissions:  2
  China       7%            Booking clicks:            4
  Other       32%
```

**Date range selector · 日期范围选择器:** Today · This week · This month · Last 30 days · Custom

---

#### M-6-B: Newsletter Management · 邮件订阅管理

**Route · 路由:** `/admin/analytics/newsletter`

**Tabs · 标签页:** `Subscribers · 订阅者` · `Campaigns · 邮件活动` · `Automations · 自动化`

**Subscribers tab · 订阅者标签:**

```
Total active: 312    Unsubscribed: 14    Bounced: 3

[Search subscribers]  [Filter: Segment]  [Export list ↓]

Name         │ Email       │ Signed up   │ Segment       │ Last open    │ Status
─────────────────────────────────────────────────────────────────────────────────
Ana M.       │ ana@...     │ Mar 15      │ B2C, VIP      │ Apr 5        │ Active
Lin W.       │ lin@...     │ Apr 2       │ B2C           │ Apr 7        │ Active
…
```

**Campaigns tab · 邮件活动标签:**

```
[+ New Campaign · 新建活动]

Title                    │ Type          │ Sent       │ Recipients │ Open rate │ Clicks
─────────────────────────────────────────────────────────────────────────────────────
Spring 2026 Issue        │ Quarterly     │ Mar 20     │ 298        │ 62%       │ 24%
Welcome Email #1         │ Automation    │ Ongoing    │ 312 total  │ 71%       │ 38%
Workshop Invitation      │ Announcement  │ Apr 1      │ 298        │ 45%       │ 19%
```

**Automations tab · 自动化标签:** Shows status (active / paused) and key metrics for each automation sequence. [Open in Mailchimp] link for editing.

---

#### M-6-C: Conversion Tracker · 转化追踪

**Route · 路由:** `/admin/analytics/conversions`

**Purpose · 用途:** Connects the dots between traffic and business outcomes — which source is driving actual commissions, subscriptions, and bookings.

将流量与业务结果连接起来——哪个来源推动了真实的订单、订阅和预约。

```
This month · 本月

  Newsletter signups · 订阅注册      32    ↑ 18% vs last month
  Custom form submissions · 定制询价  8    ↑ 25%
  Contact form submissions · 联系表单 12   → same
  Booking clicks · 预约点击           19   ↑ 40%
  Consultations booked · 已预约咨询   5   (new metric)

Conversion funnel · 转化漏斗
  Visitors → Newsletter signup   2.6%
  Visitors → Custom form submit  0.6%
  Visitors → Contact form        1.0%
  Custom inquiries → Commission  62%  (5 of 8 became active commissions)
```

---

## 4. Universal Workflows
## 四、通用工作流

These workflows appear consistently across all modules. The UI pattern is the same regardless of whether the content is a journal article, a product, or a customer story.

这些工作流在所有模块中保持一致。无论内容是季刊文章、产品还是客户故事，界面模式相同。

---

### 4.1 Upload · 上传

**Where it appears · 出现位置:** M-2 (product and commission images), M-3 (editorial images), M-5 (event photos)

**Pattern · 模式:**

```
Upload trigger: "Upload images" button or drag zone
→ File picker or drag-and-drop area opens
→ Files validated (type: JPG/PNG/WebP; size: max 10MB per file)
→ Upload progress bar shown per file
→ On complete: thumbnail preview shown inline
→ Metadata fields appear: credit, alt text (EN + ZH), category, usage rights
→ [Save] attaches files to current record
```

**Error states · 错误状态:**
- Wrong file type → red border + "JPG, PNG, or WebP only"
- File too large → red border + "Maximum 10MB per file"
- Upload failed → retry option inline

---

### 4.2 Preview · 预览

**Where it appears · 出现位置:** M-3 (all content before publish), M-2 (products before publish)

**Pattern · 模式:**

```
"Preview" button → opens new browser tab
→ Preview URL: /admin/preview/:content-type/:id?token=xxx
→ Renders content exactly as it will appear on the public website
→ Preview URL is temporary and not publicly accessible (token required)
→ Both EN and ZH versions previewable via toggle in preview UI
→ "Looks good → Approve" button visible to Founder in preview tab
```

The preview uses the exact same HTML templates, CSS, and font stack as the public site — no simulation, no difference.

预览使用与公开网站完全相同的HTML模板、CSS和字体——无需模拟，无差异。

---

### 4.3 Review · 审核

**Where it appears · 出现位置:** M-3 (all content), M-2 (new products), M-1 (customer stories before publish)

**Pattern · 模式:**

```
Creator submits for review → status: internal_review
→ Assigned reviewer receives notification (in-app bell + optional email)
→ Reviewer opens review interface:
     Left panel: rendered content preview
     Right panel: comment thread + decision buttons
→ Reviewer adds inline comments (linked to paragraph or image)
→ Reviewer chooses:
     "Request Revision" → status: revision_requested
                       → Creator notified with comments
                       → Creator edits → resubmits
     "Approve"         → status: approved
                       → Publish / Schedule interface unlocks
```

**Comment thread behavior · 评论线程行为:**
- All comments are visible to all team members with module access
- Comments cannot be deleted, only marked as resolved
- Resolved comments collapse but remain in history

---

### 4.4 Publish · 发布

**Where it appears · 出现位置:** M-2 (products), M-3 (all content)  
**Who can trigger · 操作权限:** Founder only · 仅创始人

**Pattern · 模式:**

```
Status = Approved → "Publish / Schedule" button appears (Founder only)
→ Publish modal opens:
     Option A: "Publish now" → content goes live immediately
     Option B: "Schedule" → date/time picker → content queues for auto-publish
→ Optional: "Also send newsletter?" (if content type = journal issue)
→ [Confirm Publish] → status: published (or: scheduled)
→ Public website updates via:
     Phase 1–2: JSON file update + git push (manual step)
     Phase 3+: API write → website fetches live data
→ Publish event logged in activity log with timestamp + publisher name
```

**Immediate publish confirmation · 立即发布确认:**

```
"[Content title]" is now live on the public website.
"[内容标题]"已在公开网站上线。

View on site → [link]
```

---

### 4.5 Archive · 归档

**Where it appears · 出现位置:** All modules · 所有模块  
**Who can trigger · 操作权限:** Founder only · 仅创始人

**Pattern · 模式:**

```
Any record → "..." overflow menu → "Archive"
→ Confirmation modal:
     "Archive [title]? It will be removed from public display
      but remain in the system record."
     [Cancel] [Archive]
→ Status: archived
→ Record disappears from default list views
→ Visible via "Show archived" filter toggle
→ Archive event logged with timestamp + operator
```

**Archive is never deletion.** All data is retained. To restore: change status back to `draft` or `published` (Founder only).

**归档永远不等于删除。** 所有数据保留。恢复：将状态改回`草稿`或`已发布`（仅创始人）。

---

## 5. Dashboards & Lookboards
## 五、仪表盘与看板

---

### 5.1 Founder Dashboard · 创始人仪表盘

**Route · 路由:** `/admin` (default landing for Founder role)

The Founder dashboard is an at-a-glance overview of the entire operating system — designed for a 2-minute morning check.

创始人仪表盘是整个运营系统的一目了然概览——设计为每天早晨2分钟的快速查看。

**Layout · 布局:**

```
Good morning · 早上好                                      Monday, April 7, 2026

ALERTS · 提醒                                             (auto-dismissed when resolved)
⚠  3 commissions have no follow-up date set
⚠  1 content item in review for 5+ days — no decision
⚠  2 newsletter subscribers bounced this week

┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
│  COMMISSIONS     │  CONTENT         │  B2B             │  COMMUNITY       │
│  定制订单        │  内容管理        │  商业拓展        │  社群            │
│                  │                  │                  │                  │
│  Active: 8       │  In review: 2    │  Active leads: 5 │  Upcoming: 2     │
│  In production: 3│  Scheduled: 1    │  Follow up: 3    │  Seats sold: 14  │
│  Overdue f/up: 3 │  Published: 18   │  Proposals out: 2│  Waitlist: 2     │
│                  │                  │                  │                  │
│  [View all →]   │  [View all →]   │  [View all →]   │  [View all →]   │
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘

┌───────────────────────────────────────┬────────────────────────────────────┐
│  REVENUE THIS MONTH · 本月收入        │  GROWTH · 增长                     │
│                                       │                                    │
│  Deposits received:   $640            │  Newsletter subscribers:  312      │
│  Balances received:   $320            │  New this week:           +8       │
│  Total collected:     $960            │  Website visitors (7d):   1,240    │
│  Pending (approved):  $480            │  Custom form submissions: 8        │
│                                       │  Bookings this month:     5        │
└───────────────────────────────────────┴────────────────────────────────────┘

FOLLOW-UP QUEUE TODAY · 今日跟进队列
  Ana M.      Commission delivered Apr 1   → 2-week follow-up due today
  Botanica NYC  Proposal sent Apr 3       → Follow-up due today
```

---

### 5.2 Co-founder / Artisan Dashboard · 联合创始人/匠人仪表盘

**Route · 路由:** `/admin` (for Co-founder role)

Focused on production: what is in my queue, what needs attention, what is ready to ship.

聚焦生产：我的队列中有什么、什么需要关注、什么准备发货。

```
MY PRODUCTION QUEUE · 我的生产队列

  Commission #042 — Ana · Orchid · Pale blue/blush    IN PRODUCTION ●
    → Started Apr 5 · Target delivery: Apr 20

  Commission #043 — Lin · Wisteria · Purple/cream     DEPOSIT PAID — START
    → Deposit confirmed Apr 6 · Ready to begin

  Commission #041 — Sara · Custom · Navy/gold          QUALITY REVIEW ●
    → Please review and mark approved or flag issue

CONTENT DRAFTS · 内容草稿
  "Five Years of Thread" — Journal Issue 3 · Draft · Due Apr 9
  [Continue editing →]
```

---

### 5.3 Community Manager Dashboard · 社群管理员仪表盘

**Route · 路由:** `/admin` (for Community Manager role)

Focused on events, bookings, and subscribers.

聚焦活动、预约和订阅者。

```
UPCOMING EVENTS · 即将举行的活动

  Apr 18 · Chan Hua Intro Workshop     8/12 seats  ● 4 remaining
  Apr 25 · Advanced 缠花 Workshop      12/12 seats ● Full · Waitlist: 2

BOOKINGS NEEDING ATTENTION · 需关注的预约
  Sara K. · Apr 18 workshop · Payment pending · [Send reminder]

SUBSCRIBER HEALTH · 订阅者状态
  Active: 312 · Bounced this week: 2 · [View list]
  Next quarterly dispatch: Summer 2026 Issue (Apr 20)
```

---

### 5.4 B2B Manager Dashboard · B2B负责人仪表盘

**Route · 路由:** `/admin` (for B2B Manager role)

Focused on outreach pipeline and next actions.

聚焦外联管道和下一步行动。

```
FOLLOW UP TODAY · 今日跟进                ACTION REQUIRED · 需要行动
  Botanica NYC · Proposal sent Apr 3     No reply after 7 days: 3 partners
  Chroma Gallery · Outreach Apr 1        Proposals without follow-up: 2

PIPELINE SUMMARY · 管道概览
  Discovered: 42     Outreached: 8      Replied: 3
  Interested: 3      Proposal sent: 2   Negotiating: 1   Closed: 0
```

---

## 6. Technical Notes
## 六、技术说明

### 6.1 Frontend Framework · 前端框架

**Recommended: Next.js 14+ (App Router)**

- Server-side rendering for data-heavy list pages · 数据密集列表页使用服务端渲染
- Client components for interactive elements (kanban, rich text editor, upload) · 交互元素（看板、富文本编辑器、上传）使用客户端组件
- API routes (`/api/*`) for server-side operations (auth, Mailchimp, Stripe calls) · API路由用于服务端操作（认证、Mailchimp、Stripe调用）
- File-based routing maps cleanly to the module structure above · 文件路由与上述模块结构完全对应

**Alternative considered: Remix** — good choice if real-time data sync becomes important. Slightly more complex for team unfamiliar with it.

**Alternative if no custom build (Phase 1-2):** Airtable Interfaces + Notion — covers 80% of the above without any development. Move to custom build in Phase 3.

Phase 1-2如无自建：Airtable Interfaces + Notion——无需开发即可覆盖上述80%功能。Phase 3再移至自建。

---

### 6.2 Styling System · 样式系统

**Tailwind CSS + brand CSS custom properties**

- Tailwind for layout, spacing, responsive behavior · Tailwind处理布局、间距、响应式
- Brand CSS custom properties (`--gold`, `--ivory`, etc.) imported from a shared token file · 品牌CSS自定义属性从共享token文件导入
- Component library: shadcn/ui (unstyled headless components, then branded) · 组件库：shadcn/ui（无样式headless组件，再添加品牌样式）
- Typography: same Google Fonts import as public site (Cormorant Garamond + Jost) · 字体：与公开网站相同的Google Fonts引入

**Do not use:** Generic UI kits (Ant Design, MUI) that would impose a foreign visual language onto the admin panel.

**不使用：** 通用UI组件库（Ant Design、MUI），这类库会给管理后台引入与品牌不符的视觉语言。

---

### 6.3 State Management · 状态管理

- **Server state:** TanStack Query (React Query) — for all data fetching, caching, and mutation · 所有数据获取、缓存和更新
- **Local UI state:** React `useState` / `useReducer` — for form state, modals, toggles · 表单状态、弹窗、切换
- **Global state:** Minimal — only auth session and current user role via React Context · 仅认证会话和当前用户角色通过React Context管理
- **Avoid:** Redux or Zustand unless complexity demands it · 避免：除非复杂度需要，否则不使用Redux或Zustand

---

### 6.4 Backend Connection · 后端连接

**Phase 1–2: Airtable as backend (via Airtable API)**

Next.js API routes call the Airtable API server-side. The admin UI reads and writes to Airtable tables. This is sufficient for the Phase 1–2 data volume and requires no custom database.

Next.js API路由在服务端调用Airtable API。管理UI读写Airtable表格。这对Phase 1-2的数据量已足够，无需自建数据库。

```javascript
// Example: GET /api/commissions
// 示例：获取定制订单列表
import Airtable from 'airtable';
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

export async function GET() {
  const records = await base('Commissions').select({
    filterByFormula: "NOT({Status} = 'Complete')",
    sort: [{ field: 'Inquiry Date', direction: 'desc' }]
  }).all();
  return Response.json(records.map(r => r.fields));
}
```

**Phase 3+: Supabase (PostgreSQL)**

Migrate from Airtable to Supabase when:
- Airtable row limits are approached (2,000 free / 50,000 Plus)
- Cross-module automation requires SQL joins
- Real-time features (live kanban updates) are needed

以下情况时从Airtable迁移至Supabase：
- 接近Airtable行数限制（免费2,000条/Plus 50,000条）
- 跨模块自动化需要SQL关联查询
- 需要实时功能（看板实时更新）

**Data migration:** Airtable CSV export → Supabase import. Schema already defined in `docs/architecture.md` — the Airtable fields map directly to the PostgreSQL column definitions.

数据迁移：Airtable CSV导出 → Supabase导入。Schema已在`docs/architecture.md`中定义——Airtable字段直接映射至PostgreSQL列定义。

---

### 6.5 Authentication and Permissions · 认证与权限

**Phase 1–2:** Airtable access control via shared credentials per role. Simple but limited — acceptable for a 2-person team.

Phase 1-2：Airtable按角色共享凭证访问控制。简单但有限——对2人团队可接受。

**Phase 3+ (custom admin):** NextAuth.js with email magic link authentication.

```
Auth flow · 认证流程:
  Staff member enters work email → Magic link sent → Click link → Logged in
  → Role loaded from User table in database
  → React Context provides role to all components
  → Middleware protects all /admin/* routes
  → Per-module permission checks on both client and server
```

**Role enforcement pattern · 角色执行模式:**

```javascript
// Middleware: protect all admin routes
// 中间件：保护所有管理路由
export function middleware(request) {
  const session = getSession(request);
  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect('/login');
  }
}

// Per-page: check module permission
// 每页：检查模块权限
function CommissionsPage() {
  const { role } = useAuth();
  if (!canAccess('commissions', role)) return <Forbidden />;
  // render page
}
```

**Permission config · 权限配置** (single source of truth · 单一权威来源):

```javascript
// lib/permissions.js
export const PERMISSIONS = {
  commissions: {
    read:   ['founder', 'co_founder', 'community_manager'],
    write:  ['founder', 'co_founder'],
    approve: ['founder'],
    delete: ['founder']
  },
  b2b: {
    read:   ['founder', 'b2b_manager', 'co_founder'],
    write:  ['founder', 'b2b_manager'],
    approve: ['founder'],
    delete: ['founder']
  },
  // ... all modules
};
```

---

### 6.6 Key Third-Party Integrations · 关键第三方集成

| Service · 服务 | Integration Method · 集成方式 | Used For · 用途 |
|---------------|------------------------------|----------------|
| **Mailchimp** | API via `/api/mailchimp/*` server routes | Subscriber management, campaign send, automation triggers |
| **Stripe** | Stripe Node SDK via server routes | Payment link creation, webhook handling, refund processing |
| **Cal.com** | Cal.com API + iframe embed | Booking data display, event management |
| **Google Analytics 4** | GA4 Reporting API | Surface traffic data in M-6 dashboard |
| **Vercel** | Vercel API (or git push trigger) | Trigger redeploy after JSON content updates (Phase 1–2) |
| **Cloudinary / AWS S3** | Direct upload from client → signed URL | Asset storage for uploaded images (Phase 3) |

---

### 6.7 Admin Panel Deployment · 管理后台部署

**Phase 1–2:** Airtable Interfaces (no code required). Access at `airtable.com/[base]` — share access with co-founder by email invite. Free.

**Phase 3:** Deploy as separate Next.js app on Vercel:

- **Admin URL:** `admin.silora-orient.com` (separate subdomain, not the public site)
- **Access control:** Not publicly crawlable — `robots.txt` disallows, no links from public site
- **Environment variables:** Stored in Vercel project settings (never in code)
- **Deployment:** Same GitHub → Vercel pipeline as public site, but separate project

```
Public website   →  silora-orient.vercel.app      (public)
Admin panel      →  admin.silora-orient.com        (private, auth required)
API routes       →  admin.silora-orient.com/api/*  (server-side only)
```

---

### 6.8 Development Priorities for Phase 3 Build · 第三阶段自建开发优先级

If and when a custom admin panel is built, implement in this order:

如果和当需要自建管理后台，按以下顺序实施：

| Priority · 优先级 | Module / Feature · 模块/功能 | Reason · 原因 |
|-----------------|---------------------------|--------------|
| 1 | Auth + role system · 认证与角色系统 | Everything else depends on it · 其他一切依赖于此 |
| 2 | M-2 Commission kanban · 定制订单看板 | Highest-impact operational module · 最高影响的运营模块 |
| 3 | M-1 Customer profiles · 客户档案 | Linked to commissions, needed daily · 与订单关联，每天需要 |
| 4 | M-3 Content review interface · 内容审核界面 | Unlocks editorial independence · 解锁编辑独立性 |
| 5 | M-6 Analytics dashboard · 分析仪表盘 | Data-informed decisions · 数据驱动决策 |
| 6 | M-4 B2B pipeline · B2B管道 | Growth-phase priority · 增长阶段优先 |
| 7 | M-5 Community hub · 社群中心 | Lower urgency, Cal.com handles most of it · 优先级较低，Cal.com处理大部分 |
| 8 | Upload + asset library · 上传与资产库 | Convenience feature · 便利功能 |
| 9 | Proposal builder · 提案构建器 | Optimization, Notion handles it now · 优化功能，Notion目前已覆盖 |
| 10 | Founder dashboard · 创始人仪表盘 | Build last — requires all modules to be live · 最后构建——需要所有模块上线后 |

---

*Document maintained by · 文档维护方: SILORA ORIENT founding team · 创始团队*  
*Version · 版本: 1.0 · April 2026 · 2026年4月*  
*Depends on · 依赖文档: `docs/architecture.md` · `docs/phase-1-roadmap.md`*  
*Next step · 下一步: Phase 1 implementation — see `docs/phase-1-roadmap.md`*
