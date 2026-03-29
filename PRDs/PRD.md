# 产品需求文档 (PRD) - 团队门户作品集 V1.0

## 1. 文档概览
项目名称：Team Portfolio V1.0
当前版本：V1.0 (MVP 最小可行性产品)
技术栈：React + TS + Tailwind + Framer Motion
开发原则：先跑通，再优化。 优先保证核心展示，减少外部依赖。

### 文档优先级（与 Research.md）
- **V1.0 实现与验收**：以本 PRD 为准（作品区三列画廊、留言为 Web3Forms/Netlify 邮件方案，无自建留言库与审核后台）。
- **Research.md**：需求调研与**路线图**（如带 `status` 的 Message、Supabase/后台审核、点赞收藏等）；不自动纳入 V1 范围，除非另开版本写入 PRD。

## 2. 核心功能点 (Feature List)
### 2.1 响应式首页 (Home)
Hero Section：简洁的 Slogan 介绍团队，背景使用 slate-900。
作品展示 (Project Grid)：
保守方案：使用静态数据（data/projects.ts）驱动，不接复杂的后台。
交互：点击作品卡片跳转至详情页或外部链接。
技术栈过滤：点击标签（React/TS等）实时高亮/过滤对应作品。
### 2.2 MDX 文章系统 (Blog/Case Study)
功能：支持读取本地 content/ 文件夹下的 .mdx 文件。
样式：使用 @tailwindcss/typography 插件保证排版整洁。
代码高亮：集成 shiki 实现像 IDE 一样的代码高亮。
### 2.3 极简留言板 (Guestbook) - 保守版实现
保守设计：由于是第一次开发，不写复杂的后端逻辑。
方案：集成 Web3Forms 或 Netlify Forms（仅需一个 HTML 表单，留言直接发到你邮箱，无需数据库，无需审核后台，最稳健）。
## 3. 详细交互需求 (Interaction)
加载体验：页面切换时使用 framer-motion 的 opacity 渐变。
图片处理：
组件名：SafeImage.tsx。
逻辑：加载中显示灰色占位，加载失败显示默认图标。
响应式断点（作品区仅两档，与 UI/开发文档一致）：
- **`lg` 以下**：1 列（含手机与常规平板宽度）。
- **`lg` 及以上**：3 列画廊；容器 **max-w-6xl** 居中。
- **不设**平板专用 2 列档位（避免与 PRD 最小规则分叉）；若未来需要，另开 PRD 版本约定。
## 4. 逻辑规则 (Logic Rules)
功能	规则描述	异常处理
作品展示	从本地 projects.ts 获取数据	若数据为空，显示“正在筹备中...”
深色模式	默认跟随系统颜色，支持手动切换	切换状态需持久化到 localStorage
留言提交	校验邮箱格式，内容不少于 10 字	提交后按钮变为 disabled 并显示“已发送”
## 5. 存储与性能 (Storage & Performance)
资产存储：所有图片存放在 /public/images/，统一转为 .webp。
环境变量：创建 .env.example 模板，明确标注需要配置的 Email API Key。