import React, { useEffect } from 'react';
import { Routes, Route, useParams, useLocation, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from 'react-redux';
import { usersApi } from './app/services/users';
import { setCredentials } from './features/auth/authSlice';

function App() {
  const location = useLocation();
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (location.search) {
        const queryParameters = new URLSearchParams(location.search)
        const token = queryParameters.get("token");
        if (token && !user) {
          localStorage.setItem('token', token);
          const result = await dispatch(usersApi.endpoints.getUser.initiate() as any);
          const { data: user } = result;
          dispatch(setCredentials({ user, token }));
          navigate('/library');
          return result.unsubscribe;
        } else {
          navigate('/library');
        }
      }
    })();
  }, [location.search, user, dispatch, navigate]);


  return (
    <div style={{ height: '100vh' }}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="reader/:id" element={<PrivateRoute Component={Reader} />} />
          <Route path="upload" element={<PrivateRoute Component={Upload} />} />
          <Route path="library" element={<PrivateRoute Component={Library} />} />
          <Route path="my-content" element={<PrivateRoute Component={MyContent} />} />
          <Route path="account" element={<PrivateRoute Component={Account} />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
      </Routes>
      <ToastContainer pauseOnFocusLoss={false} />
    </div>
  );
}

export default App;
