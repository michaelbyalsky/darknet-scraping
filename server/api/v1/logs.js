const logsRouter = require("express").Router();
const { Log } = require("../../models")

logsRouter.post("/", async (req, res) => {
    try {
     const new_paste = await Log.create(req.body)
     return res.json({ created: "True" });
    } catch (err) {
      return res.status(400).json({
        error: "error occured",
      });
    }
  });

  logsRouter.patch("/", async (req, res) => {
    try {
     const new_paste = await Log.findOneAndUpdate({_id : req.body._id}, {hide: true})
     return res.json({ created: "True" });
    } catch (err) {
      return res.status(400).json({
        error: "error occured",
      });
    }
  });
  

logsRouter.get("/faild", async (req, res) => {
  try {
    const result = await Log.find({ status: "faild", hide: null });
    res.json(result);
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

logsRouter.get("/success", async (req, res) => {
    try {
      const result = await Log.find({ hide: null, status: "success", new_pastes: { $gt: 0 } });
      res.json(result);
    } catch (err) {
      res.status(400).json({
        error: "error occured",
      });
      console.log(error);
    }
  });


logsRouter.get("/", async (req, res) => {
  try {
    const result = await Log.find({});
    return res.json(result);
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

logsRouter.get("/last-status", async (req, res) => {
  try {
    const result = (await Log.find({}).sort({_id: -1}).limit(1))[0];
    return res.json(result);
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});


module.exports = logsRouter;
