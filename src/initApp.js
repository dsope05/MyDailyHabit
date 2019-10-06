import db from '../config';

const initApp = (uid) => {
  const userRef = db.collection('habits').doc(uid);
  return userRef.get().then((doc) => {
    if (doc.exists) {
      console.log('Document data:', doc.data()); 
      console.log('doc id', doc.id)
      console.log('data', doc.data())
      return doc.data();
    }
    console.log('No init Document');
  });
};

export default initApp;
