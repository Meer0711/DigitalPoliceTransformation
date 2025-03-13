"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CaseDetails = () => {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("caseId");
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!caseId) {
      setError("No case ID provided.");
      setLoading(false);
      return;
    }

    const fetchCaseDetails = async () => {
      try {
        const response = await fetch(`/api/getCaseDetails?caseId=${caseId}`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setCaseData(data);
        } else {
          setError(data.message || "Failed to fetch case details.");
        }
      } catch (err) {
        setError("Error fetching case details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  if (loading) return <p>Loading case details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Case Details</h2>
      {caseData ? (
        <div>
          <p>
            <strong>Complaint Type:</strong> {caseData.complaintType}
          </p>
          <p>
            <strong>Name:</strong> {caseData.name}
          </p>
          <p>
            <strong>Address:</strong> {caseData.address}
          </p>
          <p>
            <strong>Contact:</strong> {caseData.contact}
          </p>
          <p>
            <strong>Description:</strong> {caseData.description}
          </p>
          <p>
            <strong>Incident Date:</strong> {caseData.incidentDate}
          </p>
          <p>
            <strong>Incident Time:</strong> {caseData.incidentTime}
          </p>
          <p>
            <strong>Reference No:</strong> {caseData.referenceNo}
          </p>

          {/* Display Images */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Uploaded Images:</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {caseData.idProof && (
                <div>
                  <p className="font-medium">ID Proof:</p>
                  <img
                    src={caseData.idProof}
                    alt="ID Proof"
                    className="w-full h-40 object-cover border rounded-lg"
                  />
                </div>
              )}
              {caseData.uploadedFiles && (
                <div>
                  <p className="font-medium">Other File:</p>
                  <img
                    src={caseData.uploadedFiles}
                    alt="Uploaded File"
                    className="w-full h-40 object-cover border rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>No case details found.</p>
      )}
    </div>
  );
};

export default CaseDetails;
