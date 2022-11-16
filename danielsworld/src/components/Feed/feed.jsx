import { useEffect } from 'react';
import { useState } from 'react';
import { getDocsInCollection } from '../../utils/firebase.js';

const Feed = () => {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function getPosts() {
            const p = await getDocsInCollection('posts');
            setPosts(p);
            posts.sort((a,b) => {
                const postA = new Date(a.createdAt);
                const postB = new Date(b.createdAt);
                return postA - postB;
            })
        }

        getPosts();
    }, [])

    return (
        <div className='feed-container'>
            {posts && 
                posts.map((post, idx) => {
                    return(
                        <p key={idx}>Post: {post.content}</p>
                    )
                })}
        </div>
    )
}

export default Feed;