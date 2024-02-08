const router = require('express').Router();
const songController = require('../controllers/songController');
const genreController = require('../controllers/genreController');
const artistController = require('../controllers/artistController');
const userController = require('../controllers/userController');

// the index page
router.get('/', songController.index);

// song routes
router.get('/songs', songController.songs_list);
router.get('/song/:id', songController.song_details);

router.get('/song/:id/create', songController.song_create_get);
router.post('/song/:id/create', songController.song_create_post);

router.get('/song/:id/update', songController.song_update_get);
router.post('/song/:id/update', songController.song_update_post);

router.get('/song/:id/delete', songController.song_delete_get);
router.post('/song/:id/delete', songController.song_delete_post);

// genre routes
router.get("/genres", genreController.genres_list);
router.get('/genre/:id', genreController.genre_details);

router.get('/genre/:id/create', genreController.genre_create_get);
router.post('/genre/:id/create', genreController.genre_create_post);

router.get('/genre/:id/update', genreController.genre_update_get);
router.post('/genre/:id/update', genreController.genre_update_post);

router.get('/genre/:id/delete', genreController.genre_delete_get);
router.post('/genre/:id/delete', genreController.genre_delete_post);

// artist routes
router.get('/artists', artistController.artists_list);
router.get('/artist/:id', artistController.artist_details);

router.get('/artist/:id/create', artistController.artist_create_get);
router.post('/artist/:id/create', artistController.artist_create_post);

router.get('/artist/:id/update', artistController.artist_update_get);
router.post('/artist/:id/update', artistController.artist_update_post);

router.get('/artist/:id/delete', artistController.artist_delete_get);
router.post('/artist/:id/delete', artistController.artist_delete_post);

// user routes
router.get('/users', userController.users_list);
router.get('/user/:id', userController.user_details);

router.get('/user/:id/create', userController.user_create_get);
router.post('/user/:id/create', userController.user_create_post);

router.get('/user/:id/update', userController.user_update_get);
router.post('/user/:id/update', userController.user_update_post);

router.get('/user/:id/delete', userController.user_delete_get);
router.post('/user/:id/delete', userController.user_delete_post);

module.exports = router;