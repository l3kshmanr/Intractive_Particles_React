import React from 'react';
import ReactDOM from 'react-dom/client'; // Change this line
import './index.css'; // Import Tailwind CSS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
