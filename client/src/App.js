import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebaseConfig"; /* Create this file */
const firebaseApp = firebase.initializeApp(firebaseConfig);

const client = axios.create({
  baseURL: "http://localhost:3001",
  json: true
});

function App() {
  const [response, updateResponse] = useState("");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [authStatus, updateAuthStatus] = useState(false);

  useEffect(() => {
    // Listen to changes on the firebase authentication state
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        updateAuthStatus(true);
      } else {
        updateAuthStatus(false);
      }
    });
  }, []);

  const sendServerRequest = () => {
    if (firebase.auth().currentUser) {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          client({
            method: "get",
            url: "/",
            headers: {
              AuthToken: idToken
            }
          })
            .then(res => updateResponse(res.data.message))
            .catch(error => updateResponse(`Error getting data! ${error}`));
        })
        .catch(error => updateResponse(`Error getting auth token! ${error}`));
    } else {
      updateResponse("You are not signed in");
    }
  };

  const register = () => {
    // Firebase can do a lot of validation for us, but we'll stop empty fields from being sent
    if (email.length === 0 || password.length === 0) {
      updateResponse("Please enter a username and password");
    } else {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => updateResponse("User created & signed in"))
        .catch(error => updateResponse(error.message));
    }
  };

  const signIn = () => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => updateResponse(""))
      .catch(() => updateResponse("Email or password incorrect"));
  };

  const logOut = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        updateEmail("");
        updatePassword("");
        updateResponse("");
      });
  };

  return (
    <main>
      <h2>Firebase Authentication Example</h2>
      <h3>React & Express</h3>
      <div className="status_box">
        <div className="status_box__info">
          <span className="bold">Authentication status: </span>
          <span>{authStatus ? "Signed in" : "Logged out"}</span>
        </div>
        <div className="status_box__info">
          <span className="bold">Response:</span>
          <p>{response}</p>
        </div>
        <button onClick={() => sendServerRequest()}>
          Request data from server
        </button>
      </div>

      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={input => updateEmail(input.target.value)}
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={input => updatePassword(input.target.value)}
        ></input>
      </form>

      <button disabled={!authStatus} onClick={() => logOut()}>
        Log Out
      </button>
      <button onClick={() => register()}>Register</button>
      <button disabled={authStatus} onClick={() => signIn()}>
        Sign in
      </button>
    </main>
  );
}

export default App;
