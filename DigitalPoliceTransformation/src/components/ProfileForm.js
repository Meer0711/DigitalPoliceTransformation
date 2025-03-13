"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { resolve } from "path";

const ProfileForm = () => {
  const { user } = useKindeBrowserClient();
  const [officerData, setOfficerData] = useState(null);
  const [policeStations, setPoliceStations] = useState([]);
  const [loadingStations, setLoadingStations] = useState(false);
  const [errorStations, setErrorStations] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    sex: "",
    department: "",
    designation: "",
    jurisdiction: "",
    blood_group: "",
    dob: "",
    police_station: "",
  });

  useEffect(() => {
    if (user) {
      setOfficerData({
        login_name: user.given_name || "Officer John",
        login_email: user.email || "No Email",
        officer_id: user.id || "P123456789",
      });

      // Fetch nearby police stations based on user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLoadingStations(true);

            try {
              const response = await axios.get(`/api/maps?lat=${latitude}&lng=${longitude}`);
              if (response.status === 200) {
                setPoliceStations(response.data);
                console.log(response)
              }
            } catch (error) {
              setErrorStations("Failed to fetch police stations.");
            } finally {
              setLoadingStations(false);
            }
          },
          (error) => {
            setErrorStations("Location access denied.");
            setLoadingStations(false);
          }
        );
      } else {
        setErrorStations("Geolocation is not supported in this browser.");
      }
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!officerData) {
      alert("User data is loading. Please wait.");
      return;
    }

    const payload = {
      ...officerData, // Include login details
      ...formData, // Include form inputs
    };

    try {
      const response = await axios.post("/api/profile", payload);
      alert("Profile saved successfully!");
    } catch (error) {
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="w-full p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">
          Profile Setup
        </h2>

        {/* Display Officer Data */}
        {officerData && (
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-gray-700">Login Name:</span>
                <span className="text-blue-800 text-lg">{officerData.login_name}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-blue-800 text-lg">{officerData.login_email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Officer ID:</span>
                <span className="text-blue-800 text-lg">{officerData.officer_id}</span>
              </div>
            </div>
          </div>
        )}

        {/* User Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-2"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-2"
              placeholder="Enter your address"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-gray-700">Sex:</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-2"
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Department:</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-2"
              placeholder="Enter your department"
            />
          </div>
          <div>
            <label className="block text-gray-700">Designation:</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-2"
              placeholder="Enter your designation"
            />
          </div>
          <div>
            <label className="block text-gray-700">Jurisdiction:</label>
            <input
              type="text"
              name="jurisdiction"
              value={formData.jurisdiction}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-2"
              placeholder="Enter your jurisdiction"
            />
          </div>
          <div>
            <label className="block text-gray-700">Blood Group:</label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-2"
            >
              <option value="">Select your blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Nearby Police Station:</label>
            {loadingStations ? (
              <p className="text-gray-500">Loading police stations...</p>
            ) : errorStations ? (
              <p className="text-red-500">{errorStations}</p>
            ) : (
              <select
                name="police_station"
                value={formData.police_station}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mt-2"
              >
                <option value="">Select a police station</option>
                {policeStations.map((station, index) => (
                  <option key={index} value={station.name}>
                    {station.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-2"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
