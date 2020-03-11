const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');

// List all reminders
router.get('/', async (req, res, next) => {
  try {
    const reminders = await Reminder.find({
      deleted: false
    });
    res.status(200).json(reminders);
    return;
  } catch (error) {
    next(error);
  }
});

// Create reminder
router.post('/create', async (req, res, next) => {
  const {
    description,
    city,
    color,
    datetime
  } = req.body;

  try {
    const newReminderData = {
      description: description,
      city: city,
      color: color,
      datetime: datetime
    };

    const newReminder = await Reminder.create(newReminderData);
    await newReminder.save();

    res.status(200).json(newReminder);
    return;
  } catch (error) {
    next(error);
  }
});

// Delete reminders per date
router.get('/date/delete/:date', async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
});

// List all reminders in a date range
router.get('/date/:date', async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
});

// Update reminder
router.put('/update/:id', async (req, res, next) => {
  const { id } = req.params;
  const {
    description,
    city,
    color,
    datetime
  } = req.body;

  try {
    const updateReminder = await Reminder.findOne({ _id: id });
    Object.assign(updateReminder, {
      description: description,
      city: city,
      color: color,
      datetime: datetime
    });
    await updateReminder.save();

    res.status(200).json(updateReminder);
    return;
  } catch (error) {
    next(error);
  }
});

// Delete reminder
router.get('/delete/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteReminder = await Reminder.findOneAndUpdate(id, {
      $set: {
        deleted: true
      }
    }, {
      new: true
    });
    res.status(200).json(deleteReminder);
    return;
  } catch (error) {
    next(error);
  }
});

// Get reminder
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const reminder = await Reminder.findById(id);
    res.status(200).json(reminder);
    return;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
