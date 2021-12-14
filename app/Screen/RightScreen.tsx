import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { environment } from "../Constants/env";
import { GlobalContext } from "../types/context";

const Homescreen: React.FC = () => {
  const globalContext = useContext(GlobalContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (globalContext) {
      globalContext.setTitle("Completed");
    }
  }, [globalContext]);

  useEffect(() => {
    if (todos && todos.length === 0) {
      setLoading(true);
      axios({
        url: `${environment.API_URL}/todo/completed`,
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
        setLoading(false);
        setTodos(newTodos);
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
          <TouchableOpacity
            key={todo.id}
            style={styles.task}
            onPress={() => handleChangeStatus(todo)}
          >
            <Text style={{ textAlign: "center", lineHeight: 50 }}>
              {todo.name}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
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
