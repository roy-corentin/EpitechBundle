export interface SessionApiInterface {
  signIn(email: string, password: string): Promise<Response>;
  signUp(username: string, email: string, password: string): Promise<Response>;
}

export class SessionApi implements SessionApiInterface {
  async signUp(username: string, email: string, password: string): Promise<Response> {
    const body = { user: { username, email, password } };
    const headers = new Headers();

    headers.append("Content-type", "application/json");

    return await fetch("http://localhost:4000/api/sign_up", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  }

  async signIn(email: string, password: string): Promise<Response> {
    const body = { user: { email, password } };
    const headers = new Headers();
    const token = localStorage.removeItem("token");

    headers.append("Content-type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    return await fetch("http://localhost:4000/api/sign_in", {
      method: "POST",
      credentials: "same-origin",
      headers,
      body: JSON.stringify(body),
    });
  }
}
