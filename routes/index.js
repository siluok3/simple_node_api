const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book-controller');
const notFoundController = require('../controllers/not-found-controller');

router.get('/books', bookController.all);
router.post('/books', bookController.create);
router.get('/book/:id', bookController.get);
router.put('/book/:id', bookController.update);
router.delete('/book/:id', bookController.destroy);

router.get('*', notFoundController.show);

module.exports = router;
