import express, { Express, Request, Response } from 'express';
var app: Express = express();

app.post('/login', function (req: Request, res: Response) {
  const b64auth: String = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password]: Array<string> = Buffer.from(b64auth, 'base64').toString().split(':')
  if (login === "paz" && password === "omer") {
    res.send(true)
  } 
  else {
      res.send(false)
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});