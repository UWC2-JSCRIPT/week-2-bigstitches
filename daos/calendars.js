const Calendars = require('../models/calendars');

module.exports = {};

// for events
/*
module.exports.find = async (unique) => {
  // console.log(`still an object: ${unique.$_id}`);
  const calendar = await Calendars.findOne({unique}).lean();
  return calendar;
}
*/

// for GET, no id
module.exports.getAll = () => {
  return Calendars.find();
}

// for POST with name
module.exports.create = async (name) => {
  return await Calendars.create(name);
};

// for GET with ID
module.exports.getById = async (id) => {
  try {
    const calendar = await Calendars.findOne({ _id: id }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

// for PUT
module.exports.update = async (id, newData) => {
  try {
    const calendar = await Calendars.findOneAndUpdate({ _id: id }, newData, { new: true });
    return calendar;
  } catch (e) {
    return null;
  }
};

// for DELETE
module.exports.remove = async (id) => {
  try {
    const calendar = await Calendars.deleteOne({ _id: id });
    // returns the deleted doc
    return calendar;
  } catch (e) {
    return null;
  }
};