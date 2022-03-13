export interface IFormInput {
  email: string;
  password: string;
}

export interface ILogin {
  token: string;
}

export interface IResolved {
  data: ILogin | null;
  error: {} | null | string;
}
