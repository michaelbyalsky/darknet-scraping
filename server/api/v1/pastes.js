const pastesRouter = require("express").Router();
const { MongoClient } = require("mongodb")
CONNECTION_STRING = "mongodb://mongo:27017/paste";
const client = new MongoClient(CONNECTION_STRING);

pastesRouter.get("/", async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a Paste",
      });
    }
    await client.connect();
    const result = client.db("db").collection("paste").find({});
    const all = await result.toArray();
    res.json(all);
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});


pastesRouter.get("/search", async (req, res) => {
    try {
      const body = req.body;
      if (!body) {
        return res.status(400).json({
          success: false,
          error: "You must provide a Paste",
        });
      }
      await client.connect();
      console.log(req.query.search);
      const result = client.db("db").collection("paste").find({Content: { '$regex': req.query.search , '$options': 'i' }}, {});
      const all = await result.toArray();
      res.json(all);
    } catch (err) {
      res.status(400).json({
        error: "error occured",
      });
      console.log(error);
    }
  });

// pastesRouter.post("/", async (req, res) => {
//   try {
//     const body = req.body;
//     if (!body) {
//       return res.status(400).json({
//         success: false,
//         error: "You must provide a Paste",
//       });
//     }
//     console.log(body);
//     const paste = await new Paste(body);
//     const saved = await paste.save();
//     res.json(saved);
//   } catch (err) {
//     res.status(400).json({
//       error: "error occured on creating user",
//     });
//     console.log(error);
//   }
// });

module.exports = pastesRouter;
