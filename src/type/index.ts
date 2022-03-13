export interface IFormInput extends ICredentials {}

export interface ICredentials {
  email: string;
  password: string;
}
export interface ILogin {
  token: string;
  type: string;
  expires_at: string;
}

export interface Icity {
  id: number;
  country: string;
  city_name: string | null;
  country_code: string | null;
  lat: string;
  lon: string;
  state: string | null;
  zip_code: string | null;
  created_at: string;
  updated_at: string;
}

export interface IData {
  data: { token: string };
}

export interface IResolved {
  data: any;
  error: {} | null | string;
}
