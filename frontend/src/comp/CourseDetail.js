import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const baseurl = 'http://127.0.0.1:8000/api';
const SiteUrl = 'http://127.0.0.1:8000/';

const CourseDetail = () => {

  const notify = () => toast.success('Done...', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });


  const [courseData, setcourseData] = useState([]);
  const [chapterData, setchapterData] = useState([]);
  const [teacherData, setteacherData] = useState([]);
  const [relatedCourseData, setrelatedCourseData] = useState([]);
  const [userLoginStatus, setStatus] = useState();
  const [enrollStatus, setenrollStatus] = useState();
  const [techListData, settechListData] = useState([]);
  const [ratingStatus, setratingStatus] = useState();
  var [AvgRating, setAvgRating] = useState(0)
  const [FavoriteStatus, setFavoriteStatus] = useState();
  const [comment, setcomment] = useState({
    comment: '',
  })

  let { course_id } = useParams()
  const student_id = localStorage.getItem("userId");

  var [one, setone] = useState();
  var [two, settwo] = useState();
  var [three, setthree] = useState();
  var [four, setfour] = useState();
  var [five, setfive] = useState();

  const [review, setreview] = useState([]);
  const [mycomment, setmycommnet] = useState([]);


  useEffect(() => {

    try {
      axios.get(baseurl + '/my-comment/' + course_id)
        .then((res) => {
          // console.log(res.data);
          setmycommnet(res.data);
         

      })
    } catch (error) {
      console.log(error);
    }

    try {

      axios.get(baseurl + '/course-rating/' + course_id)
        .then((res) => {
          setreview(res.data);
          // console.log(res.data);
        })

    } catch (error) {
      console.log(error);
    }



    try {

      axios.get(baseurl + '/rating-count/' + course_id)
        .then((res) => {
          setone((res.data.one / res.data.total_reviews) * 100)
          settwo((res.data.two / res.data.total_reviews) * 100)
          setthree((res.data.three / res.data.total_reviews) * 100)
          setfour((res.data.four / res.data.total_reviews) * 100)
          setfive((res.data.five / res.data.total_reviews) * 100)
        })

    } catch (error) {
      console.log(error);
    }

    try {

      axios.get(baseurl + '/course/' + course_id)
        .then((res) => {
          // console.log(res.data);
          setcourseData(res.data);
          setchapterData(res.data.course_chapters);
          setteacherData(res.data.teacher);
          setrelatedCourseData(JSON.parse(res.data.related_videos));
          settechListData(res.data.tech_list);
          if (res.data.course_rating !== '' && res.data.course_rating !== null) {
            setAvgRating(res.data.course_rating)
          }


        });

    } catch (error) {
      console.log(error);
    }

    try {

      if (student_id !== null) {
        axios.get(baseurl + '/fetch-enroll-status/' + student_id + '/' + course_id)
          .then((res) => {
            if (res.data.bool === true) {

              setenrollStatus('success');

            }
            // console.log(res.data);
          });
      }
    } catch (error) {
      console.log(error);
    }

    try {

      if (student_id !== null) {
        axios.get(baseurl + '/fetch-rating-status/' + student_id + '/' + course_id)
          .then((res) => {
            if (res.data.bool === true) {
              setratingStatus('success');
            }
          });
      }
    } catch (error) {
      console.log(error);
    }


    try {

      if (student_id != null) {
        axios.get(baseurl + '/fetch-favorite-status/' + student_id + '/' + course_id)
          .then((res) => {
            // console.log(res.data.bool)
            if (res.data.bool === true) {
              setFavoriteStatus('success');
            } else {
              setFavoriteStatus('');
            }
          })
      }

    } catch (error) {
      console.log(error);
    }



    const studentLoginStatus = localStorage.getItem('userLoginStatus');
    if (studentLoginStatus === 'true') {
      setStatus('success');
    }





  }, [course_id, student_id]);
  five = parseFloat(five).toFixed(2);
  four = parseFloat(four).toFixed(2);
  three = parseFloat(three).toFixed(2);
  two = parseFloat(two).toFixed(2);
  one = parseFloat(one).toFixed(2);
  AvgRating = parseFloat(AvgRating).toFixed(1)


  const deletecomment = (e) => {
  
    try {
      
      axios.delete(baseurl + '/delete-comment/' + e)
        .then((res) => {
          
          if (res.data.bool === true) {
               
            window.location.reload();
           

          }

      })

    } catch (error) {
      console.log(error);
    }
       
  }



  const enrollCourse = () => {



    const formdata = new FormData();
    formdata.append('course', course_id)
    formdata.append('student', student_id)

    try {

      axios.post(baseurl + '/student-enroll-course/', formdata, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'You have Enrolled Course.....',
              showConfirmButton: false,
              timer: 1500
            });
            setenrollStatus('success');
          }
        })

    } catch (error) {
      console.log(error);
    }



  }


  //Add Rating
  const [ratingData, setratingData] = useState({
    rating: '',
    reviews: ''
  });
  const handleChange = (e) => {
    setratingData({
      ...ratingData,
      [e.target.name]: e.target.value
    });
  }

  const commentchange = (e) => {

    setcomment({
      ...comment,
      [e.target.name]: e.target.value
    })

  }
  


  const commentsubmit = () => {

    const formdata = new FormData();
    formdata.append('comment', comment.comment);
    formdata.append('course', course_id)
    formdata.append('student', student_id);

    try {
      axios.post(baseurl + '/my-comment', formdata)
        .then((res) => {
          // console.log(res.data);
          notify();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          setcomment({
            comment : '',
          })
        })
    } catch (error) {
      console.log(error);
    }

  }


  const handlesubmit = () => {

    const formData = new FormData();
    formData.append('rating', ratingData.rating);
    formData.append('reviews', ratingData.reviews)
    formData.append('course', course_id)
    formData.append('student', student_id)

    try {

      axios.post(baseurl + '/course-rating/' + course_id, formData,)
        .then((res) => {
          // console.log(res.data);
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Rating has been saved',
              showConfirmButton: false,
              timer: 2000
            });

            setTimeout(function () {
              window.location.reload();
            }, 1000);
          }




        })

    } catch (error) {
      console.log(error);
    }
    setratingData({
      rating: '',
      reviews: ''
    })

  }


  // console.log(courseData);

  const saveAsFav = () => {

    const formdata = new FormData();
    formdata.append('course', course_id)
    formdata.append('student', student_id)
    formdata.append('status', true)

    try {

      axios.post(baseurl + '/student-add-favorite-course/', formdata, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((res) => {
        // console.log(res);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Added To Favorite Course',
            showConfirmButton: false,
            timer: 1000
          });
          setFavoriteStatus('success');
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1500);
        }
      })

    } catch (error) {
      console.log(error);
    }

  }


  const removeAsFav = (pk) => {
    const formdata = new FormData();
    formdata.append('course', course_id)
    formdata.append('student', student_id)
    formdata.append('status', false)

    try {

      axios.get(baseurl + '/student-remove-favorite-course/' + course_id + '/' + student_id, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((res) => {
        // console.log(res);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Removed To Favorite Course',
            showConfirmButton: false,
            timer: 1000
          });
          setFavoriteStatus('');
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1500);
        }
      })

    } catch (error) {
      console.log(error);
    }

  }



  return (

    <div className="container mt-5">
      <ToastContainer />
      <div className="row">
        <div className="col-4">
          <img width="100%" height="100%" className='img-thumbnail shadow' src={courseData.featured_img} alt="course_image_title" />
        </div>
        <div className="col-8">
          <h1>{courseData.title}
            {
              userLoginStatus === 'success' && FavoriteStatus !== 'success' &&

              <span onClick={saveAsFav} title="Add to Favorite Course List" className='text-dark ms-3'><i className="fs-2 bi bi-heart-fill"></i></span>

            }
            {
              userLoginStatus === 'success' && FavoriteStatus === 'success' &&

              <span onClick={removeAsFav} title="Remove to Favorite Course List" className='text-warning ms-3'><i className="bi bi-star-fill"></i></span>

            }
          </h1>
          <hr />
          <p className='lh-lg'> {courseData.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
            ab delectus aut officiis quas corporis omnis eos qui provident quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A illo inventore qui quos,
            distinctio perferendis tenetur provident nesciunt iste veritatis!</p>
          <p className='fw-bold'>Course By: <Link data-toggle="tooltip" data-placement="bottom" title="Click To see Teacher Details" to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
          <p className='fw-bold'>Course Duration: <a href="/">3 Hours 30 Minuts</a></p>
          <p className='fw-bold'>Course Techs :  {
            techListData.map((item, index) => {
              return <Link className='badge rounded-pill fw-bold border-0 text-bg-warning ms-2' to={`/category-courses/${item.trim()}`} key={index}>{item} </Link>
            })
          }</p>
          <p className='fw-bold'>Total Enrolled: <a href="/"><span className='badge rounded-pill fw-bold border-0 text-bg-dark ms-1'>{courseData.total_enrolled_students}</span> Students</a></p>
          <p className='fw-bold'>

            Rating : {AvgRating}/5
            {
              ratingStatus !== 'success' && enrollStatus === 'success' &&

              <button className='btn btn-success btn-sm ms-2' data-bs-toggle="modal" data-bs-target="#ratingModal">Rating</button>
            }
            {
              ratingStatus === 'success' &&
              <span className='badge rounded-pill fw-bold border-0 text-bg-info ms-3'>You already rated this course</span>
            }
          </p>
          {userLoginStatus === 'success' && enrollStatus === 'success' &&
            <>

              <div className="modal fade" id="ratingModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Rate for {courseData.title}</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                      <div className="mb-3">
                        <label className="form-label">Rating <i className="text-warning bi bi-star-fill"></i></label>
                        <select onChange={handleChange} value={ratingData.rating} className='form-control' name="rating" id="">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Review</label>
                        <textarea onChange={handleChange} value={ratingData.reviews} rows="5" className='form-control' name="reviews"></textarea>
                      </div>
                      <button onClick={handlesubmit} type="submit" className="btn fw-bold btn-warning form-control">Submit</button>

                    </div>

                  </div>
                </div>
              </div>
            </>
          }


          {userLoginStatus === 'success' && enrollStatus === 'success' &&
            <p className='badge rounded-pill fw-bold border-0 text-bg-danger p-2'><span>You enrolled this course</span></p>
          }
          {userLoginStatus === 'success' && enrollStatus !== 'success' &&

            <p><button data-bs-toggle="tooltip" data-bs-placement="bottom" title="Click To Enroll" type='button' onClick={enrollCourse} className='btn btn-success fw-bold'>Enroll For This Course</button></p>

          }

          {userLoginStatus !== 'success' &&

            <p data-bs-toggle="tooltip" data-bs-placement="bottom" title="Click To Login" ><Link to='/user-login'><button type='button' className='btn btn-success fw-bold'>Pleace Login To Enroll</button></Link></p>

          }


        </div>
      </div>

      <div className="card shadow mt-5">
        <div className="card-header fw-bold text-dark">
          In this course
        </div>
        {userLoginStatus === 'success' && enrollStatus === 'success' &&

          <ul className="list-group list-group-flush">
            {chapterData.map((chapter, index) =>
              <li key={index} className="list-group-item">{chapter.title}
                <span className='float-end'>
                  <span className='me-3'>1 Hour 30 Minuts</span>
                  <button className='btn btn-sm btn-danger py-0 px-2' data-bs-toggle="modal" data-bs-target="#exampleModal"><i className=" text-white bi-youtube"></i>
                  </button>
                </span>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Video 1</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className="ratio ratio-16x9">
                          <iframe src="" title={chapter.title} allowFullScreen></iframe>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </li>
            )}
          </ul>

        }
        {enrollStatus !== 'success' &&
          <>
            <div className="card-header fw-bold text-danger">
              Enroll and Login To see the chapters
            </div>
          </>

        }
      </div>

      <h3 className='pb-1 mb-4 mt-5'>Related Courses</h3>
      <div className="row mb-5">
        {relatedCourseData.map((item, index) =>


          <div key={index} className="col-md-3">
            <div className="card shadow">
              <Link target="_blank" to={`/detail/${item.pk}`}><img className="card-img-top" src={`${SiteUrl}media/${item.fields.featured_img}`} alt={item.fields.title} /></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to={`/detail/${item.pk}`}>{item.fields.title}</Link></h5>
              </div>
            </div>
          </div>

        )}
      </div>


      <h1 className='mb-5'>Student Feedbacks & Ratings</h1>

      <div className="container mt-5 p-3">
        <div className="row">
          <div className="col-2 mb-5 text-center">
            <h1 className='fw-bold text-warning' style={{ fontSize: "100px" }}>{AvgRating}</h1>
            {AvgRating >= 5 &&
              <h6><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i></h6>
            }
            {AvgRating >= 4 && AvgRating <= 4.5 &&
              <h6><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="bi bi-star-half text-warning ms-2"></i></h6>
            }
            {AvgRating === 3 &&
              <h6><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i></h6>
            }
            {AvgRating > 3 && AvgRating <= 3.5 &&
              <h6><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="bi bi-star-half text-warning ms-2"></i></h6>
            }
            {AvgRating === 2 &&
              <h6><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i></h6>
            }
            {AvgRating > 2 && AvgRating <= 2.5 &&
              <h6><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="bi bi-star-half text-warning ms-2"></i></h6>
            }
            {AvgRating > 1 && AvgRating <= 1.5 &&
              <h6><i className="text-warning bi bi-star-fill ms-2"></i><i className="bi bi-star-half text-warning ms-2"></i></h6>
            }
            {AvgRating === 1 &&
              <h6><i className="text-warning bi bi-star-fill ms-2"></i></h6>
            }
            <h6 className='text-success fw-bold'>Course Rating</h6>
          </div>
          <div className="col-8">
            <div className="progress mb-3">
              <div className="progress-bar progress-bar-striped bg-warning fw-bold" role="progressbar" style={{ width: `${five}%` }} aria-valuenow={five} aria-valuemin="0" aria-valuemax="100">{five}%</div>
            </div>
            <div className="progress mb-3">
              <div className="progress-bar progress-bar-striped bg-success fw-bold" role="progressbar" style={{ width: `${four}%` }} aria-valuenow={four} aria-valuemin="0" aria-valuemax="100">{four}%</div>
            </div>
            <div className="progress mb-3">
              <div className="progress-bar progress-bar-striped bg-info fw-bold" role="progressbar" style={{ width: `${three}%` }} aria-valuenow={three} aria-valuemin="0" aria-valuemax="100">{three}%</div>
            </div>
            <div className="progress mb-3">
              <div className="progress-bar progress-bar-striped bg-secondary fw-bold" role="progressbar" style={{ width: `${two}%` }} aria-valuenow={two} aria-valuemin="0" aria-valuemax="100">{two}%</div>
            </div>
            <div className="progress mb-3">
              <div className="progress-bar progress-bar-striped bg-danger fw-bold" role="progressbar" style={{ width: `${one}%` }} aria-valuenow={one} aria-valuemin="0" aria-valuemax="100">{one}%</div>
            </div>
          </div>
          <div className="col-2">
            <h6 className='fw-bold' style={{ marginTop: "-4px" }}><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i></h6>
            <h6 style={{ marginTop: "15px" }}><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i></h6>
            <h6 style={{ marginTop: "15px" }}><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i></h6>
            <h6 style={{ marginTop: "15px" }}><i className="text-warning bi bi-star-fill ms-2"></i><i className="text-warning bi bi-star-fill ms-2"></i></h6>
            <h6 style={{ marginTop: "15px" }}><i className="text-warning bi bi-star-fill ms-2"></i></h6>
          </div>
        </div>
      </div>

      <div  className='mb-5 bg-dark text-white p-3'>

        <span className='fw-bold fs-1'>{review.length + mycomment.length} Comments</span>
        <div className='mt-2 mb-5'>
          <div className='row mt-4'>

            <div className="col-sm-10 p-1 bg-white rounded">
              <TextField value={comment.comment} onChange={commentchange} name="comment" fullWidth color='info' id="standard-basic" label="Comments" variant="standard" />
            </div>
            <div className="col-sm-2">
              <button onClick={commentsubmit} className='btn btn-danger p-3 form-control' type='button'>Comment</button>
            </div>

          </div>
        </div>

       
        <div style={{ height: "100vh" }} className='scr'>
          {
            mycomment.map((item, index) => (
              <div key={index} className='mt-4 row'>
                <div className="col-sm-1">
                  <h1 className='text-center'><i className="bi bi-person-circle text-info"></i></h1>
                </div>
                <div className="col-sm-11" style={{ lineHeight: '8px' }}>
                  <h6 style={{ fontSize: "18px" }}>{item.student.full_name} <small style={{ fontSize: "12px" }} className='ms-1 text-secondary fw-bold'> {item.add_time}</small> </h6>
                  <small style={{ fontSize: "15px" }}>{item.comment}</small>
                  <h6 className='mt-3 text-info'> <i title='I like this' className="bi bi-hand-thumbs-up"> <small>126</small> </i><i title='I dislike this' className="ms-2 bi bi-hand-thumbs-down"> <small>50</small> <small className='ms-2 text-secondary fw-bold'>REPLY</small>
                  </i>{item.student.id === JSON.parse(student_id) && <small className='ms-2 text-danger'><i onClick={()=>deletecomment(item.id)}>Delete</i></small>}</h6>
                </div>
              </div>
            ))
          }
          {
            review.map((item, index) => (
              <div key={index} className='mt-4 row'>
                <div className="col-sm-1">
                  <h1 className='text-center'><i className="bi bi-person-circle text-info"></i></h1>
                </div>
                <div className="col-sm-11" style={{ lineHeight: '8px' }}>
                  <h6 style={{ fontSize: "18px" }}>{item.student.full_name} <small style={{ fontSize: "12px" }} className='ms-1 text-secondary fw-bold'> {item.review_time}</small></h6>
                  <small style={{ fontSize: "15px" }}>{item.reviews}</small>
                  <h6 className='mt-3 text-info'> <i title='I like this' className="bi bi-hand-thumbs-up"> <small>126</small> </i><i title='I dislike this' className="ms-2 bi bi-hand-thumbs-down"> <small>50</small> <small className='ms-2 text-secondary fw-bold'>REPLY</small></i></h6>
                </div>
              </div>
            ))
          }
       </div>




      </div>

    </div>

  )
}

export default CourseDetail;
