import React from 'react';
import ParticleAnimation from './ParticleAnimation';
import Header from './Header'; // Import the Header component
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header /> {/* Include the Header component */}
      <ParticleAnimation />
    </div>
  );
}

export default App;
