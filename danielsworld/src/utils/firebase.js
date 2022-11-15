// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  addDoc,
  updateDoc,
} from 'firebase/firestore';

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCB_IixloSfqLtNAu2DWiBSw66567LjsIQ",
  authDomain: "daniels-world-excercise.firebaseapp.com",
  projectId: "daniels-world-excercise",
  storageBucket: "daniels-world-excercise.appspot.com",
  messagingSenderId: "989131411711",
  appId: "1:989131411711:web:d27b0394c97a7830adfcca",
  measurementId: "G-BD3E86D595"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
  
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const createDocInCollection = async (objectToAdd, collectionToPut) => {
  const col = await collection(db, collectionToPut);
  const docRef = await addDoc(col, objectToAdd);

  //logs the doc ID as an object field
  const res = await updateDoc(docRef,{id: docRef.id})

  return res;
}

export const getDocsInCollection = async (collectionToGetFrom) => {
  try {
    const colRef = collection(db, collectionToGetFrom);
    const docsSnap = await getDocs(colRef);
    const tournaments = [];
    docsSnap.docs.forEach((doc) => {
      tournaments.push(doc.data());
    })

    return tournaments;

  } catch(error) {
    console.log(error);
  }
}

export const getDocInCollection = async (collectionToGetFrom, docId) => {
  try {
    const docRef = await doc(db, collectionToGetFrom, docId);
    const docSnap = await getDoc(docRef);
    if(!docSnap){
      console.log("No such document exists.")
      return;
    }
    return docSnap;
  } catch(error) {
    console.log(error);
  }
}