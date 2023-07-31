"use client";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Button from "../components/Button";
import { useUser } from "../context/User";

export default function Profile() {
  const [profile, setProfile] = useState({ name: "" });
  const { logout } = useUser();
  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem("token");

    // Decode the token to get the user's profile information
    if (token) {
      const decodedProfile = jwtDecode(token);
      console.log(decodedProfile);
      setProfile({ name: decodedProfile.name });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Profile</h1>
      {profile ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={profile.name}
              readOnly
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Button
        size="md"
        color="primary"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </div>
  );
}
