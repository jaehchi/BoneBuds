require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const parser = require('body-parser');
const path = require('path');
const router = require('./routes');
const db = require('./SQL/db');

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/public')));

// serves up the index.html on any page refreshes to the react routes.
app.get('/userprofile', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'))
})

app.use('/events', router);
app.use('/users', router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});