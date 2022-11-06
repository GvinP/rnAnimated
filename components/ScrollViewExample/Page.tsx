import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

interface PageProps {
  index: number;
  word: string;
  translateX: Animated.SharedValue<number>;
}

const {width: PAGE_WIDTH} = Dimensions.get("window")

const Page: React.FC<PageProps> = ({ word, index, translateX }) => {

    const pageOffset = PAGE_WIDTH * index
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + pageOffset}],
    };
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        { backgroundColor: `rgba(0,0,256,0.${index + 2})` },
        rStyle,
      ]}
    >
      <Text>{word}</Text>
    </Animated.View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
