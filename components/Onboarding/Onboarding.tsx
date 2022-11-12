import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BACKGROUND_COLOR, PAGES } from "./constants";
import Page from "./Page";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

const Onboarding = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {PAGES.map((page, index) => (
          <Page key={index} {...{ ...page, translateX, index }} />
        ))}
      </Animated.ScrollView>
      <View style={styles.footer}>
        <View style={styles.fillCenter} />
        <View style={styles.fillCenter}>
          <Text style={styles.text}>View Board</Text>
        </View>
        <View style={styles.fillCenter}>
          <AntDesign name="arrowright" size={24} />
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  footer: {
    height: 50,
    marginBottom: 20,
    flexDirection: "row",
  },
  fillCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  paginator: {},
  text: {
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1.7,
    fontWeight: "500",
  },
  iconContainer: {},
});
