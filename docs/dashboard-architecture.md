# SILORA ORIENT — Internal Dashboard Architecture
# SILORA ORIENT — 内部管理后台架构

**Version · 版本:** 1.0  
**Date · 日期:** April 2026 · 2026年4月  
**Status · 状态:** Planning — Pre-implementation blueprint · 规划中——实施前蓝图  
**Audience · 适用对象:** Founder · Future developers · Technical collaborators · 创始人 · 未来开发者 · 技术协作者

---

## 1. Purpose and Scope · 目的与范围

This document is the authoritative architectural blueprint for the SILORA ORIENT internal dashboard. It defines how the dashboard is structured, how it connects to existing systems, how data flows between modules, and what decisions must be made before development begins.

本文档是SILORA ORIENT内部管理后台的权威架构蓝图。它定义了后台的结构、与现有系统的连接方式、模块间的数据流动，以及开发开始前必须做出的决策。

**What this document is · 本文档是:**
- The single source of truth for dashboard design decisions · 后台设计决策的唯一权威来源
- A guide for any future developer who builds or maintains the system · 任何未来构建或维护系统的开发者的指南
- A reference for the founder to understand and validate the system · 创始人理解和验证系统的参考

**What this document is not · 本文档不是:**
- A code implementation guide (see `admin/dashboard-ui-spec.md`) · 代码实施指南
- A deployment guide (covered in Phase 3 roadmap) · 部署指南

---

## 2. Core Design Principles · 核心设计原则

These principles take precedence over all implementation choices.

这些原则优先于所有实施选择。

| Principle · 原则 | Statement · 说明 |
|----------------|----------------|
| Single domain · 单一域名 | The dashboard lives at `silora-orient.vercel.app/dashboard/*` — no new domains, no subdomains. The public site is unchanged. · 后台位于`silora-orient.vercel.app/dashboard/*`——无新域名，无子域名。公开网站不变。 |
| Public site untouched · 公开网站不变 | All 9 existing HTML pages continue to function exactly as built. No migration of public content into Next.js is required. · 所有9个现有HTML页面继续按原样运行。不需要将公开内容迁移至Next.js。 |
| Module-based · 基于模块 | The dashboard mirrors the 6 backend modules defined in `docs/architecture.md`. Each module has its own section, navigation, and permission scope. · 后台映射`docs/architecture.md`中定义的6个后端模块。每个模块有自己的区域、导航和权限范围。 |
| Review before publish · 发布前审核 | No content goes to the public site without passing through the Approved state. Every upload follows the same 8-state workflow. · 没有内容在未通过"已批准"状态的情况下进入公开网站。每次上传遵循相同的8状态工作流。 |
| Small team first · 小团队优先 | Built for 2–4 people now, designed to scale to 10+ without architectural changes. Complexity is deferred, not designed in. · 现在为2–4人构建，设计为无需架构变更即可扩展至10+人。复杂性被推迟，而不是预设。 |
| Airtable bridge · Airtable桥梁 | Phase 3A reads from Airtable via API. Supabase migration (Phase 3B) is a planned upgrade, not a requirement for launch. · 第3A阶段通过API从Airtable读取数据。Supabase迁移（第3B阶段）是计划中的升级，不是启动的要求。 |
| Brand-aligned visual · 品牌一致视觉 | The dashboard uses the same CSS custom properties as the public site: `--gold`, `--ivory`, `--cream`, `--text-dark`. Cormorant Garamond + Jost fonts. · 后台使用与公开网站相同的CSS自定义属性。 |

---

## 3. System Architecture Overview · 系统架构概述

### 3.1 Domain and Routing Structure · 域名与路由结构

```
silora-orient.vercel.app/
│
├── /                          → index.html (existing static)
├── /about.html                → existing static
├── /collections.html          → existing static
├── /other-collections.html    → existing static
├── /custom.html               → existing static
├── /stories.html              → existing static
├── /journal.html              → existing static
├── /documentary.html          → existing static
├── /contact.html              → existing static
├── /workshops.html            → (Phase 2 — static)
│
├── /api/
│   ├── /api/subscribe         → existing (Mailchimp)
│   └── /api/dashboard/*       → new (Phase 3 — Next.js API routes)
│
└── /dashboard/                → Next.js app (Phase 3 — all routes below)
    ├── /dashboard/            → Founder Overview
    ├── /dashboard/cms/        → Brand CMS (M-1)
    ├── /dashboard/studio/     → Product Studio (M-2)
    ├── /dashboard/crm/        → Client CRM (M-3)
    ├── /dashboard/b2b/        → B2B Pipeline (M-4)
    ├── /dashboard/community/  → Community Hub (M-5)
    ├── /dashboard/analytics/  → Analytics & Ops (M-6)
    ├── /dashboard/media/      → Media Upload Center
    ├── /dashboard/review/     → Review & Approval Queue
    └── /dashboard/settings/   → Settings & Permissions
```

### 3.2 Technology Stack · 技术栈

| Layer · 层 | Technology · 技术 | Reason · 原因 |
|-----------|-----------------|-------------|
| Dashboard framework · 后台框架 | Next.js 14 (App Router) | Vercel-native, server components, built-in API routes, file-based routing · Vercel原生，服务器组件，内置API路由，基于文件的路由 |
| UI component library · UI组件库 | shadcn/ui + Tailwind CSS | Pre-built accessible components; matches brand token system with customization · 预构建的可访问组件；通过自定义匹配品牌令牌系统 |
| Fonts · 字体 | Cormorant Garamond (serif) + Jost (sans) | Same as public site — visual continuity · 与公开网站相同——视觉连续性 |
| Authentication · 身份验证 | Supabase Auth | Role-based; works with RLS; email + magic link; no password complexity overhead · 基于角色；与RLS配合；邮件+魔法链接；无密码复杂度开销 |
| Database (Phase 3A) · 数据库（第3A阶段） | Airtable (via REST API) | Bridge while Supabase is set up; no data migration required at launch · 设置Supabase时的桥梁；启动时不需要数据迁移 |
| Database (Phase 3B) · 数据库（第3B阶段） | Supabase PostgreSQL + Row Level Security | Full replacement of Airtable; matches all field types from schema · 完全替换Airtable；匹配架构中的所有字段类型 |
| File storage · 文件存储 | Supabase Storage | S3-compatible buckets; RLS policy per bucket; CDN delivery · S3兼容存储桶；每个存储桶的RLS策略；CDN分发 |
| Email notifications · 邮件通知 | Mailchimp (existing) + optional Resend | Workflow state change notifications to team · 向团队发送工作流状态变更通知 |
| Analytics data · 分析数据 | GA4 Data API (read-only) | Pull summary metrics into Analytics & Ops dashboard page · 将汇总指标拉入分析与运营后台页面 |
| Payment data · 支付数据 | Stripe Dashboard API (read-only) | Revenue and payment status in Founder Overview · 创始人概览中的收入和支付状态 |
| Booking data · 预约数据 | Cal.com API (read-only) | Upcoming consultations and workshop bookings · 即将进行的咨询和工作坊预约 |

### 3.3 Vercel Configuration · Vercel配置

The `vercel.json` will be updated to route `/dashboard/*` to the Next.js application while preserving all existing static file routes:

`vercel.json`将更新以将`/dashboard/*`路由至Next.js应用，同时保留所有现有静态文件路由：

```json
{
  "version": 2,
  "builds": [
    { "src": "api/*.js",        "use": "@vercel/node" },
    { "src": "dashboard/**",    "use": "@vercel/next" },
    { "src": "*.html",          "use": "@vercel/static" },
    { "src": "*.css",           "use": "@vercel/static" },
    { "src": "main.js",         "use": "@vercel/static" },
    { "src": "content/**",      "use": "@vercel/static" },
    { "src": "images/**",       "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/dashboard/(.*)", "dest": "/dashboard/$1" },
    { "src": "/api/(.*)",       "dest": "/api/$1" },
    { "src": "/(.*)",           "dest": "/$1" }
  ]
}
```

---

## 4. The Six Backend Modules · 六个后端模块

Each module maps directly to `docs/architecture.md`. The dashboard provides the interface layer for each.

每个模块直接映射至`docs/architecture.md`。后台为每个模块提供界面层。

| Module ID | Module Name · 模块名称 | Primary data source · 主要数据源 | Dashboard path · 后台路径 |
|-----------|----------------------|--------------------------------|--------------------------|
| M-1 | Brand CMS · 品牌内容管理 | Git + `content/*.json` + Supabase (Phase 3B) | `/dashboard/cms/` |
| M-2 | Product Studio · 产品工作室 | Airtable Commissions → Supabase | `/dashboard/studio/` |
| M-3 | Client CRM · 客户关系管理 | Airtable Customers → Supabase | `/dashboard/crm/` |
| M-4 | B2B Pipeline · B2B外联管道 | Airtable B2B Partners → Supabase | `/dashboard/b2b/` |
| M-5 | Community Hub · 社群中心 | Cal.com API + Airtable → Supabase | `/dashboard/community/` |
| M-6 | Analytics & Ops · 分析与运营 | GA4 API + Mailchimp API + Stripe API | `/dashboard/analytics/` |

### 4.1 M-1: Brand CMS · 品牌内容管理

**What it manages · 管理内容:** Journal entries, editorial content, collection descriptions, customer stories (publishable), brand assets for web.

**Current state · 当前状态:** Managed via direct code edits to `content/*.json` and HTML files. Git push publishes.

**Phase 3 addition · 第三阶段新增:** A CMS interface that lets the Editor role draft, preview, and submit content without touching code. Approved content is written back to `content/*.json` via a git-based or API-based publish mechanism.

**Page set · 页面集合:**
- `/dashboard/cms/` — Journal entry list · 日记条目列表
- `/dashboard/cms/new` — Create entry · 创建条目
- `/dashboard/cms/[id]` — Edit / preview entry · 编辑/预览条目
- `/dashboard/cms/stories/` — Customer stories list · 客户故事列表
- `/dashboard/cms/assets/` — Brand asset library (links to Media Center) · 品牌资产库

### 4.2 M-2: Product Studio · 产品工作室

**What it manages · 管理内容:** Commission lifecycle from inquiry to completion. 14-state status flow. Payment tracking.

**Current state · 当前状态:** Airtable Commissions table with 24 fields.

**Phase 3 addition · 第三阶段新增:** Visual kanban board, commission detail pages with full history, payment status widget linked to Stripe, image attachment per commission (production photos, final product photos).

**Page set · 页面集合:**
- `/dashboard/studio/` — Commission list (filterable, sortable) · 定制订单列表
- `/dashboard/studio/kanban` — Kanban board (14 columns = 14 states) · 看板视图
- `/dashboard/studio/new` — Create commission record · 创建定制订单记录
- `/dashboard/studio/[id]` — Commission detail + status history · 定制订单详情+状态历史
- `/dashboard/studio/[id]/photos` — Attach production/final photos · 附加制作/最终照片

### 4.3 M-3: Client CRM · 客户关系管理

**What it manages · 管理内容:** Full customer profiles including eye color, story notes, flower preferences, relationship stage, workshop history, newsletter status, consent flags.

**Current state · 当前状态:** Airtable Customers table with 26 fields.

**Phase 3 addition · 第三阶段新增:** Rich profile view showing the customer's full history at a glance — all commissions, all interactions, all story notes, relationship stage timeline, consent status.

**Community-first principle · 社群优先原则:**  
The CRM is not a sales tool. The `brand_relationship_stage` field (Prospect → First Commission → Repeat Customer → Community Member → Ambassador) tracks the depth of the relationship, not the transaction value. Dashboard design must reflect this — customer pages lead with the person's story and preferences, not their order history.

CRM不是销售工具。`brand_relationship_stage`字段追踪关系深度，而非交易价值。后台设计必须反映这一点——客户页面以个人故事和偏好为主，而非订单历史。

**Page set · 页面集合:**
- `/dashboard/crm/` — Customer list with relationship stage filter · 含关系阶段过滤器的客户列表
- `/dashboard/crm/new` — Add customer · 添加客户
- `/dashboard/crm/[id]` — Full customer profile · 完整客户档案
- `/dashboard/crm/[id]/edit` — Edit profile · 编辑档案
- `/dashboard/crm/stories/` — Stories awaiting consent or publication · 等待授权或发布的故事

### 4.4 M-4: B2B Pipeline · B2B外联管道

**What it manages · 管理内容:** Outreach to NYC boutiques, concept stores, galleries, cultural institutions. 12-state status flow. Follow-up scheduling.

**Current state · 当前状态:** Airtable B2B Partners table with 27 fields.

**Phase 3 addition · 第三阶段新增:** Outreach pipeline view with follow-up date highlighting. B2B proposal PDF attachment per partner. Status-aware action buttons ("Mark as Replied", "Send Follow-up", "Move to Negotiating").

**Page set · 页面集合:**
- `/dashboard/b2b/` — Partner list with status filter · 含状态过滤器的合作方列表
- `/dashboard/b2b/queue` — Outreach Queue (sorted by priority + follow-up date) · 外联队列
- `/dashboard/b2b/new` — Add partner · 添加合作方
- `/dashboard/b2b/[id]` — Partner detail + outreach log · 合作方详情+外联日志
- `/dashboard/b2b/[id]/edit` — Edit partner · 编辑合作方

### 4.5 M-5: Community Hub · 社群中心

**What it manages · 管理内容:** Workshops (create, manage capacity, view bookings). Consultation bookings from Cal.com. Story consent tracking. Community engagement actions.

**Current state · 当前状态:** Cal.com handles booking; Airtable tracks some data; story intake is manual.

**Phase 3 addition · 第三阶段新增:** Workshop management with Cal.com data pulled in, capacity view, attendee list per event, story consent pipeline, community stage overview.

**Page set · 页面集合:**
- `/dashboard/community/` — Overview: upcoming workshops + recent bookings · 概览：即将进行的工作坊+近期预约
- `/dashboard/community/workshops/` — Workshop list · 工作坊列表
- `/dashboard/community/workshops/new` — Create workshop event · 创建工作坊活动
- `/dashboard/community/workshops/[id]` — Workshop detail + attendee list · 工作坊详情+参与者列表
- `/dashboard/community/bookings/` — All Cal.com bookings (consultations + workshops) · 所有Cal.com预约
- `/dashboard/community/stories/` — Story consent pipeline · 故事授权管道

### 4.6 M-6: Analytics & Ops · 分析与运营

**What it manages · 管理内容:** GA4 traffic metrics, Mailchimp subscriber metrics, Stripe revenue, system health, newsletter performance.

**Current state · 当前状态:** Data exists in GA4, Mailchimp, and Stripe but is viewed only in their own dashboards.

**Phase 3 addition · 第三阶段新增:** Single-view summary of all key metrics, pulled via read-only API integrations.

**Page set · 页面集合:**
- `/dashboard/analytics/` — Combined metrics overview · 综合指标概览
- `/dashboard/analytics/traffic/` — GA4 data: top pages, sources, events · GA4数据
- `/dashboard/analytics/email/` — Mailchimp: subscriber growth, sequence performance · Mailchimp数据
- `/dashboard/analytics/revenue/` — Stripe: payments, deposits, balance due · Stripe数据
- `/dashboard/analytics/system/` — System health: API status, env var checklist · 系统健康状态

---

## 5. Founder Overview Page · 创始人概览页面

The root dashboard page (`/dashboard/`) is the founder's single view of the entire operation. It is read-only — no editing happens here. It surfaces only what requires attention or awareness.

根后台页面是创始人对整个运营的单一视图。它是只读的——此处不进行编辑。它只显示需要注意或了解的内容。

### KPI Tiles · 关键指标卡片

| Tile · 卡片 | Data source · 数据源 | Refresh · 刷新 |
|-----------|---------------------|--------------|
| New subscribers (7 days) · 新订阅者（7天） | Mailchimp API | Daily · 每日 |
| New inquiries (7 days) · 新询价（7天） | Airtable / Supabase | Real-time · 实时 |
| Active commissions · 活跃定制订单 | Airtable / Supabase (status ≠ complete/archived) | Real-time |
| Upcoming consultations · 即将进行的咨询 | Cal.com API | Daily |
| B2B replies this week · 本周B2B回复 | Airtable / Supabase | Real-time |
| Workshop signups (next event) · 下场工作坊报名数 | Cal.com API | Daily |
| Content pending approval · 待审批内容 | Supabase (status = Under Review) | Real-time |
| Revenue this month · 本月收入 | Stripe API | Daily |

### Activity Feed · 活动记录

A chronological list of the last 20 significant events across all modules:

所有模块最近20个重要事件的时间顺序列表：

- New commission inquiry received (Airtable webhook or Zapier push) · 收到新定制询价
- Commission status changed (e.g., `deposit_paid`, `in_production`) · 定制状态变更
- New subscriber joined · 新订阅者加入
- B2B partner replied · B2B合作方回复
- New Cal.com booking · 新Cal.com预约
- Media uploaded (pending review) · 媒体上传（待审核）
- Content approved or rejected · 内容已批准或拒绝

### Quick Actions · 快速操作

- Create new commission record · 创建新定制订单记录
- Add B2B partner · 添加B2B合作方
- Upload media · 上传媒体
- View review queue · 查看审核队列

---

## 6. Media Upload Center · 媒体上传中心

The Media Upload Center (`/dashboard/media/`) is a central asset management system for all brand media. It is not module-specific — it receives uploads from any team member and routes them into the review workflow.

媒体上传中心是所有品牌媒体的中央资产管理系统。它不特定于某个模块——它接收任何团队成员的上传并将其路由至审核工作流。

### Media Categories · 媒体分类

| Category · 分类 | Description · 描述 | Allowed types · 允许类型 | Storage bucket · 存储桶 |
|---------------|------------------|------------------------|----------------------|
| `product` | Product images for collections and commissions · 系列和定制的产品图片 | JPG, PNG, WebP | `supabase/products/` |
| `story` | Customer story photos · 客户故事照片 | JPG, PNG | `supabase/stories/` |
| `workshop` | Workshop event photos · 工作坊活动照片 | JPG, PNG, WebP | `supabase/workshops/` |
| `editorial` | Journal, quarterly issue, campaign imagery · 日记、季刊、活动图片 | JPG, PNG, WebP | `supabase/editorial/` |
| `brand-asset` | Logos, color swatches, brand guidelines · 标志、色板、品牌指南 | JPG, PNG, SVG, PDF | `supabase/brand-assets/` |
| `document` | Contracts, invoices, admin files · 合同、发票、管理文件 | PDF, DOCX | `supabase/documents/` |
| `process` | In-production photos, studio process · 制作中照片、工作室过程 | JPG, PNG, WebP | `supabase/process/` |

### Upload Metadata Schema · 上传元数据架构

Every uploaded file requires the following fields before submission:

每个上传文件在提交前需要以下字段：

| Field · 字段 | Type · 类型 | Required · 必填 | Description · 描述 |
|-----------|-----------|---------------|------------------|
| `file` | File object | ✅ | The actual file · 实际文件 |
| `title` | String | ✅ | Human-readable name · 可读名称 |
| `category` | Enum (above) | ✅ | One of 7 categories · 7个分类之一 |
| `tags` | String[] | Optional | Free-form tags for search · 用于搜索的自由标签 |
| `usage_rights` | Enum | ✅ | `internal-only` / `website-publishable` / `press-use` |
| `related_module` | Enum (M-1 to M-6) | Optional | Which module this asset belongs to · 资产所属模块 |
| `related_item_id` | String | Optional | Linked commission/customer/event ID · 关联的定制/客户/活动ID |
| `consent_confirmed` | Boolean | If story photo | Customer has given written consent · 客户已给予书面授权 |
| `upload_notes` | String | Optional | Context for reviewer · 给审核者的背景说明 |

### Storage Path Convention · 存储路径规范

```
supabase-storage/
└── {bucket}/
    └── {year}/
        └── {month}/
            └── {item-id}_{title-slug}_{timestamp}.{ext}

Example · 示例:
supabase-storage/products/2026/04/comm_0042_orchid-earrings-blue_20260408.jpg
supabase-storage/stories/2026/04/cust_0018_pianist-story-portrait_20260408.jpg
```

---

## 7. Universal Workflow States · 通用工作流状态

All content items in the dashboard — uploads, journal entries, stories, B2B proposals, and workshop announcements — pass through the same 8-state workflow. This consistency means the Review Queue can show items from all modules in one place.

后台中的所有内容项——上传、日记条目、故事、B2B提案和工作坊公告——都通过相同的8状态工作流。这种一致性意味着审核队列可以在一处显示所有模块的项目。

```
DRAFT ──→ UPLOADED ──→ UNDER REVIEW ──→ NEEDS REVISION ──→ [back to DRAFT]
                              │
                              └──→ APPROVED ──→ SCHEDULED ──→ PUBLISHED ──→ ARCHIVED
```

| State · 状态 | Who sets it · 谁设置 | Description · 描述 | Next allowed states · 下一允许状态 |
|------------|---------------------|------------------|----------------------------------|
| `draft` | Any role · 任何角色 | Item created but not submitted · 项目已创建但未提交 | `uploaded` |
| `uploaded` | Any role · 任何角色 | Submitted to review queue · 已提交至审核队列 | `under_review` |
| `under_review` | Reviewer/Founder · 审核者/创始人 | Being evaluated · 正在评估 | `approved`, `needs_revision` |
| `needs_revision` | Reviewer/Founder | Returned to submitter with notes · 带备注退回提交者 | `draft` (resubmit) · 草稿（重新提交） |
| `approved` | Founder / Admin · 创始人/管理员 | Cleared for publication · 已批准发布 | `scheduled`, `published` |
| `scheduled` | Founder / Admin | Set to publish at a future date/time · 设置为在未来日期/时间发布 | `published` |
| `published` | System (on schedule) / Founder | Live on the public site · 在公开网站上线 | `archived` |
| `archived` | Founder / Admin | Removed from active view · 从活跃视图中移除 | none (permanent) · 无（永久） |

### State Transition Rules · 状态转换规则

- Only **Founder** and **Admin** can move items to `approved` or `archived` · 只有创始人和管理员可以将项目移至"已批准"或"已存档"
- Only the **original submitter** or **Admin** can resubmit a `needs_revision` item · 只有原始提交者或管理员可以重新提交"需要修改"的项目
- `published` is irreversible without explicit `archive` action · "已发布"在没有明确"存档"操作的情况下是不可逆的
- Scheduled items publish automatically at the set time · 定时项目在设定时间自动发布
- State change log is maintained on every item with: timestamp + actor + previous state + new state + optional note · 每个项目维护状态变更日志

---

## 8. Role-Based Access Control · 基于角色的访问控制

### Role Definitions · 角色定义

| Role · 角色 | Description · 描述 | Typical person · 典型人员 |
|-----------|------------------|------------------------|
| `founder` | Full access to everything · 全面访问权限 | Brand founder · 品牌创始人 |
| `co_founder` | Full access to operations; cannot change permissions · 全面运营访问；不能更改权限 | Co-founder / Lead artisan · 联合创始人/首席工匠 |
| `editor` | Can create and submit content; cannot approve · 可创建和提交内容；不能批准 | Content writer / Journal editor · 内容撰写者/日记编辑 |
| `community_manager` | Can manage workshops and stories; limited CRM · 可管理工作坊和故事；有限CRM权限 | Community manager · 社群经理 |
| `b2b_manager` | Can manage B2B pipeline only · 仅可管理B2B管道 | B2B outreach lead · B2B外联负责人 |
| `admin` | Technical admin: same as founder for operational data; can manage users · 技术管理员：与创始人相同的运营数据访问；可管理用户 |

### Permission Matrix · 权限矩阵

✅ Full access · 完全访问  
👁 Read-only · 只读  
✏️ Create + edit (own items only) · 创建+编辑（仅限自己的项目）  
📤 Submit for review · 提交审核  
✅📤 Create, edit, submit, approve · 创建、编辑、提交、批准  
❌ No access · 无访问权限

| Page / Action · 页面/操作 | founder | co_founder | editor | community_manager | b2b_manager | admin |
|--------------------------|---------|------------|--------|-------------------|-------------|-------|
| Founder Overview · 创始人概览 | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Brand CMS — view · 品牌CMS查看 | ✅ | 👁 | ✅ | 👁 | ❌ | ✅ |
| Brand CMS — create/edit · 品牌CMS创建/编辑 | ✅ | ❌ | ✏️📤 | ❌ | ❌ | ✅ |
| Brand CMS — approve · 品牌CMS批准 | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Product Studio — view · 产品工作室查看 | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Product Studio — edit · 产品工作室编辑 | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Client CRM — view · 客户CRM查看 | ✅ | ✅ | ❌ | 👁 | ❌ | ✅ |
| Client CRM — edit · 客户CRM编辑 | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| B2B Pipeline — view · B2B管道查看 | ✅ | 👁 | ❌ | ❌ | ✅ | ✅ |
| B2B Pipeline — edit · B2B管道编辑 | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Community Hub — view · 社群中心查看 | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| Community Hub — edit · 社群中心编辑 | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ |
| Analytics & Ops · 分析与运营 | ✅ | 👁 | ❌ | ❌ | ❌ | ✅ |
| Media Upload Center — upload · 媒体上传 | ✅ | ✅ | ✏️📤 | ✏️📤 | ❌ | ✅ |
| Media Upload Center — approve · 媒体审批 | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Review Queue — view · 审核队列查看 | ✅ | ✅ | ✏️ | ✏️ | ❌ | ✅ |
| Review Queue — approve · 审核队列批准 | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Settings — user management · 设置用户管理 | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Settings — permissions · 设置权限 | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |

### Authentication Flow · 身份验证流程

```
User visits /dashboard/*
    │
    ├─ Not authenticated → redirect to /dashboard/login
    │       │
    │       └─ Magic link email sent → click link → session created
    │
    └─ Authenticated → load user role from Supabase `team_members` table
            │
            ├─ Role = founder / admin → show all pages
            ├─ Role = editor → show CMS + Media only
            ├─ Role = community_manager → show Community + Media
            ├─ Role = b2b_manager → show B2B Pipeline only
            └─ Role not recognized → redirect to /dashboard/unauthorized
```

---

## 9. Data Connections · 数据连接

### 9.1 Airtable (Phase 3A — Bridge)

During Phase 3A, the dashboard reads and writes to Airtable via the Airtable REST API. This avoids any data migration at launch.

第3A阶段期间，后台通过Airtable REST API读写Airtable数据。这避免了启动时的任何数据迁移。

```
Dashboard → /api/dashboard/commissions    → Airtable Commissions table
Dashboard → /api/dashboard/customers      → Airtable Customers table
Dashboard → /api/dashboard/b2b            → Airtable B2B Partners table
```

Airtable API keys are stored as Vercel environment variables:
- `AIRTABLE_API_KEY` — personal access token
- `AIRTABLE_BASE_ID` — base ID from URL (format: `appXXXXXXXXXXXXXX`)

### 9.2 Supabase (Phase 3B — Full Migration)

All Airtable tables migrate to Supabase PostgreSQL. Field mapping is defined in `docs/architecture.md` Section 11.

所有Airtable表迁移至Supabase PostgreSQL。字段映射定义在`docs/architecture.md`第11节。

```
Airtable Customers (26 fields)      → Supabase `customers` table
Airtable Commissions (24 fields)    → Supabase `commissions` table
Airtable B2B Partners (27 fields)   → Supabase `b2b_partners` table
Media uploads                        → Supabase Storage (7 buckets)
Team members + roles                 → Supabase `team_members` table
```

### 9.3 External API Connections · 外部API连接

| Service · 服务 | Usage in dashboard · 后台使用方式 | Access type · 访问类型 | Env var · 环境变量 |
|-------------|-------------------------------|---------------------|------------------|
| Mailchimp | Subscriber count, open rates, sequence performance · 订阅者数量、打开率、序列表现 | Read-only API · 只读API | `MAILCHIMP_API_KEY` (existing) |
| GA4 | Traffic, top pages, custom events · 流量、热门页面、自定义事件 | GA4 Data API (read-only) · GA4 数据API | `GA4_PROPERTY_ID`, `GA4_SERVICE_ACCOUNT_KEY` |
| Stripe | Payment list, revenue summary · 支付列表、收入摘要 | Stripe API (restricted key) · Stripe API（受限密钥） | `STRIPE_SECRET_KEY` |
| Cal.com | Bookings, upcoming events · 预约、即将进行的活动 | Cal.com API (v2) | `CALCOM_API_KEY` |
| Formspree | — (Zapier handles sync; no direct API needed) · Zapier处理同步；无需直接API | — | — |

### 9.4 Connection to Public Site Files · 与公开网站文件的连接

The dashboard does not directly edit public HTML files. The content pipeline for the public site works as follows:

后台不直接编辑公开HTML文件。公开网站的内容管道工作方式如下：

```
Content created in dashboard → status = approved
    │
    ├─ For content/*.json items (stories, videos, journal):
    │   Dashboard API writes JSON → triggers Vercel redeploy → content live
    │
    └─ For HTML page content:
        Dashboard creates a PR or signals a developer
        Developer applies changes → git push → auto-deploy
```

In Phase 3C (admin dashboard v2), a fully automated JSON-write-and-redeploy pipeline can be built to eliminate the developer step for JSON-based content.

在第3C阶段（管理后台v2），可以构建完全自动化的JSON写入和重新部署管道，以消除基于JSON内容的开发者步骤。

---

## 10. Review and Approval Queue · 审核与批准队列

The Review Queue (`/dashboard/review/`) aggregates all items across all modules that are currently in `uploaded` or `under_review` state. It is the primary daily workspace for the Founder.

审核队列聚合所有模块中当前处于`uploaded`或`under_review`状态的所有项目。它是创始人的主要日常工作空间。

### Queue Views · 队列视图

| View · 视图 | Filter · 过滤 | Default sort · 默认排序 |
|-----------|------------|----------------------|
| All pending · 所有待处理 | status = `uploaded` OR `under_review` | Oldest first · 最旧优先 |
| By module · 按模块 | Group by M-1 through M-6 + Media | Oldest first within group · 组内最旧优先 |
| Media only · 仅媒体 | category = any, type = file upload | Oldest first |
| Content only · 仅内容 | category = journal/story/editorial | Oldest first |
| Urgent · 紧急 | items older than 7 days in queue | Oldest first |

### Review Actions · 审核操作

For each item in the queue, the reviewer can:

对于队列中的每个项目，审核者可以：

- **Preview · 预览** — See the item as it would appear on the public site
- **Approve · 批准** — Move to `approved`; optionally set a publish date (→ `scheduled`)
- **Request Revision · 请求修改** — Move to `needs_revision`; required: revision note to submitter
- **Archive · 存档** — Remove permanently (founder/admin only)
- **View history · 查看历史** — Full state transition log with timestamps and actors

---

## 11. Settings and Permissions Page · 设置与权限页面

`/dashboard/settings/` is restricted to Founder and Admin roles only.

`/dashboard/settings/`仅限创始人和管理员角色。

### Settings Sections · 设置区域

| Section · 区域 | Description · 描述 |
|--------------|------------------|
| Team members · 团队成员 | Add / remove users; assign roles; view last active · 添加/删除用户；分配角色；查看最后活跃时间 |
| Role permissions · 角色权限 | View the permission matrix; adjust which roles can access which modules · 查看权限矩阵；调整哪些角色可以访问哪些模块 |
| External integrations · 外部集成 | View connection status for Mailchimp, GA4, Cal.com, Stripe, Airtable/Supabase · 查看各外部服务的连接状态 |
| Notification preferences · 通知偏好 | Configure which events send email notifications to which roles · 配置哪些事件向哪些角色发送邮件通知 |
| Workflow configuration · 工作流配置 | Adjust which roles can approve which content types · 调整哪些角色可以批准哪些内容类型 |
| System status · 系统状态 | Env var checklist; API health checks; storage usage · 环境变量核查清单；API健康检查；存储使用量 |

---

## 12. Visual Design System · 视觉设计系统

The dashboard inherits the public site's design language. This creates visual continuity and reduces design decisions.

后台继承公开网站的设计语言。这创造视觉连续性并减少设计决策。

### CSS Custom Properties (inherited) · CSS自定义属性（继承）

```css
--gold:        #BF9D6A   /* Primary accent · 主要强调色 */
--gold-light:  #D4B482   /* Hover states · 悬停状态 */
--ivory:       #FAF7F2   /* Page background · 页面背景 */
--cream:       #F2EDE5   /* Card background · 卡片背景 */
--text-dark:   #2A2724   /* Primary text · 主要文字 */
--text-mid:    #5C5650   /* Secondary text · 次要文字 */
--text-light:  #9C9690   /* Muted text, labels · 柔和文字，标签 */
--border:      #E8E2D8   /* All borders · 所有边框 */
```

### Dashboard-specific additions · 后台特定新增

```css
--status-draft:          #9C9690   /* Muted gray · 柔和灰 */
--status-uploaded:       #BF9D6A   /* Gold · 金色 */
--status-under-review:   #C4A882   /* Warm tan · 暖棕 */
--status-needs-revision: #C17D5A   /* Warm orange · 暖橙 */
--status-approved:       #A8B89C   /* Sage green · 鼠尾草绿 */
--status-scheduled:      #7BA89A   /* Teal sage · 青绿鼠尾草 */
--status-published:      #5C8F7A   /* Forest sage · 森林鼠尾草 */
--status-archived:       #C8C0B8   /* Light neutral · 浅中性色 */
```

### Layout · 布局

```
┌─────────────────────────────────────────────────────┐
│ SILORA ORIENT  [module nav]           [user] [bell] │  ← Top bar (48px)
├──────────┬──────────────────────────────────────────┤
│          │                                           │
│ Sidebar  │  Main content area                        │
│ (220px)  │                                           │
│          │                                           │
│ Overview │                                           │
│ CMS      │                                           │
│ Studio   │                                           │
│ CRM      │                                           │
│ B2B      │                                           │
│ Community│                                           │
│ Analytics│                                           │
│ ───────  │                                           │
│ Media    │                                           │
│ Review   │                                           │
│ Settings │                                           │
│          │                                           │
└──────────┴──────────────────────────────────────────┘
```

---

## 13. Migration Strategy · 迁移策略

### Phase 3A — Dashboard launch with Airtable bridge · 第3A阶段——使用Airtable桥梁启动后台

1. Build Next.js dashboard in `/dashboard/` directory
2. Connect all CRUD operations to Airtable API
3. Add Supabase Auth for team login and roles
4. Add Supabase Storage for media uploads
5. Deploy to Vercel alongside existing static site

### Phase 3B — Supabase data migration · 第3B阶段——Supabase数据迁移

Trigger criteria (per `docs/architecture.md`, Section 11):

- Monthly active commissions > 20 consistently · 月度活跃定制订单>20件持续
- More than 3 team members using the dashboard · 超过3名团队成员使用后台
- Airtable plan cost exceeds $40/month · Airtable计划费用超过每月$40
- Storage needs exceed Airtable attachment limits · 存储需求超过Airtable附件限制

Migration steps:

1. Export Airtable CSVs
2. Create Supabase tables matching field mapping in `docs/architecture.md`
3. Import data via Supabase SQL
4. Update dashboard API endpoints from Airtable → Supabase
5. Validate all data; switch Airtable to read-only for 1 week
6. Decommission Airtable

### Phase 3C — CMS automation · 第3C阶段——CMS自动化

- JSON write-and-redeploy pipeline for `content/*.json` updates
- Automated `workshops.html` generation from dashboard
- Direct image optimization pipeline (upload → compress → CDN)

---

## 14. Document Index · 文档索引

| Document · 文档 | Location · 位置 | Contents · 内容 |
|---------------|----------------|----------------|
| This document · 本文档 | `docs/dashboard-architecture.md` | Full system design · 完整系统设计 |
| UI Specification · UI规格 | `admin/dashboard-ui-spec.md` | Page-by-page UI specs and wireframes · 逐页UI规格和线框图 |
| Upload Workflow · 上传工作流 | `admin/dashboard-upload-workflow.md` | Upload process, metadata, review flow · 上传流程、元数据、审核流程 |
| Phase 3 Roadmap · 第三阶段路线图 | `docs/phase-3-roadmap.md` | Build sequence, dependencies, milestones · 构建顺序、依赖关系、里程碑 |
| System Architecture · 系统架构 | `docs/architecture.md` | Full brand OS architecture v2.0 · 完整品牌操作系统架构v2.0 |
| Phase 1 Status · 第一阶段状态 | `docs/phase-1-status.md` | Phase 1 completion record · 第一阶段完成记录 |
| Phase 2 Status · 第二阶段状态 | `docs/phase-2-status.md` | Phase 2 task status · 第二阶段任务状态 |

---

*Document version: 1.0 · April 2026*  
*See `admin/dashboard-ui-spec.md` for page-level wireframes and component specs*  
*See `docs/phase-3-roadmap.md` for implementation sequence and milestones*
