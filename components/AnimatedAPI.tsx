import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useRef, useEffect } from "react";

const AnimatedAPI = () => {
  const progress = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(progress, {
            toValue: 1,
            useNativeDriver: true,
            duration: 2000,
          }),
          Animated.timing(progress, {
            toValue: 0.5,
            useNativeDriver: true,
            duration: 2000,
          }),
        ]),
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 2,
            useNativeDriver: true,
            duration: 2000,
          }),
          Animated.timing(scale, {
            toValue: 1,
            useNativeDriver: true,
            duration: 2000,
          }),
        ]),
      ])
    ).start();
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.square,
          {
            borderRadius: Animated.multiply(progress, SIZE / 2),
            opacity: progress,
            transform: [{ scale }],
          },
        ]}
      />
    </View>
  );
};

export default AnimatedAPI;

const SIZE = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0,0,256, 0.5)",
  },
});
