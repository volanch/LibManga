const Comment = require('../models/commentModel');

exports.getComments = async (req, res) => {
    try {
        const { mangaId, chapterId } = req.query;
        let filter = {};

        if (mangaId) filter.mangaId = mangaId;
        if (chapterId) filter.chapterId = chapterId;

        const comments = await Comment.find(filter)
            .populate('userId', 'username')
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createComment = async (req, res) => {
    const comment = new Comment({
        userId: req.body.userId,
        mangaId: req.body.mangaId || null,
        chapterId: req.body.chapterId || null,
        text: req.body.text
    });

    try {
        const newComment = await comment.save();
        await newComment.populate('userId', 'username');
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.likeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        comment.likes += 1;
        await comment.save();
        res.json({ likes: comment.likes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment Not Found' });
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};