import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Layout from "./Components/Layout";
import { GlobalContext } from "./types/context";

export default function App() {
  const [title, setTitle] = useState("Home");
  const [showNavigation, setShowNavigation] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        title: title,
        setTitle,
        setShowNavigation,
        navigation: showNavigation,
      }}
    >
      <View style={styles.container}>
        <Layout></Layout>
        <StatusBar style="auto" />
      </View>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
