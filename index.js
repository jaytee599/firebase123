// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"; //firebase database
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLXCIw8SlHO_xEY4kOu477WkZ3PNVwcXo",
  authDomain: "jaytee-cff0e.firebaseapp.com",
  databaseURL: "https://jaytee-cff0e-default-rtdb.firebaseio.com",
  projectId: "jaytee-cff0e",
  storageBucket: "jaytee-cff0e.appspot.com",
  messagingSenderId: "633978888287",
  appId: "1:633978888287:web:d7a9472c1c2e68b13abbea",
  measurementId: "G-RDYCLJNRYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase();

const messages = ref(database, "messages"); //create reference to messages collection and specify the string of which data we want

onValue(
  messages,
  (snapshot) => {
    console.log(snapshot);

    const ul = document.getElementById("messages");

    ul.replaceChildren(); //reset and clear list before anything in database changes so it wont continue to add on to the list with repeated values

    snapshot.forEach((childSnapShot) => {
      console.log(childSnapShot.key);
      console.log(childSnapShot.val());

      const childData = childSnapShot.val();

      const text = document.createTextNode(
        childData.message + " ~ " + childData.name
      );
      const li = document.createElement("li");

      li.appendChild(text);
      ul.appendChild(li);
    });
  } //copy of the messages data at the time of the event
); //this function will run everytime it receives a database (once data changes and is fetched)