import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  sex: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  jurisdiction: { type: String, required: true },
  blood_group: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  },
  dob: { type: Date, required: true },
  login_name: { type: String, required: true },
  login_email: { type: String, required: true },
  officer_id: { type: String, required: true },
  police_station:{type:String,required:true}
});

export default mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
