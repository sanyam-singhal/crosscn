import { ActivityIndicator, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary-dark dark:text-primary-dark-foreground dark:hover:bg-primary-dark/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive-dark dark:text-destructive-dark-foreground dark:hover:bg-destructive-dark/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground dark:border-input-dark dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary-dark dark:text-secondary-dark-foreground dark:hover:bg-secondary-dark/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva("text-center font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground dark:text-primary-dark-foreground",
      destructive: "text-destructive-foreground dark:text-destructive-dark-foreground",
      outline: "text-foreground dark:text-foreground-dark",
      secondary: "text-secondary-foreground dark:text-secondary-dark-foreground",
      ghost: "text-foreground dark:text-foreground-dark",
      link: "text-primary",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  label: string;
  loading?: boolean;
  textClassName?: string;
}

const Button = ({
  label,
  loading,
  className,
  textClassName,
  variant,
  size,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      className={twMerge(clsx(buttonVariants({ variant, size, className })))}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          className={twMerge(clsx(buttonTextVariants({ variant, size })), textClassName)}
        />
      ) : (
        <Text className={twMerge(clsx(buttonTextVariants({ variant, size })), textClassName)}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

export { Button, buttonVariants };
