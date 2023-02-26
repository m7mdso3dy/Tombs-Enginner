import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  doc,
} from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyDWspWxgzLe9DFKJE2-MgKS0PYEdIvr6FM",
  authDomain: "tombeng-9f0f4.firebaseapp.com",
  projectId: "tombeng-9f0f4",
  storageBucket: "tombeng-9f0f4.appspot.com",
  messagingSenderId: "906645806008",
  appId: "1:906645806008:web:6c74d9cd794e8caafa4d4d",
};
// init app
export const getSavedTombs = () => {
  return new Promise((reslove, rej) => {
    initializeApp(firebaseConfig);
    let Tombs = [];
    const db = getFirestore();
    const colRef = collection(db, "Tombs");
    getDocs(colRef).then((res) => {
      Tombs = res.docs.map((tomb) => ({ ...tomb.data(), id: tomb.id }));
      console.log("data", res, Tombs);
      reslove(JSON.parse(JSON.stringify(Tombs)));
    });
  });
};
export const updateTombs = (newTombs, oldTombs) => {
  const db = getFirestore();
  const colRef = collection(db, "Tombs");
  if (oldTombs.length > 0) {
    oldTombs.forEach((tomb, i) => {
      const docRef = doc(db, "Tombs", tomb.id);
      deleteDoc(docRef);
    });
  }
  oldTombs = [];
  newTombs.forEach((tomb) => {
    addDoc(colRef, {
      title: tomb.title,
      adress: tomb.adress,
      description: tomb.description,
      images: JSON.parse(JSON.stringify(tomb.images)),
    }).then((res) => {
      console.log(res);
    });
  });
  let Tombs;
  getDocs(colRef).then((res) => {
    Tombs = res.docs.map((tomb) => ({ ...tomb.data(), id: tomb.id }));
  });
};
