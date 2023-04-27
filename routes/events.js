const { Router } = require("express");

const EventsDAO = require('../daos/events');
const CalendarDAO = require('../daos/calendars');

const router = Router();

const regexFun = function (url) {
    const regex = /\/calendars\/([A-Za-z0-9]+)\/events\//;
    const match = regex.exec(url);
    if (match) {
        const calId = match[1];
        return calId;
    } else {
        return null;
    }
}

router.get("/", async (req, res, next) => {
    try {
        // console.log(req.originalUrl);
        const regex = /\/calendars\/([A-Za-z0-9]+)\/events\//;
        const match = regex.exec(req.originalUrl);
        if (match) {
            const calId = match[1];
            // console.log(calId); // Output: the CalendarId
            try {
                const calendar = await CalendarDAO.getById(calId);
                if (!calendar || JSON.stringify(calendar) === '{}' ) {
                  res.status(404).send(`Returned: ${calendar}, Document:${calId} doesn't exist`);
                } else {
                    const events = await EventsDAO.getAll(calId);
                    res.json(events);
                }
              } catch(e) {
                next(e);
              }
        }
    } catch(e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    // console.log(`GET ID: ${req.params.id}, REQ BODY: ${req.body}`);
    // console.log('EVENTS GET');
    // console.log(req.body);
    /*
            console.log(`HERE EVENTS get: ${events}`);
        console.log(`HERE EVENTS ID FILTERED: ${events.calendarId}`);
        const testHere = await CalendarDAO.find(events.calendarId);
        
        console.log(`TEST Calendar, ${testHere._id}`)
        */

    try {
        const calendar = await CalendarDAO.getById(req.params.id);
        const event = await EventsDAO.getById(req.params.id);
        // console.log(`CALENDAR: ${calendar._id}, EVENT: ${event.calendarId}`);
        // console.log(`CALENDAR: ${calendar.$_id}, EVENT: ${event[calendarId]}`);
        if (!calendar || JSON.stringify(calendar) === '{}' ) {
          res.status(404).send(`Returned: ${calendar}, Document:${req.params.id} doesn't exist`);
        } else {
            try {
                // const event = await EventsDAO.getById(req.params.id);
                // console.log('here, cal id:');
                // console.log(event.calendarId);
                if (!event || JSON.stringify(event) === '{}' ) {
                  res.status(404).send(`Calendar:${req.params.id} doesn't have an event`);
                } else {
                  res.json(event);
                }
                } catch(e) {
                    next(e);
                }
        }
    } catch(e) {
        next(e);
    }
   /*   
  try {
    const event = await EventsDAO.getById(req.params.id);
    if (!event || JSON.stringify(event) === '{}' ) {
      res.status(404).send(`Returned: ${event}, Document:${req.params.id} doesn't exist`);
    } else {
      res.json(event);
    }
  } catch(e) {
    next(e);
  }
  */
});

router.delete("/:id", async (req, res, next) => {
  try {
    const event = await EventsDAO.remove(req.params.id);
    if (event) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});

// Create, POST
router.post("/", async (req, res, next) => {
  const event = req.body;
  const url = req.originalUrl;
  const calId = regexFun(url);
  if (calId!=null){
    if (!event || JSON.stringify(event) === '{}' || event.name === null || event.name === 'missing') {
        res.status(400).send('event is required please');
      } else {
        const calendarAdded = await EventsDAO.create(calId, event);
        // const localID = mongoose.Types.ObjectId;
        // console.log(`HERE EVENTS created: ${calendarAdded._id.toHexString()}`);
        res.json(calendarAdded);
      }
  } else {
    res.status(400).send('event is required please');
  }
});

// Update, PUT
router.put("/:id", async (req, res, next) => {
  const calID = req.params.id;
  const calendar = req.body;
  // check to see if ID matches any existing calendar ids
  try {
    const calendarMatch = await EventsDAO.getById(req.params.id);
    if (!calendarMatch || JSON.stringify(calendarMatch) === '{}' ) {
      res.status(404).send(`Returned: ${calendarMatch}, Document:${req.params.id} doesn't exist`);
    } else {
      // check to see if calendar.name exists
      if (calendar.name === null || calendar.name === 'missing' || calendar.name === '' || calendar.name === undefined) {
        res.status(400).send('calendar name is required please');
      } else {
        // ID exists & req.body has some usable data - go for it!
        // console.log(calendar);
        const newCalendar = await EventsDAO.update(calID, calendar);
        // console.log(newCalendar);
        res.json(newCalendar);
      }
    }
  } catch(e) {
    next(e);
  }
});


module.exports = router;