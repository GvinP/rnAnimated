import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { BACKGROUND_COLOR, PAGES } from "./constants";
import Page from "./Page";

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {PAGES.map((page, index) => (
          <Page key={index} {...{ ...page }} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});
