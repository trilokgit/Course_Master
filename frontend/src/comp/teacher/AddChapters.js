import React, { useState } from "react";
import TeacherSidebar from "./TeacherSidebar";
import { useParams } from "react-router-dom";
import axios from 'axios'

const baseurl = "http://127.0.0.1:8000/api";

const AddChapters = () => {
    const [chapterData, setChapterData] = useState({
        title: '',
        description: '',
        video: '',
        remarks: ''
    });


    const handleChange = (e) => {
        setChapterData({
            ...chapterData,
            [e.target.name]: e.target.value
        });
    }
    const onFilechange = (e) => {
        setChapterData({
            ...chapterData,
            [e.target.name]: e.target.files[0]
        })
    }
    const { course_id } = useParams();
    
    const handleClick = (e) => {
        // const teacherId = localStorage.getItem("teacherId")
        const formData = new FormData();
        formData.append('course', course_id);
        formData.append('title', chapterData.title)
        formData.append('description', chapterData.description)
        formData.append('video', chapterData.video, chapterData.video.name)
        formData.append('remarks', chapterData.remarks)

        try {

            axios.post(baseurl + '/chapter/', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((res) => {
                // console.log(res.data);
                window.location.href = `/add-chapters/${course_id}`;
            })

        } catch (error) {
            console.log(error);
        }
        setChapterData({
            title: '',
            description: '',
            video: '',
            remarks: ''
        })


    }


  return (
      <>
          
          <div className="container mb-5 mt-5">
              <div className="row">
                  <aside className="col-md-3">
                      <TeacherSidebar />
                  </aside>
                  <section className="col-md-9">
                      <div className="card">
                          <h5 className="card-header">Add Chapter</h5>
                          <div className="card-body">
                              <form>
                                 
                                  <div className="row mb-3">
                                      <label
                                          className="col-sm-2 form-label"
                                      >
                                          Title
                                      </label>
                                      <div className="col-sm-10">
                                          <input type="text" onChange={handleChange} name="title" value={chapterData.title}
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
                                          <textarea type="text" onChange={handleChange} name="description" value={chapterData.description}
                                              className="form-control"
                                              aria-describedby="emailHelp" ></textarea>
                                      </div>
                                  </div>

                                  <div className="mb-3 row">
                                      <label
                                          className="col-sm-2 form-label"
                                      >
                                         Chapter Video
                                      </label>
                                      <div className="col-sm-10">
                                          <input
                                              type="file"
                                              className="form-control"
                                              aria-describedby="emailHelp"
                                              name="video"

                                              onChange={onFilechange}

                                          />
                                      </div>
                                  </div>
                                  <div className="row mb-3">
                                      <label
                                          className="col-sm-2 form-label"
                                      >
                                          Remarks
                                      </label>
                                      <div className="col-sm-10">
                                          <textarea type="text"
                                              name="remarks"
                                              value={chapterData.remarks}
                                              onChange={handleChange}
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
          


   </>
  )
}

export default AddChapters