import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import Card from "../Components/Card";
import CButton from "../Components/CButton";
import { environment } from "../Constants/env";
import { GlobalContext } from "../types/context";

const Homescreen: React.FC = () => {
  const globalContext = useContext(GlobalContext);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (globalContext) {
      globalContext.setTitle("Add New Todo");
    }
  }, [globalContext]);

  const handleChangeInput = (inp: string) => {
    setNewTodo(inp);
  };

  const handleAddTodo = () => {
    setLoading(true);
    axios({
      url: `${environment.API_URL}/todo`,
      method: "POST",
      data: {
        name: newTodo,
      },
    }).then(({ data }) => {
      setLoading(false);
      if (data.ok) {
        Alert.alert("Added", "Added New Todo", [
          { text: "Close", style: "default", onPress: () => setNewTodo("") },
        ]);
      }
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.formContainer}>
        {loading && (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="coral" />
          </View>
        )}
        <Card>
          <TextInput
            value={newTodo}
            onChangeText={handleChangeInput}
            onSubmitEditing={handleAddTodo}
            style={styles.input}
            placeholder={"New Todo..."}
          />
          <CButton onPress={handleAddTodo}>
            <Icon name="add" type="material" color="green" />
          </CButton>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    textAlign: "left",
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
