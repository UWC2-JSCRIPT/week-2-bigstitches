const Events = require('../models/events');

module.exports = {};
  
module.exports.create = async (name) => {
  return await EventCounts.create({ name });
};

module.exports.getById = async (id) => {
  try {
    const event = await Events.findOne({ _id: id }).lean();
    return event;
  } catch (e) {
    return null;
  }
};

module.exports.updateById = async (id, newData) => {
  try {
    const calendar = await Events.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
    return event;
  } catch (e) {
    return null;
  }
};