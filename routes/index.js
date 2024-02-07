const router = require('express').Router();

router.get('/', (res,req) => {
    res.redirect('/catalog');
});

module.exports = router;