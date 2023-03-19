import { useQuery } from "react-query";
import { Paths } from "src/constants/paths";
import { router } from "src/router";
import { getCourseById, getCourses } from "./api";
import type { ICourse, ICourseWithLessons } from "./types";

export const useCourseItemQuery = (id: string) => {
  return useQuery<ICourseWithLessons>({
    queryKey: ["courses", id],
    queryFn: async () => getCourseById(id),
    onError: () => {
      router.navigate(Paths.error);
    },
  });
};

export const useCoursesQuery = () => {
  return useQuery<ICourse[]>({
    queryKey: ["courses"],
    queryFn: () => getCourses().then((res) => res.courses),
  });
};
