import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDkKIJTbC6bunOlpEHhylHvVHN3phovGns",
    authDomain: "web-scraper-263b9.firebaseapp.com",
    projectId: "web-scraper-263b9",
    storageBucket: "web-scraper-263b9.appspot.com",
    messagingSenderId: "968184062275",
    appId: "1:968184062275:web:e8ff33979037274f604ff6"
  };

  // SI no hay apps inicializadas, optiene una app y la ininicializa con los nuevos credenciales.
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export { db }; 