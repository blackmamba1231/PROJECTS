import { Appbar } from "../components/Appbar"

import { Users } from "../components/Users"
import {Signout} from '../components/Signout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Dashboard = () => {
    const [userData, setUserData] = useState({
      username: '',
      email: '',
      followers:[],
      following:[],
      createdAt: ''
    });

  useEffect(() => {
    const userid = localStorage.getItem('Id');
    console.log(userid);
    const token = localStorage.getItem('token');
    console.log(token);
    
      // we are Fetching user data using the userid
      fetchUserData(userid, token);
  
    
  }, []);

 const fetchUserData = async (userId, token) =>{
  console.log('Fetching data for userId:', userId);
    try {
      const response = await axios.get('http://localhost:5000/api/v1/users/getUserProfile',{
        headers: { Authorization: 'Bearer '+token},
        params: { id: userId }
      })
      console.log(response.data);
      setUserData(response.data);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
   
    
  };

    return <div>

    <Appbar UserName={userData.username} />
        
        <div className="m-10">
          <Users/>
        </div>

    </div>
}