import { User } from "./user";

interface UserApi {
  id: number;
  username: string;
  email: string;
}

export function userApiParser(userApi: UserApi): User {
  return {
    id: userApi.id.toString(),
    username: userApi.username,
    email: userApi.email,
  };
}
