import { Box, Button, Center, Text } from "@chakra-ui/react";
import { ItinerariesSavedList } from "../components/ItinerariesSavedList";
import { useUser } from "../hooks";
import { useNavigate } from "react-router";
import { useCallback } from "react";

export const ItinerariesSaved = () => {
  const user = useUser();
  const navigate = useNavigate();

  const redirectToLogin = useCallback(() => {
    navigate("/signin?redirected=true");
  }, [navigate]);

  return user ? (
    <div>
      <Center>
        <Text as={"b"} fontSize={"2xl"} mt={5}>
          Itinéraires enregistrés
        </Text>
      </Center>
      <Box margin={2} overflow={"auto"} maxH="calc(100vh - 120px)">
        <ItinerariesSavedList />
      </Box>
    </div>
  ) : (
    <Center mt={10}>
      <Button onClick={redirectToLogin}>Se connecter pour continuer</Button>
    </Center>
  );
};
