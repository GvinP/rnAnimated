import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  event,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { clamp } from "react-native-redash";

const { width } = Dimensions.get("window");
const CURSOR_SIZE = 40;
const CONTAINER_WIDTH = width - 64;
export const SLIDER_WIDTH = CONTAINER_WIDTH - CURSOR_SIZE;
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: CONTAINER_WIDTH,
  },
  dividerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    borderColor: "rgba(50, 50, 50, 0.5)",
    width: SLIDER_WIDTH,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cursor: {
    width: CURSOR_SIZE,
    height: CURSOR_SIZE,
    borderRadius: CURSOR_SIZE * 0.3,
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  cursorPoint: {
    borderRadius: 5,
    width: 10,
    height: 10,
    backgroundColor: "black",
  },
});

interface SliderProps {
  translateX: Animated.SharedValue<number>;
}

const Slider: React.FC<SliderProps> = ({ translateX }) => {
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = clamp(event.translationX + ctx.x, 0, SLIDER_WIDTH);
    },
  });
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
      </View>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={[styles.cursor, style]}>
          <View style={styles.cursorPoint} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Slider;
