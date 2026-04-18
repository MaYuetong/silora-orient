# SILORA ORIENT — Phase 2 Status Document
# SILORA ORIENT — 第二阶段状态文档

**Version · 版本:** 2.0  
**Last Updated · 最后更新:** April 8, 2026 · 2026年4月8日  
**Overall Status · 整体状态:** In Progress — Task 1.2.A documentation complete; tasks blocked on Phase 1 activation · 进行中——任务1.2.A文档已完成；任务阻塞于第一阶段激活  
**Audience · 适用对象:** Founder · Co-founder · Future technical collaborators · 创始人 · 联合创始人 · 未来技术协作者

---

## Phase Summary · 阶段概述

Phase 2 builds the operational rhythm that Phase 1 made possible. Where Phase 1 fixed three silent failures and put infrastructure in place, Phase 2 converts that infrastructure into repeatable, ongoing processes: a welcome sequence that runs without founder action, a B2B pipeline that turns research into relationships, a booking system extended to workshops, a story intake process that generates ongoing content, and a first analytics review that turns data into decisions.

第二阶段建立第一阶段所使能的运营节奏。第一阶段修复了三个静默失败并建立基础设施，第二阶段将该基础设施转化为可重复的持续流程：无需创始人操作即可运行的欢迎序列、将调研转化为关系的B2B管道、扩展至工作坊的预约系统、产生持续内容的故事采集流程，以及将数据转化为决策的首次分析审查。

**Role in the overall architecture · 在整体架构中的角色:**  
Phase 2 activates M-4 (B2B & Outreach) for the first time, deepens M-6 (Growth & Analytics) with automation and a data review cycle, and extends M-5 (Booking & Payment) to include workshop events. It also establishes the content supply chain for M-1 (Brand CMS) by creating a repeatable customer story intake process. Without Phase 2, the systems built in Phase 1 collect data but produce no output — subscribers receive nothing, inquiries are tracked but not followed up systematically, and traffic data accumulates without being reviewed.

第二阶段首次激活M-4（B2B与外联），通过自动化和数据审查周期深化M-6（增长与分析），并将M-5（预约与支付）扩展至工作坊活动。它还通过创建可重复的客户故事采集流程，为M-1（品牌内容管理系统）建立内容供应链。没有第二阶段，第一阶段建立的系统收集数据但不产生输出——订阅者什么都收不到，询价被追踪但没有系统性跟进，流量数据积累但没有被审查。

**Why Phase 2 was sequenced here · 第二阶段排序于此的原因:**  
Phase 2 could not begin until Phase 1 was code-complete. The Mailchimp welcome automation (1.2.A) requires real subscribers flowing in, which requires Phase 1 P0-B to be activated. The B2B database (1.2.B) requires the Airtable base from Phase 1 P0-C. Every Phase 2 task has at least one Phase 1 prerequisite.

第二阶段在第一阶段代码完成之前无法开始。Mailchimp欢迎自动化（1.2.A）需要真实订阅者流入，这需要第一阶段P0-B已激活。B2B数据库（1.2.B）需要第一阶段P0-C的Airtable数据库。每个第二阶段任务至少有一个第一阶段前提条件。

---

## Task Table · 任务一览表

| Task ID | Task Name · 任务名称 | Description · 描述 | Status · 状态 | Completion Date · 完成日期 | Deliverable · 交付成果 | Notes · 备注 |
|---------|--------------------|--------------------|-------------|--------------------------|----------------------|------------|
| 1.2.A | Mailchimp Welcome Automation · 欢迎自动化序列 | 3-email welcome sequence in Mailchimp Customer Journeys, fires on every new subscriber · Mailchimp客户旅程中3封欢迎邮件序列，每位新订阅者自动触发 | ✅ Doc complete · 文档已完成 | April 8, 2026 | `admin/mailchimp-welcome.md` with full email copy + A/B plan + setup steps · 含完整邮件文案+A/B计划+配置步骤 | Awaiting founder: activate in Mailchimp UI (depends on P0-B live) · 等待创始人在Mailchimp界面激活 |
| 1.2.B | B2B Partner Database · B2B合作方数据库 | Research and enter 50 initial NYC B2B targets in Airtable · 调研并在Airtable录入50条初始纽约B2B目标 | ⏳ Not started · 未开始 | — | 50 Airtable records + Outreach Queue view sorted by priority · 50条Airtable记录+按优先级排序的外联队列视图 | Depends on P0-C (Airtable base live) · 依赖P0-C（Airtable数据库已上线） |
| 2.1.A | Workshop Public Page · 工作坊公开页面 | Create `workshops.html` with Cal.com booking embed · 创建含Cal.com预约嵌入的`workshops.html` | ⏳ Not started · 未开始 | — | `workshops.html` live; nav updated on all 9 pages · `workshops.html`已上线；全部9页导航已更新 | Depends on P1-B (Cal.com active) + at least 1 workshop scheduled · 依赖P1-B（Cal.com已激活）+至少1场工作坊已安排 |
| 2.1.B | Customer Story Intake · 客户故事采集 | Create repeatable 7-step consent-tracked story collection process · 创建可重复的7步授权追踪故事采集流程 | ⏳ Not started · 未开始 | — | Written SOP + at least 1 story collected and recorded in Airtable · 书面SOP+至少1个故事已采集并记录在Airtable中 | Depends on Airtable live + at least 1 commission at `delivered` · 依赖Airtable已上线+至少1件定制达到`delivered`状态 |
| 2.1.C | First B2B Outreach · 首次B2B外联 | Send first batch of 15–20 personalized outreach emails from B2B database · 从B2B数据库发送首批15–20封个性化外联邮件 | ⏳ Not started · 未开始 | — | 15–20 emails sent; all records updated in Airtable with follow-up dates · 15–20封邮件已发送；Airtable中所有记录已更新含跟进日期 | Depends on 1.2.B complete · 依赖1.2.B已完成 |
| 2.2.A | GA4 Analytics Review · GA4分析审查 | First structured review of GA4 data: top pages, sources, events, conversion · GA4数据首次结构化审查：热门页面、来源、事件、转化 | ⏳ Not started · 未开始 | — | 1-page written findings summary + 3 concrete actions · 1页书面调查结果摘要+3个具体行动 | Depends on GA4 live for 2–4 weeks with real Measurement ID · 依赖GA4使用真实ID上线2–4周 |
| 2.2.B | Quarterly Issue Dry Run · 季刊演练 | Write, design, and send first quarterly email to full subscriber list · 撰写、设计并向完整订阅者名单发送首份季刊邮件 | ⏳ Not started · 未开始 | — | Issue sent; open rate + click rate recorded; post-send notes written · 期刊已发送；打开率+点击率已记录；发送后记录已撰写 | Depends on 1.2.A live + 50+ real subscribers · 依赖1.2.A已上线+50+位真实订阅者 |

---

## Files Created or Modified · 创建或修改的文件

### New files created · 新建文件

| File · 文件 | Task · 任务 | Purpose · 用途 |
|-----------|-----------|--------------|
| `admin/mailchimp-welcome.md` | 1.2.A | Complete 3-email sequence with full copy, Mailchimp setup steps, A/B test plan, success metrics, troubleshooting · 完整3封邮件序列含完整文案、Mailchimp配置步骤、A/B测试计划、成功指标、故障排查 |

### Files to be created in Phase 2 · 第二阶段将创建的文件

| File · 文件 | Task · 任务 | Purpose · 用途 |
|-----------|-----------|--------------|
| `workshops.html` | 2.1.A | Public workshop page with Cal.com embed · 含Cal.com嵌入的公开工作坊页面 |
| `content/customer-stories.json` entries | 2.1.B | New story entries as they are collected · 故事采集后添加新条目 |

---

## Task 1.2.A — Mailchimp Welcome Automation (Detail)
## 任务1.2.A — Mailchimp欢迎自动化序列（详情）

**Documentation Status · 文档状态:** ✅ Complete — April 8, 2026  
**Activation Status · 激活状态:** 🔄 Blocked — Phase 1 P0-B must be live first · 阻塞中——第一阶段P0-B必须先上线

**What was documented · 已记录内容:**

`admin/mailchimp-welcome.md` contains the complete setup guide:

`admin/mailchimp-welcome.md`包含完整配置指南：

**Email 1 — Immediate · 即刻发送:**  
Subject: *Welcome to Silora Orient*  
Content: Brand origin story — the Chinese silk flower workshop, five years of craft, the Spanish pianist and the earrings made for her eyes, not the ones she asked for. Establishes who the brand is and why it exists. CTA: Explore the Collection / Our Story.

内容：品牌起源故事——中国绢花工作室、五年工艺、西班牙钢琴家和为她的眼睛而作的耳环（而非她所要求的）。建立品牌身份和存在理由。CTA：探索系列/我们的故事。

**Email 2 — Day 3 · 第3天:**  
Subject: *The story behind the Eye Color Collection*  
Content: The full Eye Color Collection origin story — the pianist came wanting cherry blossoms; the founder saw Mediterranean blue and made something for her eyes instead; the unplanned piece became the signature collection. CTA: See the Eye Color Collection.

内容：眼色系列完整起源故事——钢琴家想要樱花；创始人看到地中海蓝并为她的眼睛制作了作品；这件计划外的作品成为标志性系列。CTA：查看眼色系列。

**Email 3 — Day 7 · 第7天:**  
Subject: *If you've ever wanted a piece made just for you*  
Content: Describes the custom commission process — asking about eyes, memories, what a flower means. Explains that the founder makes the piece that comes from the story, not the piece the customer describes. CTA: Begin Your Custom Order.

内容：描述定制委托流程——询问眼睛、记忆、花卉的含义。解释创始人制作源于故事的作品，而非客户描述的作品。CTA：开始定制订单。

**A/B test plan · A/B测试计划:**

| Variable · 变量 | Variant A · 方案A | Variant B · 方案B | Metric · 指标 |
|--------------|----------------|----------------|-------------|
| Email 1 subject | "Welcome to Silora Orient" | "Something for your eyes" | Open rate · 打开率 |
| Email 2 lead image | Product photo (orchid earrings) | Process photo (hands + silk) | Click rate · 点击率 |
| Email 3 subject | "If you've ever wanted a piece made just for you" | "Tell us your story" | Open rate · 打开率 |
| Email 3 CTA | "Begin Your Custom Order" | "Tell us your story" | Click-to-open rate |

**Activation checklist · 激活核查清单:**

- [ ] Phase 1 P0-B active (Mailchimp connected, env vars set) · 第一阶段P0-B已激活
- [ ] At least 1 real subscriber received · 至少已收到1位真实订阅者
- [ ] Create Customer Journey in Mailchimp: Automations → Customer Journeys → Create Journey · 在Mailchimp中创建客户旅程
- [ ] Set trigger: "Subscribes to audience" + filter tag = `homepage_signup` · 设置触发器+过滤器标签
- [ ] Add Email 1 (no delay), Email 2 (3-day delay), Email 3 (4-day delay after Email 2) · 添加3封邮件及延迟设置
- [ ] Paste copy from `admin/mailchimp-welcome.md` into each email · 从文档粘贴文案至每封邮件
- [ ] Add brand header image (800px, `#FAF7F2` cream background) · 添加品牌标题图
- [ ] Add CTA buttons with correct URLs · 添加含正确URL的CTA按钮
- [ ] Set up A/B test on Email 1 subject line (50/50 split) · 设置邮件1主题行A/B测试
- [ ] Activate the Customer Journey · 激活客户旅程
- [ ] Test: subscribe personal email → confirm all 3 received within 7 days · 测试：订阅个人邮箱→确认7天内收到全部3封

**Estimated activation time · 预计激活时间:** 2–3 hours · 2–3小时

---

## Task 1.2.B — B2B Partner Database (Detail)
## 任务1.2.B — B2B合作方数据库（详情）

**Documentation Status · 文档状态:** ✅ Schema defined in `admin/airtable-schema.md` (B2B Partners table, 27 fields) · 架构已在`admin/airtable-schema.md`中定义  
**Activation Status · 激活状态:** ⏳ Not started — awaiting Phase 1 P0-C (Airtable base) · 未开始——等待第一阶段P0-C（Airtable数据库）

**Research targets · 调研目标方向:**

| Category · 分类 | NYC Search Terms · 纽约搜索关键词 | Target count · 目标数量 |
|----------------|----------------------------------|----------------------|
| Boutique jewelry stores · 精品珠宝店 | "handmade jewelry NYC", "artisan jewelry Brooklyn" | 15 |
| Concept / multi-brand boutiques · 概念/多品牌精品店 | "concept store NYC", "multibrand boutique Manhattan" | 10 |
| Craft and contemporary galleries · 工艺与当代画廊 | "craft gallery NYC", "contemporary jewelry gallery" | 10 |
| Cultural institutions · 文化机构 | Chinese cultural centers, Asian art museums, gift shops | 10 |
| Editorial stylists · 编辑造型师 | NYC stylists on Instagram with artisan aesthetic | 5 |

**Minimum fields required per record · 每条记录所需最少字段:**  
Business Name · 商业名称 / Website · 网站 / Email · 邮箱 / Category · 分类 / Status = `Discovered` · 状态 / Aesthetic Fit · 审美契合度

**Activation checklist · 激活核查清单:**

- [ ] Phase 1 P0-C complete (Airtable base live with B2B Partners table) · 第一阶段P0-C已完成
- [ ] Research 50 targets using categories above · 使用上方分类调研50个目标
- [ ] Enter all 50 records in Airtable with minimum required fields · 在Airtable录入全部50条记录
- [ ] Verify Outreach Queue view shows records sorted by Aesthetic Fit · 验证外联队列视图按审美契合度排序显示记录
- [ ] Proceed to Task 2.1.C (first outreach batch) · 进行任务2.1.C（首批外联）

**Estimated time · 预计时间:** 4–5 hours (research + data entry) · 4–5小时（调研+数据录入）

---

## Dependencies · 依赖关系

```
Phase 1 P0-B (Mailchimp live)
    └─→ Task 1.2.A: Welcome automation can be activated
            └─→ Task 2.2.B: Quarterly issue (needs 50+ subscribers)

Phase 1 P0-C (Airtable live)
    └─→ Task 1.2.B: B2B Partners table can be populated
            └─→ Task 2.1.C: First outreach batch (needs records to send to)
    └─→ Task 2.1.B: Story intake (needs Commissions table at delivered status)

Phase 1 P1-B (Cal.com active)
    └─→ Task 2.1.A: workshops.html page with Cal.com embed

GA4 live 2–4 weeks (Phase 1 P0-A activated + real Measurement ID set)
    └─→ Task 2.2.A: Analytics review (needs data to review)
```

---

## Verification Checklist · 验证核查清单

Run after each task is activated.  
每项任务激活后运行。

**Task 1.2.A — Welcome automation · 欢迎自动化:**
- [ ] Subscribe with personal email → Email 1 arrives immediately · 用个人邮箱订阅 → 邮件1立即到达
- [ ] Email 2 arrives on day 3 · 邮件2在第3天到达
- [ ] Email 3 arrives on day 7 · 邮件3在第7天到达
- [ ] All CTA buttons link to correct pages · 所有CTA按钮链接至正确页面
- [ ] Emails render correctly on mobile and desktop · 邮件在移动端和桌面端正确渲染
- [ ] A/B test is active on Email 1 subject line · 邮件1主题行A/B测试已激活

**Task 1.2.B — B2B database · B2B数据库:**
- [ ] 50 records in Airtable B2B Partners table · Airtable B2B合作方表中50条记录
- [ ] All records have at minimum: business name, website, email, category, status · 所有记录至少有：商业名称、网站、邮箱、分类、状态
- [ ] Outreach Queue view shows sorted list, Strong Aesthetic Fit first · 外联队列视图显示排序列表，强审美契合度优先

---

## Risks and Blockers · 风险与阻塞

| Risk · 风险 | Likelihood · 可能性 | Impact · 影响 | Mitigation · 缓解方案 |
|-----------|------------------|-------------|---------------------|
| Phase 1 P0-B not activated before Phase 2 begins · 第一阶段P0-B未在第二阶段开始前激活 | Medium · 中 | 1.2.A welcome automation cannot go live · 1.2.A欢迎自动化无法上线 | Phase 2 documentation is done; activation waits on founder's Mailchimp setup · 第二阶段文档已完成；激活等待创始人的Mailchimp配置 |
| Mailchimp free tier (500 subscriber) limit reached before Phase 2 · Mailchimp免费套餐达到上限 | Low · 低 | New signups stop being captured · 新注册停止捕获 | Monitor audience count monthly; upgrade when approaching 400 · 每月监控受众数量；接近400时升级 |
| B2B research yields fewer than 50 contactable emails · B2B调研获得少于50个可联系邮箱 | Medium · 中 | Outreach batch is smaller than planned · 外联批次少于计划 | Expand search to NJ/CT or online-only boutiques; adjust target from 50 to 30 minimum · 扩展至新泽西/康涅狄格或仅在线精品店；将目标从50调整为最少30 |
| Welcome emails go to spam · 欢迎邮件进入垃圾邮件 | Low-medium · 低中 | Open rate collapses · 打开率崩溃 | Authenticate domain in Mailchimp (SPF + DKIM) before activating journey · 激活旅程前在Mailchimp中验证域名（SPF+DKIM） |
| Phase 2 tasks attempted before Phase 1 is activated · 第一阶段激活前尝试第二阶段任务 | — | Tasks fail silently · 任务静默失败 | Follow dependency order strictly; do not skip · 严格遵循依赖顺序，不要跳过 |

---

## Activation Priority Order · 激活优先级顺序

Complete Phase 1 activation first. Then proceed in this order:

先完成第一阶段激活。然后按此顺序进行：

| # | Action · 操作 | Time · 时间 | Depends on · 依赖 |
|---|-------------|-----------|-----------------|
| 1 | Activate Mailchimp Customer Journey per `admin/mailchimp-welcome.md` · 按文档激活Mailchimp客户旅程 | 2–3 hr | Phase 1 P0-B live |
| 2 | Research + enter 50 B2B records in Airtable · 调研并录入50条B2B记录 | 4–5 hr | Phase 1 P0-C live |
| 3 | First B2B outreach batch (15–20 emails) · 首批B2B外联（15–20封） | 3–4 hr | Task 1.2.B complete |
| 4 | `workshops.html` + Cal.com workshop event types · 工作坊页面+Cal.com工作坊活动类型 | 3–4 hr | Phase 1 P1-B active |
| 5 | Customer story intake — first story · 客户故事采集——第一个故事 | 2–3 hr | Airtable + 1 delivered commission |
| 6 | GA4 analytics review · GA4分析审查 | 1–2 hr | 2–4 weeks of GA4 data |
| 7 | Quarterly issue dry run · 季刊演练 | 4–6 hr | 1.2.A live + 50+ subscribers |

**Total estimated Phase 2 effort · 第二阶段预计总工作量:** ~20 hours across 2–4 weeks · 约20小时，分2–4周完成

---

## Completion Summary · 完成情况摘要

**As of April 8, 2026 · 截至2026年4月8日:**

- Task 1.2.A: Documentation complete (`admin/mailchimp-welcome.md` created with full email copy, A/B plan, setup guide, success metrics). Activation blocked on Phase 1 P0-B.  
  任务1.2.A：文档已完成（`admin/mailchimp-welcome.md`已创建，含完整邮件文案、A/B计划、配置指南、成功指标）。激活阻塞于第一阶段P0-B。
- Tasks 1.2.B through 2.2.B: Not started. All blocked on Phase 1 activation prerequisites.  
  任务1.2.B至2.2.B：未开始。均阻塞于第一阶段激活前提条件。

---

## Success Metrics · 成功指标

At the end of Phase 2, the following should be true:

第二阶段结束时，以下指标应达成：

| Metric · 指标 | Target · 目标 | How to verify · 验证方式 |
|------------|------------|------------------------|
| Welcome Email 1 open rate · 邮件1打开率 | >50% | Mailchimp Customer Journey report |
| Welcome Email 3 CTA click rate · 邮件3点击率 | >5% of opens | Mailchimp link click report |
| B2B records in Airtable · Airtable中B2B记录数 | 50+ with email + status | Airtable count view |
| B2B outreach emails sent · B2B外联邮件发送数 | 15–20, all tracked | Airtable Outreached view |
| Workshop page live · 工作坊页面已上线 | 1+ bookable event | Visit `workshops.html` |
| Customer stories collected · 已采集客户故事数 | 1+ with explicit consent | Airtable Story Consent field |
| GA4 data reviewed · GA4数据已审查 | 3 actions documented | Written summary exists |
| Quarterly issue sent · 季刊已发送 | Open rate + click rate recorded | Mailchimp campaign report |

---

*Document version: 2.0 · April 8, 2026*  
*See `docs/phase-2-launch.md` for phase rationale and architecture context*  
*See `admin/mailchimp-welcome.md` for Task 1.2.A full email copy and setup guide*
