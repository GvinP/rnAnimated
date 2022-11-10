import React, { useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Period {
  id: number;
  name: string;
}

const { width: WIDTH } = Dimensions.get("window");
const ITEM_HEIGHT = 34;
const VISIBLE_ITEMS = 5;
const timmingConfig = {
  duration: 1000,
  easing: Easing.bezier(0.22, 1, 0.36, 1),
};
const start = 1;
const periods: Period[] = new Array(88).fill(0).map((_, i) => {
  const id = start + i;
  return { id, name: `${id} полугодие, 2021 - 2022` };
});

const snapPoint = (value: number, velocity: number, points: number[]) => {
  "worklet";
  const point = value + 0.2 * velocity;
  const deltas = points.map((p) => {
    return Math.abs(point - p);
  });
  const minDelta = Math.min(...deltas);
  return points.filter((p) => {
    return Math.abs(point - p) === minDelta;
  })[0];
};

const Picker = () => {
  const ref = useRef()
  const translateY = useSharedValue(0);
  const pickerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const offset = useSharedValue(-ITEM_HEIGHT);
  const position = useSharedValue(offset.value);
  const toValue = useSharedValue(0);
  const snapPoints = new Array(periods.length)
    .fill(0)
    .map((_, i) => i * -ITEM_HEIGHT);

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {
        offset.value = position.value;
      },
      onActive: (event) => {
        position.value = offset.value + event.translationY;
        toValue.value = snapPoint(position.value, event.velocityY, snapPoints);
      },
      onEnd: () => {
        position.value = withTiming(toValue.value, timmingConfig);
      },
    });

  useAnimatedReaction(
    () => {
      position.value;
    },
    () => {
      translateY.value = position.value + ITEM_HEIGHT * 2;
    },
    []
  );
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Animated.View style={pickerAnimatedStyle}>
          {periods.map((period, i) => {
            const y = useDerivedValue(() =>
              interpolate(
                (translateY.value - ITEM_HEIGHT * 2) / -ITEM_HEIGHT,
                [i - 3, i, i + 3],
                [-1, 0, 1],
                Extrapolate.CLAMP
              )
            );

            const periodAnimatedStyle = useAnimatedStyle(() => ({
              transform: [
                { perspective: 500 },
                { rotateX: 90 * y.value + "deg" },
                { scale: 1 - 0.1 * Math.abs(y.value) },
              ],
            }));

            return (
              <Animated.View
                key={period.id}
                style={[styles.period, periodAnimatedStyle]}
              >
                <Text style={styles.name}>{period.name}</Text>
              </Animated.View>
            );
          })}
        </Animated.View>
        <TapGestureHandler waitFor={ref} onActivated={()=>alert("hi")}>
          <Animated.View style={[StyleSheet.absoluteFillObject]}>
            <PanGestureHandler onGestureEvent={gestureHandler} ref={ref}>
              <Animated.View style={StyleSheet.absoluteFillObject} />
            </PanGestureHandler>
          </Animated.View>
        </TapGestureHandler>
        <View style={styles.mask} />
      </View>
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    width: WIDTH,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: "hidden",
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
  },
  period: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
  },
  name: {
    color: "#464646",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    lineHeight: ITEM_HEIGHT,
    textAlign: "center",
    textAlignVertical: "center",
  },
  mask: {
    height: ITEM_HEIGHT,
    position: "absolute",
    top: ITEM_HEIGHT * 2,
    width: WIDTH - 64,
    marginHorizontal: 32,
    backgroundColor: "#EEEEEF",
    zIndex: -1,
    borderRadius: 8,
  },
});
