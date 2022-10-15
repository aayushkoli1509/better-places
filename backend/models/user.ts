import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IUserModel } from '../types';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
});

userSchema.plugin(uniqueValidator);

export default mongoose.model<IUserModel>('User', userSchema);
