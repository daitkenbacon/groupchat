import React, { useEffect } from 'react'

import { UserContext } from '../../contexts/user-context.jsx';
import { useContext, useState } from 'react';
import { getDocInCollection } from '../../utils/firebase.js';

const HomePage = () => {
  const { currentUser } = useContext(UserContext);
  const [userName, setUserName] = useState('');
  //console.log(currentUser);

  useEffect(() => {
    async function getUserDoc() {
      try {
        const u = await getDocInCollection('users', currentUser.uid);
        setUserName(u.data().displayName);
      } catch(error) {
        console.log(error);
      }
    }

    getUserDoc();
  }, [currentUser])


  return (
    <div>Hello, {currentUser && userName}</div>
  )
}

export default HomePage;