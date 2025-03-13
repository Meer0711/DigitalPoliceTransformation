"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TrackCasePage = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch("/api/TrackCase");
        const data = await response.json();

        if (response.ok) {
          if (Array.isArray(data)) {
            setCases(data);
          } else {
            setCases([]);
            setError("Invalid data format received");
          }
        } else {
          throw new Error(data.message || "Failed to fetch cases");
        }
      } catch (err) {
        setError(err.message);
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const handleShowDetails = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const handleShowAll = () => {
    setSelectedCase(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Your Filed Cases</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : selectedCase ? (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full">
          <h3 className="text-2xl font-semibold">{selectedCase.complaintType.toUpperCase()}</h3>
          <p className="text-gray-700 mt-2"><strong>Name:</strong> {selectedCase.name}</p>
          <p className="text-gray-700"><strong>Incident Date:</strong> {new Date(selectedCase.incidentDate).toDateString()}</p>
          <p className="text-gray-700"><strong>Reference No:</strong> {selectedCase.referenceNo}</p>
          <p className="text-gray-700"><strong>Description:</strong> {selectedCase.description}</p>
          <p className="text-gray-700"><strong>Contact:</strong> {selectedCase.contact}</p>
          <p className="text-gray-700"><strong>Address:</strong> {selectedCase.address}</p>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">Uploaded Images:</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {selectedCase.idProof && (
                <div>
                  <p className="font-medium">ID Proof:</p>
                  <img
                    src={selectedCase.idProof}
                    alt="ID Proof"
                    className="w-full h-40 object-cover border rounded-lg"
                  />
                </div>
              )}
              {selectedCase.uploadedFiles && (
                <div>
                  <p className="font-medium">Other File:</p>
                  <img
                    src={selectedCase.uploadedFiles}
                    alt="Uploaded File"
                    className="w-full h-40 object-cover border rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleShowAll}
            className="mt-3 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Show All
          </button>
        </div>
      ) : cases.length === 0 ? (
        <p className="text-center text-gray-600">No cases found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <div key={caseItem.referenceNo} className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">{caseItem.complaintType.toUpperCase()}</h3>
              <p className="text-gray-700 mt-2"><strong>Name:</strong> {caseItem.name}</p>
              <p className="text-gray-700"><strong>Incident Date:</strong> {new Date(caseItem.incidentDate).toDateString()}</p>
              <p className="text-gray-700"><strong>Reference No:</strong> {caseItem.referenceNo}</p>
              <button
                onClick={() => handleShowDetails(caseItem)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Show Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackCasePage;