const router = require('express').Router();
const {
  add,
  get_all_categories,
  get_category_by_id,
  edit_category_by_id,
  delete_category_by_id,
  search_category,
} = require('../controllers/categoryController');

router.post('/add', add);

router.get('/get-all-categories', get_all_categories);

router.post('/get-category-by-id', get_category_by_id);

router.post('/edit-category-by-id', edit_category_by_id);

router.post('/delete-category-by-id', delete_category_by_id);

router.post('/search-category', search_category);

module.exports = router;
