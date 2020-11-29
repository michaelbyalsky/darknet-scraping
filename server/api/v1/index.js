const v1Router = require('express').Router();

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
  };
  
  v1Router.use('/pastes', require('./pastes'));

  v1Router.use(unknownEndpoint);
  
  module.exports = v1Router;
  