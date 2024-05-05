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
	
  	return (
		<div className="App">
			<NavBar username={username}/>
			<Routes>
				<Route path='/' element={<HomePage/>}>HomePage</Route>
				<Route path='/account' element={<Profile username={username} setUsername={setUsername}/>}>Profile</Route>
				<Route path='/signin' element={<SignIn username={username} setUsername={setUsername}/>}>SignIn</Route>
				<Route path='/collection' element={<Collection/>}>Collection</Route>
			</Routes>
		</div>
  	);
}

export default App;
