const Category = require('../models/CategoryModel');
const asyncHandler = require('express-async-handler')

// @desc Add new category
// @route POST /api/category
// @access Private (Only Admin)

const setCategory = asyncHandler(async (req, res) => {

  // check if field not empty
  if (!req.body.name) {
    res.status(400)
    throw new Error('Please add category')
  }
  // check if category exists
  const categoryExists = await Category.findOne({ name: req.body.name.toLowerCase() })
  if (categoryExists) {
    res.status(400)
    throw new Error('Category already exists')
  }

  // Create category
  const category = await Category.create({ name: req.body.name.toLowerCase() })
  if (category) { res.status(201).send(category) }
  else {
    res.status(400)
    throw new Error('Invalid category data')
  }
})

// @desc Get all catedories
// @route GET /api/category
// @access PUBLIC

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
})

// @desc DELETE users category
// @route DELETE /api/category/:id
// @access PRIVATE

const deleteCategory = asyncHandler( async (req, res) => {

  const category = await Category.findById(req.params.id);

  if(!category){
      res.status(400);
      throw new Error("Category not found");
  }

 //check for user
  if(!req.user){
      res.status(401);
      throw new Error("User not found");
  }

  await category.deleteOne();

  res.status(200).json({id : req.params.id});
});

module.exports = {
  setCategory,
  getAllCategories,
  deleteCategory
}