import { Stack, Center, Flex, Box, Text, Button } from "@chakra-ui/react";
import { useItinerariesSaved, useServices } from "../hooks";
import { MarkerIcon } from "./Icons";
import { useCallback } from "react";
import { PDFService } from "../services/PdfService";
import { Itinerary } from "../domain/itinerary";
import { DeleteIcon } from "@chakra-ui/icons";

export const ItinerariesSavedList = () => {
  const itinerariesSaved = useItinerariesSaved();
  const services = useServices();

  const showItinerary = useCallback(
    (index: number) => {
      services.showItinerary.call(index);
    },
    [services]
  );

  const generatePDF = useCallback((itinerary: Itinerary) => {
    PDFService.generateItineraryPDF(itinerary);
  }, []);

  const deleteItinerary = useCallback(
    (index: number) => {
      services.deleteItinerarySaved.call(index);
    },
    [services]
  );

  return (
    <div>
      {itinerariesSaved.length !== 0 ? (
        itinerariesSaved.map((itinerary, index) => (
          <Stack direction={"row"} key={index}>
            <Box
              minW={"sm"}
              maxW={"sm"}
              p={2}
              background={"gray.700"}
              borderWidth="1px"
              borderRadius="lg"
              marginBottom={5}
            >
              <Center marginBottom={4}>
                <Text as={"b"} size={"xl"}>
                  {itinerary.name}
                </Text>
              </Center>

              <Box pt={2}>
                <Flex alignItems="center">
                  <MarkerIcon />
                  <Text>Départ : {itinerary.markers[0]?.title}</Text>
                </Flex>

                <Flex alignItems="center" pt={4}>
                  <MarkerIcon />
                  <Text>Arrivée : {itinerary.markers[itinerary.markers.length - 1]?.title}</Text>
                </Flex>
              </Box>
              <Center>
                <Stack direction={"row"}>
                  <Button
                    mt={4}
                    onClick={() => {
                      showItinerary(index);
                    }}
                  >
                    Voir l'itinéraire
                  </Button>
                  <Button
                    mt={4}
                    onClick={() => {
                      generatePDF(itinerary);
                    }}
                  >
                    Générer le pdf
                  </Button>
                  <Button
                    mt={4}
                    background="red.700"
                    onClick={() => {
                      deleteItinerary(index);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </Stack>
              </Center>
            </Box>
          </Stack>
        ))
      ) : (
        <Text textAlign={"center"}>Aucun itinéraires</Text>
      )}
    </div>
  );
};
