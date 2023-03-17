import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

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


UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  next();
});



const User = model<User>('User', UserSchema);

export default User;