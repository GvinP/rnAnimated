import { StyleSheet, Text, View, FlatList, ViewToken } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ListItem from "./ListItem";

const data = new Array(50).fill(0).map((_, index) => ({ id: index }));

const Flat = () => {
  const vItems = useSharedValue<ViewToken[]>([]);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{ paddingTop: 40 }}
        onViewableItemsChanged={({ viewableItems }) => {
          vItems.value = viewableItems;
        }}
        renderItem={({ item }) => <ListItem {...{ item, vItems }} />}
      />
    </View>
  );
};

export default Flat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
