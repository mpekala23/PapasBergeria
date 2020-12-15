import { Tasks } from "@utils/Tasks";
import {
  GameActionTypes,
  INCREMENT_SCORE,
  PLAY_TASK,
  RESET_SCORE,
  SET_LOST_TASK,
  SET_TASK,
  SET_TIME,
  SET_WON_TASK,
} from "./GameTypes";

export function incrementScore(): GameActionTypes {
  return {
    type: INCREMENT_SCORE,
  };
}

export function resetScore(): GameActionTypes {
  return {
    type: RESET_SCORE,
  };
}

export function playTask(task: Tasks): GameActionTypes {
  return {
    type: PLAY_TASK,
    payload: task,
  };
}

export function setTask(task: Tasks | null): GameActionTypes {
  return {
    type: SET_TASK,
    payload: task,
  };
}

export function setTime(time: number): GameActionTypes {
  return {
    type: SET_TIME,
    payload: time,
  };
}

export function setWonTask(val: boolean): GameActionTypes {
  return {
    type: SET_WON_TASK,
    payload: val,
  };
}

export function setLostTask(val: boolean): GameActionTypes {
  return {
    type: SET_LOST_TASK,
    payload: val,
  };
}
