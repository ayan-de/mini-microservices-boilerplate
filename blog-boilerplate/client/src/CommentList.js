import React from "react";
// import axios from "axios";

const CommentList = ({ comments }) => {
  // const [comments, setComments] = useState([]);

  // const fetchComment = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );
  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchComment();
  // }, []);
  const renderComments = comments.map((comment) => {
    let content;
    if (comment.status === "approved") {
      content = comment.content;
    } else if (comment.status === "pending") {
      content = "This comment is awaiting for moderation";
    } else {
      content = "This comment has been rejected";
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderComments}</ul>;
};

export default CommentList;
