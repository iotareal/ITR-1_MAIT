import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Profile = () => {
  // const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("https://bookhaven-swm2.onrender.com/api/v1/get-user-information", { headers });
      setProfile(response.data);
    }
    fetch();
  }, [])
  return (
    <div className='flex flex-col md:flex-row p-10 min-h-screen'>
      {!Profile && <></>}
      {Profile && (
        <>
          <div className='w-full md:w-1/3'>
            <Sidebar data={Profile} />
          </div>
          <div className='w-full md:w-4/6'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;