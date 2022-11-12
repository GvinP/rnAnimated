import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface DotProps {
  activeIndex: Animated.SharedValue<number>;
  index: number;
}

const Dot: React.FC<DotProps> = ({ activeIndex, index }) => {
  const rDotStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        activeIndex.value === index ? "black" : "white",
        { duration: 150 }
      ),
    };
  });
  return <Animated.View style={[styles.dot, rDotStyle]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    marginHorizontal: 2,
  },
});
