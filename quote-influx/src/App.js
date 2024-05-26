import logo from './logo.svg';
import './App.css';
import HomePage from './components/home/HomePage.js';
import NavBar from './components/NavBar.js';
import SignIn from './components/signin/SignIn.js';
import Profile from './components/signin/Profile.js';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Collection from './components/collection/Collection.js'
import TimedOutModal from './components/TimedOutModal.js';

function App() {
	const [username, setUsername] = useState("");
    const [error, setError] = useState("");
	
    useEffect(() => {
        const fetchProfile = async () => {
            try{
                const response = await fetch('http://localhost:8000/user/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include"
                })
                if(response.status==200){
                    const json = await response.json();
                    setUsername(json.username);
                }
            } catch(error){
                console.log(error);
            }
        }
        fetchProfile();
    },[]);
	

  	return (
		<div className="App">
			<NavBar username={username}/>
            {error && <TimedOutModal error={error} setError={setError}/>}
			<Routes>
                <Route path='/' element={<HomePage/>}>Homepage</Route>
				<Route path='/account' element={<Profile username={username} setUsername={setUsername} setError={setError}/>}>Profile</Route>
				<Route path='/signin' element={<SignIn username={username} setUsername={setUsername} setError={setError}/>}>SignIn</Route>
				<Route path='/collection' element={<Collection setError={setError}/>}>Collection</Route>
			</Routes>

		</div>
  	);
}

export default App;
