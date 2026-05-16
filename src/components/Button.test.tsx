import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  describe('基础功能', () => {
    it('应该渲染按钮文本', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('应该响应点击事件', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('禁用时不应该响应点击', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('变种 (Variants)', () => {
    it('primary 变种应该有正确的样式', () => {
      const { container } = render(<Button variant="primary">Primary</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('bg-primary');
    });

    it('secondary 变种应该有正确的样式', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('bg-secondary');
    });

    it('destructive 变种应该有红色样式', () => {
      const { container } = render(<Button variant="destructive">Delete</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('bg-red-500');
    });
  });

  describe('尺寸 (Sizes)', () => {
    it('full 尺寸应该是全宽', () => {
      const { container } = render(<Button size="full">Full</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('w-full');
      expect(button?.className).toContain('h-14');
    });

    it('icon 尺寸应该是正方形', () => {
      const { container } = render(<Button size="icon">●</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('h-10');
      expect(button?.className).toContain('w-10');
    });
  });

  describe('形状 (Shapes)', () => {
    it('pill 形状应该有 rounded-pill 类', () => {
      const { container } = render(<Button shape="pill">Pill</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('rounded-pill');
    });

    it('circle 形状应该有 rounded-full 类', () => {
      const { container } = render(<Button shape="circle">●</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('rounded-full');
    });
  });

  describe('加载状态', () => {
    it('isLoading 时应该显示加载文本', () => {
      render(<Button isLoading>Loading...</Button>);
      
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('isLoading 时应该禁用按钮', () => {
      render(<Button isLoading>Loading...</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('isLoading 时应该设置 aria-busy', () => {
      render(<Button isLoading>Loading</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('图标', () => {
    it('应该渲染左图标', () => {
      render(
        <Button leftIcon={<span>←</span>}>
          Back
        </Button>
      );
      
      expect(screen.getByText('←')).toBeInTheDocument();
      expect(screen.getByText('Back')).toBeInTheDocument();
    });

    it('应该渲染右图标', () => {
      render(
        <Button rightIcon={<span>→</span>}>
          Next
        </Button>
      );
      
      expect(screen.getByText('→')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('应该同时渲染左右图标', () => {
      render(
        <Button 
          leftIcon={<span>←</span>} 
          rightIcon={<span>→</span>}
        >
          Action
        </Button>
      );
      
      expect(screen.getByText('←')).toBeInTheDocument();
      expect(screen.getByText('→')).toBeInTheDocument();
    });
  });

  describe('无障碍性', () => {
    it('按钮应该有 button role', () => {
      render(<Button>Accessible</Button>);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('禁用按钮应该可访问', () => {
      render(<Button disabled>Disabled</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');
    });

    it('应该支持 aria-label', () => {
      render(
        <Button aria-label="Custom label">
          Button
        </Button>
      );
      
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
    });
  });

  describe('组合测试', () => {
    it('应该支持多个属性的组合', () => {
      const { container } = render(
        <Button 
          variant="destructive" 
          size="full" 
          shape="pill"
          aria-label="Delete item"
        >
          Delete
        </Button>
      );
      
      const button = container.querySelector('button');
      expect(button?.className).toContain('bg-red-500');
      expect(button?.className).toContain('w-full');
      expect(button?.className).toContain('rounded-pill');
      expect(button).toHaveAttribute('aria-label', 'Delete item');
    });
  });
});
