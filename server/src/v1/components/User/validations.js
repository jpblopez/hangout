import * as yup from 'yup';

const createLodging = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  location: yup.string().required('Location is required'),
  rate: yup.number().required('Rate is required').min(1),
  amenities: yup.array().of(yup.number()).min(0),
});

export { createLodging };
