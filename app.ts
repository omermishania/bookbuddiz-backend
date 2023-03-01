import express, { Express, Request, Response } from 'express';
import { generateJwt } from './auth';


var app: Express = express();

app.post('/login', function (req: Request, res: Response) {
  const b64auth: String = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password]: Array<string> = Buffer.from(b64auth, 'base64').toString().split(':')

  // Generate JWT
    const token = generateJwt(login, password);
  
  if (login === "paz" && password === "omer") {
    res.json({ token });
  } 
  else {
      res.send(false)
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});