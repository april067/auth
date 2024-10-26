const express = require('express');

const { authControllers } = require('../../controllers');
const { validateBody } = require('../../helpers');
const { usersSchema } = require('../../schemas');

const router = express.Router();

router.post('/register', validateBody(usersSchema.registerJoiSchema), authControllers.register);
router.post('/login', validateBody(usersSchema.loginJoiSchema), authControllers.login);

module.exports = router;
