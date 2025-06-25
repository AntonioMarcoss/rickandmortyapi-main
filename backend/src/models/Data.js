const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    name: String,
    status: String,
    species: String
});

module.exports = mongoose.model('Data', DataSchema);