import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import ReportCrime from "../../../models/ReportCrime";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const crimeCase = await ReportCrime.findOne({ case_id: params.caseId });

    if (!crimeCase) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    return NextResponse.json(crimeCase, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching case details" }, { status: 500 });
  }
}
