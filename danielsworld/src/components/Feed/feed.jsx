import { useEffect } from "react";
import { useState } from "react";
import { getDocsInCollection } from "../../utils/firebase.js";

import Post from "../Post/post.jsx";
import './feed.scss';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const p = await getDocsInCollection("posts");
      setPosts(p);
      posts.sort((a, b) => {
        const postA = new Date(a.createdAt);
        const postB = new Date(b.createdAt);
        return postA - postB;
      });
    }

    getPosts();
  }, []);

  return (
    <div className="feed-container">
      {posts &&
        posts.map((post, idx) => {
          return <Post key={idx} content={post.content} author={post.author} createdAt={post.createdAt}/>
        })}
    </div>
  );
};

export default Feed;
