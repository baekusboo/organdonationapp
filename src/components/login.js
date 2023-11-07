import React, { useState } from 'react';
import './styles.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase authentication methods
import { database } from '../firebase';
import { ref, push, child, update } from 'firebase/database';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleLogin = async () => {
        try {
            const auth = getAuth(); // Get the authentication instance

            // Authenticate the user with the provided email and password
            await signInWithEmailAndPassword(auth, email, password);

            setIsSubmitted(true);
            setAlertMessage('Login successful!');
        } catch (error) {
            console.error('Error during login:', error);
            setIsSubmitted(true);
            setAlertMessage('Login failed. Please check your credentials.');
        }
    }

    return (
        <div className="form">
            <div className="title">
            <h4>LOGIN</h4>
            </div>
            <div className="form-body">
                <div className="email">
                    <label className="form__label" htmlFor="email">Email </label>
                    <input type="email" id="email" className="form__input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="password">
                    <label className="form__label" htmlFor="password">Password </label>
                    <input className="form__input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
            </div>
            <div className="footer">
                <button onClick={handleLogin} type="submit" className="btn-dark">Login</button>
                {isSubmitted && <div className="alert">{alertMessage}</div>}
            </div>
        </div>
    )
}

export default Login;
