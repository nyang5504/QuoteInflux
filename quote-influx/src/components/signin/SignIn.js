import React, { useState } from 'react';

const SignIn = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [signup, setSignUp] = useState(false);

	const handleSignIn = async (e) => {
		e.preventDefault();

		try {
			// Send sign-in request to server
			const response = await fetch('http://localhost:8000/user/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				throw new Error('Sign-in failed');
			}

			// Sign-in successful
			console.log('Sign-in successful');
		} catch (error) {
			setError('Invalid username or password');
		}
	};

	const handleCreateAccount = async (e) => {
		e.preventDefault();
		if(password!=confirmPassword) {
            console.log("Passwords don't match");
			return;	
		}
		try {
			const response =  await fetch('http://localhost:8000/user/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			})
			if (response.ok) {
				const userToken = await response.json();
				
				document.cookie = `token=${userToken}; path=/`;
				// Sign-in successful
				console.log('Sign-up successful');
			}
		}
		catch (error) {
			console.error('Error:', error.message);
		}
	}

	return (
		<form onSubmit={signup ? handleCreateAccount : handleSignIn}>
			<div>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			{signup &&
			<div>
				<label htmlFor="confirm">Confirm Password:</label>
				<input
					type="password"
					id="confirm-password"
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</div>
			}
			{error && <div>{error}</div>}
			<div onClick={() => setSignUp(!signup)}>{signup ? "Sign In" : "Sign Up"}</div>
			<button type="submit">{signup ? "Sign Up" : "Sign In"}</button>
		</form>
	);
};

export default SignIn;