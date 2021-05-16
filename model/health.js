const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema(
    {
        title: String,
        titleurl: String,
        healthnewscontent: String,
        healthimgurl: String,
    }
)

module.exports = mongoose.model("Health", newsSchema)