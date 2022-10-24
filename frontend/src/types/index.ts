export interface IUser {
  name: string;
  id: string;
  image: string;
  places: number;
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

export interface ISignUpResponse {
  message?: string;
  user?: {
    name: string;
    email: string;
    password: string;
    image: string;
    places: any[];
    id: string;
  };
}
