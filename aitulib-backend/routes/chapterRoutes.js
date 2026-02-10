const express = require('express')
const router = express.Router()
const chapterController = require('../controllers/chapterController')
const { verifyToken, allowRoles } = require('../middlewares/authJwt')

router.get('/', chapterController.getAllChapters)
router.get('/:id', chapterController.getChapterById)

router.post('/', verifyToken, allowRoles('moderator'), chapterController.createChapter)
router.put('/:id', verifyToken, allowRoles('moderator'), chapterController.updateChapter)
router.delete('/:id', verifyToken, allowRoles('admin'), chapterController.deleteChapter)

module.exports = router
