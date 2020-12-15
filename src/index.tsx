import React from "react";
import { StatusBar, View } from "react-native";
import Navigator from "@navigations";

const App: React.FC = () => {
  return (
    <>
      <StatusBar />
      <Navigator />
    </>
  );
};

export default App;
