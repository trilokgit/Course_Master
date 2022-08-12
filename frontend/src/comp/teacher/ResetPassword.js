import React, { useState,useEffect } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'

const baseurl = "http://127.0.0.1:8000/api";




const ResetPassword = () => {

  const [teacherData, setteacherData] = useState({
    'full_name': '',
    'email': '',
    'qualification': '',
    'password': '',
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
            password: '',
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
    // console.log(teacherData);
  }

  const handleClick = (e) => {
    const formData = new FormData();
    formData.append('full_name', teacherData.full_name)
    formData.append('email', teacherData.email)
    formData.append('qualification', teacherData.qualification)
    formData.append('password', teacherData.password)
    formData.append('mobile_no', teacherData.mobile_no)
    formData.append('skills', teacherData.skills)

    try {

      axios.put(baseurl + '/teacher/' + teacher_id + '/', formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((res) => {
        console.log(res.data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Updated Successfully',
          showConfirmButton: false,
          timer: 2000
        });
      })

    } catch (error) {
      console.log(error);
    }



  }



  return (
    <>
      <div style={{ height: "110vh", width: "100%", marginTop: "-70px", zIndex: "1000", position: "absolute", backgroundColor: "white" }}>
        <h1 className='p-3 mt-3'>Reset Password</h1>
        <div className="row mt-3 p-5">
          <label className='col-sm-2' htmlFor="">Enter New Password</label>
          <div className="col-sm-6 mb-3">

            <input onChange={handleChange} name="password" value={teacherData.password} type="password" className='form-control' />

          </div>

          <button onClick={handleClick} className='btn btn-primary'>Change Password</button>
        </div>

      </div>
    </>
  )
}

export default ResetPassword