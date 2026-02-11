const path = require('path');
const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaController');
const { verifyToken, allowRoles, isPremium } = require('../middlewares/authJwt');

router.get('/', mangaController.getAllManga)
router.get('/:id', mangaController.getMangaById)

router.post('/', [verifyToken, allowRoles('moderator')], mangaController.createManga);
router.put('/:id', [verifyToken, allowRoles('moderator')], mangaController.updateManga);

router.delete('/:id', [verifyToken, allowRoles('admin')], mangaController.deleteManga);

router.post('/:id/subscribe', [verifyToken, isPremium], mangaController.subscribeToMangaUpdates);


module.exports = router;