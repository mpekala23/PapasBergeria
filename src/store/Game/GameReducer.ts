import { getTaskInitialState, getTaskTime } from "@utils/Tasks";
import GameState, {
  GameActionTypes,
  INCREMENT_SCORE,
  PLAY_TASK,
  RESET_SCORE,
  SET_LOST_TASK,
  SET_TASK,
  SET_TIME,
  SET_WON_TASK,
} from "./GameTypes";

const initialState = {
  score: 0,
  task: null,
  time: 0,
  wonTask: false,
  lostTask: true,
};

export default function (
  state: GameState = initialState,
  action: GameActionTypes
): GameState {
  const currentState = { ...state };
  let initial;
  switch (action.type) {
    case INCREMENT_SCORE:
      currentState.score += 1;
      return currentState;
    case RESET_SCORE:
      currentState.score = 0;
      return currentState;
    case PLAY_TASK:
      currentState.task = action.payload;
      currentState.time = getTaskTime(action.payload, currentState.score);
      initial = getTaskInitialState(action.payload);
      currentState.wonTask = initial.wonTask;
      currentState.lostTask = initial.lostTask;
      return currentState;
    case SET_TASK:
      currentState.task = action.payload;
      return currentState;
    case SET_TIME:
      currentState.time = action.payload;
      return currentState;
    case SET_WON_TASK:
      currentState.wonTask = action.payload;
      return currentState;
    case SET_LOST_TASK:
      currentState.lostTask = action.payload;
      return currentState;
    default:
      return currentState;
  }
}
