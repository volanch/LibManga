const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        coverImage: {
            type: String // url
        },
        genres: [
            {
                type: String
            }
        ],
        status: {
            type: String,
            default: 'Ongoing'
        },
        author: {
            type: String
        },
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

module.exports = mongoose.model('Manga', mangaSchema);
