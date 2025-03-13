import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import dbConnect from "../../../lib/dbConnect";
import FileCase from "../../../models/FileCase";

export async function GET(req) {
  try {
    await dbConnect();

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;
    const cases = await FileCase.find({ userId });

    return NextResponse.json(cases, { status: 200 });
} catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
