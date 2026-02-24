import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      default: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 hover:shadow-primary/30 active:translate-y-0",
      secondary: "bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90 hover:-translate-y-0.5 active:translate-y-0",
      outline: "border-2 border-primary/20 text-primary hover:border-primary hover:bg-primary/5 active:bg-primary/10",
      ghost: "text-foreground hover:bg-muted hover:text-foreground active:bg-muted/80",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm rounded-lg",
      default: "h-11 px-6 text-base font-medium rounded-xl",
      lg: "h-14 px-8 text-lg font-semibold rounded-2xl",
      icon: "h-11 w-11 flex items-center justify-center rounded-xl",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("bg-card text-card-foreground rounded-2xl border border-border/50 shadow-xl shadow-black/5 overflow-hidden transition-all duration-300", className)} {...props}>
    {children}
  </div>
);

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border-2 border-border/50 bg-background/50 px-4 py-2 text-base transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground/80 mb-2 block", className)}
      {...props}
    />
  )
);
Label.displayName = "Label";

export const Badge = ({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "outline" | "success" }) => {
  const variants = {
    default: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    success: "bg-green-500/10 text-green-600 border-green-500/20",
    outline: "border-border text-foreground",
  };
  return (
    <div className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors", variants[variant], className)} {...props} />
  );
};
