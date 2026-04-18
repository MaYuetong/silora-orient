# SILORA ORIENT — Phase 1 Launch Note
# SILORA ORIENT — 第一阶段启动说明

**Version · 版本:** 1.0  
**Date · 日期:** April 2026 · 2026年4月  
**Audience · 适用对象:** Founder · Co-founder · Future technical collaborators · 创始人 · 联合创始人 · 未来技术协作者

---

## Phase Objective · 阶段目标

Stop losing real business to the absence of infrastructure. Before any new feature is built, three silent failures that exist right now must be fixed: a newsletter form that stores no subscribers, a website with no analytics, and a commission process with no structured tracking. Everything in this phase is additive and low-risk. Nothing in the current website is removed.

阻止因基础设施缺失而流失真实业务。在构建任何新功能之前，必须修复当前存在的三个静默失败：不存储任何订阅者的订阅表单、没有分析数据的网站，以及没有结构化追踪的定制流程。本阶段所有内容均为追加性质，风险极低。现有网站不做任何删改。

---

## Why This Phase Exists · 此阶段存在的原因

Three specific failures were identified before Phase 1 began:

第一阶段开始前，识别出三个具体失败：

**Failure 1 — The fake newsletter · 失败1——虚假订阅表单**  
The homepage newsletter form showed a "Thank you" message when clicked, but stored no subscriber data anywhere. Every person who had expressed interest in the brand by clicking that button was permanently lost. There was no way to reach them again.

主页订阅表单在点击时显示"谢谢"消息，但没有在任何地方存储订阅者数据。每一个通过点击该按钮表达对品牌兴趣的人都已永久流失。没有办法再次联系他们。

**Failure 2 — No analytics · 失败2——没有分析数据**  
The website had zero traffic tracking. There was no data on how many people visited, where they came from, which pages they read, which content drove inquiries, or which channels were worth investing in. Brand decisions were being made without any evidence.

网站没有任何流量追踪。没有关于访问人数、来源渠道、浏览页面、哪些内容推动询价或哪些渠道值得投入的数据。品牌决策在没有任何证据的情况下做出。

**Failure 3 — Untracked commissions · 失败3——未追踪的定制订单**  
Custom commission inquiries arrived as emails and were managed entirely in the founder's inbox. There was no system tracking which commissions were in progress, what their status was, what had been paid, or what needed follow-up. Orders were at risk of being missed.

定制委托询价以邮件形式到达，完全在创始人收件箱中管理。没有系统追踪哪些定制正在进行、状态如何、已付款金额或需要跟进的内容。订单存在被遗漏的风险。

---

## What Systems and Modules This Phase Supports · 本阶段支持的系统与模块

Phase 1 activates four of the six system modules defined in `docs/architecture.md`:

第一阶段激活`docs/architecture.md`中定义的六个系统模块中的四个：

| Module · 模块 | How Phase 1 activates it · 第一阶段如何激活 |
|-------------|------------------------------------------|
| M-6 Growth & Analytics · 增长与分析 | GA4 installed on all pages; Mailchimp newsletter connected; 3 custom conversion events wired · GA4安装在所有页面；Mailchimp订阅已连接；3个自定义转化事件已接入 |
| M-2 Product Studio · 产品工作室 | Airtable Commissions table with 14-state flow tracks every commission from inquiry to completion · Airtable定制订单表含14状态流转，追踪从询价到完成的每笔定制 |
| M-3 Client CRM · 客户关系管理 | Airtable Customers table with community-first fields (eye color, story notes, relationship stage) · Airtable客户表含社群优先字段（眼睛颜色、故事记录、关系阶段） |
| M-5 Booking & Payment · 预约与支付 | Cal.com consultation booking embedded on `custom.html`; Stripe payment links for deposits and balances · Cal.com咨询预约嵌入定制页面；Stripe支付链接用于定金和尾款 |

Modules not yet active (Phase 3+):  
尚未激活的模块（第三阶段以后）：

- M-1 Brand CMS — journal and content workflow · 品牌内容管理系统
- M-4 B2B & Outreach — begins in Phase 2 · B2B与外联——第二阶段开始

---

## How Phase 1 Connects to Other Phases · 第一阶段与其他阶段的关联

```
Phase 1 (foundation) ──────────────────────────────→ Phase 2 (rhythm)
│                                                       │
├─ GA4 live ─────────────────────────────────────→ Analytics review (week 3+)
│
├─ Mailchimp connected ──────────────────────────→ Welcome automation (1.2.A)
│                                                   Quarterly issue (2.2.B)
│
├─ Airtable base live ───────────────────────────→ B2B database (1.2.B)
│                                                   Story intake (2.1.B)
│
├─ Zapier Zaps active ───────────────────────────→ Auto-sync continues without change
│
├─ Cal.com active ───────────────────────────────→ Workshops page (2.1.A)
│
└─ Stripe links live ────────────────────────────→ First deposits collected; Phase 3 checkout
```

Phase 1 is the prerequisite for everything. Phase 2 tasks are blocked until Phase 1 is activated. Phase 3 (admin dashboard, Supabase migration) assumes all Phase 1 and Phase 2 systems are operating.

第一阶段是一切的前提。第二阶段任务在第一阶段激活之前被阻塞。第三阶段（管理后台、Supabase迁移）假设所有第一阶段和第二阶段系统均在运行。

---

## What Was Done in This Phase · 本阶段完成的内容

### Infrastructure · 基础设施

The Vercel deploy pipeline was broken before Phase 1 implementation began. The root causes were identified and fixed:

第一阶段实施开始前，Vercel部署流水线已损坏。根本原因已被识别并修复：

- `vercel.json` rewritten with explicit `@vercel/node` builder for API functions and `@vercel/static` for all static files — previously a catch-all static builder silently treated serverless functions as static files  
  `vercel.json`重写，为API函数明确指定`@vercel/node`构建器，为所有静态文件指定`@vercel/static`——之前通配静态构建器静默地将无服务器函数视为静态文件
- `api/subscribe.js` converted from ES module syntax (`export default`) to CommonJS (`module.exports`) — Vercel's Node.js runtime defaults to CommonJS  
  `api/subscribe.js`从ES模块语法转换为CommonJS——Vercel的Node.js运行时默认使用CommonJS
- 4 GitHub Secrets added to enable the Actions deploy workflow  
  添加4个GitHub Secrets以启用Actions部署工作流
- Hardcoded Vercel token removed from `CLAUDE.md`  
  从`CLAUDE.md`中删除硬编码的Vercel令牌

### Task P0-A — Google Analytics 4

GA4 script block inserted into the `<head>` of all 9 HTML pages. Three custom conversion events wired directly into the site's JavaScript:

GA4脚本块已插入全部9个HTML页面的`<head>`。三个自定义转化事件直接接入网站的JavaScript：

- `newsletter_signup` — fires on successful Mailchimp subscription  
  订阅成功时触发
- `custom_form_submit` — fires on successful custom order form submission  
  定制订单表单成功提交时触发
- `contact_form_submit` — fires on contact form submission  
  联系表单提交时触发

All pages use the placeholder `G-XXXXXXXXXX`. Founder replaces this with the real GA4 Measurement ID to activate.

所有页面使用占位符`G-XXXXXXXXXX`。创始人将其替换为真实GA4测量ID以激活。

### Task P0-B — Mailchimp Newsletter Integration

The homepage newsletter form was a fake — button color change only, zero subscriber capture. Replaced with:

主页订阅表单是虚假的——仅改变按钮颜色，零订阅者捕获。替换为：

- `api/subscribe.js`: Vercel serverless function (CommonJS). Accepts `POST { email }`. Validates email. Calls Mailchimp `/3.0/lists/{id}/members`. Handles new subscriber (200) and already-subscribed (400 + "Member Exists") gracefully. Tags all subscribers `homepage_signup`.  
  Vercel无服务器函数，接受POST请求，验证邮箱，调用Mailchimp API，优雅处理新订阅者和已订阅情况，为所有订阅者添加`homepage_signup`标签
- `main.js` newsletter handler: async fetch to `/api/subscribe` with loading state, success state (`✓ Thank you · 感谢订阅` in sage green), error/retry state, and GA4 event on success.  
  异步fetch至`/api/subscribe`，含加载状态、成功状态、错误/重试状态，成功时触发GA4事件

### Task P0-C — Airtable Schema

`admin/airtable-schema.md` written — complete bilingual guide for the `SILORA ORIENT — Operations` base. Three tables:

`admin/airtable-schema.md`已撰写——`SILORA ORIENT — Operations`数据库的完整双语指南。三个表格：

- **Customers** (26 fields): includes community-first CRM fields — `eye_color`, `story_notes`, `family_memory_notes`, `brand_relationship_stage` (5-tier: Prospect → Ambassador), `story_consent_given`  
  **客户**（26字段）：含社群优先CRM字段——眼睛颜色、故事记录、家族记忆记录、品牌关系阶段（5级：潜在客户→品牌大使）、故事授权
- **Commissions** (24 fields): 14-state status flow (inquiry → consultation → proposal → approved → deposit → in_production → quality_review → shipped → delivered → followup → story_invited → complete)  
  **定制订单**（24字段）：14状态流转
- **B2B Partners** (27 fields): full outreach pipeline for Phase 2  
  **B2B合作方**（27字段）：第二阶段完整外联管道

### Task P1-A — Zapier Setup

`admin/zapier-setup.md` written — step-by-step guide for two Zaps:

`admin/zapier-setup.md`已撰写——两个Zap的逐步指南：

- Zap 1: Formspree `xlgopzqb` → Airtable Customer (Action 1) + linked Commission record (Action 2)  
  Zap 1：Formspree → Airtable客户（操作1）+ 关联定制订单记录（操作2）
- Zap 2: Formspree contact form → Airtable Customer only (subject filter separates from custom order form)  
  Zap 2：Formspree联系表单 → 仅Airtable客户（主题过滤器与定制订单表单区分）

### Task P1-B — Cal.com Booking

Booking section added to `custom.html` above footer. Features:

预约区域已添加至`custom.html`页脚上方。特性：

- Brand-styled bilingual header and explanatory text  
  品牌风格双语标题和说明文字
- Cal.com inline embed with brand color `#BF9D6A` (gold)  
  含品牌色`#BF9D6A`（金色）的Cal.com内嵌
- `booking_click` GA4 event on widget load  
  插件加载时触发`booking_click` GA4事件
- Guard: `CAL_USERNAME === 'YOUR_CAL_USERNAME'` check — shows branded placeholder until founder sets real username  
  保护：检查用户名是否为占位符，显示品牌占位信息直到创始人设置真实用户名

### Task P1-C — Stripe Payment Links

`admin/stripe-payment-links.md` written — guide for 15 payment links covering:

`admin/stripe-payment-links.md`已撰写——15条支付链接指南，涵盖：

- Commission deposits: $100 / $150 / $200 / $250 / $300 / $400  
  定制定金：6个金额
- Commission balances: $100 / $150 / $200 / $250 / $300 / $400  
  定制尾款：6个金额
- Workshop seats: $65 / $85 / $120  
  工作坊席位：3个金额

Includes email templates for deposit and balance requests, Airtable tracking workflow, refund procedure, and test mode checklist.

包含定金和尾款请求的邮件模板、Airtable追踪工作流、退款程序及测试模式核查清单。

---

## Expected Output · 预期产出

When Phase 1 is fully activated, the following will be true:

第一阶段完全激活后，以下内容将成真：

| Output · 产出 | Before Phase 1 · 第一阶段前 | After Phase 1 · 第一阶段后 |
|-------------|--------------------------|--------------------------|
| Newsletter subscribers captured · 捕获的订阅者 | 0 (fake form) · 0（虚假表单） | Every signup captured in Mailchimp · 每次注册均捕获 |
| Traffic data available · 可用的流量数据 | None · 无 | Full GA4 data on all pages · 所有页面完整GA4数据 |
| Commission tracking · 定制订单追踪 | Email inbox only · 仅邮件收件箱 | Structured Airtable database with status flow · 含状态流转的结构化Airtable数据库 |
| Inquiry auto-sync · 询价自动同步 | Manual copy-paste · 手动复制粘贴 | Zapier auto-creates records within 60s · Zapier 60秒内自动创建记录 |
| Consultation booking · 咨询预约 | Email back-and-forth · 邮件往返 | Online booking calendar on `custom.html` · `custom.html`在线预约日历 |
| Payment collection · 收款 | Informal (Venmo/bank transfer) · 非正式（Venmo/银行转账） | Professional Stripe links with automatic receipts · 含自动收据的专业Stripe链接 |

---

## Completion Criteria · 完成标准

Phase 1 is complete when all six activation steps have been done by the founder and the verification checklist in `docs/phase-1-status.md` passes.

创始人完成所有六个激活步骤且`docs/phase-1-status.md`中的验证核查清单通过时，第一阶段完成。

Specifically:

具体来说：

1. GA4 shows active users in the Realtime report · GA4实时报告显示活跃用户
2. A test email subscription results in a Mailchimp audience entry within 30 seconds · 测试邮箱订阅在30秒内产生Mailchimp受众条目
3. A test custom order submission creates linked Customer + Commission records in Airtable · 测试定制订单提交在Airtable中创建关联的客户+定制订单记录
4. The `custom.html` booking calendar loads and accepts a test booking · `custom.html`预约日历加载并接受测试预约
5. A Stripe test payment completes successfully · Stripe测试支付成功完成

---

## Handoff and Review Notes · 移交与审查说明

**For the founder activating Phase 1 · 对于激活第一阶段的创始人:**

Follow the activation steps in `docs/phase-1-status.md` in priority order. Each step is independent once its prerequisites are met. Estimated total time is 5 hours; this can be split across two sessions.

按优先级顺序遵循`docs/phase-1-status.md`中的激活步骤。每个步骤在满足前提条件后即可独立进行。预计总时间为5小时，可分两次完成。

**For a future technical collaborator reading this · 对于未来阅读此文档的技术协作者:**

The codebase is a static HTML/CSS/JS site with no build step. The only backend is a single Vercel serverless function at `api/subscribe.js`. All configuration is in environment variables — never in files. The Airtable and Zapier systems are external SaaS tools configured by the founder, not managed in code. Do not add code-based configuration for these services.

代码库是没有构建步骤的静态HTML/CSS/JS网站。唯一的后端是`api/subscribe.js`处的单个Vercel无服务器函数。所有配置均在环境变量中——从不在文件中。Airtable和Zapier系统是由创始人配置的外部SaaS工具，不在代码中管理。不要为这些服务添加基于代码的配置。

**Known technical decisions and why · 已知技术决策及其原因:**

- CommonJS (`module.exports`) instead of ES modules in `api/subscribe.js` — Vercel's Node.js runtime defaults to CommonJS without `"type": "module"` in `package.json`. Chosen to avoid adding a `package.json` just for one file.  
  在`api/subscribe.js`中使用CommonJS而非ES模块——Vercel的Node.js运行时默认使用CommonJS。选择此方案以避免仅为一个文件添加`package.json`
- Cal.com guard condition rather than leaving embed inactive — prevents a broken widget from appearing if username is forgotten; shows a branded placeholder instead.  
  Cal.com保护条件而非保持嵌入非活跃——防止在用户名被遗忘时出现损坏的插件；改为显示品牌占位信息
- Formspree retained for commission and contact forms — no reason to replace a working integration; Zapier reads from Formspree submissions directly.  
  Formspree保留用于定制和联系表单——没有理由替换正常工作的集成；Zapier直接从Formspree提交中读取

---

*Document version: 1.0 · April 2026*  
*See `docs/phase-1-status.md` for current task status and activation checklists*  
*See `docs/phase-2-launch.md` for Phase 2 rationale*
