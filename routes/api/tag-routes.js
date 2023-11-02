const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagsAll = await Tag.findAll({
      include: [{ model: Product }]
    });

    if (!tagsAll) {
      res.status(200).json({ message: 'Could not find tags'});
      return;
    }

    res.json(tagsAll);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagID = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!tagID) {
      res.status(200).json({ message: 'Could not find that tag'});
      return;
    };

    res.status(200).json(tagID);

  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tagName
    });

    res.status(200).json(newTag);
    console.log('New tag created!');

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update({
      tag_name: req.body.tagName
    },
    {
      where: {
        id: req.params.id
      }
    });

    const tagID = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!tagID) {
      res.status(200).json({ message: 'Tag not found' });
      return;
    };

    res.status(200).json(updateTag);
    console.log('Tag is updated!');

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
