const Events = require('../models/events');

module.exports = {};

// for GET, no id
module.exports.getAll = () => {
  return Events.find();
}

// for POST with name
module.exports.create = async (name) => {
  return await Events.create(name);
};

// for GET with ID
module.exports.getById = async (id) => {
  try {
    const event = await Events.findOne({ _id: id }).lean();
    return event;
  } catch (e) {
    return null;
  }
};

// for PUT
module.exports.update = async (id, newData) => {
  try {
    const event = await Events.findOneAndUpdate({ _id: id }, newData, { new: true });
    return event;
  } catch (e) {
    return null;
  }
};

// for DELETE
module.exports.remove = async (id) => {
  try {
    const event = await Events.deleteOne({ _id: id });
    // returns the deleted doc
    return event;
  } catch (e) {
    return null;
  }
};