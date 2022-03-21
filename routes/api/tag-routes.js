const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagGet = await Tag.findAll();
    res.status(200).json(tagGet);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagGet = await Tag.findByPk(req.params.id, {
    });
    if (!tagGet) {
      res.status(400).json({ message: "Tag Not Found" });
      return;
    }
    res.status(200).json(tagGet);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagPost = await Tag.create(req.body);
    res.status(200).json(tagPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagPut = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagPut) {
      res.status(400).json({ message: "Category Not Found" });
      return;
    }
    res.status(200).json(tagPut);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagDelete) {
      res.status(404).json({ message: "Tag Not Found" });
      return;
    }

    res.status(200).json(tagDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
