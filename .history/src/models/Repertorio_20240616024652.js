const mongoose = require('mongoose');

const { Schema } = mongoose;

const repertorioSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
    },
    genero: {
        type: String,
    },
    private: {
        type: Boolean,
        required: true,
    },
    criadoPor: {
        type: String,
        required: true,
    },
    curtidas: {
        type: Number,
        required: true,
    },
    musicas: [{
        type: Schema.Types.ObjectId,
        ref: 'musica',
        required: true,
    }],
}, { timestamps: true });

const Repertorio = mongoose.model('Repertorio', repertorioSchema);

module.exports = {
    Repertorio,
    repertorioSchema,
};
