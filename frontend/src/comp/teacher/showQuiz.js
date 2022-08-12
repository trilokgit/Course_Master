import React, { useState, useEffect } from 'react'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const baseurl = "http://127.0.0.1:8000/api";

const ShowQuiz = () => {


    const [courseData, setCourseData] = useState([]);
    const { course_id } = useParams();

    useEffect(() => {

        const teacherId = localStorage.getItem("teacherId");
        try {

            axios.get(baseurl + '/course-quiz-questions/' + course_id)
                .then((res) => {
                    setCourseData(res.data);
                    console.log(res.data);

                });

        } catch (error) {
            console.log(error);
        }

    }, []);



    return (


        <div className="container mb-5 mt-5">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />

                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Quizes</h5>
                        <div className="card-body">
                            <table className="table table-bordered">

                                <thead>
                                    <tr>
                                        <th>Name of the Quiz</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        courseData.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>
                                                        { item.quiz.title}


                                                    </td>
                                                    <td>{ item.quiz.detail }</td>
                                                    <td>
                                                        <Link to={`/add-chapters/` + item.id} className="btn btn-sm btn-secondary fw-bold border-0 rounded ms-2">Show Questions</Link>


                                                    </td>
                                                </tr>
                                            )
                                        })
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

export default ShowQuiz;