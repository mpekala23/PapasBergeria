import { Screens } from "./Screens";

export enum Tasks {
  DodgeFlyers = "DodgeFlyers",
  GrillOrder = "GrillOrder",
  Swipe = "Swipe",
}

export const TasksArray = [Tasks.DodgeFlyers, Tasks.GrillOrder, Tasks.Swipe];

export function getTaskTime(task: Tasks, score: number) {
  switch (task) {
    case Tasks.DodgeFlyers:
      return 9;
    case Tasks.GrillOrder:
      return 3.8;
    case Tasks.Swipe:
      return 10;
    default:
      return 0;
  }
}

export function getTaskInitialState(
  task: Tasks
): { wonTask: boolean; lostTask: boolean } {
  switch (task) {
    default:
      return {
        wonTask: false,
        lostTask: false,
      };
  }
}

export function getNewTask(currentTask: Tasks): Tasks {
  const filtered = TasksArray.filter((task) => task !== currentTask);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export function mapTaskToScreen(task: Tasks) {
  switch (task) {
    case Tasks.DodgeFlyers:
      return Screens.DodgeFlyers;
    case Tasks.GrillOrder:
      return Screens.GrillOrder;
    case Tasks.Swipe:
      return Screens.Swipe;
    default:
      return Screens.MainMenu;
  }
}

export function winnableTask(task: Tasks) {
  switch (task) {
    case Tasks.DodgeFlyers:
    case Tasks.GrillOrder:
      return false;
    default:
      return true;
  }
}
