import React,{useState,useEffect} from 'react'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const baseurl = "http://127.0.0.1:8000/api";

const EnrolledStudents = () => {

    
    const [studentData, setstudentData] = useState([]);
    const { course_id } = useParams();
    
    useEffect(() => {
        
        try {
           
            axios.get(baseurl + '/fetch-enroll-students/' + course_id)
                .then((res) => {
                    
                    setstudentData(res.data);
                });

        } catch (error) {
            console.log(error);
        }

    }, []);
    // console.log(studentData);



    return (


        <div className="container mb-5 mt-5">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />

                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Enrolled Students List For Course</h5>
                        <div className="card-body">
                            <table className="table table-bordered">

                                <thead>
                                    <tr>
                                        <th>Student Name</th>
                                        <th>Email</th>
                                        <th>Course Name</th>
                                        <th>Image</th>
                                        <th>Interested Fields</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        studentData.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.student.full_name}</td>
                                                    <td>{ item.student.email }</td>
                                                    <td>{item.course.title} </td>
                                                    <td><img width="100" src={item.course.featured_img} alt={item.course.title} /></td>
                                                    <td>{item.student.interested_categories }</td>
                                                    
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

export default EnrolledStudents;