import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { mySecretKey } from './secrets';


export function generateJwt(username: string, password: string): string {
  // Verify user credentials here (e.g., using a database lookup)

  // Create the payload
  const payload = {
    username,
    role: 'user'
  };

  // Sign the token using a secret key
  const token = jwt.sign(payload, mySecretKey, { expiresIn: '1h' });

  return token;
}


export function verifyJwt(req: Request, res: Response): void {
    // Retrieve JWT from local storage
    const storedToken = ''
    try{
        const storedToken = localStorage.getItem("jwtToken");
    } catch (error) {
        
        res.status(401).json({ error: 'Unauthorized' });
    }
    // Verify the JWT
    const secretKey = 'mysecretkey';
    try {
      const decoded = jwt.verify(storedToken, secretKey);
      // Attach the decoded payload to the request object for use in subsequent handlers
      res.send(decoded)
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
  }
