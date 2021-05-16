const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema(
    {
        title: String,
        titleurl: String,
        sportnewscontent: String,
        sportimgurl: String
    }
)

module.exports = mongoose.model("Sport", newsSchema)