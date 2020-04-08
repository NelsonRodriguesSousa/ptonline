import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'
import 'firebase/storage'

const config = { 
  apiKey: "AIzaSyDS2zuIFlBbw0RJIndlUfeaMOUqPZB4UMI",
  authDomain: "ptonline-6f1d0.firebaseapp.com",
  databaseURL: "https://ptonline-6f1d0.firebaseio.com",
  projectId: "ptonline-6f1d0",
  storageBucket: "ptonline-6f1d0.appspot.com",
  messagingSenderId: "1003123906374",
  appId: "1:1003123906374:web:bae1f4d72d290b3a447747"
};


export const fire = firebase.initializeApp(config);
export const firebaseFirestore = firebase.firestore();

 