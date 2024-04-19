import 'firebase/firestore';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { getAuth } from '@angular/fire/auth';
import getuth from 'firebase/auth';
import { getStorage } from '@angular/fire/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyB6aHpK2QYfGcRBlUqNMiMd9HKCa1eD-VQ',
  authDomain: 'phile-2f3ba.firebaseapp.com',
  projectId: 'phile-2f3ba',
  storageBucket: 'phile-2f3ba.appspot.com',
  messagingSenderId: '752857531424',
  appId: '1:752857531424:web:f63b06a423fbe491d56845',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const imageRef = storage.ref();
