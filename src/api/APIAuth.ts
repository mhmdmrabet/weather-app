import axios from "axios";
import { IResolved } from "../type";
import { URL_BACK } from "./APIUtils";
import { resolve } from "./resolve";

export async function login(credentials: {
  email: string;
  password: string;
}): Promise<IResolved> {
  const result = await resolve(axios.post(`${URL_BACK}/login`, credentials));
  const response = await result;

  return response;
}
