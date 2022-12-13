import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import PocketBase from 'pocketbase'

async function authenticate() {
    const USERNAME = "tummeito@csu.fullerton.edu";
    const PASSWORD = "cpsc349project4";
    const pb = new PocketBase("http://127.0.0.1:8090");
    const authData = await pb.admins.authWithPassword(USERNAME, PASSWORD);
}

authenticate();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);


