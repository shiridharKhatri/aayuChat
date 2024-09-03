const mongoose = require("mongoose");
const moment = require("moment");
const messageSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDetails",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDetails",
  },
  message: {
    type: [
      {
        data: {
          type: [
            {
              content: String,
              reply: String,
              date: { type: Date, default: Date.now },
            },
          ],
        },
        sender: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  messageCreatedDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("messages", messageSchema);
