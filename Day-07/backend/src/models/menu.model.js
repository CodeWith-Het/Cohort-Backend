const mongoose = require("mongoose");

const menuManageSchema = new mongoose.Schema({
  item_name: String,
  price: Number,
  discount_Price: Number,
  image: String,
});

const menuManageModel = mongoose.model("menu_model", menuManageSchema);
module.exports = menuManageModel;
