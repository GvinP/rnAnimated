import { StyleSheet, Text, View } from "react-native";
import React, { MutableRefObject, useRef, useState } from "react";
import { Path } from "react-native-svg";
import Animated, { useAnimatedProps, Easing } from "react-native-reanimated";

interface AnimatedStrokeProps {
  d: string;
  progress: Animated.SharedValue<number>;
}

const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "#FE8777"];
const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedStroke: React.FC<AnimatedStrokeProps> = ({ d, progress }) => {
  const stroke = colors[Math.round(Math.random() * (colors.length - 1))];
  const [length, setLength] = useState(0);
  const ref = useRef<Path>(null);
  const bgStrokeAnimation = useAnimatedProps(() => {
    return {
      strokeDashoffset: length - length * (Easing.bezier(0.61, 1, 0.88, 1).factory)()(progress.value),
    };
  });
  const strokeAnimation = useAnimatedProps(() => {
    return {
      strokeDashoffset: length - length * (Easing.bezier(0.65, 0, 0.35, 1).factory)()(progress.value),
    };
  });
  return (
    <>
      <AnimatedPath
        d={d}
        stroke={stroke}
        strokeWidth={10}
        strokeDasharray={length}
        animatedProps={bgStrokeAnimation}
      />
      <AnimatedPath
        // @ts-ignore
        onLayout={() => setLength(ref.current!.getTotalLength())}
        // @ts-ignore
        ref={ref}
        d={d}
        stroke="black"
        strokeWidth={10}
        strokeDasharray={length}
        animatedProps={strokeAnimation}
      />
    </>
  );
};

export default AnimatedStroke;

const styles = StyleSheet.create({});
