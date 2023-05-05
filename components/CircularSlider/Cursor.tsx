import * as React from "react";
import { StyleSheet, View } from "react-native";
import StyleGuide from "../Card/StyleGuide";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { canvas2Polar, polar2Canvas } from "./Coordinates";
import { clamp } from "react-native-redash";

interface CursorProps {
  r: number;
  strokeWidth: number;
  theta: Animated.SharedValue<number>;
}

const Cursor = ({ r, strokeWidth, theta }: CursorProps) => {
  const center = { x: r, y: r };
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (event, ctx) => {
      const { x, y } = polar2Canvas({ theta: theta.value, radius: r }, center);
      ctx.x = x;
      ctx.y = y;
    },
    onActive: (event, ctx) => {
      const { translationX, translationY } = event;
      const x = translationX + ctx.x;
      const y1 = translationY + ctx.y;
      const y =
        x < r
          ? y1
          : theta.value < Math.PI
          ? clamp(y1, 0, r - 0.001)
          : clamp(y1, r, 2 * r);
      const value = canvas2Polar({ x, y }, center).theta;
      theta.value = value > 0 ? value : 2 * Math.PI + value;
    },
  });
  const style = useAnimatedStyle(() => {
    const { x, y } = polar2Canvas({ theta: theta.value, radius: r }, center);
    return {
      transform: [{ translateX: x }, { translateY: y }],
    };
  });
  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            width: strokeWidth,
            height: strokeWidth,
            borderRadius: strokeWidth / 2,
            borderColor: "white",
            borderWidth: 5,
            backgroundColor: StyleGuide.palette.primary,
          },
          style,
        ]}
      />
    </PanGestureHandler>
  );
};

export default Cursor;
