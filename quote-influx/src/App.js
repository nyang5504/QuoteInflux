import logo from './logo.svg';
import './App.css';
import HomePage from './components/home/HomePage.js';
import NavBar from './components/NavBar.js';
import SignIn from './components/signin/SignIn.js';
import Profile from './components/signin/Profile.js';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Collection from './components/collection/Collection.js'

function App() {
	const [username, setUsername] = useState("");

	useEffect(()=>{
		const fetchToken = async() => {
			try {
				const response = await fetch('http://localhost:8000/user/signintoken', {
					method: 'Post',
					credentials: "include",
					headers: {
						'Content-Type': 'application/json',
						// 'Access-Control-Allow-Credentials': true,
					}
				});
				if(response.ok) {
					console.log("Token authorized");
				} else {
					console.log("Token 401");
				}
			} catch (error) {
				console.log("Error: " + error);
			}
		}
		fetchToken();
	}, []);
	
  	return (
		<div className="App">
			<NavBar username={username}/>
			<Routes>
				<Route path='/' element={<HomePage/>}>HomePage</Route>
				<Route path='/account' element={<Profile username={username}/>}>Profile</Route>
				<Route path='/signin' element={<SignIn username={username} setUsername={setUsername}/>}>SignIn</Route>
				<Route path='/collection' element={<Collection/>}>Collection</Route>
			</Routes>
		</div>
  	);
}

export default App;
