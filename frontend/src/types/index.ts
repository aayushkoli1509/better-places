export interface IUser {
  name: string;
  id: string;
  image: string;
  email: string;
  password: string;
  places: any[];
}

export interface IPlace {
  id: string;
  imageURL: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: ILocation;
}

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IValidator {
  type: string;
  val?: number;
}

export type IValidatorFunction = () => IValidator;

export interface IResponse {
  message: string;
}
export interface ISignUpResponse {
  user: IUser;
}

export interface ILoginResponse extends IResponse {}

export interface IGetUsersResponse {
  users: IUser[];
}
