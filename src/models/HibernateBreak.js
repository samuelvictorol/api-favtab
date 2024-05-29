const mongoose = require('mongoose')

const { Schema } = mongoose

const hibernateBreakSchema = new Schema({
    initializerOptions: {
        type: String,
        maxlength: 1000,
    },
    },
    { timestamps: true }
)

const HibernateBreak = mongoose.model('HibernateBreak', hibernateBreakSchema)

module.exports = {
    HibernateBreak,
    hibernateBreakSchema,
}