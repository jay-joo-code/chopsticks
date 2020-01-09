const fileRouter = require('express').Router();
const File = require('./../models/File');

// CREATE File
fileRouter.post('/create', async (req, res) => {
  try {
    const doc = new File(req.body);
    const result = await doc.save();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// DELETE File by req.body filter
fileRouter.delete('/delete', async (req, res) => {
  try {
    const result = await File.findOneAndDelete(req.body);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = fileRouter;
