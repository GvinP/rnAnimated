import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import ScrollViewExample from "./components/ScrollViewExample/ScrollView";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollViewExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
