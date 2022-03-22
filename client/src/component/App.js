import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './login';
import RegistrationForm from './register';
import LodgingDetails from './lodgingDetails';
import Homepage from './home';
import Layout from './Layout';
import RequireAuth from './RequireAuth';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import CreateLodging from './createLodging';

function App() {
  const { setAuth } = useAuth();
  const refreshToken = async () => {
    let res = await api.get('/v1/auth/token/refresh');
    const accessToken = res.data.token;
    setAuth({ accessToken });
  };
  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<LoginForm />} index />
        <Route element={<LoginForm />} path="login" />
        <Route element={<RegistrationForm />} path="register" />
        <Route element={<RequireAuth />}>
          <Route element={<LodgingDetails />} path="lodging/:id" />
          <Route element={<Homepage />} path="homepage" />
          <Route element={<CreateLodging />} path="createLodging" />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
