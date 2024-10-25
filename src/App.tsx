import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import TelescopeImg from './Images/Telescope.png';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="bg-gray-800 p-4">
          <div className="flex items-center space-x-4">
            <img
              src={TelescopeImg}
              alt="telescope"
              className="w-14 h-14"
            />
            <h1 className="text-2xl font-bold">Space Discoveries</h1>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
