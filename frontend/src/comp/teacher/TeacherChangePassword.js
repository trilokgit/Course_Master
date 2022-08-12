import React, { useState } from 'react'
import axios from 'axios'
import TeacherSidebar from './TeacherSidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseurl = 'http://127.0.0.1:8000/api'


const TeacherChangePassword = () => {
    const notify = () => toast.success('Check Your Email Id', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifyerror = () => toast.error('Something Wrong', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const [emaildata, setemaildata] = useState({
        'email': '',
        "teacher_id": "",
    });


    const handlechange = (e) => {

        setemaildata({
            ...emaildata,
            [e.target.name]: e.target.value
        });
    }

    const teacherId = localStorage.getItem("teacherId");

    const handleclick = () => {

        const formdata = new FormData();
        formdata.append("email", emaildata.email);
        formdata.append("teacher_id", teacherId);

        try {
            axios.post(baseurl + '/forget-password', formdata)
                .then((res) => {
                    // console.log(res.data)
                    res.data === "True" ? notify() : notifyerror()
                })
        } catch (error) {
            console.log(error);
        }

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
                        <h5 className="card-header">Change Password</h5>
                        <div className="card-body">
                            <div className="row mb-4">
                                <label className="col-sm-3 form-label">Enter Registered Email </label>
                                <div className="col-sm-9">
                                    <input name="email" value={emaildata.email} onChange={handlechange} type="email" className="form-control" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <hr />
                            <button onClick={handleclick} className="btn btn-primary">Send Link</button>
                        </div>
                    </div>

                </section>
            </div>
        </div>


    )
}

export default TeacherChangePassword;