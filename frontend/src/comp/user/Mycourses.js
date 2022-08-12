import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseurl = "http://127.0.0.1:8000/api";

const Mycourses = () => {

    const [courseData, setscourseData] = useState([]);
    const student_id = localStorage.getItem("userId")

    useEffect(() => {

        try {

            axios.get(baseurl + '/fetch-enroll-courses/' + student_id)
                .then((res) => {
                    // console.log(res.data);
                    setscourseData(res.data);
                });

        } catch (error) {
            console.log(error);
        }

    }, [student_id]);



    return (


        <div className="container mb-5 mt-5">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />

                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">My Courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">

                                <thead>
                                    <tr>
                                        <th>Name of the course</th>
                                        <th>Created By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        courseData.map((item, index) => (
                                            <tr key={index}>
                                                <td><Link to={`/detail/${item.course.id}`}>{item.course.title}</Link></td>
                                                <td><Link to={`/teacher-detail/${item.course.teacher.id}`}>{item.course.teacher.full_name}</Link></td>
                                                <td>
                                                    <button className="btn btn-sm btn-danger fw-bold border-0 rounded">Remove Course</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>

                </section>
            </div>
        </div>






    )
}

export default Mycourses