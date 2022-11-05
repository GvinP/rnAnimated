import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Theme from "./components/Theme";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Theme />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
