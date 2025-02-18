import React, { useState } from "react";
import { FaThumbsUp, FaReply, FaFlag } from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";

const initialComments = [
  {
    id: 1,
    avatar:
      "https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg",
    username: "User123",
    content: "This chapter is amazing!",
    likes: 10,
  },
  {
    id: 10,
    avatar:
      "https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg",
    username: "User123",
    content: "This chapter is amazing!",
    likes: 10,
  },
];

const initialReplies = [
  {
    id: 2,
    parentId: 1,
    avatar:
      "https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg",
    username: "User456",
    content: "I agree! Can't wait for the next one.",
    likes: 5,
  },
  {
    id: 3,
    parentId: 2,
    avatar:
      "https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg",
    username: "User789",
    content: "Same here! The cliffhanger was intense!",
    likes: 3,
  },
  {
    id: 12,
    parentId: 10,
    avatar:
      "https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg",
    username: "User456",
    content: "I agree! Can't wait for the next one.",
    likes: 5,
  },
  {
    id: 13,
    parentId: 12,
    avatar:
      "https://i.pinimg.com/736x/c4/14/27/c4142714e3d7023b30965b445bb5fb6d.jpg",
    username: "User789",
    content: "Same here! The cliffhanger was intense!",
    likes: 3,
  },
];

const CommentSection: React.FC = () => {
  const [commentList, setCommentList] = useState(initialComments);
  const [replyList, setReplyList] = useState(initialReplies);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  // Function to add a comment or reply
  const handleAddComment = (parentId: number | null = null) => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      avatar: "https://via.placeholder.com/40?text=User",
      username: "NewUser",
      content: newComment,
      likes: 0,
    };

    if (parentId === null) {
      // Add as a new comment
      setCommentList([newCommentObj, ...commentList]);
    } else {
      // Add as a new reply
      const newReplyObj = { ...newCommentObj, parentId };
      setReplyList([newReplyObj, ...replyList]);
    }

    setNewComment("");
    setReplyingTo(null);
  };

  // Recursive function to render comments and replies
  const renderComments = (comments: any[], level = 0) => {
    return comments.map((comment) => (
      <div key={comment.id} className="relative">
        {/* Connecting line */}
        {/* {level > 0 && (
          <>
            <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gray-500"></div>
            <div className="absolute left-6 top-0 w-6 h-[2px] bg-gray-500"></div>
          </>
        )} */}

        {/* Comment block */}
        <div className="flex items-start space-x-4 ml-6">
          {/* Avatar */}
          <img
            src={comment.avatar}
            onError={(e) =>
              (e.currentTarget.src = "https://via.placeholder.com/40?text=User")
            }
            alt={comment.username}
            className={`${
              level === 0 ? "w-12 h-12" : "w-9 h-9"
            } rounded-full border border-gray-300`}
          />

          {/* Comment Content */}
          <div className="w-full">
            <div className="flex items-center">
              <strong className="text-white mr-3">{comment.username}</strong>
              <span className="text-gray-500 text-sm">2 hours ago</span>
            </div>
            <p className="text-gray-300 text-left">{comment.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-4 text-gray-500 mt-2">
              <button className="flex items-center gap-1 hover:text-blue-500 transition">
                <FaThumbsUp /> {comment.likes}
              </button>
              <button
                className="flex items-center gap-1 hover:text-blue-500 transition"
                onClick={() => setReplyingTo(comment.id)}
              >
                <FaReply /> Reply
              </button>
              <button className="flex items-center gap-1 hover:text-red-500 transition">
                <FaFlag /> Report
              </button>
            </div>

            {/* Reply Input */}
            {replyingTo === comment.id && (
              <div className="mt-4">
                <Editor
                  apiKey="twq13yjdbsd7igq54n2adws8gdcchz8xyjt2lq00qufqjjpm"
                  value={newComment}
                  init={{
                    height: 200,
                    menubar: false,
                    branding: false,
                    skin: "oxide-dark",
                    theme: "silver",
                    content_css: "dark",
                    plugins: ["lists", "link", "autolink"],
                    toolbar:
                      "undo redo | bold italic underline | bullist numlist | link",
                    content_style: `body { font-family: Arial, sans-serif; font-size: 14px; background-color: #2c2c2c; color: #fff; }`,
                  }}
                  onEditorChange={(content) => setNewComment(content)}
                />
                <button
                  className="mt-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                  onClick={() => handleAddComment(comment.id)}
                >
                  Submit Reply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Render Replies */}
        <div className="ml-16 mt-4">
          {renderComments(
            replyList.filter((reply) => reply.parentId === comment.id),
            level + 1
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="mt-12 w-full max-w-6xl mx-auto bg-[#2c2c2c] p-6 rounded-lg">
      {/* New Comment Input */}
      <div className="mb-6 rounded-lg text-right bg-[#1a1a1a]">
        <Editor
          apiKey="twq13yjdbsd7igq54n2adws8gdcchz8xyjt2lq00qufqjjpm"
          value={newComment}
          init={{
            height: 300,
            menubar: false,
            branding: false,
            skin: "oxide-dark",
            theme: "silver",
            content_css: "dark",
            plugins: ["lists", "link", "autolink"],
            toolbar:
              "undo redo | bold italic underline | bullist numlist | link",
            content_style: `body { font-family: Arial, sans-serif; font-size: 18px; background-color:rgb(33, 33, 53); color: #fff; }`,
          }}
          onEditorChange={(content) => setNewComment(content)}
        />
        <button
          className="m-3 p-2 bg-[#ff5722] text-white font-semibold rounded-lg hover:bg-gray-700 transition"
          onClick={() => handleAddComment(null)}
        >
          Submit
        </button>
      </div>

      {/* Comments Section */}
      <h2 className="text-2xl font-bold mb-6 text-white text-left">Comments</h2>
      {renderComments(commentList)}
    </div>
  );
};

export default CommentSection;
