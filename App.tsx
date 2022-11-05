import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import PinchGestureHandlerExample from "./components/PinchGestureHandlerExample";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <PinchGestureHandlerExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
