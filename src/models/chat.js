const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  _id: new mongoose.Schema.Types.ObjectId(),
  user: new mongoose.Schema.Types.ObjectId(),
  messages: [
    {
      _id: new mongoose.Schema.Types.ObjectId(),
      message: { type: String, required: true },
      message_by: new mongoose.Schema.Types.ObjectId()
    }
  ]
});

module.exports = mongoose.model("Chat", chatSchema);
