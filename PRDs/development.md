# 开发执行计划
## 开发准则 (Development Principles)
原子化提交：每个 Task 完成后必须进行一次 Git Commit。
类型先行：在写逻辑组件前，先定义 TypeScript Interface。
样式规范：严格使用 Tailwind CSS，禁止写原生 CSS。
Cursor 协作：每步操作前，要求 Cursor 先口述思路，对齐后再写代码。

**与 PRD 对齐（团队已确认）**：作品墙为**两档布局** — `lg` 以下 1 列、`lg+` 三列画廊、容器 `max-w-6xl`；**不设** `md` 2 列。留言仅邮件方案，不以 Research 中的后台 Message 库为 V1 任务。
## 阶段性任务清单 (Milestones)
### 第一阶段：项目初始化与基础设施 (Foundation)@James
Task 1.1: 使用 Vite 初始化 React + TS 项目，安装核心依赖。
依赖: lucide-react, framer-motion, clsx, tailwind-merge.
Commit: chore: project initialization with vite and tailwind
Task 1.2: 配置 Tailwind Theme。
要求: 设置 slate-900 为背景色，blue-500 为主色。
Commit: style: configure tailwind themes and global colors
Task 1.3: 创建 src/types/index.ts 定义 Project 接口；**Message** 仅作为联系表单提交形状（字段校验用），**不含** `status`/数据库语义（与 PRD 邮件方案一致）。
Commit: feat: define core typescript interfaces
### 第二阶段：数据层与原子组件 (Data & Atoms)@James
Task 2.1: 创建 src/data/projects.ts 静态数据文件（包含 3 个 Mock 数据）。
Commit: feat: add mock project data
Task 2.2: 开发 SafeImage 通用组件（处理 Loading 和 Fallback）。
Commit: feat: implement SafeImage component with error handling
Task 2.3: 开发 TechBadge 标签组件（根据标签名自动匹配颜色）。
Commit: feat: add TechBadge component for tech stacks
### 第三阶段：核心页面功能 (Core Features)@Jack
Task 3.1: 开发 ProjectGrid 作品墙：**`lg` 以下 1 列、`lg+` 3 列**，外层 **max-w-6xl**；与 PRD 两档断点一致（无平板 2 列）。
Commit: feat: implement responsive project gallery grid
Task 3.2: 开发 Filter 筛选器，实现按技术栈过滤作品。
要求: 配合 Framer Motion 实现 AnimatePresence 布局动画。
Commit: feat: add project filtering with framer-motion
Task 3.3: 集成 next-mdx-remote 或同类方案，实现 MDX 博客详情页。
Commit: feat: integrate MDX for project case studies
### 第四阶段：交互与表单 (UX & Forms)@Jack
Task 4.1: 实现联系表单 (Contact Form)，集成 react-hook-form。
Commit: feat: implement contact form with validation
Task 4.2: 接入 Web3Forms 或 Netlify Forms 邮件转发逻辑。
Commit: feat: integrate email notification service
Task 4.3: 实现深色/浅色模式切换逻辑。
Commit: feat: add theme switcher with localstorage persistence
### 第五阶段：部署与优化 (Deployment)@James
Task 5.1: 编写图片处理脚本 scripts/optimize-images.mjs。
Commit: chore: add image optimization script
Task 5.2: 完善 SEO Meta 标签配置。
Commit: seo: add dynamic meta tags for all pages
Task 5.3: 部署至 Vercel 并进行 Lighthouse 跑分测试。
## Git 协作流程 (Git Workflow)
Pull: 开始任务前 git pull origin main。
Dev: 让 Cursor 按照当前 Task 指令编码。
Test: 本地运行 npm run dev 检查。
Commit: git add . -> git commit -m "xxx"。
Push: git push origin main（小团队建议直接推 main，或建立简单的 PR 流程）。