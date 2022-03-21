import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import image from '../summer.jpg';

function Home() {
  const [lodging, setLodgingList] = useState([]);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const LogoutSuccess = async () => {
    await api.get('/v1/auth/logout');
    setAuth({});
    navigate('/login');
  };
  const getLodging = async () => {
    const res = await api.get('/v1/lodging');
    console.log(res);
    if (res.data.lodgings.length > 0) {
      let temp = res.data.lodgings.slice();
      console.log('hehe', temp);
      setLodgingList(() => {
        return temp;
      });
    }
  };

  console.log('lodging', lodging);
  useEffect(() => {
    getLodging();
  }, []);
  return (
    <>
      <div className="block w-full pb-10 mt-5">
        <span className=" font-bold text-2xl">
          Browse through our list of hangouts
        </span>
        <button className="ml-10 border border-black" onClick={LogoutSuccess}>
          LOGOUT
        </button>
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

export default Home;
