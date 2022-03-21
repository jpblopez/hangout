import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function RegistrationForm() {
  let [result, setResult] = useState(null);
  let [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email').required('Required'),
      name: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async values => {
      try {
        await api.post('v1/auth/register', values);
        setResult('success');
      } catch (error) {
        setResult('failed');
        if (error.response !== undefined) {
          if (error.response.status === 409) {
            setError(() => {
              return 'Email already exists!';
            });
          } else if (error.response.status === 503) {
            setError(() => {
              return 'No connection to database';
            });
          }
        } else
          setError(() => {
            return 'No response from server';
          });
      }
    },
  });
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-4xl mx-auto text-center">
          {(result === null || result === 'failed') && (
            <div>
              <span className="text-3xl font-medium">Register!</span>
              <form
                className="border border-black relative mt-4 bg-white shadow-md sm:rounded-lg text-left"
                onSubmit={formik.handleSubmit}
              >
                <div className="pb-5 px-6 w-96 h-auto">
                  <label className="block pt-3">Email:</label>
                  <input
                    className="border w-full border-black h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-blue-600"
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

                  <label className="block">Name:</label>
                  <input
                    className="border w-full border-black h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-blue-600"
                    type="text"
                    name="name"
                    id="name"
                    onChange={e => {
                      formik.handleChange(e);
                      setError(() => {
                        return '';
                      });
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className="text-red-500">{formik.errors.name}</p>
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
                      value="REGISTER"
                    />
                    <button
                      className="border border-black px-5 py-1"
                      onClick={() => navigate('/')}
                    >
                      BACK TO LOGIN
                    </button>
                  </div>
                  <p className="text-red-500 pt-5">{error}</p>
                </div>
              </form>
            </div>
          )}
          <div>
            {result === 'success' && (
              <div>
                <span className="block font-bold text-2xl pb-3">
                  You have successfully registered!
                </span>
                <button
                  className="border border-black px-5 py-1"
                  onClick={() => navigate('/')}
                >
                  CLICK HERE TO LOGIN
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
