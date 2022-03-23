import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';

function CreateLodging() {
  let [result, setResult] = useState();
  let [amenities, setAmenities] = useState([]);
  let { auth } = useAuth();

  const getAmenities = async () => {
    const res = await api.get('/v2/amenities');
    if (res.data.amenities.length > 0) {
      let temp = res.data.amenities.slice();
      setAmenities(() => {
        return temp;
      });
    }
  };
  useEffect(() => {
    getAmenities();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: {},
      rate: '',
      location: '',
      amenities: [],
    },
    validationSchema: Yup.object({
      title: Yup.string('').required('Required'),
      description: Yup.string().required('Required'),
      rate: Yup.number().required('Required'),
      location: Yup.string().required('Required'),
      image: Yup.string().required('Required'),
      amenities: Yup.array().required('Required'),
    }),
    onSubmit: async values => {
      console.log('val', values);
      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('image', values.image);
        formData.append('rate', values.rate);
        formData.append('location', values.location);
        values.amenities.forEach(item => formData.append('amenities[]', item));

        console.log('autherea', auth);
        const res = await api.post('/v2/user/lodgings', formData, {
          headers: {
            Authorization: auth.accessToken,
          },
        });
        setResult(() => {
          return 'success';
        });
        console.log('res', res);
      } catch (error) {
        return error;
      }
    },
  });
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-4xl mx-auto text-center">
          {(!result || result === 'failed') && (
            <div>
              <span className="text-3xl font-medium">Create lodging!</span>
              <form
                enctype="multipart/form-data"
                className="border border-black relative mt-4 bg-white shadow-md sm:rounded-lg text-left"
                onSubmit={formik.handleSubmit}
              >
                <div className="pb-5 px-6 w-96 h-auto">
                  <label className="block pt-3">Title:</label>
                  <input
                    className="border w-full border-black h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-blue-600"
                    type="text"
                    name="title"
                    id="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <p className="text-red-500">{formik.errors.title}</p>
                  ) : null}

                  <label className="block pt-3">Description:</label>
                  <input
                    className="border w-full border-black h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-blue-600"
                    type="text"
                    name="description"
                    id="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <p className="text-red-500">{formik.errors.description}</p>
                  ) : null}

                  <label className="block">Image:</label>

                  <input
                    className=" w-full h-auto px-3 py-5 mt-2 hover:outline-none"
                    type="file"
                    name="image"
                    id="image"
                    onChange={event =>
                      formik.setFieldValue('image', event.target.files[0])
                    }
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.image && formik.errors.image ? (
                    <p className="text-red-500">{formik.errors.image}</p>
                  ) : null}

                  <label className="block mt-3">Rate:</label>
                  <input
                    className="border w-full border-black h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-blue-600"
                    type="text"
                    name="rate"
                    id="rate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rate}
                  />
                  {formik.touched.rate && formik.errors.rate ? (
                    <p className="text-red-500">{formik.errors.rate}</p>
                  ) : null}

                  <label className="block mt-3">Location:</label>
                  <input
                    className="border w-full border-black h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-blue-600"
                    type="text"
                    name="location"
                    id="location"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.location}
                  />
                  {formik.touched.location && formik.errors.location ? (
                    <p className="text-red-500">{formik.errors.location}</p>
                  ) : null}

                  <label className="block mt-3">Amenities:</label>
                  {amenities.map(c => {
                    return (
                      <li>
                        <input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="checkbox"
                          name="amenities"
                          value={c.id}
                        />
                        <label className="px-5">{c.name}</label>
                      </li>
                    );
                  })}
                  {formik.touched.amenities && formik.errors.amenities ? (
                    <p className="text-red-500">{formik.errors.amenities}</p>
                  ) : null}

                  <div className="mt-4 flex justify-between">
                    <input
                      className="border border-black px-5 py-1"
                      type="submit"
                      value="Create"
                    />
                    <button
                      className="border border-black px-5 py-1"
                      onClick={() => navigate('/homepage')}
                    >
                      BACK TO HOMEPAGE
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          <div>
            {result === 'success' && (
              <div>
                <span className="block font-bold text-2xl pb-3">
                  You have successfully created!
                </span>
                <button
                  className="border border-black px-5 py-1"
                  onClick={() => navigate('/homepage')}
                >
                  CLICK HERE TO GO BACK TO HOMEPAGE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateLodging;
