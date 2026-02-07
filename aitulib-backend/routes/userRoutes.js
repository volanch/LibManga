const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id/change-password', userController.changePassword);
router.patch('/:id/role', userController.updateRole);
router.delete('/:id', userController.deleteUser);

module.exports = router;