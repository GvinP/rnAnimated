import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Ripple = () => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);
  const height = useSharedValue(0);
  const width = useSharedValue(0);
  const opacity = useSharedValue(1);

  const aRef = useAnimatedRef<View>();

  const onTap = () => {};
  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: (event) => {
        const layout = measure(aRef);
        width.value = layout.width;
        height.value = layout.height;
        centerX.value = event.x;
        centerY.value = event.y;
        opacity.value = 1;
        scale.value = 0;
        scale.value = withTiming(1, { duration: 1000 });
      },
      onActive: () => {
        runOnJS(onTap)();
      },
      onFinish: () => {
        opacity.value = withTiming(0);
      },
    });
  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;
    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      backgroundColor: "rgba(0,0,0,0.2)",
      position: "absolute",
      opacity: opacity.value,
      top: 0,
      left: 0,
      transform: [
        { translateX },
        { translateY },
        {
          scale: scale.value,
        },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.ripple} ref={aRef}>
        <TapGestureHandler onGestureEvent={tapGestureEvent}>
          <Animated.View style={[styles.ripple, { overflow: "hidden" }]}>
            <Text style={{ fontSize: 24 }}>Tap</Text>
            <Animated.View style={rStyle} />
          </Animated.View>
        </TapGestureHandler>
      </View>
    </View>
  );
};

export default Ripple;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ripple: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    elevation: 2,
  },
});
