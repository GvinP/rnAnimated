import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const imageUri = "https://wallpapercave.com/wp/wp4676578.jpg";

const { width, height } = Dimensions.get("window");

const PinchGestureHandlerExample = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: focalX.value },
      { translateY: focalY.value },
      { translateX: -width / 2 },
      { translateY: -height / 2 },
      { scale: scale.value },
      { translateX: -focalX.value },
      { translateY: -focalY.value },
      { translateX: width / 2 },
      { translateY: height / 2 },
    ],
  }));

  const rFocalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={{ flex: 1 }}>
        <AnimatedImage
          source={{ uri: imageUri }}
          style={[{ flex: 1 }, rStyle]}
        />
        <Animated.View style={[styles.focalPoint, rFocalStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default PinchGestureHandlerExample;

const styles = StyleSheet.create({
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: "teal",
    borderRadius: 10,
  },
});
