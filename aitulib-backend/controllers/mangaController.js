const Manga = require("../models/mangaModel");
const User = require('../models/userModel')
const emailService = require('../services/emailService')

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
exports.subscribeToMangaUpdates = async (req, res) => {
    try {
        const manga = await Manga.findById(req.params.id)
        if (!manga) return res.status(404).json({ message: "Manga not found" })

        const user = await User.findById(req.userId).select('email username role')
        if (!user) return res.status(404).json({ message: "User not found" })

        try {
            await emailService.sendPremiumSubscriptionEmail({
                to: user.email,
                username: user.username,
                mangaTitle: manga.title,
            })
        } catch (e) {
            console.warn('Subscription email failed:', e.message)
        }

        res.json({ message: 'Subscribed (email sent if SMTP configured)' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
