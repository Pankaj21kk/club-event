const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// GET /api/events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ startTime: 1 });
    // computed status is included via virtuals
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/events
router.post("/", async (req, res) => {
  const { title, description, venue, startTime, endTime, totalSeats } =
    req.body;

  // Basic conflict check
  const start = new Date(startTime);
  const end = new Date(endTime);

  try {
    const conflictingEvent = await Event.findOne({
      venue,
      $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
    });

    if (conflictingEvent) {
      return res
        .status(409)
        .json({ message: "Venue is already booked for this time slot." });
    }

    const newEvent = new Event({
      title,
      description,
      venue,
      startTime,
      endTime,
      totalSeats,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/events/:id/register
router.post("/:id/register", async (req, res) => {
  const { studentId } = req.body;
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.status === "ENDED") {
      return res.status(400).json({ message: "Event has ended." });
    }

    const existingReg = await require("../models/Registration").findOne({
      eventId,
      studentId,
    });
    if (existingReg) {
      return res
        .status(400)
        .json({ message: "You are already registered for this event." });
    }

    let status = "CONFIRMED";
    if (event.registeredCount >= event.totalSeats) {
      status = "WAITLISTED";
    }

    const registration = new require("../models/Registration")({
      eventId,
      studentId,
      status,
    });

    await registration.save();

    if (status === "CONFIRMED") {
      event.registeredCount += 1;
    } else {
      event.waitingList.push(registration._id);
    }
    await event.save();

    res.json({
      message:
        status === "WAITLISTED"
          ? "Added to waitlist"
          : "Registration confirmed",
      status,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
