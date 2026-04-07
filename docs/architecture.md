# SILORA ORIENT — Backend System Architecture
# SILORA ORIENT — 后端系统架构文档

**Version 文档版本:** 1.0  
**Date 日期:** April 2026 · 2026年4月  
**Status 状态:** Internal — Architecture Definition · 内部文档 — 架构定义  
**Audience 阅读对象:** Founders · Co-founder · Future technical collaborators  
**阅读对象:** 创始人 · 联合创始人 · 未来技术协作者

---

> This document defines the six backend modules of the SILORA ORIENT operating system: their responsibilities, data ownership, internal permissions, and data flows between modules. It is a reference document for system design, team alignment, and future technical development.
>
> 本文档定义了 SILORA ORIENT 运营系统的六个后端模块：各模块的职责范围、数据归属、内部权限与模块间数据流。适用于系统设计、团队协作对齐及未来技术开发参考。

---

## System Overview · 系统总览

The SILORA ORIENT operating system is organized into six backend modules. Each module owns a distinct domain of the business, has defined data responsibilities, and connects to other modules through explicit data flows.

SILORA ORIENT 运营系统由六个后端模块构成。每个模块负责独立的业务领域，拥有明确的数据职责，并通过明确定义的数据流与其他模块相互连接。

```
┌─────────────────────────────────────────────────────────────────┐
│                   PUBLIC WEBSITE · 公开网站                      │
│              Static HTML/CSS/JS — Vercel deployment             │
└──────┬───────────┬──────────┬──────────┬──────────┬────────────┘
       │           │          │          │          │
  ┌────▼───┐  ┌────▼───┐ ┌───▼────┐ ┌───▼────┐ ┌───▼────┐ ┌──────┐
  │  M-1   │  │  M-2   │ │  M-3  │ │  M-4  │ │  M-5  │ │  M-6 │
  │  CRM   │  │COMMISSION│ │CONTENT│ │  B2B  │ │BOOKING│ │GROWTH│
  └────────┘  └────────┘ └───────┘ └───────┘ └───────┘ └──────┘
```

**The six modules · 六个模块:**

| # | Module · 模块 | Domain · 业务域 | Primary Tool · 主要工具 |
|---|--------------|-----------------|------------------------|
| M-1 | CRM & Customer Relations · 客户关系管理 | Customer profiles, stories, consent · 客户档案、故事、授权 | Airtable |
| M-2 | Commission & Product · 定制与产品 | Orders, production, delivery · 订单、生产、交付 | Airtable |
| M-3 | Content & Publishing · 内容与发布 | Editorial, stories, collections · 内容、故事、系列 | Notion + JSON |
| M-4 | B2B & Outreach · B2B拓展 | Partners, proposals, pipeline · 合作方、提案、销售流程 | Airtable |
| M-5 | Booking & Payment · 预约与支付 | Consultations, workshops, invoices · 咨询、工作坊、发票 | Cal.com + Stripe |
| M-6 | Growth & Analytics · 增长与分析 | Newsletter, traffic, conversions · 邮件订阅、流量、转化 | Mailchimp + GA4 |

---

## Module 1 · 模块一 — CRM & Customer Relations · 客户关系管理

### Responsibility · 职责

M-1 owns the single source of truth for every person who has contacted, commissioned, subscribed to, or participated in SILORA ORIENT. It is the human center of the operating system.

M-1 是所有与 SILORA ORIENT 产生联系的人的唯一数据权威来源——无论是询问者、定制客户、订阅者还是工作坊参与者。它是整个运营系统的人本核心。

### Data Owned · 数据归属

**Customer Record · 客户档案**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | System-generated · 系统生成 |
| `name` | Text | Preferred name · 常用名 |
| `email` | Text | Primary contact · 主要联系方式 |
| `phone` | Text | Optional · 选填 |
| `location` | Text | City, country · 城市、国家 |
| `language` | Enum | `en` \| `zh` \| `both` |
| `type` | Enum | `b2c` \| `b2b` \| `community` |
| `eye_color` | Text | For Eye Color Collection context · 眼色系列相关 |
| `color_preferences` | Long text | Free notes · 自由记录 |
| `story_notes` | Long text | Personal narrative from consultation · 咨询后记录的个人叙事 |
| `family_memory_notes` | Long text | Symbolic references · 象征性细节 |
| `source` | Enum | `form` \| `referral` \| `event` \| `social` \| `walk_in` \| `b2b` |
| `consent_given` | Boolean | For data storage and communications · 数据储存与通讯授权 |
| `consent_date` | Date | When consent was recorded · 授权记录日期 |
| `consent_method` | Enum | `written` \| `verbal_logged` \| `form` |
| `newsletter_status` | Enum | `subscribed` \| `unsubscribed` \| `not_subscribed` |
| `first_contact_date` | Date | |
| `last_contact_date` | Date | Auto-updated · 自动更新 |
| `next_followup_date` | Date | Set manually or by workflow · 手动或工作流设置 |
| `followup_notes` | Long text | Notes from last interaction · 最近一次互动记录 |
| `created_at` | Datetime | |
| `updated_at` | Datetime | |

**Linked Records · 关联记录**

- → M-2 `Commissions[]` — all orders for this customer · 该客户的所有定制订单
- → M-3 `CustomerStory?` — published or draft story · 已发布或草稿状态的客户故事
- → M-5 `Bookings[]` — all consultations and workshop bookings · 所有咨询与工作坊预约
- → M-6 `Subscriber?` — newsletter subscription record · 邮件订阅记录

### Permissions · 权限

| Role · 角色 | Access · 访问权限 |
|------------|-----------------|
| Founder · 创始人 | Full read/write + delete · 完全读写及删除 |
| Co-founder / Artisan · 联合创始人/匠人 | Read + write story notes and commission fields · 读取并填写故事笔记与定制字段 |
| Community Manager · 社群管理员 | Read + write booking and newsletter fields only · 仅读写预约与订阅字段 |
| Editor · 编辑 | Read only · 只读 |
| B2B Manager · B2B负责人 | Read only (B2C); full access to B2B-typed customers · 只读B2C客户；完整访问B2B类型客户 |

### Data Flows · 数据流

```
Customer submits custom order form (custom.html)
→ Formspree receives → Zapier sync → M-1 Customer record created (status: new_inquiry)
→ M-2 Commission record created and linked

Customer books consultation (Cal.com widget)
→ Cal.com webhook → M-5 Booking record created
→ M-1 Customer record updated (last_contact_date, next_followup_date)

Customer subscribes to newsletter (homepage form)
→ Mailchimp API → M-6 Subscriber record created
→ M-1 Customer record updated (newsletter_status: subscribed)

Team completes consultation
→ M-1 story_notes and color_preferences updated manually
→ M-2 Commission status updated to consultation_complete
```

---

## Module 2 · 模块二 — Commission & Product · 定制订单与产品管理

### Responsibility · 职责

M-2 owns the full lifecycle of every custom commission — from first inquiry through production, delivery, and post-sale follow-up. It is the operational core of the brand's primary revenue stream.

M-2 负责每一笔定制订单的完整生命周期——从首次询价到生产、交付与售后跟进。它是品牌核心收入流的运营中枢。

### Data Owned · 数据归属

**Commission Record · 定制订单档案**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `customer_id` | FK → M-1 | |
| `inquiry_date` | Date | |
| `inquiry_source` | Enum | `website_form` \| `email` \| `event` \| `referral` \| `social` |
| `flower_type` | Text | e.g. Orchid, Wisteria, Custom · 如蝴蝶兰、紫藤、自定义 |
| `flower_type_zh` | Text | Chinese name · 中文名称 |
| `colors` | Multi-select | Primary palette choices · 主要色彩选择 |
| `materials` | Multi-select | Silk, gold wire, pearl, etc. · 丝线、金丝、珍珠等 |
| `symbolism_notes` | Long text | What the piece is meant to carry · 作品承载的含义 |
| `design_reference_urls` | Text | Links to inspiration images · 灵感参考链接 |
| `quote_amount` | Currency | Quoted price · 报价金额 |
| `deposit_amount` | Currency | Deposit required · 所需定金 |
| `balance_due` | Currency | Remaining balance · 余款 |
| `currency` | Enum | `USD` \| `CNY` \| `GBP` |
| `status` | Enum | See status flow below · 见下方状态流 |
| `production_notes` | Long text | Maker's notes during production · 制作过程笔记 |
| `revision_log` | Long text | Record of any design changes · 设计变更记录 |
| `shipping_carrier` | Text | |
| `tracking_number` | Text | |
| `shipped_date` | Date | |
| `delivered_date` | Date | |
| `followup_sent` | Boolean | Post-delivery follow-up sent · 交付后跟进是否已发送 |
| `story_invited` | Boolean | Customer invited to share story · 是否已邀请客户分享故事 |
| `created_at` | Datetime | |
| `updated_at` | Datetime | |

**Commission Status Flow · 定制订单状态流**

```
inquiry
  → consultation_scheduled
    → consultation_complete
      → proposal_sent
        → approved
          → deposit_paid
            → in_production
              → quality_review
                → shipped
                  → delivered
                    → followup_sent
                      → story_invited
                        → complete
```

*At any point:* `on_hold` · `cancelled` · `revision_requested`
*任意阶段可转为:* 暂停 · 已取消 · 请求修改

**Product Record · 产品档案** *(for non-custom, collection pieces · 适用于系列成品)*

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `collection_id` | FK → M-3 | |
| `name` | Text | EN name · 英文名 |
| `name_zh` | Text | ZH name · 中文名 |
| `description` | Long text | EN · 英文描述 |
| `description_zh` | Long text | ZH · 中文描述 |
| `flower_type` | Text | |
| `materials` | Multi-select | |
| `palette` | Text | Color description · 色彩描述 |
| `price` | Currency | |
| `stock_status` | Enum | `available` \| `made_to_order` \| `sold_out` \| `archived` |
| `images` | Attachments | |
| `status` | Enum | `draft` \| `review` \| `approved` \| `published` \| `archived` |
| `published_at` | Date | |

### Permissions · 权限

| Role · 角色 | Access · 访问权限 |
|------------|-----------------|
| Founder · 创始人 | Full access including approval and pricing · 完整访问，含审核与定价权 |
| Co-founder / Artisan · 联合创始人/匠人 | Write production notes, update status through shipping · 填写生产笔记，更新至发货状态 |
| Community Manager · 社群管理员 | Read only · 只读 |
| Editor · 编辑 | Read only · 只读 |
| B2B Manager · B2B负责人 | Read only (product records only) · 只读（仅产品档案） |

### Data Flows · 数据流

```
New inquiry received in M-1
→ Commission record created in M-2, linked to customer
→ Status: inquiry

Founder or co-founder sends proposal
→ Status: proposal_sent
→ M-5 Payment: deposit invoice created in Stripe

Customer pays deposit
→ Stripe webhook → M-5 Payment record updated (paid)
→ M-2 Commission status: deposit_paid → in_production

Commission delivered
→ M-2 status: delivered
→ Triggers: followup task created in M-1 (next_followup_date set +14 days)
→ Triggers: story invitation flag set (story_invited = false, pending)

Customer shares story
→ M-3 CustomerStory record created, linked to commission and customer
```

---

## Module 3 · 模块三 — Content & Publishing · 内容与发布管理

### Responsibility · 职责

M-3 owns all brand content — what the world reads, sees, and experiences. It governs the editorial workflow from draft to publication, manages bilingual content integrity, and connects published content back to the customer and product data that gives it meaning.

M-3 负责所有品牌内容——外界阅读、观看与感知到的一切。它管理从草稿到发布的编辑工作流程，维护双语内容的完整性，并将已发布内容与赋予其意义的客户和产品数据相连接。

### Content Types and Storage · 内容类型与存储

| Content Type · 内容类型 | Public Location · 公开页面 | Managed In · 管理位置 | Update Method · 更新方式 |
|------------------------|--------------------------|---------------------|------------------------|
| Customer stories · 客户故事 | `stories.html` | `content/customer-stories.json` | Airtable form → JSON export → git push |
| Journal articles · 日记文章 | `journal.html` | Notion draft → HTML | Notion → HTML edit → git push |
| Collections · 系列作品 | `collections.html`, `other-collections.html` | `content/collections-data.json` | Direct JSON edit → git push |
| Documentary clips · 纪录短片 | `documentary.html` | `content/documentary-content.json` | Direct JSON edit → git push |
| Translations · 双语文本 | All pages · 全页面 | `content/translations.json` | Direct JSON edit → git push |
| Workshop / events · 工作坊/活动 | *(not yet public · 暂无公开页面)* | Notion draft → new HTML page | HTML creation → git push |
| Announcements · 公告 | Homepage banner · 首页横幅 | `content/translations.json` | Direct JSON edit → git push |

### Content Status Flow · 内容状态流

All content types share the same status progression · 所有内容类型共用统一状态流程:

```
draft → internal_review → revision_requested → approved → scheduled → published → archived
草稿 →    内部审核     →     请求修改      →  已审批  →   已排期  →   已发布  →   已归档
```

| Status · 状态 | Who Sets · 设置方 | Meaning · 含义 |
|--------------|-----------------|---------------|
| `draft` | Creator · 创作者 | Work in progress, not ready for review · 进行中，未准备好审核 |
| `internal_review` | Creator · 创作者 | Submitted for internal review · 已提交内部审核 |
| `revision_requested` | Reviewer · 审核者 | Changes needed, creator notified · 需要修改，创作者已收到通知 |
| `approved` | Founder / Editor · 创始人/编辑 | Cleared for publication · 可发布 |
| `scheduled` | Founder / Editor · 创始人/编辑 | Set to go live at specific datetime · 已设定发布时间 |
| `published` | System / Founder · 系统/创始人 | Live on public website · 已在公开网站上线 |
| `archived` | Admin / Founder · 管理员/创始人 | Removed from active display, retained in record · 已从展示中移除，记录保留 |

### Universal Content Fields · 通用内容字段

Every content item, regardless of type, must store · 无论何种内容类型，均须储存:

| Field · 字段 | Bilingual · 双语 | Required · 必填 |
|-------------|----------------|----------------|
| Title · 标题 | EN + ZH | Yes · 是 |
| Subtitle · 副标题 | EN + ZH | No · 否 |
| Short description · 简短描述 | EN + ZH | Yes · 是 |
| Full body · 正文 | EN + ZH | Yes · 是 |
| Author / creator · 作者/创作者 | — | Yes · 是 |
| Reviewer · 审核者 | — | Yes · 是 |
| Category · 分类 | EN label | Yes · 是 |
| Tags · 标签 | EN + ZH | No · 否 |
| Images · 图片 | — | Recommended · 建议 |
| Image credit · 图片归属 | — | If applicable · 如适用 |
| Publish date · 发布日期 | — | On publish · 发布时 |
| SEO title · SEO标题 | EN | Recommended · 建议 |
| SEO description · SEO描述 | EN | Recommended · 建议 |
| Status · 状态 | — | Yes · 是 |

### Customer Story Detailed Flow · 客户故事详细流程

```
[Story Intake · 故事采集]
Customer completes commission → Team conducts post-delivery conversation
→ Team member drafts story in Notion or Airtable
→ Status: draft

[Internal Review · 内部审核]
Founder reviews for accuracy, brand voice, emotional resonance
→ Status: internal_review → approved or revision_requested

[Consent · 授权]
Team contacts customer: explicit permission to publish story
→ Consent recorded: method + date + customer confirmation
→ M-1 Customer record updated: consent_given = true, consent_date

[Final Edit + Image · 最终编辑与配图]
Story copy-edited, image selected or commissioned
→ Status: approved

[Publication · 发布]
`customer-stories.json` updated → git push → Vercel deploy
→ Status: published
→ M-1 Customer record: story_published = true

[Archive · 归档]
After 12+ months or on customer request
→ Status: archived (removed from public display, record retained)
```

### Journal / Quarterly Issue Pipeline · 季刊编辑流程

```
Week -6: Issue planning
  → Theme defined, article list drafted, authors assigned
  → Notion: one page per article with brief

Week -4: Draft submission
  → Writers submit drafts in Notion
  → Status: draft → internal_review

Week -3: Editorial review
  → Editor comments, requests revisions
  → Status: revision_requested → approved

Week -2: Final edit + image selection
  → Images sourced, credited, uploaded
  → Copy finalized in both languages

Week -1: Layout and preview
  → HTML updated, internal preview link shared with team

Day -5: Final approval
  → Founder signs off → Status: approved → scheduled

Day -4: Email campaign prepared
  → Mailchimp campaign drafted, test send to internal team (M-6)

Day 0: Publication
  → HTML live (Vercel deploy)
  → Mailchimp campaign sends to all active subscribers
  → Status: published

Week +1: Analytics review
  → Open rate, click rate, new subscriber count logged
  → Recorded in issue archive
  → Status: archived (content remains live; workflow complete)
```

### Permissions · 权限

| Role · 角色 | Access · 访问权限 |
|------------|-----------------|
| Founder · 创始人 | Approve, publish, archive all content · 审批、发布、归档所有内容 |
| Co-founder / Artisan · 联合创始人/匠人 | Create and edit drafts (products, process content) · 创建并编辑草稿（产品、工艺内容） |
| Editor · 编辑 | Create, edit, and submit for review (journal, stories) · 创建、编辑并提交审核（日记、故事） |
| Community Manager · 社群管理员 | Create and edit workshop/event pages · 创建并编辑工作坊/活动页面 |
| B2B Manager · B2B负责人 | Read only · 只读 |

### Data Flows · 数据流

```
Co-founder uploads new product photos + notes
→ M-3 Product draft created → status: draft
→ Founder notified for review
→ On approval: M-2 Product record published, appears in collections JSON

Customer story approved and consented
→ M-3 CustomerStory published
→ M-1 Customer record updated: story_published = true
→ M-6: Story link included in next quarterly newsletter

Journal issue published
→ M-6 Mailchimp campaign triggered to all active subscribers
→ M-6 Analytics event logged: quarterly_issue_sent
```

---

## Module 4 · 模块四 — B2B & Outreach · B2B拓展与外联管理

### Responsibility · 职责

M-4 manages the brand's relationships with commercial partners: boutiques, galleries, concept stores, cultural institutions, stylists, agents, and artisan organizations. It tracks the full outreach-to-deal lifecycle and owns the proposal system.

M-4 管理品牌与商业合作方的关系：精品店、画廊、概念店、文化机构、造型师、代理商及手工艺组织。负责从外联到成交的完整生命周期，并持有提案系统的管理权。

### Data Owned · 数据归属

**B2B Partner Record · B2B合作方档案**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `business_name` | Text | |
| `website` | URL | |
| `email` | Text | |
| `phone` | Text | |
| `address` | Text | Full address · 完整地址 |
| `city` | Text | |
| `country` | Text | |
| `category` | Enum | See categories below · 见下方分类 |
| `contact_person` | Text | Name · 姓名 |
| `contact_title` | Text | Role at partner · 职位 |
| `discovery_source` | Enum | `google` \| `instagram` \| `referral` \| `event` \| `walk_in` \| `press` |
| `discovery_date` | Date | |
| `aesthetic_fit` | Enum | `strong` \| `moderate` \| `weak` \| `unknown` |
| `interest_level` | Enum | `low` \| `medium` \| `high` \| `unknown` |
| `notes` | Long text | Free notes on fit, tone, context · 关于契合度、风格、背景的自由备注 |
| `status` | Enum | See status flow below · 见下方状态流 |
| `outreach_date` | Date | Date of first outreach · 首次外联日期 |
| `last_followup_date` | Date | |
| `next_action_date` | Date | With reminder · 含提醒 |
| `reply_received` | Boolean | |
| `reply_date` | Date | |
| `reply_summary` | Text | Brief note on reply content · 回复内容简述 |
| `proposal_sent` | Boolean | |
| `proposal_version` | Text | e.g. v1, v2 |
| `proposal_sent_date` | Date | |
| `sample_requested` | Boolean | |
| `sample_sent` | Boolean | |
| `sample_sent_date` | Date | |
| `sample_items` | Text | What was sent · 发送物品 |
| `deal_type` | Enum | `wholesale` \| `consignment` \| `placement` \| `collab` \| `gift_program` |
| `deal_status` | Enum | `none` \| `negotiating` \| `closed` \| `declined` \| `paused` |
| `created_at` | Datetime | |
| `updated_at` | Datetime | |

**Partner Categories · 合作方分类**

| Category · 分类 | EN Label | Description · 说明 |
|----------------|----------|-------------------|
| `boutique` | Independent boutique · 独立精品店 | Handmade / artisan jewelry and accessories |
| `gallery` | Gallery · 画廊 | Art and craft galleries |
| `concept_store` | Concept store · 概念店 | Multibrand lifestyle stores |
| `cultural_institution` | Cultural institution · 文化机构 | Museums, cultural centers, heritage orgs |
| `stylist` | Stylist · 造型师 | Editorial / celebrity stylists |
| `artisan_org` | Artisan organization · 手工艺组织 | Craft councils, heritage networks |
| `hospitality` | Hospitality · 酒店与待客 | Hotels, spas, premium venues |
| `agent_reseller` | Agent / reseller · 代理/经销商 | Market representatives |

**B2B Partner Status Flow · B2B合作方状态流**

```
discovered
  → outreach_pending
    → outreached
      → no_reply (auto-flag after 14 days · 14天后自动标记)
      → replied
        → interested
          → proposal_sent
            → sample_sent
              → negotiating
                → deal_closed
                → declined
        → not_interested
    → declined
```

**Proposal Record · 提案档案**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `partner_id` | FK → M-4 | |
| `type` | Enum | `wholesale` \| `consignment` \| `workshop_collab` \| `brand_intro` \| `gift_program` |
| `version` | Text | v1, v2, v3 |
| `created_date` | Date | |
| `sent_date` | Date | |
| `pdf_url` | URL | Stored in Notion or Drive · 存储于Notion或Drive |
| `product_selection` | Text | Which pieces included · 包含哪些作品 |
| `pricing_notes` | Text | |
| `terms_summary` | Text | |
| `status` | Enum | `draft` \| `sent` \| `accepted` \| `rejected` \| `revised` |

### Permissions · 权限

| Role · 角色 | Access · 访问权限 |
|------------|-----------------|
| Founder · 创始人 | Full access, final approval on proposals · 完整访问，提案最终审批权 |
| B2B Manager · B2B负责人 | Full access to M-4 module · M-4模块完整访问权 |
| Co-founder / Artisan · 联合创始人/匠人 | Read + write product selection for proposals · 读取并填写提案产品选择 |
| Community Manager · 社群管理员 | Read only · 只读 |
| Editor · 编辑 | No access · 无访问权限 |

### Data Flows · 数据流

```
B2B partner discovered (research, walk-in, event)
→ M-4 Partner record created → status: discovered

Outreach email sent
→ M-4 status: outreached, outreach_date logged
→ next_action_date: +7 days (follow-up reminder)

Partner replies with interest
→ M-4 status: interested, reply_summary logged
→ M-3 Proposal drafted (Notion template)
→ M-4 status: proposal_sent, proposal_version, proposal_sent_date

Sample requested
→ M-2 Product records referenced (which pieces shipped)
→ M-4 sample_sent = true, sample_sent_date logged

Deal closed
→ M-4 status: deal_closed
→ M-1: Partner contact person may be added as B2B customer type
→ M-5: If workshop collaboration, event record created
```

---

## Module 5 · 模块五 — Booking & Payment · 预约与支付管理

### Responsibility · 职责

M-5 manages all reservations of time and money: consultations, workshops, courses, events, and the payment records that attach to commissions and bookings across the system.

M-5 负责所有时间与资金的预约管理：咨询预约、工作坊、课程、活动，以及系统中附属于定制订单与预约的支付记录。

### Data Owned · 数据归属

**Booking Record · 预约档案**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `customer_id` | FK → M-1 | |
| `type` | Enum | `consultation` \| `workshop` \| `course` \| `event` \| `b2b_meeting` |
| `event_id` | FK → Event | If linked to a specific event · 如与特定活动关联 |
| `datetime` | Datetime | |
| `duration_minutes` | Integer | |
| `seats_reserved` | Integer | Default 1 · 默认1 |
| `status` | Enum | `pending` \| `confirmed` \| `attended` \| `cancelled` \| `no_show` |
| `payment_status` | Enum | `unpaid` \| `deposit_paid` \| `paid` \| `refunded` \| `waived` |
| `confirmation_sent` | Boolean | |
| `reminder_sent` | Boolean | |
| `cancellation_reason` | Text | |
| `notes` | Text | |
| `created_at` | Datetime | |

**Payment Record · 支付档案**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `customer_id` | FK → M-1 | |
| `linked_to_type` | Enum | `commission` \| `booking` \| `product` |
| `linked_to_id` | FK | Commission or Booking ID |
| `type` | Enum | `full` \| `deposit` \| `installment` \| `balance` \| `refund` |
| `amount` | Currency | |
| `currency` | Enum | `USD` \| `CNY` \| `GBP` |
| `stripe_payment_id` | Text | Reference from Stripe |
| `stripe_invoice_id` | Text | If invoiced · 如通过发票 |
| `status` | Enum | `pending` \| `paid` \| `failed` \| `refunded` \| `partially_refunded` |
| `paid_at` | Datetime | |
| `refunded_at` | Datetime | |
| `notes` | Text | |

**Event / Workshop Record · 活动/工作坊档案**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `title` | Text | EN · 英文 |
| `title_zh` | Text | ZH · 中文 |
| `type` | Enum | `workshop` \| `course` \| `community_event` \| `pop_up` |
| `instructor` | Text | Name · 姓名 |
| `date` | Date | |
| `time` | Time | |
| `location` | Text | Physical or online · 线下地址或线上链接 |
| `capacity` | Integer | Maximum seats · 最大席位数 |
| `seats_booked` | Integer | Auto-calculated · 自动计算 |
| `waitlist` | Boolean | Whether waitlist is active · 是否开启候补 |
| `price` | Currency | Per seat · 每席位价格 |
| `materials_list` | Long text | What participants need to bring · 参与者需携带物品 |
| `description` | Long text | EN · 英文描述 |
| `description_zh` | Long text | ZH · 中文描述 |
| `status` | Enum | `draft` \| `published` \| `booking_open` \| `full` \| `complete` \| `cancelled` |
| `post_event_notes` | Long text | Team reflection after event · 活动结束后的团队反思 |

### Payment Scenarios · 支付场景

| Scenario · 场景 | Structure · 结构 | Timing · 时机 |
|----------------|-----------------|--------------|
| Custom commission · 定制订单 | 50% deposit + 50% balance · 50%定金+50%尾款 | Deposit on approval; balance before shipping · 审批时收定金；发货前收尾款 |
| Workshop seat · 工作坊席位 | Full payment at booking · 预约时全额支付 | On booking confirmation · 预约确认时 |
| Course registration · 课程报名 | Full payment at enrollment · 报名时全额支付 | On registration · 报名时 |
| B2B wholesale invoice · B2B批发发票 | Net-30 invoice · 净30天发票 | On order confirmation · 订单确认后 |
| Consultation · 咨询 | Free or optional deposit · 免费或可选定金 | TBD per case · 按情况决定 |

### Permissions · 权限

| Role · 角色 | Access · 访问权限 |
|------------|-----------------|
| Founder · 创始人 | Full access, issue refunds, manage events · 完整访问，退款，管理活动 |
| Co-founder / Artisan · 联合创始人/匠人 | View bookings and payments, update event details · 查看预约与支付记录，更新活动详情 |
| Community Manager · 社群管理员 | Manage bookings and events, view payment status · 管理预约与活动，查看支付状态 |
| B2B Manager · B2B负责人 | View only · 仅查看 |
| Editor · 编辑 | No access · 无访问权限 |

### Data Flows · 数据流

```
Customer books consultation via Cal.com
→ Cal.com webhook → M-5 Booking record created
→ M-1 Customer record updated (last_contact_date)
→ Confirmation email sent automatically (Cal.com)
→ If payment required: Stripe link included in email

Commission approved by customer
→ M-2 status: approved
→ M-5 Payment: Stripe deposit invoice generated and emailed
→ On payment: M-5 payment_status: deposit_paid
→ M-2 status: deposit_paid → in_production

Workshop fully booked
→ M-5 Event: seats_booked = capacity → status: full
→ Waitlist activated if enabled
→ New bookings added to waitlist, confirmation email sent

Workshop completed
→ M-5 Event status: complete
→ M-1 Customer records: workshop_attended appended
→ M-6: Workshop participants added to community segment in Mailchimp
```

---

## Module 6 · 模块六 — Growth & Analytics · 增长与数据分析

### Responsibility · 职责

M-6 manages the brand's external reach: who hears about it, how they are nurtured, how many become subscribers, customers, or community members, and what the data says about what is working. It owns the newsletter, subscriber base, and analytics layer.

M-6 管理品牌的外部触达：谁在了解它、如何培育关系、多少人成为订阅者/客户/社群成员，以及数据揭示的有效策略。负责邮件订阅、订阅者群体与数据分析层。

### Data Owned · 数据归属

**Subscriber Record · 订阅者档案**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `email` | Text | |
| `name` | Text | Optional · 选填 |
| `signup_date` | Date | |
| `signup_source` | Enum | `homepage_form` \| `custom_form` \| `event` \| `in_person` \| `b2b` |
| `consent_date` | Date | |
| `consent_method` | Enum | `form_checkbox` \| `verbal_logged` \| `in_person` |
| `language_preference` | Enum | `en` \| `zh` \| `both` |
| `status` | Enum | `active` \| `unsubscribed` \| `bounced` \| `cleaned` |
| `mailchimp_id` | Text | External reference · 外部参考ID |
| `segments` | Multi-select | `b2c` \| `b2b` \| `workshop_alumni` \| `vip` |
| `issues_received` | Integer | Count · 数量 |
| `last_open_date` | Date | From Mailchimp · 来自Mailchimp |
| `created_at` | Datetime | |
| `updated_at` | Datetime | |

**Newsletter Campaign Record · 邮件营销记录**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-------------|------------|-------------|
| `id` | UUID | |
| `type` | Enum | `quarterly_issue` \| `welcome` \| `announcement` \| `workshop_invite` \| `collection_launch` |
| `subject_en` | Text | |
| `subject_zh` | Text | |
| `send_date` | Date | |
| `recipient_count` | Integer | |
| `open_rate` | Percentage | From Mailchimp · 来自Mailchimp |
| `click_rate` | Percentage | From Mailchimp · 来自Mailchimp |
| `linked_journal_issue` | FK → M-3 | If quarterly · 如为季刊 |
| `notes` | Text | Post-send observations · 发送后观察 |

### Email Automation Sequences · 邮件自动化序列

| Sequence · 序列 | Trigger · 触发条件 | Emails · 邮件 |
|----------------|------------------|--------------|
| Welcome series · 欢迎序列 | New subscriber · 新订阅者 | 1: Immediate welcome; 2: Brand story (Day 3); 3: Eye Color Collection feature (Day 7) |
| Post-commission · 定制售后 | M-2 status = delivered | 1: How is your piece? (Day 14); 2: Story invitation (Day 30) |
| Workshop invite · 工作坊邀请 | New event published in M-5 | 1: Invitation email (3 weeks before); 2: Last seats reminder (3 days before) |
| Quarterly dispatch · 季刊发送 | Manually triggered on publish | 1: Issue announcement with preview |
| Re-engagement · 重新激活 | Inactive 180+ days | 1: "We've been thinking of you"; 2: Unsubscribe prompt if no open |

### Analytics Events · 分析事件

Custom GA4 events to configure · 需配置的GA4自定义事件:

| Event Name · 事件名称 | Trigger · 触发条件 | Value · 价值 |
|----------------------|------------------|-------------|
| `newsletter_signup` | Homepage form submit · 首页表单提交 | Lead generated · 潜在用户获取 |
| `custom_form_submit` | Custom order form submit · 定制表单提交 | High-intent lead · 高意向潜在用户 |
| `contact_form_submit` | Contact form submit · 联系表单提交 | General inquiry · 一般询问 |
| `booking_click` | Cal.com link clicked · Cal.com链接点击 | Booking intent · 预约意向 |
| `language_switch` | EN ↔ ZH toggle · 语言切换 | Audience segmentation · 受众细分 |
| `story_read` | Time on stories.html > 60s · 停留>60秒 | Content engagement · 内容互动 |
| `journal_read` | Time on journal.html > 90s · 停留>90秒 | Content engagement · 内容互动 |
| `collection_view` | Scroll past 50% on collections pages · 浏览系列页面超过50% | Product interest · 产品兴趣 |

### Analytics Review Cadence · 数据分析节奏

| Frequency · 频率 | What to Review · 审查内容 |
|-----------------|--------------------------|
| Weekly · 每周 | Total users, source breakdown, form submission count · 总用户数、来源分布、表单提交数 |
| Monthly · 每月 | Conversion rates, top pages, geographic breakdown, subscriber growth · 转化率、最热页面、地理分布、订阅增长 |
| Quarterly · 每季度 | Seasonal trends, campaign attribution, B2B vs. B2C lead ratio, LTV signals · 季节趋势、活动归因、B2B与B2C线索比率、用户终身价值信号 |

### Permissions · 权限

| Role · 角色 | Access · 访问权限 |
|------------|-----------------|
| Founder · 创始人 | Full access, send campaigns, view all analytics · 完整访问，发送活动，查看全部分析 |
| Co-founder / Artisan · 联合创始人/匠人 | View analytics and subscriber counts · 查看分析数据与订阅者数量 |
| Community Manager · 社群管理员 | Manage subscribers, segments, draft campaigns · 管理订阅者、细分群体、起草活动 |
| B2B Manager · B2B负责人 | View analytics only · 仅查看分析数据 |
| Editor · 编辑 | Draft and preview campaigns · 起草并预览活动 |

### Data Flows · 数据流

```
Visitor subscribes on homepage
→ Mailchimp API → M-6 Subscriber created
→ M-1 Customer record created or updated (newsletter_status: subscribed)
→ Welcome series triggered automatically

Workshop completed (M-5 event status: complete)
→ Attendee emails added to Mailchimp segment: workshop_alumni
→ M-6 Subscriber segments updated

Journal issue published (M-3 status: published)
→ Founder triggers Mailchimp quarterly campaign
→ M-6 Campaign record created with send metrics
→ After 48 hours: open_rate and click_rate logged from Mailchimp

GA4 conversion event fires (newsletter_signup, custom_form_submit)
→ Analytics data available in GA4 dashboard
→ Reviewed weekly by founder against conversion targets
```

---

## Cross-Module Data Relationships · 跨模块数据关系

```
M-1 Customer ─────────── is the source of ──────────► M-2 Commission
     │                                                      │
     │                                              links to│
     ▼                                                      ▼
M-6 Subscriber ◄─── triggers welcome ──────────── M-3 CustomerStory
     │
     │ segments updated by
     ▼
M-5 Booking (workshop attended)

M-4 B2BPartner ─── deal closed ──► M-1 Customer (B2B type)
                                        │
                              may trigger│
                                         ▼
                                   M-5 Event (workshop collab)

M-3 Journal Issue published ──────────► M-6 Campaign triggered
M-3 CustomerStory published ──────────► M-6 included in next quarterly email
M-5 Payment (deposit paid) ───────────► M-2 Commission status updated
```

---

## Role and Permission Summary · 角色与权限汇总

| Role · 角色 | M-1 CRM | M-2 Commission | M-3 Content | M-4 B2B | M-5 Booking | M-6 Growth |
|------------|---------|---------------|-------------|---------|------------|-----------|
| **Founder** | Full · 完整 | Full · 完整 | Full · 完整 | Full · 完整 | Full · 完整 | Full · 完整 |
| **Co-founder** | Story + commission fields · 故事与定制字段 | Production write · 生产填写 | Draft + edit · 草稿与编辑 | Product selection · 产品选择 | View + event edit · 查看与活动编辑 | View · 查看 |
| **Editor** | Read · 只读 | Read · 只读 | Draft + review · 草稿与审核 | None · 无 | None · 无 | Draft campaigns · 起草活动 |
| **Community Mgr** | Newsletter + booking fields · 订阅与预约字段 | Read · 只读 | Workshop pages · 工作坊页面 | Read · 只读 | Full · 完整 | Subscriber mgmt · 订阅者管理 |
| **B2B Mgr** | B2B customers · B2B客户 | Products read · 产品只读 | Read · 只读 | Full · 完整 | View · 查看 | View analytics · 查看分析 |

---

*Document maintained by · 文档维护方: SILORA ORIENT founding team · 创始团队*  
*Version · 版本: 1.0 · April 2026 · 2026年4月*  
*Next review · 下次审查: After Phase 1 completion · 第一阶段完成后*
