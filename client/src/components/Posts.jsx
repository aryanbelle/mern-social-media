import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment, FaRegShareSquare } from "react-icons/fa";
import CommentModal from "./CommentModal";

const Posts = ({ pfp, username, image, text, isLiked }) => {
    const [liked, setLiked] = useState(isLiked);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comments, setComments] = useState([]);

    const handleLike = () => {
        setLiked(!liked);
    };

    const handleCommentClick = () => {
        setIsModalOpen(true); // Open the modal when the comment button is clicked
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const handleCommentSubmit = (comment) => {
        setComments([...comments, comment]); // Add new comment to the list
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-5 mb-6 w-full mx-auto border border-gray-200">
            {/* User Info */}
            <div className="flex items-center mb-4">
                <img
                    src={pfp}
                    alt={`${username}'s profile`}
                    className="w-12 h-12 rounded-full object-cover mr-4 border border-gray-300"
                />
                <p className="text-gray-800 font-semibold text-lg">{username}</p>
            </div>

            {/* Text Content */}
            <p className="text-gray-700 text-base text-left leading-6 mb-4">{text}</p>

            {/* Image (if uploaded) */}
            <div className="w-full">
                {image && (
                    <img
                        src={image}
                        alt="Post content"
                        className="max-w-full h-auto object-contain rounded-lg border border-gray-300"
                        style={{ minWidth: "300px", maxWidth: "600px", margin: "10px auto" }}
                    />
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    {/* Like Button */}
                    <button
                        onClick={handleLike}
                        className="focus:outline-none hover:scale-105 transition-transform"
                    >
                        {liked ? (
                            <FaHeart className="text-red-600 text-2xl" />
                        ) : (
                            <FaRegHeart className="text-gray-600 text-2xl" />
                        )}
                    </button>

                    {/* Comment Icon */}
                    <button
                        onClick={handleCommentClick}
                        className="focus:outline-none hover:scale-105 transition-transform"
                    >
                        <FaRegComment className="text-gray-600 text-2xl" />
                    </button>

                    {/* Share Icon */}
                    <button className="focus:outline-none hover:scale-105 transition-transform">
                        <FaRegShareSquare className="text-gray-600 text-2xl" />
                    </button>
                </div>
            </div>

            {/* Display Comments */}
            <div className="mt-4">
                {comments.map((comment, index) => (
                    <div key={index} className="text-gray-600 text-sm mb-2">
                        <p>{comment}</p>
                    </div>
                ))}
            </div>

            {/* Comment Modal */}
            <CommentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCommentSubmit}
                pfp={pfp}          // The profile picture of the post's author
                username={username}  // The username of the post's author
                postText={text}    // The text content of the post
            />

        </div>
    );
};

export default Posts;
