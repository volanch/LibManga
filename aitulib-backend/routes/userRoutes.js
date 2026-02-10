const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { verifyToken, allowSelfOrRoles, allowRoles } = require('../middlewares/authJwt')

router.get('/', verifyToken, allowRoles('admin'), userController.getAllUsers)
router.post('/', verifyToken, allowRoles('admin'), userController.createUser)
router.patch('/:id/role', verifyToken, allowRoles('admin'), userController.updateRole)
router.delete('/:id', verifyToken, allowRoles('admin'), userController.deleteUser)

router.get('/:id', verifyToken, allowSelfOrRoles('id', 'moderator'), userController.getUserById)

router.put('/:id/change-password', verifyToken, allowSelfOrRoles('id', 'admin'), userController.changePassword)

module.exports = router
