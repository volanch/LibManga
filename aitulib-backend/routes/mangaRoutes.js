
const path = require("path");
const express = require("express");
const router = express.Router();
const Manga = require("../models/mangaModel");





router.get("/api/manga", async (req, res) => {
    try{
        const mangas = await Manga.find();
        res.json(mangas);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get("/api/manga/:id", async (req, res) => {
    try{
        const manga = await Manga.findById(req.params.id);
        if (!manga) return res.status(404).json({ message: "Манга не найдена" });
        res.json(manga);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.put("/api/manga/:id", async (req, res) => {
    try{
        const updatedManga = await Manga.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedManga) return res.status(404).json({ message: "Манга не найдена" });

        res.json(updatedManga);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post("/api/manga", async (req, res) => {
    const manga = new Manga({
        title: req.body.title,
        description: req.body.description,
        cover: req.body.cover,
        genres: req.body.genres,
        status: req.body.status,
        author: req.body.author,
        comment: req.body.comment,
    })
})

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
})

module.exports = router;