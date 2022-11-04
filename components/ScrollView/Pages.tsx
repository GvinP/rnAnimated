import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Page from "./Page";

const WORDS = ["one", "two", "three", "four"];

const Pages = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      horizontal
      style={styles.container}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      pagingEnabled
    >
      {WORDS.map((title, index) => (
        <Page key={index} {...{ title, index, translateX }} />
      ))}
    </Animated.ScrollView>
  );
};

export default Pages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
