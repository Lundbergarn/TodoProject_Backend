const express = require('express');
const router = express.Router();

// list Model
const List = require('../../models/List');

// @route   GET api/lists
router.get('/', async (req, res) => {
  try {
    const lists = await List.find()
    res.send(lists);
  } catch (e) {
    res.status(500).send()
  }
});

// @route   POST api/lists
router.post('/', async (req, res) => {
  const newList = new List({
    title: req.body.title
  });

  try {
    await newList.save();
    res.status(201).send(newList);

  } catch (e) {
    res.status(400).send(e);
  }
});

// @route   DELETE api/lists/:id
router.delete('/:id', async (req, res) => {
  try {
    const list = await List.findOneAndDelete({ _id: req.params.id });
    if (!list) {
      res.status(404).send()
    }
    res.send(list)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router;
