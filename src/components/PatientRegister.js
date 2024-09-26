import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const PatientRegister = ({ onPatientAdded }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [healthIssue, setHealthIssue] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    // List of image URLs
    const images = [
        "https://as2.ftcdn.net/v2/jpg/05/12/30/73/1000_F_512307383_W2J5HmbSfDxyzz38N00hBs2DagDgHDI3.jpg",
        "https://as2.ftcdn.net/v2/jpg/07/53/88/51/1000_F_753885151_OY9RMyqQ7tJwlZ1CJUQbgnnCgPzIp5ws.jpg",
        "https://img.freepik.com/free-photo/patient-with-nasal-oxygen-tube-receiving-consultation-from-doctor-using-stethoscope-heartbeat-exam-medic-consulting-retired-woman-with-disease-while-nurse-assisting-with-tablet_482257-28806.jpg?w=1060&t=st=1726728191~exp=1726728791~hmac=44e27398f9981afad082c98ca6bdd8146dd13a6e654141380eb5450ea794f347",
        "https://as2.ftcdn.net/v2/jpg/01/24/92/83/1000_F_124928348_gmLHtItkKNtTTHiNVN2Fz2WjinAZF1jl.jpg",
        "https://as2.ftcdn.net/v2/jpg/05/53/23/15/1000_F_553231584_LCt7WYuORVw2QQ6BBRNj5w5pTBWCFKO5.jpg",
        "https://as2.ftcdn.net/v2/jpg/06/10/76/49/1000_F_610764986_Ji7Qyh91fLjhzA9fGrMypcq7qgkCWdWZ.jpg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [images.length]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onPatientAdded({ name, age, healthIssue });
        setName('');
        setAge('');
        setHealthIssue('');
        // alert('User registered successfully!'); // Show success alert
        Toastify({
            text: 'User registered successfully!',
            duration: 3000,
            gravity: 'top', 
            position: 'center', 
            backgroundColor: 'green',
        }).showToast();
    };

    const handleViewList = () => {
        navigate('/patientList');
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Registration Form Section */}
                <div className="col-md-6">
                    <h2 className="text-center">Register Patient</h2>
                    <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input 
                                type="text" 
                                id="name" 
                                className="form-control" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age:</label>
                            <input 
                                type="number" 
                                id="age" 
                                className="form-control" 
                                value={age} 
                                onChange={(e) => setAge(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="healthIssue" className="form-label">Health Issue:</label>
                            <input 
                                type="text" 
                                id="healthIssue" 
                                className="form-control" 
                                value={healthIssue} 
                                onChange={(e) => setHealthIssue(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Register Patient</button>
                        <button type="button" className="btn btn-secondary w-100 mt-3" onClick={handleViewList}>
                            View Patient List
                        </button>
                    </form>
                </div>

                {/* Image Section */}
                <div className="col-md-6">
                    <h2 className="text-center">Our Services</h2>
                    <div className="image-display">
                        <img src={images[currentImageIndex]} alt={`Hospital ${currentImageIndex + 1}`} className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientRegister;
