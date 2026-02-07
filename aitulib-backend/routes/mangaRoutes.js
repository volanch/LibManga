const path = require("path");
const express = require("express");
const router = express.Router();
const mangaController = require("../controllers/mangaController");

router.get("/api/manga", mangaController.getAllManga);
router.get("/api/manga/:id", mangaController.getMangaById);
router.post("/api/manga", mangaController.createManga);
router.put("/api/manga/:id", mangaController.updateManga);
router.delete("/api/manga/:id", mangaController.deleteManga);

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
});

module.exports = router;