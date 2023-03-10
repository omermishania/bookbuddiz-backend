import { Request, Response } from 'express';
import User from '../models/user.model';

export const getUserBooks = async(userName: string, res: Response) => {
  try {
    const user = await User.findOne({ userName });
    if (!user) {
        return res.status(404).send(`User ${userName} not found`);
    }
    return user.books;
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}