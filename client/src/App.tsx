import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from './components/Navigation';
import Upload from './pages/Upload';
import Library from './pages/Library';
import Account from './pages/Account';
import Reader from './pages/Reader';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={ <Navigation />}>
        <Route path="reader/:id" element={ <Reader />} />
        <Route path="upload" element={<Upload />} />
        <Route path="library" element={<Library />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
