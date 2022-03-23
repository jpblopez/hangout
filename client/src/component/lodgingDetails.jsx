import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import image from '../summer.jpg';
import _ from 'lodash';

function LodgingDetails() {
  const [lodging, setLodging] = useState({});
  let [amenities, setAmenities] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const getLodging = async () => {
    getAmenities();

    const lodging = await api.get(`/v1/lodging/${params.id}`);
    setLodging(lodging.data);
  };

  const getAmenities = async () => {
    const amenities = await api.get('/v2/amenities');
    const specific = await api.get(`/v2/amenities/${params.id}`);

    let result = specific.data.amenities.map(c => {
      let res = _.find(amenities.data.amenities, x => {
        if (x.id === c.amenity_id) {
          return true;
        }
      }).name;
      return res;
    });

    if (result.length > 0) {
      setAmenities(() => {
        return result;
      });
    }
  };

  useEffect(() => {
    getLodging();
  }, []);

  return (
    <div className="pt-5 ml-5">
      <button
        className="ml-5 border border-black"
        onClick={() => navigate('/homepage')}
      >
        Go back
      </button>
      <div className=" pt-5 ">
        <img className="w-1/2" src={image} alt="didnt load" />
        <div className="flex pt-5 justify-between w-1/2 pb-3">
          <p className="text-4xl">{lodging.title}</p>
          <p className="text-xl">{lodging.owner}</p>
        </div>
        <p className="text-xl pb-5">{lodging.description}</p>
        {amenities.map(c => {
          return <li>{c}</li>;
        })}
        <p className="pb-2 text-xl">{lodging.location}</p>
        <p className="pb-4 text-xl">PHP {lodging.rate} per day</p>
        <button
          onClick={() => navigate(`/payment/${params.id}`)}
          className="border border-black text-xl w-56 h-12"
        >
          RENT NOW
        </button>
      </div>
    </div>
  );
}

export default LodgingDetails;
