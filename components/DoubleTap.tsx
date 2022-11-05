import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useCallback } from "react";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const DoubleTap = () => {
  const doubleTapRef = useRef();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);
  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));
  const rTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const doubleTapGestureHandler = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  const singleTapGestureHandler = useCallback(() => {
    opacity.value = withSpring(0, undefined, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(500, withSpring(1));
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <TapGestureHandler
        onActivated={singleTapGestureHandler}
        waitFor={doubleTapRef}
      >
        <TapGestureHandler
          onActivated={doubleTapGestureHandler}
          numberOfTaps={2}
          ref={doubleTapRef}
          maxDelayMs={250}
        >
          <Animated.View>
            <ImageBackground
              source={require("../assets/image.jpeg")}
              style={styles.image}
            >
              <AnimatedImage
                source={require("../assets/heart.png")}
                style={[styles.image, styles.shadow, rStyle]}
                resizeMode={"center"}
              />
            </ImageBackground>
            <Animated.Text style={[styles.text, rTextStyle]}>
              🐢🐢🐢🐢
            </Animated.Text>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

export default DoubleTap;

const { width: SIZE } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  text: {
    fontSize: 60,
    alignSelf: "center",
  },
  shadow: {
    shadowOffset: {
      height: 20,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 35,
  },
});
