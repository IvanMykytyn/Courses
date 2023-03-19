import { Box, Button, Flex, Text } from "@mantine/core";
import { FC } from "react";
import { useAuthTokenMutation } from "src/api/auth/hooks";
import { useAuthStore } from "src/store/useAuthStore";

const Navbar: FC = () => {
  const { mutate } = useAuthTokenMutation();
  const { isLogged, logout } = useAuthStore();
  return (
    <Box component='nav'>
      <Flex gap={20} align={"center"} justify={"flex-end"} pr={90}>
        {isLogged ? (
          <Text>Anonymous</Text>
        ) : (
          <Button
            onClick={() => {
              mutate();
            }}
            color='gray'
          >
            Sign In
          </Button>
        )}
        {isLogged && (
          <Button onClick={logout} variant='light' color='gray'>
            Sign out
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
