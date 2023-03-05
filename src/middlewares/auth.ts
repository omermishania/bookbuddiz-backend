import { Request, Response, NextFunction } from 'express';
// import bcrypt from 'bcrypt';
import User from '../models/user.model';

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body)
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

// ### Make sure that the password is the password of the same user ###
    if (!password) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }
    // const passwordMatches = await bcrypt.compare(password, user.password);

    // if (!passwordMatches) {
    //   res.status(401).json({ message: 'Invalid username or password' });
    //   return;
    // }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default authenticateUser;
