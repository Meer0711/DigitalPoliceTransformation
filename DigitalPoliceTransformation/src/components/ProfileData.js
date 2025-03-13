"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProfileDisplay = () => {
  const { user } = useKindeBrowserClient();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const officerId = user.id || "P123456789";

      axios
        .get(`/api/profile?officer_id=${officerId}`)
        .then((response) => {
          if (response.status === 200 && response.data.data) {
            setProfileData(response.data.data);
          } else {
            setError("Profile data not found.");
          }
        })
        .catch(() => {
          setError("Failed to fetch profile data.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="w-full p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">Officer Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                <p className="text-lg font-semibold">
                  <span className="text-gray-600">Name:</span> {profileData.name}
                </p>
                <p>
                  <span className="text-gray-600">Email:</span> {profileData.login_email}
                </p>
                <p>
                  <span className="text-gray-600">Officer ID:</span> {profileData.officer_id}
                </p>
                <p>
                  <span className="text-gray-600">Address:</span> {profileData.address}
                </p>
                <p>
                  <span className="text-gray-600">Department:</span> {profileData.department}
                </p>
                <p>
                  <span className="text-gray-600">Designation:</span> {profileData.designation}
                </p>
                <p>
                  <span className="text-gray-600">Judicial Section:</span> {profileData.judicial_section}
                </p>
                <p>
                  <span className="text-gray-600">Blood Group:</span> {profileData.blood_group}
                </p>
                <p>
                  <span className="text-gray-600">Date of Birth:</span> {profileData.dob}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileDisplay;
