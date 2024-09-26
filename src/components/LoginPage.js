import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import './LoginPage.css';

const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "aol.com",
    "protonmail.com",
    "zoho.com",
    "yandex.com",
    "mail.com",
    "gmx.com",
    "icloud.com",
    "fastmail.com",
    "tutanota.com",
    "mail.ru",
    "hushmail.com",
    "airmail.net",
    "lycos.com",
    "netcourrier.com",
    "zimbra.com",
    "rediffmail.com",
    "mailinator.com",
];

const isValidPassword = (str) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(str);
};

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();



    const handleLogin = async (e) => {
        e.preventDefault();

        const domain = email.split('@')[1];
        if (!allowedDomains.includes(domain)) {
            setError('Email domain is not allowed. Please use a valid domain.');
            return;
        }

        if (!isValidPassword(password)) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.');
            return;
        }

        try {
            await login(email, password);
            navigate('/registerPatient');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
                <div className="login-form">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={handleLogin} className="border p-4 rounded shadow">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="form-control" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input 
                                type="password" 
                                id="password" 
                                className="form-control" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
            <div className="col-md-6 d-none d-md-block">
                <img 
                    src="https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Login image" 
                    className="w-100 vh-100" 
                    style={{ objectFit: 'cover', objectPosition: 'left' }} 
                />
            </div>
        </div>
    </div>
    );
};

export default LoginPage;
