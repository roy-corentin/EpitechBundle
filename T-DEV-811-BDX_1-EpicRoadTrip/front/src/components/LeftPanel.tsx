import { Box, Center, Tab, TabList, Tabs } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";

export const LeftPanel = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      style={{
        flex: 1,
        height: "100vh",
        maxWidth: "400px",
      }}
    >
      <TabsBar />
      {children}
    </Box>
  );
};

const TabsBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = ["/", "/itinerary", "/saves"];

  return (
    <Center>
      <Tabs w={"95%"} size="lg" variant="soft-rounded" defaultIndex={tabs.indexOf(location.pathname)}>
        <TabList>
          <Tab w={"100%"} borderRadius={"5%"} onClick={() => navigate("/")}>
            Recherche
          </Tab>
          <Tab w={"100%"} borderRadius={"5%"} onClick={() => navigate("/itinerary")}>
            Itinéraire
          </Tab>
          <Tab w={"100%"} borderRadius={"5%"} onClick={() => navigate("/saves")}>
            Sauvegardes
          </Tab>
        </TabList>
      </Tabs>
    </Center>
  );
};
