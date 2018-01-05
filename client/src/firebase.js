import firebase from 'firebase';
// put firebase api key in from .env



var config = {
  apiKey: '${FirebaseAPI}',
  authDomain: "bonebuds-6ba21.firebaseapp.com",
  databaseURL: "https://bonebuds-6ba21.firebaseio.com",
  projectId: "bonebuds-6ba21",
  storageBucket: "",
  messagingSenderId: "715752729684"
};
firebase.initializeApp(config);
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({
  prompt: 'select_account'
});
export const auth = firebase.auth();
export default firebase;