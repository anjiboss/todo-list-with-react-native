import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface TaskProps {
  todo: Todo;
  handleChangeStatus: (todo: Todo) => void;
}

const Task: React.FC<TaskProps> = ({ todo, handleChangeStatus }) => {
  return (
    <TouchableOpacity
      key={todo.id}
      style={styles.task}
      onPress={() => handleChangeStatus(todo)}
    >
      <Text style={{ textAlign: "center", lineHeight: 50 }}>{todo.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  task: {
    width: 300,
    height: 50,
    borderColor: "#1e88e5",
    borderWidth: 0.5,
    borderStyle: "dashed",
    margin: 10,
  },
});

export default Task;
