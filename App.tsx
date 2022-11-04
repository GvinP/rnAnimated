import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  withTiming,
  withRepeat,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

const SIZE = 100;
const RADIUS = SIZE * 1.8;

type ContextType = {
  translateX: number;
  translateY: number;
};

export default function App() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < RADIUS+SIZE/2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.square, rStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: 100,
    width: 100,
    borderRadius: 25,
    backgroundColor: "teal",
  },
  circle: {
    height: RADIUS * 2,
    width: RADIUS * 2,
    borderRadius: RADIUS,
    borderColor: "teal",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
