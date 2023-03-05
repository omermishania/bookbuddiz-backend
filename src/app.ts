import express, { Express, Request, Response } from 'express';
import { generateJwt, verifyJwt } from '../auth';
import connectDB from './db';
import authenticateUser from './middlewares/auth';
import { createUser } from './routes/createUser';
import { getAllUsers } from './routes/getAllUsers';

var bodyParser = require('body-parser');
var app: Express = express();
app.use(express.json())

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// Connect to Mongo
connectDB();


app.get('/users', getAllUsers);
app.post('/users', createUser);
app.post('/login', authenticateUser, (req, res) => {
  // Return a response indicating that the user is authenticated
  res.json({ message: 'User is authenticated' });
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
function delay(arg0: number) {
  throw new Error('Function not implemented.');
}

