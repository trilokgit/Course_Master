import React, { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import axios from 'axios'
import { useParams } from "react-router-dom";

const baseurl = "http://127.0.0.1:8000/api";

const EditCourse = () => {

    const [cats, setCats] = useState([]);
    const [courseData, setCourseData] = useState({
        category: '',
        title: '',
        description: '',
        prev_fimg : '',
        f_img: '',
        techs: ''
    });

   
    const { course_id } = useParams();

    useEffect(() => {
        try {
            axios.get(baseurl + '/category')
                .then((res) => {     
                    setCats(res.data)
                })
        } catch (error) {
            console.log(error)
        }

        try {

            axios.get(baseurl + '/teacher-course-detail/' + course_id)
                .then((res) => {
                    // console.log(res.data);
                    setCourseData({
                        category: res.data.category,
                        title: res.data.title,
                        description: res.data.description,
                        prev_fimg: res.data.featured_img,
                        f_img: '',
                        techs: res.data.techs,
                      
                    });
            })
            
        } catch (error) {
            console.log(error);
        }

    }, [course_id])

    // console.log(courseData);


    const handleChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value
        });
    }
    const onFilechange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]:e.target.files[0]
        })
    }

    const handleClick = (e) => {
        const teacherId = localStorage.getItem("teacherId")
        const formData = new FormData();
        formData.append('category', courseData.category)
        formData.append('teacher',teacherId)
        formData.append('title',courseData.title)
        formData.append('description', courseData.description)
        if (courseData.f_img !== '') {
            formData.append('featured_img', courseData.f_img, courseData.f_img.name)
        }
        formData.append('techs', courseData.techs)
        
        try {
            
            axios.put(baseurl + '/teacher-course-detail/' + course_id, formData, {
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            }).then((res) => {
                // console.log(res.data);
                window.location.href = '/add-course'
            })

        } catch (error) {
            console.log(error);
        }
             setCourseData({
                    category: '',
                    title: '',
                    description: '',
                    f_img: '',
                    techs: ''
                })


    }




    return (
        <div className="container mb-5 mt-5">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Edit Course</h5>
                        <div className="card-body">
                            <form>
                                <div className="row mb-3">
                                    <label
                                        className="col-sm-2 form-label"
                                    >
                                        Category
                                    </label>
                                    <div className="col-sm-10">
                                        <select onChange={handleChange} className="form-select form-select-sm mb-2" name="category">
                                            <option value="Select Category">Select Category</option>
                                            {
                                                cats.map((cat, index) => {
                                                    return <option value={cat.id} key={index}>{cat.title}</option>
                                               })    
                                            }

                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label
                                        className="col-sm-2 form-label"
                                    >
                                        Title
                                    </label>
                                    <div className="col-sm-10">
                                        <input type="text" onChange={handleChange} name="title" value={courseData.title}
                                            className="form-control"
                                            aria-describedby="emailHelp" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label
                                        className="col-sm-2 form-label"
                                    >
                                        Description
                                    </label>
                                    <div className="col-sm-10">
                                        <textarea type="text" onChange={handleChange} name="description" value={courseData.description}
                                            className="form-control"
                                            aria-describedby="emailHelp" ></textarea>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label
                                        className="col-sm-2 form-label"
                                    >
                                        Featured Image
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="file"
                                            className="form-control"
                                            aria-describedby="emailHelp"
                                            name="f_img"
                                            
                                            onChange={onFilechange}

                                        />
                                        {courseData.prev_fimg &&
                                            <img width="100%" height="400" className="mt-3 rounded" src={courseData.prev_fimg} alt="f_imag" />
                    
                                       }
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label
                                        className="col-sm-2 form-label"
                                    >
                                        Technologies
                                    </label>
                                    <div className="col-sm-10">
                                        <textarea type="text"
                                            name="techs"
                                            value={courseData.techs}
                                            onChange={handleChange}
                                            className="form-control"
                                            aria-describedby="emailHelp" ></textarea>
                                    </div>
                                </div>
                                <hr />

                                <button onClick={handleClick} type="button" className="btn btn-primary">
                                    Edit
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EditCourse;
