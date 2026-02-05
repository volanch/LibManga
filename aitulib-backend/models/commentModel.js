const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        mangaId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Manga',
            default: null
        },
        chapterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chapter',
            default: null
        },
        text: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Comment', commentSchema);
