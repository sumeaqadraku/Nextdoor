import React, { useState, useEffect } from "react";
import FormInput from "../../components/ui/LabelInput";
import axios from "axios";
import toast from "react-hot-toast";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    avatar: null,
    avatarPreview: "",
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users/loggedIn", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { username, email, phoneNumber, avatarUrl } = response.data;

        setFormData({
          username: username || "",
          email: email || "",
          phone: phoneNumber || "",
          avatar: null,
          avatarPreview: avatarUrl
            ? `http://localhost:5000/${avatarUrl.replace(/\\/g, "/")}`
            : "",
        });
      } catch (error) {
        toast.error("Failed to load user profile.");
        console.error("Profile fetch error:", error.response || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
        avatarPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("username", formData.username);
    formPayload.append("email", formData.email);
    formPayload.append("phoneNumber", formData.phone);
    if (formData.avatar) {
      formPayload.append("avatarUrl", formData.avatar);
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/edit-profile",
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Profile updated successfully!");
      // Refresh avatar preview with new URL if backend returns it
      const { avatarUrl: newAvatarUrl } = response.data;
      if (newAvatarUrl) {
        setFormData((prev) => ({
          ...prev,
          avatarPreview: `http://localhost:5000/${newAvatarUrl.replace(/\\/g, "/")}`,
          avatar: null,
        }));
      }
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Update error:", error.response || error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">Loading profile...</div>
    );
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <div className="max-w-2xl mx-auto p-6 sm:p-8  bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Edit Profile
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex justify-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow bg-white/30 backdrop-blur-sm">
            <img
              src={formData.avatarPreview || ""}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white p-1.5 rounded-full cursor-pointer hover:scale-105 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536M9 13l-4 4m0 0l4-4m-4 4h6"
                />
              </svg>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-between">
          <FormInput
            label="Username"
            placeholder="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            width="w-full sm:w-[48%]"
          />
          <FormInput
            label="Email"
            placeholder="Email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            width="w-full sm:w-[48%]"
          />
          <FormInput
            label="Phone"
            placeholder="Phone number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            width="w-full sm:w-[48%]"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg shadow-md font-medium text-sm hover:brightness-110 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
    </div>
    
  );
};

export default EditProfile;
