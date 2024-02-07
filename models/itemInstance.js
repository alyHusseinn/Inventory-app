const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemInstanceSchema = new Schema({
  item: [{ Type: Schema.Types.ObjectId, ref: "Item", required: true }],
  in_stock: {
    type: Boolean,
    required: true
  }
});

itemInstanceSchema.virtual("url").get(function() {
    return `/catalog/iteminstance/${this._id}`;
})

module.exports = mongoose.model("ItemInstance", itemInstanceSchema);


