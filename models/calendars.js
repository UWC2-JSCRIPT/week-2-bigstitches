const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date }
})


module.exports = mongoose.model("calendars", calendarSchema);