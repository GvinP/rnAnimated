import React from "react";
import { StyleSheet, View } from "react-native";

import Eye from "./Eye";
import Mouth from "./Mouth";
import Slider, { SLIDER_WIDTH } from "./Slider";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

const bad = "#FDBEEB";
const normal = "#FDEEBE";
const good = "#BEFDE5";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  face: {
    width: 150,
    height: 150,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 32,
  },
  eyes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const PathMorphing = () => {
  const translateX = useSharedValue(0);
  const progress = useDerivedValue(() => translateX.value / SLIDER_WIDTH);
  const animatedColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 0.5, 1],
      [bad, normal, good]
    ),
  }));
  return (
    <Animated.View style={[styles.container, animatedColor]}>
      <View style={styles.face}>
        <View style={styles.eyes}>
          <Eye progress={progress} />
          <Eye flip progress={progress} />
        </View>
        <Mouth progress={progress} />
      </View>
      <Slider {...{ translateX }} />
    </Animated.View>
  );
};

export default PathMorphing;
