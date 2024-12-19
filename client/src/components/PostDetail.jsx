import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaShare, FaPaperPlane } from 'react-icons/fa';

const PostDetail = ({ post, comments, onAddComment }) => {
    const [commentText, setCommentText] = useState('');

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleAddComment = () => {
        if (commentText.trim()) {
            onAddComment(commentText);
            setCommentText('');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
            {/* Post Header */}
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

            {/* Post Content */}
            <div className="mb-6">
                <p className="text-gray-900 text-xl mb-4">{post.content}</p>
                {post.image && (
                    <img
                        src={post.image}
                        alt="Post image"
                        className="w-full h-auto rounded-lg mb-4"
                    />
                )}
            </div>

            {/* Post Interactions */}
            <div className="flex space-x-6 mb-6">
                <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <FaThumbsUp />
                    <p>{post.likes} Likes</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <FaComment />
                    <p>{comments.length} Comments</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <FaShare />
                    <p>Share</p>
                </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-4 mb-6">
                {comments.map((comment, index) => (
                    <div key={index} className="flex items-start space-x-4">
                        <img
                            src={comment.userProfilePicture}
                            alt={comment.username}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                            <p className="font-semibold text-gray-800">{comment.username}</p>
                            <p className="text-gray-600">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Comment Section */}
            <div className="flex items-center space-x-4">
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
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default PostDetail;
