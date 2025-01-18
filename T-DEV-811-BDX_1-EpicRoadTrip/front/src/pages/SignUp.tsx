import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useServices } from "../hooks";

export const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const services = useServices();

  const onSubmit = async (data: any) => {
    try {
      const user = await services.signUpService.call(data.username, data.email, data.password);
      navigate(user ? "/" : "/signup");
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
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "90%" }}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Nom</FormLabel>
            <Input
              type="text"
              {...register("username", { required: true })}
              onChange={handleFormChange}
              placeholder="Entrez votre username"
            />
            {errors.username && <span>Ce champ est requis</span>}
          </FormControl>
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
          <Button type="submit" colorScheme="blue">
            S'inscrire
          </Button>
        </VStack>
      </form>
    </div>
  );
};
