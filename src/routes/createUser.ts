import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, password } = req.body;

    // Check if a user with the same username already exists in the database
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ error: 'User with the provided username already exists' });
    }

    const newUser = new User({ firstName, lastName, userName, password });
    console.log(password)
    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

