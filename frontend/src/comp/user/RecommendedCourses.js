import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseurl = "http://127.0.0.1:8000/api";

const RecommendedCourses = () => {

    const [courseData, setscourseData] = useState([]);
    const student_id = localStorage.getItem("userId")

    useEffect(() => {

        try {

            axios.get(baseurl + '/fetch-recommended-courses/' + student_id)
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
                        <h5 className="card-header">Recommended Courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">

                                <thead>
                                    <tr>
                                        <th>Name of the course</th>
                                        <th>Teacher Name</th>
                                        <th>Technologies</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        courseData.map((item, index) => (
                                            <tr key={index}>
                                                <td width="30%"><Link to={`/detail/${item.id}`}>{item.title}</Link> <img className='float-end' width="20%" height="20%" src={item.featured_img} alt={item.title} /></td>
                                                <td><Link to={`/teacher-detail/${item.teacher.id}`}>{item.teacher.full_name}</Link></td>
                                                <td>{
                                                    
                                                item.tech_list.map((e, index) => <span key={index}><Link to={`/category-courses/${e}`}>{e} | </Link> </span>)
                                                        
                                                }</td>

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

export default RecommendedCourses