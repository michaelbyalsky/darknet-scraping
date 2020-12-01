const logsRouter = require("express").Router();
const { MongoClient } = require("mongodb");
CONNECTION_STRING = "mongodb://mongo:27017/paste";
const client = new MongoClient(CONNECTION_STRING);

class Log {
  constructor(status, new_pastes, date) {
    this.status = status;
    this.new_pastes = new_pastes;
    this.date = date;
  }

  create_obj() {
    return {
      status: this.status,
      new_pastes: this.new_pastes,
      date: this.date,
    };
  }
}

logsRouter.post("/", async (req, res) => {
  try {
    const {status, new_pastes, date} = req.body;
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a Paste",
      });
    }
    await client.connect();
    log = new Log(status, new_pastes, date);
    logObg = log.create_obj();
    console.log(logObg);
    client.db("db").collection("logs").insertOne(logObg, async (err, result) => {
        if(err){
            res.json(err)
        }
        client.close()
        return res.json({created: "true"});
    });
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

logsRouter.get("/faild", async (req, res) => {
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
    const result = await client.db("db").collection("logs").find({ status: "faild" });
    const all = await result.toArray();
    client.close()
    res.json(all);
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

logsRouter.get("/success", async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a Paste",
      });
    }
    await client.connect();
    const result = client
      .db("db")
      .collection("logs")
      .find({ status: "success" });
    const all = await result.toArray();
    res.json(all);
    client.close()
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

logsRouter.get("/all", async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a Paste",
      });
    }
    await client.connect();
    const result = client.db("db").collection("logs").find({});
    const all = await result.toArray();
    res.json(all);
    client.close()
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

module.exports = logsRouter;
