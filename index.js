const express = require('express');
const cors = require('cors');

const data = require('./data');
const getData = (sortBy = '') => ({
  games: data.games
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue && bValue) {
        if (aValue < bValue) {
          return -1;
        }
        if (aValue > bValue) {
          return 1;
        }
      }

      return 0;
    })
});

const app = express();

app.use(cors());
app.options('*', cors());

app.get('/games', function (req, res) {
  const sortBy = req.query.sortBy;

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(getData(sortBy)));
});

app.listen(4000);
