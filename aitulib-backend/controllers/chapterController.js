const Chapter = require('../models/chapterModel');

exports.getAllChapters = async (req, res) => {
    try {
        const { mangaId } = req.query;
        if (!mangaId) {
            return res.status(400).json({ message: 'mangaId обязателен' });
        }

        const chapters = await Chapter.find({ mangaId })
            .select('chapterNumber title createdAt')
            .sort({ chapterNumber: 1 });

        res.json(chapters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getChapterById = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id)
            .populate({
                path: 'comments',
                populate: { path: 'userId', select: 'username' }
            });

        if (!chapter) return res.status(404).json({ message: 'Глава не найдена' });
        res.json(chapter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createChapter = async (req, res) => {
    const chapter = new Chapter({
        mangaId: req.body.mangaId,
        chapterNumber: req.body.chapterNumber,
        title: req.body.title,
        pages: req.body.pages
    });

    try {
        const newChapter = await chapter.save();
        res.status(201).json(newChapter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateChapter = async (req, res) => {
    try {
        const updatedChapter = await Chapter.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedChapter) return res.status(404).json({ message: 'Chapter Not Found' });
        res.json(updatedChapter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteChapter = async (req, res) => {
    try {
        const chapter = await Chapter.findByIdAndDelete(req.params.id);
        if (!chapter) return res.status(404).json({ message: 'Chapter Not Found' });
        res.json({ message: 'Chapter Not Found' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};