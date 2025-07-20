import * as React from 'react';
import { useState, useCallback } from 'react';
import {
  View,
  Pressable,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CollapsibleContextProps {
  isOpen: boolean;
  toggle: () => void;
}

const CollapsibleContext = React.createContext<CollapsibleContextProps | null>(null);

const useCollapsibleContext = () => {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error('Collapsible components must be used within a Collapsible provider');
  }
  return context;
};

interface CollapsibleProps extends React.ComponentPropsWithoutRef<typeof View> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

const Collapsible = ({ open: controlledOpen, onOpenChange, defaultOpen = false, ...props }: CollapsibleProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;

  const isOpen = isControlled ? controlledOpen : internalOpen;

  const toggle = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (isControlled) {
      onOpenChange?.(!isOpen);
    } else {
      setInternalOpen(!isOpen);
    }
  }, [isControlled, isOpen, onOpenChange]);

  const contextValue = { isOpen, toggle };

  return (
    <CollapsibleContext.Provider value={contextValue}>
      <View {...props} />
    </CollapsibleContext.Provider>
  );
};

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>((props, ref) => {
  const { toggle } = useCollapsibleContext();
  return <Pressable ref={ref} onPress={toggle} {...props} />;
});
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const CollapsibleContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { isOpen } = useCollapsibleContext();

  if (!isOpen) {
    return null;
  }

  return (
    <View ref={ref} className={twMerge('overflow-hidden', className)} {...props}>
      {children}
    </View>
  );
});
CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
