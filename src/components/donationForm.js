import React, {useState} from 'react';
import './styles.css'
import {database} from '../firebase'
import {ref,push,child,update} from "firebase/database";

function DonationForm() {
    
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [bloodType, setBloodType] = useState(null);
    const [medicalHistory, setMedicalHistory] = useState(null);
    const [donationReason, setDonationReason] = useState(null);


    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }
        if(id === "bloodType"){
            setBloodType(value);
        }
        if(id === "medicalHistory"){
            setMedicalHistory(value);
        }
        if(id === "donationReason"){
            setDonationReason(value);
        }
    }

      const isEmailValid = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
      };
    
      const isPasswordValid = (password, confirmPassword) => {
        // Password validation logic
        return password.length >= 6 && password === confirmPassword;
      };

      const handleSubmit = () => {
        let alert = ''; // Initialize alert message

        // Check if all fields are filled
        if (!firstName || !lastName || !email || !password || !confirmPassword || !bloodType || !medicalHistory || !donationReason) {
            alert = 'All fields must be filled.';
        } else if (!isEmailValid(email)) {
            alert = 'Invalid email address';
        } else if (!isPasswordValid(password, confirmPassword)) {
            alert = 'Password must be at least 6 characters and match the confirmation';
        }
        else {
                let obj = {
                    firstName : firstName,
                    lastName:lastName,
                    email:email,
                    password:password,
                    bloodType:bloodType,
                    medicalHistory:medicalHistory,
                    donationReason:donationReason,
            }       
        const newPostKey = push(child(ref(database), 'posts')).key;
        const updates = {};
        updates['/' + newPostKey] = obj;

        update(ref(database), updates)
        .then(() => {
          setIsSubmitted(true);
          alert = 'Data submitted successfully!';
          setAlertMessage(alert);
          resetForm();

            // Automatically clear the message after 5 seconds
            setTimeout(() => {
                setAlertMessage('');
            }, 3000);
        })
        .catch((error) => {
          console.error('Error submitting data:', error);
          alert = 'Form not submitted. Please try again.';
          setAlertMessage(alert);
        });
        
    }
        setAlertMessage(alert); // Set the alert message
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    return(
        <div className="form">
        <div className="title"><h4>Donor Registration Form</h4></div>
            <div className="form-body">
                <div className="username">
                    <label className="form__label" htmlFor="firstName">First Name </label>
                    <input className="form__input" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name" />
                </div>
                <div className="lastname">
                    <label className="form__label" htmlFor="lastName">Last Name </label>
                    <input  type="text" name="" id="lastName" value={lastName}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="LastName" />
                </div>
                <div className="email">
                    <label className="form__label" htmlFor="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email" />
                </div>
                <div className="password">
                    <label className="form__label" htmlFor="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password" />
                </div>
                <div className="confirm-password">
                    <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password" />
                </div>
                <div className="bloodType">
                    <label className="form__label" htmlFor="bloodType">Blood Type </label>
                    <select className="form__input" id="bloodType" value={bloodType} onChange = {(e) => handleInputChange(e)}>
                        <option value="">Select...</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>
                <div className="medicalHistory">
                    <label className="form__label" htmlFor="medicalHistory">Medical History </label>
                    <textarea className="form__input" id="medicalHistory" value={medicalHistory} onChange = {(e) => handleInputChange(e)} placeholder="Medical History"/>
                </div>
                <div className="donationReason">
                    <label className="form__label" htmlFor="donationReason">Reason for Donation </label>
                    <textarea className="form__input" id="donationReason" value={donationReason} onChange = {(e) => handleInputChange(e)} placeholder="Medical Reason for Donation"/>
                </div>

            </div>
            <div className="footer">
                <button onClick={handleSubmit} type="submit" className="btn-dark">Register</button>
                {alertMessage && <div className="alert">{alertMessage}</div>}
            </div>
        </div>
       
    )       
}

export default DonationForm;
