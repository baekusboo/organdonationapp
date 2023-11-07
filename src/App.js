import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';
import DonationForm from './components/donationForm';
import TransplantData from './components/transplantRules';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DonationForm />} />
          <Route path="/transplantData" element={<TransplantData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
