import { SessionApiInterface } from "../apis/SessionApi";
import { userApiParser } from "../domain/UserApiParser";
import { AppStore } from "../store";

export class SignUpService {
  store: AppStore;
  api: SessionApiInterface;

  constructor(store: AppStore, api: SessionApiInterface) {
    this.store = store;
    this.api = api;
  }

  async call(username: string, email: string, password: string) {
    const response = await this.api.signUp(username, email, password);
    if (!response.ok) return null;

    const responseJson = await response.json();
    const userApi = responseJson["data"]["user"];
    const user = userApiParser(userApi);

    this.store.setState((_state) => ({
      user: user,
    }));

    return user;
  }
}
