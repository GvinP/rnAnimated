import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const { height, width } = Dimensions.get("window");

const Page = ({ title, index, translateX }: PageProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, 125, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
      borderRadius,
    };
  });
  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
      opacity,
    };
  });
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgba(0,0,256,0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{ position: "absolute" }, rTextStyle]}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: 250,
    height: 250,
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 50,
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
