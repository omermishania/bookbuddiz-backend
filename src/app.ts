import express, { Express, Request, Response } from 'express';
import { generateJwt, verifyJwt } from '../auth';
import connectDB from './db';
import authenticateUser from './middlewares/auth';
import { addBookToUser } from './routes/addBookToUser';
import { getUserBooks } from './routes/getUserBooks';
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

app.get('/users/:userName/books', async (req, res) => {
  const userName = req.params.userName;
  const userBooks = await getUserBooks(userName, res);
  if (userBooks) {
    res.json(userBooks);
  }
});

app.post('/users/:username/books/:bookId', async (req, res) => {
  const { username, bookId } = req.params;
  // Add the book to the user's books array
  const bookAdded = await addBookToUser(username, bookId);

  if (bookAdded) {
    res.status(200).send(`Book ${bookId} added to user ${username}`);
  } else {
    res.status(404).send(`User ${username} not found`);
  }
});


app.listen(3000, function () {
  console.log('Bookbuddiz listening on port 3000!');
});
function delay(arg0: number) {
  throw new Error('Function not implemented.');
}

