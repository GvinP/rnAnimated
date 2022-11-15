import { StyleSheet, Text, View, ViewToken } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface ListItemProps {
  vItems: Animated.SharedValue<ViewToken[]>;
  item: { id: number };
}

const ListItem: React.FC<ListItemProps> = ({ vItems, item }) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = !!vItems.value
      .filter((vItem) => vItem.isViewable)
      .find((vItem) => vItem.item.id === item.id);
    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [{scale: withTiming(isVisible ? 1 : 0.6)}]
    };
  });
  return <Animated.View style={[styles.item, rStyle]} />;
};

export default ListItem;

const styles = StyleSheet.create({
  item: {
    height: 80,
    width: "90%",
    backgroundColor: "blue",
    opacity: 0.6,
    marginTop: 15,
    alignSelf: "center",
    borderRadius: 15,
  },
});
