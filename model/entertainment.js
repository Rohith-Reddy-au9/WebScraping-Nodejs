

const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema(
    {
        title: String,
        titleurl: String,
        entertainmentimgurl: String,
        entertainmentnewscontent: String
    }
)

module.exports = mongoose.model("Entertainment", newsSchema)