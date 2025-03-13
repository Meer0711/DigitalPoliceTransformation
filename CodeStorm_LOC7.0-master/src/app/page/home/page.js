"use client";
import React from 'react';

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <style jsx global>{`
        body, html {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <section className="relative w-full h-screen">
        <img
          src="/img.jpeg"
          alt="Police Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-6">
          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Empowering Police Officers
              <span className="block mt-2">with Technology</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-medium max-w-3xl mx-auto leading-relaxed">
              Transforming policing with modern tools for a better tomorrow.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800">Features</h2>
          <p className="text-xl text-gray-600">Enhancing police work through innovative technology.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Case Management System</h3>
            <p className="text-gray-700">Enable officers to file, track, and manage cases with digital folders, evidence, witness statements, and real-time updates.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Real-Time Communication</h3>
            <p className="text-gray-700">Secure tools for officers to share updates, critical information, and alerts in real-time.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Digital Evidence Collection</h3>
            <p className="text-gray-700">Integrate photo, video, and document uploading features to securely store and organize evidence.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Geolocation Services</h3>
            <p className="text-gray-700">Use GPS to navigate to crime scenes and track incidents and resources in real time.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Public Reporting System</h3>
            <p className="text-gray-700">Allow citizens to report incidents or crimes, ensuring faster police responses.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Personnel Management & Scheduling</h3>
            <p className="text-gray-700">Manage shifts, allocate personnel, and track performance metrics with ease.</p>
          </div>
        </div>
      </section>

      <section className="bg-red-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Emergency Contact</h2>
        <p className="text-xl mb-6">For emergencies, dial 100 immediately. Our team is ready to assist you.</p>
        <a href="tel:100" className="bg-yellow-500 text-blue-800 px-8 py-3 rounded-full text-xl hover:bg-yellow-400 transition duration-300">
          Dial 100
        </a>
      </section>

      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2025 Police Work Digital Transformation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;