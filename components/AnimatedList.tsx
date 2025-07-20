import * as React from 'react';
import { FlatList, FlatListProps, ListRenderItemInfo } from 'react-native';
import Animated, { AnimateProps, Easing, Layout } from 'react-native-reanimated';

// Note: For this to work, you need to have react-native-reanimated properly configured.

interface AnimatedListProps<T> extends FlatListProps<T> {
  entering?: AnimateProps<typeof Animated.View>['entering'];
  exiting?: AnimateProps<typeof Animated.View>['exiting'];
  layout?: AnimateProps<typeof Animated.View>['layout'];
}

const AnimatedListItem = ({
  children,
  entering = Layout.easing(Easing.ease).duration(500),
  exiting = Layout.easing(Easing.ease).duration(500),
  layout = Layout.easing(Easing.ease).duration(500),
}: {
  children: React.ReactNode;
  entering?: AnimateProps<typeof Animated.View>['entering'];
  exiting?: AnimateProps<typeof Animated.View>['exiting'];
  layout?: AnimateProps<typeof Animated.View>['layout'];
}) => (
  <Animated.View entering={entering} exiting={exiting} layout={layout}>
    {children}
  </Animated.View>
);

function AnimatedListInner<T extends object>(
  { renderItem, entering, exiting, layout, ...props }: AnimatedListProps<T>,
  ref: React.Ref<FlatList<T>>
) {
  const renderAnimatedItem = (info: ListRenderItemInfo<T>) => {
    if (!renderItem) return null;
    return (
      <AnimatedListItem entering={entering} exiting={exiting} layout={layout}>
        {renderItem(info)}
      </AnimatedListItem>
    );
  };

  return <FlatList ref={ref} renderItem={renderAnimatedItem} {...props} />;
}

const AnimatedList = React.forwardRef(AnimatedListInner) as <T extends object>(
  props: AnimatedListProps<T> & { ref?: React.Ref<FlatList<T>> }
) => React.ReactElement;


export { AnimatedList };
