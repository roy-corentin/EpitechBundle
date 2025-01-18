import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useServices } from "../hooks";
import { useSearchParams } from "react-router-dom";

export const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const services = useServices();

  const wasRedirected = searchParams.get("redirected") ?? false;

  const onSubmit = async (data: any) => {
    try {
      const user = await services.signInService.call(data.email, data.password);
      if (!user) return;

      if (wasRedirected) {
        navigate(-1);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
      <h1>Signin</h1>
      {wasRedirected ? <p>Il faut vous connecter pour continuer</p> : null}
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "90%" }}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", { required: true })}
              onChange={handleFormChange}
              placeholder="Entrez votre email"
            />
            {errors.email && <span>Ce champ est requis</span>}
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Mot de passe</FormLabel>
            <Input
              type="password"
              {...register("password", { required: true })}
              onChange={handleFormChange}
              placeholder="Entrez votre mot de passe"
            />
            {errors.password && <span>Ce champ est requis</span>}
          </FormControl>
          <Box display="flex" gap={2} mt={2}>
            <Button type="submit" colorScheme="blue">
              Se connecter
            </Button>
            <Button colorScheme="pink" onClick={() => navigate("/signup")}>
              Créer un compte
            </Button>
          </Box>
        </VStack>
      </form>
    </div>
  );
};
