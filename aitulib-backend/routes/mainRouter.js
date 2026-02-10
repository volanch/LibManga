const path = require('path');
const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaController');
const { verifyToken, allowRoles, isPremium } = require('../middlewares/authJwt');


router.get('/view/:id', mangaController.getMangaPage)

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});


module.exports = router;