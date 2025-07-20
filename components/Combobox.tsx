import * as React from 'react';
import { useState, useCallback, createContext, useContext } from 'react';
import { View, Pressable } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { Popover } from './Popover';
import { Input } from './Input';
import { Feather } from '@expo/vector-icons';

interface ComboboxContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  setValue: (value: string) => void;
  onSelect: (value: string) => void;
}

const ComboboxContext = createContext<ComboboxContextProps | null>(null);

const useComboboxContext = () => {
  const context = useContext(ComboboxContext);
  if (!context) {
    throw new Error('Combobox components must be used within a Combobox provider');
  }
  return context;
};

interface ComboboxProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}

const Combobox = ({ children, value, onValueChange }: ComboboxProps) => {
  const [open, setOpen] = useState(false);

  const onSelect = useCallback((selectedValue: string) => {
    onValueChange(selectedValue);
    setOpen(false);
  }, [onValueChange]);

  const contextValue = { open, setOpen, value, setValue: onValueChange, onSelect };

  return (
    <ComboboxContext.Provider value={contextValue}>
      {children}
    </ComboboxContext.Provider>
  );
};

const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ onPress, ...props }, ref) => {
  const { setOpen } = useComboboxContext();
  return (
    <Pressable
      ref={ref}
      onPress={(e) => {
        setOpen(true);
        onPress?.(e);
      }}
      {...props}
    />
  );
});
ComboboxTrigger.displayName = 'ComboboxTrigger';

const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input>
>(({ onFocus, ...props }, ref) => {
  const { value, setValue, setOpen } = useComboboxContext();
  return (
    <Input
      ref={ref}
      value={value}
      onChangeText={setValue}
      onFocus={(e) => {
        setOpen(true);
        onFocus?.(e);
      }}
      {...props}
    />
  );
});
ComboboxInput.displayName = 'ComboboxInput';

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { open, setOpen } = useComboboxContext();

  return (
    <Popover isVisible={open} onRequestClose={() => setOpen(false)}>
      <View
        ref={ref}
        className={twMerge(
          'w-full rounded-md border border-border bg-background p-1 shadow-md',
          className
        )}
        {...props}
      >
        {children}
      </View>
    </Popover>
  );
});
ComboboxContent.displayName = 'ComboboxContent';

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & {
    value: string;
    iconClassName?: string;
  }
>(({ className, value, children, iconClassName, ...props }, ref) => {
  const { onSelect, value: currentValue } = useComboboxContext();
  const isSelected = currentValue === value;

  return (
    <Pressable
      ref={ref}
      onPress={() => onSelect(value)}
      className={twMerge(
        'flex-row items-center justify-between rounded-sm px-2 py-1.5',
        isSelected && 'bg-accent',
        className
      )}
      {...props}
    >
      <>{children}</>
      {isSelected && (
        <Feather
          name="check"
          size={16}
          className={twMerge('text-foreground', iconClassName)}
        />
      )}
    </Pressable>
  );
});
ComboboxItem.displayName = 'ComboboxItem';

export { Combobox, ComboboxTrigger, ComboboxInput, ComboboxContent, ComboboxItem };
