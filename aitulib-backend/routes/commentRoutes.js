const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const { verifyToken } = require('../middlewares/authJwt')

router.get('/', commentController.getComments)

router.post('/', verifyToken, commentController.createComment)
router.patch('/:id', verifyToken, commentController.updateComment)

router.patch('/:id/like', commentController.likeComment)

router.delete('/:id', verifyToken, commentController.deleteComment)

module.exports = router
