import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import ReportCrime from "../../../models/ReportCrime";
import { nanoid } from "nanoid"; // Import nanoid to generate unique case IDs

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();

    const crime_description = formData.get("crime_description");
    const phone_number = formData.get("phone_number");
    const live_location = formData.get("live_location");
    const file = formData.get("file");
    const image_url = formData.get("image_url");

    if (!crime_description || !phone_number || !image_url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const case_id = `CASE-${nanoid(10)}`; // Generate a unique case ID

    const newReport = new ReportCrime({
      case_id,
      crime_description,
      phone_number,
      live_location,
      file,
      image_url,
      status: "Pending",
      updates: [],
    });

    await newReport.save();

    return NextResponse.json(
      { message: "Crime report submitted successfully!", case_id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving crime report:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}






export async function GET(req) {
  try {
    await dbConnect(); // Ensure DB connection is established

    console.log("Fetching crime cases...");

    const crimeCases = await ReportCrime.find({}); // Use .find({}) instead of .findAll()

    if (!crimeCases || crimeCases.length === 0) {
      return NextResponse.json({ error: "No cases found" }, { status: 404 });
    }

    return NextResponse.json(crimeCases, { status: 200 });
  } catch (error) {
    console.error("Error fetching case details:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
