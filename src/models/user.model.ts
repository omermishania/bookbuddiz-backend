import { Schema, model, Document } from 'mongoose';

interface User {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}

const UserSchema: Schema = new Schema<User>({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  userName: { type: String, required: false },
  password: { type: String, required: false },
});

const User = model<User>('User', UserSchema);

export default User;