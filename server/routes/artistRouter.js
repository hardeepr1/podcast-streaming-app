const express = require('express');

//this is just for time being should be replaced by actual database.
const mockData = require('../mockData.js');

function routes() {
  const artistRouter = express.Router();

  artistRouter.get('/artist', function (req, res) {
    const returnedAuthors = mockData.authors;
    res.status(201);
    return res.send(returnedAuthors);
  });

  return artistRouter;
}

module.exports = routes;
