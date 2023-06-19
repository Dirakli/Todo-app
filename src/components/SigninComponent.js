import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';

const SigninComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();
        }

        try {
            const response = await axios.post('http://localhost:4000/signin', {
                email: email,
                password: password
            });


            navigate('/todos')
            console.log(response.data);
        } catch (err) {
            console.log('error', err);
        }

        setEmail('');
        setPassword('');
    };

    const signUp = () => {
        return (
            navigate('/signup')
        )
    }

    return (
        <div >
            <form onSubmit={handleSubmit}>
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

                <button type="submit" style={{ marginTop: '10px' }} className="btn btn-primary">Log In</button>

            </form>
            <button onClick={signUp} style={{ marginTop: '10px' }} className="btn btn-primary">Sign Up</button>
        </div>

    );
};

export default SigninComponent;
