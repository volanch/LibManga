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
            type: String
        },
        genres: [{type: String}],
        status: {type: String, default: 'Publishing'},
        author: {type: String},
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        published: {type: Date}
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Manga', mangaSchema);
