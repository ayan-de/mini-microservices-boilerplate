import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  //fetchPost funciton should be run only once
  const fetchPosts = async () => {
    //anytime we use axios we get back response object i.e nested inside data property
    // const res = await axios.get("http://localhost:4000/posts");
    //request to query
    const res = await axios.get("http://localhost:4002/posts");
    console.log(res.data);

    setPosts(res.data);
  };

  //empty array as second argument tells us to run fetchPosts only once
  //useEffect is run to run some code at some specific time of lifecycle of component
  useEffect(() => {
    fetchPosts();
  }, []);

  //returns us the array of actual post object
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          {/* <CommentList postId={post.id} /> */}
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
