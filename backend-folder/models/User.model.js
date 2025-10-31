import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  skills: { type: [String], default: [] },
  description: { type: String },

  // ✅ FIXED HERE
  experience: [
    {
      company: { type: String, required: true },
      role: { type: String, required: true },
      duration: { type: String },
      details: { type: String }
    }
  ],

  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      startYear: { type: String },
      endYear: { type: String }
    }
  ],

  resume: { type: String },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
