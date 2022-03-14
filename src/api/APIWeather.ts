import axios from "axios";
import { IResolved } from "../type";
import { URL_BACK } from "./APIUtils";
import { resolve } from "./resolve";

export async function APIGetWeatherByGeoCoords(
  longitude: number,
  latitude: number
): Promise<IResolved> {
  const result = await resolve(
    axios.get(`${URL_BACK}/weather/?lon=${longitude}&lat=${latitude}`)
  );
  const response = await result;

  return response;
}
