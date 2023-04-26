const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');

const router = Router();

router.get("/", async (req, res, next) => {
  // console.log('here1');
  try {
    const calendars = await CalendarDAO.getAll();
    res.status(200);
    res.json(calendars);
  } catch(e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.id);
    if (!calendar || JSON.stringify(calendar) === '{}' ) {
      res.status(404).send(`Returned: ${calendar}, Document:${req.params.id} doesn't exist`);
    } else {
      res.json(calendar);
    }
  } catch(e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.remove(req.params.id);
    if (calendar) {
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
  const calendar = req.body;
  if (!calendar || JSON.stringify(calendar) === '{}' || calendar.name === null || calendar.name === 'missing') {
    res.status(400).send('calendar is required please');
  } else {
    const calendarAdded = await CalendarDAO.create(calendar);
    res.json(calendarAdded);
  }
});

// Update, PUT
router.put("/:id", async (req, res, next) => {
  const calID = req.params.id;
  const calendar = req.body;
  // check to see if ID matches any existing calendar ids
  try {
    const calendarMatch = await CalendarDAO.getById(req.params.id);
    if (!calendarMatch || JSON.stringify(calendarMatch) === '{}' ) {
      res.status(404).send(`Returned: ${calendarMatch}, Document:${req.params.id} doesn't exist`);
    } else {
      // check to see if calendar.name exists
      if (calendar.name === null || calendar.name === 'missing' || calendar.name === '' || calendar.name === undefined) {
        res.status(400).send('calendar name is required please');
      } else {
        // ID exists & req.body has some usable data - go for it!
        // console.log(calendar);
        const newCalendar = await CalendarDAO.update(calID, calendar);
        // console.log(newCalendar);
        res.json(newCalendar);
      }
    }
  } catch(e) {
    next(e);
  }


  // console.log(calendar); => [ { name: 'Drinks with Evan!'}, {date: '2002-12-09' } ]
  // console.log(calID); => 644846a750ec6058d9056ed9

  // console.log('... PUT UPDATE');
  // console.log(newCalendar);

  //res.json(updatedWidget);
  /*
  if (!widget || JSON.stringify(widget) === '{}' ) {
    res.status(400).send('widget is required now"');
  } else {
    //TODO: update widget here ATTEMPT
    const updatedWidget = await WidgetDAO.update(widgetId, widget);
    res.json(updatedWidget);
  }
  */
});


module.exports = router;