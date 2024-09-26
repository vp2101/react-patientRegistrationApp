import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PatientRegister from './components/PatientRegister';
import PatientList from './components/PatientList';
import About from './components/About';
import ContactUs from './components/ContactUs';
import { logout, isAuthenticated } from './services/authService'; // Import the auth functions
import 'bootstrap/dist/css/bootstrap.min.css'; 
import appIcon from './assets/registration.png'; 
import './Navbar.css'; 

const Navbar = ({ onLogout }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/';

    if (isLoginPage) {
        return null; // Don't render the navbar on the login page
    }

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#0d6efd' }}>
            <Link className="navbar-brand text-white" to="/about">
                <img src={appIcon} alt="App Icon" style={{ width: '50px', marginRight: '10px' }} />
                Patient Registration App
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/registerPatient">Register Patient</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/patientList">List Patient</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/contactus">Contact Us</Link>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link logout-button" onClick={onLogout}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/" />;
};

const App = () => {
    const [patients, setPatients] = useState([]);

    const handlePatientAdded = (patient) => {
        setPatients([...patients, patient]);
    };

    const handleEditPatient = (index, updatedPatient) => {
        const updatedPatients = patients.map((patient, i) =>
            i === index ? updatedPatient : patient
        );
        setPatients(updatedPatients);
    };

    const handleDeletePatient = (index) => {
        const updatedPatients = patients.filter((_, i) => i !== index);
        setPatients(updatedPatients);
    };

    const handleLogout = () => {
        logout();
        window.location.href = '/'; // Redirect to login page
    };

    return (
        <Router>
            <Navbar onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/registerPatient" element={<ProtectedRoute element={<PatientRegister onPatientAdded={handlePatientAdded} />} />} />
                <Route path="/patientList" element={<ProtectedRoute element={<PatientList patients={patients} onEditPatient={handleEditPatient} onDeletePatient={handleDeletePatient} />} />} />
                <Route path="/about" element={<ProtectedRoute element={<About />} />} />
                <Route path="/contactus" element={<ProtectedRoute element={<ContactUs />} />} />
            </Routes>
        </Router>
    );
};

export default App;
