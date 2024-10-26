const { Book } = require('../models');
const { HttpError } = require('../helpers');

const getAllBooks = async (_, res) => {
	const books = await Book.find({});

	res.json(books);
};

const getBook = async (req, res) => {
	const { id } = req.params;

	// const book = await Book.findOne({_id: id})
	const book = await Book.findById(id);
	if (!book) {
		throw HttpError(404, 'Not found');
	}

	res.json(book);
};

const addBook = async (req, res) => {
	const newBook = await Book.create(req.body);

	res.status(201).json(newBook);
};

const updateBook = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	if (Object.keys(data).length === 0)
		res.status(400).json({ message: 'Request body must have at least one field' });

	const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true });
	if (!updatedBook) {
		throw HttpError(404, 'Not found');
	}

	res.json(updatedBook);
};

const removeBook = async (req, res) => {
	const { id } = req.params;

	const book = await Book.findByIdAndDelete(id);
	if (!book) {
		throw HttpError(404, 'Not found');
	}

	res.json({
		message: 'Deletion successful',
	});
};

const updateFavorite = async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true });
	if (!updatedBook) {
		throw HttpError(404, 'Not found');
	}

	res.json(updatedBook);
};

module.exports = {
	getAllBooks,
	getBook,
	addBook,
	updateBook,
	removeBook,
	updateFavorite,
};
