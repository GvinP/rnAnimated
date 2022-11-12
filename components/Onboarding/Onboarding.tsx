import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { BACKGROUND_COLOR, PAGES } from "./constants";
import Page from "./Page";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import Dot from "./Dot";

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");

const Onboarding = () => {
  const ref = useAnimatedRef<Animated.ScrollView>();
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });
  const onIconPress = () => {
    ref.current?.scrollTo({ x: PAGE_WIDTH * (activeIndex.value + 1) });
  };
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        {...{ ref }}
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
        <View style={[styles.fillCenter, { flexDirection: "row" }]}>
          {PAGES.map((_, index) => (
            <Dot key={index} {...{ activeIndex, index }} />
          ))}
        </View>
        <View style={styles.fillCenter}>
          <Text style={styles.text}>View Board</Text>
        </View>
        <View style={styles.fillCenter}>
          <AntDesign name="arrowright" size={24} onPress={onIconPress} />
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
});
