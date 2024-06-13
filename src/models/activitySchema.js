const { Schema, model } = require("mongoose");

const activitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const activityModel = model("Activity", activitySchema);

module.exports = activityModel;
