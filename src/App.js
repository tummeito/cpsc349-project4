import PocketBase from 'pocketbase';
import GamePage from './components/GamePage.jsx';
import { useState } from 'react';
import './App.css';
import "./style/main.css"


const USERNAME = "tummeito@csu.fullerton.edu";
const PASSWORD = "cpsc349project4";
const pb = new PocketBase("http://127.0.0.1:8090");

export default function App(){

  // If you want a more detailed explanation of what the hell this is then look inside of GamePage.jsx line 19 OR just search up what it is
  const [loggedIn, setLoggedIn] = useState(false);

  async function logIn() {
    // TODO: Add the pocketbase login to validate there is an account.
    const authData = await pb.admins.authWithPassword(USERNAME, PASSWORD)
    console.log(authData);
    let isValidLogIn = pb.authStore.isValid ? (true ? setLoggedIn(true) : setLoggedIn(false)) : false;
    console.log(isValidLogIn);
    // console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model.id);
    pb.authStore.clear();
  }

  async function setScores() {
    await pb.admins.authWithPassword(USERNAME, PASSWORD);

    const collection = await pb.collections.create({
      name: 'scores',
      type: 'base',
      schema: [
          {
              name: 'win_scores',
              type: 'number',
              required: true,
          },
          {
              name: 'lose_scores',
              type: 'number',
              required: true,
          },
          {
            name: 'usr_email',
            type: 'email',
            required: true,
          },
      ],
    });

    
  }
  setScores();

  return (
    <div className="text-center bg-slate-700">
      <header>
        <h1 className="flex justify-center mx-8 text-black text-8xl md:text-5xl">
          ROCK, PAPER, SCISSORS
        </h1>
      </header>
      {/* This crazy ass syntax i have here is called a ternary operator. It is the only way to write if/else statements inside of JSX */}
      {!loggedIn ? 
        // TODO: Make a new component for the login page, replace the junk I created below with it
        <div>
          <h1>log in :</h1>
          <button onClick={()=> {logIn()}}>click to log in</button>
        </div>
      : 
        // TODO: FETCH FROM POCKETBASE TO GET THE USERS W/L SCORES AND REPLACE THE 0 BELOW WITH IT 
        <GamePage pScore={0} oScore={0}/>
      }
    </div>
  );
}
