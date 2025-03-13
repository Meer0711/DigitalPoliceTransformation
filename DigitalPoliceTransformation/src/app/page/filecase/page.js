"use client"; // Mark this file as a client component
import { UploadButton } from "../../../../utils/uploadthing";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ComplaintForm = () => {
  const { toast } = useToast();

  const [imageurl1, setimageurl1] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [idProof, setIdProof] = useState("");
  const [idType, setIdType] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [fileType, setFileType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique reference number
    const refNo = Math.floor(Math.random() * 1000000).toString();
    setReferenceNo(refNo);

    // Prepare form data
    const complaintData = {
      complaintType,
      name,
      address,
      contact,
      description,
      incidentDate,
      incidentTime,
      uploadedFiles: imageurl1,
      idProof,
      idType,
      referenceNo: refNo,
      fileType,
    };

    try {
      // Make API request
      const response = await fetch("/api/FileaCase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(complaintData),
      });

      const result = await response.json();

      if (response.ok) {
        if (response.ok) {
          toast({
            title: "Complaint Submitted Successfully",
            description: `Reference No: ${refNo}. A confirmation message has been sent to your provided contact.`,
          });
        }

        // Reset form after successful submission
        setComplaintType("");
        setName("");
        setAddress("");
        setContact("");
        setDescription("");
        setIncidentDate("");
        setIncidentTime("");
        setimageurl1("");
        setIdProof("");
        setIdType("");
        setFileType("");
      } else {
        alert(result.message || "Failed to submit complaint.");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert(
        "An error occurred while submitting your complaint. Please try again."
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Complaint Form
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          <select
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setComplaintType(e.target.value)}
          >
            <option value="">Select Complaint Type</option>
            <option value="theft">Theft</option>
            <option value="fraud">Fraud</option>
            <option value="cyber">Cyber Crime</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Contact
          </label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Incident Date
          </label>
          <input
            type="date"
            value={incidentDate}
            onChange={(e) => setIncidentDate(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Incident Time
          </label>
          <input
            type="time"
            value={incidentTime}
            onChange={(e) => setIncidentTime(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <div>
            <div className="relative">
              <select
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setIdType(e.target.value)}
              >
                <option value="">Select a Document</option>
                <option value="aadhar">Aadhar Card</option>
                <option value="pan">Pan Card</option>
                <option value="driving-license">Driving License</option>
              </select>
            </div>
          </div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              setIdProof(res[0].url);
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <h3 className="text-2xl font-semibold mt-6 mb-4">
          Supporting Documents
        </h3>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Upload Picture/Video/Report
          </label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              setimageurl1(res[0].url);
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Complaint
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;