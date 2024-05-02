import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./SignIn.module.css";

const SignIn = ({username, setUsername}) => {
	const navigate = useNavigate();
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
			navigate('/');
		} catch (error) {
			setError('Invalid username or password');
		}
	};

	const handleCreateAccount = async (e) => {
		e.preventDefault();
		if(password!==confirmPassword) {
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
				console.log('Sign-up successful');
			}
		}
		catch (error) {
			console.error('Error:', error.message);
		}

		setUsername('');
		setPassword('');
		setConfirmPassword('');
	}

	return (
		<div className={styles.formContainer}>
			<form className={signup? styles.signup : styles.signin} onSubmit={signup ? handleCreateAccount : handleSignIn}>
				<div className={styles.titleContainer}>
					{signup?
						<div>
							Sign Up To Get Started
						</div> :
						<div>
							Log In To Get Started
						</div>
					}
				</div>
				<div className={styles.inputAreaContainer}>
					<div className={styles.inputLabelContainer}>
						<div className={styles.labelContainer}>
							<label htmlFor="username">Username:</label>
						</div>
						<div className={styles.inputContainer}>
							<input
								value={username}
								type="text"
								id="username"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
					</div>

					<div className={styles.inputLabelContainer}>
						<div className={styles.labelContainer}>
							<label htmlFor="password">Password:</label>
						</div>
						<div className={styles.inputContainer}>
							<input
								value={password}
								type="password"
								id="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<div className={styles.inputLabelContainer}>
						<div className={styles.labelContainer}>
							{signup && <label htmlFor="confirm-password">Confirm Password:</label>}
						</div>
						<div className={styles.inputContainer}>
							{signup && 
								<input
									value={confirmPassword}
									type="password"
									id="confirm-password"
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							}
						</div>
					</div>
				</div>
				{error && <div>{error}</div>}
				<div className={styles.buttonsContainer}>
					<button type="submit">{signup ? "Sign Up" : "Sign In"}</button>
					<label className={styles.toggleSwitch}>
						<span className={styles.leftSwitch}>Sign In</span>
						<input type='checkbox' onChange={() => setSignUp(!signup)}></input>
						<span className={styles.slider}></span>
						<span className={styles.rightSwitch}>Sign Up</span>
					</label>
					
				</div>
				
			</form>
		</div>
		
	);
};

export default SignIn;