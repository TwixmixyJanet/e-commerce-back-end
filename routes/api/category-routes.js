const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // -> from model
  // somehow send it back to the user
  try {
    const categoriesAll = await Category.findAll({
      include: [{ model: Product }]
    });
    if (!categoriesAll) {
      res.status(200).json({ message: 'Could not find any categories'});
      return;
    };
    res.status(200).json(categoriesAll);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoriesID = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoriesID) {
      res.status(200).json({ message: 'Could not find that category'});
      return;
    };
    res.status(200).json(categoriesID);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    //   {
    //   category_name: req.body.categoryName
    // });

    res.status(200).json(newCategory);
    console.log('Added new category!');

  } catch (err) {
    res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  // taking in an id as a parameter and also receiving a req.body
  // sequelize update
  try {
    const updateCategory = await Category.update({
      category_name: req.body.categoryName
    },
    {
      where: {
        id: req.params.id
      }
    });

    const categoriesID = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoriesID) {
      res.status(200).json({ message: 'No categories found' });
      return;
    };

    res.status(200).json(updateCategory);
    console.log("Updated category!")
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  // DESTROY
  // destroying based off the req.params.id
  // res.json to let the server know it's gone
  try {
    const destroyCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!destroyCategory) {
      res.status(200).json({ message: 'No categories found' });
      return;
    };

    res.status(200).json(destroyCategory);
    console.log('This category has been destroyed!')
  } catch {
    res.status(500).json(err);
  };
});

module.exports = router;
