import React, { useEffect } from "react";

import "./home-page.css";

import { UserContext } from "../../contexts/user-context.jsx";
import { useContext, useState } from "react";
import { getDocInCollection } from "../../utils/firebase.js";
import { Typography } from "@mui/material";
import Feed from "../../components/Feed/feed";

const HomePage = () => {
  const { currentUser } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  //console.log(currentUser);

  useEffect(() => {
    async function getUserDoc() {
      try {
        if (currentUser) {
          const u = await getDocInCollection("users", currentUser.uid);
          setUserName(u.data().displayName);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getUserDoc();
  }, [currentUser]);

  return (
    <div className="home-container">
      <Typography variant="h2">Hello, {currentUser && userName}</Typography>
      <Feed />
    </div>
  );
};

export default HomePage;
