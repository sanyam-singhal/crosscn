import * as React from 'react';
import RNContextMenu, {
  ContextMenuAction,
  ContextMenuProps,
} from 'react-native-context-menu-view';

interface ContextMenuContextProps {
  trigger: React.ReactNode;
  setTrigger: (trigger: React.ReactNode) => void;
  actions: ContextMenuAction[];
  setActions: (actions: ContextMenuAction[]) => void;
}

const ContextMenuContext = React.createContext<ContextMenuContextProps | null>(null);

const useContextMenuContext = () => {
  const context = React.useContext(ContextMenuContext);
  if (!context) {
    throw new Error('ContextMenu components must be used within a ContextMenu provider');
  }
  return context;
};

const ContextMenu = (props: Omit<ContextMenuProps, 'actions'>) => {
  const [trigger, setTrigger] = React.useState<React.ReactNode>(null);
  const [actions, setActions] = React.useState<ContextMenuAction[]>([]);

  return (
    <ContextMenuContext.Provider value={{ trigger, setTrigger, actions, setActions }}>
      <RNContextMenu actions={actions} {...props}>
        {trigger}
      </RNContextMenu>
    </ContextMenuContext.Provider>
  );
};

const ContextMenuTrigger = ({ children }: { children: React.ReactNode }) => {
  const { setTrigger } = useContextMenuContext();
  React.useEffect(() => {
    setTrigger(children);
  }, [children, setTrigger]);
  return null;
};

const ContextMenuContent = ({ children }: { children: React.ReactNode }) => {
  const { setActions } = useContextMenuContext();
  React.useEffect(() => {
    const actions = React.Children.toArray(children)
      .map((child) => {
        if (React.isValidElement(child)) {
          return child.props as ContextMenuAction;
        }
        return null;
      })
      .filter((action): action is ContextMenuAction => action !== null);
    setActions(actions);
  }, [children, setActions]);

  return null;
};

const ContextMenuItem = (_props: ContextMenuAction) => {
  // This component is only for passing props
  return null;
};

export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem };
