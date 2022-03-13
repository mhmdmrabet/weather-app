import axios from "axios";
import { ICredentials, IResolved } from "../type";
import { URL_BACK } from "./APIUtils";
import { resolve } from "./resolve";

export async function APILogin(credentials: ICredentials): Promise<IResolved> {
  const result = await resolve(axios.post(`${URL_BACK}/login`, credentials));
  const response = await result;

  return response;
}

export async function APISignUp(credentials: ICredentials) {
  const result = await resolve(axios.post(`${URL_BACK}/signup`, credentials));
  const response = await result;

  return response;
}

export async function APILogout(token: string) {
  const result = await resolve(
    axios.delete(`${URL_BACK}/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
}
