import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Page from "./Page";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";

const WORDS = ["one", "two", "three", "four"];

type ContextType = {
  x: number;
};
const { width: PAGE_WIDTH } = Dimensions.get("window");
const MAX_TRANSLATE_X = -PAGE_WIDTH * (WORDS.length - 1);
const ScrollViewExample = () => {
  const translateX = useSharedValue(0);

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
      cancelAnimation(translateX)
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: (event) => {
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={styles.scrollContainer}>
          {WORDS.map((word, index) => (
            <Page
              key={index}
              {...{ word, index }}
              translateX={clampedTranslateX}
            />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default ScrollViewExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    flexDirection: "row",
  },
});
