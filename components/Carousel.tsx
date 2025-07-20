import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  View,
  Pressable,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

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
  const flatListRef = useRef<FlatList<T>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    if (autoplay && carouselWidth > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % data.length;
          if (loop || nextIndex > prevIndex) {
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            return nextIndex;
          }
          return prevIndex;
        });
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, data.length, loop, carouselWidth]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (carouselWidth > 0) {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(contentOffsetX / carouselWidth);
      setCurrentIndex(index);
    }
  };

  const renderCarouselItem: ListRenderItem<T> = ({ item, index }) => {
    return (
      <View style={{ width: carouselWidth }}>
        {renderItem(item, index)}
      </View>
    );
  };

  return (
    <View
      ref={ref}
      className={twMerge('relative', className)}
      onLayout={(event) => {
        setCarouselWidth(event.nativeEvent.layout.width);
      }}
      {...props}
    >
      {carouselWidth > 0 && (
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderCarouselItem}
          keyExtractor={(_item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          contentContainerClassName={contentContainerClassName}
        />
      )}
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
              flatListRef.current?.scrollToIndex({ index, animated: true })
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
