"use client";
import React, { useState } from "react";
import axios from "axios";
import { UploadButton } from "../../../../utils/uploadthing";

const ReportCrimeForm = () => {
  const [formData, setFormData] = useState({
    crime_description: "",
    phone_number: "",
    live_location: "",
    file: null,
  });
  const [imageUrl, setimageurl1] = useState("");
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
  };

  // Get user's live location
  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevState) => ({
            ...prevState,
            live_location: `Lat: ${latitude}, Long: ${longitude}`,
          }));
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Could not fetch location. Please enable location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.crime_description || !formData.phone_number || !imageUrl) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("crime_description", formData.crime_description);
    formDataToSend.append("phone_number", formData.phone_number);
    formDataToSend.append("live_location", formData.live_location);
    formDataToSend.append("file", formData.file);
    formDataToSend.append("image_url", imageUrl); // Add image URL
  
    try {
      const response = await axios.post("/api/reportCrime", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Crime report submitted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit the report. Please try again.");
    }
  };
  

  return (
    <div className="w-full p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-4 text-red-600">
          Report a Crime
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Crime Description */}
          <div>
            <label className="block text-gray-700">Crime Description:</label>
            <textarea
              name="crime_description"
              value={formData.crime_description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-2"
              placeholder="Describe the crime"
              rows="4"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700">Phone Number:</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-2"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Live Location */}
          <div>
            <label className="block text-gray-700">Live Location:</label>
            <input
              type="text"
              name="live_location"
              value={formData.live_location}
              readOnly
              className="w-full p-2 border rounded-lg mt-2 bg-gray-200"
              placeholder="Click the button to get your location"
            />
            <button
              type="button"
              onClick={fetchLocation}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Get Location
            </button>
          </div>

          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              setimageurl1(res[0].url);
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
            className="mb-4" // Adds margin below the upload button
          />

          {/* Submit Button */}
          <div className="mt-4 text-center">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportCrimeForm;
