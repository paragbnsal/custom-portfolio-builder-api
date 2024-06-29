import { Schema, model } from "mongoose";

const contactInfoSchema = new Schema({
  type: { type: String, required: true },
  url: { type: String, required: true },
  isLink: { type: Boolean, required: true },
});

const workExperienceSchema = new Schema({
  organisation: { type: String, required: true },
  joinedIn: { type: String, required: true },
  leftOn: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: [String], required: true },
});

const educationSchema = new Schema({
  organisation: { type: String, required: true },
  joinedIn: { type: String, required: true },
  leftOn: { type: String, required: true },
  major: { type: String, required: true },
  gpa: { type: String, required: true },
});

const resumeSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    contactInfo: [contactInfoSchema],
    workExperience: [workExperienceSchema],
    education: [educationSchema],
  },
  { timestamps: true, versionKey: false }
);

export default model("resume", resumeSchema);
