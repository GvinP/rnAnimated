import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Pages from "./components/ScrollView/Pages";

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Pages/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
