import { StyleSheet, TouchableOpacity, View, ScrollView, Text } from "react-native";
import React, {useState} from "react";
import Animated, { FadeIn } from "react-native-reanimated";

const LIST_ITEM_COLOR = "#1798DE";

interface Item {
  id: number;
}

const Layout = () => {
    const [list, setList] = useState<Item[]>([])
    const onAdd = () => {
        setList((currentItems)=> {
            const nextItemId = (currentItems[currentItems.length-1]?.id||0) + 1
            return [...currentItems, {id: nextItemId}]
        })
    }
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={styles.iconText}>+</Text>
      </TouchableOpacity>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingVertical: 50 }}
      >
        {list.map((item) => (
          <Animated.View key={item.id} entering={FadeIn} style={styles.item} />
        ))}
      </ScrollView>
    </>
  );
};

export default Layout;

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: 'white',
    fontSize: 40,
  }
});
