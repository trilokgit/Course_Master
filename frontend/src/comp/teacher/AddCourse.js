import React, { useState, useEffect } from "react";
import TeacherSidebar from "./TeacherSidebar";
import axios from 'axios'

const baseurl = "http://127.0.0.1:8000/api";

const AddCourse = () => {

    const [cats, setcats] = useState();
    const [courseData, setcourseData] = useState({
         
        category: "",
        teacher: "",
        title: "",
        description: "",
        featured_img: "",
        techs : ""
        

    });
    // teacher_id = 28
    const teacher_id = localStorage.getItem("teacherId");
    const handleClick = () => { 
       
        const formdata = new FormData();
        
       

        formdata.append('category', courseData.category);
        formdata.append('teacher', teacher_id);
        formdata.append('title', courseData.title);
        formdata.append('description', courseData.description);
        formdata.append('featured_img', courseData.featured_img, courseData.featured_img.name)
        formdata.append('techs', courseData.techs);   
        try {
            axios.post(baseurl + '/course/', formdata)
                .then((res) => {
                    // console.log(res.data);
                    setcourseData({

                        category: "",
                        teacher : "",
                        title: "",
                        description: "",
                        featured_img: "",
                        techs: ""


                    });
                })
        } catch (error) {
            console.log(error);
      }

        

    }
    const handleChange = (e) => {
        // console.log(typeof(e.target.value));
        setcourseData({
            ...courseData,
            [e.target.name]:e.target.value
        })

     }
    const onFilechange = (e) => { 
        setcourseData({
            ...courseData,
            [e.target.name]:e.target.files[0]
        })
    }
    
    useEffect(() => {
        
        axios.get(baseurl + '/category')
            .then((res) => {
                setcats(res.data);
        })

    }, [])

    
  



    return (
        <div className="container mb-5 mt-5">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Add Course</h5>
                        <div className="card-body">
                            <form>
                                <div className="row mb-3">
                                    <label
                                        className="col-sm-2 form-label"
                                    >
                                        Category
                                    </label>
                                    <div className="col-sm-10">
                                        <select name="category" onChange={handleChange} className="form-select form-select-sm mb-2">
                                            {
                                                cats ? cats.map((item, index) => {
                                                    
                                                    return <option key={index} value={item.id}>{ item.title }</option>
                                               }) : <option value="1">Nothing</option>
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
                                        <textarea type="text" onChange={handleChange}
                                            name="description" value={courseData.description}
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
                                            name="featured_img"
                                            onChange={onFilechange}

                                        />
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
                                            onChange={handleChange}
                                            name="techs"
                                            value={courseData.techs}
                                            className="form-control"
                                            aria-describedby="emailHelp" ></textarea>
                                    </div>
                                </div>
                                <hr />

                                <button onClick={handleClick} type="button" className="btn btn-primary">
                                    Upload
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AddCourse;
