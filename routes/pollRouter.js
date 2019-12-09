const pollRouter = require('express').Router();
const Poll = require('./../models/Poll');

// GET ALL POLLS
pollRouter.get('/', async (req, res) => {
  try {
    const result = await Poll.find({});
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

// GET POLL BY ID
pollRouter.get('/:id', async (req, res) => {
  try {
    const result = await Poll.findById(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

// CREATE POLL
pollRouter.post('/create', async (req, res) => {
  try {
    const formattedQuestions = req.body.questions.map((question) => {
      const formattedOptions = question.options.map((option) => {
        return {
          option,
          votes: []
        }
      })
      return {
        ...question,
        options: formattedOptions
      }
    })
    
    const data = {
      ...req.body,
      questions: formattedQuestions
    };

    const doc = new Poll(data);
    const result = await doc.save();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

/* CLIENT CREATE REQUEST */
pollRouter.post('/client', async (req, res) => {
  try {
    const generatedData = {
      isReviewed: false,
    };
    const mergedData = { ...req.body, ...generatedData };
    const doc = new Poll(mergedData);
    const result = await doc.save();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

/* INCREMENT PV */
pollRouter.post('/:id/viewed', async (req, res) => {
  try {
    const doc = await Poll.findById(req.params.id);
    const newPv = [...doc.pv];
    newPv.push(Date.now());
    doc.set('pv', newPv);
    const r = await doc.save();
    res.send(r);
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = pollRouter;
