import React, { useCallback, useState, useRef } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import LottieView from "lottie-react-native";

const LottieAnimation = () => {
  const [items, setItems] = useState<number[]>([]);
  const ref = useRef<LottieView>(null);

  const onDelete = useCallback((index: number) => {
    setItems((currentItems) =>
      currentItems.filter((_, currentItemIndex) => currentItemIndex !== index)
    );
  }, []);

  const onAdd = useCallback(() => {
    ref.current?.reset();
    ref.current?.play(0, 75);
    setItems((currentItems) => [...currentItems, 0]);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {items.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {items.map((_, index) => (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => onDelete(index)}
              style={styles.itemContainer}
            >
              <View style={styles.item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.animationContainer}>
          <LottieView
            source={require("../../assets/tractor.json")}
            style={styles.animation}
            autoPlay
            loop
          />
          <Text style={styles.text}>Add new items ➕</Text>
        </View>
      )}
      <TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
        <LottieView
          source={require("../../assets/add.json")}
          {...{ ref }}
          style={{ flex: 1 }}
          autoPlay={false}
          loop={false}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LottieAnimation;

const FLOATING_ACTION_BUTTON_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  scrollView: {
    flex: 1,
  },
  itemContainer: {
    height: 100,
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  item: {
    flex: 1,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 10,
    elevation: 5,
  },
  floatingButton: {
    height: FLOATING_ACTION_BUTTON_SIZE,
    width: FLOATING_ACTION_BUTTON_SIZE,
    backgroundColor: "black",
    borderRadius: FLOATING_ACTION_BUTTON_SIZE / 2,
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 10,
    elevation: 5,
    position: "absolute",
    bottom: 64,
    right: 32,
  },
  animationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30%",
  },
  animation: {
    width: "80%",
    aspectRatio: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: "300",
  },
});
