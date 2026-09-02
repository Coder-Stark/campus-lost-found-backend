import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  type: {
    type: String,
    enum: ["Lost", "Found"],
    required: true,
  },

  location: {
    type: String,
    required: true,
    trim: true
  },

  contactMethod: {
    type: String,
    required: true,
    trim: true,
  },
  
  date: {
    type: Date,
  },

  description: {
    type: String,
    trim: true,
  },
}, {timestamps: true});

const Item = mongoose.model("Item", itemSchema);
export default Item;