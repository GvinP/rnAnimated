import React from "react";
import { StyleSheet, View } from "react-native";
import {
  useSharedValue,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

import AnimatedCard from "./AnimatedCard";
import StyleGuide from "../Card/StyleGuide";
import { cards } from "../Card/Card";
import Button from "../Card/Button";

export const bin = (value: boolean): 0 | 1 => (value ? 1 : 0);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
});

const UseTransition = () => {
  const toggled = useSharedValue(false);
  const transition = useDerivedValue(() => {
    return withSpring(toggled.value ? 1 : 0);
  });
  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedCard key={card} {...{ index, card, transition }} />
      ))}
      <Button
        label={toggled.value ? "Reset" : "Start"}
        primary
        onPress={() => (toggled.value = !toggled.value)}
      />
    </View>
  );
};

export default UseTransition;
