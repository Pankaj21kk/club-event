const mongoose = require("mongoose");

const clubHeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    clubName: { type: String, required: true },
    phone: { type: String, required: true },
    collegeEmail: { type: String, required: true, unique: true },
    rollNo: { type: String, required: true, unique: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },
    designation: { type: String, required: true },
    password: { type: String, required: true },
    githubProfile: { type: String },
    linkedinProfile: { type: String },
    xProfile: { type: String },
    portfolioUrl: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ClubHead", clubHeadSchema);
