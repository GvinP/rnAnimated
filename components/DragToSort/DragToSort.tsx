import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Card, { CARD_HEIGHT, Cards } from "../Card/Card";
import SortableList from "./SortableList";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: CARD_HEIGHT,
    width: "100%",
    alignItems: "center",
    marginTop: 32,
  },
});
const cards = [Cards.Card1, Cards.Card2, Cards.Card3];

const DragToSort = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SortableList item={{ width, height: CARD_HEIGHT + 32 }}>
        {cards.map((card, index) => (
          <View style={styles.card} key={index}>
            <Card card={card} />
          </View>
        ))}
      </SortableList>
    </SafeAreaView>
  );
};

export default DragToSort;
