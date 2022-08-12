import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseurl = 'http://127.0.0.1:8000/api/student/'

const Register = () => {

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

    const [studentData, setstudentData] = useState({
        full_name: '',
        email: '',
        password: '',
        qualification: '',
        mobile_no: '',
        address: '',
        interested_categories: '',
        status : '',
    });

    const handlechange = (e) => {

        setstudentData({
            ...studentData,
            [e.target.name]: e.target.value
        });
    }
    const submitform = async () => {

        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name);
        studentFormData.append("email", studentData.email);
        studentFormData.append("password", studentData.password);
        studentFormData.append("qualification", studentData.qualification);
        studentFormData.append("mobile_no", studentData.mobile_no);
        studentFormData.append("address", studentData.address);
        studentFormData.append("interested_categories", studentData.interested_categories);

        try {
            await axios.post(baseurl, studentFormData).then((res) => {

                setstudentData({
                    full_name: '',
                    email: '',
                    password: '',
                    qualification: '',
                    mobile_no: '',
                    address: '',
                    interested_categories: '',
                    status : 'success'
                })
                notify();
            });
        } catch (error) {
            notifyerror();
            console.log(error)
       }

    };

    return (
        <div className="container mb-5 mt-5">
            <ToastContainer />
            <div className="row">
                <div className="col-6 offset-3">
                    { studentData.status === 'success' && <p className='text-success'>Your Registation has completed successfully....</p> }
                    { studentData.status === 'error' && <p className='text-success'>Somethisng went wrong....</p> }
                    <div className="card">
                        <h5 className='card-header'>User Register</h5>
                        <div className="card-body">
                           
                                <div className="mb-3">
                                    <label  className="form-label">Full Name</label>
                                    <input onChange={handlechange} name="full_name" value={studentData.full_name} type="text" className="form-control"  aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Email</label>
                                    <input onChange={handlechange} name="email" value={studentData.email} type="text" className="form-control"  aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Qualification</label>
                                    <input onChange={handlechange} name="qualification" value={studentData.qualification} type="text" className="form-control"  aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Mobile Number</label>
                                    <input onChange={handlechange} name="mobile_no" value={studentData.mobile_no} type="text" className="form-control"  aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Address</label>
                                    <input onChange={handlechange} name="address" value={studentData.address} type="text" className="form-control"  aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Password</label>
                                    <input type="password" onChange={handlechange} name="password" value={studentData.password} className="form-control"  />
                                </div>
                                <div className="mb-3">
                                    <label  className="form-label">Interests</label>
                                    <textarea onChange={handlechange} name="interested_categories" value={studentData.interested_categories} className='form-control'></textarea>
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

export default Register