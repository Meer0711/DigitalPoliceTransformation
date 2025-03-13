import dbConnect from "../../../lib/dbConnect";
import { NextResponse } from "next/server";
import FileCase from "../../../models/FileCase";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req) {
    await dbConnect();

    try {
        // Get user session from Kinde
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user || !user.id) {
            return NextResponse.json(
                { message: "Unauthorized: User ID is required" },
                { status: 401 }
            );
        }

        const requestData = await req.json();
        console.log("Received Data:", JSON.stringify(requestData, null, 2));

        // Add user ID to the complaint data
        const newComplaint = new FileCase({
            userId: user.id,
            ...requestData,
        });

        await newComplaint.save();

        return NextResponse.json(
            {
                message: "Complaint saved successfully",
                data: newComplaint,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving complaint:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
        });

        return NextResponse.json(
            { message: "Error saving complaint", error: error.message },
            { status: 500 }
        );
    }
}
