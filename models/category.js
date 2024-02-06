const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 5,
    },
    description: {
        type: String,
    }
});

categorySchema.virtual('url').get(function() {
    return `/catalog/category/${this_id}`;
});

module.exports = new mongoose.model('Item', categorySchema);