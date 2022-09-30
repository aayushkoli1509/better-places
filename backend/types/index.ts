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

export interface TypedRequest<T> extends Express.Request {
  body: T;
}
