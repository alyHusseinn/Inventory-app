const router = require('express').Router();
const songController = require('../controllers/songController');
const genreController = require('../controllers/genreController');
const artistController = require('../controllers/artistController');
// the index page
router.get('/', songController.index);

// song routes

router.get('/song/create', songController.song_create_get);
router.post('/song/create', songController.song_create_post);

router.get('/song/:id/update', songController.song_update_get);
router.post('/song/:id/update', songController.song_update_post);

router.get('/song/:id/delete', songController.song_delete_get);
router.post('/song/:id/delete', songController.song_delete_post);

router.get('/songs', songController.songs_list);
router.get('/song/:id', songController.song_details);

// genre routes

router.get('/genre/create', genreController.genre_create_get);
router.post('/genre/create', genreController.genre_create_post);

router.get('/genre/:id/update', genreController.genre_update_get);
router.post('/genre/:id/update', genreController.genre_update_post);

router.get('/genre/:id/delete', genreController.genre_delete_get);
router.post('/genre/:id/delete', genreController.genre_delete_post);

router.get("/genres", genreController.genres_list);
router.get('/genre/:id', genreController.genre_details);

// artist routes

router.get('/artist/create', artistController.artist_create_get);
router.post('/artist/create', artistController.artist_create_post);

router.get('/artist/:id/update', artistController.artist_update_get);
router.post('/artist/:id/update', artistController.artist_update_post);

router.get('/artist/:id/delete', artistController.artist_delete_get);
router.post('/artist/:id/delete', artistController.artist_delete_post);

router.get('/artists', artistController.artists_list);
router.get('/artist/:id', artistController.artist_details);

module.exports = router;