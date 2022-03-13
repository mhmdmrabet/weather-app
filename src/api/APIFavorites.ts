import axios from "axios";
import { IResolved } from "../type";
import { URL_BACK } from "./APIUtils";
import { resolve } from "./resolve";

export async function APIGetUsersFavoriteCities(
  token: string
): Promise<IResolved> {
  const result = await resolve(
    axios.get(`${URL_BACK}/users/cities`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  const response = await result;

  return response;
}
