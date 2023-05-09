import React, { ReactElement } from "react";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface SortableItemProps {
  index: number;
  offsets: { y: Animated.SharedValue<number> }[];
  children: ReactElement;
  width: number;
  height: number;
  activeCard: Animated.SharedValue<number>;
}

const SortableItem = ({
  index,
  offsets,
  children,
  width,
  height,
  activeCard,
}: SortableItemProps) => {
  const currentOffset = offsets[index];
  const isGestureActive = useSharedValue(false);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offsetY: number }
  >({
    onStart: (_, ctx) => {
      activeCard.value = index;
      isGestureActive.value = true;
      ctx.offsetY = currentOffset.y.value;
    },
    onActive: (event, ctx) => {
      x.value = event.translationX;
      y.value = event.translationY + ctx.offsetY;
      const offsetY = Math.round(y.value / height) * height;
      offsets.forEach((offset, i) => {
        if (offset.y.value === offsetY && index !== i) {
          offset.y.value = currentOffset.y.value;
          currentOffset.y.value = offsetY;
        }
      });
    },
    onEnd: () => {
      isGestureActive.value = false;
      x.value = withSpring(0);
      y.value = withSpring(currentOffset.y.value);
    },
  });
  const translateY = useDerivedValue(() => {
    if (isGestureActive.value) {
      return y.value;
    } else {
      return withSpring(currentOffset.y.value);
    }
  });
  const style = useAnimatedStyle(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    zIndex: activeCard.value === index ? 100 : 1,
    transform: [
      { translateY: translateY.value },
      { translateX: x.value },
      { scale: withSpring(isGestureActive.value ? 1.05 : 1) },
    ],
  }));
  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View {...{ style }}>{children}</Animated.View>
    </PanGestureHandler>
  );
};

export default SortableItem;
