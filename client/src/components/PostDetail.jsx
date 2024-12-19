import React, { useState } from "react";
import { FaHeart, FaRegComment, FaRegShareSquare } from "react-icons/fa";
import AuthImg from "../assets/auth.jpg";

const PostDetail = () => {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([
        {
            userProfilePicture: "https://via.placeholder.com/50",
            username: "Jane Smith",
            content: "This is such an interesting post!",
        },
        {
            userProfilePicture: "https://via.placeholder.com/50",
            username: "Mike Johnson",
            content: "Thanks for sharing this!",
        },
    ]);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(42);

    const post = {
        userProfilePicture: "https://via.placeholder.com/150",
        username: "John Doe",
        timestamp: "2 hours ago",
        content: "This is a static post example. It is designed to demonstrate the PostDetail component.",
        image: AuthImg,
    };

    const handleLike = () => {
        setLiked(!liked);
        setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
    };

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleAddComment = () => {
        if (commentText.trim()) {
            const newComment = {
                userProfilePicture: "https://via.placeholder.com/50",
                username: "Your Name",
                content: commentText,
            };
            setComments([newComment, ...comments]);
            setCommentText("");
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center mb-4">
                <img
                    src={post.userProfilePicture}
                    alt={post.username}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                    <p className="font-semibold text-lg text-gray-800">{post.username}</p>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-gray-900 text-xl text-left mb-4">{post.content}</p>
                {post.image && (
                    <div className="flex justify-center items-center">
                        <img
                            src={post.image}
                            alt="Post"
                            className="rounded-lg border border-gray-300"
                            style={{
                                maxWidth: "600px",
                                maxHeight: "300px",
                                width: "100%",
                                height: "auto",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                )}
            </div>

            <div className="flex space-x-6 mb-6">
                <button
                    className="flex items-center space-x-2 text-gray-600 cursor-pointer focus:outline-none"
                    onClick={handleLike}
                >
                    <FaHeart className={liked ? "text-red-600" : "text-gray-600"} />
                    <p>{likes} Likes</p>
                </button>
                <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <FaRegComment />
                    <p>{comments.length} Comments</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <FaRegShareSquare />
                    <p>Share</p>
                </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
                <img
                    src="https://via.placeholder.com/50"
                    alt="Your Profile"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={handleCommentChange}
                    className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleAddComment}
                    className="bg-blue-700 hover:bg-blue-800 px-4 py-2 text-white rounded-lg"
                >
                    Add
                </button>
            </div>

            <div className="space-y-4">
                {comments.map((comment, index) => (
                    <div key={index} className="flex items-start space-x-4">
                        <img
                            src={comment.userProfilePicture}
                            alt={comment.username}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                            <p className="font-semibold text-left text-gray-800">{comment.username}</p>
                            <p className="text-gray-600">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostDetail;
