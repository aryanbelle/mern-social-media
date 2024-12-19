import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePictureUpload = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 5000000) {  // Limit to 5MB size
                setError("File size should be less than 5MB.");
                setFile(null);
                setPreviewUrl(null);
            } else {
                setError("");
                setFile(selectedFile);
                setPreviewUrl(URL.createObjectURL(selectedFile)); // For previewing image
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data to send
        const formData = new FormData();
        formData.append("profilePicture", file);

        try {
            // Send POST request to the backend for profile picture upload
            const response = await fetch("/upload-profile-picture", {
                method: "POST",
                body: formData,
            });
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error("Error during profile picture upload:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md flex rounded-lg shadow-lg">
                {/* Left Side: Form */}
                <div className="w-full p-8 space-y-6">
                    <h2 className="text-3xl font-bold text-center text-gray-700">Upload Profile Picture</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Profile Picture Input */}
                        <div className="flex justify-center">
                            <div className="flex flex-col items-center">
                                {/* Image Preview */}
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Profile Preview"
                                        className="w-32 h-32 rounded-full border-2 border-gray-300 mb-4"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full border-2 border-gray-300 mb-4 flex items-center justify-center text-gray-500">
                                        <span>Upload</span>
                                    </div>
                                )}

                                {/* File Input */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-input"
                                />
                                <label
                                    htmlFor="file-input"
                                    className="cursor-pointer font-medium border-2 border-blue-400 py-2 px-4 rounded-md"
                                >
                                    Choose a file
                                </label>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-sm text-red-500">{error}</p>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            onClick={navigate("/")}
                            className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 transition duration-200"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePictureUpload;
