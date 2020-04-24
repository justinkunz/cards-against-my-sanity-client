import Firebase from 'firebase'
const config = {
    apiKey: "AIzaSyCQun4Edp3cAODskUNQjs8pCFAhDUWKVPU",
    authDomain: "cards-against-humanity-online.firebaseapp.com",
    databaseURL: "https://cards-against-humanity-online.firebaseio.com",
    projectId: "cards-against-humanity-online",
    storageBucket: "cards-against-humanity-online.appspot.com",
    messagingSenderId: "3963630133",
    appId: "1:3963630133:web:108d9df46b0b2c0435377c",
    measurementId: "G-3F03CESPQM"
  };
  
const app = Firebase.initializeApp(config);
export const db = app.database();