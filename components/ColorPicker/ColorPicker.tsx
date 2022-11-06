import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const COLORS = [
  "red",
  "purple",
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "black",
  "white",
];

const BACKGROUND_COLOR = "rgba(0,0,0,0.9)";
const { width } = Dimensions.get("window");
const PICKER_WIDTH = width * 0.9;
const CIRCLE_PICKER_SIZE = 45;
const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;
const EXTERNAL_PICKER_SIZE = width * 0.8;

type ContextType = {
  x: number;
};

const ColorPicker = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      PICKER_WIDTH - CIRCLE_PICKER_SIZE
    );
  });
  const inputRange = COLORS.map(
    (_, index) => (index / COLORS.length) * PICKER_WIDTH
  );
  const PanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.x = adjustedTranslateX.value;
      translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
      scale.value = withSpring(1.2);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: () => {
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    },
  });
  const TapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: (event) => {
        translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
        scale.value = withSpring(1.2);
        translateX.value = withTiming(event.absoluteX - CIRCLE_PICKER_SIZE);
      },
      onEnd: (event) => {
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
      },
    });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: adjustedTranslateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });
  const rInternalPickerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      COLORS
    );
    return {
      backgroundColor,
    };
  });
  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.externalPicker, rInternalPickerStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <TapGestureHandler onGestureEvent={TapGestureEvent}>
          <Animated.View>
            <PanGestureHandler onGestureEvent={PanGestureEvent}>
              <Animated.View style={{ justifyContent: "center" }}>
                <LinearGradient
                  colors={COLORS}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradient}
                />
                <Animated.View style={[styles.picker, rStyle]}>
                  <Animated.View
                    style={[styles.internalPicker, rInternalPickerStyle]}
                  />
                </Animated.View>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </TapGestureHandler>
      </View>
    </>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    height: 40,
    width: PICKER_WIDTH,
    borderRadius: 20,
  },
  picker: {
    position: "absolute",
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  internalPicker: {
    width: INTERNAL_PICKER_SIZE,
    height: INTERNAL_PICKER_SIZE,
    borderRadius: INTERNAL_PICKER_SIZE / 2,
  },
  externalPicker: {
    width: EXTERNAL_PICKER_SIZE,
    height: EXTERNAL_PICKER_SIZE,
    borderRadius: EXTERNAL_PICKER_SIZE / 2,
  },
});
