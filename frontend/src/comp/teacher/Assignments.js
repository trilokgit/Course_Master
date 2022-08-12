import React, { useState, useEffect } from 'react'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { saveAs } from "file-saver";


const baseurl = "http://127.0.0.1:8000/api";

const Assignments = () => {


    const [assignmentsData, setassignmentsData] = useState([]);
    const { teacher_id } = useParams();
    const { student_id } = useParams();
    const { course_id } = useParams();

    useEffect(() => {

        try {

            axios.get(baseurl + '/fetch-all-student-assignments/'+ teacher_id + '/' + student_id + '/' + course_id)
                .then((res) => {
                    // console.log(res.data);
                    setassignmentsData(res.data);
                });

        } catch (error) {
            console.log(error);
        }


    }, [course_id, student_id, teacher_id]);
    
    const saveFile = (e,t) => {
        // console.log(t)
        saveAs(
            e,
           `${t}.pdf`
        );
    };




    return (


        <div className="container mb-5 mt-5">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />

                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Assignments <Link className='float-end btn btn-sm btn-warning fw-bold ' to={`/add-assignment/${teacher_id}/${student_id}/${course_id}`}>Add Assignment</Link></h5>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-body">
                                   
                                    <table className="table table-bordered">

                                        <thead>
                                            <tr>
                                                <th>Student Name</th>
                                                <th className='text-center'>Assignments Name</th>
                                                <th className='text-center'>Topic</th>
                                                <th className='text-center'>Student Question Sheet</th>
                                                <th className='text-center'>Status</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                assignmentsData.map((item, index) => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <td className='text-center'>{ item.student.full_name }</td>
                                                            <td className='text-center'>{item.title}</td>
                                                            <td className='text-center'>{item.detail}</td>
                                                            <td className='text-center'><button className='btn btn-primary btn-sm fw-bold' onClick={() => saveFile(item.question, item.title)} >Download PDF</button></td>
                                                            <td className='text-center'>{item.status === false ? <span className='badge text-bg-danger fw-bold p-2'>Missing ?</span> : <span className='badge text-bg-success fw-bold p-2'>Done <i className="bi bi-check-circle-fill"></i></span> }</td>
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

                </section>
            </div>
        </div>






    )
}

export default Assignments;