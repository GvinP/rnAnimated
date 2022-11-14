import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const LIST_ITEM_COLOR = "#1798DE";

interface Item {
  id: number;
}

const LayoutAnimation = () => {
  const [initial, setInitial] = useState(true);
  const [list, setList] = useState<Item[]>(
    new Array(5).fill(0).map((_, index) => ({ id: index }))
  );

  useEffect(() => {
    setInitial(false);
  }, []);
  const onAdd = () => {
    setList((currentItems) => {
      const nextItemId = (currentItems[currentItems.length - 1]?.id || 0) + 1;
      return [...currentItems, { id: nextItemId }];
    });
  };
  const onDelete = (itemId: number) => {
    setList((currentItems) => {
      return currentItems.filter((item) => item.id !== itemId);
    });
  };
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={styles.iconText}>+</Text>
      </TouchableOpacity>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingVertical: 50 }}
      >
        {list.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={initial ? FadeIn.delay(100 * index) : FadeIn}
            exiting={FadeOut}
            layout={Layout.duration(100)}
            style={styles.item}
            onTouchEnd={() => onDelete(item.id)}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default LayoutAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: "90%",
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: "center",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { height: 0, width: 10 },
    shadowRadius: 20,
  },
  button: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: "black",
    borderRadius: 40,
    position: "absolute",
    bottom: 30,
    right: "5%",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "white",
    fontSize: 40,
  },
});
