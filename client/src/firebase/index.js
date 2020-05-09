import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBxy2wS4OBH_lgbonyUo4el02tw0E_05bc",
  authDomain: "chopsticks-248516.firebaseapp.com",
  databaseURL: "https://chopsticks-248516.firebaseio.com",
  projectId: "chopsticks-248516",
  storageBucket: "chopsticks-248516.appspot.com",
  messagingSenderId: "40199760298",
  appId: "1:40199760298:web:58e195ce2361f6c1e823d3",
  measurementId: "G-BEYZER79QH"
};

firebase.initializeApp(firebaseConfig);

if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_ENV !== 'release') {
  firebase.analytics(); 
}

export default firebase;