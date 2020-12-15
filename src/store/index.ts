import { combineReducers, createStore } from "redux";
import GameReducer from "./Game/GameReducer";
import AppState from "./types";

const combinedReducers = combineReducers<AppState>({
  game: GameReducer,
});

const store = createStore(combinedReducers);
export default store;
