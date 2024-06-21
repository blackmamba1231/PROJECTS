import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import {Signout} from '../components/Signout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Dashboard = () => {
    const [userData, setUserData] = useState({
      firstName: '',
      lastName: '',
      email: ''
    });
  const [balance,setBalance] = useState({
    balance: '',
  }
  );

  useEffect(() => {
    const userid = localStorage.getItem('userid');
    console.log(userid);
    const token = localStorage.getItem('token');
    console.log(token);
    
      // we are Fetching user data using the userid
      fetchUserData(userid);
      fetchUserBalance(userid);
    
  }, []);
  const fetchUserBalance = async(userid) =>{
    try{
      const Bal = await axios.get("http://localhost:3000/api/v1/account/userid",{
        params: { userId: userid }
      })
      console.log(Bal.data);
      setBalance(Bal.data);

    }catch(error){
      console.error('Error fetching user Balance:', error);
    }
  }

 const fetchUserData = async (userId) =>{
  console.log('Fetching data for userId:', userId);
    try {
      const response = await axios.get('http://localhost:3000/api/v1/user/userid',{
        params: { userid: userId }
      })
      setUserData(response.data);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    console.log(balance.balance);
    
  };

    return <div>

        <Appbar firstName={userData.firstName} />
        <div className="m-10">
            <Balance value={balance.balance} />

            <Users />
        </div>
        
    </div>
}