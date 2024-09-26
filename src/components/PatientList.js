import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css'; 

const PatientList = ({ patients, onEditPatient, onDeletePatient }) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const [editPatient, setEditPatient] = useState({ name: '', age: '', healthIssue: '' });
    const [isEditing, setIsEditing] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage, setPatientsPerPage] = useState(10);
    
    const navigate = useNavigate();

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditPatient(patients[index]);
        setIsEditing(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditPatient(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = () => {
        onEditPatient(editingIndex, editPatient);
        Toastify({
            text: 'Record updated successfully!',
            duration: 3000,
            gravity: 'top',
            position: 'center',
            backgroundColor: 'green',
        }).showToast();
        setEditingIndex(null);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setIsEditing(false);
    };

    const handleBack = () => {
        navigate('/registerPatient');
    };

    const totalPatients = patients.length;
    const totalPages = Math.ceil(totalPatients / patientsPerPage);
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

    const handlePatientsPerPageChange = (e) => {
        setPatientsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page
    };

    const handleDelete = (index) => {
        onDeletePatient(index);
            Toastify({
                text: 'Patient deleted successfully!',
                duration: 3000,
                gravity: 'top',
                position: 'center',
                backgroundColor: 'red',
            }).showToast();
        // }
    };

    return (
        <div className="container mt-5">
            <button className="btn btn-secondary mb-3" onClick={handleBack}>Back to Register</button>

            <div className="mb-3">
                <label htmlFor="patientsPerPage" className="form-label">Patients per Page:</label>
                <select id="patientsPerPage" className="form-select" value={patientsPerPage} onChange={handlePatientsPerPageChange}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd' }}>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Health Issue</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPatients.map((patient, index) => (
                            <tr key={index}>
                                <td>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>{patient.healthIssue}</td>
                                <td>
                                    <button className="btn btn-warning me-2" onClick={() => handleEdit(index)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(index)} disabled={isEditing}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-between mt-4">
                <button 
                    className="btn btn-secondary"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    className="btn btn-secondary"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {/* Modal for Editing Patient */}
            {isEditing && (
                <div className="modal" style={{ display: 'block', position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="modal-dialog" style={{ margin: '100px auto' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Patient</h5>
                                <button className="btn-close" onClick={handleCancelEdit}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="editName" className="form-label">Name:</label>
                                    <input
                                        type="text"
                                        id="editName"
                                        name="name"
                                        className="form-control"
                                        value={editPatient.name}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editAge" className="form-label">Age:</label>
                                    <input
                                        type="number"
                                        id="editAge"
                                        name="age"
                                        className="form-control"
                                        value={editPatient.age}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editHealthIssue" className="form-label">Health Issue:</label>
                                    <input
                                        type="text"
                                        id="editHealthIssue"
                                        name="healthIssue"
                                        className="form-control"
                                        value={editPatient.healthIssue}
                                        onChange={handleEditChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success me-2" onClick={handleSaveEdit}>Save</button>
                                <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientList;
