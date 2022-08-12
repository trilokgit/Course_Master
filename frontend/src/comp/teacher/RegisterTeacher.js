import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseurl = 'http://127.0.0.1:8000/api/teacher/'

const RegisterTeacher = () => {
    const notify = () => toast.success('Registation Done...', {
        position: "top-center",
        autoClose: 2000,
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

    const [teacherData, setteacherData] = useState({
        'full_name': '',
        'email': '',
        'password': '',
        'qualification': '',
        'mobile_no': '',
        'skills': ''
    });

    const handlechange = (e) => {

        setteacherData({
            ...teacherData,
            [e.target.name]: e.target.value
        });
    }
    // console.log(teacherData);
    const submitform = async () => {

        const teacherFormData = new FormData();
        teacherFormData.append("full_name", teacherData.full_name);
        teacherFormData.append("email", teacherData.email);
        teacherFormData.append("password", teacherData.password);
        teacherFormData.append("qualification", teacherData.qualification);
        teacherFormData.append("mobile_no", teacherData.mobile_no);
        teacherFormData.append("skills", teacherData.skills);

        try {
            await axios.post(baseurl, teacherFormData).then((res) => {

                setteacherData({
                    'full_name': '',
                    'email': '',
                    'password': '',
                    'qualification': '',
                    'mobile_no': '',
                    'skills': ''
                })
                notify();

            });
        } catch (error) {
            notifyerror();
            console.log(error);
      }

    };

    // const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
    // if (teacherLoginStatus === 'true') {
    //     window.location.href = 'teacher-dashboard'

    // }




    return (
        <div className="container mb-5 mt-5">
            <ToastContainer />
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className='card-header'>Teacher Register</h5>
                        <div className="card-body">

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                                <input value={teacherData.full_name} name='full_name' onChange={handlechange} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail2" className="form-label">Email</label>
                                <input value={teacherData.email} name='email' onChange={handlechange} type="text" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword3" className="form-label">Password</label>
                                <input value={teacherData.password} name='password' onChange={handlechange} type="password" className="form-control" id="exampleInputPassword3" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail4" className="form-label">Qualification</label>
                                <input value={teacherData.qualification} name='qualification' onChange={handlechange} type="text" className="form-control" id="exampleInputEmail4" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail5" className="form-label">Mobile Number</label>
                                <input value={teacherData.mobile_no} name='mobile_no' onChange={handlechange} type="text" className="form-control" id="exampleInputEmail5" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword6" className="form-label">Skills</label>
                                <textarea value={teacherData.skills} name='skills' onChange={handlechange} className='form-control'></textarea>
                                <div className='form-text'>Python,Django,JavaScript etc..</div>
                            </div>

                            <button onClick={submitform} type="submit" className="btn btn-primary">Create Account</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterTeacher