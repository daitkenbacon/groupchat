import { useEffect, useState, useCallback } from "react";
import { getDocsInCollection } from "../../utils/firebase.js";

import Post from "../Post/post.jsx";
import './feed.scss';

const Feed = (props) => {
  const { currentUser, fetchPosts, posts } = props;

  return (
    <div className="feed-container">
      {posts &&
        posts.map((post) => {
          const createdAt = new Date(post.createdAt.seconds * 1000)
          return <Post fetchPosts={fetchPosts} likes={post.likes} comments={post.comments} currentUser={currentUser} key={post.id} postID={post.id} content={post.content} author={post.author_id} createdAt={createdAt}/>
        })}
    </div>
  );
};

export default Feed;