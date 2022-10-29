import { getApp, getApps, initializeApp } from "firebase/app";
   
export function getFirebaseApp(){
    if (getApps.length === 0) {
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyAYRbTPjYaCBHnlc4688gCwU1EKFWY4-kk",
            authDomain: "redditportfolio.firebaseapp.com",
            projectId: "redditportfolio",
            storageBucket: "redditportfolio.appspot.com",
            messagingSenderId: "351485176489",
            appId: "1:351485176489:web:52520bc229603ac33a17b8",
            measurementId: "G-T5SV2ZN997"
        };
    
        // Initialize Firebase
        return initializeApp(firebaseConfig);
    } else {
        return getApp();
    }
}