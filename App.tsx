import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import CircularProgressBar from "./components/CircularProgressBar";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CircularProgressBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
