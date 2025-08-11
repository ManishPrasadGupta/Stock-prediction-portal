import axios from 'axios';
import React, { useEffect } from 'react'
import axiosInstance from '../axiosInstance';

const Dashboard = () => {

    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response  = await axiosInstance.get('/protected-view/')
               console.log('success:', response.data)
            } catch (error) {  
                console.error('Error fetching data:', error)
            }
        }
        fetchProtectedData();
    }, []);

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard;