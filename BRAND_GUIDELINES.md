# 空行 UAM 品牌指南

## 品牌标识

**品牌名称**: 空行 UAM  
**英文名**: KongXing UAM  
**品牌定位**: 城市空中出行服务平台  
**设计语言**: Uber 极简黑白双色调 (Black & White Duet)

---

## 视觉标准

### 核心调色板

| Token | 色值 | 用途 |
|-------|------|------|
| `primary` | `#000000` | 主按钮、强调文字、选中态 |
| `on-primary` | `#FFFFFF` | 主色上的文字/图标 |
| `background` | `#FFFFFF` | 页面背景 |
| `on-background` | `#000000` | 背景上的主文字 |
| `surface` | `#FFFFFF` | 卡片/容器背景 |
| `surface-variant` | `#F6F6F6` | 次级容器、输入框背景 |
| `on-surface-variant` | `#5E5E5E` | 辅助文字、说明文字 |
| `outline` | `#E2E2E2` | 边框、分割线 |
| `outline-variant` | `#EEEEEE` | 轻量分割线 |

### 语义色

| Token | 色值 | 用途 |
|-------|------|------|
| `secondary` | `#333333` | 次级按钮 |
| `secondary-container` | `#F6F6F6` | 次级容器 |

### 禁止使用的颜色

- ❌ Tailwind 原生 `neutral-*`、`gray-*`、`blue-*` 等非 token 颜色
- ❌ 任何未在设计系统中定义的十六进制值
- ✅ 始终使用 `tailwind.config.js` 中定义的语义 token

---

## 排版系统

**字体族**: Inter (sans-serif)

| 级别 | Token | 尺寸/行高 | 字重 | 用途 |
|------|-------|-----------|------|------|
| Display XXL | `text-display-xxl` | 52/64px | 700 | 大标题（极少使用） |
| Display XL | `text-display-xl` | 36/44px | 700 | 页面主标题 |
| Display LG | `text-display-lg` | 32/40px | 700 | 时间、价格等关键数据 |
| Display MD | `text-display-md` | 24/32px | 700 | 区块标题 |
| Display SM | `text-display-sm` | 20/28px | 700 | 卡片标题、导航标题 |
| Body LG | `text-body-lg` | 18/24px | 500 | 重要正文 |
| Body MD | `text-body-md` | 16/24px | 400 | 正文 |
| Body SM | `text-body-sm` | 14/20px | 400 | 辅助正文 |
| Label LG | `text-label-lg` | 16/20px | 500 | 按钮文字、标签 |
| Label MD | `text-label-md` | 14/18px | 500 | 小按钮、标签 |
| Label SM | `text-label-sm` | 12/16px | 500 | 徽章、注释 |

---

## 间距系统

基于 4px 网格：

| Token | 值 | 用途 |
|-------|-----|------|
| `stack-sm` | 8px | 同级元素间距 |
| `stack-md` | 16px | 卡片内部间距 |
| `stack-lg` | 32px | 区块间距 |
| `gutter` | 12px | 页面水平边距 |
| `container-padding` | 32px | 容器内边距 |

---

## 圆角系统

| Token | 值 | 用途 |
|-------|-----|------|
| `rounded-sm` | 4px | 小元素 |
| `rounded-md` | 8px | 输入框 |
| `rounded-lg` | 12px | 一般卡片 |
| `rounded-xl` | 16px | 主要卡片（Uber 标准） |
| `rounded-2xl` | 24px | 底部抽屉 |
| `rounded-pill` | 999px | 按钮、标签（Uber 签名） |

---

## 阴影系统

| Token | 值 | 用途 |
|-------|-----|------|
| `shadow-uber-1` | `0 4px 16px rgba(0,0,0,0.12)` | 轻量浮起 |
| `shadow-uber-2` | `0 4px 16px rgba(0,0,0,0.16)` | 卡片 |
| `shadow-uber-3` | `0 2px 8px rgba(0,0,0,0.16)` | 按钮浮起 |

---

## 组件规范

### Button 组件

所有交互按钮必须使用 `<Button>` 组件（`src/components/Button.tsx`），禁止内联按钮样式。

**主要 CTA 模式**:
```tsx
<Button size="full" shape="pill" onClick={handleAction}>
  操作文字
</Button>
```

**带图标**:
```tsx
<Button size="full" shape="pill" rightIcon={<ChevronRight size={20} />}>
  下一步
</Button>
```

### 页面结构

```
┌─────────────────────────┐
│ Header (h-14, sticky)   │
├─────────────────────────┤
│ StepIndicator (可选)     │
├─────────────────────────┤
│                         │
│ Main Content            │
│ (flex-1, overflow-auto) │
│                         │
├─────────────────────────┤
│ Footer CTA (sticky)     │
│ (pb-safe, border-t)     │
└─────────────────────────┘
```

---

## 交互规范

- 按钮按下: `active:scale-[0.98]`
- 过渡动画: `transition-all` 或 `transition-colors`
- 页面切换: 使用 framer-motion 或 StaggeredList
- 禁用态: `disabled:bg-outline/50 disabled:cursor-not-allowed`
- 焦点态: `focus-visible:outline-2 focus-visible:outline-primary`

---

## 移动端适配

- 安全区域: 使用 `pb-safe` / `pt-safe-top`
- 滚动条: 全局隐藏 (CSS `scrollbar-width: none`)
- 触摸优化: `touch-action: manipulation`
- 最小触摸目标: 44×44px

---

## 品牌语调

- **专业但亲切**: 科技感但不冰冷
- **简洁直接**: 避免冗余描述
- **中文优先**: 界面文案使用中文，技术标注可用英文
- **动词驱动**: "查看方案"、"确认选择"、"立即支付"

---

## 质量检查清单

发布前确认：
1. ✅ 所有颜色使用设计系统 token
2. ✅ 所有 CTA 按钮使用 `Button` 组件
3. ✅ 间距遵循 4px 网格
4. ✅ 圆角使用预定义 token
5. ✅ 无临时/调试代码残留
6. ✅ 所有交互元素有 `aria-label`
7. ✅ 页面结构遵循 Header → Content → Footer 模式
