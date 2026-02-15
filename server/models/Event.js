const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    venue: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    totalSeats: { type: Number, required: true },
    entryFee: { type: Number, default: 0 },
    registeredCount: { type: Number, default: 0 },
    waitingList: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
    ],
    createdBy: { type: String, required: true }, // Store Club Head ID (mock auth)
    // status can be computed, but we might store it for caching if needed.
    // For now, we'll compute it or use a virtual.
  },
  { timestamps: true },
);

// Virtual for status
eventSchema.virtual("status").get(function () {
  const now = new Date();
  if (now < this.startTime) return "UPCOMING";
  if (now >= this.startTime && now <= this.endTime) return "LIVE";
  return "ENDED";
});

eventSchema.set("toJSON", { virtuals: true });
eventSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Event", eventSchema);
