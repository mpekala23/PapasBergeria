import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Screens } from "@utils/Screens";
import {
  DodgeFlyersScreen,
  GrillOrderScreen,
  MainMenuScreen,
  SwipeScreen,
} from "@views";
import {
  NavigationContainer,
  NavigationContainerRef,
  StackActions,
} from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "@store";
import { TimeBar } from "@common";

const RootStack = createStackNavigator();
const navigationRef = React.createRef<NavigationContainerRef>();
function navigate(name: Screens, params?: any): void {
  if (navigationRef.current) navigationRef.current.navigate(name, params);
}
function replace(name: Screens, params?: any): void {
  if (navigationRef.current)
    navigationRef.current.dispatch(StackActions.replace(name, params));
}

const Navigator: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator>
          <RootStack.Screen
            name={Screens.MainMenu}
            component={MainMenuScreen}
          />
          <RootStack.Screen
            name={Screens.DodgeFlyers}
            component={DodgeFlyersScreen}
          />
          <RootStack.Screen
            name={Screens.GrillOrder}
            component={GrillOrderScreen}
          />
          <RootStack.Screen name={Screens.Swipe} component={SwipeScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
      <TimeBar navigate={navigate} replace={replace} />
    </Provider>
  );
};

export default Navigator;
