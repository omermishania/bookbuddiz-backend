import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    console.log(userName, password)
    // Find the user with the provided username
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    console.log(password, user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // If the password matches, return a success response
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};