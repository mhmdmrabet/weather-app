import { IResolved } from "../type";

export async function resolve(promise: Promise<any>): Promise<IResolved> {
  const resolved: IResolved = {
    data: null,
    error: null,
  };

  try {
    resolved.data = await promise;
  } catch (error: any) {
    const errorMsg: string = error.response.data;
    if (typeof error.response.data === "string") {
      const errorMsg = error.response.data;
      resolved.error = errorMsg;
    } else {
      const errorData = error.response;
      resolved.error = errorData;
    }
  }
  return resolved;
}
