import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import React from "react";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

const { width: PAGE_WIDTH } = Dimensions.get("window");

const Menu = () => {
  const translateX = useSharedValue(0);
  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: () => {
      translateX.value = withTiming(
        translateX.value > PAGE_WIDTH / 3 ? PAGE_WIDTH / 2 : 0
      );
    },
  });
  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, PAGE_WIDTH / 2],
      [0, -3],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      translateX.value,
      [0, PAGE_WIDTH / 2],
      [0, 15],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [
        { perspective: 100 },
        { translateX: translateX.value },
        { rotateY: `${rotate}deg` },
      ],
    };
  });
  const onPress = () => {
    translateX.value = withTiming(translateX.value > 0 ? 0 : PAGE_WIDTH / 2);
  };
  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View style={[{ flex: 1, backgroundColor: "white" }, rStyle]}>
          <Feather
            name="menu"
            size={24}
            color={"#1e1e23"}
            style={{ margin: 15 }}
            onPress={onPress}
          />
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e23",
  },
});
