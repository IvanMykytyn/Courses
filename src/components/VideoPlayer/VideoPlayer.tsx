import { FC, useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Button, Flex, Group, Image, Popover, Text } from "@mantine/core";
import {
  addToLocalStorage,
  getFromLocalStorage,
} from "src/helpers/localStorage";

export interface VideoPlayerProps {
  id?: string;
  src: string;
  poster?: string;
  muted?: boolean;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  withPictureInPicture?: boolean;
  width?: number | string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({
  id,
  src,
  poster,
  muted,
  autoPlay,
  width = "78%",
  loop = false,
  controls = true,
  withPictureInPicture = false,
}) => {
  const videoRef = useRef<any>(null);

  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    const hls = new Hls();

    if (src) {
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      const videoProgress = getFromLocalStorage(`videoProgress:${id}`);

      if (id && videoProgress && videoRef && videoRef.current) {
        videoRef.current.currentTime = parseInt(videoProgress) || 0;
      }
    }
  }, [videoRef, src, id]);

  // TODO: move to custom hook
  useEffect(() => {
    if (id) {
      const handleTabClose = () => {
        addToLocalStorage(
          `videoProgress:${id}`,
          Math.floor(videoRef.current.currentTime)
        );
      };

      window.addEventListener("beforeunload", handleTabClose);
      return () => {
        window.removeEventListener("beforeunload", handleTabClose);
      };
    }
  }, [id]);

  const handlePictureInPicture = async () => {
    try {
      await videoRef.current.requestPictureInPicture();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case "ArrowUp":
        if (playbackSpeed < 15) {
          const newPlaybackRate = playbackSpeed + 0.25;
          setPlaybackSpeed(newPlaybackRate);
          videoRef.current.playbackRate = newPlaybackRate;
        }
        break;
      case "ArrowDown":
        if (playbackSpeed > 0) {
          const newPlaybackRate = playbackSpeed - 0.25;
          setPlaybackSpeed(newPlaybackRate);
          videoRef.current.playbackRate = newPlaybackRate;
        }
        break;
    }
  };

  if (src) {
    return (
      <Flex
        direction={"column"}
        align={"center"}
        gap={15}
        onKeyDown={(e: any) => handleKeyDown(e)}
      >
        <video
          width={width}
          height={"auto"}
          ref={videoRef}
          autoPlay={autoPlay}
          poster={poster}
          controls={controls}
          muted={muted}
          loop={loop}
        />
        {withPictureInPicture && (
          <Flex justify={"space-between"} w={width}>
            <Group>
              <Text>current speed: {playbackSpeed}x</Text>
              <Popover width={200} position='bottom' withArrow shadow='md'>
                <Popover.Target>
                  <Button color={"gray"}>Hotkeys</Button>
                </Popover.Target>
                <Popover.Dropdown w={"220px !important"}>
                  <Text size='sm'>Arrow Up - speed + 0.25</Text>
                  <Text size='sm'>Arrow Down - speed - 0.25</Text>
                </Popover.Dropdown>
              </Popover>
            </Group>
            <Button color={"gray"} onClick={handlePictureInPicture}>
              Picture In Picture
            </Button>
          </Flex>
        )}
      </Flex>
    );
  }

  return <Image src={poster} />;
};

export default VideoPlayer;
