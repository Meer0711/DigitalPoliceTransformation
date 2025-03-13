import mongoose from "mongoose";

const ReportCrimeSchema = new mongoose.Schema(
  {
    case_id: { type: String, unique: true, required: true },
    crime_description: { type: String, required: true },
    phone_number: { type: String, required: true },
    live_location: { type: String },
    file: { type: String },
    image_url: { type: String, required: true },
    status: { type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending" },
    updates: [
      {
        message: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.ReportCrime || mongoose.model("ReportCrime", ReportCrimeSchema);
