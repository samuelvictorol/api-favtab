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
    },
    { timestamps: true }

)

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = {
    Usuario,
    usuarioSchema,
}