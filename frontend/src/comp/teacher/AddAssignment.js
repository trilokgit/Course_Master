import React, { useState } from "react";
import TeacherSidebar from "./TeacherSidebar";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2';

const baseurl = "http://127.0.0.1:8000/api";

const AddAssignemt = () => {
    const { student_id } = useParams();
    const { teacher_id } = useParams();
    const { course_id } = useParams();

    const [assignmentData, setassignmentData] = useState({
        title: '',
        detail: '',
        'question' : '',
    });


    const handleChange = (e) => {
        setassignmentData({
            ...assignmentData,
            [e.target.name]: e.target.value
        });
    }

    const onFilechange = (e) => {
        setassignmentData({
            ...assignmentData,
            [e.target.name]: e.target.files[0]
        })
    }

    

    const handleClick = (e) => {
        // const teacherId = localStorage.getItem("teacherId")
        const formData = new FormData();
        formData.append('title', assignmentData.title);
        formData.append('detail', assignmentData.detail)
        formData.append('question', assignmentData.document, assignmentData.document.name)
        formData.append('student', student_id)
        formData.append('teacher', teacher_id)
        formData.append('course', course_id)
        formData.append('statuse',false)

        try {
             
            axios.post(baseurl + '/add-assignment/' + teacher_id + '/' + student_id, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((res) => {
                // console.log(res.data);
                if (res.status === 200 || res.status === 201) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Assignment added',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 1500);

                }

            })

        } catch (error) {
            console.log(error);
        }



    }


    return (
        <>

            <div className="container mb-5 mt-5">
                <div className="row">
                    <aside className="col-md-3">
                        <TeacherSidebar />
                    </aside>
                    <section className="col-md-9">
                        <div className="card">
                            <h5 className="card-header">Add Assignment<Link className='float-end btn btn-sm btn-warning fw-bold ' to={`/assignments/${teacher_id}/${student_id}/${course_id}`}>Show Assignment</Link></h5>
                            <div className="card-body">
                                <form>

                                    <div className="row mb-3">
                                        <label
                                            className="col-sm-2 form-label"
                                        >
                                            Title
                                        </label>
                                        <div className="col-sm-10">
                                            <input type="text" onChange={handleChange} name="title" value={assignmentData.title}
                                                className="form-control"
                                                aria-describedby="emailHelp" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label
                                            className="col-sm-2 form-label"
                                        >
                                            Detail
                                        </label>
                                        <div className="col-sm-10">
                                            <textarea type="text" onChange={handleChange} name="detail" value={assignmentData.detail}
                                                className="form-control"
                                                aria-describedby="emailHelp" ></textarea>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label
                                            className="col-sm-3 form-label"
                                        >
                                            Upload Assignment PDF
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                        
                                                type="file"
                                                className="form-control"
                                                aria-describedby="emailHelp"
                                                name="document"
                                                onChange={onFilechange}

                                            />
                                        </div>
                                    </div>



                                    <hr />

                                    <button onClick={handleClick} type="button" className="btn btn-primary">
                                        Add Assignment
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>



        </>
    )
}

export default AddAssignemt