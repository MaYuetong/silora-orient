# SILORA ORIENT — Dashboard UI Specification
# SILORA ORIENT — 管理后台UI规格说明

**Version · 版本:** 1.0  
**Date · 日期:** April 2026 · 2026年4月  
**Applies to · 适用于:** `/dashboard/*` — Next.js internal dashboard · Next.js内部管理后台  
**Stack · 技术栈:** Next.js 14 · Tailwind CSS · shadcn/ui · Supabase Auth

---

## 1. Global Layout · 全局布局

All dashboard pages share the same shell layout. No exceptions.

所有后台页面共享相同的外壳布局。无例外。

```
┌─────────────────────────────────────────────────────────┐
│ TOP BAR                                                  │
│ [≡ SILORA ORIENT]   [breadcrumb path]   [🔔] [👤 Name ▾]│
├─────────────┬───────────────────────────────────────────┤
│             │  PAGE HEADER                               │
│  SIDEBAR    │  Title                    [action button] │
│             │  Subtitle / description                    │
│  Overview   │─────────────────────────────────────────  │
│  ─────────  │                                           │
│  Brand CMS  │  MAIN CONTENT AREA                        │
│  Studio     │                                           │
│  CRM        │                                           │
│  B2B        │                                           │
│  Community  │                                           │
│  Analytics  │                                           │
│  ─────────  │                                           │
│  Media      │                                           │
│  Review ●   │  (● = badge count)                        │
│  ─────────  │                                           │
│  Settings   │                                           │
│             │                                           │
└─────────────┴───────────────────────────────────────────┘
```

### Top Bar · 顶部栏

- **Left · 左侧:** Logo mark + "SILORA ORIENT" wordmark (links to `/dashboard/`) · 标志+品牌名（链接至概览页）
- **Center · 中间:** Breadcrumb path (e.g., `Studio → Commission #42 → Photos`) · 面包屑路径
- **Right · 右侧:** Notification bell (badge = pending review count) + User avatar dropdown (Profile / Sign out) · 通知铃（徽章=待审核数量）+用户头像下拉

### Sidebar · 侧边栏

- Width: 220px, fixed, no collapse on desktop · 宽度：220px，固定，桌面端不折叠
- Mobile: collapses to hamburger (top-left `≡`) · 移动端：折叠为汉堡菜单
- Active item: left gold border (`border-l-2 border-[--gold]`) + `--text-dark` weight 600 · 活跃项：左金色边框+深色加粗文字
- Inactive items: `--text-mid` weight 400 · 非活跃项：中等灰色普通字重
- Review badge: `rounded-full bg-[--gold] text-white text-xs px-1.5` · 审核徽章：金色圆形徽章

### Color and Typography · 颜色与字体

| Element · 元素 | Spec · 规格 |
|--------------|-----------|
| Page background · 页面背景 | `--ivory` `#FAF7F2` |
| Sidebar background · 侧边栏背景 | `--cream` `#F2EDE5` |
| Card background · 卡片背景 | white `#FFFFFF` |
| Top bar background · 顶部栏背景 | white, `border-b border-[--border]` |
| Heading font · 标题字体 | Cormorant Garamond, serif, 24px/28px |
| Body font · 正文字体 | Jost, sans-serif, 14px/16px |
| Label font · 标签字体 | Jost, 12px, `--text-light`, uppercase, tracking-wide |
| Primary button · 主要按钮 | `bg-[--gold] text-white hover:bg-[--gold-light]` |
| Secondary button · 次要按钮 | `border border-[--border] text-[--text-dark] hover:bg-[--cream]` |
| Danger button · 危险按钮 | `border border-red-200 text-red-700 hover:bg-red-50` |

### Status Badge Component · 状态徽章组件

Used on every content item to show its workflow state.

用于每个内容项以显示其工作流状态。

| State · 状态 | Badge style · 徽章样式 |
|-----------|---------------------|
| `draft` | `bg-[--cream] text-[--text-light]` |
| `uploaded` | `bg-amber-50 text-amber-700 border border-amber-200` |
| `under_review` | `bg-orange-50 text-orange-700 border border-orange-200` |
| `needs_revision` | `bg-red-50 text-red-700 border border-red-200` |
| `approved` | `bg-green-50 text-green-700 border border-green-200` |
| `scheduled` | `bg-teal-50 text-teal-700 border border-teal-200` |
| `published` | `bg-emerald-100 text-emerald-800 border border-emerald-300` |
| `archived` | `bg-[--cream] text-[--text-light] line-through` |

---

## 2. Founder Overview · 创始人概览

**Route · 路径:** `/dashboard/`  
**Roles · 角色:** `founder`, `co_founder`, `admin`  
**Purpose · 目的:** Single-screen summary of the entire brand operation · 整个品牌运营的单屏摘要

### Layout · 布局

```
PAGE HEADER
"Overview"           [Today's date]

KPI TILES (4 per row)
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ 📧       │ │ 📝       │ │ 🔨       │ │ 📅       │
│ New      │ │ New      │ │ Active   │ │ Upcoming │
│ Subscri- │ │ Inquiries│ │ Commis-  │ │ Consult- │
│ bers     │ │ (7d)     │ │ sions    │ │ ations   │
│ +12      │ │ 3        │ │ 7        │ │ 2        │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ 🏢       │ │ 🎪       │ │ 📋       │ │ 💰       │
│ B2B      │ │ Workshop │ │ Pending  │ │ Revenue  │
│ Replies  │ │ Signups  │ │ Approval │ │ (month)  │
│ (7d)     │ │ (next)   │ │          │ │          │
│ 5        │ │ 6/8      │ │ 4        │ │ $1,250   │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

TWO COLUMNS
┌─────────────────────────┐ ┌─────────────────────────┐
│ ACTIVITY FEED           │ │ QUICK ACTIONS            │
│                         │ │ [+ New Commission]       │
│ ● New inquiry — Jane W. │ │ [+ Add B2B Partner]      │
│   2 hours ago           │ │ [↑ Upload Media]         │
│ ● Deposit paid — #42    │ │ [📋 View Review Queue]   │
│   4 hours ago           │ │                          │
│ ● B2B reply — SoHo Co.  │ │ COMMISSIONS BY STATUS   │
│   Yesterday             │ │ Inquiry          ████ 3  │
│ ● New subscriber        │ │ In Production    ██   2  │
│   Yesterday             │ │ Awaiting Payment ███  2  │
│ ● Upload pending review │ │ Shipped          █    1  │
│   2 days ago            │ │ [View All]               │
└─────────────────────────┘ └─────────────────────────┘
```

### KPI Tile Component · KPI卡片组件

Each tile:
- Icon (24px) · 图标
- Label (12px, uppercase, `--text-light`) · 标签
- Value (32px, Cormorant Garamond, `--text-dark`) · 数值
- Subtext (12px, `--text-mid`) e.g. "vs last week +8%" · 副文字
- Link to relevant section · 链接至相关区域
- Border: `border border-[--border]`, background: white, radius: `rounded-lg` · 边框/背景/圆角

---

## 3. Brand CMS · 品牌内容管理

**Route · 路径:** `/dashboard/cms/`  
**Roles · 角色:** `founder`, `editor` (submit only), `admin`

### 3.1 Journal Entry List · 日记条目列表

**Route:** `/dashboard/cms/`

```
PAGE HEADER
"Brand CMS — Journal"    [+ New Entry]

FILTER BAR
[All] [Draft] [Under Review] [Approved] [Published] [Archived]
[Search entries...]                              [Sort: Newest ▾]

ENTRY LIST (table)
┌──────────────────────────────────────────────────────┐
│ Title              │ Status     │ Date      │ Actions │
├────────────────────┼────────────┼───────────┼─────────┤
│ The Eye Color...   │ ● Published│ Apr 2026  │ Edit    │
│ Workshop Recap...  │ ● Draft    │ Apr 2026  │ Edit    │
│ Spring Thoughts... │ ● Review   │ Mar 2026  │ Review  │
└──────────────────────────────────────────────────────┘
```

### 3.2 Create / Edit Entry · 创建/编辑条目

**Route:** `/dashboard/cms/new` or `/dashboard/cms/[id]`

```
← Back to Journal

ENTRY EDITOR
┌────────────────────────────────────────────────────┐
│ Title (EN) _______________________________________ │
│ Title (ZH) _______________________________________ │
│                                                    │
│ Category [Journal ▾]    Tags [+ add tag]           │
│                                                    │
│ Body (EN) ─────────────────────────────────────── │
│ [B] [I] [H2] [Link] [Image]                       │
│ ░░░░░░░░ rich text editor area ░░░░░░░░           │
│                                                    │
│ Body (ZH) ─────────────────────────────────────── │
│ ░░░░░░░░ rich text editor area ░░░░░░░░           │
│                                                    │
│ Cover image: [Upload ↑]  or drag here             │
│ [current image thumbnail]                          │
│                                                    │
│ Publish date: [____] (leave blank = immediate)    │
│                                                    │
│ Status: ● Draft                                   │
├────────────────────────────────────────────────────┤
│ [Save Draft]        [Submit for Review →]          │
└────────────────────────────────────────────────────┘
```

### 3.3 Customer Stories List · 客户故事列表

**Route:** `/dashboard/cms/stories/`

```
PAGE HEADER
"Customer Stories"    [+ New Story Record]

FILTER BAR
[All] [Consent Pending] [Consent Given] [Published] [Draft]

STORY LIST
┌───────────────────────────────────────────────────────────┐
│ Customer       │ Piece          │ Consent     │ Published  │
├────────────────┼────────────────┼─────────────┼────────────┤
│ Jane W.        │ Orchid Earrings│ ● Given     │ ✅ Yes     │
│ Maria S.       │ Camellia Ring  │ ⏳ Pending  │ — No       │
│ Anonymous      │ Rose Brooch    │ — Not asked │ — No       │
└───────────────────────────────────────────────────────────┘
```

Story detail view shows: customer link, piece link, story text, consent status, consent confirmation email, option to publish to `content/customer-stories.json`.

---

## 4. Product Studio · 产品工作室

**Route · 路径:** `/dashboard/studio/`  
**Roles · 角色:** `founder`, `co_founder`, `admin`

### 4.1 Commission List View · 定制订单列表视图

**Route:** `/dashboard/studio/`

```
PAGE HEADER
"Product Studio — Commissions"     [+ New Commission]

FILTER BAR
Status: [All ▾]  Customer: [All ▾]  Date: [All ▾]
[Search commissions...]                  [📊 Kanban view]

COMMISSION TABLE
┌────────────────────────────────────────────────────────────┐
│ # │ Customer   │ Piece Type │ Status      │ Payment │ Date │
├───┼────────────┼────────────┼─────────────┼─────────┼──────┤
│ 42│ Jane W.    │ Orchid     │ ●In Prod.   │ Deposit │ Apr  │
│ 41│ Maria S.   │ Camellia   │ ●Proposal   │ Unpaid  │ Mar  │
│ 40│ Tom K.     │ Lotus      │ ●Delivered  │ Full    │ Mar  │
└────────────────────────────────────────────────────────────┘
                                             [← 1 of 3 →]
```

### 4.2 Kanban Board View · 看板视图

**Route:** `/dashboard/studio/kanban`

Horizontal scroll. Each of the 14 status states is a column. Cards show: commission number, customer first name, flower type, days in current state.

水平滚动。14个状态中的每个是一列。卡片显示：定制编号、客户名、花卉类型、在当前状态的天数。

```
inquiry | consult_sched | consult_done | proposal | approved | deposit | in_prod | ...
┌─────┐  ┌─────┐        ┌─────┐       ┌─────┐    ┌─────┐    ┌─────┐   ┌─────┐
│ #43 │  │ #41 │        │     │       │     │    │ #42 │    │     │   │     │
│Jane │  │Maria│        │     │       │     │    │Jane │    │     │   │     │
│Iris │  │Cam. │        │     │       │     │    │Orch.│    │     │   │     │
│2d   │  │5d   │        │     │       │     │    │3d   │    │     │   │     │
└─────┘  └─────┘        └─────┘       └─────┘    └─────┘    └─────┘   └─────┘
[+]       [+]            [+]           [+]         [+]        [+]       [+]
```

Card click → Commission detail. Drag-and-drop to move status (with confirmation dialog for key transitions: approved, deposit_paid, in_production, shipped).

### 4.3 Commission Detail View · 定制订单详情视图

**Route:** `/dashboard/studio/[id]`

```
← Back to Studio

COMMISSION #42 — ORCHID EARRINGS
Customer: Jane W. → [view profile]    Status: ● In Production

STATUS TIMELINE
● inquiry (Apr 1) → ● consult (Apr 3) → ● approved (Apr 5)
→ ● deposit_paid (Apr 6) → [● in_production] → □ quality → □ ship...

COMMISSION DETAILS (two columns)
┌─────────────────────────┐ ┌────────────────────────────┐
│ PIECE INFORMATION       │ │ PAYMENT                     │
│ Flower type: Orchid     │ │ Total price: $450           │
│ Colors: Blue, pearl     │ │ Deposit: $150 ✅ paid       │
│ Eye color: Ocean blue   │ │ Balance due: $300           │
│ Symbolism: The sea she  │ │ [Send balance link →]       │
│   left behind           │ │ Stripe ID: pi_xxx           │
│ Size: Earrings, drop    │ └────────────────────────────┘
│ Special notes: —        │
│ [Edit piece details]    │
└─────────────────────────┘

PHOTOS (horizontal scroll)
┌───────┐ ┌───────┐ ┌───────┐ ┌──────────┐
│process│ │process│ │ final │ │    +     │
│ photo │ │ photo │ │ photo │ │ Upload   │
│ [↓]   │ │  [↓]  │ │  [↓]  │ │          │
└───────┘ └───────┘ └───────┘ └──────────┘

STATUS HISTORY
Apr 6 — deposit_paid — set by Founder
Apr 5 — approved — set by Founder ("approved after consultation notes review")
Apr 3 — consultation_complete — set by Co-founder
Apr 1 — inquiry — created by system

ACTIONS
[← Previous status]    [Move to Quality Review →]
[Request payment]       [Archive commission]
```

### 4.4 Create Commission · 创建定制订单

**Route:** `/dashboard/studio/new`

```
"New Commission"

Customer: [Search or create new customer ▾]
Flower type: _________    Colors: _________
Eye color: _____________  Size/type: ______
Symbolism notes: ________________________
Total price: $______  Deposit amount: $____
Inquiry date: [today]  Source: [Website ▾]

[Create Commission]
```

---

## 5. Client CRM · 客户关系管理

**Route · 路径:** `/dashboard/crm/`  
**Roles · 角色:** `founder`, `co_founder`, `admin` (full); `community_manager` (read-only)

### 5.1 Customer List · 客户列表

**Route:** `/dashboard/crm/`

```
PAGE HEADER
"Client CRM"    [+ Add Customer]

FILTER BAR
Stage: [All ▾]  Newsletter: [All ▾]  Has Story: [All ▾]
[Search customers...]

CUSTOMER TABLE
┌──────────────────────────────────────────────────────────────────┐
│ Name      │ Stage           │ Commissions │ Newsletter │ Last    │
├───────────┼─────────────────┼─────────────┼────────────┼─────────┤
│ Jane W.   │ ● Repeat Cust.  │ 2           │ ✅         │ Apr 6   │
│ Maria S.  │ ○ First Comm.   │ 1           │ ✅         │ Mar 20  │
│ Tom K.    │ ○ Prospect      │ 0           │ —          │ Apr 1   │
└──────────────────────────────────────────────────────────────────┘
```

Relationship stage dot colors match `--status-*` variables (Prospect = light, Ambassador = gold).

### 5.2 Customer Profile · 客户档案

**Route:** `/dashboard/crm/[id]`

```
← Back to CRM

JANE W.
● Repeat Customer    Newsletter: ✅ Subscribed    Story consent: ✅ Given

IDENTITY (two columns)
┌──────────────────────────────┐ ┌──────────────────────────────┐
│ Eye color: Ocean blue        │ │ First contact: Apr 1, 2026   │
│ Color preferences:           │ │ Workshops attended: 1        │
│   Blues, pearls, soft white  │ │ Total commissions: 2         │
│ Flower preferences: Orchid,  │ │ Brand relationship:          │
│   Iris, Cherry blossom       │ │   Repeat Customer            │
└──────────────────────────────┘ └──────────────────────────────┘

STORY NOTES (private — internal only)
She is a Spanish pianist who moved to NYC. Described the sea she left
behind. Made first piece for her eyes instead of what she requested.
This is the story behind the Eye Color Collection.
[Edit story notes]

FAMILY MEMORY NOTES
—

COMMISSIONS
┌────────────────────────────────────────┐
│ #42 — Orchid Earrings — In Production │ → view
│ #38 — Iris Ring — Delivered ✅        │ → view
└────────────────────────────────────────┘

INTERACTIONS LOG
Apr 6: Deposit received via Stripe
Apr 5: Commission #42 approved
Apr 3: Consultation held (45 min)
[+ Add note]

[Edit Profile]    [Send story invitation]    [Archive customer]
```

### 5.3 Edit Customer Profile · 编辑客户档案

**Route:** `/dashboard/crm/[id]/edit`

All 26 Airtable/Supabase fields presented in a structured form. Section groupings:
- Contact info · 联系信息
- Physical / aesthetic preferences · 外观/审美偏好
- Story + memory notes · 故事+记忆记录
- Relationship and consent flags · 关系和授权标志
- System fields (auto: first contact, last modified) · 系统字段

---

## 6. B2B Pipeline · B2B外联管道

**Route · 路径:** `/dashboard/b2b/`  
**Roles · 角色:** `founder`, `b2b_manager`, `admin` (full); `co_founder` (read-only)

### 6.1 Partner List · 合作方列表

**Route:** `/dashboard/b2b/`

```
PAGE HEADER
"B2B Pipeline"    [+ Add Partner]

FILTER BAR
Status: [All ▾]  Category: [All ▾]  Aesthetic Fit: [Strong ▾]
[Search partners...]                [📊 Queue view]

PARTNER TABLE
┌──────────────────────────────────────────────────────────────────┐
│ Business      │ Category  │ Status       │ Fit    │ Next action  │
├───────────────┼───────────┼──────────────┼────────┼──────────────┤
│ SoHo Crafts   │ Boutique  │ ● Interested │ Strong │ Apr 12 (2d)  │
│ Gallery 28    │ Gallery   │ ● Outreached │ Strong │ Apr 15 (5d)  │
│ Pearl & Fern  │ Concept   │ ○ Discovered │ Mod.   │ —            │
└──────────────────────────────────────────────────────────────────┘
```

### 6.2 Outreach Queue · 外联队列

**Route:** `/dashboard/b2b/queue`

Only shows status = `Outreach Pending` and `Outreached` (follow-up due). Sorted by Next Action Date ascending. Red highlight on rows where Next Action Date = today or past.

仅显示状态=`待外联`和`已外联`（跟进到期）。按下次行动日期升序排序。下次行动日期=今天或已过期的行显示红色高亮。

### 6.3 Partner Detail · 合作方详情

**Route:** `/dashboard/b2b/[id]`

```
← Back to B2B Pipeline

SOHO CRAFTS CO.
● Interested    Aesthetic Fit: Strong

CONTACT
Address: 123 Spring St, New York, NY 10012
Website: sohocrafts.com
Email: hello@sohocrafts.com
Contact: Sarah M. (Owner)
[Send email →] (opens mail client with pre-filled template)

OUTREACH LOG
Apr 6: Initial email sent — "Handmade silk flower jewelry"
Apr 8: Reply received — "Interested, can you bring samples?"
Apr 9: Note added — "Meeting scheduled for Apr 14"
[+ Add note]

DOCUMENTS
[proposal-v1.pdf]  [sample-photo.jpg]
[+ Attach document]

STATUS CONTROLS
Current: ● Interested
[← Back]  [Move to Negotiating →]
Next action date: [Apr 14] 
[Update]
```

---

## 7. Community Hub · 社群中心

**Route · 路径:** `/dashboard/community/`  
**Roles · 角色:** `founder`, `co_founder`, `community_manager`, `admin`

### 7.1 Community Overview · 社群概览

**Route:** `/dashboard/community/`

```
PAGE HEADER
"Community Hub"    [+ New Workshop]

TWO COLUMNS
┌───────────────────────────────┐ ┌───────────────────────────────┐
│ UPCOMING WORKSHOPS            │ │ RECENT BOOKINGS               │
│                               │ │                               │
│ Apr 14 — Beginner (6/8) [→]  │ │ Apr 8 — Jane W. consult [→]  │
│ Apr 21 — Advanced (4/6) [→]  │ │ Apr 7 — Maria S. consult [→] │
│ May 5  — Beginner (2/8) [→]  │ │ Apr 5 — Tom K. — workshop    │
│ [View all workshops]          │ │ [View all bookings]           │
└───────────────────────────────┘ └───────────────────────────────┘

STORY PIPELINE
┌─────────────────────────────────────────────────────────┐
│ Stories awaiting consent request: 3                     │
│ Stories awaiting customer response: 1                   │
│ Stories with consent — ready to publish: 2              │
│ [View story pipeline →]                                 │
└─────────────────────────────────────────────────────────┘
```

### 7.2 Workshop Detail · 工作坊详情

**Route:** `/dashboard/community/workshops/[id]`

```
← Back to Workshops

BEGINNER SILK FLOWER WORKSHOP
Apr 14, 2026 · 2:00–4:30pm · Studio NYC

CAPACITY: 6 / 8 seats filled
Price: $85 · Cal.com event ID: 0042

ATTENDEES
┌───────────────────────────────────────────────┐
│ Name       │ Booking date │ Status  │ Paid    │
├────────────┼──────────────┼─────────┼─────────┤
│ Tom K.     │ Apr 5        │ ✅ Conf.│ $85 ✅  │
│ Lisa H.    │ Apr 6        │ ✅ Conf.│ $85 ✅  │
│ (4 more)   │ ...          │ ...     │ ...     │
└───────────────────────────────────────────────┘

[+ Add attendee manually]   [Export attendee list]
[Send reminder to all]      [Cancel workshop]
```

### 7.3 Story Consent Pipeline · 故事授权管道

**Route:** `/dashboard/community/stories/`

```
PAGE HEADER
"Story Consent Pipeline"

THREE COLUMNS (kanban)
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ NOT YET ASKED │ │ AWAITING RESP │ │ CONSENT GIVEN │
│               │ │               │ │               │
│ Jane W. #42   │ │ Tom K. #40    │ │ Maria S. #38  │
│ Delivered Apr │ │ Invited Apr 6 │ │ Confirmed ✅  │
│ [Send invite] │ │ [Follow up]   │ │ [Publish →]   │
│               │ │               │ │               │
│ Lisa H. #39   │ │               │ │               │
│ [Send invite] │ │               │ │               │
└───────────────┘ └───────────────┘ └───────────────┘
```

---

## 8. Analytics and Ops · 分析与运营

**Route · 路径:** `/dashboard/analytics/`  
**Roles · 角色:** `founder`, `admin` (full); `co_founder` (read-only)

### 8.1 Analytics Overview · 分析概览

**Route:** `/dashboard/analytics/`

```
PAGE HEADER
"Analytics & Ops"    Period: [Last 7 days ▾]

METRIC ROW
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Sessions │ │ Top page │ │ Signups  │ │ Revenue  │
│ 1,243    │ │ /custom  │ │ 18       │ │ $1,250   │
│ +12% ↑   │ │ 28%      │ │ +3 ↑     │ │ +$300 ↑  │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

TWO COLUMNS
┌──────────────────────────┐ ┌───────────────────────────┐
│ TRAFFIC (GA4)            │ │ EMAIL (Mailchimp)          │
│                          │ │                            │
│ Top pages:               │ │ Total subscribers: 142     │
│  /custom.html     28%   │ │ Avg Email 1 open rate: 54% │
│  /collections     22%   │ │ Email 3 clicks: 7.2%       │
│  /about           18%   │ │                            │
│                          │ │ PAYMENTS (Stripe)          │
│ Sources:                 │ │ Deposits received: $900    │
│  Direct           45%   │ │ Balances due: $600         │
│  Instagram        32%   │ │ Refunds: $0                │
│  Referral         23%   │ │                            │
└──────────────────────────┘ └───────────────────────────┘

EVENTS (GA4 custom events — last 7 days)
newsletter_signup:   12
custom_form_submit:  4
contact_form_submit: 7
booking_click:       9
```

### 8.2 System Status · 系统状态

**Route:** `/dashboard/analytics/system/`

```
"System Status"

ENVIRONMENT VARIABLES
✅ MAILCHIMP_API_KEY        set
✅ MAILCHIMP_AUDIENCE_ID    set
✅ MAILCHIMP_DC             set
✅ AIRTABLE_API_KEY         set
✅ AIRTABLE_BASE_ID         set
⚠️ GA4_PROPERTY_ID         not set (analytics page inactive)
⚠️ STRIPE_SECRET_KEY       not set (revenue data inactive)
⚠️ CALCOM_API_KEY          not set (booking data inactive)

API HEALTH (checked every 15 min)
✅ Mailchimp API      200 OK — 4 min ago
✅ Airtable API       200 OK — 4 min ago
— GA4 Data API        not configured
— Stripe API          not configured
— Cal.com API         not configured

STORAGE USAGE (Supabase)
Products: 42 files · 128 MB
Stories: 6 files · 18 MB
Documents: 12 files · 44 MB
Total: 190 MB / 1 GB (19%)
```

---

## 9. Media Upload Center · 媒体上传中心

**Route · 路径:** `/dashboard/media/`  
**Roles · 角色:** `founder`, `co_founder`, `editor`, `community_manager` (upload); `admin` (all)  
**Approve · 批准:** `founder`, `admin` only

### 9.1 Media Library View · 媒体库视图

**Route:** `/dashboard/media/`

```
PAGE HEADER
"Media Upload Center"    [↑ Upload New]

FILTER BAR
Category: [All ▾]  Status: [All ▾]  Module: [All ▾]
[Search by title or tag...]         View: [Grid ▾] [List]

GRID VIEW (4 columns)
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ [img]  │ │ [img]  │ │ [img]  │ │  +     │
│ Orchid │ │ Studio │ │ Logo   │ │ Upload │
│earrings│ │ process│ │ mark   │ │        │
│product │ │ process│ │ brand  │        │
│●Pub.   │ │●Review │ │●Apprvd │ │        │
└────────┘ └────────┘ └────────┘ └────────┘
```

### 9.2 Upload Form · 上传表单

**Route:** `/dashboard/media/new`

```
"Upload New Asset"

DRAG & DROP ZONE
┌─────────────────────────────────────────────────┐
│                                                 │
│  Drag files here, or [Browse files]             │
│  JPG, PNG, WebP, SVG, PDF, DOCX               │
│  Max file size: 20MB per file                   │
│                                                 │
└─────────────────────────────────────────────────┘

METADATA (required before submit)
Title: ___________________________________________
Category: [Product ▾]
Tags: [+ add] [orchid] [× blue] [× earrings]

Usage rights:
  ○ Internal only (team use, not for website)
  ● Website-publishable (can appear on public site)
  ○ Press use (can be shared externally)

Related module: [Product Studio ▾]
Related item: [Commission #42 — Orchid Earrings ▾]

Consent confirmed (for story photos):
  ☑ Customer has given written consent via email

Upload notes: _____________________________________

[Cancel]                            [Upload & Submit for Review →]
```

### 9.3 Asset Detail View · 资产详情视图

**Route:** `/dashboard/media/[id]`

```
← Back to Media

ORCHID EARRINGS — FINAL PHOTO
┌─────────────────────────────────┐  Category: Product
│                                 │  Status: ● Published
│     [image preview]             │  Usage: Website-publishable
│                                 │  Tags: orchid, blue, earrings
│                                 │  Module: Product Studio
└─────────────────────────────────┘  Item: Commission #42
                                     Uploaded: Apr 8, 2026
                                     By: Founder

STATUS HISTORY
Apr 8 — uploaded — Founder
Apr 8 — approved — Founder
Apr 8 — published — System

[Download original]  [View on site →]  [Archive]
```

---

## 10. Review and Approval Queue · 审核与批准队列

**Route · 路径:** `/dashboard/review/`  
**Roles · 角色:** `founder`, `co_founder` (view + revision requests); `founder`, `admin` (approve)

### Queue View · 队列视图

```
PAGE HEADER
"Review Queue"    4 items pending

FILTER BAR
[All (4)] [Media (2)] [Content (1)] [Stories (1)] [Urgent (1)]

QUEUE LIST
┌───────────────────────────────────────────────────────────────────┐
│ Type     │ Title               │ Submitted by  │ Wait │ Actions   │
├──────────┼─────────────────────┼───────────────┼──────┼───────────┤
│ 🖼 Media  │ Studio process photo│ Co-founder    │ 8d ⚠│ Review    │
│ 📝 Content│ April Journal entry │ Editor        │ 2d   │ Review    │
│ 🖼 Media  │ Workshop recap imgs │ Comm. Mgr.    │ 1d   │ Review    │
│ 📖 Story  │ Maria S. — Camellia │ Founder       │ 1d   │ Review    │
└───────────────────────────────────────────────────────────────────┘
```

### Item Review View · 项目审核视图

**Route:** `/dashboard/review/[id]`

```
← Back to Queue

REVIEW: Studio Process Photo
Submitted by Co-founder · 8 days ago · URGENT

┌───────────────────────────────────┐  METADATA
│                                   │  Category: Process
│    [full preview of asset]        │  Tags: studio, silk, hands
│                                   │  Usage: Website-publishable
│                                   │  Related: Commission #42
└───────────────────────────────────┘  Notes: "For the About page update"

REVIEWER NOTES
Add note for submitter (required if requesting revision):
┌────────────────────────────────────────────────────────┐
│                                                        │
└────────────────────────────────────────────────────────┘

[Request Revision]    [Approve]    [Approve & Publish Now]
```

---

## 11. Settings and Permissions · 设置与权限

**Route · 路径:** `/dashboard/settings/`  
**Roles · 角色:** `founder`, `admin` only

### 11.1 Team Members · 团队成员

```
"Settings — Team"    [+ Invite team member]

┌──────────────────────────────────────────────────────┐
│ Name       │ Email          │ Role        │ Last seen │
├────────────┼────────────────┼─────────────┼───────────┤
│ Yuetong    │ y@silora...    │ Founder     │ Today     │
│ [name]     │ x@silora...    │ Co-founder  │ Yesterday │
│ [name]     │ z@silora...    │ Editor      │ 3 days    │
└──────────────────────────────────────────────────────┘

Invite: Email _____________ Role [Editor ▾]  [Send invite]
```

### 11.2 Integrations Status · 集成状态

```
"Settings — Integrations"

┌────────────────────────────────────────────────────────────┐
│ Service     │ Status  │ Last checked │ Action              │
├─────────────┼─────────┼──────────────┼─────────────────────┤
│ Mailchimp   │ ✅ Live │ 2 min ago    │ [Disconnect]        │
│ Airtable    │ ✅ Live │ 2 min ago    │ [Disconnect]        │
│ GA4         │ ⚠️ Setup│ —            │ [Configure →]       │
│ Stripe      │ ⚠️ Setup│ —            │ [Configure →]       │
│ Cal.com     │ ⚠️ Setup│ —            │ [Configure →]       │
│ Supabase    │ ✅ Live │ 2 min ago    │ [View storage]      │
└────────────────────────────────────────────────────────────┘
```

---

## 12. Empty States · 空状态

Every list view must have a well-designed empty state. No bare "No data" messages.

每个列表视图必须有良好设计的空状态。不使用简单的"无数据"消息。

| Page · 页面 | Empty state · 空状态消息 |
|-----------|------------------------|
| Commission list | "No commissions yet. The first custom order is one conversation away." + [+ New Commission] button |
| Customer list | "No customers yet. They arrive with the first inquiry." |
| B2B Pipeline | "No partners yet. Start with the 50-target research in Phase 2." + [+ Add Partner] button |
| Review Queue | "All clear. Nothing waiting for review." (gold checkmark icon) |
| Media Library | "No assets uploaded yet. Use Upload to add your first product image." |
| Story Pipeline | "No stories yet. Begin by sending a story invitation after the first delivered commission." |

---

## 13. Mobile Considerations · 移动端考量

The dashboard is primarily designed for desktop use (1280px+). Mobile support is partial:

后台主要为桌面端设计（1280px+）。移动端支持为部分：

| Feature · 功能 | Desktop · 桌面端 | Mobile · 移动端 |
|--------------|-----------------|---------------|
| Founder Overview | Full KPI grid | Single column tiles · 单列卡片 |
| Commission list | Full table | Card view · 卡片视图 |
| Kanban board | Full scrollable | Read-only (no drag) · 只读 |
| Upload form | Full form | Supported (camera access for photos) · 支持（相机访问） |
| Review queue | Full | Full · 完整 |
| Settings | Full | Read-only · 只读 |

Sidebar: hidden on mobile, accessible via hamburger menu (`≡`) in top bar.

侧边栏：移动端隐藏，通过顶部栏汉堡菜单（`≡`）访问。

---

*Document version: 1.0 · April 2026*  
*See `docs/dashboard-architecture.md` for full system design*  
*See `admin/dashboard-upload-workflow.md` for detailed upload and review process*
