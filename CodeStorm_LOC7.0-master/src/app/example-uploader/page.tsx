"use client";

import { UploadButton } from "../../../utils/uploadthing";

export default function Home() {
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/FileCase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Sending an empty object
      });

      const result = await response.json();
      console.log("Response:", result);
      alert("API call successful!");
    } catch (error) {
      console.error("Error calling API:", error);
      alert("API call failed!");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Call API
      </button>
    </main>
  );
}
