const express = require('express');

const { booksControllers } = require('../../controllers');
const { booksSchema } = require('../../schemas');
const { validateBody, ctrlWrapper, isValidId } = require('../../helpers');

const router = express.Router();

router.get('/', ctrlWrapper(booksControllers.getAllBooks));
router.get('/:id', isValidId, ctrlWrapper(booksControllers.getBook));
router.post('/', validateBody(booksSchema.bookAdd), ctrlWrapper(booksControllers.addBook));
router.put(
	'/:id',
	isValidId,
	validateBody(booksSchema.bookUpdate),
	ctrlWrapper(booksControllers.updateBook)
);
router.delete('/:id', isValidId, ctrlWrapper(booksControllers.removeBook));
router.patch(
	'/:id/favorite',
	isValidId,
	validateBody(booksSchema.bookFavoriteBook),
	ctrlWrapper(booksControllers.updateFavorite)
);

module.exports = router;
