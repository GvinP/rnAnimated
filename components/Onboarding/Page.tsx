import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { PageInterface } from "./constants";

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");

const Page: React.FC<PageInterface> = ({ title, description, source }) => {
  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={styles.circle} />
        <Image {...{ source }} style={styles.image} resizeMode={"contain"} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default Page;

const CIRCLE_DIAMETR = PAGE_WIDTH * 0.7;

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  circleContainer: {
    width: CIRCLE_DIAMETR,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: PAGE_HEIGHT * 0.1,
  },
  circle: {
    width: "100%",
    height: "100%",
    borderRadius: CIRCLE_DIAMETR / 2,
    backgroundColor: "white",
  },
  image: {
    height: PAGE_HEIGHT * 0.5,
    aspectRatio: 1,
    position: "absolute",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "grey",
  },
});
