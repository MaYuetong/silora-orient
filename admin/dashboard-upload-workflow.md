# SILORA ORIENT — Dashboard Upload Workflow
# SILORA ORIENT — 管理后台上传工作流

**Version · 版本:** 1.0  
**Date · 日期:** April 2026 · 2026年4月  
**Applies to · 适用于:** All media and content uploads through the dashboard · 通过管理后台的所有媒体和内容上传  
**Audience · 适用对象:** All team members who upload · Founders reviewing · Developers implementing · 所有上传的团队成员 · 审核的创始人 · 实施的开发者

---

## 1. Overview · 概述

The upload workflow governs how every piece of media and content moves from creation to public appearance. It is intentionally strict: nothing appears on the public site without passing through the Approved state. This protects brand quality, respects customer consent, and ensures the founder always knows what is being published in the brand's name.

上传工作流管理每件媒体和内容从创建到公开展示的过程。它有意设计得严格：没有任何内容在未通过"已批准"状态的情况下出现在公开网站上。这保护了品牌质量，尊重客户授权，并确保创始人始终了解以品牌名义发布的内容。

**Two types of uploads · 两种上传类型:**

1. **Media uploads · 媒体上传** — Image files, PDFs, documents. Managed in the Media Upload Center. Physical files stored in Supabase Storage.  
   图片文件、PDF、文档。在媒体上传中心管理。实体文件存储在Supabase Storage中。

2. **Content uploads · 内容上传** — Journal entries, customer stories, workshop announcements. Managed in their respective module sections. Stored as structured data in Supabase (or Airtable in Phase 3A).  
   日记条目、客户故事、工作坊公告。在各自的模块区域管理。作为结构化数据存储在Supabase中（第3A阶段在Airtable中）。

Both follow the same 8-state workflow and pass through the same Review Queue.

两者都遵循相同的8状态工作流并通过相同的审核队列。

---

## 2. The 8-State Workflow · 8状态工作流

```
         ┌─────────────────────────────────────────────────────────────┐
         │                                                             │
  CREATE │  DRAFT ──→ UPLOADED ──→ UNDER REVIEW ──→ NEEDS REVISION   │
         │                              │                    │         │
         │                              │            (back to DRAFT)  │
         │                              ▼                             │
PUBLISH  │                           APPROVED ──→ SCHEDULED ──→ PUBLISHED ──→ ARCHIVED
         │                                                             │
         └─────────────────────────────────────────────────────────────┘
```

### State Definitions · 状态定义

**DRAFT · 草稿**

- Item exists in the system but has not been submitted for review · 项目存在于系统中但尚未提交审核
- Only visible to the creator and admins · 仅创建者和管理员可见
- Can be edited freely · 可自由编辑
- No file has been uploaded yet (for media), or content is incomplete (for entries) · 尚未上传文件（媒体类），或内容不完整（条目类）
- Set by: any team member on create · 设置者：任何团队成员在创建时

**UPLOADED · 已上传**

- File has been uploaded and all required metadata has been filled in · 文件已上传，所有必填元数据已填写
- Item appears in the Review Queue for the reviewer · 项目出现在审核者的审核队列中
- Creator can still edit metadata but not change the file · 创建者仍可编辑元数据但不能更改文件
- Set by: any team member on form submit · 设置者：任何团队成员在表单提交时

**UNDER REVIEW · 审核中**

- A reviewer has opened the item and begun evaluation · 审核者已打开项目并开始评估
- Item is locked from editing by the creator · 创建者无法编辑项目
- Set by: reviewer (founder or admin) automatically on open, or manually · 设置者：审核者（创始人或管理员）打开时自动设置，或手动设置

**NEEDS REVISION · 需要修改**

- Reviewer has returned the item with a required note explaining what must change · 审核者已退回项目，附有说明所需更改的必填备注
- Notification sent to original creator · 通知发送至原始创建者
- Item returns to the creator's edit view · 项目返回至创建者的编辑视图
- Creator must re-submit (→ UPLOADED) after making changes · 创建者进行更改后必须重新提交
- Set by: founder or admin · 设置者：创始人或管理员

**APPROVED · 已批准**

- Reviewer has approved the item for publication · 审核者已批准发布项目
- Item is ready to go live, either immediately or on a scheduled date · 项目已准备上线，可立即或按计划日期发布
- Notification sent to original creator · 通知发送至原始创建者
- Set by: founder or admin only · 设置者：仅创始人或管理员

**SCHEDULED · 已排期**

- Item is approved and a future publish date/time has been set · 项目已批准，并设置了未来的发布日期/时间
- Will automatically move to PUBLISHED at the scheduled time · 将在计划时间自动移至"已发布"
- Can be unscheduled (moved back to APPROVED) before the publish time · 可在发布时间前取消排期（移回"已批准"）
- Set by: founder or admin · 设置者：创始人或管理员

**PUBLISHED · 已发布**

- Item is live on the public site or available for external use · 项目在公开网站上线或可供外部使用
- No further editing without archiving first · 不先存档则无法进一步编辑
- State change log records: timestamp, actor, path published to · 状态变更日志记录：时间戳、操作者、发布路径
- Set by: system (automated schedule) or founder · 设置者：系统（自动计划）或创始人

**ARCHIVED · 已存档**

- Item is permanently removed from active view and public site · 项目从活跃视图和公开网站永久移除
- File remains in storage for reference · 文件保留在存储中以供参考
- Cannot be un-archived without admin action · 没有管理员操作无法取消存档
- Set by: founder or admin only · 设置者：仅创始人或管理员

---

## 3. Who Can Move Items Between States · 谁可以在状态间移动项目

| Transition · 转换 | Who can do it · 谁可以操作 |
|-----------------|--------------------------|
| DRAFT → UPLOADED | Item creator (any role) · 项目创建者（任何角色） |
| UPLOADED → UNDER REVIEW | Founder, Admin (on open) · 创始人、管理员（打开时） |
| UNDER REVIEW → NEEDS REVISION | Founder, Admin · 创始人、管理员 |
| UNDER REVIEW → APPROVED | Founder, Admin · 创始人、管理员 |
| NEEDS REVISION → DRAFT (re-edit) | Original creator, Admin · 原始创建者、管理员 |
| APPROVED → SCHEDULED | Founder, Admin · 创始人、管理员 |
| APPROVED → PUBLISHED | Founder, Admin · 创始人、管理员 |
| SCHEDULED → PUBLISHED | System (automated) · 系统（自动） |
| PUBLISHED → ARCHIVED | Founder, Admin · 创始人、管理员 |
| Any state → ARCHIVED | Founder, Admin · 创始人、管理员 |

---

## 4. Media Upload Process — Step by Step · 媒体上传流程——逐步说明

### Step 1: Prepare the file · 准备文件

Before uploading, the team member ensures:

上传前，团队成员确保：

| Check · 检查 | Requirement · 要求 |
|-----------|------------------|
| File format · 文件格式 | JPG / PNG / WebP (images); SVG (logos only); PDF / DOCX (documents) |
| File size · 文件大小 | Max 20MB per file · 每文件最大20MB |
| Image resolution · 图片分辨率 | Min 1200px on longest side for product/editorial images · 产品/编辑图片最长边最小1200px |
| File naming · 文件命名 | Descriptive name before upload (system will add ID + timestamp) · 上传前使用描述性名称 |
| Consent (story photos) · 授权（故事照片） | Written customer consent received via email before uploading · 上传前通过邮件获得客户书面授权 |

### Step 2: Open upload form · 打开上传表单

Navigate to `/dashboard/media/new` or click [↑ Upload New] on any media page.

导航至`/dashboard/media/new`或在任何媒体页面点击[↑ 上传新文件]。

### Step 3: Select or drag files · 选择或拖拽文件

- Single file or batch upload (up to 10 files at once) · 单文件或批量上传（一次最多10个文件）
- Preview thumbnail appears on selection · 选择后出现预览缩略图
- File validation runs on select (format, size, dimensions) · 选择时运行文件验证

### Step 4: Fill metadata · 填写元数据

**Required fields · 必填字段:**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-----------|-----------|------------|
| Title · 标题 | Text | Human-readable; used in search and display · 可读名称；用于搜索和显示 |
| Category · 分类 | Select | One of 7 categories — determines storage bucket · 7个分类之一——决定存储桶 |
| Usage rights · 使用权限 | Radio | `internal-only` / `website-publishable` / `press-use` |

**Optional fields · 可选字段:**

| Field · 字段 | Type · 类型 | Notes · 说明 |
|-----------|-----------|------------|
| Tags · 标签 | Multi-text | Free-form; used for search filtering · 自由格式；用于搜索过滤 |
| Related module · 关联模块 | Select | Links asset to a module · 将资产链接至模块 |
| Related item · 关联项目 | Search | Commission / customer / workshop ID · 定制/客户/工作坊ID |
| Upload notes · 上传备注 | Text | Context for reviewer · 给审核者的背景说明 |

**Conditional fields · 条件字段:**

| Field · 字段 | Condition · 条件 |
|-----------|---------------|
| Consent confirmed · 授权已确认 | Required if category = `story` and file contains a person's face · 如果分类=`story`且文件包含人脸则必填 |

### Step 5: Submit for review · 提交审核

Click [Upload & Submit for Review →]. The system:

点击[上传并提交审核→]。系统：

1. Uploads file to Supabase Storage at path: `{bucket}/{year}/{month}/{item-id}_{slug}_{timestamp}.{ext}` · 将文件上传至Supabase Storage
2. Creates a media record in the database with all metadata and status = `uploaded` · 在数据库中创建含所有元数据的媒体记录，状态=`uploaded`
3. Adds item to the Review Queue · 将项目添加至审核队列
4. Sends notification to the founder and admin (if notification preferences are set) · 向创始人和管理员发送通知

### Step 6: Await review · 等待审核

The creator can:
- View their submitted item at `/dashboard/media/[id]` · 在详情页查看已提交的项目
- See current status (UPLOADED or UNDER REVIEW) · 查看当前状态
- Not edit the file (only metadata, with restrictions) · 不能编辑文件（仅限元数据，有限制）

Typical review time: 1–3 business days · 典型审核时间：1–3个工作日

### Step 7: Review decision · 审核决定

**If NEEDS REVISION · 如果需要修改:**

1. Creator receives notification with reviewer's note · 创建者收到含审核者备注的通知
2. Item returns to DRAFT state · 项目返回草稿状态
3. Creator sees the revision note in the edit view · 创建者在编辑视图中看到修改备注
4. Creator makes changes, optionally replaces file, resubmits · 创建者进行更改，可选地替换文件，重新提交
5. Item re-enters the Review Queue · 项目重新进入审核队列

**If APPROVED · 如果已批准:**

1. Creator receives notification · 创建者收到通知
2. Founder or Admin sets publish date (immediate or scheduled) · 创始人或管理员设置发布日期（立即或排期）
3. For media: file is now available for use on the public site or in documents · 对于媒体：文件现在可用于公开网站或文档
4. For content: system writes to `content/*.json` or triggers appropriate publish action · 对于内容：系统写入`content/*.json`或触发适当的发布操作

---

## 5. Content Upload Process · 内容上传流程

Content uploads (journal entries, stories, workshop announcements) follow the same workflow with these differences:

内容上传（日记条目、故事、工作坊公告）遵循相同工作流，但有以下差异：

### Journal Entry Workflow · 日记条目工作流

```
Editor creates draft in /dashboard/cms/new
    ↓
Writes content in both EN and ZH rich text editors
    ↓
Selects cover image from Media Library (must be APPROVED or PUBLISHED)
    ↓
Clicks [Submit for Review]
    ↓
Appears in Review Queue as "Content" type
    ↓
Founder reviews: preview renders exactly as it would appear on /journal.html
    ↓
Approved → system writes entry to content/journal.json
    ↓
Vercel redeploy triggered → entry live on /journal.html within 60 seconds
```

### Customer Story Workflow · 客户故事工作流

Customer story publishing has an additional consent gate:

客户故事发布有额外的授权关卡：

```
Commission reaches "delivered" status
    ↓
Founder sends story invitation email (template in docs/phase-2-launch.md)
    ↓
Customer responds with story content (email or voice note)
    ↓
Founder creates story record in /dashboard/community/stories/
    ↓
Founder types/transcribes story in "story content" field
    ↓
Founder sends consent request email to customer
    ↓
Customer confirms consent via email (written confirmation required)
    ↓
Founder checks "story_consent_given" in customer CRM record
    ↓
Story enters normal upload workflow: DRAFT → UPLOADED → APPROVED
    ↓
PUBLISHED → system writes to content/customer-stories.json
    ↓
Story appears on /stories.html

IMPORTANT: Story consent must be confirmed BEFORE the story reaches APPROVED.
If consent is not confirmed, item is blocked at UNDER REVIEW.
重要：故事授权必须在故事达到"已批准"状态之前确认。
如果授权未确认，项目将在"审核中"状态被阻止。
```

---

## 6. File Storage Architecture · 文件存储架构

### Supabase Storage Buckets · Supabase存储桶

| Bucket · 存储桶 | Category · 分类 | Public? · 是否公开 | RLS policy · RLS策略 |
|---------------|----------------|------------------|---------------------|
| `products` | Product images | Yes (CDN) · 是（CDN） | Read: public; Write: authenticated team · 读：公开；写：已认证团队 |
| `stories` | Story photos | No · 否 | Read: founder, admin, co_founder only; Write: authenticated team | 
| `workshops` | Workshop photos | Yes (CDN) | Read: public; Write: authenticated team |
| `editorial` | Editorial images | Yes (CDN) | Read: public; Write: authenticated team |
| `brand-assets` | Logos, guidelines | No · 否 | Read: authenticated team; Write: founder, admin |
| `documents` | Contracts, invoices | No · 否 | Read: founder, admin, co_founder; Write: founder, admin |
| `process` | Production photos | No · 否 | Read: founder, admin, co_founder; Write: authenticated team |

### Storage Path Convention · 存储路径规范

```
{bucket}/{year}/{month}/{item-id}_{title-slug}_{timestamp}.{ext}

Examples · 示例:
products/2026/04/comm_0042_orchid-earrings-blue_20260408143022.jpg
stories/2026/04/cust_0018_pianist-portrait_20260408143022.jpg
editorial/2026/04/journal_0012_spring-workshop-recap_20260408143022.webp
brand-assets/2026/04/asset_0001_silora-orient-logo-mark_20260408143022.svg
documents/2026/04/doc_0005_commission-contract-jane-w_20260408143022.pdf
```

### File Processing · 文件处理

On upload, the system automatically:

上传时，系统自动：

| Processing step · 处理步骤 | For images · 图片 | For documents · 文档 |
|--------------------------|-----------------|---------------------|
| Virus scan · 病毒扫描 | ✅ | ✅ |
| Format validation · 格式验证 | ✅ (check magic bytes) | ✅ |
| Dimension check · 尺寸检查 | ✅ (warn if < 1200px) | — |
| WebP conversion · WebP转换 | ✅ (serves WebP, stores original) · 提供WebP，存储原件 | — |
| Thumbnail generation · 缩略图生成 | ✅ (400px × 400px crop) | ✅ (first page preview) |
| CDN cache · CDN缓存 | ✅ (public buckets only) | — |
| Metadata extraction · 元数据提取 | ✅ (dimensions, file size) | ✅ (page count, size) |

---

## 7. Notification System · 通知系统

Every state transition triggers a notification to the relevant team member(s).

每次状态转换都会向相关团队成员触发通知。

| Event · 事件 | Notify · 通知对象 | Channel · 渠道 |
|-----------|----------------|--------------|
| Item submitted for review · 项目提交审核 | Founder, Admin · 创始人、管理员 | Email + in-dashboard bell · 邮件+后台铃声 |
| Item needs revision · 项目需要修改 | Original creator · 原始创建者 | Email + in-dashboard bell |
| Item approved · 项目已批准 | Original creator · 原始创建者 | Email + in-dashboard bell |
| Item published · 项目已发布 | Founder (summary) · 创始人（摘要） | In-dashboard only · 仅后台 |
| Item archived · 项目已存档 | Original creator · 原始创建者 | In-dashboard only |
| Item in queue > 7 days · 队列中超7天 | Founder, Admin | Email (daily digest) · 邮件（每日摘要） |

Notification preferences can be adjusted per role in Settings → Notification Preferences.

通知偏好可在设置→通知偏好中按角色调整。

---

## 8. Batch Upload · 批量上传

For workshop recaps, editorial shoots, or production series, multiple files can be uploaded together.

对于工作坊回顾、编辑拍摄或制作系列，可以一起上传多个文件。

### Batch Upload Rules · 批量上传规则

- Maximum 10 files per batch · 每批最多10个文件
- All files in a batch share: category, related module, related item, usage rights · 批次中的所有文件共享：分类、关联模块、关联项目、使用权限
- Each file gets its own title (auto-populated as filename, then editable) · 每个文件有自己的标题（自动填充为文件名，然后可编辑）
- Each file gets its own tags (can be added individually after upload) · 每个文件有自己的标签（上传后可单独添加）
- All files in a batch enter the Review Queue together · 批次中的所有文件一起进入审核队列
- Reviewer can approve/reject files individually within a batch · 审核者可以在批次中单独批准/拒绝文件

### Batch Upload Process · 批量上传流程

```
1. Navigate to /dashboard/media/new
2. Drag multiple files into the drop zone (or select multiple via browse)
3. Shared metadata form appears: Category, Related module, Related item, Usage rights
4. Individual title fields for each file (pre-filled with filename)
5. Option to add per-file upload notes
6. [Upload All & Submit for Review →]
7. All files appear in Review Queue as a linked batch
8. Reviewer sees batch indicator: "3 of 5 files reviewed"
```

---

## 9. Revision Cycle · 修改周期

When an item is returned with NEEDS REVISION, the following protocol applies.

当项目以"需要修改"返回时，适用以下协议。

### For the reviewer requesting revision · 对于请求修改的审核者

1. Select [Request Revision] in the review view · 在审核视图中选择[请求修改]
2. **Required:** type a revision note that is specific enough to act on · **必填：**输入足够具体可操作的修改备注
   - Good: "The background is too dark — it needs to match the ivory (#FAF7F2) of other product photos. Please reshoot or adjust in editing."  
     好的示例："背景太暗——需要与其他产品照片的米色（#FAF7F2）匹配。请重拍或在编辑中调整。"
   - Avoid: "This doesn't look right." · 避免："这看起来不对。"
3. Submit. Creator is notified immediately. · 提交。创建者立即收到通知。

### For the creator receiving revision · 对于接收修改请求的创建者

1. Open notification or navigate to the item in `/dashboard/media/[id]` · 打开通知或导航至项目
2. Read the revision note (displayed prominently at top of edit view) · 阅读修改备注（在编辑视图顶部醒目显示）
3. Make requested changes:
   - Replace file: upload new version (old file kept in storage with suffix `_v1`) · 替换文件：上传新版本（旧文件在存储中保留后缀`_v1`）
   - Update metadata: edit title, tags, notes · 更新元数据：编辑标题、标签、备注
4. Add a response note (optional but recommended) · 添加回复备注（可选但推荐）
5. Click [Resubmit for Review →] · 点击[重新提交审核→]

### Maximum revision cycles · 最大修改周期

- No hard limit · 无硬性限制
- Items with 3+ revision cycles are flagged in the Review Queue with a ⚠️ indicator · 修改周期3次以上的项目在审核队列中用⚠️标记
- Founder or Admin can archive the item and request a fresh upload if a revision cycle becomes unproductive · 如果修改周期变得无效率，创始人或管理员可以存档项目并请求新上传

---

## 10. Publishing Actions · 发布操作

### For media files · 对于媒体文件

When a media file is APPROVED, the founder can:

当媒体文件被批准时，创始人可以：

- **Use now · 立即使用:** Copy the Supabase CDN URL and paste into any content or email · 复制Supabase CDN URL并粘贴至任何内容或邮件
- **Use in journal entry · 用于日记条目:** Select from Media Library when creating/editing a journal entry in the CMS · 在CMS中创建/编辑日记条目时从媒体库中选择
- **Use as commission photo · 用作定制照片:** Attach to commission detail in Product Studio · 附加至产品工作室的定制详情
- **Download for external use · 下载供外部使用:** Download original file for press kits, email campaigns, etc. · 下载原件用于新闻资料包、邮件活动等

### For content items · 对于内容项目

| Content type · 内容类型 | Publish action · 发布操作 |
|----------------------|------------------------|
| Journal entry · 日记条目 | System writes to `content/journal.json` → triggers Vercel redeploy · 系统写入JSON→触发Vercel重新部署 |
| Customer story · 客户故事 | System writes to `content/customer-stories.json` → triggers Vercel redeploy · 系统写入JSON→触发Vercel重新部署 |
| Workshop announcement · 工作坊公告 | System updates `workshops.html` or `content/workshops.json` · 系统更新工作坊页面 |
| Collection description · 系列描述 | System writes to `content/collections.json` · 系统写入系列JSON |

### Scheduled publishing · 排期发布

1. Set item to APPROVED · 将项目设置为已批准
2. Click [Schedule] → date/time picker appears · 点击[排期]→日期/时间选择器出现
3. System converts to UTC and stores publish timestamp · 系统转换为UTC并存储发布时间戳
4. At publish time: system executes publish action → moves to PUBLISHED state · 发布时间到：系统执行发布操作→移至"已发布"状态
5. Founder receives notification: "Article 'Spring Thoughts' was published at 9:00 AM today" · 创始人收到通知

---

## 11. Quality Standards · 质量标准

These standards are applied at review. Items that do not meet them should receive NEEDS REVISION.

这些标准在审核时应用。不符合标准的项目应收到"需要修改"。

### Image Quality Standards · 图片质量标准

| Category · 分类 | Min resolution · 最小分辨率 | Background · 背景 | Lighting · 光线 |
|---------------|--------------------------|-----------------|---------------|
| Product · 产品 | 2000px long side | Ivory `#FAF7F2` or clean white · 米色或纯白 | Even, no harsh shadows · 均匀，无强烈阴影 |
| Story · 故事 | 1200px long side | Natural / contextual · 自然/情境化 | Any (lifestyle context ok) · 任何（生活方式情境可接受） |
| Process · 制作过程 | 1200px long side | Studio, natural · 工作室，自然 | Warm, natural · 温暖，自然 |
| Workshop · 工作坊 | 1200px long side | Event context · 活动情境 | Any · 任何 |
| Editorial · 编辑 | 2000px long side | Varies by concept · 根据概念变化 | Intentional · 有意为之 |
| Brand asset · 品牌资产 | Vector preferred · 优先矢量 | Transparent or brand ivory · 透明或品牌米色 | N/A · 不适用 |

### Content Quality Standards · 内容质量标准

| Standard · 标准 | Requirement · 要求 |
|---------------|------------------|
| Brand voice · 品牌语气 | Quiet, specific, story-first. No marketing language. No urgency. · 安静、具体、故事优先。不使用营销语言，不制造紧迫感。 |
| Bilingual completeness · 双语完整性 | Journal entries published bilingually must have both EN and ZH versions complete · 双语发布的日记条目必须有完整的中英文版本 |
| Factual accuracy · 事实准确性 | Customer names, dates, piece descriptions match Airtable/Supabase records · 客户姓名、日期、作品描述与数据库记录匹配 |
| Consent compliance · 授权合规 | Story photos and text only published with `story_consent_given = true` and email evidence on file · 仅在`story_consent_given = true`且有邮件证据存档时发布故事照片和文字 |
| No PII exposure · 不暴露个人信息 | Full surnames, addresses, contact info never published without explicit permission · 未经明确许可，不发布全姓、地址、联系信息 |

---

## 12. Archiving Policy · 存档政策

### When to archive · 何时存档

- Media that was replaced by an updated version · 被更新版本替换的媒体
- Content that is no longer accurate (commission completed and story updated) · 不再准确的内容
- Seasonal content past its relevance window · 超过相关性窗口的季节性内容
- Assets where consent has been withdrawn · 授权已撤回的资产

### Archiving rules · 存档规则

- Archiving is non-destructive: the file remains in Supabase Storage · 存档是非破坏性的：文件保留在Supabase Storage中
- Archived items are removed from all public-facing views and lists · 已存档的项目从所有面向公众的视图和列表中移除
- Archived items remain searchable in the dashboard (with filter: Show Archived) · 已存档的项目在后台中保持可搜索（使用过滤器：显示已存档）
- Permanent deletion (from storage) requires founder + admin confirmation · 永久删除（从存储中）需要创始人+管理员确认
- Consent withdrawal: if a customer withdraws story consent, the story must be archived and removed from `content/customer-stories.json` within 24 hours · 授权撤回：如果客户撤回故事授权，故事必须在24小时内存档并从JSON中移除

---

## 13. Audit Log · 审计日志

Every action in the upload workflow is logged. The audit log is accessible to Founder and Admin only at `/dashboard/analytics/system/`.

上传工作流中的每个操作都被记录。审计日志仅对创始人和管理员可见。

| Log field · 日志字段 | Description · 描述 |
|---------------------|------------------|
| `timestamp` | UTC datetime of action · 操作的UTC日期时间 |
| `actor_id` | User ID of person who took action · 执行操作的用户ID |
| `actor_role` | Role at time of action · 操作时的角色 |
| `item_id` | ID of affected item · 受影响项目的ID |
| `item_type` | `media` / `journal` / `story` / `workshop` / etc. |
| `action` | `upload` / `submit` / `approve` / `reject` / `publish` / `archive` |
| `previous_state` | State before action · 操作前的状态 |
| `new_state` | State after action · 操作后的状态 |
| `note` | Revision note (if action = `reject`) · 修改备注（如果操作=`reject`） |

Audit logs are retained indefinitely. They cannot be deleted through the dashboard UI.

审计日志无限期保留。不能通过后台UI删除。

---

## 14. Quick Reference Card · 快速参考卡

For team members: this summarizes everything you need to remember.

为团队成员：这总结了你需要记住的一切。

```
UPLOAD CHECKLIST · 上传核查清单
□ File is correct format and size (< 20MB)
□ Title is human-readable and specific
□ Category is correctly selected
□ Usage rights match your intent
□ Consent confirmed if this is a story photo
□ Related item linked if applicable
□ Upload notes written if reviewer needs context

WHAT HAPPENS AFTER YOU SUBMIT · 提交后发生什么
→ Item enters Review Queue
→ Founder or Admin reviews within 1–3 business days
→ You receive notification: Approved or Needs Revision

IF YOU GET NEEDS REVISION · 如果收到"需要修改"
→ Read the reviewer's note carefully
→ Make all requested changes
→ Replace file if needed (keep your changes clear)
→ Add a response note before resubmitting
→ Click [Resubmit for Review →]

YOU CANNOT · 你不能
→ Publish anything yourself
→ Approve your own submissions
→ Remove items from storage
→ Publish story photos without consent confirmation
```

---

*Document version: 1.0 · April 2026*  
*See `docs/dashboard-architecture.md` for full system architecture*  
*See `admin/dashboard-ui-spec.md` for the upload form UI specification*
