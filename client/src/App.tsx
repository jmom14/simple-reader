import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Upload from './components/pages/Upload';
import Library from './components/pages/Library';
import Account from './components/pages/Account';
import Reader from './components/pages/Reader';
import MyContent from './components/pages/MyContent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './components/pages/Unauthorized';

function App() {

  console.log('env: ', process.env.NODE_ENV)

  return (
    <div style={{ height: '100vh'}}>
      <Routes>
        <Route path="/" element={ <Navigation />}>
          <Route path="reader/:id" element={<PrivateRoute Component={Reader} />}/>
          <Route path="upload" element={<PrivateRoute Component={Upload} />}/>
          <Route path="library" element={<PrivateRoute Component={Library} />}/>
          <Route path="my-content" element={<PrivateRoute Component={MyContent} />}/>
          <Route path="account" element={<PrivateRoute Component={Account} />}/>
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
      </Routes>
      <ToastContainer pauseOnFocusLoss={false} />
    </div>
  );
}

export default App;
