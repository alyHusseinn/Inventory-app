const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.redirect('/catalog');
});

module.exports = router;