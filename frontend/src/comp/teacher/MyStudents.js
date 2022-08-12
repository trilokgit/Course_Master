import React, { useState, useEffect } from 'react'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';
import { Link } from 'react-router-dom';


const baseurl = "http://127.0.0.1:8000/api";

const MyStudents = () => {


    const [studentData, setstudentData] = useState([]);
    const teacher_id = localStorage.getItem("teacherId")

    useEffect(() => {

        try {

            axios.get(baseurl + '/fetch-all-enroll-students/' + teacher_id)
                .then((res) => {

                    setstudentData(res.data);
                });

        } catch (error) {
            console.log(error);
        }

    }, [teacher_id]);
    // console.log(studentData);



    return (


        <div className="container mb-5 mt-5">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />

                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Enrolled Students List</h5>
                        <div className="card-body">
                            <table className="table table-bordered">

                                <thead>
                                    <tr>
                                        <th>Student Name</th>
                                        <th>Email</th>
                                        <th>Course Name</th>
                                        <th>Assignment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        studentData.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.student.full_name}</td>
                                                    <td>{item.student.email}</td>
                                                    <td>{item.course.title} </td>
                                                    <td width="38%">
                                                        <Link to={`/assignments/${teacher_id}/${item.student.id}/${item.course.id}`} className='btn btn-sm fw-bold btn-warning'>Assignments </Link>
                                                        <Link to={`/add-assignment/${teacher_id}/${item.student.id}/${item.course.id}`} className='btn btn-sm fw-bold btn-success ms-3'>Add Assignments</Link>
                                                    </td>

                                                </tr>
                                            )
                                        })
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

export default MyStudents;