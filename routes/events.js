const { Router } = require("express");

const EventsDAO = require('../daos/events');

const router = Router();

router.get("/", async (req, res, next) => {
    console.log(req.params.router);
    console.log('EVENTS GET');
    console.log(req.body);
  try {
    const events = await EventsDAO.getAll();
    res.status(200);
    res.json(events);
  } catch(e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
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
  if (!event || JSON.stringify(event) === '{}' || event.name === null || event.name === 'missing') {
    res.status(400).send('event is required please');
  } else {
    const calendarAdded = await EventsDAO.create(event);
    res.json(calendarAdded);
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