"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import ProfileForm from "../../../components/ProfileForm";
import ProfileData from "../../../components/ProfileData";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const ProfilePage = () => {
  const { user } = useKindeBrowserClient();
  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const officerId = user.id || "P123456789";

      axios
        .get(`/api/profile?officer_id=${officerId}`)
        .then((response) => {
          if (response.status === 200 && response.data.data) {
            setProfileExists(true); // Profile found
          } else {
            setProfileExists(false);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setProfileExists(false); // No profile found
          } else {
            setError("Error fetching profile data.");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="w-full p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-full" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : profileExists ? (
          <ProfileData />
        ) : (
          <ProfileForm />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
