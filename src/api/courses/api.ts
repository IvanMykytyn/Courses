import privateApi from "src/configs/private-api";
import type { ICourses, ICourseWithLessons } from "./types";

export const getCourses = async (): Promise<ICourses> => {
  return privateApi.get("/core/preview-courses").then((res) => res.data);
};

export const getCourseById = async (
  id: string
): Promise<ICourseWithLessons> => {
  return privateApi.get(`/core/preview-courses/${id}`).then((res) => res.data);
};
