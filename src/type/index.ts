export interface IFormInput {
  email: string;
  password: string;
}

export interface ILogin {
  data: {
    token: string;
    type: string;
    expires_at: string;
  };
}

export interface IResolved {
  data: ILogin | null;
  error: {} | null | string;
}
