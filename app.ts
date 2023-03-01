import express, { Express, Request, Response } from 'express';
import { generateJwt, verifyJwt } from './auth';


var app: Express = express();

app.post('/login', function (req: Request, res: Response) {
  const b64auth: String = (req.headers.authorization || '').split(' ')[1] || ''
  const [user, password]: Array<string> = Buffer.from(b64auth, 'base64').toString().split(':')

  if (user === "paz" && password === "omer") {
    // res.send(true);
    // Generate JWT
    const token = generateJwt(user, password);
    localStorage.setItem("jwtToken", token);
    const storedToken = localStorage.getItem("jwtToken");
    res.send(storedToken)
  } 
  else {
      res.send(false)
  }
});

// Protected endpoint that requires a valid JWT token in the Authorization header
app.get('/protected', verifyJwt, (req, res) => {
  res.json({ message: 'You have access to this protected endpoint!' });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
