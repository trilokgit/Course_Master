import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseurl = "http://127.0.0.1:8000/api";

const FavoriteCourse = () => {

    const [favoriteCoursesData, setfavoriteCoursesData] = useState([]);
    const student_id = localStorage.getItem("userId")

    useEffect(() => {

        try {

            axios.get(baseurl + '/fetch-favorite-courses/' + student_id)
                .then((res) => {
                    // console.log(res.data);
                    setfavoriteCoursesData(res.data);
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
                        <h5 className="card-header">Favorite Courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">

                                <thead>
                                    <tr>
                                        <th>Name of the course</th>
                                        <th>Created By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        favoriteCoursesData.map((item, index) => (
                                            <tr key={index}>
                                                <td width="50%"><Link to={`/detail/${item.course.id}`}>{item.course.title} <img width="10%" height="10%" className='float-end' src={item.course.featured_img} alt="" /> </Link></td>
                                                <td><Link to={`/teacher-detail/${item.course.teacher.id}`}>{item.course.teacher.full_name}</Link></td>
                                               
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

export default FavoriteCourse