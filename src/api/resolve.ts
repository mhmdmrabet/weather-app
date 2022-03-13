import { IResolved } from "../type";

export async function resolve(promise: Promise<any>): Promise<IResolved> {
  const resolved: IResolved = {
    data: null,
    error: null,
  };

  try {
    resolved.data = await promise;
  } catch (error: any) {
    if (typeof error.response.data.errors === "object") {
      if (Array.isArray(error.response.data.errors)) {
        const errorMsg: string = error.response.data.errors[0].message;
        resolved.error = errorMsg;
      }
    } else if (typeof error.response.data === "string") {
      const errorMsg: string = error.response.data;
      resolved.error = errorMsg;
    } else {
      const errorData = error.response;
      resolved.error = errorData;
    }
  }

  return resolved;
}
