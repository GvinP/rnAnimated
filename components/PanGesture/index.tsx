import React, { useState } from "react";
import { StyleSheet, View, LayoutRectangle } from "react-native";

import PanGesture from "./PanGesture";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Demo = () => {
  const [container, setContainer] = useState<null | LayoutRectangle>(null);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.container}
        onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}
      >
        {container && <PanGesture {...container} />}
      </View>
    </SafeAreaView>
  );
};

export default Demo;
