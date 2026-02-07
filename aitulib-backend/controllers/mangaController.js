const Manga = require("../models/mangaModel");

exports.getAllManga = async (req, res) => {
    try {
        const mangas = await Manga.find();
        res.json(mangas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMangaById = async (req, res) => {
    try {
        const manga = await Manga.findById(req.params.id);
        if (!manga) return res.status(404).json({ message: "Manga not found" });
        res.json(manga);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createManga = async (req, res) => {
    const manga = new Manga({
        title: req.body.title,
        description: req.body.description,
        cover: req.body.cover,
        genres: req.body.genres,
        status: req.body.status,
        author: req.body.author,
        comment: req.body.comment,
    });

    try {
        const newManga = await manga.save();
        res.status(201).json(newManga);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateManga = async (req, res) => {
    try {
        const updatedManga = await Manga.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedManga) return res.status(404).json({ message: "Manga not found" });
        res.json(updatedManga);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteManga = async (req, res) => {
    try {
        const manga = await Manga.findByIdAndDelete(req.params.id);
        if (!manga) return res.status(404).json({ message: "Manga not found" });
        res.json({ message: "Manga deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};