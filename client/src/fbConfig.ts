import firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';
import 'firebase/firestore';

// Firebase configuration
let firebaseConfig: any = {
  apiKey: 'AIzaSyAuq8KSe5pyxqEH8n4GbFcfXHw8RlmFg6U',
  authDomain: 'its-cngei-genova.firebaseapp.com',
  databaseURL: 'https://its-cngei-genova.firebaseio.com',
  projectId: 'its-cngei-genova',
  storageBucket: 'its-cngei-genova.appspot.com',
  messagingSenderId: '495221747451',
  appId: '1:495221747451:web:5103d956f7c62972ee0a5e',
  measurementId: 'G-EET24DJPS5'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = firebase.firestore();

export const auth = firebase.auth();
export const functions = firebase.app().functions('europe-west2');

if (window.location.hostname === 'localhost') {
  functions.useFunctionsEmulator('http://localhost:5001');
}
