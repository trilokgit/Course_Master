import React, { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import axios from 'axios'
import Swal from 'sweetalert2'

const baseurl = "http://127.0.0.1:8000/api";

const TeacherProfileSettings = () => {

    const [teacherData, setteacherData] = useState({
        'full_name': '',
        'email': '',
        'qualification': '',
        'password': '',
        'prev_pimg': '',
        'p_img': '',
        'mobile_no': '',
        'skills': '',
    });


    const teacher_id = localStorage.getItem("teacherId");

    useEffect(() => {

        try {

            axios.get(baseurl + '/teacher/' + teacher_id)
                .then((res) => {
                    // console.log(res.data);
                    setteacherData({
                        full_name: res.data.full_name,
                        email: res.data.email,
                        qualification: res.data.qualification,
                        prev_pimg: res.data.profile_img,
                        p_img: '',
                        password: res.data.password,
                        mobile_no: res.data.mobile_no,
                        skills: res.data.skills,

                    });
                })

        } catch (error) {
            console.log(error);
        }

    }, [teacher_id])

    // console.log(teacherData);


    const handleChange = (e) => {
        setteacherData({
            ...teacherData,
            [e.target.name]: e.target.value
        });
        console.log(teacherData);
    }
    const onFilechange = (e) => {
        setteacherData({
            ...teacherData,
            [e.target.name]: e.target.files[0]
        })
    }

    const handleClick = (e) => {
        const formData = new FormData();
        formData.append('full_name', teacherData.full_name)
        formData.append('email', teacherData.email)
        formData.append('qualification', teacherData.qualification)
        formData.append('password', teacherData.password)
        if (teacherData.p_img !== '') {
            formData.append('profile_img', teacherData.p_img, teacherData.p_img.name)
        }
        formData.append('mobile_no', teacherData.mobile_no)
        formData.append('skills', teacherData.skills)

        try {

            axios.put(baseurl + '/teacher/' + teacher_id + '/', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((res) => {

                localStorage.setItem("teacherName", teacherData.full_name)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Updated Successfully',
                    showConfirmButton: false,
                    timer: 2000
                });
                setTimeout(function () {
                    window.location.href = "/teacher-dashboard"
                }, 1000);
            })

        } catch (error) {
            console.log(error);
        }



    }


    return (
        <div className="container mb-5 mt-5">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />

                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Profile Settings</h5>
                        <div className="card-body">

                            <div className="row mb-3">
                                <label className="col-sm-2 form-label">Full Name</label>
                                <div className="col-sm-10">
                                    <input name="full_name" onChange={handleChange} value={teacherData.full_name} type="text" className="form-control" aria-describedby="emailHelp" />

                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 form-label">Email</label>
                                <div className="col-sm-10">
                                    <input name="email" onChange={handleChange} value={teacherData.email} type="text" className="form-control" aria-describedby="emailHelp" />

                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 form-label">Qualification</label>
                                <div className="col-sm-10">
                                    <input name="qualification" onChange={handleChange} value={teacherData.qualification} type="text" className="form-control" aria-describedby="emailHelp" />

                                </div>
                            </div>
                            <div className="mb-3 row">


                                <label className="col-sm-2 form-label">Profile Image</label>
                                <div className="col-sm-10">
                                    <input
                                        type="file"
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        name="p_img"

                                        onChange={onFilechange}

                                    />

                                    {teacherData.prev_pimg &&
                                        <img width="100%" height="400" className="mt-3 rounded" src={teacherData.prev_pimg} alt={teacherData.full_name} />

                                    }

                                </div>
                            </div>
                            <div className="mb-3 row">

                                <label className="col-sm-2 form-label">Mobile</label>
                                <div className="col-sm-10">
                                    <input name="mobile_no" onChange={handleChange} value={teacherData.mobile_no} type="text" className="form-control" aria-describedby="emailHelp" />

                                </div>
                            </div>
                            <div className="mb-3 row">

                                <label className="col-sm-2 form-label">Skills</label>
                                <div className="col-sm-10">
                                    <input onChange={handleChange} name="skills" value={teacherData.skills} type="text" className="form-control" aria-describedby="emailHelp" />

                                </div>
                            </div>

                            <hr />
                           

                            <button onClick={handleClick} type="submit" className="btn btn-primary">Update</button>

                        </div>
                    </div>

                </section>
            </div>
        </div>

    )
}

export default TeacherProfileSettings