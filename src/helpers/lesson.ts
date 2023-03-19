import { ILesson } from "src/api/courses/types";

type Difficulty = NonNullable<ILesson["meta"]>["difficulty"];

export const getDifficultyColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "easy":
      return "green.8";
    case "medium":
      return "yellow.8";
    case "hard":
      return "red.8";
    default:
      return "";
  }
};
