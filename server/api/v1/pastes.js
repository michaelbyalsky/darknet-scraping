const pastesRouter = require("express").Router();
const { Paste } = require("../../models/paste")

// pastesRouter.post("/mongo", async (req, res) => {
//   try {
//     const { Author, Title, Content, Date, Lables } = req.body;
  
//    const new_paste = await Paste.insertMany(req.body)
//    return res.json({ created: "True" });
//   } catch (err) {
//     console.log(error);
//     return res.status(400).json({
//       error: "error occured",
//     });
//   }
// });

pastesRouter.post("/", async (req, res) => {
  try {
    const { Author, Title, Content, Date, Lables } = req.body;
   const found = await Paste.count({
     Author : Author,
     Title: Title,
     Content: Content
   })
   if (found !==0) {
    return res.json({created: "Flase"})
  } 
   const new_paste = await Paste.create(req.body)
   return res.json({ created: "True" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "error occured",
    });
  }
});



pastesRouter.get("/", async (req, res) => {
  try {
   const pastes = await Paste.find({})
   res.send(pastes)
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});
 
pastesRouter.get("/search", async (req, res) => {
  try {
   const pastes = await Paste.find({Content: {$regex: req.query.search, $options: 'i'}})
   res.send(pastes)
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

pastesRouter.get("/lable1", async (req, res) => {
  try {
   const pastes = await Paste.find({hide: null, Content: {$regex: req.query.search, $options: 'i'}})
   res.send(pastes)
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

pastesRouter.get("/lable2", async (req, res) => {
  try {
   const pastes = await Paste.find({ hide: null, Content: {$regex: req.query.search, $options: 'i'}})
   res.send(pastes)
  } catch (err) {
    res.status(400).json({
      error: "error occured",
    });
    console.log(error);
  }
});

pastesRouter.patch("/", async (req, res) => {
  try {
  console.log(req.body);
   const new_paste = await Paste.findOneAndUpdate({_id : req.body._id}, {hide: true})
   return res.json({ created: "True" });
  } catch (err) {
    console.log(error);
    return res.status(400).json({
      error: "error occured",
    });
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
