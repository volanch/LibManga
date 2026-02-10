const path = require('path')
const express = require('express')
const router = express.Router()
const mangaController = require('../controllers/mangaController')
const { verifyToken, allowRoles, isPremium } = require('../middlewares/authJwt')

router.get('/api/manga', mangaController.getAllManga)
router.get('/api/manga/:id', mangaController.getMangaById)

router.post('/api/manga', verifyToken, allowRoles('moderator'), mangaController.createManga)
router.put('/api/manga/:id', verifyToken, allowRoles('moderator'), mangaController.updateManga)
router.delete('/api/manga/:id', verifyToken, allowRoles('admin'), mangaController.deleteManga)

router.post('/api/manga/:id/subscribe', verifyToken, isPremium, mangaController.subscribeToMangaUpdates)

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'))
})

module.exports = router
