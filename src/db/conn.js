const mongoose = require('mongoose')
require('dotenv').config();

async function main () {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(process.env.DB_CONNECTION)
            .then(() => {
                console.log('\n------------------------------\n\nBem Vindo Api-FavTab\n\n‎ ‎ ‎ ♪♫~~(＾▽＾)~~♫♪ \n\n'
                + `A conexão com Banco de Dados do FavTab foi estabelecida com Sucesso :D\n\nPorta: ${process.env.PORT}\n\n------------------------------\n`)
            })
            .catch((error) => {
                console.error('Erro na conexão com o banco FavTab: ' + error)
            })
    } catch (error) {
        console.error('Erro conn.js:\n' + error)
    }
}

module.exports = main