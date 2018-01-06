require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const parser = require('body-parser');
const path = require('path');
const db = require('./SQL/models')

const app = express();


app.use(express.static(path.resolve(__dirname, '../client/public')));

// app.get('/', (req, res) => {
//   console.log('get')
//   res.send('200')
// })

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});