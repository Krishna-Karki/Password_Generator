import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [userAddedString, setUserAddedString] = useState('');
  const [excludeLetters, setExcludeLetters] = useState(false);
  const [excludeNumbers, setExcludeNumbers] = useState(false);
  const [excludeSymbols, setExcludeSymbols] = useState(false);
  const [placement, setPlacement] = useState('end');

  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=';

  const generatePassword = useCallback(() => {
    let charset = '';

    if (!excludeLetters) charset += letters;
    if (!excludeNumbers) charset += numbers;
    if (!excludeSymbols) charset += symbols;

    const remainingLength = length - userAddedString.length;
    let randomChars = '';
    for (let i = 0; i < remainingLength; i++) {
      randomChars += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    let newPassword = '';

    if (placement === 'start') {
      newPassword = userAddedString + randomChars;
    } else if (placement === 'end') {
      newPassword = randomChars + userAddedString;
    } else if (placement === 'zigzag') {
      const combinedArray = [...randomChars];
      for (let i = 0; i < userAddedString.length; i++) {
        const randomIndex = Math.floor(Math.random() * (combinedArray.length + 1));
        combinedArray.splice(randomIndex, 0, userAddedString.charAt(i));
      }
      newPassword = combinedArray.join('');
    }

    setPassword(newPassword);
  }, [length, userAddedString, excludeLetters, excludeNumbers, excludeSymbols, placement]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
      <div
        className="card shadow-lg p-4"
        style={{
          zIndex: 2,
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        {/* Cool Header Design */}
        <header className="text-center mb-4">
          <h1 className="display-5" style={{ fontWeight: 'bold', color: '#007bff' }}>Password Generator</h1>
          <p className="lead" style={{ color: '#343a40' }}>Create secure and customizable passwords</p>
        </header>

        {/* Row for String to Add and Exclude Checkboxes */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">String to Add in Password:</label>
            <input
              type="text"
              className="form-control"
              value={userAddedString}
              onChange={(e) => setUserAddedString(e.target.value)}
            />
          </div>
          <div className="col-md-6 d-flex justify-content-between align-items-center">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={excludeLetters}
                onChange={(e) => setExcludeLetters(e.target.checked)}
              />
              <label className="form-check-label">Exclude Letters</label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={excludeNumbers}
                onChange={(e) => setExcludeNumbers(e.target.checked)}
              />
              <label className="form-check-label">Exclude Numbers</label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={excludeSymbols}
                onChange={(e) => setExcludeSymbols(e.target.checked)}
              />
              <label className="form-check-label">Exclude Symbols</label>
            </div>
          </div>
        </div>

        {/* Input for custom password length */}
        <div className="mb-3">
          <label className="form-label">Password Length:</label>
          <input
            type="number"
            className="form-control"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value) || 8)}
          />
        </div>

        {/* Radio buttons for placement option */}
        <div className="mb-3">
          <label className="form-label">Placement of Added String:</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="start"
              checked={placement === 'start'}
              onChange={(e) => setPlacement(e.target.value)}
            />
            <label className="form-check-label">Start of Password</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="end"
              checked={placement === 'end'}
              onChange={(e) => setPlacement(e.target.value)}
            />
            <label className="form-check-label">End of Password</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="zigzag"
              checked={placement === 'zigzag'}
              onChange={(e) => setPlacement(e.target.value)}
            />
            <label className="form-check-label">Zigzag in Password</label>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Generated Password:</label>
          <input type="text" className="form-control" value={password} readOnly />
        </div>

        <button className="btn btn-primary w-100 mt-3" onClick={generatePassword}>
          Generate New Password
        </button>
      </div>
  );
};

export default PasswordGenerator;
