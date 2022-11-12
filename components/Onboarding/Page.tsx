import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { PageInterface } from "./constants";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");

interface PageProps extends PageInterface {
  translateX: Animated.SharedValue<number>;
  index: number;
}

const Page: React.FC<PageProps> = ({
  title,
  description,
  source,
  translateX,
  index,
}) => {
  const inputRange = [
    (index - 1) * PAGE_WIDTH,
    index * PAGE_WIDTH,
    (index + 1) * PAGE_WIDTH,
  ];
  const rCircleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });
  const rImageStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      translateX.value,
      inputRange,
      [0, 0, 1],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ rotate: `${progress * Math.PI}rad` }],
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, rCircleStyle]} />
        <Animated.Image
          {...{ source }}
          style={[styles.image, rImageStyle]}
          resizeMode={"contain"}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default Page;

const CIRCLE_DIAMETR = PAGE_WIDTH * 0.7;

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  circleContainer: {
    width: CIRCLE_DIAMETR,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: PAGE_HEIGHT * 0.1,
  },
  circle: {
    width: "100%",
    height: "100%",
    borderRadius: CIRCLE_DIAMETR / 2,
    backgroundColor: "white",
  },
  image: {
    height: PAGE_HEIGHT * 0.5,
    aspectRatio: 1,
    position: "absolute",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "grey",
  },
});
