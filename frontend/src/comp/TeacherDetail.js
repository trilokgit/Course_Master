import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import django from "../img/django.png";
import axios from 'axios';
import { useParams } from "react-router-dom";

const baseurl = "http://127.0.0.1:8000/api";

const TeacherDetail = () => {

    const [teacherData, setteacherData] = useState([]);
    const [teacherCourses, setteacherCourses] = useState([]);
    const [teacherSkills, setteacherSkills] = useState([]);
    const { teacher_id } = useParams();

    useEffect(() => {

        try {

            axios.get(baseurl + '/teacher/' + teacher_id)
                .then((res) => {
                    setteacherData(res.data);
                    setteacherCourses(res.data.teacher_courses);
                    setteacherSkills(res.data.teacher_skills);
                });

        } catch (error) {
            console.log(error);
        }

    }, [teacher_id]);
    // console.log(teacherData);
    // console.log(teacherCourses);
    // console.log(teacherSkills);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-4">
                    <img
                        width="100%"
                        height="100%"
                        className="img-thumbnail shadow"
                        src={django}
                        alt="teacher image1"
                />
                </div>
                <div className="col-8">
                    <h1>{teacherData.full_name} <Link className="float-end" to="#"><h6>Email Id : {teacherData.email}</h6></Link> </h1>
                    <h6> Phone No : { teacherData.mobile_no }</h6>
                    <p className="lh-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, ab
                        delectus aut officiis quas corporis omnis eos qui provident
                        quibusdam. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        A illo inventore qui quos, distinctio perferendis tenetur provident
                        nesciunt iste veritatis!
                    </p>
                    <p className='fw-bold'>Skills :  {
                        teacherSkills.map((item, index) => {
                            return <Link className='badge rounded-pill fw-bold border-0 text-bg-warning ms-2' to={`/teacher-skill-courses/${item.trim()}/${teacherData.id}`} key={index}>{item} </Link>
                        })
                    }</p>
                    <p className="fw-bold">
                        Qualification: <Link to="#">{ teacherData.qualification }</Link>
                    </p>
                    <p className="fw-bold">
                        Rating: <Link to="#">4.3/5</Link>
                    </p>
                </div>
            </div>

            <div className="card shadow mb-5 mt-5">
                <h2 className="card-header">My Course Lists</h2>
                <div className="list-group list-group-flush">
                    <div className="card-body">
                        <table className="table table-bordered">

                            <thead>
                                <tr>
                                    <th className="text-center">Name of the course</th>
                                    <th className="text-center">Image</th>
                                    <th className="text-center">Technologies</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    teacherCourses.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td className="text-center"><Link to={`/detail/${item.id}`}>{item.title}</Link></td>
                                                <td className="text-center"><img src={item.featured_img} width="80" className='rounded' alt="featured_img" /></td>
                                                <td className='text-center'>{item.techs}</td>
                            
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>

                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default TeacherDetail;
