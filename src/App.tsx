import { Container } from "@mantine/core";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import QueryClientProvider from "./configs/QueryClientProvider";

const App: FC = () => (
  <QueryClientProvider>
    <Container color={"gray.1"} size={"lg"}>
      <Navbar />
      <Outlet />
    </Container>
  </QueryClientProvider>
);

export default App;
