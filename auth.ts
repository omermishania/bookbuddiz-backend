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
