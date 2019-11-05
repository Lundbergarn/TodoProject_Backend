const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
router.get('/', async (req, res) => {
  try {
    const todos = await Item.find()
    res.send(todos);
  } catch (e) {
    res.status(500).send()
  }
});


// @route   POST api/items
router.post('/', async (req, res) => {
  const newItem = new Item({
    text: req.body.text,
    list: req.body.list,
    checked: req.body.checked
  });

  try {
    await newItem.save();
    res.status(201).send(newItem);

  } catch (e) {
    res.status(400).send(e);
  }
});


// @route   PATCH api/items/:id
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['text', 'checked']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const item = await Item.findOne({ _id: req.params.id })

    if (!item) {
      return res.status(404).send()
    }

    updates.forEach((update) => item[update] = req.body[update])
    await item.save()
    res.send(item)
  } catch (e) {
    res.status(400).send(e)
  }
})


// @route   DELETE api/items/:id
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ _id: req.params.id })

    if (!item) {
      res.status(404).send()
    }

    res.send({ message: 'Item removed' })
    // res.send(item)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router;
