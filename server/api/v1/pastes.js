const pastesRouter = require("express").Router();
const { Paste, Keyword } = require("../../models");

pastesRouter.post("/", async (req, res) => {
  try {
    const { Author, Title, Content, Date, Lables } = req.body;
    const found = await Paste.count({
      Author: Author,
      Title: Title,
      Content: Content,
      Date: Date
    });
    if (found !== 0) {
      return res.json({ created: "False" });
    }
    const new_paste = await Paste.create(req.body);
    return res.json({ created: "True" });
  } catch (err) {
    return res.status(400).json({
      error: "error occured",
    });
  }
});

pastesRouter.post("/keyword", async (req, res) => {
  try {
    await Keyword.create(req.body);
    res.json({ created: "True" });
  } catch (err) {
    res.json({ error: "error occured" });
    console.log(err);
  }
});

pastesRouter.get("/keyword", async (req, res) => {
  try {
    const response = await Keyword.find({});
    return res.json(response);
  } catch (err) {
    return res.json({ error: "error occured" });
  }
});

pastesRouter.get("/", async (req, res) => {
  try {
    const pastes = await Paste.find({});
    res.send(pastes);
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

pastesRouter.get("/search", async (req, res) => {
  try {
    const pastes = await Paste.find({
      Content: { $regex: req.query.search, $options: "i" },
    });
    res.send(pastes);
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

const find = async (value, word) => {
  let pastes = await Paste.find({
    hide: null,
    Content: { $regex: value, $options: "i" },
  });
  return [pastes, {keyword: word}];
};

pastesRouter.post("/lable1", async (req, res) => {
  try {
    const keywords = req.body;
    const promises = keywords.map((keyword) => {
      if (keyword.value === "All") {
        return;
      } else {
        return find(keyword.value, keyword.value);
      }
    });
    const filtered = promises.filter((promise => promise != undefined)) 
    const arr = [];
    Promise.all(filtered).then((values) => {
      return res.json(values);
    });
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

pastesRouter.patch("/", async (req, res) => {
  try {
    const new_paste = await Paste.findOneAndUpdate(
      { _id: req.body._id },
      { hide: true }
    );
    return res.json({ created: "True" });
  } catch (err) {
    console.log(error);
    return res.status(400).json({
      error: "error occured",
    });
  }
});

module.exports = pastesRouter;
