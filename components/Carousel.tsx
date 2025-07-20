import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  View,
  Dimensions,
  Pressable,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';

const { width: screenWidth } = Dimensions.get('window');

interface CarouselProps<T> extends React.ComponentPropsWithoutRef<typeof View> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
  contentContainerClassName?: string;
  dotsContainerClassName?: string;
  dotClassName?: string;
}

function CarouselInner<T extends object>(
  {
    data,
    renderItem,
    loop = false,
    autoplay = false,
    autoplayDelay = 3000,
    className,
    contentContainerClassName,
    dotsContainerClassName,
    dotClassName,
    ...props
  }: CarouselProps<T>,
  ref: React.Ref<View>
) {
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex === data.length - 1 ? 0 : prevIndex + 1;
          if (loop || nextIndex > prevIndex) {
            scrollViewRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
            return nextIndex;
          }
          return prevIndex;
        });
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, data.length, loop]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <View ref={ref} className={twMerge('relative', className)} {...props}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        contentContainerClassName={contentContainerClassName}
      >
        {data.map((item, index) => (
          <View key={index} style={{ width: screenWidth }}>
            {renderItem(item, index)}
          </View>
        ))}
      </Animated.ScrollView>
      <View
        className={twMerge(
          'absolute bottom-4 left-0 right-0 flex-row justify-center gap-2',
          dotsContainerClassName
        )}
      >
        {data.map((_, index) => (
          <Pressable
            key={index}
            onPress={() =>
              scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true })
            }
          >
            <View
              className={twMerge(
                'h-2 w-2 rounded-full bg-muted',
                currentIndex === index && 'bg-primary',
                dotClassName
              )}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const CarouselComponent = React.forwardRef(CarouselInner);
CarouselComponent.displayName = 'Carousel';

const Carousel = CarouselComponent as <T extends object>(
  props: CarouselProps<T> & { ref?: React.Ref<View> }
) => React.ReactElement;

export { Carousel };
