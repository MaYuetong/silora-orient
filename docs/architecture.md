# SILORA ORIENT — Backend System Architecture
# SILORA ORIENT — 后端系统架构文档

**Version 文档版本:** 2.0  
**Date 日期:** April 2026 · 2026年4月  
**Status 状态:** Internal — Architecture Definition · 内部文档 — 架构定义  
**Audience 阅读对象:** Founders · Co-founder · Future technical collaborators  
**阅读对象:** 创始人 · 联合创始人 · 未来技术协作者  
**Changelog 变更:** v2.0 — Module names aligned with admin UI; CRM reframed as community-first; unified backend migration path added; workflow states expanded per module

---

> This document defines the six backend modules of the SILORA ORIENT operating system: their responsibilities, data ownership, workflow states, internal permissions, and data flows. It also defines the long-term migration path from SaaS tools to a unified backend.
>
> The public website (`silora-orient.vercel.app`) is not part of this document. It remains unchanged. All new development described here is internal-only — the admin system, data layer, and operational workflows behind the public face of the brand.
>
> 本文档定义了 SILORA ORIENT 运营系统的六个后端模块：职责范围、数据归属、工作流状态、内部权限与模块间数据流，以及从SaaS工具向统一后端的长期迁移路径。
>
> 公开网站（`silora-orient.vercel.app`）不在本文档范围内，保持不变。本文档描述的所有新开发均为纯内部系统——管理后台、数据层及品牌公开形象背后的运营工作流。

---

## Table of Contents · 目录

1. [Foundational Principles · 基础原则](#1-foundational-principles)
2. [System Overview · 系统总览](#2-system-overview)
3. [Module 1 — Brand CMS · 品牌内容管理](#3-module-1--brand-cms)
4. [Module 2 — Product Studio · 产品工作室](#4-module-2--product-studio)
5. [Module 3 — Client CRM · 客户关系管理](#5-module-3--client-crm)
6. [Module 4 — B2B Pipeline · B2B拓展管道](#6-module-4--b2b-pipeline)
7. [Module 5 — Community Hub · 社群中心](#7-module-5--community-hub)
8. [Module 6 — Analytics & Ops · 分析与运营](#8-module-6--analytics--ops)
9. [Cross-Module Data Relationships · 跨模块数据关系](#9-cross-module-data-relationships)
10. [Role and Permission Summary · 角色与权限汇总](#10-role-and-permission-summary)
11. [Unified Backend Migration Path · 统一后端迁移路径](#11-unified-backend-migration-path)

---

## 1. Foundational Principles
## 一、基础原则

These principles govern every architecture decision in this document. When there is ambiguity, return to these.

以下原则约束本文档中的所有架构决策。遇到歧义时，回归这些原则。

### The public website is frozen from this system's perspective.
### 从本系统视角看，公开网站是不变的。

The static HTML/CSS/JS site at `silora-orient.vercel.app` is the brand's public face. It was built carefully. It works. Nothing in this document touches it. The admin system reads from and writes to data stores; the website reads the outputs of those data stores (JSON files in Phase 1–2, a live API in Phase 3+). The website's visual direction, typography, bilingual structure, and editorial tone are not negotiable.

`silora-orient.vercel.app` 的静态网站是品牌的公开形象。它经过精心构建，运行正常。本文档不涉及任何对它的修改。管理系统读写数据存储；网站读取这些数据存储的输出（第一至二阶段为JSON文件，第三阶段起为实时API）。网站的视觉方向、字体排印、双语结构与编辑基调不可改变。

### Customers are community members, not transactions.
### 客户是社群成员，不是交易记录。

This is the most important principle for the CRM module. Every person who commissions a piece, attends a workshop, or subscribes to the newsletter is entering a relationship with the brand — not completing a purchase. The data model must reflect this. A customer record is a portrait: her story, her memories, the symbolic meaning she wanted the piece to carry, the workshop she attended, the quarterly issues she read. The CRM is a community archive, not a sales log.

这是CRM模块最重要的原则。每一位定制珠宝、参加工作坊或订阅邮件的人，都在与品牌建立关系——而非完成一笔购买。数据模型必须反映这一点。客户记录是一幅肖像：她的故事、她的记忆、她希望作品承载的象征意义、她参加的工作坊、她阅读的季刊。CRM是社群档案，不是销售日志。

### Build modular. Migrate incrementally.
### 模块化构建，增量迁移。

Phase 1 uses SaaS tools (Airtable, Notion, Mailchimp, Cal.com, Stripe, GA4). Each module is independently functional. If one tool is replaced, the others do not break. Data structures are defined today in a way that transfers cleanly to a unified backend when volume justifies the investment. No single point of failure. No premature complexity.

第一阶段使用SaaS工具。每个模块独立运作。替换一个工具不影响其他模块。数据结构的定义方式使其能够在体量增长时完整迁移至统一后端。无单点故障，无过早的复杂性。

### Every workflow has a status. Every status has an owner.
### 每个工作流有状态，每个状态有负责人。

Nothing in the system should exist in an ambiguous state. Every commission, content item, B2B lead, booking, and subscriber has a clearly defined status. Every status transition is triggered by a specific action from a specific role. This is what makes a small team operationally coherent without constant check-ins.

系统中不应存在模糊状态的事项。每笔订单、内容、B2B线索、预约和订阅者都有明确定义的状态。每次状态转变由特定角色的特定操作触发。这使小团队无需频繁同步就能保持运营一致性。

---

## 2. System Overview
## 二、系统总览

### 2.1 The Two-Layer System · 双层系统

```
╔══════════════════════════════════════════════════════════════════╗
║           PUBLIC WEBSITE · 公开网站 (UNCHANGED · 不变)           ║
║                                                                  ║
║   index.html · about.html · collections.html · custom.html       ║
║   stories.html · journal.html · documentary.html · contact.html  ║
║                                                                  ║
║   Static HTML/CSS/JS · Vercel · Bilingual · Unchanged            ║
╚══════════════════════════════════════════════════════════════════╝
                          ↑ reads JSON / API outputs
╔══════════════════════════════════════════════════════════════════╗
║         INTERNAL SYSTEM · 内部系统 (ALL NEW DEVELOPMENT · 新开发) ║
║                                                                  ║
║  ┌──────────┐ ┌───────────┐ ┌──────────┐ ┌──────────┐          ║
║  │ Brand CMS│ │  Product  │ │  Client  │ │   B2B    │          ║
║  │ 品牌内容 │ │  Studio   │ │   CRM    │ │ Pipeline │          ║
║  │  管理   │ │  产品工作室│ │ 客户管理 │ │ B2B管道  │          ║
║  └──────────┘ └───────────┘ └──────────┘ └──────────┘          ║
║  ┌──────────┐ ┌────────────────────────────────────────┐        ║
║  │Community │ │         Analytics & Ops                │        ║
║  │   Hub    │ │           分析与运营                    │        ║
║  │  社群中心│ └────────────────────────────────────────┘        ║
║  └──────────┘                                                    ║
╚══════════════════════════════════════════════════════════════════╝
```

### 2.2 The Six Modules · 六个模块

| # | Module · 模块 | Business Domain · 业务域 | Phase 1–2 Tool · 第一至二阶段工具 |
|---|--------------|--------------------------|----------------------------------|
| **M-1** | **Brand CMS** · 品牌内容管理 | Editorial content, publishing workflow, bilingual copy · 内容编辑、发布工作流、双语文本 | Notion + JSON files |
| **M-2** | **Product Studio** · 产品工作室 | Collections, commissions, production, delivery · 系列作品、定制订单、生产、交付 | Airtable |
| **M-3** | **Client CRM** · 客户关系管理 | Community members, stories, relationships, consent · 社群成员、故事、关系、授权 | Airtable |
| **M-4** | **B2B Pipeline** · B2B拓展管道 | Partners, outreach, proposals, deals · 合作方、外联、提案、成交 | Airtable |
| **M-5** | **Community Hub** · 社群中心 | Workshops, courses, events, bookings, payments · 工作坊、课程、活动、预约、支付 | Cal.com + Stripe |
| **M-6** | **Analytics & Ops** · 分析与运营 | Newsletter, subscribers, traffic, conversions · 邮件订阅、订阅者、流量、转化 | Mailchimp + GA4 |

### 2.3 Role Definitions · 角色定义

| Role · 角色 | Core Responsibility · 核心职责 |
|------------|-------------------------------|
| **Founder** · 创始人 | Final approval authority. Brand direction. Publishing. Business oversight. |
| **Co-founder / Artisan** · 联合创始人/匠人 | Production. New work. Process documentation. Commission execution. |
| **Editor** · 编辑 | Journal and story drafting, copy editing, editorial review. |
| **Community Manager** · 社群管理员 | Workshops, events, subscriber management, newsletter. |
| **B2B Manager** · B2B负责人 | Partner discovery, outreach tracking, proposals, deal management. |

---

## 3. Module 1 — Brand CMS
## 三、模块一 — 品牌内容管理

### Responsibility · 职责

Brand CMS owns all editorial content that the world reads, sees, and experiences. It governs the full publishing lifecycle — from an idea in draft to a piece of writing on the public website — and maintains the bilingual integrity of every word published under the SILORA ORIENT name.

品牌内容管理负责所有外界阅读、观看与感知的编辑内容。它管理从草稿想法到公开网站文章的完整发布生命周期，并维护每一篇以 SILORA ORIENT 之名发布的文字的双语完整性。

Brand CMS does not own customer data — that belongs to Client CRM. It does not own product specifications — that belongs to Product Studio. It owns the narrative: how the brand tells its story, season by season, issue by issue.

品牌内容管理不拥有客户数据（归客户关系管理模块），不拥有产品规格（归产品工作室模块）。它拥有叙事：品牌如何一季一季、一期一期地讲述自己的故事。

### Content Types and Storage · 内容类型与存储

| Content Type · 内容类型 | Public Page · 公开页面 | Managed In · 管理位置 | Update Path · 更新路径 |
|------------------------|----------------------|----------------------|----------------------|
| Journal articles · 日记文章 | `journal.html` | Notion (draft) → HTML | Notion → HTML edit → git push |
| Customer stories · 客户故事 | `stories.html` | Airtable intake + Notion draft | Form → draft → JSON → git push |
| Collection narratives · 系列叙事 | `collections.html`, `other-collections.html` | `content/collections-data.json` | JSON edit → git push |
| Documentary descriptions · 纪录片描述 | `documentary.html` | `content/documentary-content.json` | JSON edit → git push |
| Bilingual UI copy · 双语界面文案 | All pages · 全页面 | `content/translations.json` | JSON edit → git push |
| Announcements · 公告 | Homepage banner · 首页横幅 | `content/translations.json` | JSON edit → git push |
| Workshop / event pages · 工作坊/活动页面 | *(not yet public)* | Notion draft → new HTML page | HTML creation → git push |

### Content Status Workflow · 内容状态工作流

All content types share one status flow. Every transition has a defined actor.

所有内容类型共用一套状态流程，每次状态转变均有明确的操作角色。

```
draft ──────────► internal_review ──────────► revision_requested
草稿                  内部审核中                    请求修改
  ▲                                                    │
  └────────────────────────────────────────────────────┘
                          │
                          ▼ (if approved · 若通过)
                       approved ──────────► scheduled ──────────► published ──────────► archived
                        已审批               已排期                 已发布                 已归档
```

| Status · 状态 | Triggered By · 触发角色 | Entry Condition · 进入条件 | Exit Condition · 离开条件 |
|--------------|------------------------|--------------------------|--------------------------|
| `draft` | Creator · 创作者 | New content item created · 新内容创建 | Creator submits for review · 创作者提交审核 |
| `internal_review` | Creator · 创作者 | Creator marks ready · 创作者标记就绪 | Reviewer makes decision · 审核者做出决定 |
| `revision_requested` | Reviewer · 审核者 | Review finds issues · 审核发现问题 | Creator resubmits · 创作者重新提交 |
| `approved` | Founder / Editor · 创始人/编辑 | Review passes · 审核通过 | Founder schedules or publishes · 创始人排期或发布 |
| `scheduled` | Founder · 创始人 | Approved + future date set · 已审批+设定未来日期 | Scheduled datetime reached · 排期时间到达 |
| `published` | System / Founder · 系统/创始人 | Approved + publish triggered · 已审批+触发发布 | Founder archives · 创始人归档 |
| `archived` | Founder · 创始人 | Content retired from display · 内容从展示中撤下 | Founder restores · 创始人恢复 |

### Customer Story Sub-Workflow · 客户故事子工作流

Customer stories require an additional consent gate before publication. This gate is non-negotiable.

客户故事在发布前需要额外的授权门控，此步骤不可省略。

```
Story drafted (from post-commission conversation · 定制完成后对话)
  ↓
internal_review (Founder checks accuracy + tone · 创始人检查准确性与语气)
  ↓
consent_pending (Team contacts customer for permission · 团队联系客户获取许可)
  ↓
consent_granted ──────────────────────────────► consent_declined
  ↓                                                   ↓
approved                                        story stays private
  ↓                                             故事保持私密
published to stories.html
```

**Consent record fields · 授权记录字段:** `consent_given` (boolean) · `consent_date` · `consent_method` (written / verbal_logged / form) · `consent_notes`

### Journal / Quarterly Issue Pipeline · 季刊编辑流程

```
Week -6  Planning · 规划
  → Theme, article list, author assignments
  → Notion: one dedicated page per article with brief

Week -4  Draft submission · 草稿提交
  → Writers submit in Notion
  → Status per article: draft → internal_review

Week -3  Editorial review · 编辑审核
  → Editor reviews, leaves inline comments
  → Status: revision_requested → approved (per article)

Week -2  Final edit + bilingual check · 终稿与双语校对
  → EN and ZH versions aligned
  → Images sourced and credited

Week -1  Layout preview · 版面预览
  → HTML updated, internal preview link shared

Day -5   Final approval · 最终审批
  → Founder sign-off → Status: approved → scheduled

Day -4   Email campaign prepared · 邮件活动准备
  → Mailchimp campaign drafted, test send internal

Day 0    Publication · 发布
  → HTML git push → Vercel deploy
  → Mailchimp campaign sends to all active subscribers
  → Status: published

Week +1  Analytics review · 数据复盘
  → Open rate, click rate, new subscriber count logged to issue record
  → Status: archived (content stays live; editorial workflow complete)
```

### Universal Content Fields · 通用内容字段

| Field · 字段 | Bilingual · 双语 | Required · 必填 | Notes · 说明 |
|-------------|:---------------:|:--------------:|-------------|
| Title · 标题 | EN + ZH | ✓ | |
| Subtitle · 副标题 | EN + ZH | — | |
| Short description · 简短描述 | EN + ZH | ✓ | Max 160 chars · 最多160字符 |
| Full body · 正文 | EN + ZH | ✓ | Rich text · 富文本 |
| Author · 作者 | — | ✓ | |
| Reviewer · 审核者 | — | ✓ | |
| Category · 分类 | EN | ✓ | |
| Tags · 标签 | EN + ZH | — | |
| Hero image · 主图 | — | Recommended · 建议 | |
| Image credit · 图片归属 | — | If applicable · 如适用 | |
| Publish date · 发布日期 | — | On publish · 发布时 | |
| SEO title · SEO标题 | EN | Recommended · 建议 | |
| SEO meta description · SEO描述 | EN | Recommended · 建议 | Max 160 chars |
| OG social image · 社交分享图 | — | Recommended · 建议 | |
| Status · 状态 | — | ✓ | From status flow above |
| Version notes · 版本备注 | — | — | Brief revision history |

### Permissions · 权限

| Action · 操作 | Founder | Co-founder | Editor | Community Mgr | B2B Mgr |
|--------------|:-------:|:----------:|:------:|:-------------:|:-------:|
| Create draft · 创建草稿 | ✓ | ✓ (products, process) | ✓ (journal, stories) | ✓ (workshops) | — |
| Edit own draft · 编辑自己的草稿 | ✓ | ✓ | ✓ | ✓ | — |
| Submit for review · 提交审核 | ✓ | ✓ | ✓ | ✓ | — |
| Review and comment · 审核与评论 | ✓ | — | ✓ (journal only) | — | — |
| Approve · 审批 | ✓ | — | — | — | — |
| Publish / schedule · 发布/排期 | ✓ | — | — | — | — |
| Archive · 归档 | ✓ | — | — | — | — |
| Record customer consent · 记录客户授权 | ✓ | ✓ | — | — | — |
| Read all content · 读取所有内容 | ✓ | ✓ | ✓ | ✓ (workshops only) | ✓ |

### Data Flows · 数据流

```
Co-founder uploads new product photos + drafts description
→ M-1 Product content draft created → status: draft
→ Founder notified → reviews → approves
→ M-2 Product record updated → published to collections JSON → git push

Customer story conversation completed (post-commission · 定制后)
→ Team member drafts story in Notion
→ M-1 story status: draft → internal_review → founder approves
→ Consent obtained → M-3 Customer record: consent_given = true
→ M-1 story status: approved → published
→ customer-stories.json updated → git push → stories.html live

Journal issue published
→ M-6: Mailchimp campaign triggered to all active subscribers
→ M-6 Campaign record: open_rate, click_rate logged post-send
```

---

## 4. Module 2 — Product Studio
## 四、模块二 — 产品工作室

### Responsibility · 职责

Product Studio owns the full lifecycle of every piece the brand makes — from first inquiry through production, quality review, delivery, and post-sale follow-up. It is the operational core of the brand's primary revenue stream, and the workspace where the co-founder and artisan do the majority of their logged work.

产品工作室负责品牌每件作品的完整生命周期——从首次询价到生产、质检、交付与售后跟进。它是品牌核心收入流的运营中枢，也是联合创始人和匠人记录大部分工作的工作空间。

Product Studio covers two distinct entities: **Commissions** (custom orders, one of a kind) and **Products** (collection pieces, made to a defined design).

产品工作室涵盖两个独立实体：**定制订单**（定制订单，独一无二）和**产品**（系列成品，按既定设计制作）。

### Commission Record · 定制订单档案

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | Autonumber | |
| `customer_id` | FK → M-3 Client CRM | |
| `inquiry_date` | Date | |
| `inquiry_source` | Enum | `website_form` · `email` · `event` · `referral` · `social` |
| `flower_type` | Text | e.g. Orchid, Wisteria, Custom |
| `flower_type_zh` | Text | |
| `colors` | Multi-select | Primary palette |
| `materials` | Multi-select | Silk · gold wire · pearl · enamel · other |
| `symbolism_notes` | Long text | What the piece is meant to carry · 作品承载的含义 |
| `design_reference_urls` | Text | Inspiration image links |
| `quote_amount` | Currency | USD |
| `deposit_amount` | Currency | |
| `balance_due` | Currency | |
| `currency` | Enum | `USD` · `CNY` · `GBP` |
| `status` | Enum | See status flow below |
| `production_notes` | Long text | Maker's log during production |
| `revision_log` | Long text | Record of any design changes requested |
| `shipping_carrier` | Text | |
| `tracking_number` | Text | |
| `shipped_date` | Date | |
| `delivered_date` | Date | |
| `followup_sent` | Boolean | Post-delivery follow-up sent |
| `story_invited` | Boolean | Customer invited to share story for M-1 CMS |
| `created_at` · `updated_at` | Datetime | |

### Commission Status Flow · 定制订单状态流

Each status has a defined responsible role. No status can be skipped without an explicit override by the Founder.

每个状态都有明确的负责角色。未经创始人明确授权，不得跳过任何状态。

```
inquiry
  │  Actor: system (auto on form submit) · 系统自动
  ▼
consultation_scheduled
  │  Actor: Founder or Co-founder · 创始人或联合创始人
  ▼
consultation_complete
  │  Actor: Founder or Co-founder (after meeting) · 咨询完成后
  ▼
proposal_sent
  │  Actor: Founder · 创始人
  ▼
approved
  │  Actor: Founder (on customer confirmation) · 客户确认后
  ▼
deposit_paid
  │  Actor: System (Stripe webhook) · 系统（Stripe回调）
  ▼
in_production
  │  Actor: Co-founder / Artisan · 联合创始人/匠人
  ▼
quality_review
  │  Actor: Founder · 创始人
  ▼
shipped
  │  Actor: Co-founder / Artisan · 联合创始人/匠人
  ▼
delivered
  │  Actor: System (auto after shipped + N days) or manual
  ▼
followup_sent
  │  Actor: Founder (2 weeks after delivery · 交付后2周)
  ▼
story_invited
  │  Actor: Founder (if story potential identified · 若发现故事潜力)
  ▼
complete
```

*Side branches available at any point · 任意阶段可转为:*  
`on_hold` (customer request or production issue) · `revision_requested` (design change) · `cancelled`

### Commission Payment States · 定制订单支付状态

| Status · 状态 | Meaning · 含义 | Triggered By · 触发方式 |
|--------------|---------------|------------------------|
| `unpaid` | No payment received · 尚未收到付款 | Default on creation |
| `deposit_pending` | Stripe deposit invoice sent · 已发送定金发票 | Founder sends Stripe link |
| `deposit_paid` | 50% deposit confirmed · 50%定金已确认 | Stripe webhook |
| `balance_pending` | Balance invoice sent · 已发送尾款发票 | Founder sends Stripe link |
| `paid_in_full` | Full amount received · 全额已到账 | Stripe webhook |
| `refunded` | Full or partial refund issued · 已全额或部分退款 | Founder via Stripe |
| `waived` | Payment waived by Founder · 创始人免除付款 | Founder manual |

### Product Record · 产品档案（系列成品）

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `collection_id` | FK → M-1 Brand CMS (collection content) | |
| `name` · `name_zh` | Text | Bilingual · 双语 |
| `description` · `description_zh` | Long text | Bilingual · 双语 |
| `flower_type` | Text | |
| `materials` | Multi-select | |
| `palette` | Text | Color narrative description |
| `price_usd` | Currency | |
| `stock_status` | Enum | `available` · `made_to_order` · `sold_out` · `archived` |
| `images` | Attachments | |
| `content_status` | Enum | `draft` · `review` · `approved` · `published` · `archived` |
| `published_at` | Date | |

### Permissions · 权限

| Action · 操作 | Founder | Co-founder | Editor | Community Mgr | B2B Mgr |
|--------------|:-------:|:----------:|:------:|:-------------:|:-------:|
| Create commission · 创建定制订单 | ✓ | ✓ | — | — | — |
| Edit commission details · 编辑订单详情 | ✓ | ✓ | — | — | — |
| Update production status · 更新生产状态 | ✓ | ✓ | — | — | — |
| Update financial fields · 更新财务字段 | ✓ | — | — | — | — |
| Approve / ship commission · 审批/发货 | ✓ | ✓ (ship only) | — | — | — |
| Create / edit product · 创建/编辑产品 | ✓ | ✓ | — | — | — |
| Publish product · 发布产品 | ✓ | — | — | — | — |
| View all commissions · 查看所有订单 | ✓ | ✓ | — | — | — |
| View product catalogue · 查看产品目录 | ✓ | ✓ | ✓ | ✓ | ✓ |

### Data Flows · 数据流

```
Custom form submitted (custom.html)
→ Formspree → Zapier → M-3 Customer record created (or matched)
→ M-2 Commission record created, linked to customer
→ Status: inquiry

Founder approves proposal
→ Stripe deposit invoice sent (M-5 Payment record created)
→ Stripe webhook confirms payment
→ M-2 status: deposit_paid → in_production

Commission delivered
→ M-2 status: delivered
→ M-3 Customer record: next_followup_date = today + 14 days
→ M-2 flags: story_invited = false (pending decision)
→ If story decided: M-1 Brand CMS story draft initiated
```

---

## 5. Module 3 — Client CRM
## 五、模块三 — 客户关系管理

### Philosophy · 设计哲学

This module is the most important to get right philosophically. SILORA ORIENT is not a retail business. Every customer who commissions a piece, attends a workshop, or stays in the newsletter list is a member of a community built around craft, story, and cultural memory.

这个模块在理念上最为重要。SILORA ORIENT 不是零售商业。每一位定制珠宝、参加工作坊或订阅邮件的人，都是围绕手工艺、故事与文化记忆建立的社群的成员。

A customer profile in this CRM is not a transaction log. It is a living portrait of a person and their relationship with the brand. It should contain:
- The story she told us in the consultation
- The color of her eyes
- The memory she wanted the piece to carry
- The workshops she has attended
- The quarterly issues she has received
- The story we published about her (if she consented)
- The follow-up notes from our last conversation

客户关系管理中的客户档案不是交易日志。它是一个人与品牌关系的活态肖像。它应该包含：她在咨询中告诉我们的故事、她眼睛的颜色、她希望作品承载的记忆、她参加过的工作坊、她收到的季刊、我们发布的关于她的故事（如她已授权）、以及我们上次对话的跟进笔记。

This is the data architecture of a cultural community, not a customer database.

这是文化社群的数据架构，不是客户数据库。

### Customer Record · 客户档案

**Identity · 身份信息**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `name` | Text | Preferred name · 常用名 |
| `email` | Text | Primary contact · 主要联系方式 |
| `phone` | Text | Optional · 选填 |
| `location` | Text | City, country · 城市、国家 |
| `language_preference` | Enum | `en` · `zh` · `both` |
| `customer_type` | Enum | `b2c` · `b2b` · `community` (workshop-only, no commission) |
| `source` | Enum | `website_form` · `referral` · `event` · `social` · `walk_in` · `b2b` |
| `first_contact_date` | Date | |
| `last_contact_date` | Date | Auto-updated on any interaction |
| `created_at` · `updated_at` | Datetime | |

**Story and Brand Relationship · 故事与品牌关系**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `eye_color` | Text | Relevant to Eye Color Collection · 与眼色系列相关 |
| `eye_color_zh` | Text | Chinese description of eye color · 眼色的中文描述 |
| `color_preferences` | Long text | Free-form palette notes · 自由记录的色彩偏好笔记 |
| `flower_preferences` | Text | Which flowers resonate · 与她产生共鸣的花型 |
| `story_notes` | Long text | Personal narrative from consultation · 咨询后记录的个人叙事 |
| `family_memory_notes` | Long text | Symbolic references, ancestry, places · 象征性细节、家族渊源、地点 |
| `cultural_context` | Long text | Background context relevant to design · 与设计相关的文化背景 |
| `brand_relationship_stage` | Enum | `prospect` · `first_commission` · `repeat_customer` · `community_member` · `ambassador` |

**Consent and Communication · 授权与通讯**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `consent_given` | Boolean | For data storage and communications · 数据存储与通讯授权 |
| `consent_date` | Date | |
| `consent_method` | Enum | `written` · `verbal_logged` · `form_checkbox` |
| `consent_notes` | Text | Context around consent conversation · 授权对话背景记录 |
| `newsletter_status` | Enum | `subscribed` · `unsubscribed` · `not_subscribed` |
| `communication_preference` | Enum | `email` · `wechat` · `in_person` · `any` |
| `story_consent_given` | Boolean | Separate consent for publishing customer story · 独立的故事发布授权 |
| `story_consent_date` | Date | |

**Community Participation · 社群参与**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `workshops_attended` | Linked records → M-5 | All workshops this person has attended |
| `courses_enrolled` | Linked records → M-5 | |
| `events_participated` | Linked records → M-5 | |
| `quarterly_issues_received` | Count (from M-6) | Number of issues delivered |
| `last_open_date` | Date | From Mailchimp · 来自Mailchimp |

**Follow-Up System · 跟进系统**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `next_followup_date` | Date | Set manually or by workflow trigger · 手动设置或工作流触发 |
| `followup_type` | Enum | `check_in` · `story_invitation` · `workshop_invitation` · `new_collection_notice` · `general` |
| `followup_notes` | Long text | Notes from last interaction · 最近一次互动记录 |
| `interaction_log` | Long text (append-only) | Chronological record of all touchpoints · 所有接触点的时间顺序记录 |

**Linked Records · 关联记录**

```
Customer
  ├── → M-2 Commissions[]      All custom orders for this customer
  ├── → M-1 CustomerStory?     Published or draft story (if exists)
  ├── → M-5 Bookings[]         All workshop and consultation bookings
  ├── → M-5 Payments[]         All payment records
  └── → M-6 Subscriber?        Newsletter subscription record
```

### Customer Journey Map · 客户旅程地图

```
PROSPECT · 潜在客户
  First contact: inquiry form, event, social, referral
  → M-3 record created, source logged
  → M-2 Commission: inquiry status

  ↓

FIRST COMMISSION · 首次定制
  Consultation → Proposal → Deposit → Production → Delivery
  → M-2 status flows through production stages
  → M-3: story_notes, color_preferences populated post-consultation
  → M-3: next_followup_date set to delivery + 14 days

  ↓

COMMUNITY MEMBER · 社群成员
  Post-delivery follow-up → Story invitation
  → Newsletter subscription
  → Workshop invitation
  → M-1: customer story drafted, consented, published (if applicable)
  → M-5: workshop booking

  ↓

REPEAT CUSTOMER · 回头客
  Second commission inquiry
  → M-3 brand_relationship_stage: repeat_customer
  → Historical context available for design conversation

  ↓

AMBASSADOR · 品牌大使
  Active referrals, featured story published, workshop participant
  → M-3 brand_relationship_stage: ambassador
  → Special handling in follow-up queue
```

### Customer Workflow States · 客户工作流状态

| State · 状态 | Meaning · 含义 | Typical Next Action · 典型下一步 |
|-------------|---------------|--------------------------------|
| `new_inquiry` | Form submitted, not yet contacted · 表单已提交，尚未联系 | Schedule consultation within 24h |
| `consultation_scheduled` | Meeting on calendar · 会议已安排 | Prepare design reference |
| `active_commission` | In production or pre-production · 生产中或准备阶段 | Track in M-2 |
| `awaiting_followup` | Delivered, follow-up date approaching · 已交付，跟进日期临近 | Personal check-in |
| `story_pending` | Follow-up done, story invitation sent · 已跟进，已发送故事邀请 | Await response |
| `community_member` | Active subscriber, workshop participant · 活跃订阅者、工作坊参与者 | Include in events and issues |
| `dormant` | No interaction in 6+ months · 6个月以上无互动 | Re-engagement email |
| `closed` | Unsubscribed, withdrew consent · 已退订，已撤回授权 | No further contact, data retained per policy |

### Permissions · 权限

| Action · 操作 | Founder | Co-founder | Editor | Community Mgr | B2B Mgr |
|--------------|:-------:|:----------:|:------:|:-------------:|:-------:|
| Create customer record · 创建客户档案 | ✓ | ✓ | — | ✓ (community type) | ✓ (B2B type) |
| View full profile · 查看完整档案 | ✓ | ✓ | — | — | — |
| View B2B profiles only · 仅查看B2B档案 | ✓ | — | — | — | ✓ |
| Edit story notes · 编辑故事笔记 | ✓ | ✓ | — | — | — |
| Edit newsletter / subscription · 编辑订阅信息 | ✓ | — | — | ✓ | — |
| Log interaction · 记录互动 | ✓ | ✓ | — | ✓ (community events) | ✓ (B2B contacts) |
| Record consent · 记录授权 | ✓ | ✓ | — | — | — |
| Set follow-up date · 设置跟进日期 | ✓ | ✓ | — | ✓ | ✓ |
| Delete record · 删除记录 | ✓ | — | — | — | — |
| Export data · 导出数据 | ✓ | — | — | — | — |

### Data Flows · 数据流

```
Custom form submitted
→ Zapier: new M-3 Customer record created
→ M-2: Commission linked to customer
→ M-3 status: new_inquiry

Post-consultation
→ Team updates M-3: story_notes, color_preferences, eye_color
→ M-3 status: active_commission

Commission delivered (M-2: status = delivered)
→ M-3: next_followup_date = today + 14 days, followup_type = check_in

Follow-up completed with story interest
→ M-3: followup_notes updated, story_invited = true (in M-2)
→ M-3 status: story_pending

Consent obtained
→ M-3: story_consent_given = true, story_consent_date = today
→ M-1: Customer story draft initiated

Workshop attended (M-5: booking status = attended)
→ M-3: workshops_attended record linked
→ M-3 brand_relationship_stage updated if appropriate
→ M-6: subscriber added to workshop_alumni segment

Customer subscribes to newsletter
→ M-6: Subscriber record created
→ M-3: newsletter_status = subscribed
```

---

## 6. Module 4 — B2B Pipeline
## 六、模块四 — B2B拓展管道

### Responsibility · 职责

B2B Pipeline manages the brand's relationships with commercial partners: boutiques, galleries, concept stores, cultural institutions, stylists, agents, and artisan organizations. It owns the full outreach-to-deal lifecycle and the proposal system.

B2B拓展管道管理品牌与商业合作方的关系：精品店、画廊、概念店、文化机构、造型师、代理商及手工艺组织。负责从外联到成交的完整生命周期及提案系统。

The B2B Pipeline is kept strictly separate from the Client CRM. B2B contacts are business relationships, not community members. Their data structure reflects this distinction.

B2B拓展管道与客户关系管理模块严格分离。B2B联系人是商业关系，不是社群成员。其数据结构体现这一区别。

### B2B Partner Record · B2B合作方档案

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `business_name` | Text | |
| `website` | URL | |
| `email` | Text | |
| `phone` | Text | |
| `address` · `city` · `country` | Text | |
| `category` | Enum | See categories below · 见下方分类 |
| `contact_person` | Text | |
| `contact_title` | Text | |
| `discovery_source` | Enum | `google` · `instagram` · `referral` · `event` · `walk_in` · `press` |
| `discovery_date` | Date | |
| `aesthetic_fit` | Enum | `strong` · `moderate` · `weak` · `unknown` |
| `interest_level` | Enum | `low` · `medium` · `high` · `unknown` |
| `notes` | Long text | Fit assessment, tone, context |
| `status` | Enum | See status flow below |
| `outreach_date` | Date | First outreach |
| `last_followup_date` | Date | |
| `next_action_date` | Date | With reminder |
| `reply_received` | Boolean | |
| `reply_date` · `reply_summary` | Date · Text | |
| `proposal_sent` · `proposal_version` · `proposal_sent_date` | Bool · Text · Date | |
| `sample_sent` · `sample_sent_date` · `sample_items` | Bool · Date · Text | |
| `deal_type` | Enum | `wholesale` · `consignment` · `placement` · `collab` · `gift_program` |
| `deal_status` | Enum | `none` · `negotiating` · `closed` · `declined` · `paused` |
| `created_at` · `updated_at` | Datetime | |

### Partner Categories · 合作方分类

| Category · 分类 | Target Partners · 目标合作方 | Typical Approach · 典型合作方式 |
|----------------|-----------------------------|---------------------------------|
| `boutique` | Handmade / artisan jewelry stores · 手工珠宝精品店 | Wholesale / consignment · 批发/寄售 |
| `concept_store` | Multibrand lifestyle stores · 多品牌生活方式店 | Wholesale / placement · 批发/陈列 |
| `gallery` | Art and craft galleries · 艺术与手工艺画廊 | Exhibition / pop-up · 展览/快闪 |
| `cultural_institution` | Museums, cultural centers · 博物馆、文化中心 | Program / merchandise · 项目/商品 |
| `stylist` | Editorial / celebrity stylists · 编辑/明星造型师 | Loan / gifting · 借用/赠送 |
| `artisan_org` | Craft councils, heritage bodies · 手工艺协会、文化遗产机构 | Collaboration · 合作 |
| `hospitality` | Hotels, spas, premium venues · 酒店、水疗、高端场馆 | Gifting / amenity · 礼品/设施 |
| `agent_reseller` | Market representatives · 市场代表 | Licensing / wholesale · 授权/批发 |

### Partner Status Flow · 合作方状态流

```
discovered
  │  Actor: B2B Manager or Founder (research) · B2B负责人或创始人（调研）
  ▼
outreach_pending
  │  Actor: B2B Manager (queued for contact) · B2B负责人（已排队联系）
  ▼
outreached
  │  Actor: B2B Manager (email or in-person) · B2B负责人（邮件或当面）
  │  Auto-flag after 14 days with no reply → no_reply
  ▼                                          ▼
replied                                   no_reply
  │  Actor: B2B Manager (logs reply)        │ Actor: B2B Manager (follow-up or archive)
  ▼                                          ▼
interested ──────────────────────────── not_interested (archive)
  │  Actor: B2B Manager
  ▼
proposal_sent
  │  Actor: Founder (approves and sends) · 创始人（审批并发送）
  ▼
sample_sent (if applicable · 如适用)
  │  Actor: Co-founder / Artisan · 联合创始人/匠人
  ▼
negotiating
  │  Actor: Founder · 创始人
  ▼
deal_closed ──── declined (archive · 归档)
  │
  ▼
→ M-3 Client CRM: partner contact added as B2B customer type
```

### Proposal Record · 提案档案

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `partner_id` | FK → M-4 | |
| `type` | Enum | `wholesale` · `consignment` · `workshop_collab` · `brand_intro` · `gift_program` |
| `version` | Text | v1, v2, v3 |
| `created_date` · `sent_date` | Date | |
| `document_url` | URL | Notion or Drive PDF · Notion或Drive PDF |
| `product_selection` | Text | Which pieces included · 包含哪些作品 |
| `pricing_notes` · `terms_summary` | Text | |
| `status` | Enum | `draft` · `sent` · `accepted` · `rejected` · `revised` |

### Permissions · 权限

| Action · 操作 | Founder | Co-founder | Editor | Community Mgr | B2B Mgr |
|--------------|:-------:|:----------:|:------:|:-------------:|:-------:|
| Create partner record · 创建合作方档案 | ✓ | — | — | — | ✓ |
| Edit partner record · 编辑合作方档案 | ✓ | — | — | — | ✓ |
| Log outreach · 记录外联 | ✓ | — | — | — | ✓ |
| Create proposal draft · 创建提案草稿 | ✓ | ✓ (product selection) | — | — | ✓ |
| Approve and send proposal · 审批并发送提案 | ✓ | — | — | — | — |
| Log sample send · 记录样品寄送 | ✓ | ✓ | — | — | ✓ |
| Update deal status · 更新成交状态 | ✓ | — | — | — | ✓ (propose only) |
| Close / decline deal · 成交/拒绝 | ✓ | — | — | — | — |
| View all records · 查看所有记录 | ✓ | ✓ (read) | — | ✓ (read) | ✓ |

### Data Flows · 数据流

```
Partner discovered
→ M-4 Partner record created → status: discovered

Outreach email sent
→ M-4 status: outreached, outreach_date logged
→ next_action_date: outreach_date + 7 days

Partner replies with interest
→ M-4 status: interested, reply_summary logged
→ Proposal drafted in Notion from template
→ Founder approves → M-4 status: proposal_sent

Sample requested
→ M-2 Product records referenced (which pieces shipped)
→ M-4 sample_sent = true, items logged

Deal closed
→ M-4 status: deal_closed
→ M-3: Partner contact created as B2B customer type
→ If workshop collaboration: M-5 Event record created and linked
```

---

## 7. Module 5 — Community Hub
## 七、模块五 — 社群中心

### Responsibility · 职责

Community Hub manages all reservations of time: consultations, workshops, courses, events, and the payment flows that attach to them. It is the operational layer for the brand's community and education function — the part of the brand that teaches, gathers, and connects.

社群中心管理所有时间预约：咨询、工作坊、课程、活动，以及附属其上的支付流程。它是品牌社群与教育功能的运营层——品牌教导、汇聚、连接的那一部分。

### Event / Workshop Record · 活动/工作坊档案

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `title` · `title_zh` | Text | Bilingual · 双语 |
| `type` | Enum | `workshop` · `course` · `community_event` · `pop_up` · `consultation_block` |
| `instructor` | Text | Name · 姓名 |
| `guest_artisan` | Text | Optional · 选填 |
| `date` · `start_time` · `end_time` | Date · Time | |
| `location` | Text | Physical address or "Online" · 实体地址或"线上" |
| `online_url` | URL | If virtual · 如线上举办 |
| `capacity` | Integer | Maximum seats · 最大席位 |
| `seats_booked` | Integer | Auto-calculated from bookings · 自动从预约记录计算 |
| `waitlist_enabled` | Boolean | |
| `waitlist_count` | Integer | |
| `price_usd` | Currency | Per seat · 每席位 |
| `materials_list` · `materials_list_zh` | Long text | What participants need · 参与者所需材料 |
| `description` · `description_zh` | Long text | Bilingual · 双语 |
| `status` | Enum | See status flow below |
| `booking_opens_date` · `booking_closes_date` | Date | |
| `post_event_notes` | Long text | Team reflection after event |
| `feedback_summary` | Long text | Aggregated participant feedback |

### Event Status Flow · 活动状态流

```
draft
  │  Actor: Community Manager or Founder
  ▼
published (page visible but booking not yet open · 页面可见但预约未开放)
  │  Actor: Founder (approves publication)
  ▼
booking_open
  │  Actor: Community Manager (on booking_opens_date or manually)
  │
  ├──→ full (when seats_booked = capacity · 当预约数=容量)
  │       │  Auto-triggers waitlist if enabled
  │       ▼
  │    waitlisted (managing overflow · 管理超额)
  ▼
confirmed (event date passed, all bookings confirmed · 活动日期已过，所有预约已确认)
  ▼
complete (post-event notes logged · 活动后记录已填写)
  ▼
archived
```

### Booking Record · 预约档案

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `customer_id` | FK → M-3 Client CRM | |
| `event_id` | FK → M-5 Event | |
| `type` | Enum | `consultation` · `workshop` · `course` · `community_event` · `b2b_meeting` |
| `datetime` | Datetime | |
| `seats_reserved` | Integer | Default 1 |
| `status` | Enum | `pending` · `confirmed` · `attended` · `cancelled` · `no_show` · `waitlisted` |
| `payment_status` | Enum | `unpaid` · `deposit_paid` · `paid` · `refunded` · `waived` |
| `confirmation_sent` · `reminder_sent` | Boolean | |
| `cancellation_reason` | Text | |
| `notes` | Text | |

### Payment Record · 支付档案

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `customer_id` | FK → M-3 | |
| `linked_to_type` | Enum | `commission` · `booking` · `product` |
| `linked_to_id` | FK | Commission ID or Booking ID |
| `type` | Enum | `full` · `deposit` · `installment` · `balance` · `refund` |
| `amount` | Currency | |
| `currency` | Enum | `USD` · `CNY` · `GBP` |
| `stripe_payment_id` · `stripe_invoice_id` | Text | Stripe references |
| `status` | Enum | `pending` · `paid` · `failed` · `refunded` · `partially_refunded` |
| `paid_at` · `refunded_at` | Datetime | |
| `notes` | Text | |

### Payment Scenarios · 支付场景

| Scenario · 场景 | Structure · 结构 | Timing · 时机 |
|----------------|-----------------|--------------|
| Custom commission · 定制订单 | 50% deposit + 50% balance · 定金+尾款 | Deposit on approval; balance before shipping |
| Workshop seat · 工作坊席位 | Full payment · 全额 | At booking |
| Course registration · 课程报名 | Full payment · 全额 | At enrollment |
| B2B wholesale invoice · B2B批发 | Net-30 invoice | On order confirmation |
| Consultation · 咨询预约 | Free or optional deposit | Per case |

### Permissions · 权限

| Action · 操作 | Founder | Co-founder | Editor | Community Mgr | B2B Mgr |
|--------------|:-------:|:----------:|:------:|:-------------:|:-------:|
| Create event · 创建活动 | ✓ | ✓ | — | ✓ | — |
| Edit event details · 编辑活动详情 | ✓ | ✓ | — | ✓ | — |
| Publish event · 发布活动 | ✓ | — | — | — | — |
| Open booking · 开放预约 | ✓ | — | — | ✓ | — |
| Manage bookings · 管理预约 | ✓ | ✓ | — | ✓ | — |
| Mark attended · 标记出席 | ✓ | ✓ | — | ✓ | — |
| Issue refund · 退款 | ✓ | — | — | — | — |
| View payment records · 查看支付记录 | ✓ | ✓ | — | ✓ (booking payments only) | — |
| Log post-event notes · 记录活动后笔记 | ✓ | ✓ | — | ✓ | — |

### Data Flows · 数据流

```
Customer books via Cal.com
→ Cal.com webhook → M-5 Booking record created
→ M-3 Customer: last_contact_date updated
→ Confirmation email sent (Cal.com)
→ If payment required: Stripe link in email

Workshop fully booked
→ M-5 Event: seats_booked = capacity → status: full
→ Waitlist activated; new bookings join waitlist
→ Waitlist confirmation email sent

Workshop attended (post-event)
→ M-5 Booking status: attended
→ M-3 Customer: workshops_attended linked, brand_relationship_stage reviewed
→ M-6: attendee added to Mailchimp segment: workshop_alumni

Commission deposit paid (Stripe webhook)
→ M-5 Payment record: status = paid
→ M-2 Commission: status → in_production
→ M-3 Customer: interaction_log updated
```

---

## 8. Module 6 — Analytics & Ops
## 八、模块六 — 分析与运营

### Responsibility · 职责

Analytics & Ops manages the brand's external reach and feedback loop: who hears about it, how they are nurtured, how many become subscribers or community members, and what the data reveals about what is working. It owns the newsletter, subscriber base, and the analytics layer that connects traffic to business outcomes.

分析与运营管理品牌的外部触达与反馈循环：谁在了解品牌、如何培育关系、多少人成为订阅者或社群成员，以及数据揭示的有效策略。负责邮件订阅、订阅者群体，以及将流量与业务结果连接起来的分析层。

### Subscriber Record · 订阅者档案

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `email` | Text | |
| `name` | Text | Optional · 选填 |
| `signup_date` | Date | |
| `signup_source` | Enum | `homepage_form` · `custom_form` · `event` · `in_person` · `b2b` |
| `consent_date` · `consent_method` | Date · Enum | GDPR basis · GDPR依据 |
| `language_preference` | Enum | `en` · `zh` · `both` |
| `status` | Enum | `active` · `unsubscribed` · `bounced` · `cleaned` |
| `mailchimp_id` | Text | External sync reference |
| `segments` | Multi-select | `b2c` · `b2b` · `workshop_alumni` · `vip` · `prospect` |
| `issues_received` | Integer | Count of quarterly issues delivered |
| `last_open_date` | Date | From Mailchimp |
| `created_at` · `updated_at` | Datetime | |

### Subscriber Status Flow · 订阅者状态流

```
not_subscribed ──► active ──────────────────────────────────► unsubscribed
(pre-signup)        │  (any signup source)       (unsubscribe link or request)
                    │
                    ├──► bounced (email invalid or inbox full · 邮件无效或收件箱已满)
                    │       │
                    │       ▼
                    └──► cleaned (Mailchimp removes after 2+ bounces · 2次以上退信后移除)
```

### Email Automation Sequences · 邮件自动化序列

| Sequence · 序列 | Trigger · 触发条件 | Cadence · 节奏 | Audience · 受众 |
|----------------|------------------|---------------|----------------|
| Welcome series · 欢迎序列 | New subscriber · 新订阅者 | Email 1: immediate; Email 2: Day 3; Email 3: Day 7 | All new subscribers |
| Post-commission · 定制售后 | M-2 commission status = delivered | Email 1: Day 14; Email 2: Day 30 (story invite) | Commission customers |
| Workshop invite · 工作坊邀请 | New event published in M-5 | Email 1: 3 weeks before; Email 2: 3 days before (if seats remain) | Active subscribers |
| Quarterly dispatch · 季刊发送 | Manually triggered on journal publish · 日记发布时手动触发 | Single send | All active subscribers |
| Re-engagement · 重新激活 | Inactive 180+ days · 180天以上无互动 | Email 1: "We've been thinking of you"; Email 2: 7 days later | Inactive subscribers |

### GA4 Custom Events · GA4自定义事件

| Event Name · 事件名称 | Trigger · 触发条件 | Business Meaning · 业务意义 |
|----------------------|------------------|--------------------------|
| `newsletter_signup` | Homepage form submit | Lead captured · 潜在用户获取 |
| `custom_form_submit` | Custom order form submit | High-intent commission inquiry · 高意向定制询价 |
| `contact_form_submit` | Contact form submit | General inquiry · 一般询问 |
| `booking_click` | Cal.com booking link clicked | Booking intent · 预约意向 |
| `language_switch` | EN ↔ ZH toggled | Audience language preference · 受众语言偏好 |
| `story_read` | Time on stories.html > 60s | Deep content engagement · 深度内容互动 |
| `journal_read` | Time on journal.html > 90s | Editorial engagement · 编辑内容互动 |
| `collection_view` | Scroll depth > 50% on collection pages | Product interest · 产品兴趣 |

### Analytics Review Cadence · 数据分析节奏

| Frequency · 频率 | Metrics · 指标 | Owner · 负责人 |
|-----------------|---------------|--------------|
| Weekly · 每周 | Total users, sessions, top source, form submissions, booking clicks | Founder |
| Monthly · 每月 | Conversion rates, top pages, geographic breakdown, subscriber growth, workshop bookings | Founder |
| Per issue · 每期季刊 | Email open rate, click rate, new subscribers driven, story engagement | Community Manager |
| Quarterly · 每季度 | Seasonal trends, B2B vs. B2C lead ratio, commission conversion rate, LTV signals | Founder |

### Permissions · 权限

| Action · 操作 | Founder | Co-founder | Editor | Community Mgr | B2B Mgr |
|--------------|:-------:|:----------:|:------:|:-------------:|:-------:|
| View analytics · 查看分析 | ✓ | ✓ | — | ✓ (newsletter only) | ✓ (traffic only) |
| Manage subscribers · 管理订阅者 | ✓ | — | — | ✓ | — |
| Create / send campaign · 创建/发送活动 | ✓ | — | ✓ (draft only) | ✓ (draft only) | — |
| Manage automations · 管理自动化 | ✓ | — | — | ✓ (configure) | — |
| Export subscriber list · 导出订阅者列表 | ✓ | — | — | — | — |
| View GA4 dashboard · 查看GA4仪表盘 | ✓ | ✓ | — | — | ✓ |

### Data Flows · 数据流

```
Visitor subscribes on homepage
→ Mailchimp API → M-6 Subscriber created (status: active)
→ M-3 Customer record: newsletter_status = subscribed (if record exists)
→ Welcome series triggered automatically

Workshop completed (M-5 event status: complete)
→ Attendee emails added to Mailchimp: workshop_alumni segment
→ M-6 Subscriber segments updated

Journal issue published (M-1 status: published)
→ Founder triggers Mailchimp quarterly campaign
→ M-6 Campaign record created with send metrics
→ 48 hours post-send: open_rate, click_rate logged from Mailchimp API

GA4 event fires (newsletter_signup, custom_form_submit)
→ Data flows to GA4 property
→ Available in weekly review dashboard
```

---

## 9. Cross-Module Data Relationships
## 九、跨模块数据关系

### Relationship Map · 关系图

```
M-3 Client CRM (Customer)
  │
  ├── → M-2 Product Studio (Commission[])
  │         │
  │         └── → M-5 Community Hub (Payment[])
  │
  ├── → M-1 Brand CMS (CustomerStory?)
  │         │
  │         └── → M-6 Analytics & Ops (Campaign triggered on publish)
  │
  ├── → M-5 Community Hub (Booking[])
  │         │
  │         └── segment update → M-6 (Mailchimp: workshop_alumni)
  │
  └── → M-6 Analytics & Ops (Subscriber?)

M-4 B2B Pipeline (Partner)
  │
  ├── → M-2 Product Studio (product selection in proposals)
  │
  ├── → M-3 Client CRM (on deal_closed: partner contact becomes B2B customer)
  │
  └── → M-5 Community Hub (on collab: Event created and linked)

M-1 Brand CMS (JournalIssue)
  │
  └── → M-6 Analytics & Ops (Campaign triggered on publish)
```

### Key Cross-Module Triggers · 关键跨模块触发事件

| Event · 事件 | Source Module · 来源模块 | Target Module · 目标模块 | Action · 操作 |
|-------------|------------------------|------------------------|--------------|
| Commission delivered | M-2 | M-3 | Set next_followup_date = today + 14d |
| Commission delivered | M-2 | M-3 | Set story_invited = pending |
| Story consent granted | M-3 | M-1 | Draft CustomerStory initiated |
| CustomerStory published | M-1 | M-6 | Include in next quarterly campaign |
| Workshop attended | M-5 | M-3 | Link event to customer, update relationship stage |
| Workshop attended | M-5 | M-6 | Add to workshop_alumni Mailchimp segment |
| New subscriber | M-6 | M-3 | Update newsletter_status on matching customer |
| Journal issue published | M-1 | M-6 | Trigger Mailchimp campaign |
| B2B deal closed | M-4 | M-3 | Create B2B customer record for contact person |
| B2B collab agreed | M-4 | M-5 | Create Event record linked to partner |

---

## 10. Role and Permission Summary
## 十、角色与权限汇总

| Module · 模块 | Founder | Co-founder | Editor | Community Mgr | B2B Mgr |
|--------------|:-------:|:----------:|:------:|:-------------:|:-------:|
| **M-1 Brand CMS** | Full · 完整 | Draft + edit (products) · 草稿/编辑（产品） | Draft + review (journal, stories) · 草稿/审核 | Workshop pages · 工作坊页面 | Read · 只读 |
| **M-2 Product Studio** | Full · 完整 | Full production write · 完整生产填写 | Read · 只读 | Read · 只读 | Product catalogue read · 产品目录只读 |
| **M-3 Client CRM** | Full · 完整 | Story + commission fields · 故事与订单字段 | — | Newsletter + booking + community events · 订阅/预约/社群活动 | B2B contacts only · 仅B2B联系人 |
| **M-4 B2B Pipeline** | Full · 完整 | Product selection for proposals · 提案产品选择 | — | Read · 只读 | Full · 完整 |
| **M-5 Community Hub** | Full · 完整 | View + event details + ship · 查看/活动详情/发货 | — | Full (events, bookings) · 完整（活动、预约） | View · 查看 |
| **M-6 Analytics & Ops** | Full · 完整 | View analytics · 查看分析 | Draft campaigns · 起草活动 | Newsletter + subscriber mgmt · 邮件/订阅者管理 | View analytics · 查看分析 |
| **Settings / Team** | Full · 完整 | — | — | — | — |

### Action-Level Master Reference · 操作级主要参考

| Action · 操作 | Founder | Co-founder | Editor | Community Mgr | B2B Mgr |
|--------------|:-------:|:----------:|:------:|:-------------:|:-------:|
| Final publish any content · 最终发布任何内容 | ✓ | — | — | — | — |
| Approve content · 审批内容 | ✓ | — | — | — | — |
| Close / cancel commissions · 关闭/取消订单 | ✓ | — | — | — | — |
| Issue any refund · 退款 | ✓ | — | — | — | — |
| Export any data · 导出任何数据 | ✓ | — | — | — | — |
| Manage team members · 管理团队成员 | ✓ | — | — | — | — |
| Delete any record · 删除任何记录 | ✓ | — | — | — | — |
| Approve and send B2B proposals · 审批并发送B2B提案 | ✓ | — | — | — | — |
| Send email campaigns · 发送邮件活动 | ✓ | — | — | — | — |

---

## 11. Unified Backend Migration Path
## 十一、统一后端迁移路径

### Why a Migration Will Become Necessary · 为何迁移将成为必要

The Phase 1–2 SaaS layer (Airtable + Notion + Mailchimp + Cal.com + Stripe + GA4) is the right choice for the current scale. It requires no development, it is reliable, and it can be operational within days. But it has structural limits that will be reached as the brand grows:

第一至二阶段的SaaS工具层（Airtable + Notion + Mailchimp + Cal.com + Stripe + GA4）对当前规模是正确的选择。无需开发，可靠，数天内即可运行。但随着品牌增长，它有结构性限制：

| Limit · 限制 | When It Becomes a Problem · 何时成为问题 |
|-------------|----------------------------------------|
| Airtable free: 2,000 rows per base · 免费版每数据库2,000行 | ~150 customers + commissions + partners = ~500 rows. Limit not hit until 300+ active customers. |
| Cross-module automation requires Zapier / Make middleman · 跨模块自动化需要Zapier/Make中间层 | Becomes complex and fragile above ~10 active zaps |
| No real-time sync across tools · 工具间无实时同步 | Data inconsistency risk grows with team size |
| Notion is not a real database · Notion不是真正的数据库 | Cannot query, filter, or join editorial content programmatically |
| No unified identity across tools · 工具间无统一身份标识 | Same customer may exist in Airtable, Mailchimp, and Cal.com with no single ID |

### Migration Trigger Criteria · 迁移触发条件

Begin planning Phase 3 migration when **two or more** of these are true:

当以下条件满足**两项或以上**时，开始规划第三阶段迁移：

- [ ] Airtable base has >1,000 records across all tables · Airtable数据库总记录数超过1,000条
- [ ] Team size exceeds 3 people with different module access needs · 团队规模超过3人且有不同模块访问需求
- [ ] More than 8 active Zapier/Make automations · 超过8个活跃的Zapier/Make自动化
- [ ] A workflow requires data from 3+ modules simultaneously · 某工作流需要同时访问3个以上模块的数据
- [ ] Mailchimp subscriber count approaches 1,500 (paid tier required) · Mailchimp订阅者数接近1,500（需付费套餐）
- [ ] Cal.com booking volume requires capacity management beyond manual tracking · Cal.com预约量需要超出手动追踪的容量管理

### Target Backend Stack · 目标后端技术栈

**Database:** Supabase (PostgreSQL + Row Level Security + Storage + Realtime + Auth)

Supabase is chosen because:
- Open source and self-hostable if needed · 开源且可自托管
- PostgreSQL gives full relational power (joins, views, functions) · PostgreSQL提供完整关系型能力
- Row Level Security enforces role-based access at the database level · 行级安全在数据库层面强制执行角色权限
- Realtime subscriptions enable live kanban and notification systems · 实时订阅支持实时看板和通知系统
- Storage API handles file uploads (product images, story photos) · Storage API处理文件上传
- Auth integrates with NextAuth for the admin panel · Auth与管理后台的NextAuth集成

**Admin Panel:** Next.js 14 (App Router) + Tailwind CSS + shadcn/ui

**Deployment:** Vercel (separate project from public website · 独立于公开网站的Vercel项目)

**Integration layer:** Supabase Edge Functions replace Zapier for cross-module automation

### Phase-by-Phase Migration Plan · 分阶段迁移计划

```
PHASE 1–2 (Current · 当前)
  Tools: Airtable + Notion + Mailchimp + Cal.com + Stripe + GA4
  Connection: Zapier / Make automations
  Admin UI: Airtable Interfaces + Notion
  Status: Operational target · 运营目标

  ↓ Migration trigger criteria met · 迁移触发条件满足

PHASE 3A — Backend Foundation · 后端基础
  Action: Supabase project created, schema defined
  Schema source: architecture.md field definitions → PostgreSQL tables
  Data migration: Airtable CSV export → Supabase import
  First module to migrate: M-3 Client CRM (most complex, most linked)
  Admin: Next.js admin panel — auth + CRM module only
  Keep: All SaaS tools running in parallel during migration
  Duration estimate: 4–8 weeks · 预计4-8周

  ↓

PHASE 3B — Module Migration · 模块迁移
  Migrate one module at a time in this order:
  1. M-2 Product Studio (high daily use, clear schema) · 每日高频使用，schema清晰
  2. M-1 Brand CMS (replace Notion + JSON for content management)
  3. M-6 Analytics & Ops (Mailchimp subscriber table → Supabase; keep Mailchimp for sends)
  4. M-4 B2B Pipeline (migrate from Airtable)
  5. M-5 Community Hub (keep Cal.com and Stripe; sync data to Supabase)
  Duration estimate: 8–16 weeks total · 总计预计8-16周

  ↓

PHASE 3C — Admin Panel Expansion · 管理后台扩展
  All modules live in admin panel
  Zapier automations replaced by Supabase Edge Functions
  Public website updated to fetch from Supabase API instead of JSON files
  GA4 data surfaced in admin via GA4 Reporting API
  Duration estimate: 4–8 weeks · 预计4-8周

  ↓

PHASE 4 — Scale Features · 规模化功能（Future · 未来）
  Member portal for community subscribers
  E-commerce integration if product-only sales added
  WeChat Mini Program if China market becomes primary
  Advanced analytics (cohort analysis, LTV tracking)
  International multi-currency, timezone-aware booking
```

### Data Model Continuity · 数据模型连续性

The field definitions in sections 3–8 of this document are the single source of truth. They are written to transfer directly from Airtable to Supabase without redesign.

本文档第3-8节中的字段定义是唯一权威来源，设计上可直接从Airtable迁移至Supabase而无需重新设计。

**Airtable → PostgreSQL mapping · Airtable到PostgreSQL的映射:**

| Airtable concept · Airtable概念 | PostgreSQL equivalent · PostgreSQL对应 |
|--------------------------------|----------------------------------------|
| Table · 表格 | Table · 数据表 |
| Record · 记录 | Row · 行 |
| Autonumber field · 自增字段 | `SERIAL` or `UUID` primary key |
| Link to another table · 关联另一个表 | Foreign key with `REFERENCES` |
| Single select · 单选 | `ENUM` type or `VARCHAR` with constraint |
| Multi-select · 多选 | `TEXT[]` array or junction table |
| Attachment · 附件 | URL stored in column; file in Supabase Storage |
| Formula field · 公式字段 | PostgreSQL computed column or view |
| Rollup · 汇总 | Aggregate query or materialized view |

### What Does Not Change in Migration · 迁移中不变的内容

- The public website HTML/CSS/JS — zero changes required · 公开网站HTML/CSS/JS——无需任何更改
- The brand's visual direction and editorial tone · 品牌视觉方向和编辑基调
- Stripe (payment processing stays as-is) · Stripe（支付处理保持不变）
- Mailchimp (email sending stays as-is; subscriber table syncs to Supabase) · Mailchimp（邮件发送保持不变；订阅者表同步至Supabase）
- Cal.com (booking UI stays as-is; booking data syncs to Supabase) · Cal.com（预约界面保持不变；预约数据同步至Supabase）
- Google Analytics 4 (tracking stays as-is; API surfaced in admin) · GA4（追踪保持不变；API在后台展示）
- The six-module structure of the operating system · 运营系统的六模块结构
- The role and permission model defined in section 10 · 第10节定义的角色与权限模型
- The workflow states defined per module in sections 3–8 · 第3-8节各模块定义的工作流状态

---

*Document maintained by · 文档维护方: SILORA ORIENT founding team · 创始团队*  
*Version · 版本: 2.0 · April 2026 · 2026年4月*  
*Previous version: 1.0 (Module naming aligned with admin UI spec; CRM philosophy expanded; migration path added)*  
*Related documents · 相关文档:*  
*— `docs/phase-1-roadmap.md` — Implementation sequence and deliverables*  
*— `docs/admin-ui-spec.md` — Internal admin panel UI specification*  
*Next review · 下次审查: After Phase 1 completion · 第一阶段完成后*
