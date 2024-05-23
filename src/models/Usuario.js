const mongoose = require('mongoose')

const { Schema } = mongoose

const usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    senha:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
    },
    private:{
        type: Boolean,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    user_image:{
        type: String,
        required: false
    },
    logado:{
        type: Boolean,
        required: true,
    },
    },
    { timestamps: true }

)
usuarioSchema.index({ login: 1 }, { unique: true });
usuarioSchema.index({ email: 1 }, { unique: true });

const Usuario = mongoose.model('Usuario', usuarioSchema)

Usuario.createIndexes();
module.exports = {
    Usuario,
    usuarioSchema,
}