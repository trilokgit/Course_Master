import React, { useState, useEffect } from 'react'
import TeacherSidebar from './TeacherSidebar'
import { Link } from 'react-router-dom';
import axios from 'axios'

const baseurl = "http://127.0.0.1:8000/api";

const DashboardTeacher = () => {

    const username = localStorage.getItem("teacherName");

    const [dashboardData, setdashboardData] = useState([]);
    const teacher_id = localStorage.getItem("teacherId");

    useEffect(() => {
        try {
            axios.get(baseurl + '/teacher/dashboard/' + teacher_id)
                .then((res) => {
                    // console.log(res.data);
                    setdashboardData(res.data);
                })
        } catch (error) {
            console.log(error);

        }
    }, [teacher_id])



    return (

        <div className="container mb-5 mt-5">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />

                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">User : {username}</h5>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className='card-header bg-primary text-white'>Total Course</h5>
                                <div className="card-body">
                                    <h3><Link to="/teacher-courses">{dashboardData.total_teacher_courses}</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className='card-header bg-primary text-white'>Total Students</h5>
                                <div className="card-body">
                                    <h3><Link to="/my-students">{dashboardData.total_teacher_students}</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className='card-header bg-primary text-white'>Total Chapters</h5>
                                <div className="card-body">
                                    <h3><Link to="/teacher-courses">{dashboardData.total_teacher_chapters}</Link></h3>
                                </div>
                            </div>
                        </div>

                    </div>


                </section>
            </div>
        </div>
    )
}

export default DashboardTeacher;