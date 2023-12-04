const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
  hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, minlength: 3 },
  createdAt: { type: Date, default: Date.now() },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
