// src/services/authService.js
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const TOKEN_KEY = 'authToken';

const mockUser = {
    email: 'testuser@gmail.com',
    password: 'Password@123',
};

export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === mockUser.email && password === mockUser.password) {
                const token = 'mockToken'; // Simulate a token
                localStorage.setItem(TOKEN_KEY, token); // Store token in local storage
                resolve({ success: true });
            } else {
                Toastify({
                    text: 'Invalid email or password',
                    duration: 3000,
                    gravity: 'top',
                    position: 'center',
                    backgroundColor: 'red',
                }).showToast();
                reject(new Error('Invalid email or password'));
            }
        }, 500);
    });
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY); // Remove token on logout
};

export const isAuthenticated = () => {
    return !!localStorage.getItem(TOKEN_KEY); // Check if the token exists
};
