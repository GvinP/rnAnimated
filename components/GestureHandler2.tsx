import { StyleSheet, Dimensions, View } from "react-native";
import React from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window")

interface AnimatedPosition {
  x: Animated.SharedValue<number>
  y: Animated.SharedValue<number>
}

const useFollowAnimatedPosition = ({x, y}: AnimatedPosition) => {
  const followX = useDerivedValue(()=>{
    return withSpring(x.value)
  })
  const followY = useDerivedValue(()=>{
    return withSpring(y.value)
  })
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: followX.value },
        { translateY: followY.value },
      ],
    };
  });
  return {followX, followY, rStyle}
}

const GestureHandler2 = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {x: translateX.value, y: translateY.value}
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(()=>{
      if (translateX.value > SCREEN_WIDTH / 2) {
        translateX.value = SCREEN_WIDTH - 50
      } else {
        translateX.value = 0
      }
    })
    const {followX: followBlueX, followY: followBlueY, rStyle: rBlueStyle} = useFollowAnimatedPosition({x: translateX, y: translateY})
    const {followX: followRedX, followY: followRedY, rStyle: rRedStyle} = useFollowAnimatedPosition({x: followBlueX, y: followBlueY})
    const {followX: followGreenX, followY: followGreenY, rStyle: rGreenStyle} = useFollowAnimatedPosition({x: followRedX, y: followRedY})
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.cirlce, {backgroundColor: "red"}, rRedStyle]}/>
      <Animated.View style={[styles.cirlce, {backgroundColor: "green"}, rGreenStyle]}/>
      <GestureDetector {...{ gesture }}>
        <Animated.View style={[styles.cirlce, rBlueStyle]} />
      </GestureDetector>
    </View>
  );
};

export default GestureHandler2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cirlce: {
    position: "absolute",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: "blue",
    opacity: 0.8,
  },
});
