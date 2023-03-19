import { Group, Rating as MantineRating, Text } from "@mantine/core";
import { FC } from "react";

interface RatingProps {
  rating: number;
}

const Rating: FC<RatingProps> = ({ rating }) => {
  return (
    <Group spacing='xs'>
      <Text color={"yellow.7"}>{rating}</Text>
      <MantineRating defaultValue={rating} fractions={4} readOnly />
    </Group>
  );
};

export default Rating;
