import { StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback, useRef } from "react";
import TodoItem from "./TodoItem";
import { ScrollView } from "react-native-gesture-handler";

const TITLES = ["first 🐢", "second 🎥", "third 👍🏼", "fourth 🚀", "fifth ⭐️"];

export interface ITask {
  title: string;
  index: number;
}

const TASKS: ITask[] = TITLES.map((title, index) => ({ title, index }));

const BACKGROUND_COLOR = "#FAFBFF";

const TodoList = () => {
    const ref = useRef(null)
  const [tasks, setTasks] = useState(TASKS);
  const onDismiss = useCallback((task: ITask) => {
    setTasks((tasks)=>tasks.filter((t) => t.index !== task.index));
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <ScrollView {...{ref}} style={{ flex: 1 }}>
        {tasks.map((task) => (
          <TodoItem key={task.index} {...{ task, onDismiss }} simultaneousHandlers={ref}/>
        ))}
      </ScrollView>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 50,
    margin: 20,
  },
});
