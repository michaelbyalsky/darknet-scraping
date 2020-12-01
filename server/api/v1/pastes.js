const pastesRouter = require("express").Router();
const { MongoClient } = require("mongodb");
CONNECTION_STRING = "mongodb://mongo:27017/paste";
const client = new MongoClient(CONNECTION_STRING);

class Paste {
  constructor(Author, Title, Content, Date, Lables) {
    this.Author = Author;
    this.Title = Title;
    this.Content = Content;
    this.Date = Date;
    this.Lables = Lables;
  }
  create_obj() {
    return {
      Author: this.Author,
      Title: this.Title,
      Content: this.Content,
      Date: this.Date,
      Lables: this.Lables,
    };
  }
}

pastesRouter.get("/", async (req, res) => {
  try {
    await client.connect();
    const result = client
      .db("db")
      .collection("new_pastes")
      .find({}, async (err, result) => {
        if (err) {
          return res.json(err);
        }
        const res1 = await result.toArray();
        return res.json(res1);
      });
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

pastesRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const { Author, Title, Content, Date, Lables } = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a Paste",
      });
    }

    paste = new Paste(Author, Title, Content, Date, Lables);
    pasteObj = paste.create_obj();
    console.log(pasteObj);
    await client.connect();
    const result = await client
      .db("db")
      .collection("new_pastes")
      .find({
        Author: pasteObj.Author,
        Title: pasteObj.Title,
        Content: pasteObj.Content,
        Date: pasteObj.Date
      }).toArray();
    if (result.length !==0) {
      return res.json({created: "Flase"})
    }
    client
      .db("db")
      .collection("new_pastes")
      .insertOne(pasteObj, async (err, result) => {
        console.log("result");
        if (err) {
          res.json(err);
        }
        return res.json({ created: "True" });
      });
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
    const result = client
      .db("db")
      .collection("paste")
      .find({ Content: { $regex: req.query.search, $options: "i" } }, {});
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
