const mongoose = require('mongoose');

const { Schema } = mongoose;

const linksMusicaSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const LinksMusica = mongoose.model('LinksMusica', linksMusicaSchema);

module.exports = {
    LinksMusica,
    linksMusicaSchema,
};
