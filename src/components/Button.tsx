import React from 'react';
import { cn } from '../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'icon' | 'icon-lg';
export type ButtonShape = 'default' | 'rounded' | 'pill' | 'circle';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Button shape */
  shape?: ButtonShape;
  /** Display loading spinner */
  isLoading?: boolean;
  /** Left icon/element */
  leftIcon?: React.ReactNode;
  /** Right icon/element */
  rightIcon?: React.ReactNode;
}

/**
 * Button Component
 * 
 * Versatile button component with multiple variants, sizes, and shapes.
 * Supports loading states, icons, and accessibility features.
 * 
 * @example
 * // Primary button
 * <Button>Click me</Button>
 * 
 * // Secondary with icons
 * <Button variant="secondary" leftIcon={<Icon />}>
 *   Action
 * </Button>
 * 
 * // Loading state
 * <Button isLoading>Processing...</Button>
 * 
 * // Full width pill button
 * <Button size="full" shape="pill">Submit</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    shape = 'rounded',
    isLoading = false,
    leftIcon,
    rightIcon,
    className,
    disabled,
    children,
    ...props
  }, ref) => {
    const isDisabled = disabled || isLoading;

    // Variant styles
    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'bg-primary text-white shadow-uber-3 hover:bg-primary/90 disabled:bg-outline/50 disabled:text-on-surface-variant',
      secondary: 'bg-secondary text-on-secondary shadow-uber-2 hover:bg-secondary/90 disabled:bg-surface-variant disabled:text-on-surface-variant',
      tertiary: 'bg-surface-variant text-on-surface hover:bg-outline/20 disabled:bg-surface-variant disabled:text-on-surface-variant',
      ghost: 'text-primary hover:bg-surface-variant disabled:text-on-surface-variant',
      destructive: 'bg-red-500 text-white shadow-uber-2 hover:bg-red-600 disabled:bg-surface-variant disabled:text-on-surface-variant',
    };

    // Size styles
    const sizeClasses: Record<string, string> = {
      xs: 'h-8 px-3 text-label-sm',
      sm: 'h-10 px-4 text-label-md',
      md: 'h-12 px-6 text-label-lg',
      lg: 'h-11 px-6 text-body-md',
      xl: 'h-16 px-10 text-body-lg',
      full: 'w-full h-[52px] px-4 text-label-lg',
      icon: 'h-10 w-10 p-2',
      'icon-lg': 'h-12 w-12 p-2',
    };

    // Shape styles
    const shapeClasses: Record<ButtonShape, string> = {
      default: 'rounded-lg',
      rounded: 'rounded-xl',
      pill: 'rounded-pill',
      circle: 'rounded-full',
    };

    const colorStyle = variant === 'primary' ? { color: '#ffffff' } : 
                       variant === 'secondary' ? { color: '#ffffff' } : undefined;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        style={colorStyle}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-body font-bold transition-all active:scale-[0.98] disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          variantClasses[variant],
          sizeClasses[size],
          shapeClasses[shape],
          isLoading && 'opacity-70',
          className
        )}
        {...(isLoading && { 'aria-busy': 'true' })}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
