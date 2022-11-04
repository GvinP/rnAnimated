import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { PanGestureBaseReanimated } from "./components/PanGestureBaseReanimated";

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <PanGestureBaseReanimated/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
});
