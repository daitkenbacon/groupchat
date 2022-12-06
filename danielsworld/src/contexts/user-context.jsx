import { getDoc } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getDocInCollection,
} from "../utils/firebase.js";

//actual value i want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  userName: "",
  setUserName: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("");
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      //cleanup at end of stream
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user); //listener either returns null or a user-- whether logged in, signing out, or default. Can set it here since listener is active to help performance
    });

    return unsubscribe; //stop listening when unmounted
  }, []);

  //   useEffect(() => {
  //     if(currentUser){
  //         async function getUserDoc() {
  //           try {
  //             const u = await getDocInCollection('users', currentUser.uid);
  //             setUserName(u.data().displayName);
  //           } catch(error) {
  //             console.log(error);
  //           }
  //         }

  //         getUserDoc();
  //     }
  //   }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
