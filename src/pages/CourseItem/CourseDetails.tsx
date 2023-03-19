import {
  Badge,
  Box,
  Flex,
  Grid,
  Group,
  Text,
  Timeline,
  Title,
} from "@mantine/core";
import { FC } from "react";
import { ICourseWithLessons } from "src/api/courses/types";
import Rating from "src/components/Rating/Rating";
import VideoPlayer from "src/components/VideoPlayer/VideoPlayer";
import { getMinutes } from "src/helpers/time";
import { ReactComponent as ArrowLeftIcon } from "src/assets/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import { Paths } from "src/constants/paths";

const CourseDetails: FC<ICourseWithLessons> = ({
  title,
  tags,
  launchDate,
  status,
  description,
  duration,
  rating,
  meta,
  lessons,
  containsLockedLessons,
}) => {
  const navigate = useNavigate();
  const { courseVideoPreview } = meta;
  return (
    <Box pb={80}>
      <Title color={"gray.8"}>
        <ArrowLeftIcon
          height={30}
          width={30}
          style={{ cursor: "pointer", marginTop: 10, marginRight: 15 }}
          onClick={() => {
            navigate(Paths.courses);
          }}
        />
        Course Details
      </Title>
      <Grid columns={5} pt={50}>
        <Grid.Col span={3}>
          <Group p={10}>
            <Flex w={"100%"} justify={"space-between"}>
              <Badge
                color={status === "launched" ? "green" : "gray"}
                radius='sm'
                size={"lg"}
              >
                {status}
              </Badge>
              <Badge color='gray' radius='sm' size={"lg"}>
                at {new Date(launchDate).toLocaleDateString()}
              </Badge>
            </Flex>
            <VideoPlayer
              src={courseVideoPreview.link}
              poster={`${courseVideoPreview.previewImageLink}/preview.webp`}
              width={"100%"}
            />
          </Group>
        </Grid.Col>

        <Grid.Col span={2}>
          <Title color={"gray.9"} order={4}>
            {title}
          </Title>
          <Text color={"gray.8"}>{description}</Text>

          <Group pt={10} pb={10}>
            <Rating rating={rating} />
            {tags.map((tag) => {
              return (
                <Badge key={tag} color='gray' radius='sm'>
                  {tag}
                </Badge>
              );
            })}
          </Group>

          <Group spacing={5}>
            <Text fz={"md"} color={"gray.8"}>
              {lessons.length}
            </Text>
            <Text color={"gray.7"}>lessons in the course.</Text>
            {containsLockedLessons && (
              <Text color={"gray.7"}>{"(Contains locked lessons)"}</Text>
            )}
          </Group>

          <Group spacing={5}>
            <Text fz={"md"} color={"gray.8"}>
              {getMinutes(duration)}
            </Text>
            <Text color={"gray.7"}>minutes of content.</Text>
          </Group>
          <Box pt={20}>
            <Title order={5}>What you'll learn</Title>
            <Timeline pt={15}>
              {meta.skills.map((skill) => {
                return (
                  <Timeline.Item
                    key={skill}
                    color={"gray.6"}
                    title={skill}
                    bulletSize={16}
                  />
                );
              })}
            </Timeline>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default CourseDetails;
