import { FC } from "react";

import {
  AspectRatio,
  Badge,
  Grid,
  Image,
  Overlay,
  Text,
  Title,
} from "@mantine/core";
import { ILesson } from "src/api/courses/types";
import styles from "./lesson.module.scss";
import cn from "classnames";
import { ReactComponent as LockIcon } from "src/assets/lock.svg";
import { getMinutes } from "src/helpers/time";
import { getDifficultyColor } from "src/helpers/lesson";

interface ILessonProps extends ILesson {
  isActive: boolean;
  handleLessonChange: (id: string) => void;
}

const Lesson: FC<ILessonProps> = ({
  handleLessonChange,
  isActive,
  id,
  status,
  previewImageLink,
  order,
  title,
  duration,
  meta,
}) => {
  const { difficulty } = meta || {};
  return (
    <Grid
      key={id}
      columns={5}
      bg={"gray.2"}
      role={"button"}
      className={cn(styles.lesson, { [styles.lessonActive]: isActive })}
      sx={{
        borderRadius: 5,
        cursor: status === "locked" ? "not-allowed" : "pointer",
      }}
      onClick={() => {
        status === "unlocked" && handleLessonChange(id);
      }}
    >
      <Grid.Col span={1}>
        <AspectRatio ratio={16 / 9} maw={400} mx='auto'>
          {status === "unlocked" ? (
            <Image src={`${previewImageLink}/lesson-${order}.webp`} />
          ) : (
            <Overlay blur={15} center>
              <LockIcon />
            </Overlay>
          )}
        </AspectRatio>
      </Grid.Col>
      <Grid.Col
        span={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Title color={"gray.7"} order={3}>
          {order}. {title}
        </Title>
        <Text color={"gray.8"}>{getMinutes(duration)} minutes</Text>
        {difficulty && (
          <Badge mt={10} w={100} color={getDifficultyColor(difficulty)}>{difficulty}</Badge>
        )}
      </Grid.Col>
    </Grid>
  );
};

export default Lesson;
