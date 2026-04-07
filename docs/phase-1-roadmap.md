# SILORA ORIENT — Phase 1 Implementation Roadmap
# SILORA ORIENT — 第一阶段实施路线图

**Version 文档版本:** 1.0  
**Date 日期:** April 2026 · 2026年4月  
**Status 状态:** Active — Implementation in progress · 进行中 — 实施阶段  
**Audience 阅读对象:** Founders · Co-founder · Future technical collaborators  
**阅读对象:** 创始人 · 联合创始人 · 未来技术协作者

---

> Phase 1 has one overriding goal: stop losing real business to the absence of infrastructure. Before any new feature is added, the three silent failures that exist today must be fixed — the fake newsletter form, the missing analytics, and the untracked commissions. Everything in this phase is additive and low-risk. Nothing in the current website is changed or removed.
>
> 第一阶段只有一个核心目标：停止因基础设施缺失而流失真实业务。在添加任何新功能之前，必须先修复当前存在的三个静默失败——虚假的订阅表单、缺失的分析数据，以及无追踪的定制订单。本阶段所有内容均为追加性质，风险极低。现有网站不做任何删改。

---

## Phase 1 Scope Summary · 第一阶段范围概述

**Timeline · 时间范围:** 1–2 weeks from start date · 启动后1-2周  
**Team · 执行团队:** Founder (lead) + Co-founder (support) · 创始人（主导）+ 联合创始人（协助）  
**External tools to set up · 需配置的外部工具:** GA4, Mailchimp, Airtable, Zapier, Cal.com, Stripe

**What Phase 1 delivers · 第一阶段交付内容:**

| Deliverable · 交付成果 | Module · 模块 | Impact · 影响 |
|----------------------|--------------|--------------|
| Analytics tracking on all pages · 全页面分析追踪 | M-6 | Traffic data begins immediately · 即刻获取流量数据 |
| Real newsletter subscriptions · 真实邮件订阅 | M-6 | Email list begins growing · 邮件列表开始增长 |
| Commission tracker in Airtable · Airtable定制订单追踪 | M-2 | No more lost orders · 不再遗漏订单 |
| Formspree → Airtable auto-sync · 表单自动同步 | M-1 + M-2 | All inquiries logged automatically · 所有询价自动记录 |
| Consultation booking on custom.html · 定制页面咨询预约 | M-5 | Consultations bookable online · 在线预约咨询 |
| Stripe payment links for commissions · 定制订单Stripe支付链接 | M-5 | Deposits can be collected · 可收取定金 |
| Welcome email automation · 欢迎邮件自动化 | M-6 | Every subscriber gets a response · 每位订阅者获得回复 |
| B2B partner database (initial 50) · B2B合作方数据库（初始50条） | M-4 | Outreach can begin systematically · 系统化外联可以开始 |

**What Phase 1 does NOT include · 第一阶段不包含:**
- Custom backend or database build · 自建后端或数据库
- Admin dashboard · 管理后台
- Workshop public page · 工作坊公开页面
- Automated proposal generator · 自动化提案生成
- Journal CMS or content workflow tool · 日记内容管理系统
- Quarterly email dispatch (dry run in Phase 2) · 季刊邮件发送（第二阶段进行演练）

---

## Development Sequence · 开发顺序

Tasks are sequenced by dependency and business impact. Tasks within the same priority tier can be executed in parallel if team capacity allows.

任务按依赖关系和业务影响优先级排序。同一优先级层内的任务，在团队资源允许时可并行推进。

---

## Priority 0 · 优先级0 — Fix the Silent Failures · 修复静默失败

*These three tasks must be completed before anything else. They cost almost nothing to implement and immediately stop real business loss.*

*以下三项任务必须最先完成。实施成本极低，且可立即阻止真实业务损失。*

---

### Task 1.0.A — Install Google Analytics 4
### 任务1.0.A — 安装Google Analytics 4

**Priority · 优先级:** P0 — Immediate · 立即  
**Module · 模块:** M-6 Growth & Analytics  
**Effort · 工作量:** 1–2 hours · 1-2小时  
**Depends on · 依赖:** GA4 account created · GA4账户已创建  
**Owner · 负责人:** Founder · 创始人

**What this fixes · 解决的问题:**  
Currently there is zero traffic data. No one knows how many people visit, where they come from, which pages they read, or which content drives inquiries. This is the single highest-leverage action available — one script tag unlocks all of it.

当前完全没有流量数据。无法得知访问人数、来源渠道、浏览页面及哪些内容推动询价。这是可用的单一最高杠杆行动——一行脚本标签即可解锁全部数据。

**Setup steps · 配置步骤:**

1. Go to analytics.google.com → Create new GA4 property for `silora-orient.vercel.app`  
   进入analytics.google.com → 为`silora-orient.vercel.app`创建新GA4属性
2. Copy the Measurement ID (format: `G-XXXXXXXXXX`)  
   复制测量ID（格式：`G-XXXXXXXXXX`）
3. Add the following block to the `<head>` of all 9 HTML files  
   将以下代码块添加至全部9个HTML文件的`<head>`标签内

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

4. Replace `G-XXXXXXXXXX` with the real Measurement ID in all files  
   将所有文件中的`G-XXXXXXXXXX`替换为真实测量ID
5. Deploy (git push → Vercel auto-deploys)  
   部署（git push → Vercel自动部署）
6. Verify: visit the site, open GA4 → Realtime → confirm active users appear  
   验证：访问网站，打开GA4 → 实时报告 → 确认活跃用户出现

**Files to edit · 需编辑的文件:**
```
index.html
about.html
collections.html
other-collections.html
custom.html
stories.html
journal.html
documentary.html
contact.html
```

**Deliverable · 交付成果:** GA4 live on all pages, data flowing within 24 hours · GA4在所有页面上线，24小时内数据开始流入

**Custom events to add in Phase 1.5 (after P0 complete) · 第一阶段1.5添加的自定义事件（P0完成后）:**

```javascript
// Add to main.js — fires on newsletter form submit
// 添加至main.js — 订阅表单提交时触发
gtag('event', 'newsletter_signup', { event_category: 'engagement' });

// Add to custom.html — fires on final form submission
// 添加至custom.html — 最终表单提交时触发
gtag('event', 'custom_form_submit', { event_category: 'conversion' });

// Add to contact.html — fires on contact form submission
// 添加至contact.html — 联系表单提交时触发
gtag('event', 'contact_form_submit', { event_category: 'engagement' });
```

---

### Task 1.0.B — Connect Newsletter Form to Mailchimp
### 任务1.0.B — 将订阅表单连接至Mailchimp

**Priority · 优先级:** P0 — Immediate · 立即  
**Module · 模块:** M-6 Growth & Analytics  
**Effort · 工作量:** 2–3 hours · 2-3小时  
**Depends on · 依赖:** Mailchimp account created and audience configured · Mailchimp账户已创建，受众列表已配置  
**Owner · 负责人:** Founder · 创始人

**What this fixes · 解决的问题:**  
The current newsletter form button changes color and says "Thank you" — but stores zero subscribers. Every person who has clicked that button is gone. This task replaces the fake UI with a real Mailchimp API call so every subscriber is captured from this point forward.

当前订阅表单按钮会变色并显示"谢谢"，但实际储存了零个订阅者。每一个点击过该按钮的人都已流失。本任务将虚假UI替换为真实的Mailchimp API调用，从此刻起留存每一位订阅者。

**Setup steps · 配置步骤:**

1. Create Mailchimp account at mailchimp.com (free tier: up to 500 subscribers)  
   在mailchimp.com创建账户（免费套餐：最多500位订阅者）
2. Create an Audience named "Silora Orient — Main List"  
   创建名为"Silora Orient — Main List"的受众列表
3. Get API key: Account → Extras → API Keys → Create A Key  
   获取API密钥：账户 → 扩展 → API密钥 → 创建密钥
4. Get Audience ID: Audience → Settings → Audience name and defaults → Audience ID  
   获取受众ID：受众 → 设置 → 受众名称与默认值 → 受众ID

**Implementation · 实施方案:**

Because the site is fully static (no server), use Mailchimp's hosted signup form endpoint or a serverless function via Vercel. The recommended zero-infrastructure approach is a Mailchimp embedded form action with AJAX:

由于网站完全静态（无服务器），可使用Mailchimp托管注册表单端点或通过Vercel的无服务器函数。推荐的零基础设施方案是通过AJAX使用Mailchimp嵌入式表单操作：

**Option A (simplest · 最简方案): Mailchimp embedded form action**

Replace the current newsletter button logic in `main.js` with a form that posts to Mailchimp's hosted endpoint. This requires no server but does cause a page redirect on submit.

将`main.js`中当前的订阅按钮逻辑替换为发布到Mailchimp托管端点的表单。无需服务器，但提交后会跳转页面。

**Option B (recommended · 推荐方案): Vercel serverless function**

Create a Vercel API route that accepts the email, calls the Mailchimp API server-side (keeping API key private), and returns success. No redirect. Works seamlessly with the existing UI.

创建一个Vercel API路由，接受邮件地址，在服务器端调用Mailchimp API（保持API密钥私密），返回成功状态。无页面跳转，与现有UI无缝配合。

**File to create: `/api/subscribe.js`**

```javascript
// /api/subscribe.js — Vercel serverless function
// /api/subscribe.js — Vercel无服务器函数
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const MAILCHIMP_DC = process.env.MAILCHIMP_DC; // e.g. 'us21'

  const data = {
    email_address: email,
    status: 'subscribed',
    tags: ['homepage_signup']
  };

  const response = await fetch(
    `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
    {
      method: 'POST',
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );

  const result = await response.json();

  if (response.status === 200 || response.status === 400 && result.title === 'Member Exists') {
    return res.status(200).json({ success: true });
  }

  return res.status(500).json({ error: 'Subscription failed' });
}
```

**Environment variables to set in Vercel · 需在Vercel中设置的环境变量:**
```
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_AUDIENCE_ID=your_audience_id_here
MAILCHIMP_DC=us21  (your datacenter prefix from your API key)
```

**Update `main.js` newsletter section · 更新`main.js`订阅区域:**

```javascript
// Replace existing newsletter button handler in main.js
// 替换main.js中现有的订阅按钮处理逻辑
if (newsletterForm && newsletterBtn) {
  newsletterBtn.addEventListener('click', async function () {
    const input = newsletterForm.querySelector('input[type="email"]');
    const email = input ? input.value.trim() : '';

    if (!email.includes('@')) {
      input.style.border = '1px solid var(--gold)';
      input.placeholder = 'Please enter a valid email · 请输入有效邮箱';
      return;
    }

    newsletterBtn.textContent = '...';
    newsletterBtn.disabled = true;

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        newsletterBtn.textContent = '✓ Thank you · 感谢订阅';
        newsletterBtn.style.background = '#A8B89C';
        input.value = '';
        input.placeholder = 'You\'re on the list · 已加入订阅列表';
        // Fire GA4 event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'newsletter_signup', { event_category: 'engagement' });
        }
      } else {
        throw new Error('failed');
      }
    } catch {
      newsletterBtn.textContent = 'Try again · 请重试';
      newsletterBtn.disabled = false;
    }
  });
}
```

**Deliverable · 交付成果:** Every email submitted is stored in Mailchimp. Welcome automation triggers automatically. List begins growing from day one · 每封提交的邮箱均储存在Mailchimp中，欢迎自动化即刻触发，列表从第一天开始增长

---

### Task 1.0.C — Set Up Airtable Commission Tracker
### 任务1.0.C — 建立Airtable定制订单追踪系统

**Priority · 优先级:** P0 — Immediate · 立即  
**Module · 模块:** M-2 Commission & Product, M-1 CRM  
**Effort · 工作量:** 2–3 hours · 2-3小时  
**Depends on · 依赖:** Airtable account created (free tier sufficient) · Airtable账户已创建（免费套餐即可）  
**Owner · 负责人:** Founder · 创始人

**What this fixes · 解决的问题:**  
Custom order inquiries currently arrive as emails and are tracked in no system. If an email is missed or archived, the order is lost. This task creates a structured Airtable base that serves as the operational record for all commissions.

定制订单询价目前以邮件形式到达，没有任何系统追踪。如果邮件被遗漏或归档，订单就会流失。本任务创建一个结构化Airtable数据库，作为所有定制订单的运营记录。

**Airtable base structure · Airtable数据库结构:**

**Base name · 数据库名称:** `SILORA ORIENT — Operations`

**Table 1: Customers · 表一：客户**

| Field Name · 字段名 | Field Type · 类型 | Notes · 说明 |
|--------------------|------------------|-------------|
| Name · 姓名 | Single line text | Primary field · 主字段 |
| Email · 邮箱 | Email | |
| Phone · 电话 | Phone | |
| Location · 所在地 | Single line text | City, country |
| Type · 类型 | Single select | B2C / B2B / Community |
| Source · 来源 | Single select | Website / Referral / Event / Social / Walk-in |
| Story Notes · 故事笔记 | Long text | |
| Color Preferences · 色彩偏好 | Long text | |
| Eye Color · 眼睛颜色 | Single line text | |
| Family Memory Notes · 家庭记忆笔记 | Long text | |
| Newsletter Status · 订阅状态 | Single select | Subscribed / Not subscribed / Unsubscribed |
| Consent Given · 已授权 | Checkbox | |
| Consent Date · 授权日期 | Date | |
| First Contact · 首次联系 | Date | |
| Last Contact · 最近联系 | Date | |
| Next Follow-up · 下次跟进 | Date | |
| Follow-up Notes · 跟进笔记 | Long text | |
| Commissions · 定制订单 | Link to Commissions table | |

**Table 2: Commissions · 表二：定制订单**

| Field Name · 字段名 | Field Type · 类型 | Notes · 说明 |
|--------------------|------------------|-------------|
| Commission ID · 订单编号 | Autonumber | Primary field |
| Customer · 客户 | Link to Customers | |
| Status · 状态 | Single select | See status values below |
| Inquiry Date · 询价日期 | Date | |
| Flower Type · 花型 | Single line text | |
| Colors · 颜色 | Multiple select | |
| Symbolism Notes · 象征含义 | Long text | |
| Quote Amount · 报价金额 | Currency | USD |
| Deposit Amount · 定金金额 | Currency | |
| Balance Due · 余款 | Currency | |
| Payment Status · 支付状态 | Single select | Unpaid / Deposit paid / Paid / Refunded |
| Production Notes · 生产笔记 | Long text | |
| Shipped Date · 发货日期 | Date | |
| Tracking Number · 追踪号 | Single line text | |
| Delivered Date · 收货日期 | Date | |
| Follow-up Sent · 已发送跟进 | Checkbox | |
| Story Invited · 已邀请故事 | Checkbox | |
| Notes · 备注 | Long text | |

**Commission status values · 定制订单状态值:**
```
Inquiry · 询价
Consultation Scheduled · 已预约咨询
Consultation Complete · 咨询完成
Proposal Sent · 已发送提案
Approved · 已审批
Deposit Paid · 已付定金
In Production · 生产中
Quality Review · 质检中
Shipped · 已发货
Delivered · 已收货
Follow-up Sent · 已发送跟进
Story Invited · 已邀请故事
Complete · 已完成
On Hold · 暂停
Cancelled · 已取消
```

**Airtable views to create · 需创建的视图:**

| View Name · 视图名 | Filter · 筛选 | Purpose · 用途 |
|-------------------|--------------|---------------|
| Active Commissions · 活跃订单 | Status not in [Complete, Cancelled] | Daily operations dashboard · 日常运营看板 |
| New Inquiries · 新询价 | Status = Inquiry | Review daily · 每日审查 |
| In Production · 生产中 | Status = In Production | Track current work · 追踪当前工作 |
| Awaiting Payment · 等待付款 | Payment Status = Unpaid, Status = Approved | Chase deposits · 催收定金 |
| Follow-up Queue · 跟进队列 | Next Follow-up = today · 今日跟进 | Daily action list · 每日行动清单 |
| All Customers · 所有客户 | None · 无 | Full CRM view · 完整CRM视图 |

**Deliverable · 交付成果:** Airtable base live with two linked tables, six operational views, and a clear status board for all commissions · Airtable数据库上线，含两个关联表格、六个运营视图及所有定制订单的清晰状态看板

---

## Priority 1 · 优先级1 — Connect the Channels · 连接各渠道

*Complete after all P0 tasks are done. These tasks connect the existing website touchpoints to the new data infrastructure.*

*所有P0任务完成后执行。这些任务将现有网站触点连接至新的数据基础设施。*

---

### Task 1.1.A — Formspree → Airtable Auto-Sync
### 任务1.1.A — Formspree到Airtable自动同步

**Priority · 优先级:** P1  
**Module · 模块:** M-1 CRM, M-2 Commission  
**Effort · 工作量:** 1–2 hours · 1-2小时  
**Depends on · 依赖:** Task 1.0.C (Airtable base live) · 任务1.0.C已完成  
**Tool · 工具:** Zapier (free tier: 100 tasks/month) or Make (free tier: 1000 ops/month)  
**Owner · 负责人:** Founder · 创始人

**What this does · 功能说明:**  
Every time someone submits the custom order form or contact form on the website, Formspree receives it and emails the founder. This task adds an automatic second action: a new record appears in Airtable the moment a form is submitted, with all form fields mapped to the correct columns. No manual entry required.

每当有人提交网站上的定制订单表单或联系表单时，Formspree接收并将其发送至创始人邮箱。本任务添加自动的第二步操作：表单提交后即刻在Airtable中生成新记录，所有表单字段自动映射至对应列。无需手动录入。

**Zapier zap configuration · Zapier工作流配置:**

```
Trigger: Formspree — New Submission (form ID: xlgopzqb)
触发器：Formspree — 新提交（表单ID：xlgopzqb）

Action 1: Airtable — Create Record in Customers table
行动1：Airtable — 在客户表中创建记录
  Map: Name → Name field
  Map: Email → Email field
  Map: Message → Story Notes field
  Set: Type = B2C
  Set: Source = Website
  Set: First Contact = Today

Action 2: Airtable — Create Record in Commissions table
行动2：Airtable — 在定制订单表中创建记录
  Map: Customer (link to record just created)
  Map: Inquiry Date = Today
  Set: Status = Inquiry
  Map: Notes → full message content
```

**Fields from current custom.html form · custom.html当前表单字段:**

The custom form currently sends via Formspree. Map these fields:
当前定制表单通过Formspree发送。需映射以下字段：

| Form Field · 表单字段 | Airtable Field · Airtable字段 |
|----------------------|------------------------------|
| Name · 姓名 | Customer: Name |
| Email · 邮箱 | Customer: Email |
| Eye color · 眼睛颜色 | Customer: Eye Color |
| Flower type · 花型 | Commission: Flower Type |
| Color preferences · 颜色偏好 | Customer: Color Preferences |
| Story / message · 故事/留言 | Commission: Symbolism Notes |

**Deliverable · 交付成果:** All future form submissions appear in Airtable within 60 seconds of submission, with no manual action required · 未来所有表单提交将在60秒内出现在Airtable中，无需任何手动操作

---

### Task 1.1.B — Embed Consultation Booking on custom.html
### 任务1.1.B — 在custom.html嵌入咨询预约系统

**Priority · 优先级:** P1  
**Module · 模块:** M-5 Booking & Payment  
**Effort · 工作量:** 2–3 hours (Cal.com setup + HTML embed) · 2-3小时（Cal.com配置+HTML嵌入）  
**Depends on · 依赖:** Cal.com account created, Google Calendar connected · Cal.com账户已创建，Google日历已连接  
**Owner · 负责人:** Founder · 创始人

**What this does · 功能说明:**  
Currently, consultation requests arrive as form submissions and are then manually scheduled by email. This task adds a real booking widget to `custom.html` so customers can select available time slots directly, triggering automatic confirmation emails and calendar events.

目前，咨询请求以表单提交形式到达，然后通过邮件手动安排时间。本任务在`custom.html`添加真实的预约插件，让客户直接选择可用时间段，自动触发确认邮件和日历事件。

**Cal.com setup · Cal.com配置:**

1. Create account at cal.com (free tier is sufficient)  
   在cal.com创建账户（免费套餐即可）
2. Connect Google Calendar (Settings → Calendars)  
   连接Google日历（设置 → 日历）
3. Create event type: "Custom Jewelry Consultation · 定制珠宝咨询"  
   创建活动类型："Custom Jewelry Consultation · 定制珠宝咨询"
   - Duration: 45 minutes · 时长：45分钟
   - Buffer: 15 minutes after · 缓冲：结束后15分钟
   - Availability: founder's available hours · 可用性：创始人的可用时间
   - Confirmation email: customize with brand language · 确认邮件：使用品牌语言自定义
4. Enable Zoom or Google Meet link generation (optional)  
   启用Zoom或Google Meet链接生成（可选）
5. Copy embed code from Cal.com → Event Type → Embed  
   从Cal.com → 活动类型 → 嵌入，复制嵌入代码

**HTML addition to `custom.html` · 在`custom.html`添加的HTML:**

Add the following section after the existing multi-step form, before the footer:
在现有多步表单之后、页脚之前添加以下区域：

```html
<!-- Booking Section · 预约区域 -->
<section class="booking-section" style="padding: var(--space-xl) 0; background: var(--cream);">
  <div class="container">
    <div style="text-align: center; margin-bottom: var(--space-lg);">
      <p class="eyebrow">Schedule a conversation · 预约咨询</p>
      <h2 style="font-family: var(--font-serif); font-size: 2rem; margin: 0.5rem 0;">
        Begin with a conversation
      </h2>
      <p style="color: var(--text-mid); max-width: 500px; margin: 1rem auto; line-height: 1.7;">
        Every custom piece begins with a conversation — about your story, your memories, and the colors that feel like yours. Book a 45-minute consultation below.
      </p>
    </div>
    <!-- Cal.com inline embed · Cal.com内嵌预约 -->
    <div style="max-width: 800px; margin: 0 auto;">
      <!-- Replace YOUR_CAL_USERNAME with actual Cal.com username -->
      <!-- 将YOUR_CAL_USERNAME替换为实际Cal.com用户名 -->
      <div id="cal-inline" style="min-height: 400px;"></div>
      <script type="text/javascript">
        (function (C, A, L) {
          let p = function (a, ar) { a.q.push(ar); };
          let d = C.document;
          C.Cal = C.Cal || function () {
            let cal = C.Cal; let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {}; cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function () { p(api, arguments); };
              const namespace = ar[1];
              api.q = api.q || [];
              typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
              return;
            }
            p(cal, ar);
          };
        })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", {origin: "https://cal.com"});
        Cal("inline", {
          elementOrSelector: "#cal-inline",
          calLink: "YOUR_CAL_USERNAME/custom-consultation",
          layout: "month_view"
        });
      </script>
    </div>
  </div>
</section>
```

**Confirmation email template · 确认邮件模板** (to customize in Cal.com settings · 在Cal.com设置中自定义):

```
Subject: Your consultation is confirmed — Silora Orient

Thank you for reaching out. Your 45-minute consultation is confirmed.

[Date and time]
[Zoom / location link if applicable]

Before we meet, you're welcome to think about:
— The flower that speaks to you most
— A color that feels like yours
— A memory or story you'd like your piece to carry

We look forward to hearing you.

— Silora Orient
```

**Deliverable · 交付成果:** Consultation bookings managed online, automatic calendar blocking, confirmation emails sent, booking data trackable in Cal.com dashboard · 在线管理咨询预约，自动锁定日历，发送确认邮件，预约数据可在Cal.com后台追踪

---

### Task 1.1.C — Create Stripe Payment Links for Commissions
### 任务1.1.C — 为定制订单创建Stripe支付链接

**Priority · 优先级:** P1  
**Module · 模块:** M-5 Booking & Payment  
**Effort · 工作量:** 1–2 hours (account setup + first link) · 1-2小时（账户配置+首条链接）  
**Depends on · 依赖:** Stripe account verified with banking details · Stripe账户已通过银行信息验证  
**Owner · 负责人:** Founder · 创始人

**What this does · 功能说明:**  
Replaces informal payment arrangements (bank transfer, Venmo) with a professional, tracked, and receipt-generating Stripe flow. In Phase 1, these are pre-built payment links for common deposit amounts — no website checkout integration required.

将非正式的付款安排（银行转账、Venmo）替换为专业的、可追踪的、自动生成收据的Stripe流程。在第一阶段，这些是针对常见定金金额的预建支付链接——无需网站结账集成。

**Stripe setup · Stripe配置:**

1. Create Stripe account at stripe.com, complete identity verification  
   在stripe.com创建账户，完成身份验证
2. Add bank account for payouts  
   添加银行账户用于提款
3. Navigate to Payment Links → Create link  
   进入支付链接 → 创建链接

**Payment links to create · 需创建的支付链接:**

| Link Name · 链接名称 | Amount · 金额 | Description · 描述 |
|--------------------|--------------|-------------------|
| Commission Deposit — $150 · 定制定金150美元 | $150 USD | "Custom Commission Deposit — Silora Orient" |
| Commission Deposit — $200 · 定制定金200美元 | $200 USD | "Custom Commission Deposit — Silora Orient" |
| Commission Deposit — $300 · 定制定金300美元 | $300 USD | "Custom Commission Deposit — Silora Orient" |
| Commission Balance · 定制尾款 | Variable (enter at send) · 可变 | Use "custom amount" link type |

**How to use payment links · 支付链接使用方式:**

When a commission is approved and a deposit is due:
当定制订单获批且需收取定金时：

1. Open the relevant Stripe payment link  
   打开对应的Stripe支付链接
2. Add customer name in the "additional information" field if available  
   如有可用，在"附加信息"字段填写客户姓名
3. Copy the link and include it in the approval email to the customer  
   复制链接并在发送给客户的审批邮件中附上
4. Stripe sends automatic receipt to customer on payment  
   付款后Stripe自动发送收据给客户
5. Update Airtable commission record: Payment Status = Deposit Paid  
   更新Airtable定制订单记录：支付状态 = 已付定金

**Deliverable · 交付成果:** Three standard deposit links live in Stripe; first commission payment collected through the system · Stripe中三条标准定金链接上线；首笔定制款项通过系统收取

---

## Priority 2 · 优先级2 — Build Forward Momentum · 构建持续动力

*Complete after all P1 tasks are done. These tasks build the infrastructure needed for ongoing operations.*

*所有P1任务完成后执行。这些任务构建持续运营所需的基础设施。*

---

### Task 1.2.A — Configure Mailchimp Welcome Automation
### 任务1.2.A — 配置Mailchimp欢迎自动化序列

**Priority · 优先级:** P2  
**Module · 模块:** M-6 Growth & Analytics  
**Effort · 工作量:** 2–3 hours · 2-3小时  
**Depends on · 依赖:** Task 1.0.B (Mailchimp connected, subscribers flowing in) · 任务1.0.B已完成  
**Owner · 负责人:** Founder · 创始人

**What this does · 功能说明:**  
Every new subscriber automatically receives a 3-email welcome sequence. This runs without any manual action, nurturing new subscribers toward the brand, the collection, and a potential commission.

每位新订阅者自动收到3封欢迎序列邮件。无需任何手动操作即可运行，将新订阅者引导至品牌、系列作品及潜在定制。

**Automation setup in Mailchimp · Mailchimp自动化配置:**

Navigate to: Automations → Customer Journeys → Create Journey  
路径：自动化 → 客户旅程 → 创建旅程

Trigger: Subscribes to audience · 触发器：订阅受众列表

**Email 1 — Immediate (0 delay) · 邮件1 — 即刻（无延迟）**

```
Subject: Welcome to Silora Orient · 欢迎来到 Silora Orient

[Brand header image]

Thank you for joining us.

Silora Orient began in a Chinese silk flower workshop — five years of thread, wire, and patience. It arrived in New York in spring 2026, carrying the story of a Spanish pianist and the earrings we made for her eyes instead of the ones she asked for.

That is the kind of brand we are. Every piece is a story. Every commission is a conversation.

You will hear from us when there is something worth telling: a new collection, a new story, a workshop, a quarterly issue.

Until then — welcome.

[Explore the Collection] [Learn Our Story]
```

**Email 2 — Day 3 · 邮件2 — 第3天**

```
Subject: The story behind the Eye Color Collection · 眼色系列背后的故事

[Image: orchid earrings in blue and blush]

She came to order cherry blossom earrings.

We looked up and saw her eyes — Mediterranean blue with a hint of morning grey. She was a Spanish pianist, far from home, telling us about the sea she had left behind.

We put the cherry blossom earrings aside. We made something for her eyes instead.

That unplanned piece is why the Eye Color Collection exists.

Every piece in the collection is named for an eye color that exists in the world. Every piece begins with a question: what is the color of your eyes?

[See the Eye Color Collection]
```

**Email 3 — Day 7 · 邮件3 — 第7天**

```
Subject: If you've ever wanted a piece made just for you · 如果你曾想要一件专为你而作的珠宝

[Image: process photo — silk, wire, hands]

Every custom commission begins with a conversation.

We ask about your eyes. We ask about your memories. We ask what a flower means to you, and why. Then we disappear into the studio and come back with something we have never made before — and will never make again.

If there is a story you've been carrying — we would like to hear it.

[Begin Your Custom Order]
```

**Deliverable · 交付成果:** Three-email welcome sequence live; all new subscribers automatically receive the sequence; brand narrative delivered within one week of signup · 三封欢迎序列上线；所有新订阅者自动接收序列；注册后一周内完成品牌叙事传达

---

### Task 1.2.B — Build B2B Partner Database (Initial 50 Targets)
### 任务1.2.B — 建立B2B合作方数据库（初始50条目标记录）

**Priority · 优先级:** P2  
**Module · 模块:** M-4 B2B & Outreach  
**Effort · 工作量:** 3–4 hours research + 1 hour Airtable setup · 3-4小时调研 + 1小时Airtable配置  
**Depends on · 依赖:** Task 1.0.C (Airtable base live) · 任务1.0.C已完成  
**Owner · 负责人:** Founder or B2B Manager · 创始人或B2B负责人

**What this does · 功能说明:**  
Creates a structured database of the first 50 B2B outreach targets in New York. With this in place, outreach becomes systematic rather than ad hoc — every contact has a record, every action has a date, and nothing falls through.

创建纽约首批50个B2B外联目标的结构化数据库。有了这个基础，外联工作变得系统化而非临时性——每个联系人都有记录，每次行动都有日期，不再遗漏任何事项。

**Table to add to Airtable base · 添加至Airtable数据库的新表格:**

**Table 3: B2B Partners · 表三：B2B合作方**

| Field Name · 字段名 | Field Type · 类型 |
|--------------------|------------------|
| Business Name · 商业名称 | Single line text (primary · 主字段) |
| Website · 网站 | URL |
| Email · 邮箱 | Email |
| Phone · 电话 | Phone |
| Address · 地址 | Single line text |
| City · 城市 | Single line text |
| Category · 分类 | Single select (see values below) |
| Contact Person · 联系人 | Single line text |
| Contact Title · 联系人职位 | Single line text |
| Discovery Source · 发现来源 | Single select |
| Aesthetic Fit · 审美契合度 | Single select: Strong / Moderate / Weak / Unknown |
| Notes · 备注 | Long text |
| Status · 状态 | Single select (see values below) |
| Outreach Date · 外联日期 | Date |
| Last Follow-up · 最近跟进 | Date |
| Next Action Date · 下次行动日期 | Date |
| Reply Received · 已收到回复 | Checkbox |
| Reply Summary · 回复摘要 | Long text |
| Interest Level · 兴趣程度 | Single select: Low / Medium / High / Unknown |
| Proposal Sent · 已发提案 | Checkbox |
| Proposal Version · 提案版本 | Single line text |
| Sample Sent · 已寄样品 | Checkbox |
| Deal Status · 成交状态 | Single select: None / Negotiating / Closed / Declined / Paused |

**Status values · 状态值:**
```
Discovered · 已发现
Outreach Pending · 待外联
Outreached · 已外联
No Reply · 无回复
Replied · 已回复
Interested · 感兴趣
Proposal Sent · 已发提案
Sample Sent · 已寄样品
Negotiating · 谈判中
Deal Closed · 已成交
Declined · 已拒绝
Paused · 暂停
```

**Views to create · 需创建的视图:**

| View · 视图 | Filter · 筛选 | Purpose · 用途 |
|------------|--------------|---------------|
| All Partners · 所有合作方 | None | Full database |
| Outreach Queue · 外联队列 | Status = Outreach Pending | Priority daily list |
| Awaiting Reply · 等待回复 | Status = Outreached, Outreach Date < 14 days ago | Follow-up targets |
| Active Leads · 活跃线索 | Status = Interested or Negotiating | Warm pipeline |
| Follow Up Today · 今日跟进 | Next Action Date = Today | Daily action |
| Won · 已成交 | Status = Deal Closed | Wins tracker |

**Initial research targets · 初始调研目标方向:**

| Category · 分类 | NYC Search Terms · 纽约搜索关键词 |
|----------------|----------------------------------|
| Boutique jewelry stores · 精品珠宝店 | "handmade jewelry NYC", "artisan jewelry Brooklyn", "独立珠宝店纽约" |
| Concept stores · 概念店 | "concept store NYC", "multibrand boutique Manhattan" |
| Galleries · 画廊 | "craft gallery NYC", "contemporary jewelry gallery" |
| Cultural institutions · 文化机构 | Chinese cultural centers, Asian art museums, cultural gift shops |
| Stylists · 造型师 | NYC editorial stylists on Instagram with artisan aesthetic |

**Deliverable · 交付成果:** 50 records entered in Airtable B2B table with at minimum: business name, website, email, category, and status = Discovered. Outreach Queue view shows prioritized first-contact list · 50条记录录入Airtable B2B表格，至少包含：商业名称、网站、邮箱、分类、状态=已发现。外联队列视图显示优先级排序的首次联系清单

---

## Phase 1 Completion Checklist · 第一阶段完成核查清单

Use this checklist to confirm Phase 1 is complete before moving to Phase 2.  
在进入第二阶段之前，使用此核查清单确认第一阶段已完成。

### P0 — Critical Fixes · P0 — 关键修复

- [ ] GA4 property created, Measurement ID retrieved  
  GA4属性已创建，测量ID已获取
- [ ] GA4 script added to all 9 HTML files (`index`, `about`, `collections`, `other-collections`, `custom`, `stories`, `journal`, `documentary`, `contact`)  
  GA4脚本已添加至全部9个HTML文件
- [ ] GA4 verified: real-time report shows active users on site  
  GA4已验证：实时报告显示网站上的活跃用户
- [ ] Mailchimp account created, audience configured  
  Mailchimp账户已创建，受众列表已配置
- [ ] `/api/subscribe.js` created and deployed to Vercel  
  `/api/subscribe.js`已创建并部署至Vercel
- [ ] Environment variables set in Vercel: `MAILCHIMP_API_KEY`, `MAILCHIMP_AUDIENCE_ID`, `MAILCHIMP_DC`  
  Vercel中已设置环境变量
- [ ] Newsletter form tested: submit email → appears in Mailchimp audience within 30 seconds  
  订阅表单已测试：提交邮箱 → 30秒内出现在Mailchimp受众列表中
- [ ] Airtable base created: `SILORA ORIENT — Operations`  
  Airtable数据库已创建
- [ ] Customers table built with all required fields  
  客户表已建立，含所有必填字段
- [ ] Commissions table built with all required fields and status values  
  定制订单表已建立，含所有必填字段和状态值
- [ ] Six Airtable views created for commissions  
  已创建六个定制订单视图

### P1 — Channel Connections · P1 — 渠道连接

- [ ] Zapier or Make account created  
  Zapier或Make账户已创建
- [ ] Zap created: Formspree submission → Airtable Customer + Commission records  
  Zap已创建：Formspree提交 → Airtable客户+定制订单记录
- [ ] Zap tested: submit test form → records appear in Airtable  
  Zap已测试：提交测试表单 → 记录出现在Airtable中
- [ ] Cal.com account created, Google Calendar connected  
  Cal.com账户已创建，Google日历已连接
- [ ] Consultation event type configured (45 min, buffer, availability)  
  咨询活动类型已配置（45分钟、缓冲时间、可用性）
- [ ] Confirmation email copy customized in Cal.com  
  Cal.com中确认邮件文案已自定义
- [ ] Cal.com booking widget embedded in `custom.html`  
  Cal.com预约插件已嵌入`custom.html`
- [ ] Stripe account created and verified  
  Stripe账户已创建并验证
- [ ] Three deposit payment links created ($150, $200, $300)  
  已创建三条定金支付链接（150、200、300美元）
- [ ] Test payment completed on Stripe (using test mode)  
  Stripe测试支付已完成（使用测试模式）

### P2 — Forward Momentum · P2 — 持续动力

- [ ] Mailchimp Customer Journey created  
  Mailchimp客户旅程已创建
- [ ] Three welcome emails written in brand voice (EN, or EN + ZH)  
  三封欢迎邮件已使用品牌语言撰写（英文，或英中双语）
- [ ] Welcome automation tested: subscribe test email → all three emails received  
  欢迎自动化已测试：订阅测试邮箱 → 收到全部三封邮件
- [ ] B2B Partners table added to Airtable  
  B2B合作方表已添加至Airtable
- [ ] Six B2B views created  
  已创建六个B2B视图
- [ ] 50 initial B2B target records entered  
  已录入50条初始B2B目标记录

---

## Dependencies Map · 依赖关系图

```
GA4 account
    └─→ Task 1.0.A (install GA4)
            └─→ Custom events in main.js (1.5, after P0)

Mailchimp account
    └─→ Task 1.0.B (connect newsletter form)
            └─→ Task 1.2.A (welcome automation)

Airtable account
    └─→ Task 1.0.C (commission tracker)
            ├─→ Task 1.1.A (Formspree sync) — depends on Airtable base
            └─→ Task 1.2.B (B2B database) — adds table to same base

Zapier / Make account
    └─→ Task 1.1.A (Formspree sync) — depends on Airtable (1.0.C)

Cal.com account + Google Calendar
    └─→ Task 1.1.B (booking embed on custom.html)

Stripe account (verified)
    └─→ Task 1.1.C (payment links)
            └─→ Phase 2: Stripe deposit flow in commission workflow
```

---

## What Phase 1 Does Not Solve · 第一阶段未解决的问题

The following are intentionally deferred. They are important but do not need to be addressed before Phase 1 is complete.

以下内容已有意推迟。这些内容很重要，但不需要在第一阶段完成之前解决。

| Deferred Item · 推迟事项 | Why Deferred · 推迟原因 | Target Phase · 目标阶段 |
|-------------------------|------------------------|------------------------|
| Journal/content CMS · 日记/内容管理系统 | Git push is acceptable at current volume · 当前体量下git push可接受 | Phase 2 |
| Workshop public page · 工作坊公开页面 | Booking system must be stable first · 预约系统必须先稳定 | Phase 2 |
| Customer story second entry · 第二个客户故事 | Demonstrates Phase 2 intake process · 演示第二阶段采集流程 | Phase 2 |
| Quarterly issue dispatch · 季刊发送 | Mailchimp must be live and tested first · Mailchimp必须先上线并测试 | Phase 2 |
| B2B outreach begin · B2B外联启动 | Database must be built first · 数据库必须先建立 | After 1.2.B complete |
| Analytics review process · 分析审查流程 | Need 2–4 weeks of data first · 需要先积累2-4周数据 | Week 3 of Phase 1 |
| Custom admin dashboard · 自定义管理后台 | SaaS tools are sufficient now · 当前SaaS工具已足够 | Phase 3 |
| Unified backend database · 统一后端数据库 | Volume does not justify it yet · 体量尚未达到需要的程度 | Phase 3 |
| Privacy policy and consent management · 隐私政策与授权管理 | Should be reviewed alongside legal counsel · 应与法律顾问同步审查 | Phase 2 |

---

## Success Metrics for Phase 1 · 第一阶段成功指标

At the end of Phase 1, the following should be true:

第一阶段结束时，以下指标应达成：

| Metric · 指标 | Target · 目标 | How to Verify · 验证方式 |
|--------------|--------------|-------------------------|
| GA4 data flowing · GA4数据流入 | 100% of pages tracked · 100%页面已追踪 | GA4 realtime report · GA4实时报告 |
| Newsletter connected · 订阅表单已连接 | 0 fake subscribers; all new signups real · 0个假订阅者；所有新注册均为真实 | Mailchimp audience list · Mailchimp受众列表 |
| Commission tracker live · 定制订单追踪上线 | All active commissions logged · 所有活跃订单已记录 | Airtable view · Airtable视图 |
| Formspree sync working · Formspree同步运行 | Next inquiry appears in Airtable automatically · 下一条询价自动出现在Airtable | Submit test form · 提交测试表单 |
| Booking available · 预约可用 | Consultation slots visible and bookable · 咨询时间段可见且可预约 | Test booking on custom.html · 在custom.html测试预约 |
| Payment ready · 支付就绪 | At least one deposit collected via Stripe · 至少一笔定金通过Stripe收取 | Stripe dashboard · Stripe后台 |
| Welcome automation active · 欢迎自动化已激活 | Test subscriber receives 3 emails in 7 days · 测试订阅者在7天内收到3封邮件 | Test subscribe with personal email · 用个人邮箱测试订阅 |
| B2B database built · B2B数据库已建立 | 50 records, all with email and status · 50条记录，均含邮箱和状态 | Airtable B2B table count · Airtable B2B表格计数 |

---

## Handoff to Phase 2 · 移交至第二阶段

Phase 2 begins when all Phase 1 success metrics are met and the team has operated the new infrastructure for at least 2 weeks.

当所有第一阶段成功指标达成，且团队已运营新基础设施至少2周后，第二阶段启动。

**Phase 2 preview · 第二阶段预览:**

- Notion editorial workspace for journal draft → review → approve pipeline  
  Notion编辑工作区，用于日记草稿→审核→审批流程
- Airtable commission kanban as daily operational board  
  Airtable定制订单看板作为每日运营面板
- Customer story intake form with consent tracking  
  含授权追踪的客户故事采集表单
- Workshop public page (`workshops.html`) with Cal.com booking  
  工作坊公开页面（`workshops.html`），集成Cal.com预约
- First B2B outreach campaign using database built in Phase 1  
  使用第一阶段建立的数据库开展首次B2B外联活动
- Quarterly issue dry run: full end-to-end test of editorial pipeline + email dispatch  
  季刊演练：编辑流程+邮件发送的完整端到端测试

---

*Document maintained by · 文档维护方: SILORA ORIENT founding team · 创始团队*  
*Version · 版本: 1.0 · April 2026 · 2026年4月*  
*Status · 状态: Active — update as tasks are completed · 进行中 — 任务完成后请更新*
