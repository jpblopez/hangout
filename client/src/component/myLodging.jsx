import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import image from '../summer.jpg';

function MyLodgings() {
  const [lodging, setLodgingList] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const getMyLodging = async () => {
    const res = await api.get('/v2/user/mylodgings', {
      headers: {
        Authorization: auth.accessToken,
      },
    });
    console.log(res);
    if (res.data.lodgings.length > 0) {
      let temp = res.data.lodgings.slice();

      setLodgingList(() => {
        return temp;
      });
    }
  };

  useEffect(() => {
    getMyLodging();
  }, []);
  return (
    <>
      <div className="block w-full pb-10 mt-5">
        <span className=" font-bold text-2xl">My lodgings</span>
      </div>
      <div className="flex">
        {lodging.map(c => {
          return (
            <div className="px-4">
              <div
                className=" pb-5 border border-black relative mt-4 bg-white shadow-md text-left"
                onClick={() => navigate(`/lodging/${c.id}`)}
              >
                <img src={image} alt="didnt load" />
                <span className="block ml-3">{c.location}</span>
                <span className="ml-3">{c.rate}/day</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MyLodgings;
