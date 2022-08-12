import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import django from '../img/django.png'
import axios from 'axios'

const baseurl = 'http://127.0.0.1:8000/api';

const AllCourses = () => {

    const [courseData, setCourseData] = useState([]);

    useEffect(() => {

        try {

            axios.get(baseurl + '/course/')
                .then((res) => {
                    setCourseData(res.data);
                    // console.log(res);
                });

        } catch (error) {
            console.log(error);
        }

    }, []);

    // console.log(courseData);


    return (

        <div className="container mt-4">
            <h3 className='pb-1 mb-4 mt-5'>All Courses</h3>
            <div className="row">
                {courseData && courseData.map((course, index) => 
                <div key={index} className="col-md-3 mb-5">
                    <div className="card shadow">
                        <Link to={`/detail/${course.id}`}><img className="card-img-top" src={course.featured_img} alt={course.title} /></Link>
                        <div className="card-body">
                                <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
                        </div>
                        <div className="card-footer">
                            <div className="title text-dark fw-bold">
                                <span>Rating : 4.5/5 </span>
                                <span className="float-end">Views : 2505 </span>
                            </div>
                        </div>
                    </div>
                    </div>
                )}
            </div>

            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center mb-5">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>

        </div>

    )
}

export default AllCourses