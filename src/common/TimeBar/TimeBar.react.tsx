import React, {
  Dispatch,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Animated, View } from "react-native";
import AppState from "@store/types";
import { connect } from "react-redux";
import { WINDOW_WIDTH } from "@utils/Constants";
import { getNewTask, mapTaskToScreen, Tasks, winnableTask } from "@utils/Tasks";
import { GameActionTypes } from "@store/Game/GameTypes";
import {
  incrementScore,
  playTask,
  setLostTask,
  setTask,
  setTime,
  setWonTask,
} from "@store/Game/GameActions";
import { Screens } from "@utils/Screens";

interface Props {
  task: Tasks | null;
  time: number;
  wonTask: boolean;
  lostTask: boolean;
  addScore: () => void;
  startTask: (task: Tasks) => void;
  clearTask: () => void;
  navigate: (screen: Screens, params?: any) => void;
  replace: (screen: Screens, params?: any) => void;
}

const TimeBarBase: React.FC<Props> = ({
  task,
  time,
  wonTask,
  lostTask,
  addScore,
  startTask,
  clearTask,
  navigate,
  replace,
}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const [timedOut, setTimedOut] = useState(false);

  const winTask = () => {
    if (task) {
      addScore();
      const newTask = getNewTask(task);
      const screen = mapTaskToScreen(newTask);
      startTask(newTask);
      replace(screen);
    }
  };

  const loseTask = () => {
    clearTask();
    progress.stopAnimation();
    progress.setValue(0);
    navigate(Screens.MainMenu);
  };

  useEffect(() => {
    if (task) {
      progress.stopAnimation();
      progress.setValue(1);
      Animated.timing(progress, {
        toValue: 0,
        duration: time * 1000,
        useNativeDriver: true,
      }).start(() => {
        setTimedOut(true);
      });
    }
  }, [time, task]);

  useEffect(() => {
    if (!timedOut) return;
    setTimedOut(false);
    if (task && !winnableTask(task)) {
      if (!lostTask) winTask();
      else loseTask();
    }
    if (task && winnableTask(task)) {
      if (wonTask) winTask();
      else loseTask();
    }
  }, [timedOut]);

  useEffect(() => {
    if (wonTask || lostTask) {
      progress.stopAnimation();
    }
  }, [wonTask, lostTask]);

  return (
    <View style={{ width: WINDOW_WIDTH, height: 64 }}>
      <Animated.View
        style={{
          width: WINDOW_WIDTH,
          height: 64,
          backgroundColor: "black",
          transform: [
            {
              translateX: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [-WINDOW_WIDTH, 0],
              }),
            },
          ],
        }}
      ></Animated.View>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  task: state.game.task,
  time: state.game.time,
  wonTask: state.game.wonTask,
  lostTask: state.game.lostTask,
});
const mapDispatchToProps = (dispatch: Dispatch<GameActionTypes>) => ({
  addScore: () => dispatch(incrementScore()),
  startTask: (task: Tasks) => dispatch(playTask(task)),
  clearTask: () => dispatch(setTask(null)),
});
const TimeBar = connect(mapStateToProps, mapDispatchToProps)(TimeBarBase);

export default TimeBar;
