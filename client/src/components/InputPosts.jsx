import React, { useState, useRef } from "react";

const InputPosts = () => {
  const [comment, setComment] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setComment(event.target.value);

    // Adjust the height of the textarea based on its content
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height to auto
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on content
    }
  };

  return (
    <div className="bg-white border-1 shadow rounded-lg px-4 pt-4 pb-6 h-auto flex flex-col gap-4 w-full">
      {/* Top Section: Profile Picture and Input */}
      <div className="flex items-start gap-4">
        {/* Profile Picture */}
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        {/* Textarea Field */}
        <textarea
          ref={textareaRef}
          value={comment}
          onChange={handleChange}
          placeholder="What's happening?"
          rows={1}
          className="flex-1 resize-none bg-opacity-50 rounded-md p-2 focus:outline-none text-gray-800 text-sm placeholder-gray-500"
          style={{
            minHeight: "40px", // Minimum height for 1 row
            paddingTop: "8px", // Padding to prevent overlap
            paddingBottom: "8px", // Padding to prevent overlap
            height: "auto", // Adjust height dynamically
            maxHeight: "200px", // Maximum height for textarea (expandable)
            overflowY: "auto", // Enable vertical scrolling once the max height is reached
          }}
        />
      </div>

      {/* Bottom Section: Buttons */}
      <div className="flex justify-between items-center">
        {/* Icon Buttons */}
        <div className="flex gap-4">
          {/* Photo Button */}
          <button className="flex items-center gap-2 text-blue-500 text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l-3.66-3.66a.5.5 0 00-.707 0l-3.66 3.66A2.121 2.121 0 005 7.646v8.708a2.121 2.121 0 002.121 2.121h9.758A2.121 2.121 0 0019 16.354V7.646a2.121 2.121 0 00-2.121-2.414H15.23z"
              />
            </svg>
            Photo
          </button>

          {/* Video Button */}
          <button className="flex items-center gap-2 text-green-500 text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10l4.553 2.276a1 1 0 010 1.448L15 16v-6zM10 6h1v12h-1a4 4 0 01-4-4V10a4 4 0 014-4z"
              />
            </svg>
            Video
          </button>
        </div>

        {/* Post Button */}
        <button className="flex items-center gap-2 text-white bg-blue-700 px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-800">
          Post
        </button>
      </div>
    </div>
  );
};

export default InputPosts;
