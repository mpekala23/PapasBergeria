import { Tasks } from "@utils/Tasks";

export const INCREMENT_SCORE = "game/increment_score";
export const RESET_SCORE = "game/reset_score";
export const PLAY_TASK = "game/play_task";
export const SET_TASK = "game/set_task";
export const SET_TIME = "game/set_time";
export const SET_WON_TASK = "game/set_won_task";
export const SET_LOST_TASK = "game/set_lost_task";

interface IncrementScoreAction {
  type: typeof INCREMENT_SCORE;
  payload?: undefined;
}

interface ResetScoreAction {
  type: typeof RESET_SCORE;
  payload?: undefined;
}

interface PlayTaskAction {
  type: typeof PLAY_TASK;
  payload: Tasks;
}

interface SetTaskAction {
  type: typeof SET_TASK;
  payload: Tasks | null;
}

interface SetTimeAction {
  type: typeof SET_TIME;
  payload: number;
}

interface SetWonTaskAction {
  type: typeof SET_WON_TASK;
  payload: boolean;
}

interface SetLostTaskAction {
  type: typeof SET_LOST_TASK;
  payload: boolean;
}

export type GameActionTypes =
  | IncrementScoreAction
  | ResetScoreAction
  | PlayTaskAction
  | SetTaskAction
  | SetTimeAction
  | SetWonTaskAction
  | SetLostTaskAction;

export default interface GameState {
  score: number;
  task: Tasks | null;
  time: number;
  wonTask: boolean;
  lostTask: boolean;
}
