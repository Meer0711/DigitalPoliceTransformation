import mongoose from "mongoose";

const FileComplaintSchema = new mongoose.Schema({
  complaintType: {
    type: String,
    required: true,
    enum: ["theft", "fraud", "cyber", "other"],
  },
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  description: { type: String, required: true },
  incidentDate: { type: Date, required: true },
  incidentTime: { type: String, required: true },
  uploadedFiles: { type: String, required: true },
  userId: { type: String, required: true },
  idProof: { type: String },
  idType: {
    type: String,
    required: true,
    idType: {
        type: String,
        required: true,
        enum: ["aadhar", "passport", "driving-license", "pan"],
    },
      },
  referenceNo: { type: String, unique: true },
  fileType: { type: String, required: false },
  dateFiled: { type: Date, default: Date.now },
});

const FileCase = mongoose.models.FileComplaint || mongoose.model("FileComplaint", FileComplaintSchema);

export default FileCase;
