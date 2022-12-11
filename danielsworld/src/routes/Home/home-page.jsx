import React, { useEffect, useCallback } from 'react'

import './home-page.scss'

import { UserContext } from '../../contexts/user-context.jsx';
import { useContext, useState } from 'react';
import { getDocInCollection, getDocsInCollection } from '../../utils/firebase.js';
import { Typography } from '@mui/material';

import Feed from '../../components/Feed/feed';
import NewPostButton from '../../components/NewPostButton/new-post-button';
import NewPostModal from '../../components/NewPostModal/new-post-modal';

const HomePage = () => {
  const { currentUser } = useContext(UserContext);
  const [userName, setUserName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  //console.log(currentUser);

  const handleOpenModal = (event) => {
    setIsModalOpen((isModalOpen) => isModalOpen=true);
  }

  const handleCloseModal = (event) => {
    setIsModalOpen((isModalOpen) => isModalOpen=false);
  }

  const getUserDoc = useCallback(async () => {
    try {
        if(currentUser){
          const u = await getDocInCollection('users', currentUser.uid);
          setUserName(u.data().displayName);
        }
      } catch(error) {
        console.log(error);
      }
  }, [currentUser])

  useEffect(() => {
    getUserDoc();
    console.log('get user doc');
  }, [getUserDoc])

  const fetchPosts = useCallback(async () => {
    console.log('get posts');
    const p = await getDocsInCollection("posts");
    setPosts(p);
  }, [posts, setPosts])

  

  useEffect(() => {
    fetchPosts();
    console.log('get posts');
  }, []);

  return (
    <div className='home-container'>
      <Typography variant='h2'>
        Hello, {currentUser && userName}
      </Typography>
      <Feed posts={posts} fetchPosts={fetchPosts} currentUser={currentUser} sx={{mt: '500px'}} />
      <NewPostButton handleOpen={handleOpenModal}/>
      {isModalOpen &&
        <NewPostModal fetchPosts={fetchPosts} currentUser={currentUser} isOpen={isModalOpen} handleClose={handleCloseModal}/>
      }
    </div>
  )
}

export default HomePage;