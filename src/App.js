import React, { useEffect } from 'react';
import './App.css';
import BfhlForm from './BfhlForm';

function App() {
  useEffect(() => {
    document.title = 'Your_Roll_Number';  // Replace with your actual roll number
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>BFHL Challenge</h1>
        <BfhlForm />
      </header>
    </div>
  );
}

export default App;
