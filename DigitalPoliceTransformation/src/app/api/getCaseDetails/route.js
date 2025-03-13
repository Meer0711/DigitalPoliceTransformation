import { NextResponse } from "next/server";

const mockDatabase = [
  {
    caseId: "67a804e02a6e4bc94418283e",
    complaintType: "Fraud",
    name: "John Doe",
    address: "123 Main St",
    contact: "9876543210",
    description: "Unauthorized transaction on my account.",
    incidentDate: "2024-02-05",
    incidentTime: "14:30",
    referenceNo: "123456",
  },
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const caseId = searchParams.get("caseId");

  if (!caseId) {
    return NextResponse.json({ message: "Missing case ID" }, { status: 400 });
  }

  const caseDetails = mockDatabase.find((caseData) => caseData.caseId === caseId);

  if (!caseDetails) {
    return NextResponse.json({ message: "Case not found" }, { status: 404 });
  }

  return NextResponse.json(caseDetails);
}
