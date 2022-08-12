import React, { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseurl = "http://127.0.0.1:8000/api";

const EditQuiz = () => {
    const notify = () => toast.success('Edit Success!', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const [quizData, setquizData] = useState({
        title: '',
        detail: '',
    });

    
    const { quiz_id } = useParams();
    const teacherId = localStorage.getItem("teacherId")

    useEffect(() => {
       
        try {

            axios.get(baseurl + '/quiz/' + quiz_id)
                .then((res) => {
                    // console.log(res.data);
                    setquizData({
                        title: res.data.title,
                        detail: res.data.detail,
                    });
                })

        } catch (error) {
            console.log(error);
        }

    }, [quiz_id])



    const handleChange = (e) => {
        setquizData({
            ...quizData,
            [e.target.name]: e.target.value
        });
    }
    const handleClick = (e) => {
        const formData = new FormData();
        formData.append('teacher', teacherId)
        formData.append('title', quizData.title)
        formData.append('detail', quizData.detail)
        try {

            axios.put(baseurl + '/quiz/' + quiz_id, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((res) => {
                // console.log(res.data);
                notify();
                setTimeout(() => {
                    window.location.href = '/quiz'
                }, 1000);
                

                
            })

        } catch (error) {
            console.log(error);
        }
        setquizData({
            title: '',
            detail: '',
        })


    }




    return (
        <div className="container mb-5 mt-5">
            <ToastContainer />
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Edit Quiz</h5>
                        <div className="card-body">
                         
                                <div className="row mb-3">
                                    <label
                                        className="col-sm-2 form-label"
                                    >
                                        Title
                                    </label>
                                    <div className="col-sm-10">
                                        <input type="text" onChange={handleChange} name="title" value={quizData.title}
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
                                        <textarea type="text" onChange={handleChange} name="detail" value={quizData.detail}
                                            className="form-control"
                                            aria-describedby="emailHelp" ></textarea>
                                    </div>
                                </div>

                                
                                
                                <hr />

                                <button onClick={handleClick} type="button" className="btn btn-primary">
                                    Edit
                                </button>
                           
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EditQuiz;
