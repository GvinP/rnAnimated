import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import Svg, { Circle, Ellipse, Path } from "react-native-svg";

interface AnimatedLogoProps {
  progress: Animated.SharedValue<number>;
}

const vWidth = 842;
const vHeight = 596;
const width = Dimensions.get("window").width + 128;
const height = (width * vHeight) / vWidth;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ progress }) => {
  const part1 = useDerivedValue(() =>
    Easing.inOut(Easing.ease)(
      interpolate(progress.value, [0, 0.75], [0, 1], Extrapolate.CLAMP)
    )
  );
  const part2 = useDerivedValue(() =>
    Easing.inOut(Easing.ease)(
      interpolate(progress.value, [0.75, 1], [0, 1], Extrapolate.CLAMP)
    )
  );
  const [length, setLength] = useState(0);
  const ref = useRef(null);
  const strokeAnimation = () => {
    "worklet";
    return {
      strokeDashoffset: length - length * part1.value,
    };
  };
  const rotateAnimation = (target: number) => () => {
    "worklet";
    return {
      transform: [{rotate: `${target * part2.value}rad`}]
    };
  };
  const animatedProps1 = useAnimatedProps(strokeAnimation)
  const animatedProps2 = useAnimatedProps(strokeAnimation)
  const animatedProps3 = useAnimatedProps(strokeAnimation)
  const rotateStyle1 = useAnimatedStyle(rotateAnimation(Math.PI/6))
  const rotateStyle2 = useAnimatedStyle(rotateAnimation(-Math.PI/6))
  const rotateStyle3 = useAnimatedStyle(rotateAnimation(Math.PI/2))
  return (
    <View>
      <Animated.View style={rotateStyle1}>
        <Svg
          width={width}
          height={height}
          viewBox={[0, 0, vWidth, vHeight].join(" ")}
        >
          <AnimatedCircle r={30} cx={421} cy={295} fill="#61DAFB" />
          <AnimatedEllipse
            //@ts-ignore
            ref={ref}
            // @ts-ignore
            onLayout={() => setLength(ref.current!.getTotalLength())}
            strokeDasharray={length}
            animatedProps={animatedProps1}
            cx={421}
            cy={295}
            rx={89}
            ry={234}
            stroke="#61DAFB"
            strokeWidth={20}
          />
        </Svg>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, rotateStyle2]}>
        <Svg
          width={width}
          height={height}
          viewBox={[0, 0, vWidth, vHeight].join(" ")}
        >
          <AnimatedEllipse
            strokeDasharray={length}
            animatedProps={animatedProps2}
            cx={421}
            cy={295}
            rx={89}
            ry={234}
            stroke="#61DAFB"
            strokeWidth={20}
          />
        </Svg>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, rotateStyle3]}>
        <Svg
          width={width}
          height={height}
          viewBox={[0, 0, vWidth, vHeight].join(" ")}
        >
          <AnimatedEllipse
            strokeDasharray={length}
            animatedProps={animatedProps3}
            cx={421}
            cy={295}
            rx={89}
            ry={234}
            stroke="#61DAFB"
            strokeWidth={20}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default AnimatedLogo;

const styles = StyleSheet.create({});
