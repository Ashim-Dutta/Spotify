import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        },
        password: '',
        role: 'user' // Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'firstName' || name === 'lastName') {
            setFormData(prev => ({
                ...prev,
                fullName: {
                    ...prev.fullName,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {

            const response = await axios.post('http://localhost:3000/api/auth/register', {
                email: formData.email,
                fullName: {
                    firstName: formData.fullName.firstName,
                    lastName: formData.fullName.lastName
                },
                password: formData.password,
                role: formData.role
            }, { withCredentials: true })
            
            navigate('/');
            
        } catch (err) {
            console.error("Error during registration",err)
        }
    };

    const handleGoogleRegister = () => {
        window.location.href = 'http://localhost:3000/api/auth/google'
    };

    return (
        <div className="split-layout">
            {/* Visual Side (Left) */}
            <div className="split-visual">
                <div className="split-visual-content">
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Music for everyone.</h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Millions of songs. No credit card needed.</p>
                </div>
            </div>

            {/* Form Side (Right) */}
            <div className="split-form-container">
                <div className="split-form-content">
                    <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Sign Up</h1>

                    <div className="role-selector">
                        <label className="role-option">
                            <input
                                type="radio"
                                name="role"
                                value="user"
                                checked={formData.role === 'user'}
                                onChange={handleChange}
                            />
                            <div className="role-card">
                                <span className="role-icon">🎧</span>
                                <span className="role-label">Fan</span>
                            </div>
                        </label>
                        <label className="role-option">
                            <input
                                type="radio"
                                name="role"
                                value="artist"
                                checked={formData.role === 'artist'}
                                onChange={handleChange}
                            />
                            <div className="role-card">
                                <span className="role-icon">🎙️</span>
                                <span className="role-label">Artist</span>
                            </div>
                        </label>
                    </div>

                    <button type="button" className="btn-google" onClick={handleGoogleRegister}>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="divider">or</div>

                    <form onSubmit={handleSubmit} className="auth-form" style={{ gap: '16px' }}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="name@domain.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="John"
                                    value={formData.fullName.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group" style={{ flex: 1 }}>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Doe"
                                    value={formData.fullName.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary" style={{ marginTop: '16px' }}>Sign Up</button>
                    </form>

                    <p className="auth-footer" style={{ textAlign: 'center' }}>
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
