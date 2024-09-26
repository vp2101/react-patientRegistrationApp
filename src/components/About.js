import React from 'react';

const About = () => {
    return (
        <div className="container mt-5">
                { <div className="container mt-5">
                    <h2>About</h2>
                    <p>Welcome to the Patient Registration App, a user-friendly platform designed to streamline the process of managing patient information. Our app allows healthcare providers to efficiently register new patients, maintain an up-to-date list of existing patients, and easily edit or delete patient records as needed.</p>
                    
                    <h3>Mission</h3>
                    <p>Our mission is to enhance healthcare delivery by providing efficient, reliable, and accessible tools for patient management, empowering healthcare professionals to focus on what matters most: patient care.</p>
            
                    <h3>Services</h3>
                    <ul>
                        <li><strong>Patient Registration:</strong> Seamlessly register new patients with necessary details.</li>
                        <li><strong>Patient Management:</strong> Maintain and update patient records efficiently.</li>
                        <li><strong>Data Security:</strong> Ensure the confidentiality and security of patient information.</li>
                        <li><strong>User-Friendly Interface:</strong> Intuitive design for easy navigation and usability.</li>
                        <li><strong>Support:</strong> Access to dedicated customer support for any inquiries or issues.</li>
                    </ul>
            
                    <h3>Contact Us</h3>
                    <p>If you have any questions or need assistance, please reach out through our contact page.</p>
            
                    <p>Thank you for choosing our app to support your healthcare needs.</p>
                </div>}
        </div>
    );
};

export default About;
