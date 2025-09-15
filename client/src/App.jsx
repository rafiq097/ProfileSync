import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    isMarried: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = name === "phoneNumber" ? value.replace(/\s+/g, "") : value;
    setForm({ ...form, [name]: type === "checkbox" ? checked : newValue });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName.trim()) {
      setError("Please enter your first name");
      return;
    }
    if (!form.lastName.trim()) {
      setError("Please enter your last name");
      return;
    }
    if (!/^\+[0-9]{1,4}[0-9]{10,15}$/.test(form.phoneNumber)) {
      setError("Enter phone number with country code (e.g. +919876543210)");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/v1/user-profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.status == 201) {
        toast.success("Profile Created Successfully!");
        setForm({ firstName: "", lastName: "", phoneNumber: "", isMarried: false });
      } else {
        toast.error("Failed to save profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Please try again :(");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6 animate-fadeIn border border-blue-100"
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-700 drop-shadow-md">
          Register Form
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm placeholder-gray-400 hover:shadow-md transition"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm placeholder-gray-400 hover:shadow-md transition"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number e.g. +919876543210"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm placeholder-gray-400 hover:shadow-md transition"
          />
        </div>

        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl border border-blue-200 hover:shadow-md transition">
          <input
            type="checkbox"
            name="isMarried"
            checked={form.isMarried}
            onChange={handleChange}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-400"
          />
          <span className="text-gray-700 font-medium">I am married</span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}
