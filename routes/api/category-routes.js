const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // -> from model
  // somehow send it back to the user
  // 
  try {
    const categoriesAll = await Category.findAll({
      include: [{ model: Product }]
    });

    if (!categoriesAll) {
      res.status(200).json({ message: 'No categories found'});
      return;
    };
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // specify by ID
  // get one category
  // some req.params.nonsense
  // send it back to the user
  try {
    const categoriesID = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoriesID) {
      res.status(200).json({ message: 'Could not find that category'});
      return;
    };
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new category
  // get the body and get the contents and insert into sequelize
  // category(DOT)create 
  // whatever we created we can return it back off the res.json
  try {
    const newCategory = await Category.create({
      category_name: req.body.categoryName
    });

    res.status(200).json(newCategory);
    console.log('Added new category!');

  } catch (err) {
    res.status(500).json(err);
  };
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // taking in an id as a parameter and also receiving a req.body
  // sequelize update

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  // DESTROY
  // destroying based off the req.params.id
  // res.json to let the server know it's gone
  
});

module.exports = router;
