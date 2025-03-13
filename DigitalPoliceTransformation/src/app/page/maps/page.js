"use client";

import { useState, useEffect } from "react";

export default function PoliceStations() {
    const [location, setLocation] = useState(null);
    const [policeStations, setPoliceStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    fetchPoliceStations(latitude, longitude);
                },
                (error) => {
                    setError("Error getting location. Please allow location access.");
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
        }
    }, []);

    const fetchPoliceStations = async (lat, lng) => {
        try {
            const res = await fetch(`/api/maps?lat=${lat}&lng=${lng}`);
            const data = await res.json();
            if (res.ok) {
                setPoliceStations(data);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Failed to fetch police stations.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Nearby Police Stations</h2>
            {loading ? <p>Loading...</p> : error ? <p className="text-red-500">{error}</p> : (
                <ul className="list-disc pl-6">
                    {policeStations.map((station, index) => (
                        <li key={index} className="mb-2">
                            <strong>{station.name}</strong>
                            <p>{station.vicinity}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}