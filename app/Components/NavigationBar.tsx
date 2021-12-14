import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { RouterContext } from "../Router/RouteContext";
import CButton from "./CButton";

const NavigationBar: React.FC = () => {
  const router = useContext(RouterContext);
  return (
    <View style={styles.naBar}>
      <View style={[styles.btn, {}]}>
        <CButton
          customContainerStyle={{
            backgroundColor:
              router.currentRoute === "LeftScreen" ? "skyblue" : "white",
          }}
          onPress={() => {
            console.log(router.changeRoute);
            if (router.changeRoute && router.currentRoute !== "LeftScreen") {
              router.changeRoute("LeftScreen");
            }
          }}
        >
          <Icon name="add" />
        </CButton>
      </View>
      <View style={styles.btn}>
        <CButton
          customContainerStyle={{
            backgroundColor:
              router.currentRoute === "HomeScreen" ? "skyblue" : "white",
          }}
          onPress={() => {
            if (router.changeRoute && router.currentRoute !== "HomeScreen") {
              router.changeRoute("HomeScreen");
            }
          }}
        >
          <Icon name="fact-check" />
        </CButton>
      </View>
      <View style={styles.btn}>
        <CButton
          customContainerStyle={{
            backgroundColor:
              router.currentRoute === "RightScreen" ? "skyblue" : "white",
          }}
          onPress={() => {
            if (router.changeRoute && router.currentRoute !== "RightScreen") {
              router.changeRoute("RightScreen");
            }
          }}
        >
          <Icon name="done" />
        </CButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  naBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 20,
    borderRadius: 10,
  },
});

export default NavigationBar;
