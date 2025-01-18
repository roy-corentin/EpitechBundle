import { Box } from "@chakra-ui/react";
import { LeftPanel } from "../components/LeftPanel";
import { Map } from "../components/Map";
import { Outlet } from "react-router";

export const BaseLayout = () => {
  return (
    <Box style={{ display: "flex" }} className={"Box"}>
      <LeftPanel>
        <Outlet />
      </LeftPanel>
      <Map />
    </Box>
  );
};
