import {
  Center,
  Container,
  Flex,
  Group,
  Loader,
  Pagination,
  Title,
} from "@mantine/core";
import { useState } from "react";

import { useCoursesQuery } from "src/api/courses/hooks";
import Course from "src/components/Course/Course";
import { COURSES_PER_PAGE } from "src/constants/courses";

const Courses = () => {
  const { isLoading, data: courses } = useCoursesQuery();

  const [activePage, setPage] = useState(1);
  const totalPages = Math.ceil((courses?.length || 1) / COURSES_PER_PAGE);

  if (isLoading) {
    return (
      <Center
        sx={{
          minHeight: "95vh",
        }}
      >
        <Loader />
      </Center>
    );
  }

  return (
    <Container fluid pt={20}>
      <Title align={"center"} color={"gray.7"}>
        Courses
      </Title>
      <Group mt={15} spacing={"sm"}>
        {courses?.map((course, index) => {
          if (
            index >= (activePage - 1) * COURSES_PER_PAGE &&
            index < activePage * COURSES_PER_PAGE
          ) {
            return <Course key={course.id} {...course} />;
          }
          return null;
        })}
      </Group>
      {courses?.length && (
        <Flex pt={50} pb={80} justify={"center"}>
          <Pagination
            value={activePage}
            onChange={setPage}
            total={totalPages}
          />
        </Flex>
      )}
    </Container>
  );
};

export default Courses;
