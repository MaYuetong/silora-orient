# SILORA ORIENT — Mailchimp Welcome Automation
# Mailchimp 欢迎自动化序列配置指南

**Version · 版本:** 1.0 · April 8, 2026  
**Purpose · 用途:** Configure a 3-email welcome sequence for every new Mailchimp subscriber · 为每位新Mailchimp订阅者配置3封欢迎邮件序列  
**Estimated setup time · 预计配置时间:** 2–3 hours  
**Prerequisite · 前提条件:** Phase 1 Task P0-B complete — Mailchimp connected, env vars set in Vercel, at least 1 real subscriber received · 第一阶段任务P0-B已完成——Mailchimp已连接，Vercel中已设置环境变量，至少已收到1位真实订阅者

---

## Overview · 概览

Every person who subscribes to the Silora Orient newsletter via the homepage form receives this 3-email sequence automatically. No founder action is required after setup. The sequence:

每位通过主页表单订阅Silora Orient新闻邮件的人都将自动收到这个3封邮件序列。配置完成后无需创始人任何操作。序列内容：

1. **Immediate (Email 1):** Welcome + full brand origin story · 即刻（邮件1）：欢迎 + 完整品牌起源故事
2. **Day 3 (Email 2):** The Eye Color Collection — the story and the invitation · 第3天（邮件2）：眼色系列——故事与邀请
3. **Day 7 (Email 3):** Custom commission invitation — begin a piece of your own · 第7天（邮件3）：定制委托邀请——开始属于你的作品

---

## Mailchimp Setup — Step by Step · Mailchimp配置——逐步指南

### Step 1: Access Customer Journeys · 步骤1：进入客户旅程

1. Log in to mailchimp.com with your Silora Orient account  
   使用Silora Orient账户登录mailchimp.com
2. Navigate to: **Automations → Customer Journeys → Create Journey**  
   进入：**自动化 → 客户旅程 → 创建旅程**
3. Name the journey: `Silora Orient — Welcome Sequence`  
   命名旅程：`Silora Orient — Welcome Sequence`
4. Select audience: `Silora Orient — Main List`  
   选择受众：`Silora Orient — Main List`

---

### Step 2: Set the Trigger · 步骤2：设置触发器

- **Trigger type · 触发器类型:** Joins audience · 加入受众列表
- **Audience · 受众:** Silora Orient — Main List
- **Filter (optional but recommended) · 过滤器（可选，建议设置）:**  
  Tag is `homepage_signup` — this ensures only website subscribers enter this journey, not manual imports  
  标签为`homepage_signup`——确保只有网站订阅者进入此旅程，而非手动导入的联系人

---

### Step 3: Add Emails to the Journey · 步骤3：添加邮件至旅程

Add 3 email actions in sequence. After the trigger, click **+ Add a journey point → Send an email**.

按顺序添加3个邮件操作。在触发器后，点击 **+ 添加旅程节点 → 发送邮件**。

| Email · 邮件 | Delay from previous step · 距上一步延迟 | Subject line · 主题行 |
|-----------|--------------------------------------|---------------------|
| Email 1 | 0 — send immediately · 0，立即发送 | Welcome to Silora Orient |
| Email 2 | 3 days · 3天 | The story behind the Eye Color Collection |
| Email 3 | 4 days after Email 2 (7 days total) · 邮件2后4天（共7天） | If you've ever wanted a piece made just for you |

---

## Email 1 — Welcome · 欢迎邮件

**Send timing · 发送时机:** Immediately on subscribe · 订阅后立即  
**Goal · 目标:** Orient the subscriber to who Silora Orient is; deliver the brand origin story in brand voice; create anticipation for what comes next · 让订阅者了解Silora Orient是谁；以品牌语气传递品牌起源故事；为接下来的内容创造期待

---

**Subject line (default) · 主题行（默认）:**
```
Welcome to Silora Orient
```

**Subject line (A/B test variant) · 主题行（A/B测试变体）:**
```
Something for your eyes
```

**Preview text · 预览文字:**
```
Every piece is a story. Every commission is a conversation.
```

---

**Email body · 邮件正文:**

```
[Brand header image — silk flower detail, 800px wide, cream #FAF7F2 background]

──────────────────────────────────────

Thank you for joining us.

Silora Orient began in a Chinese silk flower workshop — five years of thread,
wire, and patience. Every technique learned by hand. Every material chosen for
what it carries rather than what it costs.

It arrived in New York in spring 2026, carrying the story of a Spanish pianist
and the earrings we made for her eyes instead of the ones she had asked for.

She came to us wanting cherry blossoms. We looked up and saw Mediterranean blue
with a hint of morning grey — the color of the sea she had left behind. We made
something for her eyes instead. She wore them at her first New York concert.

That is the kind of brand we are. Every piece is a story.
Every commission is a conversation.

You will hear from us when there is something worth telling: a new collection,
a customer's story, a workshop, a quarterly issue.

Until then — welcome.

──────────────────────────────────────

[Button: Explore the Collection →]         [Button: Our Story →]

──────────────────────────────────────

SILORA ORIENT
Handmade silk flower jewelry · New York
silora-orient.vercel.app

You are receiving this because you subscribed at silora-orient.vercel.app.
[Unsubscribe] · [View in browser]
```

**Button URLs · 按钮链接:**
- "Explore the Collection" → `https://silora-orient.vercel.app/collections.html`
- "Our Story" → `https://silora-orient.vercel.app/about.html`

**Design notes · 设计说明:**
- Background: `#FAF7F2` (ivory) · 背景：米色
- Headline font: Cormorant Garamond, serif, 28px · 标题字体：Cormorant Garamond衬线体
- Body font: Jost, sans-serif, 16px, line-height 1.7 · 正文字体：Jost无衬线体
- Button: background `#BF9D6A` (gold), white text, no border radius · 按钮：金色背景，白色文字，无圆角
- Max width: 600px centered · 最大宽度：600像素居中

---

## Email 2 — The Eye Color Collection · 眼色系列

**Send timing · 发送时机:** 3 days after Email 1 · 邮件1发送后3天  
**Goal · 目标:** Tell the origin story of the signature collection; show the product; invite curiosity without a hard sell · 讲述标志性系列的起源故事；展示产品；激发好奇心，不强行推销

---

**Subject line (default) · 主题行（默认）:**
```
The story behind the Eye Color Collection
```

**Subject line (A/B test variant) · 主题行（A/B测试变体）:**
```
She didn't want the earrings we made for her
```

**Preview text · 预览文字:**
```
She came to order cherry blossom earrings. We made something else entirely.
```

---

**Email body · 邮件正文:**

```
[Product image — orchid earrings in blue and blush, white background, 800px wide]

──────────────────────────────────────

She came to order cherry blossom earrings.

We looked up and saw her eyes — Mediterranean blue with a hint of morning grey.
She was a Spanish pianist, far from home, telling us about the sea she had left
behind.

We put the cherry blossom earrings aside. We made something for her eyes instead.

She wore them at her first New York concert. That unplanned piece is why the
Eye Color Collection exists.

──────────────────────────────────────

Every piece in the collection is named for an eye color that exists in the world.
Hazel autumn. Morning grey. Deep amber. Coastal blue.

Every piece begins with a question: what is the color of your eyes?

The collection changes. Some colors are made once and never again.
Others return when the right material arrives.

──────────────────────────────────────

[Button: See the Eye Color Collection →]

──────────────────────────────────────

SILORA ORIENT
Handmade silk flower jewelry · New York
silora-orient.vercel.app

[Unsubscribe] · [View in browser]
```

**Button URLs · 按钮链接:**
- "See the Eye Color Collection" → `https://silora-orient.vercel.app/collections.html`

**Design notes · 设计说明:**
- Same template as Email 1
- Lead image: orchid earrings product photo (not process photo) — this is the first time the subscriber sees the actual product  
  首图：兰花耳环产品照片（不使用制作过程照片）——这是订阅者第一次看到实际产品
- A/B test: swap lead image for process photo (hands + silk thread) — see which drives more clicks  
  A/B测试：将首图换为制作过程照片（双手+丝线）——观察哪种方式带来更多点击

---

## Email 3 — Custom Commission Invitation · 定制委托邀请

**Send timing · 发送时机:** 4 days after Email 2 (7 days total from subscribe) · 邮件2发送后4天（订阅后共7天）  
**Goal · 目标:** Convert curious subscribers into custom commission inquiries; make the process feel personal and accessible, not transactional · 将好奇的订阅者转化为定制委托询价；使流程感觉个人化和易于接触，而非交易性

---

**Subject line (default) · 主题行（默认）:**
```
If you've ever wanted a piece made just for you
```

**Subject line (A/B test variant) · 主题行（A/B测试变体）:**
```
Tell us your story
```

**Preview text · 预览文字:**
```
Every custom commission begins with a conversation — about your eyes, your memories, your story.
```

---

**Email body · 邮件正文:**

```
[Process image — hands working with silk thread and wire, warm light, 800px wide]

──────────────────────────────────────

Every custom commission begins with a conversation.

We ask about your eyes. We ask about your memories. We ask what a flower means
to you, and why — whether it is your grandmother's garden, a city you left behind,
or a season that changed something in you.

Then we disappear into the studio and come back with something we have never made
before — and will never make again.

We do not make the piece you describe. We make the piece that comes from the story
you tell us. There is a difference.

──────────────────────────────────────

If there is a story you have been carrying — we would like to hear it.

The process:
→ You fill in the custom order form (ten minutes)
→ We schedule a 45-minute conversation
→ We design something made only for you

──────────────────────────────────────

[Button: Begin Your Custom Order →]

──────────────────────────────────────

If a commission is not the right fit right now, that is perfectly fine.
You will hear from us again when the next collection is ready, when a workshop
opens, or when there is a story worth telling.

──────────────────────────────────────

SILORA ORIENT
Handmade silk flower jewelry · New York
silora-orient.vercel.app

[Unsubscribe] · [View in browser]
```

**Button URLs · 按钮链接:**
- "Begin Your Custom Order" → `https://silora-orient.vercel.app/custom.html`

**Design notes · 设計说明:**
- Lead image: process photo (hands + silk + wire) — contrast with Email 2's product shot; this email is about craft and relationship  
  首图：制作过程照片——与邮件2的产品照形成对比；本邮件关于工艺与关系
- The closing paragraph ("If a commission is not the right fit") reduces unsubscribe anxiety — keep it  
  结尾段落（"如果目前定制不适合"）可降低退订焦虑——保留此内容
- A/B test: CTA button text "Begin Your Custom Order" vs "Tell us your story" — test which conversion rate is higher  
  A/B测试：CTA按钮文字"开始定制"vs"告诉我们你的故事"——测试哪个转化率更高

---

## A/B Test Recommendations · A/B测试建议

Run each A/B test independently — one variable at a time.

每次独立运行A/B测试——每次只测试一个变量。

| Email · 邮件 | Variable · 变量 | Variant A · 方案A | Variant B · 方案B | Metric to watch · 关注指标 |
|-----------|--------------|----------------|----------------|--------------------------|
| Email 1 | Subject line · 主题行 | "Welcome to Silora Orient" | "Something for your eyes" | Open rate · 打开率 |
| Email 2 | Lead image · 首图 | Product photo (orchid earrings) | Process photo (hands + silk) | Click rate · 点击率 |
| Email 3 | Subject line · 主题行 | "If you've ever wanted a piece made just for you" | "Tell us your story" | Open rate · 打开率 |
| Email 3 | CTA button text · CTA按钮文字 | "Begin Your Custom Order" | "Tell us your story" | Click-to-open rate · 点击打开率 |

**How to set up A/B test in Mailchimp · 如何在Mailchimp中设置A/B测试:**

1. In the email editor, click the subject line field  
   在邮件编辑器中，点击主题行字段
2. Toggle "A/B test" switch ON  
   开启"A/B测试"开关
3. Enter both variants  
   输入两个变体
4. Set split: 50/50  
   设置分配比例：50/50
5. Winning condition: Open rate (for subject line tests), Click rate (for content tests)  
   获胜条件：主题行测试用打开率，内容测试用点击率
6. Let Mailchimp automatically send the winning variant after 4 hours  
   让Mailchimp在4小时后自动发送获胜变体

---

## Success Metrics · 成功指标

Review these in Mailchimp → Reports → Customer Journeys after the first 30 days.

在Mailchimp → 报告 → 客户旅程中，于首30天后审查以下指标。

| Metric · 指标 | Industry average · 行业均值 | Silora Orient target · 目标 | Action if below target · 低于目标时的操作 |
|------------|--------------------------|---------------------------|----------------------------------------|
| Email 1 open rate · 邮件1打开率 | 40–50% (welcome emails) | >50% | Test new subject line · 测试新主题行 |
| Email 2 open rate · 邮件2打开率 | 25–35% | >30% | Review Email 1 — are subscribers engaged? · 审查邮件1——订阅者是否在互动？ |
| Email 3 open rate · 邮件3打开率 | 20–30% | >25% | Test subject line variant · 测试主题行变体 |
| Overall click-to-open rate · 整体点击打开率 | 10–15% | >15% | Test CTA button text and image · 测试CTA按钮文字和图片 |
| Email 3 → `custom.html` clicks · 邮件3→定制页面点击 | — | >5% of Email 3 opens | Rewrite Email 3 body — shorten, make process clearer · 重写邮件3正文——缩短，使流程更清晰 |
| Unsubscribe rate (any email) · 退订率（任意邮件） | <0.5% | <0.3% | Review content relevance and send timing · 审查内容相关性和发送时机 |

---

## Testing Before Going Live · 上线前的测试

Before activating the journey for real subscribers:

在为真实订阅者激活旅程之前：

1. Activate journey in **draft/paused** mode  
   以**草稿/暂停**模式激活旅程
2. Add your personal email address as a test contact  
   将你的个人邮箱添加为测试联系人
3. Manually trigger the journey for your test contact  
   手动为测试联系人触发旅程
4. Confirm all 3 emails arrive with correct timing  
   确认全部3封邮件以正确时间到达
5. Click all buttons — verify links go to correct URLs  
   点击所有按钮——验证链接指向正确URL
6. View emails in mobile and desktop (Mailchimp preview tool)  
   在移动端和桌面端查看邮件（Mailchimp预览工具）
7. **Then** set journey to ON · 然后将旅程设置为开启

---

## Ongoing Operations · 日常运维

### Monthly review · 每月审查

Check Mailchimp → Automations → Customer Journeys → Silora Orient Welcome Sequence:

在Mailchimp → 自动化 → 客户旅程 → Silora Orient欢迎序列中检查：

- Total emails sent this month · 本月总发送邮件数
- Open rates per email vs. previous month · 各邮件打开率与上月对比
- Click rates per email · 各邮件点击率
- Any spam complaints (should be 0) · 任何垃圾邮件投诉（应为0）

### When to update the emails · 何时更新邮件

| Trigger · 触发情形 | Action · 操作 |
|-----------------|-------------|
| New collection launched · 新系列发布 | Update Email 2 image and add 1 line mentioning the new collection · 更新邮件2图片，添加1行提及新系列 |
| New customer story available · 新客户故事可用 | Replace Email 1 brand story section with a customer story (keep one, rotate them) · 用客户故事替换邮件1品牌故事部分 |
| Workshop season begins · 工作坊季节开始 | Add workshop mention + link to Email 3 above the CTA · 在邮件3的CTA上方添加工作坊提及+链接 |
| Email 1 open rate drops below 40% · 邮件1打开率低于40% | Test new subject lines · 测试新主题行 |
| Email 3 click rate below 5% · 邮件3点击率低于5% | Shorten Email 3 body; move CTA higher · 缩短邮件3正文；将CTA提前 |

---

## Troubleshooting · 故障排查

| Problem · 问题 | Likely cause · 可能原因 | Fix · 解决方案 |
|------------|----------------------|--------------|
| No subscribers entering the journey · 无订阅者进入旅程 | Journey is paused, or trigger tag filter is wrong · 旅程已暂停，或触发器标签过滤器有误 | Check journey status (ON); check trigger filter matches tag `homepage_signup` · 检查旅程状态（开启）；检查触发器过滤器与标签`homepage_signup`匹配 |
| Emails going to spam · 邮件进入垃圾邮件 | Domain not authenticated · 域名未验证 | Mailchimp → Account → Domains → Authenticate your domain with SPF + DKIM records · Mailchimp → 账户 → 域名 → 使用SPF+DKIM记录验证你的域名 |
| Subscriber receives Email 1 but not Email 2 · 订阅者收到邮件1但未收到邮件2 | Journey has an error on step 2 · 旅程步骤2有错误 | Check Customer Journey map in Mailchimp for error flags · 在Mailchimp客户旅程地图中检查错误标记 |
| Buttons not clickable in email · 邮件中按钮无法点击 | URL is missing protocol · URL缺少协议 | Ensure all URLs start with `https://` · 确保所有URL以`https://`开头 |
| Open rate very low (<20%) despite good list · 打开率很低（<20%），但名单质量良好 | Send time is wrong for audience · 发送时间对受众不合适 | Try scheduling Email 1 at 10am EST Tuesday or Thursday (Mailchimp "send time optimization") · 尝试在美东时间周二或周四上午10点发送邮件1（Mailchimp"发送时间优化"） |

---

## Mailchimp Dashboard Quick Reference · Mailchimp后台快速参考

| Task · 任务 | Path · 路径 |
|------------|------------|
| View journey performance · 查看旅程表现 | Automations → Customer Journeys → [Journey name] → Reports |
| Edit email copy · 编辑邮件文案 | Automations → Customer Journeys → [Journey name] → Edit → [Email] → Edit email |
| Pause the journey · 暂停旅程 | Automations → Customer Journeys → [Journey name] → Pause |
| View subscriber list · 查看订阅者列表 | Audience → All contacts |
| Export subscriber list · 导出订阅者列表 | Audience → All contacts → Export |
| View tag breakdown · 查看标签分布 | Audience → Tags → homepage_signup |

---

*Document version: 1.0 · April 8, 2026*  
*Email copy is final and ready to paste into Mailchimp*  
*Next: Task 1.2.B — B2B partner database (50 initial NYC targets in Airtable)*
