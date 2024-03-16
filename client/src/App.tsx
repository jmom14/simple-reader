import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Upload from './pages/Upload';
import Library from './pages/Library';
import Account from './pages/Account';
import Reader from './pages/Reader';
import MyContent from './pages/MyContent';

function App() {

  return (
    <div style={{ height: '100vh'}}>
      <Routes>
        <Route path="/" element={ <Navigation />}>
          <Route path="reader/:id" element={ <Reader />} />
          <Route path="upload" element={<Upload />} />
          <Route path="library" element={<Library />} />
          <Route path="my-content" element={<MyContent />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
