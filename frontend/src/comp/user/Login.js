import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseurl = "http://127.0.0.1:8000/api";

const Login = () => {
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
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });



    const [userLoginData, setuserLoginData] = useState({
        "email": '',
        "password": ''
    })

    const changehandler = (e) => {
        setuserLoginData({
            ...userLoginData,
            [e.target.name]: e.target.value
        })
    }

    const clickhandler = async () => {

        try {
            const userFormData = new FormData();
            userFormData.append('email', userLoginData.email)
            userFormData.append('password', userLoginData.password)


            await axios.post(baseurl + '/user-login', userFormData)
                .then((res) => {

                    if (res.data.bool === true) {
                        notify();
                        localStorage.setItem("userLoginStatus", true)
                        localStorage.setItem("userId", res.data.user_id)
                        localStorage.setItem("userName", res.data.user_name)
                        setTimeout(function () {
                            window.location.href = 'user-dashboard'
                        }, 2000);
                    } else {
                        notifyerror();
                    }
                })

        } catch (error) {

            notifyerror();

        }

    }

    const userLoginStatus = localStorage.getItem("userLoginStatus");
    if (userLoginStatus === 'true') {
        window.location.href = 'user-dashboard'

    }


    return (

        <div className="container mb-5 mt-5">
            <ToastContainer />
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className='card-header'>User Login</h5>
                        <div className="card-body">

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input onChange={changehandler} name='email' value={userLoginData.email} type="text" className="form-control" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input onChange={changehandler} name='password' value={userLoginData.password} type="password" className="form-control" />
                            </div>

                            <button onClick={clickhandler} type="submit" className="btn btn-primary">Login</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;