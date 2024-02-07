const router = require('express').Router();
const itemController = require('./controllers/itemController');
const categoryController = require('./controllers/categoryController');
const itemInstanceController = require('./controllers/itemInstanceController');

// the index page
router.get('/', itemController.index);

// item routes
router.get('/items', itemInstanceController.items_list);
router.get('/item/:id', itemInstanceController.item_details);

router.get('/item/:id/create', itemInstanceController.item_create_get);
router.post('/item/:id/create', itemInstanceController.item_create_post);

router.get('/item/:id/update', itemInstanceController.item_update_get);
router.post('/item/:id/update', itemInstanceController.item_update_post);

router.get('/item/:id/delete', itemInstanceController.item_delete_get);
router.post('/item/:id/delete', itemInstanceController.item_delete_post);

// category routes
router.get("/categories", categoryController.categories_list);
router.get('/category/:id', categoryController.category_details);

router.get('/category/:id/create', categoryController.category_create_get);
router.post('/category/:id/create', categoryController.category_create_post);

router.get('/category/:id/update', categoryController.category_update_get);
router.post('/category/:id/update', categoryController.category_update_post);

router.get('/category/:id/delete', categoryController.category_delete_get);
router.post('/category/:id/delete', categoryController.cattegory_delete_post);

// itemInstance routes
router.get('/itemInstances', itemInstanceController.itemInstances_list);
router.get('/itemInstance/:id', itemInstanceController.itemInstance_details);

router.get('/itemInstance/:id/create', itemInstanceController.itemInstance_create_get);
router.post('/itemInstance/:id/create', itemInstanceController.itemInstance_create_post);

router.get('/itemInstance/:id/update', itemInstanceController.itemInstance_update_get);
router.post('/itemInstance/:id/update', itemInstanceController.itemInstance_update_post);

router.get('/itemInstance/:id/delete', itemInstanceController.itemIncstance_delete_get);
router.post('/itemInstance/:id/delete', itemInstanceController.itemIncstance_delete_post);

module.exports = router;