import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { twMerge } from "tailwind-merge";


// --- Context ---
interface TabsContextProps {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextProps | null>(null);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component");
  }
  return context;
};

// --- Tabs ---
interface TabsProps extends React.ComponentPropsWithoutRef<typeof View> {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const Tabs = React.forwardRef<View, TabsProps>(
  ({ value, onValueChange, className, children, ...props }, ref) => {
    const contextValue = React.useMemo(
      () => ({ value, onValueChange }),
      [value, onValueChange]
    );
    return (
      <TabsContext.Provider value={contextValue}>
        <View ref={ref} className={className} {...props}>{children}</View>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

// --- TabsList ---
const TabsList = React.forwardRef<
  React.ComponentRef<typeof ScrollView>,
  React.ComponentPropsWithoutRef<typeof ScrollView>
>(({ className, contentContainerStyle, ...props }, ref) => (
  <ScrollView
    ref={ref}
    horizontal
    showsHorizontalScrollIndicator={false}
    className={twMerge(
      "h-10 rounded-lg bg-muted p-1 text-muted-foreground dark:bg-muted-dark dark:text-muted-foreground-dark",
      className
    )}
    contentContainerStyle={[
      { flexDirection: "row", alignItems: "center", justifyContent: "center" },
      contentContainerStyle,
    ]}
    {...props}
  />
));
TabsList.displayName = "TabsList";

// --- TabsTrigger ---
interface TabsTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> {
  value: string;
  children: React.ReactNode;
}

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  TabsTriggerProps
>(({ value, className, children, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = useTabsContext();
  const isActive = selectedValue === value;

  return (
    <Pressable
      ref={ref}
      onPress={() => onValueChange(value)}
      disabled={props.disabled}
      className={twMerge(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive && "bg-background text-foreground shadow-sm-native dark:bg-background-dark dark:text-foreground-dark",
        className
      )}
      {...props}
    >
      <Text
        className={twMerge(
          "text-sm font-medium",
          isActive ? "text-foreground dark:text-foreground-dark" : "text-muted-foreground dark:text-muted-foreground-dark"
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
});
TabsTrigger.displayName = "TabsTrigger";

// --- TabsContent ---
interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  value: string;
}

const TabsContent = React.forwardRef<View, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const { value: selectedValue } = useTabsContext();
    const isActive = selectedValue === value;

    if (!isActive) return null;

    return (
      <View
        ref={ref}
        className={twMerge(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
