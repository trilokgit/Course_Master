import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios';
import { saveAs } from "file-saver";
import Swal from 'sweetalert2';

const baseurl = "http://127.0.0.1:8000/api";

const MyClasswork = () => {


    const student_id = localStorage.getItem('userId')
    const [assignmentData, setassignmentData] = useState([])
    const [data, setdata] = useState({
        'answer' : '',
    })

    useEffect(() => {

        try {

            axios.get(baseurl + '/fetch-all-student-classwork/' + student_id)
                .then((res) => {
                    // console.log(res.data);
                    setassignmentData(res.data);
                })

        } catch (error) {
            console.log(error);
        }
    },[student_id])
    const onFilechange = (e) => {
        setdata({
            ...data,
            [e.target.name]: e.target.files[0]
        })
    }


    const saveFile = (e, t) => {
        // console.log(t)
        saveAs(
            e,
            `${t}.pdf`
        );
    };

    const filesubmit = (e) => {

        const formdata = new FormData();
        formdata.append('title', e.title);
        formdata.append('detail', e.detail)
        // formdata.append('question', e.question)
        formdata.append('student', e.student.id)
        formdata.append('teacher', e.teacher.id)
        formdata.append('course', e.course.id)
        formdata.append('status', true)
        formdata.append('answer', data.answer, data.answer.name)
        

        try {

            axios.put(baseurl + '/data-load/' + e.id + '/', formdata, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((res) => {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Done',
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
                
            })

        } catch (error) {
            console.log(error);
        }

        
        
    }

    const fileUnsubmit = (e) => {
        const formdata = new FormData();
       

        try {

            axios.put(baseurl + '/data-modify/' + e.id + '/', formdata, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((res) => {
                // console.log(res.data.bool)

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Done',
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);

            })

        } catch (error) {
            console.log(error);
        }



    }



    return (


        <div className="container mb-5 mt-5">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />

                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">My Classwork</h5>
                        <div className="card-body">
                            <table className="table table-bordered">

                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Teacher Name</th>
                                        <th>Course Name</th>
                                        <th>Assignmet Question</th>
                                        <th>Upload Assignment</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        assignmentData.map((item, index) => (

                                            <tr key={index}>
                                                <td>{item.title}</td>
                                                <td>{ item.teacher.full_name }</td>
                                                <td>{item.course.title}</td>
                                                <td className='text-center'><button className='btn btn-primary btn-sm fw-bold' onClick={() => saveFile(item.question, item.title)} >Download PDF</button></td>
                                                <td width="30%">
                                                    {
                                                        item.answer ?
                                                            <>

                                                            <button onClick={()=>fileUnsubmit(item)} className='form-control mt-2 fw-bold btn btn-sm btn-warning'>Unsubmit</button>
                                                            </>
                                                        :
                                                        <>
                                                                <input name="answer" onChange={onFilechange} type="file" className='form-control' />   
                                                                <button onClick={()=>filesubmit(item)} className='form-control mt-2 fw-bold btn btn-sm btn-info'>Submit</button>

                                                                
                                                       </>    
                                                    }

                                                </td>
                                            </tr>


                                        ))
                                    }

                                </tbody>

                            </table>
                        </div>
                    </div>

                </section>
            </div>
        </div>






    )
}

export default MyClasswork