import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Task from "../Components/Task";
import { environment } from "../Constants/env";
import { GlobalContext } from "../types/context";

const Homescreen: React.FC = () => {
  const globalContext = useContext(GlobalContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (globalContext) {
      globalContext.setTitle("Todos");
    }
  }, [globalContext]);

  useEffect(() => {
    if (todos && todos.length === 0) {
      setLoading(true);
      axios({
        url: `${environment.API_URL}/todo`,
        method: "get",
      }).then(({ data }) => {
        setTodos(data.todos);
        setLoading(false);
      });
    }
  }, []);

  const handleChangeStatus = (todo: Todo) => {
    setLoading(true);
    axios({
      url: `${environment.API_URL}/todo`,
      method: "put",
      data: {
        id: todo.id,
      },
    }).then(({ data }) => {
      if (data.ok) {
        const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
        setTodos(newTodos);
        setLoading(false);
      }
    });
  };

  return (
    <View style={styles.taskContainer}>
      {loading && (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="coral" />
        </View>
      )}
      {todos &&
        todos.map((todo) => (
          <Task
            key={todo.id}
            todo={todo}
            handleChangeStatus={handleChangeStatus}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Homescreen;
