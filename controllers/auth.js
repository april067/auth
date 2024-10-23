const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_KEY } = process.env;

const { ctrlWrapper, HttpError } = require('../helpers');
const { User } = require('../models');
const saltRounds = 10;

const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, 'Email already in use');
	}

	const hashPassword = await bcrypt.hash(password, saltRounds);

	const newUser = await User.create({ ...req.body, password: hashPassword });

	res.status(201).json({
		user: {
			name: newUser.name,
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
};

const login = async (res, req) => {
	// const token = jwt.sign({ id: user.id }, SECRET_KEY);
	// console.log(token);
	// console.log(hashPassword);
	// console.log(await bcrypt.compare(password, hashPassword));
};

const logout = async (res, req) => {};

module.exports = {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	logout: ctrlWrapper(logout),
};
