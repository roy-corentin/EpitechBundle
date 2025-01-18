import { useCallback, useState } from "react";
import { Marker } from "../domain/Marker";
import { Button, Center, Text, Box, Link, Flex } from "@chakra-ui/react";
import { useItinerary, useServices } from "../hooks";
import { AddressIcon, DogIcon, WebSiteIcon } from "./Icons";

interface CustomPopupProps {
  marker: Marker;
}

export const CustomPopup = ({ marker }: CustomPopupProps) => {
  const itinerary = useItinerary();
  const [isTruncated, setIsTruncated] = useState(false);
  const services = useServices();

  const isInItinerary = itinerary.includes(marker);

  const itineraryHandler = useCallback(() => {
    if (isInItinerary) return;
    services.addToItinerary.call(marker);
  }, [marker]);

  return (
    <div>
      <Box borderWidth="1px" borderRadius="lg" borderColor={"gray"} background={"gray.300"} p={2}>
        <Center marginBottom={4}>
          <Text as={"b"} size={"xl"}>
            {marker.title}
          </Text>
        </Center>
        <Text
          as={"i"}
          noOfLines={isTruncated ? 2 : undefined}
          onClick={() => {
            setIsTruncated((state) => !state);
          }}
        >
          {marker.description}
        </Text>
        <br />
        <Box pt={2}>
          {marker.address ? (
            <Flex alignItems="center">
              <AddressIcon />
              <Text>
                {marker.address.streetAddress ? marker.address.streetAddress + "," : null}
                {marker.address.city ? marker.address.city + "," : null}
                {marker.address.postalCode ? marker.address.postalCode + "," : null}
                {marker.address.country ? marker.address.country : null}
              </Text>
            </Flex>
          ) : null}
          {marker.link ? (
            <Flex alignItems="center">
              <WebSiteIcon />
              <Link isExternal href={marker.link}>
                Visiter le site web
              </Link>
            </Flex>
          ) : null}
          {marker.petsAllowed ? (
            <Flex alignItems="center">
              <DogIcon />
              <Text>{marker.petsAllowed ? "Acceptés" : "Non acceptés"}</Text>
            </Flex>
          ) : null}
        </Box>
      </Box>
      <Center marginTop={2}>
        <Button
          size={"sm"}
          color={"teal"}
          variant={"ghost"}
          _hover={{ borderColor: "transparent" }}
          onClick={itineraryHandler}
        >
          {isInItinerary ? "Déjà dans l'itinéraire" : "Ajouter itinéraire"}
        </Button>
      </Center>
    </div>
  );
};
