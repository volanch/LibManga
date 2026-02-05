const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
        mangaId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Manga',
            required: true
        },
        chapterNumber: {
            type: Number,
            required: true
        },
        title: {
            type: String,
        },
        pages: [
            {
                type: String // url
            }
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Chapter', chapterSchema);
