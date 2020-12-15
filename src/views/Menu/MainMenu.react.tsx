import React from "react";
import { Button, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteParams, Screens } from "@utils/Screens";
import store from "@store";
import { playTask } from "@store/Game/GameActions";
import { Tasks } from "@utils/Tasks";

interface Props {
  navigation: StackNavigationProp<RouteParams, Screens.MainMenu>;
}

const MainMenuScreen: React.FC<Props> = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Button
        title="GrillOrder game"
        onPress={() => {
          store.dispatch(playTask(Tasks.GrillOrder));
          navigation.navigate(Screens.GrillOrder);
        }}
      />
      <Button
        title="Swipe game"
        onPress={() => {
          store.dispatch(playTask(Tasks.Swipe));
          navigation.navigate(Screens.Swipe);
        }}
      />
      <Button
        title="Dodge flyers game"
        onPress={() => {
          store.dispatch(playTask(Tasks.DodgeFlyers));
          navigation.navigate(Screens.DodgeFlyers);
        }}
      />
    </View>
  );
};

export default MainMenuScreen;
