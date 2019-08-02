import firebase from 'firebase';
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyA3tDqGDfOKxve_UX-GAKn71iggS2elt4M",
  authDomain: "mydailyhabit-879ff.firebaseapp.com",
  databaseURL: "https://mydailyhabit-879ff.firebaseio.com",
  projectId: "mydailyhabit-879ff",
  storageBucket: "",
  messagingSenderId: "753464056115",
  appId: "1:753464056115:web:df3dff693b6da1a6"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.collection('habits').get().then(querySnapshot => querySnapshot.forEach(doc => {
  console.log('doc id', doc.id)
  console.log('data', doc.data())
}))

export default db;
