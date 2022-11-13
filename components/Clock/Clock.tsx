import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Square, { N } from "./Square";
import { Easing, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

const Clock = () => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(withTiming(4 * Math.PI, {
      duration: 12000,
      easing: Easing.linear,
    }),-1);
  }, []);
  return (
    <View style={styles.container}>
      {new Array(N).fill(0).map((_, index) => (
        <Square key={index} {...{ index, progress }} />
      ))}
    </View>
  );
};

export default Clock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
  },
});
