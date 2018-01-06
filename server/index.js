require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const parser = require('body-parser');
const path = require('path');
<<<<<<< HEAD
=======
const router = require('./routes');
>>>>>>> [add] - adding createEvent component, router, routes connection to server
const db = require('./SQL/models')

const app = express();


app.use(express.static(path.resolve(__dirname, '../client/public')));

<<<<<<< HEAD
// app.get('/', (req, res) => {
//   console.log('get')
//   res.send('200')
// })
=======
app.use('/dogs', router);
>>>>>>> [add] - adding createEvent component, router, routes connection to server

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});