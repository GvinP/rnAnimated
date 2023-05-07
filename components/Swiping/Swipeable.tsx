import React, { forwardRef, Ref, useImperativeHandle } from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import Profile, { ProfileModel, α } from "./Profile";

const { width, height } = Dimensions.get("window");

const A = Math.round(width * Math.cos(α) + height * Math.sin(α));
const snapPoints = [-A, 0, A];

type Offset = { x: number; y: number };

export interface SwipeHandler {
  swipeLeft: () => void;
  swipeRight: () => void;
}

interface SwiperProps {
  onSwipe: () => void;
  profile: ProfileModel;
  scale: Animated.SharedValue<number>;
  onTop: boolean;
}

const swipe = (
  translateX: Animated.SharedValue<number>,
  dest: number,
  velocity: number,
  onSwipe: () => void
) => {
  "worklet";
  translateX.value = withSpring(
    dest,
    {
      velocity,
      restSpeedThreshold: dest === 0 ? 0.001 : 100,
      restDisplacementThreshold: dest === 0 ? 0.001 : 100,
    },
    () => {
      if (dest !== 0) {
        runOnJS(onSwipe)();
      }
    }
  );
};

const Swiper = (
  { onSwipe, profile, scale, onTop }: SwiperProps,
  ref: Ref<SwipeHandler>
) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  useImperativeHandle(ref, () => ({
    swipeLeft: () => {
      swipe(translateX, -A, 25, onSwipe);
    },
    swipeRight: () => {
      swipe(translateX, A, 25, onSwipe);
    },
  }));
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Offset
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.x;
      translateY.value = event.translationY + ctx.y;
      scale.value = interpolate(
        translateX.value,
        [-width / 2, 0, width / 2],
        [1, 0.95, 1]
      );
    },
    onEnd: (event, ctx) => {
      const dest = snapPoint(translateX.value, event.velocityX, snapPoints);
      swipe(translateX, dest, event.velocityX, onSwipe);
      translateY.value = withSpring(0, { velocity: event.velocityY });
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Profile
          profile={profile}
          translateX={translateX}
          translateY={translateY}
          scale={scale}
          onTop={onTop}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default forwardRef(Swiper);
