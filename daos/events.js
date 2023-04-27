const Events = require('../models/events');
const CalendarDAO = require('../daos/calendars');

module.exports = {};

// for GET, no id
module.exports.getAll = async (calId) => {
  return await Events.find({calendarId : calId}).lean();
}

// for POST with name
module.exports.create = async (url, name) => {
  // _id.toHexString()
  // console.log(`CREATE: ${name._id}`);
  console.log(`LAST EFFORT ${name.date}, ${name.calendarId}, ${name.name}`);
  name["calendarId"] = url;
  console.log(`CHECKME ${name.date}, ${name.calendarId}, ${name.name}`);
  // const compare = (name.date instanceof Date);
  // console.log(compare);
  if (name.date instanceof Date) {
    return await Events.create(name);
  } else {
    return null;
  }
  // return await Events.create(name);
};

// for GET with ID
module.exports.getById = async (id) => {
  // console.log(`here, ${id}`);
  try {
    const calendar = await CalendarDAO.getById({id});
    if (!calendar || JSON.stringify(calendar) === '{}' ) {
      // res.status(404).send(`Returned: ${calendar}, Document:${req.params.id} doesn't exist`);
      // console.log(`after CalendarDAO: ${calendar._id}`);
      // console.log(`after CalendarDAO: ${calendar}`);
    } else {
      try {
        const event = await Events.findOne({ calendarId : calendar._id }).lean();
        return event;
      } catch (e) {
        return null;
      }
      // res.json(calendar);
    }
  } catch(e) {
    next(e);
  }
  /*
  try {
    const event = await Events.findOne({ _id: id }).lean();
    return event;
  } catch (e) {
    return null;
  }
  */
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