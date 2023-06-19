import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';

function SignupComponent() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            return setError('Fill the empty inputs');
        }

        try {
            const response = await axios.post('http://localhost:4000/signup', {
                username: username,
                email: email,
                password: password
            });

            setError('')
            navigate('/')
            console.log(response.data);

        } catch (err) {
            setError('Error. Please try again!')
            console.log('error', err);
        }

        // Reset form fields
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const signIn = () => {
        return (
            navigate('/')
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" style={{ marginTop: '10px' }}  className="btn btn-primary">Sign Up</button>

            </form>
            <button onClick={signIn} style={{ marginTop: '10px' }} className="btn btn-primary">Sign In</button>
        </div>
    );
}

export default SignupComponent;
