import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const latitude = searchParams.get("lat");
        const longitude = searchParams.get("lng");

        if (!latitude || !longitude) {
            return NextResponse.json({ error: "Latitude and Longitude are required" }, { status: 400 });
        }

        const API_KEY = process.env.GOOGLE_MAPS_API_KEY; 
        const radius = 2000; 

        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=police&key=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data.results) {
            return NextResponse.json({ error: "No police stations found" }, { status: 500 });
        }

        return NextResponse.json(data.results, { status: 200 });
    } catch (error) {
        console.error("Error fetching police stations:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}