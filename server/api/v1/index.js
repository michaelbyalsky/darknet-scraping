const v1Router = require('express').Router();

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
  };
  
  v1Router.use('/users', require('./users'));

  v1Router.use(unknownEndpoint);
  
  module.exports = v1Router;
  