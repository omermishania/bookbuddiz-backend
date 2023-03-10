import { Schema, model, Document } from 'mongoose';

interface User {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  books: string[]; // // array of book IDs
}

const UserSchema: Schema = new Schema<User>({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  books: [{ type: String }]
});

const User = model<User>('User', UserSchema);

export default User;