const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
  },
  descreption: {
    type: String,
  },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  price: {
    type: Number,
  },
});

itemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});

itemSchema.virtual("number_in_stock").get(async function () {
  return await mongoose
    .model("ItemInestance")
    .countDocuments({ item: this._id, in_stock: true });
});

module.exports = mongoose.model("Item", itemSchema);
