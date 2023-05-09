import React, { ReactElement } from "react";
import { ScrollView } from "react-native";
import SortableItem from "./SortableItem";
import { useSharedValue } from "react-native-reanimated";

interface SortableListProps {
  children: ReactElement[];
  item: { width: number; height: number };
}

const SortableList = ({
  children,
  item: { width, height },
}: SortableListProps) => {
  const activeCard = useSharedValue(-1);
  const offsets = children.map((_, i) => ({ y: useSharedValue(height * i) }));
  return (
    <ScrollView contentContainerStyle={{ height: height * children.length }}>
      {children.map((child, index) => (
        <SortableItem
          {...{ offsets, index, width, height, activeCard }}
          key={index}
        >
          {child}
        </SortableItem>
      ))}
    </ScrollView>
  );
};

export default SortableList;
