# 团队门户网站需求分析

## 与 PRD 的关系（必读）
- **V1.0 落地**：以 [PRD.md](./PRD.md) 为唯一实现与验收依据 — 作品列表为**三列画廊**（`max-w-6xl`）；栅格为**两档**：`lg` 以下 1 列、`lg+` 3 列（无平板专用 2 列）。留言为 **Web3Forms / Netlify Forms** 邮件转发，**无**自建 Message 表与审核后台。
- **本文档定位**：需求调研、非功能目标与**路线图**（扩展能力）。下文中的「后台存储留言」「Message.status 审核流」等属于**后续版本**设想，不纳入当前 MVP，除非同步修订 PRD。

## 项目概述 (Introduction)
背景与目标：通过展示代码片段、Lighthouse 性能分、技术栈标签，体现团队的专业度。
业务流程（**路线图 / 未来版本**）：访客通过前端提交留言 -> 存储至后端（如 Supabase/Node.js） -> 管理员在后台手动审核状态 -> 前端通过 status === 'approved' 过滤并展示留言。**V1 实际流程**：表单提交 -> 第三方邮件服务送达团队邮箱（见 PRD）。
使用技术栈：使用Cursor+React+TS+TailWind来实现

## 价值
核心价值：通过视觉和技术细节，说服访客（潜在客户或 HR）相信我们团队的实力。
价值需求：网站需要体现出‘专业开发团队’的质感，代码块展示要支持高亮，视觉交互要平滑（使用 Framer Motion）。

## 角色说明 (User Profiles)
用户画像：管理员，匿名访客，实名访客（留过言的）
权限矩阵：
- **V1（PRD）**：访客浏览作品、提交联系/留言表单（邮件通知团队）；无站内公开展示留言列表、无后台审核界面。
- **路线图**：管理员增删改查作品内容，并增加「审核流」（数据模型中 Message 含 `status: 'pending' | 'approved' | 'spam'`），后台审核删除防垃圾；访客留言 pending 不对公展示，通过后 approved 再在详情页展示；点赞收藏等亦为扩展能力。

## 参考网站
https://leerob.com/

https://delba.dev/

## 功能需求 (Functional Requirements) —— 核心部分
组件结构：
    作品墙 (Project Gallery)：采用 Grid 布局，每个作品卡片包含：标题、技术标签（用 Lucide-react 图标）、预览图、GitHub 链接。
    筛选器 (Filter)：支持按标签（如 "React", "Design", "Fullstack"）进行分类展示。
    联系表单 (Contact Form)：使用 react-hook-form 进行校验，集成简单的邮件发送逻辑。
    深色模式 (Dark Mode)：既然用 Tailwind，必须支持一键切换。
    作品展示模块： 支持筛选（如：React项目、移动端、UI设计）、支持多图轮播或视频演示。
    简历/关于我们： 团队成员的技能雷达图。
    联系方式： 集成邮件通知。当访客留言时，你们的邮箱能瞬间收到提醒（这比单纯存数据库有价值得多）。
强化数据要求 (TS 接口定义)
    typescript
    interface Project {
     id: string;
     title: string;
      description: string;
     tags: string[]; // 例如 ['React', 'TS', 'Tailwind']
     imageUrl: string;
    link: string;
      githubUrl?: string;
     featured: boolean; // 是否在首页精选展示
    }
    明确 tags 的取值范围，例如：type TechTag = 'React' | 'Next.js' | 'Tailwind' | 'TypeScript' | 'Node.js';。
我们要实现像 Lee Robinson 网站那样的 MDX 博客功能，需要 “代码高亮” 和 “目录导航”。支持 next-mdx-remote 或 contentlayer，代码块需支持 shiki 或 prism 高亮，并带有‘一键复制’按钮。

用例描述 (Use Cases)：
    图片加载失败： 作品封面图挂了，要有 fallback 占位图。创建一个 SafeImage 组件。如果 src 加载失败，自动显示一个带有技术标签背景色的占位图（Placeholder），甚至是一个简单的“Loading...”骨架屏。
    表单提交中： 点击“发送留言”后，按钮要进入 loading 禁用状态，防止用户疯狂连点。

## 非功能需求 (Non-Functional Requirements)
性能： Lighthouse 性能跑分必须在 90 分以上。图片使用WebP格式，所有上传到 public 的图片必须先经过压缩，并转换为 WebP 格式（体积通常比 PNG 小 70% 以上）。让 Cursor 写一个简单的 Node.js 脚本批量转换。在开发初期，可以让 Cursor 先写一个 scripts/optimize-images.mjs。这样你们每次把新作品图片扔进 public 之前，跑一下脚本就不用手动压缩了，非常专业。
设计风格：要求使用 Tailwind 的 container 类保持居中，并定义一套主色调（比如 slate-900 配合 blue-500）。
响应式：**V1 作品墙**与 PRD 一致 — `lg` 以下 1 列、`lg+` 3 列。其他模块（如未来仪表盘）仍可自行约定 sm/md/lg；若将来要为作品墙增加「平板 2 列」，须先更新 PRD。
SEO优化：因为是作品集，要求每个页面都有动态的 Title 和 Meta Description
部署： 考虑使用 Vercel 或 GitHub Pages，保证全球访问速度。


安全性：加密要求、数据脱敏、防SQL注入等

## 协作规范
分支管理： 比如 main 是线上版，你们各自在 feature/xxx 分支开发，互相跑一下 Lighthouse 再合并。

## 核心交互补充
加载状态： 切换分类筛选时，作品卡片需有 Framer Motion 的淡入淡出动画。
错误处理： 联系表单若发送失败，需弹出 Toast 提示（推荐使用 react-hot-toast 或 sonner）。

## 规范图片命名与结构
在 public 文件夹下建立清晰的目录，防止后期文件混乱：
建议路径：/public/images/projects/[project-id]/cover.webp
强制要求：文件名统一使用小写字母和连字符（如 my-cool-project.webp），避免在不同操作系统（如 Windows 和 Linux 部署环境）下产生大小写敏感的路径错误。

## 部署策略补充
环境变量： 所有的 API Key（如邮件服务密钥）必须存储在 .env 中，严禁硬编码在代码里。

## 数据要求 (Data Requirements)
数据模型：
- **Project（作品）**：标题、描述、技术标签、封面图 URL、项目链接、发布日期。（V1 与 PRD 一致，静态 `projects.ts` 等。）
- **Message（留言）— 路线图**：昵称、邮箱、内容、时间戳、审核状态；**V1 不持久化到自有数据库**，仅表单字段 + 邮件服务；待引入后端时再采用此模型。

数据字典：明确 tags 的取值范围，例如：type TechTag = 'React' | 'Next.js' | 'Tailwind' | 'TypeScript' | 'Node.js';。

## 界面与交互 (UI/UX)
原型图/低保真图：展示页面布局和跳转逻辑。
交互细节：点击后的反馈、加载状态、空数据展示等。

## 验收标准 (Acceptance Criteria)
定义“完成”：满足以上条件才算这个功能开发好了。

