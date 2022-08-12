import React, { useState, useEffect } from 'react'
import teacher from '../img/teacher.jpg'
import { Link } from 'react-router-dom'
import django from '../img/django.png'
import axios from 'axios'

const baseurl = 'http://127.0.0.1:8000/api';



const Home = () => {

  const [courseData, setCourseData] = useState([]);

  useEffect(() => {

    try {

      axios.get(baseurl + '/course/?result=4')
        .then((res) => {
          setCourseData(res.data);
        });

    } catch (error) {
      console.log(error);
    }

  }, []);

  // console.log(courseData);



 


  return (

    <div className="container mt-4">
      <h3 className='pb-1 mb-4 mt-5'>Latest Courses <Link to="/all-courses" className="float-end">See All</Link> </h3>
      <div className="row">
        {courseData && courseData.map((course, index) =>
          <div key={index} className="col-md-3 mb-5">
            <div className="card shadow">
              <Link to={`/detail/${course.id}`}><img className="card-img-top" src={course.featured_img} alt={course.title} /></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
              </div>
              <div className="card-footer">
                <div className="title text-dark fw-bold">
                  <span>Rating : 4.5/5 </span>
                  <span className="float-end">Views : 2505 </span>
                </div>
              </div>
            </div>
          </div>
        )}
        
      </div>
      <h3 className='pb-1 mb-4 mt-5'>Popular Courses  <Link to="/popular-courses" className="float-end">See All</Link></h3>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <Link to=""><img className="card-img-top" src={django} alt="Cardimagecap1" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Course Title</Link></h5>
            </div>
            <div className="card-footer">
              <div className="title text-dark fw-bold">
                <span>Rating : 4.5/5 </span>
                <span className="float-end">Views : 2505 </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Link to=""><img className="card-img-top" src={django} alt="Cardimagecap2" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Course Title</Link></h5>
            </div>
            <div className="card-footer">
              <div className="title text-dark fw-bold">
                <span>Rating : 4.5/5 </span>
                <span className="float-end">Views : 2505 </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Link to=""><img className="card-img-top" src={django} alt="Cardimagecap3" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Course Title</Link></h5>
            </div>
            <div className="card-footer">
              <div className="title text-dark fw-bold">
                <span>Rating : 4.5/5 </span>
                <span className="float-end">Views : 2505 </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Link to=""><img className="card-img-top" src={django} alt="Cardimagecap4" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Course Title</Link></h5>
            </div>
            <div className="card-footer">
              <div className="title text-dark fw-bold">
                <span>Rating : 4.5/5 </span>
                <span className="float-end">Views : 2505 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className='pb-1 mb-4 mt-5'>Popular Teachers  <Link to="/popular-teacher" className="float-end">See All</Link></h3>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <Link to=""><img className="card-img-top" src={teacher} alt="Cardimagcap5" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Teacher Name</Link></h5>
            </div>
            <div className="card-footer">
              <div className="title text-dark fw-bold">
                <span>Rating : 4.5/5 </span>
                <span className="float-end">Views : 2505 </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Link to=""><img className="card-img-top" src={teacher} alt="Cardimagecap6" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Teacher Name</Link></h5>
            </div>
            <div className="card-footer">
              <div className="title text-dark fw-bold">
                <span>Rating : 4.5/5 </span>
                <span className="float-end">Views : 2505 </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Link to=""><img className="card-img-top" src={teacher} alt="Cardimagecap7" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Teacher Name</Link></h5>
            </div>
            <div className="card-footer">
              <div className="title text-dark fw-bold">
                <span>Rating : 4.5/5 </span>
                <span className="float-end">Views : 2505 </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Link to=""><img className="card-img-top" src={teacher} alt="Cardimagecap8" /></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to="#">Teacher Name</Link></h5>
            </div>
            <div className="card-footer">
              <div className="title text-dark fw-bold">
                <span>Rating : 4.5/5 </span>
                <span className="float-end">Views : 2505 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className='pb-1 mb-4 mt-5'>Students Testimonial<Link to="#" className="float-end">See All</Link></h3>
      <div id="carouselExampleIndicators" className="carousel slide bg-dark mb-5 p-5" data-bs-ride="true">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <figure className="text-center text-white">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="text-white blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
          <div className="carousel-item">
            <figure className="text-center  text-white">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="text-white blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
          <div className="carousel-item">
            <figure className="text-center  text-white">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="text-white blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>

        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>

  )
}

export default Home