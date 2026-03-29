UI 设计文档 (UI.md) - DCJA Team Portfolio
1. 品牌视觉定位 (Brand Identity)
• 团队名称：DCJA (Design, Code, Join, Achieve)
• 设计风格：“精密感 (Precision) & 深度 (Depth)”。结合 Brittany Chiang 的层次感与 Lee Rob 的文本节奏。
• 核心色调：
◦ Background: Slate-950 (#020617) - 极深蓝黑。
◦ Card/Surface: Slate-900/50 + Backdrop-blur - 半透明悬浮感。
◦ Accent: Blue-500 (#3b82f6) - 品牌交互色。
◦ Text: Slate-50 (标题), Slate-400 (正文)。
2. 布局规范 (James 负责 - Core Layout)
James 需要构建全局的“容器”，为 Jack 的内容提供承载空间。
2.1 全局容器 (Global Wrapper)
• Max-Width: MDX/长文阅读区使用 max-w-4xl (约 896px)，保持类似 Lee Rob 的紧凑阅读感；**首页作品画廊区域**与 PRD 对齐，使用 **max-w-6xl** 承载三列网格。
• Padding: 移动端 px-6, 桌面端 px-8。
• Navbar:
◦ 高度 h-16，置顶 sticky top-0。
◦ 效果：bg-slate-950/80 + backdrop-blur-md + 底边框 border-b border-slate-900。
◦ Logo: 左侧加粗 DCJA.，右侧简洁导航链接。
2.2 响应式网格 (The Grid)
• Project Gallery（与 PRD 一致 — **两档断点**）:
◦ **默认至 `lg` 以下**：1 列（含手机与平板宽度，统一单列，避免中间态 2 列）。
◦ **`lg` 及以上**：**3 列**画廊；外层 **max-w-6xl**，居中。
• Spacing: 模块间距统一使用 space-y-24 (大留白增加高级感)。
3. 内容视觉规范 (Jack 负责 - Content System)
Jack 需要确保 MDX 渲染出的内容符合整体审美。
3.1 MDX 文本排版 (Typography)
• 工具: 必须配置 @tailwindcss/typography 插件，并使用 .prose-invert 类。
• 代码高亮 (Shiki):
◦ 主题使用 tokyo-night 或 css-variables 以匹配 Slate-950 背景。
◦ 代码块圆角 rounded-lg，带细边框 border-slate-800。
• 图片容器: 所有 MDX 中的图片需包裹在 rounded-xl border border-slate-800 中，并支持SafeImage 逻辑。
3.2 技术标签 (Tech Badges)
• 视觉: 小写字母，font-mono 字体，px-2 py-1，圆角 rounded-md。
• 色彩: bg-blue-500/10 背景配合 text-blue-400 文字。
4. 协作接口：James 与 Jack 的对接点
为了防止代码冲突，两人需遵守以下规范：
• Slot 模式: James 编写页面模板（如 ProjectLayout.tsx），并预留 {children} 插槽给 Jack 的 MDX 内容。
• 组件复用:
◦ James 提供 Section 容器组件（统一处理标题间距）。
◦ Jack 调用 James 写的 Section 来包裹博客内容。
• 动效衔接: James 负责全局 PageTransition，Jack 负责文章内的点击交互。
5. 交互动效 (Motion)
• 入场: initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}。
• 悬停: 链接和卡片统一使用 transition-colors duration-300，避免生硬切换。