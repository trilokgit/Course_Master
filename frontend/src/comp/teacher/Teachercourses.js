import React, { useState, useEffect } from 'react'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseurl = "http://127.0.0.1:8000/api";

const Teachercourses = () => {


    const [courseData, setCourseData] = useState([]);

    useEffect(() => {

        const teacherId = localStorage.getItem("teacherId");
        try {

            axios.get(baseurl + '/teacher-courses/' + teacherId)
                .then((res) => {
                    setCourseData(res.data);
                   
                });

        } catch (error) {
            console.log(error);
        }

    }, []);



    return (


        <div className="container mb-5 mt-5">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />

                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">My Courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">

                                <thead>
                                    <tr>
                                        <th>Name of the course</th>
                                        <th>Image</th>
                                        <th>Total Enrolled</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        courseData.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>
                                                        <Link to={`/all-chapters/` + item.id}>{item.title}</Link>
                                                        <hr />
                                                        {
                                                            item.course_rating ? <span>Rating : {item.course_rating}/5</span> : <span>Rating : 0</span>
                                                       }
                                                          
                                                    </td>
                                                    <td><img src={item.featured_img} width="80" className='rounded' alt="featured_img" /></td>
                                                    <td className='text-center'><Link to={`/enrolled-students/${item.id}`}>{item.total_enrolled_students}</Link></td>
                                                    <td width="50%" className='text-center'>
                                                        <Link to={`/edit-course/` + item.id} className="btn btn-sm btn-warning fw-bold border-0 rounded">Edit Course</Link>
                                                        <Link to={`/add-chapters/` + item.id} className="btn btn-sm btn-info fw-bold border-0 rounded ms-2">Add Chapter</Link>
                                                        
                                                        <button className="btn btn-sm btn-danger fw-bold border-0 rounded ms-2"><Link className='text-white' to={`/delete-course/` + item.id}>Delete Course</Link></button>
                                                       
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

export default Teachercourses;