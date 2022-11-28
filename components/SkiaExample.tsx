import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import {
  Canvas,
  Path,
  Image,
  Group,
  useImage
} from "@shopify/react-native-skia";

const { height, width } = Dimensions.get("window");

const center = { x: width / 2, y: height / 2 };


const SkiaExample = () => {
  const image = useImage(require("../assets/image.jpeg"));
  return (
    <Canvas style={{ flex: 1 }}>
      <Path
        path="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z"
        color="lightblue"
        style="stroke"
        strokeWidth={10}
        strokeJoin="round"
      />
      <Group clip="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z">
      {image&&<Image image={image} x={0} y={0} width={240} height={320} fit="cover"/>}
      </Group>
    </Canvas>
  );
};

export default SkiaExample;

const styles = StyleSheet.create({});
