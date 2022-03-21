import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function LoginForm() {
  const { setAuth } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async values => {
      try {
        let res = await api.post('/v1/auth/login', values);
        const accessToken = res.data.token;
        setAuth({ accessToken });
        navigate('/homepage');
      } catch (error) {
        if (error.response !== undefined) {
          if (error.response.status === 401) {
            setError(() => {
              return 'Invalid email or password';
            });
          } else if (error.response.status === 503) {
            setError(() => {
              return 'No connection to database';
            });
          }
        } else {
          setError(() => {
            return 'No response from server';
          });
        }
      }
    },
  });

  return (
    <div className="min-h-screen antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-4xl mx-auto text-center">
        <span className="text-5xl font-medium">Hang-out with us!</span>
        <form
          className="border border-black relative mt-4 bg-white shadow-md sm:rounded-lg text-left"
          onSubmit={formik.handleSubmit}
        >
          <div className="pb-5 px-6 w-96 h-96">
            <span className="block font-medium py-2">
              Login to your account
            </span>
            <label className="">Email:</label>
            <input
              className="border border-black w-full h-5 px-5 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              name="email"
              id="email"
              onChange={e => {
                formik.handleChange(e);
                setError(() => {
                  return '';
                });
              }}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500">{formik.errors.email}</p>
            ) : null}

            <label className="block mt-3">Password:</label>
            <input
              className="border w-full border-black h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="password"
              name="password"
              id="password"
              onChange={e => {
                formik.handleChange(e);
                setError(() => {
                  return '';
                });
              }}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500">{formik.errors.password}</p>
            ) : null}

            <div className="mt-4 flex justify-between">
              <input
                className="border border-black px-5 py-1"
                type="submit"
                value="LOGIN"
              />
              <button
                className="border border-black px-5 py-1"
                onClick={() => navigate('/register')}
              >
                REGISTER
              </button>
            </div>
            <p className="text-red-500 pt-5">{error}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
