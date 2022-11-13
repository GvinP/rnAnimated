import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const clamp = (value: number, min: number, max: number) => {
  "worklet";
  return Math.min(Math.max(value, min), max);
};

const ICON_SIZE = 20;
const BUTTON_WIDTH = 170;
const DISPLAY_DIAMETR = 50;
const MAX_OFFSET_VALUE = BUTTON_WIDTH * 0.3;

const SlidingCounter = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [count, setCount] = useState(0);
  const increment = () => setCount(prev=> prev+1)
  const decrement = () => setCount(prev=> prev-1)
  const reset = () => setCount(0)
  const panGestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: (event) => {
        translateX.value = clamp(
          event.translationX,
          -MAX_OFFSET_VALUE,
          MAX_OFFSET_VALUE
        );
        translateY.value = clamp(event.translationY, 0, MAX_OFFSET_VALUE);
      },
      onEnd: () => {
        if(translateX.value === MAX_OFFSET_VALUE) {
            runOnJS(increment)()
        } else if (translateX.value === -MAX_OFFSET_VALUE) {
            runOnJS(decrement)()
        } else if (translateY.value === MAX_OFFSET_VALUE) {
            runOnJS(reset)()
        }
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      },
    });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  const rPlusMinusIconStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_OFFSET_VALUE, 0, MAX_OFFSET_VALUE],
      [0.4, 1, 0.4],
      Extrapolate.CLAMP
    );
    const opacityY = interpolate(
      translateY.value,
      [0, MAX_OFFSET_VALUE],
      [1, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity: opacityX * opacityY,
    };
  });
  const rCloseIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, MAX_OFFSET_VALUE],
      [0, 1],
      Extrapolate.CLAMP
    );
    return {
      opacity,
    };
  });
  const rButtonStyle = useAnimatedStyle(()=>{
    return {
        transform: [
            {translateX: translateX.value*0.1},
            {translateY: translateY.value*0.1},
        ]
    }
  })
  return (
    <Animated.View style={[styles.counter, rButtonStyle]}>
      <Animated.View style={rPlusMinusIconStyle}>
        <AntDesign name="minus" color={"white"} size={ICON_SIZE} />
      </Animated.View>
      <Animated.View style={rCloseIconStyle}>
        <AntDesign name="close" color={"white"} size={ICON_SIZE} />
      </Animated.View>
      <Animated.View style={rPlusMinusIconStyle}>
        <AntDesign name="plus" color={"white"} size={ICON_SIZE} />
      </Animated.View>
      <View style={styles.displayContainer}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View style={[styles.display, rStyle]}>
            <Text style={styles.value}>{count}</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Animated.View>
  );
};

export default SlidingCounter;

const styles = StyleSheet.create({
  counter: {
    width: BUTTON_WIDTH,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  displayContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  display: {
    width: DISPLAY_DIAMETR,
    height: DISPLAY_DIAMETR,
    borderRadius: DISPLAY_DIAMETR / 2,
    backgroundColor: "#232323",
    alignItems: "center",
    justifyContent: "center",
    // position: 'absolute',
  },
  value: {
    color: "white",
    fontSize: 20,
  },
});
