// Import the functions you need from the SDKs you need
import { initializeApp }                                                              from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }        from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FBAPIKEY,
  authDomain: process.env.REACT_APP_FBAUTHDOM,
  projectId: "bankcapstone-cbec0",
  storageBucket: "bankcapstone-cbec0.appspot.com",
  messagingSenderId: "122250841258",
  appId: process.env.REACT_APP_FBAPPID,
  measurementId: "G-D5X614YMDT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export function FbSignup(email, password) {
  const auth = getAuth(app);

  return new Promise((resolve, reject) =>{
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      //Signed Up
      const user = userCredential.user;
      resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject({errorCode, errorMessage});
      })
  })
}