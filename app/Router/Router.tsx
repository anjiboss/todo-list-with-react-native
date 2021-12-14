import React, { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import NavigationBar from "../Components/NavigationBar";
import { RouterContext } from "./RouteContext";
// const Router = React.lazy(() => import("../Router/Router"));
import HomeScreen from "../Screen/Homescreen";
import LeftScreen from "../Screen/LeftScreen";
import RightScreen from "../Screen/RightScreen";

const Router: React.FC = ({}) => {
  const [route, setRoute] = useState<Route>("HomeScreen");
  const changeRoute = useCallback((route: Route) => {
    setRoute(route);
  }, []);
  return (
    <RouterContext.Provider value={{ changeRoute, currentRoute: route }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {route === "RightScreen" ? (
            <RightScreen />
          ) : route === "LeftScreen" ? (
            <LeftScreen />
          ) : (
            <HomeScreen />
          )}
        </ScrollView>
      </View>
      <NavigationBar />
    </RouterContext.Provider>
  );
};
export default Router;
