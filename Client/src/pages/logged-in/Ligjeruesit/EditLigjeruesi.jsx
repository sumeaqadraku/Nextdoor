import React, { useState, useEffect } from "react";
import FormInput from "../../../components/ui/LabelInput";
import axiosInstance from "../../../context/axiosInstance";
import { useParams } from "react-router-dom";

const EditLigjeruesi = () => {
    const { id } = useParams();
    const [lecturerName, setLecturerName] = useState("");
    const [deparatament, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLecturerData = async () => {
            try {
                const response = await axiosInstance.get(`/ligjeratat/getLecturerById/${id}`);
                const { lecturerName, deparatament, email } = response.data;
                setLecturerName(lecturerName || "");
                setDepartment(deparatament || "");
                setEmail(email || "");
            } catch (error) {
                console.error("Error fetching lecturer data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchLecturerData();
    }, [id]);

    const updateLecturer = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put(`/ligjeratat/updateLecturer/${id}`, {
                lecturerName,
                deparatament,
                email,
            });
            console.log("Lecturer updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating lecturer:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Profile</h2>

            <form onSubmit={updateLecturer} className="flex flex-col gap-8">
                <div className="flex flex-wrap gap-4 justify-between">
                    <FormInput
                        label="Lecturer Name"
                        placeholder="Enter lecturer name"
                        type="text"
                        name="lecturerName"
                        value={lecturerName}
                        onChange={(e) => setLecturerName(e.target.value)}
                        width="w-full sm:w-[48%]"
                    />
                    <FormInput
                        label="Email"
                        placeholder="Email address"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        width="w-full sm:w-[48%]"
                    />
                    <FormInput
                        label="Department"
                        placeholder="Department"
                        type="text"
                        name="deparatament"
                        value={deparatament}
                        onChange={(e) => setDepartment(e.target.value)}
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
    );
};

export default EditLigjeruesi;
