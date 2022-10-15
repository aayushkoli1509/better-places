import { Document, Types } from 'mongoose';

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

export interface IPlaceModel extends Omit<IPlace, 'creator'> {
  creator: Types.ObjectId;
}

export interface IUserModel extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  places: Types.Array<Types.ObjectId>;
}
