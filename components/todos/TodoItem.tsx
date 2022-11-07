import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ITask } from "./TodoList";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";
import Animated, {
    runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";

interface TodoItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  task: ITask;
  onDismiss?: (task: ITask) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_HEIGHT = 70;
const TRANSLATE_X_THRESHOLD = SCREEN_WIDTH * 0.3;

const TodoItem: React.FC<TodoItemProps> = ({ task, onDismiss, simultaneousHandlers }) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);
  const PanGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      if (translateX.value < -TRANSLATE_X_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(task);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rOpacityStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < -TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return {
      opacity,
    };
  });

  const rHeightStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.taskContainer, rHeightStyle]}>
      <Animated.View style={[styles.iconContainer, rOpacityStyle]}>
        <FontAwesome5
          name={"trash-alt"}
          size={ITEM_HEIGHT * 0.4}
          color={"red"}
        />
      </Animated.View>
      <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={PanGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    alignItems: "center",
  },
  task: {
    width: "90%",
    height: ITEM_HEIGHT,
    justifyContent: "center",
    paddingLeft: 20,
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowColor: "#000",
    shadowOffset: {
      height: 20,
      width: 0,
    },
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: "#fff",
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    position: "absolute",
    height: ITEM_HEIGHT,
    width: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    right: "10%",
  },
});
