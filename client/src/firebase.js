import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBGeUF4ym3SMulzD7dDY9g_d_8dl5i08zo",
  authDomain: "todo-list-397c8.firebaseapp.com",
  databaseURL: "https://todo-list-397c8.firebaseio.com",
  projectId: "todo-list-397c8",
  storageBucket: "",
  messagingSenderId: "280226378240"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
