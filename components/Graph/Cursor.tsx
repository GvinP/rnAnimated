/* eslint-disable react-native/no-unused-styles */
import React from "react";
import { View, StyleSheet } from "react-native";
import { Vector } from "../CircularSlider/Coordinates";

export interface Path {
  curves: BezierCurve[];
  length: number;
}

export interface BezierCurve {
  from: Vector;
  to: Vector;
  c1: Vector;
  c2: Vector;
  start: number;
  end: number;
}

const CURSOR = 100;
const styles = StyleSheet.create({
  cursorContainer: {
    width: CURSOR,
    height: CURSOR,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(100, 200, 300, 0.4)",
  },
  cursor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#367be2",
    borderWidth: 4,
    backgroundColor: "white",
  },
});

interface CursorProps {
  path: Path;
}

const Cursor = ({}: CursorProps) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.cursor} />
    </View>
  );
};

export default Cursor;
