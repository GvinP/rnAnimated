import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import DoubleTap from "./components/DoubleTap";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <DoubleTap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
