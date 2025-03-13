"use client";
import { useState, useEffect } from "react";

const CaseDetailsPage = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch("/api/reportCrime"); // Ensure correct API route
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setCases(data);
        } else {
          throw new Error(data.error || "Failed to fetch case details");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Case Details</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : cases.length === 0 ? (
        <p className="text-center text-gray-600">No cases found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <div
              key={caseItem.case_id} // Use `case_id` as the unique key
              className="bg-white p-4 shadow-md rounded-lg"
            >
              <h3 className="text-xl font-semibold">Case ID: {caseItem.case_id}</h3>
              <p className="text-gray-700 mt-2">
                <strong>Description:</strong> {caseItem.crime_description}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {caseItem.status}
              </p>
              <p className="text-gray-700">
                <strong>Incident Date:</strong> {new Date(caseItem.createdAt).toDateString()}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {caseItem.live_location}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {caseItem.phone_number}
              </p>

              {/* Display Image if Available */}
              {caseItem.image_url && (
                <div className="mt-3">
                  <p className="font-medium">Uploaded Image:</p>
                  <img
                    src={caseItem.image_url}
                    alt="Uploaded Evidence"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CaseDetailsPage;
