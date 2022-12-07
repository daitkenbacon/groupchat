import React, { useEffect } from 'react'

import './home-page.scss'

import { UserContext } from '../../contexts/user-context.jsx';
import { useContext, useState } from 'react';
import { getDocInCollection } from '../../utils/firebase.js';
import { Typography } from '@mui/material';

import Feed from '../../components/Feed/feed';
import NewPostButton from '../../components/NewPostButton/new-post-button';
import NewPostModal from '../../components/NewPostModal/new-post-modal';

const HomePage = () => {
  const { currentUser } = useContext(UserContext);
  const [userName, setUserName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  //console.log(currentUser);

  const handleOpenModal = (event) => {
    setIsModalOpen((isModalOpen) => isModalOpen=true);
  }

  const handleCloseModal = (event) => {
    setIsModalOpen((isModalOpen) => isModalOpen=false);
  }

  useEffect(() => {
    async function getUserDoc() {
      try {
        if(currentUser){
          const u = await getDocInCollection('users', currentUser.uid);
          setUserName(u.data().displayName);
        }
      } catch(error) {
        console.log(error);
      }
    }

    getUserDoc();
  }, [currentUser])

  return (
    <div className='home-container'>
      <Typography variant='h2'>
        Hello, {currentUser && userName}
      </Typography>
      <Feed sx={{mt: '500px'}} />
      <NewPostButton handleOpen={handleOpenModal}/>
      {isModalOpen &&
        <NewPostModal currentUser={currentUser} isOpen={isModalOpen} handleClose={handleCloseModal}/>
      }
    </div>
  )
}

export default HomePage;