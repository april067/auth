const express = require('express');

const { contactsControllers } = require('../../controllers');
const { contactsSchema } = require('../../schemas');
const { validateBody, ctrlWrapper, isValidId } = require('../../helpers');

const router = express.Router();

router.get('/', ctrlWrapper(contactsControllers.getAllContacts));
router.get('/:id', isValidId, ctrlWrapper(contactsControllers.getContact));
router.post(
	'/',
	validateBody(contactsSchema.contactAdd),
	ctrlWrapper(contactsControllers.addContact)
);
router.put(
	'/:id',
	isValidId,
	validateBody(contactsSchema.contactUpdate),
	ctrlWrapper(contactsControllers.updateContact)
);
router.delete('/:id', isValidId, ctrlWrapper(contactsControllers.removeContact));

router.patch(
	'/:id/favorite',
	isValidId,
	validateBody(contactsSchema.contactFavorite),
	ctrlWrapper(contactsControllers.updateFavorite)
);

module.exports = router;
