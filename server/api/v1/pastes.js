const pastesRouter = require("express").Router();
const { Paste, Keyword, NewPaste } = require("../../models");

pastesRouter.post("/try", async (req, res) => {
  try {
    const new_paste = await Paste.insertMany(req.body);
    return res.json({ created: "True" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: err,
    });
  }
});

pastesRouter.post("/", async (req, res) => {
  try {
    const { Author, Title, Content, Date, Lables } = req.body;
    const found = await Paste.count({
      Author: Author,
      Title: Title,
      Content: Content,
      Date: Date,
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

pastesRouter.patch("/keyword", async (req, res) => {
  try {
    console.log(req);
    await Keyword.deleteOne({name: req.body.name});
    res.json({ remove: "True" });
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

pastesRouter.get("/by-day", async (req, res) => {
  try {
    const response = await Paste.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$Date",
            },
          },
          sum: { $sum: 1 },
        },
      },
      {
        $project: {
          date: "$_id",
          sum: 1,
          _id: 0,
        },
      },
    ]);
    return res.json(response);
  } catch (err) {
    return res.json({ error: "error occured" });
  }
});

pastesRouter.get("/name", async (req, res) => {
  try {
    const response = await Paste.aggregate([
      {
        $group: {
          _id: "$Author",
          sum: { $sum: 1 },
        },
      },
      {
        $project: {
          Author: "$_id",
          sum: 1,
          _id: 0,
        },
      },
    ]);
    return res.json(response);
  } catch (err) {
    return res.json({ error: "error occured" });
  }
});

pastesRouter.get("/", async (req, res) => {
  try {
    const pastes = await Paste.find({}).sort([["Date", -1]]);;
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
      $or: [
        { Content: { $regex: req.query.search, $options: "i" } },
        { Title: { $regex: req.query.search, $options: "i" } },
        { Author: { $regex: req.query.search, $options: "i" } },
      ],
    }).sort([["Date", -1]]);
    res.send(pastes);
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

pastesRouter.get("/ner", async (req, res) => {
  try {
    const pastes = await Paste.find({
      Lables: { $exists: true, $not: { $size: 0 } },
    });

    const lablesArray = pastes
      .map((paste) => {
        return paste.Lables;
      })
      .flat(3);
    const array = lablesArray
      .map((label) => {
        return Object.keys(label);
      })
      .flat();

    const countBy = array.reduce((counted, label) => {
      counted[label] = (counted[label] || 0) + 1;
      return counted;
    }, {});
    const objArray = Object.entries(countBy);

    const maped = objArray.map((obj) => {
      return { label: obj[0], sum: obj[1] };
    });
    res.send(maped);
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

const find = async (value, word) => {
  let pastes = await Paste.find({
    $or: [
      { hide: null, Content: { $regex: value, $options: "i" } },
      { hide: null, Title: { $regex: value, $options: "i" } },
    ],
  });
  const maped = Array.from(pastes).map((paste) => {
    return {
      _id: paste._id,
      Author: paste.Author,
      Title: paste.Title,
      Content: paste.Content,
      Date: paste.Date,
      exact: false,
    };
  });
  maped.forEach((paste) => {
    paste.exact = "partial";
    const splitedContent = paste.Content.split(" ");
    const splitedTitle = paste.Title.split(" ");
    const splited = splitedContent.concat(splitedTitle);
    splited.forEach((word1) => {
      if (word1.toLowerCase() === value.toLowerCase()) {
        paste.exact = "exact";
      }
    });
  });
  return [maped, { keyword: word }];
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
    const filtered = promises.filter((promise) => promise != undefined);
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
