import { Box, Center, Container, Flex, Loader, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCourseItemQuery } from "src/api/courses/hooks";
import Lesson from "src/components/Lesson/Lesson";
import VideoPlayer from "src/components/VideoPlayer/VideoPlayer";

import CourseDetails from "./CourseDetails";

const CourseItem = () => {
  const params = useParams<{ id: string }>();

  const { isLoading, data: course } = useCourseItemQuery(params.id || "");

  const { lessons } = course || {};
  lessons?.sort((a, b) => a.order - b.order);

  const [currentLessonId, setCurrentLessonId] = useState<string>("");

  const currentLesson = lessons?.find(
    (lesson) => lesson.id === currentLessonId
  );

  useEffect(() => {
    if (lessons && !currentLessonId) {
      setCurrentLessonId(lessons?.[0].id || "");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessons]);

  const handleLessonChange = (id: string) => {
    setCurrentLessonId(id);
  };

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
    <Container fluid pb={50}>
      {course && <CourseDetails {...course} />}
      <Box pt={50} pb={30}>
        <Flex
          direction={"column"}
          align={"center"}
          sx={{ minHeight: "550px" }}
          pt={10}
          gap={15}
        >
          <Title order={3} color={"gray.7"}>
            Current Video: {currentLesson?.order}. {currentLesson?.title}
          </Title>
          <VideoPlayer
            id={currentLesson?.id || ""}
            src={currentLesson?.link || ""}
            withPictureInPicture
            poster={
              `${currentLesson?.previewImageLink}/lesson-${currentLesson?.order}.webp` ||
              ""
            }
          />
        </Flex>
      </Box>
      <Box>
        <Title order={2} pb={20} color={"gray.8"}>
          Lessons
        </Title>
        <Flex direction={"column"} gap={"xl"}>
          {lessons?.map((lesson) => (
            <Lesson
              key={lesson.id}
              handleLessonChange={handleLessonChange}
              isActive={currentLesson?.id === lesson.id}
              {...lesson}
            />
          ))}
        </Flex>
      </Box>
    </Container>
  );
};

export default CourseItem;
