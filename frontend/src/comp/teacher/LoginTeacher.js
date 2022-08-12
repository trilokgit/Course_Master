import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseurl = "http://127.0.0.1:8000/api";

const LoginTeacher = () => {
    const notify = () => toast.success('Login Done...', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifyerror = () => toast.error('Somthing Error....', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });



    const [teacherLoginData, setteacherLoginData] = useState({
        "email": '',
        "password": ''
    })

    const changehandler = (e) => {
        setteacherLoginData({
            ...teacherLoginData,
            [e.target.name]: e.target.value
        })
    }

    const clickhandler = async () => {

        try {
            const teacherFormData = new FormData();
            teacherFormData.append('email', teacherLoginData.email)
            teacherFormData.append('password', teacherLoginData.password)


            await axios.post(baseurl + '/teacher-login', teacherFormData)
                .then((res) => {
                    
                    if (res.data.bool === true) {
                        notify();
                        localStorage.setItem("teacherLoginStatus", true)
                        localStorage.setItem("teacherId",res.data.teacher_id)
                        localStorage.setItem("teacherName", res.data.teacher_name)
                        setTimeout(function () {
                            window.location.href = 'teacher-dashboard'
                        }, 2000);
                    } else {
                        notifyerror();
                    }
                })

        } catch (error) {

            notifyerror();

        }

    }

    const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
    if (teacherLoginStatus === 'true') {
        window.location.href = 'teacher-dashboard'

    }


    return (

        <div className="container mb-5 mt-5">
            <ToastContainer />
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className='card-header'>Teacher Login</h5>
                        <div className="card-body">

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input onChange={changehandler} name='email' value={teacherLoginData.email} type="text" className="form-control" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input onChange={changehandler} name='password' value={teacherLoginData.password} type="password" className="form-control" />
                            </div>

                            <button onClick={clickhandler} type="submit" className="btn btn-primary">Login</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginTeacher;