import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  complaintType: { type: String, required: true },
//   personalInfo: {
//     name: String,
//     address: String,
//     contact: String,
//     description: String,
//   },
//   incidentInfo: {
//     date: String,
//     time: String,
//     location: String,
//     description: String,
//   },
//   uploadedFiles: [{ type: Object }],
//   idProof: { type: Object }, 
//   idType: { type: String, required: true },
//   referenceNo: { type: Number, unique: true },
});

const Complaint = mongoose.models.Complaint || mongoose.model("Complaint", ComplaintSchema);
export default Complaint;
