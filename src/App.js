import PocketBase from 'pocketbase';
import GamePage from './components/GamePage.jsx';
import { useState } from 'react';
import './App.css';
import "./style/main.css"

export default function App() {

  // If you want a more detailed explanation of what the hell this is then look inside of GamePage.jsx line 19 OR just search up what it is
  const [loggedIn, setLoggedIn] = useState(false);

  function logIn() {
    // TODO: Add the pocketbase login to validate there is an account.
    setLoggedIn(true);
  }

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
          <h1>log in :)</h1>
          <button onClick={()=> {logIn()}}>click to log in</button>
        </div>
      : 
        // TODO: FETCH FROM POCKETBASE TO GET THE USERS W/L SCORES AND REPLACE THE 0 BELOW WITH IT 
        <GamePage pScore={0} oScore={0}/>
      }
    </div>
  );
}
