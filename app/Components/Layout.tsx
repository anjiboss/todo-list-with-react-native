import React, { useContext } from "react";
import { View } from "react-native";
import Router from "../Router/Router";

import { GlobalContext } from "../types/context";
import Header from "./Header";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const globalContext = useContext(GlobalContext);
  return (
    <View style={{ flex: 1 }}>
      <Header title={globalContext.title ? globalContext.title : "Non Title"} />
      {children}
      <Router />
    </View>
  );
};
export default Layout;
