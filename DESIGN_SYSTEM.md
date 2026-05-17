# 空行 UAM — 设计系统规范

> 本规范适用于 UAM 预订实验原型，确保 8 个实验组的视觉一致性。
> 容器宽度：390px - 430px（移动端）

---

## 1. 排版层级

| Token | 尺寸 | 行高 | 字重 | 用途 |
|-------|------|------|------|------|
| `text-display-lg` | 32px | 40px | 700 | 关键数据（时间、大价格） |
| `text-display-md` | 24px | 32px | 700 | 区块标题、总价 |
| `text-display-sm` | 20px | 28px | 700 | 页面标题、卡片标题 |
| `text-body-lg` | 18px | 24px | 500 | 底部 Sheet 标题 |
| `text-body-md` | 16px | 24px | 400 | 正文、列表项标题 |
| `text-body-sm` | 14px | 20px | 400 | 辅助正文 |
| `text-label-lg` | 16px | 20px | 500 | 按钮文字、重要标签 |
| `text-label-md` | 14px | 18px | 500 | 次级标签、表单标签 |
| `text-label-sm` | 12px | 16px | 500 | 小标签、徽章、注释 |
| `text-caption` | 11px | 14px | 500 | 最小文字（时间线描述、卡片副标题） |

### 禁止使用
- ❌ `text-[9px]` — 太小，改用 `text-caption` 或 `text-label-sm`
- ❌ `text-[10px]` — 改用 `text-label-sm` (12px)
- ❌ `text-[11px]` — 改用 `text-caption` (11px token)
- ❌ `text-[12px]` — 改用 `text-label-sm`

---

## 2. 间距系统（4px 网格）

### 语义 Token

| Token | 值 | 用途 |
|-------|-----|------|
| `gap-xs` | 4px | 图标与文字紧凑间距 |
| `gap-sm` | 8px | 同级小元素间距 |
| `gap-md` | 12px | 列表项间距、图标+文字 |
| `gap-lg` | 16px | 卡片内部元素间距 |
| `gap-xl` | 24px | 区块间距 |
| `gap-2xl` | 32px | 页面级区块间距 |

### 页面边距

| Token | 值 | 用途 |
|-------|-----|------|
| `px-page` | 16px | 页面水平内边距（统一） |
| `py-section` | 24px | 区块垂直间距 |
| `p-card` | 16px | 卡片内边距（标准） |
| `p-card-lg` | 20px | 卡片内边距（重要卡片） |

### 禁止使用
- ❌ `px-gutter` (12px) 和 `px-container-padding` (32px) 混用
- ❌ 直接写 `px-4`、`px-5`、`px-6` 代替语义 token

---

## 3. 组件尺寸

### 按钮

| 类型 | 高度 | 圆角 | 字体 |
|------|------|------|------|
| 主 CTA | 52px (`h-[52px]`) | `rounded-xl` | `text-label-lg font-bold` |
| 次级按钮 | 44px (`h-11`) | `rounded-xl` | `text-label-md font-bold` |
| 小按钮/Chip | 36px (`h-9`) | `rounded-pill` | `text-label-sm font-bold` |
| 图标按钮 | 40px (`w-10 h-10`) | `rounded-full` | — |

### 卡片

| 类型 | 内边距 | 圆角 | 阴影 |
|------|--------|------|------|
| 主要卡片（选中） | `p-card-lg` (20px) | `rounded-2xl` | `shadow-uber-2` + `border-2 border-primary` |
| 标准卡片 | `p-card` (16px) | `rounded-xl` | `shadow-uber-1` + `border border-outline/10` |
| 信息卡片（实验模块） | `p-card` (16px) | `rounded-xl` | 无阴影 + `border border-outline/5` |
| 内嵌区块 | `p-3` (12px) | `rounded-lg` | 无 |

### 图标容器

| 类型 | 尺寸 | 用途 |
|------|------|------|
| 大图标 | `w-12 h-12` | 状态卡片、重要操作 |
| 标准图标 | `w-10 h-10` | 列表项图标、导航 |
| 小图标 | `w-8 h-8` | 支付方式、辅助信息 |

### Header

| 属性 | 值 |
|------|-----|
| 高度 | `h-14` (56px) |
| 背景 | `bg-white/90 backdrop-blur-md` |
| 定位 | `sticky top-0 z-40` |
| 标题 | `text-display-sm font-bold` |

### Footer CTA

| 属性 | 值 |
|------|-----|
| 内边距 | `px-page py-4 pb-safe` |
| 背景 | `bg-white border-t border-outline/10` |
| 按钮 | 主 CTA 规格 |

---

## 4. 圆角系统

| Token | 值 | 用途 |
|-------|-----|------|
| `rounded-sm` | 4px | 小标签 |
| `rounded-md` | 8px | 输入框、内嵌区块 |
| `rounded-lg` | 12px | 信息条、内嵌卡片 |
| `rounded-xl` | 16px | 标准卡片、按钮 |
| `rounded-2xl` | 24px | 主要卡片、底部 Sheet |
| `rounded-pill` | 999px | Chip、日期选择器 |
| `rounded-full` | 9999px | 圆形图标按钮 |

---

## 5. 阴影系统

| Token | 值 | 用途 |
|-------|-----|------|
| `shadow-uber-1` | `0 4px 16px rgba(0,0,0,0.12)` | 标准卡片 |
| `shadow-uber-2` | `0 4px 16px rgba(0,0,0,0.16)` | 选中卡片、浮动元素 |
| `shadow-uber-3` | `0 2px 8px rgba(0,0,0,0.16)` | 按钮 |

---

## 6. 颜色系统

| Token | 色值 | 用途 |
|-------|------|------|
| `primary` | #000000 | 主按钮、选中态、强调 |
| `on-primary` | #ffffff | 主色上的文字 |
| `background` | #ffffff | 页面背景 |
| `on-surface` | #000000 | 主文字 |
| `on-surface-variant` | #5e5e5e | 辅助文字 |
| `surface-variant` | #f6f6f6 | 次级背景、输入框 |
| `outline` | #e2e2e2 | 边框 |
| `outline-variant` | #eeeeee | 轻量分割线 |

---

## 7. 页面结构模板

```
┌─────────────────────────────┐
│ Header: h-14, sticky        │
├─────────────────────────────┤
│                             │
│ Main Content                │
│ px-page, flex-1             │
│ overflow-y-auto             │
│                             │
├─────────────────────────────┤
│ Footer: px-page py-4 pb-safe│
│ border-t, sticky bottom     │
└─────────────────────────────┘
```

---

## 8. 实验页面（页面 6）特殊规范

| 属性 | 要求 |
|------|------|
| 信息模块卡片高度 | 固定 `h-[80px]` |
| 卡片数量 | 固定 3 张 |
| 模块位置 | 价格明细下方，支付按钮上方 |
| 文字溢出 | 标题 `truncate`，副标题 `line-clamp-2` |
| 8 组一致性 | 模块高度、按钮位置完全相同 |

---

## 9. 应用规则

1. 所有页面水平边距统一使用 `px-page`
2. 卡片内边距根据重要性选择 `p-card` 或 `p-card-lg`
3. 元素间距使用语义 token（`gap-sm` ~ `gap-2xl`）
4. 不使用裸像素值（`text-[Xpx]`），使用 `text-caption` 代替 11px
5. 图标容器尺寸三选一：`w-8`、`w-10`、`w-12`
6. 按钮高度三选一：52px（主CTA）、44px（次级）、36px（小按钮）
