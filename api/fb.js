// Import the functions you need from the SDKs you need
import { initializeApp }                                                              from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }        from 'firebase/auth';
import 'dotenv/config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FBAPIKEY,
  authDomain: process.env.FBAUTHDOM,
  projectId: "bankcapstone-cbec0",
  storageBucket: "bankcapstone-cbec0.appspot.com",
  messagingSenderId: "122250841258",
  appId: process.env.FBAPPID,
  measurementId: "G-D5X614YMDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export function fbSignup(email, password) {
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