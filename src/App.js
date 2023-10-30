import './App.css';
import React from 'react';
import Main from './components/MainCard.jsx'; // Main bileşenini içe aktar
import Header from './components/MainHeader.jsx'; // Header bileşenini içe aktar

function App() {
  return (
    <div className="App">
      <div >
        <Header />
      </div>
    </div>
  );
}

export default App;
