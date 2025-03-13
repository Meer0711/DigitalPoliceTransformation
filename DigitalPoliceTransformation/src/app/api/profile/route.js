import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Profile from "../../../models/profile";

export async function GET(req) {
  await dbConnect(); // Connect to the database

  try {
    const { searchParams } = new URL(req.url);
    const officer_id = searchParams.get("officer_id");

    if (!officer_id) {
      return NextResponse.json(
        { message: "Officer ID is required" },
        { status: 400 }
      );
    }

    const profile = await Profile.findOne({ officer_id });

    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found", data: null },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Profile fetched successfully", data: profile },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching profile:", error);

    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  await dbConnect();

  try {
    const requestData = await req.json();
    console.log("Received Profile Data:", JSON.stringify(requestData, null, 2));

    // Create and save profile
    const newProfile = new Profile(requestData);
    await newProfile.save();

    return NextResponse.json(
      { message: "Profile saved successfully", data: newProfile },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving profile:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    return NextResponse.json(
      { message: "Error saving profile", error: error.message },
      { status: 500 }
    );
  }
}
