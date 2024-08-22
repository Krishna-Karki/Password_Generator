import React, { useState, useEffect, useCallback } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length] = useState(8); 

  const generatePassword = useCallback(() => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=0123456789';
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  }, [length]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header">
          <h2>Password Generator</h2>
        </div>
        <div className="card-body">
          <p className="lead">Generated Password: <strong>{password}</strong></p>
          <button className="btn btn-primary" onClick={generatePassword}>Generate New Password</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
