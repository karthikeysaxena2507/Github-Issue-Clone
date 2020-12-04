const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    title: String,
    content: String,
    isopen: Boolean
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;