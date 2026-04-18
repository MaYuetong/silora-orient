# SILORA ORIENT — Phase 3 Roadmap
# SILORA ORIENT — 第三阶段路线图

**Version · 版本:** 1.0  
**Date · 日期:** April 2026 · 2026年4月  
**Status · 状态:** Planning — Awaiting Phase 2 completion · 规划中——等待第二阶段完成  
**Audience · 适用对象:** Founder · Future developers · Technical collaborators · 创始人 · 未来开发者 · 技术协作者

---

## Phase Summary · 阶段概述

Phase 3 is the build phase. Phase 1 fixed failures. Phase 2 established rhythm. Phase 3 builds the internal infrastructure that lets the brand operate professionally at scale — an internal dashboard, a media management system, a structured content pipeline, and a database that can handle growth without the constraints of SaaS tools.

第三阶段是构建阶段。第一阶段修复了失败。第二阶段建立了节奏。第三阶段构建让品牌能够专业地大规模运营的内部基础设施——内部管理后台、媒体管理系统、结构化内容管道，以及可以处理增长而不受SaaS工具限制的数据库。

**Why Phase 3 matters · 第三阶段的重要性:**

At the end of Phase 2, the brand will have: real subscribers, tracked commissions, a B2B pipeline, workshop bookings, and customer stories. All of that data lives in disconnected SaaS tools — Mailchimp, Airtable, Cal.com, Stripe. Phase 3 creates the single place where all of it can be seen, managed, and acted on.

第二阶段结束时，品牌将拥有：真实订阅者、已追踪的定制订单、B2B管道、工作坊预约和客户故事。所有这些数据都存在于分散的SaaS工具中——Mailchimp、Airtable、Cal.com、Stripe。第三阶段创建可以查看、管理和操作所有这些内容的单一平台。

**Phase 3 in the overall architecture · 第三阶段在整体架构中的位置:**

```
Phase 1: Fix failures          → infrastructure in place
Phase 2: Build rhythm          → data and relationships growing
Phase 3: Build the dashboard   → everything visible and manageable in one place
Phase 4+: Scale                → Supabase, automation, proposal generation
```

---

## Why Build the Dashboard Now (and Not Earlier) · 为什么现在构建后台（而非更早）

The dashboard is Phase 3, not Phase 1 or Phase 2, for a specific reason: you cannot design a useful dashboard without real data to display.

后台是第三阶段而非第一或第二阶段，原因很具体：没有真实数据可显示，就无法设计有用的后台。

| Condition needed before dashboard build · 构建后台前所需条件 | Provided by · 提供方 | Ready by · 就绪时间 |
|----------------------------------------------------------|--------------------|--------------------|
| Real subscribers to display · 可显示的真实订阅者 | Phase 1 P0-B | After P0-B activation |
| Real commissions to track · 可追踪的真实定制订单 | Phase 1 P0-C + Zapier | After P0-C activation |
| B2B records to manage · 可管理的B2B记录 | Phase 2 Task 1.2.B | After 1.2.B complete |
| Workshop bookings to view · 可查看的工作坊预约 | Phase 2 Task 2.1.A | After workshops page live |
| Customer stories to moderate · 可审核的客户故事 | Phase 2 Task 2.1.B | After first story |
| GA4 data to display · 可显示的GA4数据 | Phase 1 P0-A | After GA4 Measurement ID set |
| Team members beyond founder · 除创始人外的团队成员 | Operations stage | Phase 2+ |

**The practical rule: build the dashboard when you have enough data that the empty state is the exception, not the rule.**

**实际规则：当你有足够的数据使空状态成为例外而非常态时，再构建后台。**

If the dashboard is built in Phase 1 — before any subscribers, commissions, or B2B contacts — every page shows an empty state. This makes it hard to validate that the system is working, hard to make design decisions, and hard to demonstrate value to the founder.

如果在第一阶段构建后台——在没有任何订阅者、定制或B2B联系人之前——每个页面都显示空状态。这使得验证系统是否正常工作变得困难，难以做出设计决策，也难以向创始人展示价值。

---

## Phase 3 Prerequisites · 第三阶段前提条件

Before Phase 3 development begins, all of the following must be true:

第三阶段开发开始之前，以下所有条件必须成立：

| Prerequisite · 前提条件 | Minimum threshold · 最低阈值 | Why it matters · 重要原因 |
|------------------------|--------------------------|------------------------|
| Active Mailchimp subscribers · 活跃Mailchimp订阅者 | 50+ real subscribers | Dashboard email metrics need real numbers to display · 后台邮件指标需要真实数字显示 |
| Airtable commissions tracked · Airtable定制订单追踪 | 5+ commissions, mixed statuses · 5+件定制，混合状态 | Kanban board needs real data to design around · 看板需要真实数据来围绕设计 |
| B2B records in Airtable · Airtable中的B2B记录 | 20+ records, 5+ outreached · 20+条记录，5+已外联 | B2B pipeline view needs real data · B2B管道视图需要真实数据 |
| GA4 active with real data · GA4已激活含真实数据 | 30+ days of data · 30+天数据 | Analytics page needs meaningful numbers · 分析页面需要有意义的数字 |
| Team size · 团队规模 | 2+ people needing dashboard access · 2+人需要后台访问 | If only 1 person, Airtable + GA4 + Mailchimp direct is sufficient · 如果只有1人，直接使用Airtable+GA4+Mailchimp已足够 |
| Phase 2 P0 tasks complete · 第二阶段P0任务已完成 | 1.2.A + 1.2.B done | Dashboard needs data from these tasks · 后台需要这些任务的数据 |
| Developer available · 开发者可用 | 1 frontend developer (Next.js) | Phase 3 requires code — not founder-executable · 第三阶段需要代码——不是创始人可执行的 |

---

## Phase 3 Scope — What Is Included · 第三阶段范围——包含内容

Phase 3 is divided into three sub-phases to sequence work by risk and dependency.

第三阶段分为三个子阶段，按风险和依赖关系排序工作。

### Phase 3A — Dashboard MVP · 第3A阶段——最小可行产品

**Goal · 目标:** A working internal dashboard connected to existing data sources (Airtable, Mailchimp, GA4, Stripe, Cal.com). No data migration. No new backend.

**Estimated development time · 预计开发时间:** 4–6 weeks with 1 developer · 1名开发者4–6周

**Deliverables · 交付成果:**

| Task · 任务 | Description · 描述 | Priority · 优先级 |
|-----------|------------------|-----------------|
| 3A-1 | Next.js app scaffold in `/dashboard/` directory · 在`/dashboard/`目录创建Next.js应用脚手架 | P0 |
| 3A-2 | Vercel routing: `/dashboard/*` → Next.js, all else → static · Vercel路由配置 | P0 |
| 3A-3 | Supabase Auth: magic link login, role assignment · Supabase Auth：魔法链接登录，角色分配 | P0 |
| 3A-4 | Sidebar + top bar layout shell (all routes) · 侧边栏+顶部栏布局外壳 | P0 |
| 3A-5 | Founder Overview page with KPI tiles (Airtable + Mailchimp + Stripe + Cal.com) · 创始人概览页面 | P0 |
| 3A-6 | Product Studio: commission list + kanban + detail view (reads from Airtable) · 产品工作室：定制列表+看板+详情视图 | P0 |
| 3A-7 | Client CRM: customer list + profile view (reads from Airtable) · 客户CRM：客户列表+档案视图 | P0 |
| 3A-8 | B2B Pipeline: partner list + queue view + detail view (reads from Airtable) · B2B管道视图 | P1 |
| 3A-9 | Community Hub: overview + workshop list + Cal.com bookings · 社群中心概览 | P1 |
| 3A-10 | Analytics & Ops: GA4 + Mailchimp + Stripe summary · 分析与运营摘要 | P1 |
| 3A-11 | Supabase Storage setup: 7 buckets + RLS policies · Supabase Storage配置 | P1 |
| 3A-12 | Media Upload Center: upload form + media library + review queue · 媒体上传中心 | P1 |
| 3A-13 | Review & Approval Queue: all content types · 审核与批准队列 | P1 |
| 3A-14 | Settings: team management + integration status · 设置：团队管理+集成状态 | P2 |
| 3A-15 | Role-based access control enforcement on all routes · 所有路由上的基于角色的访问控制执行 | P0 |
| 3A-16 | Notification system: in-dashboard bell + email · 通知系统 | P2 |

### Phase 3B — Supabase Migration · 第3B阶段——Supabase迁移

**Goal · 目标:** Migrate all operational data from Airtable to Supabase PostgreSQL. Update all dashboard API calls. Retire Airtable.

**When to begin · 何时开始:** When any 3 of these 6 trigger criteria are met (from `docs/architecture.md`):

| Trigger · 触发条件 | Threshold · 阈值 |
|-----------------|----------------|
| Monthly active commissions · 月度活跃定制 | > 20 consistently · 持续>20件 |
| Dashboard team members · 后台团队成员 | > 3 people · >3人 |
| Airtable cost · Airtable费用 | > $40/month · >每月$40 |
| Airtable storage · Airtable存储 | > 5GB attachments · >5GB附件 |
| API rate limit friction · API速率限制摩擦 | Consistent Airtable 429 errors · 持续Airtable 429错误 |
| Custom query needs · 自定义查询需求 | Reports that Airtable cannot produce · Airtable无法生成的报告 |

**Deliverables · 交付成果:**

| Task · 任务 | Description · 描述 |
|-----------|------------------|
| 3B-1 | Create Supabase project and database · 创建Supabase项目和数据库 |
| 3B-2 | Create all tables matching Airtable schema (field mapping in `docs/architecture.md` Section 11) · 创建匹配Airtable架构的所有表 |
| 3B-3 | Apply Row Level Security policies on all tables · 在所有表上应用行级安全策略 |
| 3B-4 | Export Airtable CSVs and import to Supabase · 导出Airtable CSV并导入Supabase |
| 3B-5 | Update all dashboard API endpoints to use Supabase client · 更新所有后台API端点使用Supabase客户端 |
| 3B-6 | Validate all data: spot check 20% of records · 验证所有数据：抽查20%的记录 |
| 3B-7 | 1-week parallel run: both Airtable and Supabase active, compare · 1周并行运行：Airtable和Supabase同时活跃，对比 |
| 3B-8 | Switch Airtable to read-only for 2 weeks (fallback) · 将Airtable设置为只读2周（备用） |
| 3B-9 | Decommission Airtable · 停用Airtable |

**Estimated development time · 预计开发时间:** 2–3 weeks · 2–3周

### Phase 3C — CMS Automation · 第3C阶段——CMS自动化

**Goal · 目标:** Eliminate the developer step for publishing JSON-based content. Founder or Editor can approve a journal entry and it appears on the site within 60 seconds, without any git push.

**Deliverables · 交付成果:**

| Task · 任务 | Description · 描述 |
|-----------|------------------|
| 3C-1 | JSON write API: dashboard writes to `content/*.json` via Vercel API route · JSON写入API：后台通过Vercel API路由写入JSON文件 |
| 3C-2 | Vercel deploy webhook: trigger redeploy after JSON write · Vercel部署Webhook：JSON写入后触发重新部署 |
| 3C-3 | Workshop page generator: auto-update `workshops.html` from dashboard event data · 工作坊页面生成器：从后台活动数据自动更新工作坊页面 |
| 3C-4 | Image optimization pipeline: Supabase upload → auto-compress → WebP serve → CDN · 图片优化管道 |
| 3C-5 | Story publish flow: one-click publish from story consent pipeline to `stories.html` · 故事发布流程：从故事授权管道一键发布至`stories.html` |

**Estimated development time · 预计开发时间:** 2–3 weeks · 2–3周

---

## What Is Deferred — Not in Phase 3 · 推迟的内容——不在第三阶段

| Deferred feature · 推迟功能 | Reason · 原因 | Target · 目标 |
|---------------------------|------------|------------|
| Automated proposal PDF generator · 自动化提案PDF生成器 | Requires more commission data to understand template needs · 需要更多定制数据来了解模板需求 | Phase 4 |
| B2B proposal PDF generator · B2B提案PDF生成器 | Requires established B2B relationships to know what's needed · 需要已建立的B2B关系来了解需求 | Phase 4 |
| Customer-facing portal · 客户门户 | No demand signal yet; commission process works via email + Stripe · 尚无需求信号；定制流程通过邮件+Stripe运作 | Phase 4+ |
| Mobile app · 移动应用 | Dashboard is internal; mobile web is sufficient · 后台是内部的；移动网页已足够 | Phase 5+ |
| Multi-language CMS (full ZH edition) · 多语言CMS（完整中文版） | Can be added in Phase 3C once base CMS works · 基础CMS工作后可在第3C阶段添加 | Phase 3C |
| Automated email campaigns beyond welcome · 欢迎序列以外的自动化邮件活动 | Phase 2 quarterly issue will inform what's needed · 第二阶段季刊将告知所需内容 | Phase 4 |
| Analytics dashboard (custom, beyond GA4 embed) · 自定义分析后台 | GA4 + Mailchimp + Stripe native dashboards are sufficient for Phase 3 · 第三阶段GA4+Mailchimp+Stripe原生后台已足够 | Phase 4 |
| Inventory / stock management · 库存管理 | All pieces are custom; no inventory to track · 所有作品均为定制；无库存可追踪 | Phase 4 (if wholesale grows) |

---

## Technical Architecture Decisions · 技术架构决策

These decisions are made now so that the developer who builds Phase 3 does not need to re-derive them.

现在做出这些决策，以便构建第三阶段的开发者不需要重新推导。

### Decision 1: Next.js 14 App Router (not Pages Router) · 决定1：Next.js 14 App Router

**Reason · 原因:** App Router supports React Server Components, which reduces client-side JavaScript and makes data-heavy pages (commission list, customer CRM) faster. It also produces cleaner route organization for the `/dashboard/*` path structure.

App Router支持React服务器组件，减少客户端JavaScript，使数据密集型页面更快。它还为`/dashboard/*`路径结构产生更清晰的路由组织。

### Decision 2: Supabase Auth (not NextAuth or Clerk) · 决定2：Supabase Auth（非NextAuth或Clerk）

**Reason · 原因:** Supabase Auth is already part of the stack for storage. Using it for authentication avoids adding a third service. Row Level Security policies can be written against the auth user's role directly, eliminating the need for a separate middleware layer.

Supabase Auth已经是存储栈的一部分。使用它进行身份验证避免了添加第三个服务。行级安全策略可以直接针对认证用户的角色编写，消除了单独中间件层的需求。

**Authentication method · 身份验证方法:** Magic link (passwordless email). Reason: the team is small and known; passwords add complexity and support burden without meaningful security benefit over magic links for a 5-person team.

魔法链接（无密码邮件）。原因：团队规模小且成员已知；对于5人团队，密码增加了复杂性和支持负担，但相对于魔法链接没有有意义的安全优势。

### Decision 3: Airtable bridge in Phase 3A (not immediate Supabase migration) · 决定3：第3A阶段使用Airtable桥梁（非立即Supabase迁移）

**Reason · 原因:** Migrating data and building the dashboard at the same time doubles the risk of Phase 3A. Building the dashboard on top of Airtable first means: the dashboard can launch sooner, real usage can inform the Supabase schema design, and a data migration failure cannot take down the entire dashboard.

同时迁移数据和构建后台会使第3A阶段的风险加倍。先在Airtable之上构建后台意味着：后台可以更快推出，真实使用可以为Supabase架构设计提供信息，数据迁移失败不会导致整个后台崩溃。

### Decision 4: shadcn/ui for components (not a full design system from scratch) · 决定4：使用shadcn/ui组件（非从头构建完整设计系统）

**Reason · 原因:** shadcn/ui provides pre-built accessible components (data tables, modals, dropdown menus, form inputs, date pickers) that follow Radix UI accessibility standards. The brand's visual identity is applied via the CSS custom property overrides — color tokens and font variables — rather than building every component from scratch.

shadcn/ui提供预构建的可访问组件（数据表格、模态框、下拉菜单、表单输入、日期选择器），遵循Radix UI可访问性标准。品牌视觉标识通过CSS自定义属性覆盖——颜色令牌和字体变量——来应用，而不是从头构建每个组件。

### Decision 5: Path-based routing (/dashboard/*) not subdomain (dashboard.silora-orient.com) · 决定5：基于路径的路由（/dashboard/*）而非子域名

**Reason · 原因:** Single Vercel project, single SSL certificate, single deployment. Shared cookies and auth session. No DNS management. The public site and dashboard are one unified codebase with separate route namespaces.

单个Vercel项目，单个SSL证书，单次部署。共享cookie和认证会话。无需DNS管理。公开网站和后台是一个统一的代码库，具有独立的路由命名空间。

### Decision 6: No public API versioning · 决定6：无公共API版本控制

**Reason · 原因:** The dashboard API (`/api/dashboard/*`) is internal-only. It serves the Next.js dashboard exclusively. There are no external consumers. API versioning would add complexity with no benefit at Phase 3 scale.

后台API（`/api/dashboard/*`）仅供内部使用。它专门为Next.js后台提供服务。没有外部消费者。API版本控制会在第三阶段规模下增加复杂性而没有任何好处。

---

## Dependencies and Prerequisites · 依赖关系与前提条件

```
Phase 3A dependencies:
├── Phase 1 P0-B activated (Mailchimp) → for subscriber KPI tile
├── Phase 1 P0-C activated (Airtable base) → for all operational data
├── Phase 1 P0-A activated (GA4 real ID) → for analytics page
├── Phase 2 Task 1.2.B started → for B2B pipeline data
├── Vercel account with Node.js runtime → already configured
├── Supabase account created → new requirement
│   └── Free tier sufficient for Phase 3A (500MB DB, 1GB storage)
├── Developer with Next.js experience → new requirement
└── Node.js 18+ on local development machines → standard

Phase 3B dependencies:
├── Phase 3A running for 4+ weeks → stable data pipeline
├── Airtable export tools available → standard Airtable feature
├── Supabase project from Phase 3A → already exists
└── Developer time for migration → 2–3 weeks

Phase 3C dependencies:
├── Phase 3B complete (Supabase as primary DB)
├── Vercel webhook or deploy API → standard Vercel feature
└── Content structure stable (JSON schemas won't change frequently)
```

---

## Task Table · 任务一览表

| Task ID | Task Name · 任务名称 | Priority · 优先级 | Phase · 子阶段 | Estimated effort · 预计工作量 | Depends on · 依赖 | Status · 状态 |
|---------|--------------------|--------------------|--------------|------------------------------|-------------------|-------------|
| 3A-1 | Next.js scaffold + Vercel routing · 脚手架+路由 | P0 | 3A | 3–4 days | — | ⏳ Planning |
| 3A-2 | Supabase Auth + role system · 认证+角色系统 | P0 | 3A | 2–3 days | 3A-1 | ⏳ Planning |
| 3A-3 | Global layout shell (sidebar, top bar) · 全局布局外壳 | P0 | 3A | 2–3 days | 3A-1 | ⏳ Planning |
| 3A-4 | Founder Overview page · 创始人概览页面 | P0 | 3A | 3–5 days | 3A-2, 3A-3 | ⏳ Planning |
| 3A-5 | Product Studio module (list + kanban + detail) · 产品工作室模块 | P0 | 3A | 5–7 days | 3A-2, 3A-3 | ⏳ Planning |
| 3A-6 | Client CRM module (list + profile) · 客户CRM模块 | P0 | 3A | 4–5 days | 3A-2, 3A-3 | ⏳ Planning |
| 3A-7 | B2B Pipeline module · B2B管道模块 | P1 | 3A | 4–5 days | 3A-2, 3A-3 | ⏳ Planning |
| 3A-8 | Community Hub module · 社群中心模块 | P1 | 3A | 3–4 days | 3A-2, 3A-3 | ⏳ Planning |
| 3A-9 | Analytics & Ops module · 分析与运营模块 | P1 | 3A | 3–4 days | 3A-2, 3A-3 | ⏳ Planning |
| 3A-10 | Supabase Storage (7 buckets + RLS) · 存储桶配置 | P1 | 3A | 2 days | 3A-2 | ⏳ Planning |
| 3A-11 | Media Upload Center · 媒体上传中心 | P1 | 3A | 5–7 days | 3A-10 | ⏳ Planning |
| 3A-12 | Review & Approval Queue · 审核与批准队列 | P1 | 3A | 3–4 days | 3A-11 | ⏳ Planning |
| 3A-13 | Brand CMS module (journal + stories) · 品牌CMS模块 | P1 | 3A | 4–5 days | 3A-11, 3A-12 | ⏳ Planning |
| 3A-14 | Settings module · 设置模块 | P2 | 3A | 2–3 days | 3A-2 | ⏳ Planning |
| 3A-15 | Notification system · 通知系统 | P2 | 3A | 2–3 days | 3A-2 | ⏳ Planning |
| 3B-1 | Supabase DB schema creation · 数据库架构创建 | P0 | 3B | 3–4 days | Phase 3A stable | ⏳ Planning |
| 3B-2 | Data migration (Airtable → Supabase) · 数据迁移 | P0 | 3B | 3–5 days | 3B-1 | ⏳ Planning |
| 3B-3 | Dashboard API update (Airtable → Supabase) · API更新 | P0 | 3B | 5–7 days | 3B-2 | ⏳ Planning |
| 3B-4 | Validation and parallel run · 验证与并行运行 | P0 | 3B | 1 week | 3B-3 | ⏳ Planning |
| 3C-1 | JSON write API + Vercel redeploy · JSON写入API | P0 | 3C | 3–4 days | Phase 3B | ⏳ Planning |
| 3C-2 | Workshop page generator · 工作坊页面生成器 | P1 | 3C | 2–3 days | 3C-1 | ⏳ Planning |
| 3C-3 | Image optimization pipeline · 图片优化管道 | P1 | 3C | 3–4 days | Phase 3B | ⏳ Planning |
| 3C-4 | Story one-click publish · 故事一键发布 | P1 | 3C | 2–3 days | 3C-1 | ⏳ Planning |

---

## Timeline Estimate · 时间估算

These estimates assume 1 experienced Next.js developer working full-time.

这些估算假设1名有经验的Next.js开发者全职工作。

| Phase · 子阶段 | Duration · 时长 | Deliverable · 交付成果 |
|--------------|---------------|----------------------|
| Phase 3A | 5–7 weeks | Working dashboard connected to all Phase 1/2 data · 连接所有第一/二阶段数据的工作后台 |
| Phase 3B | 3–4 weeks | All data in Supabase, Airtable retired · 所有数据在Supabase中，Airtable停用 |
| Phase 3C | 3–4 weeks | Automated publish pipeline, zero developer deploys for content · 自动化发布管道，内容无需开发者部署 |
| **Total · 总计** | **11–15 weeks** | **Full Phase 3 complete · 第三阶段全面完成** |

**Minimum viable Phase 3A · 最小可行第3A阶段:** 3A-1 through 3A-6 (core modules + auth) can be delivered in 3–4 weeks, giving the founder a working commission tracker and overview page before the full dashboard is complete.

3A-1至3A-6（核心模块+认证）可以在3–4周内交付，在完整后台完成之前为创始人提供一个工作中的定制追踪器和概览页面。

---

## Developer Handoff Package · 开发者交接包

When a developer is engaged to build Phase 3, they should receive all of the following:

当开发者被雇用来构建第三阶段时，他们应该收到以下所有内容：

| Document · 文档 | Location · 位置 | Contents · 内容 |
|---------------|----------------|----------------|
| This document · 本文档 | `docs/phase-3-roadmap.md` | Phase structure, decisions, task list · 阶段结构、决策、任务列表 |
| Dashboard architecture · 后台架构 | `docs/dashboard-architecture.md` | Full system design, module specs, data connections · 完整系统设计、模块规格、数据连接 |
| UI specification · UI规格 | `admin/dashboard-ui-spec.md` | Page-by-page wireframes and component specs · 逐页线框图和组件规格 |
| Upload workflow · 上传工作流 | `admin/dashboard-upload-workflow.md` | Upload process, metadata, review flow, quality standards · 上传流程、元数据、审核流程、质量标准 |
| System architecture · 系统架构 | `docs/architecture.md` | Full brand OS architecture including Supabase migration plan · 完整品牌操作系统架构包括Supabase迁移计划 |
| Airtable schema · Airtable架构 | `admin/airtable-schema.md` | Current data model (source for Supabase table design) · 当前数据模型（Supabase表设计来源） |

**First day for the developer · 开发者第一天:**

1. Read `docs/dashboard-architecture.md` in full · 完整阅读后台架构文档
2. Read `admin/dashboard-ui-spec.md` Sections 1–3 · 阅读UI规格第1–3节
3. Create Supabase project and run Supabase Auth setup · 创建Supabase项目并运行Auth配置
4. Scaffold Next.js app in `/dashboard/` directory · 在`/dashboard/`目录搭建Next.js应用脚手架
5. Configure Vercel routing per Section 3.3 of architecture doc · 按架构文档第3.3节配置Vercel路由
6. Confirm `/dashboard/` route resolves correctly alongside existing static pages · 确认`/dashboard/`路由在现有静态页面旁边正确解析

---

## Risk Register · 风险登记册

| Risk · 风险 | Likelihood · 可能性 | Impact · 影响 | Mitigation · 缓解方案 |
|-----------|------------------|-------------|---------------------|
| Airtable API rate limits (5 req/sec, 1200 req/min) causing dashboard slowness · Airtable API速率限制导致后台响应慢 | Medium · 中 | Dashboard feels slow · 后台感觉慢 | Cache Airtable responses in Supabase or Redis for 5-min TTL; prioritize Phase 3B · 缓存Airtable响应；优先进行第3B阶段 |
| Supabase free tier storage (1GB) exceeded by media uploads · Supabase免费套餐存储被媒体上传超出 | Medium · 中 | Storage errors · 存储错误 | Set upload limits; upgrade to Pro ($25/mo) when approaching 800MB · 设置上传限制；接近800MB时升级 |
| Developer builds features not in spec · 开发者构建规格外的功能 | Medium · 中 | Scope creep, delay · 范围蔓延，延迟 | Use this doc + `admin/dashboard-ui-spec.md` as contract; weekly review · 使用这些文档作为合同；每周审查 |
| Next.js + static site routing conflict in `vercel.json` · vercel.json中的路由冲突 | Low-Medium · 低中 | Dashboard routes 404 or static pages break · 后台路由404或静态页面损坏 | Test routing immediately (Day 1); keep existing routes above new routes · 立即测试路由（第1天）；将现有路由放在新路由上方 |
| Data migration failure during Phase 3B · 第3B阶段数据迁移失败 | Low · 低 | Data loss or corruption · 数据丢失或损坏 | Airtable read-only for 2 weeks post-migration; export backup before migration · 迁移后Airtable只读2周；迁移前导出备份 |
| Phase 2 not completed when Phase 3 begins · 第三阶段开始时第二阶段未完成 | Medium · 中 | Dashboard lacks real data · 后台缺乏真实数据 | Follow prerequisites strictly; do not begin 3A before 2.0.B (B2B) is at least partially populated · 严格遵循前提条件 |
| Founder changes design requirements during build · 创始人在构建过程中更改设计需求 | Low-Medium · 低中 | Rework, delay · 返工，延迟 | Founder signs off on `admin/dashboard-ui-spec.md` before development starts · 创始人在开发开始前签署UI规格 |

---

## Success Criteria for Phase 3A · 第3A阶段成功标准

Phase 3A is complete when:

当以下条件满足时，第3A阶段完成：

1. The route `silora-orient.vercel.app/dashboard/` loads and shows the Founder Overview with real data · 路由加载并显示含真实数据的创始人概览
2. At least 2 team members can log in with their own accounts and see role-appropriate pages · 至少2名团队成员可以用自己的账户登录并看到角色适当的页面
3. A commission can be created, status-updated, and has photos attached — all through the dashboard · 可以通过后台创建定制、更新状态并附加照片
4. A media file can be uploaded, submitted, reviewed, approved, and marked as published · 可以上传、提交、审核、批准并标记为已发布媒体文件
5. The Review Queue correctly shows all pending items across all modules · 审核队列正确显示所有模块的所有待处理项目
6. All 6 module sections load without errors · 所有6个模块区域加载无错误
7. Role-based access is enforced: an editor cannot access the Founder Overview, a B2B manager cannot see CRM · 基于角色的访问已执行
8. The existing public site (`/`, `/about`, `/collections`, etc.) is completely unaffected · 现有公开网站完全不受影响

---

## Connection to Phase 1 and Phase 2 · 与第一、二阶段的连接

The dashboard does not replace what Phase 1 and Phase 2 built. It provides a management layer on top of it.

后台不替换第一和第二阶段构建的内容。它在其上提供管理层。

| Phase 1/2 asset · 第一/二阶段资产 | How Phase 3 uses it · 第三阶段如何使用它 |
|--------------------------------|---------------------------------------|
| `api/subscribe.js` · Mailchimp API | Dashboard reads subscriber count and growth from Mailchimp API; the existing subscribe endpoint is unchanged · 后台从Mailchimp API读取订阅者数量和增长；现有订阅端点不变 |
| Airtable base · Airtable数据库 | Dashboard is the UI layer for Airtable data in Phase 3A; fully replaced by Supabase in Phase 3B · 后台是第3A阶段Airtable数据的UI层；第3B阶段由Supabase完全替换 |
| Zapier Zaps · Zapier自动化 | Zaps continue to run unchanged; they write to Airtable; dashboard reads from Airtable · Zap继续不变运行；它们写入Airtable；后台从Airtable读取 |
| Cal.com booking embed on `custom.html` | Unchanged; dashboard reads Cal.com API for booking data display · 不变；后台读取Cal.com API进行预约数据显示 |
| Stripe payment links · Stripe支付链接 | Unchanged; dashboard reads Stripe API for payment status per commission · 不变；后台读取Stripe API获取每笔定制的支付状态 |
| GA4 tracking on all pages · 所有页面的GA4追踪 | Unchanged; dashboard reads GA4 Data API for the Analytics page · 不变；后台读取GA4 Data API用于分析页面 |
| `content/*.json` files · JSON内容文件 | Phase 3A: dashboard reads and displays; Phase 3C: dashboard writes back · 第3A阶段：后台读取显示；第3C阶段：后台写回 |
| `admin/mailchimp-welcome.md` · 欢迎邮件文档 | Email copy lives in this doc; Phase 3 dashboard does not manage Mailchimp journeys · 邮件文案在此文档中；第三阶段后台不管理Mailchimp旅程 |

---

*Document version: 1.0 · April 2026*  
*See `docs/dashboard-architecture.md` for full technical architecture*  
*See `admin/dashboard-ui-spec.md` for page-by-page UI specifications*  
*See `admin/dashboard-upload-workflow.md` for media upload and review process*
