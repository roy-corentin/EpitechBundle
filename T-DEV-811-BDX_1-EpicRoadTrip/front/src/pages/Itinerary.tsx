import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { useItinerary, useServices, useUser } from "../hooks";
import { useCallback, useState } from "react";
import { ItineraryList } from "../components/ItineraryList";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";

export const Itinerary = () => {
  const itinerary = useItinerary();
  const services = useServices();
  const user = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const createItinerary = useCallback(() => {
    if (user) services.saveItinerary.call(name);
    else navigate("/signin?redirected=true");
  }, [services, name]);

  const clearHandler = useCallback(() => {
    services.clearItinerary.call();
  }, [services]);

  return (
    <>
      {itinerary.length >= 2 && <Center></Center>}
      <Box margin={2} overflow={"auto"} maxH="calc(100vh - 150px)">
        {itinerary.length >= 1 && (
          <Box display="flex" gap={2} mb={4}>
            <Button background={"red.700"} width={"100%"} onClick={clearHandler}>
              <DeleteIcon />
            </Button>
            <Button background={"blue.700"} width={"100%"} onClick={onOpen}>
              <EditIcon />
            </Button>
          </Box>
        )}
        <ItineraryList />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enregistrer un nouvel itinéraire</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Entrer le nom de l'itinéraire</FormLabel>
              <Input
                placeholder="ex : Road trip été 2024..."
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                createItinerary();
                onClose();
              }}
            >
              Sauvegarder
            </Button>
            <Button onClick={onClose}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
