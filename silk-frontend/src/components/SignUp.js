import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
  };


  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
