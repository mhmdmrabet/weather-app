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
    } else if (typeof error.response.data === "object") {
      if (error.response.data.message) {
        const errorMsg: string = error.response.data.message;
        resolved.error = errorMsg;
      }
    } else if (typeof error.response.data === "string") {
      const errorMsg: string = error.response.data;
      resolved.error = errorMsg;
    } else if (error.response.status === 404) {
      const errorMsg: string = error.response.data;
      resolved.error = "Page Not Found";
    } else {
      const errorData = error.response;
      resolved.error = errorData;
    }
  }

  return resolved;
}
