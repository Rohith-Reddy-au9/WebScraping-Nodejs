const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema(
    {
        title: String,
        titleurl: String,
        worldnewscontent: String,
        worldimgurl: String,
    }
)

module.exports = mongoose.model("World", newsSchema)