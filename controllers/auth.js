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

const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, 'Email or password is wrong');
	}
	const comparedPassword = await bcrypt.compare(password, user.password);
	if (!comparedPassword) {
		throw HttpError(401, 'Email or password is wrong');
	}

	const payload = { id: user._id };
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
	const userWithToken = await User.findOneAndUpdate({ email }, { token });

	// console.log(user._id);
	// console.log(user.id);

	// const test = await User.findOne({ id: user.id });//expect null
	// const test = await User.findOne({ _id: user.id });//expect Object
	// console.log(test);

	res.status(200).json({
		user: {
			name: userWithToken.name,
			email: userWithToken.email,
			subscription: userWithToken.subscription,
		},
		data: {
			token,
		},
	});
};

const logout = async (req, res) => {};

module.exports = {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	logout: ctrlWrapper(logout),
};
