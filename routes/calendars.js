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

// Create
router.post("/", async (req, res, next) => {
  const calendar = req.body;
  console.log(calendar);
  // console.log(CalendarDAO.create(calendar));
  if (!calendar || JSON.stringify(calendar) === '{}' ) {
    // console.log(calendar);
    res.status(400).send('calendar is required please');
  } else {
    //TODO: save widget here DONE
    const calendarAdded = await CalendarDAO.create(calendar);
    res.json(calendarAdded);
  }
});

// Update
router.put("/:id", async (req, res, next) => {
  const calID = req.params.id;
  const calendar = req.body;
  const newCalendar = await CalendarDAO.update(calID, calendar);
  console.log('... PUT UPDATE');
  console.log(newCalendar);
  res.json(newCalendar);
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