const mongoose = require('mongoose');
// const Calendars = require('../models/calendars');
/*
const calendarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date }
})

const eventSchema = new mongoose.Schema({
  name: { type: [calendarSchema]},
  date: { type: Date, required: true }
});
*/
// const calendarMongooseModel = mongoose.model("calendar", calendarSchema);
// const eventMongooseModel = mongoose.model("events", eventSchema);

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true},
  calendarId: { type: mongoose.Types.ObjectId },
  date: { type: Date },
});

module.exports = mongoose.model("events", eventSchema);
/*
module.exports = {
  Calendar: calendarMongooseModel,
  Event: eventMongooseModel
};
*/