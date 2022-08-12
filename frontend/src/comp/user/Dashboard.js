import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useEffect, useState } from 'react';
import axios from 'axios'

const baseurl = "http://127.0.0.1:8000/api";

const Dashboard = () => {

    const name = localStorage.getItem("userName")
    const student_id = localStorage.getItem("userId")
    const [dashboardData, setdashboardData] = useState([]);


    useEffect(() => {

        try {
            axios.get(baseurl + '/student/dashboard/' + student_id)
                .then((res) => {
                    // console.log(res.data);
                    setdashboardData(res.data)
                })
        } catch (error) {
            console.log(error);
        }
        
    },[student_id])

    return (

        <div className="container mb-5 mt-5">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />

                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">User : {name}</h5>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-3">
                            <div className="card border-primary">
                                <h5 className='card-header bg-primary text-white'>Enrolled Course</h5>
                                <div className="card-body">
                                    <h3><Link to="/teacher-courses">{dashboardData.total_courses}</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card border-warning">
                                <h5 className='card-header bg-warning text-white'>Total Assignemts</h5>
                                <div className="card-body">
                                    <h3><Link to="/my-students">{dashboardData.total_assignmetns}</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card border-success">
                                <h5 className='card-header bg-success text-white'>Done Assignemts</h5>
                                <div className="card-body">
                                    <h3><Link to="/my-students">{dashboardData.done_assignmetns}</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card border-danger">
                                <h5 className='card-header bg-danger text-white'>Pending Assignemts</h5>
                                <div className="card-body">
                                    <h3><Link to="/my-students">{dashboardData.pending_assignmetns}</Link></h3>
                                </div>
                            </div>
                        </div>
                       

                    </div>


                </section>
            </div>
        </div>
    )
}

export default Dashboard;