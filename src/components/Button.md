# Button Component Library

统一的按钮组件库，支持多种样式、尺寸和形状。

## 基础用法

```tsx
import { Button } from '@/components/Button';

export function Example() {
  return (
    <>
      {/* 主按钮 */}
      <Button>Click me</Button>
      
      {/* 不同变种 */}
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      
      {/* 不同尺寸 */}
      <Button size="sm">Small</Button>
      <Button size="md">Medium (default)</Button>
      <Button size="lg">Large</Button>
      
      {/* 不同形状 */}
      <Button shape="default">Default</Button>
      <Button shape="rounded">Rounded</Button>
      <Button shape="pill">Pill</Button>
      <Button shape="circle">●</Button>
      
      {/* 全宽按钮 */}
      <Button size="full">Full Width</Button>
      <Button size="full" shape="pill">Full Width Pill</Button>
      
      {/* 带图标 */}
      <Button leftIcon={<IconLeft />}>With Left Icon</Button>
      <Button rightIcon={<IconRight />}>With Right Icon</Button>
      
      {/* 加载状态 */}
      <Button isLoading>Processing...</Button>
      
      {/* 禁用状态 */}
      <Button disabled>Disabled</Button>
    </>
  );
}
```

## 变种 (Variants)

### Primary (主要)
- **用途**: 主要行动按钮
- **强调**: 高
- **示例**: 提交表单、确认操作

```tsx
<Button variant="primary">Primary Action</Button>
```

### Secondary (次要)
- **用途**: 替代行动按钮
- **强调**: 中
- **示例**: 备选选项

```tsx
<Button variant="secondary">Secondary Action</Button>
```

### Tertiary (第三)
- **用途**: 不太重要的行动
- **强调**: 低
- **示例**: 取消、返回

```tsx
<Button variant="tertiary">Tertiary Action</Button>
```

### Ghost (幽灵)
- **用途**: 最小化外观，文本按钮
- **强调**: 最低
- **示例**: 链接样式按钮

```tsx
<Button variant="ghost">Ghost Action</Button>
```

### Destructive (破坏性)
- **用途**: 危险操作
- **强调**: 高（红色）
- **示例**: 删除、不可逆操作

```tsx
<Button variant="destructive">Delete</Button>
```

## 尺寸 (Sizes)

- `xs`: 8px 高度，最小
- `sm`: 10px 高度，小
- `md`: 12px 高度，默认
- `lg`: 14px 高度，大
- `xl`: 16px 高度，超大
- `full`: 全宽 (14px 高度)
- `icon`: 图标按钮 (10x10px)
- `icon-lg`: 大图标按钮 (12x12px)

```tsx
<Button size="sm">Small Button</Button>
<Button size="lg">Large Button</Button>
<Button size="full">Full Width Button</Button>
```

## 形状 (Shapes)

- `default`: 8px 圆角 (rounded-lg)
- `rounded`: 12px 圆角 (rounded-xl)
- `pill`: 药丸形 (rounded-pill)
- `circle`: 完全圆形 (rounded-full)

```tsx
<Button shape="rounded">Rounded</Button>
<Button shape="pill">Pill Shape</Button>
<Button shape="circle">●</Button>
```

## 组合示例

### CTA 按钮 (常见用法)
```tsx
<Button 
  size="full" 
  shape="pill"
  onClick={handleSubmit}
>
  确认
</Button>
```

### 图标按钮
```tsx
<Button 
  size="icon" 
  shape="circle" 
  variant="ghost"
  aria-label="菜单"
>
  <Menu size={20} />
</Button>
```

### 带加载状态
```tsx
const [isLoading, setIsLoading] = useState(false);

<Button
  isLoading={isLoading}
  onClick={async () => {
    setIsLoading(true);
    await submitForm();
    setIsLoading(false);
  }}
>
  提交
</Button>
```

## 无障碍性

Button 组件已内置无障碍性支持：

- ✅ `aria-busy` 在加载状态时
- ✅ `aria-label` 用于图标按钮
- ✅ `focus-visible` 键盘导航焦点
- ✅ `disabled` 属性正确处理

```tsx
<Button 
  aria-label="删除项目"
  leftIcon={<Trash2 size={20} />}
  variant="destructive"
>
  Delete
</Button>
```

## 类型定义

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'icon' | 'icon-lg';
type ButtonShape = 'default' | 'rounded' | 'pill' | 'circle';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

## 迁移指南

如果你已经有硬编码的按钮样式，迁移到 Button 组件：

### 之前
```tsx
<button className="w-full h-14 bg-primary text-on-primary rounded-pill text-label-lg font-bold">
  Submit
</button>
```

### 之后
```tsx
<Button size="full" shape="pill">
  Submit
</Button>
```

## 最佳实践

1. **选择正确的变种** - 根据操作的重要性选择变种
2. **一致的尺寸** - 优先使用标准尺寸而非自定义
3. **提供标签** - 对于图标按钮，始终提供 `aria-label`
4. **加载反馈** - 对于异步操作，使用 `isLoading` 状态
5. **禁用状态** - 清晰地禁用不可用的按钮

## 更新历史

- **v1.0.0** - 初始版本，5 个变种，8 种尺寸，4 种形状
