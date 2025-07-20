import React from "react";
import { Pressable, ActivityIndicator, View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

const iconButtonVariants = cva(
  "items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary dark:bg-primary-dark",
        destructive: "bg-destructive dark:bg-destructive-dark",
        outline: "border border-input hover:bg-accent dark:border-input-dark dark:hover:bg-accent-dark",
        secondary: "bg-secondary dark:bg-secondary-dark",
        ghost: "hover:bg-accent dark:hover:bg-accent-dark",
        link: "",
      },
      size: {
        default: "h-10 w-10",
        sm: "h-9 w-9 rounded-md",
        lg: "h-11 w-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-primary-foreground dark:text-primary-dark-foreground",
      destructive: "text-destructive-foreground dark:text-destructive-dark-foreground",
      outline: "text-accent-foreground dark:text-accent-dark-foreground",
      secondary: "text-secondary-foreground dark:text-secondary-dark-foreground",
      ghost: "text-accent-foreground dark:text-accent-dark-foreground",
      link: "text-primary dark:text-primary-dark underline-offset-4",
    },
    size: {
      default: "h-5 w-5",
      sm: "h-4 w-4",
      lg: "h-6 w-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface IconButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactElement<{ className?: string }>;
  loading?: boolean;
  iconClassName?: string;
}

const IconButton = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  IconButtonProps
>(({ className, variant, size, icon, loading, iconClassName: customIconClassName, ...props }, ref) => {
  const iconClassName = twMerge(clsx(iconVariants({ variant, size })), customIconClassName);

  return (
    <Pressable
      ref={ref}
      className={twMerge(clsx(iconButtonVariants({ variant, size, className })))}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator className={iconClassName} />
      ) : (
        <View>
          {React.cloneElement(icon, {
            className: twMerge(icon.props.className, iconClassName),
          })}
        </View>
      )}
    </Pressable>
  );
});
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
