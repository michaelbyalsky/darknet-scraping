// const express    = require("express");
// const controller = require("../controllers");
// const elasticRouter = require("express").Router();

// const model = require("../models");

// elasticRouter.get("/", async (req, res) => {
//   const query  = req.query;
//   if (!query.text) {
//     res.status(422).json({
//       error: true,
//       data: "Missing required parameter: text"
//     });
//     return;
//   }
//   try {
//     const result = await model.getQuotes(req.query);
//     res.json({ success: true, data: result });
//   } catch (err) {
//     res.status(500).json({ success: false, error: "Unknown error."});
//   }
// })

// elasticRouter.post("/", async (req, res) => {
//   const body = req.body;
//   if (!body.quote || !body.author) {
//     res.status(422).json({
//       error: true,
//       data: "Missing required parameter(s): 'body' or 'author'"
//     });
//     return;
//   }
//   try {
//     const result = await model.insertNewQuote(body.quote, body.author);
//     res.json({ 
//       success: true, 
//       data: {
//         id:     result.body._id,
//         author: body.author,
//         quote:  body.quote
//       } 
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: "Unknown error."});
//   }
// })
// module.exports = elasticRouter


// module.exports = routes;