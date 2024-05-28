const mongoose = require('mongoose');
const { linksMusicaSchema } = require('./LinksMusica');

const { Schema } = mongoose;

const musicaSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    link_audio: {
        type: String,
    },
    genero: {
        type: String,
    },
    criadoPor: {
        type: String,
        required: true,
    },
    links_musica: {
        type: [linksMusicaSchema],  // Use linksMusicaSchema aqui
    },
}, { timestamps: true });

const Musica = mongoose.model('Musica', musicaSchema);

module.exports = {
    Musica,
    musicaSchema,
};
