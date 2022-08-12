import React, { useState, useEffect } from 'react'
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'


const baseurl = "http://127.0.0.1:8000/api";

const CourseChapters = () => {

  const [chapterData, setChapterData] = useState([]);
  const { course_id } = useParams();

  useEffect(() => {
    try {

      axios.get(baseurl + '/course-chapters/' + course_id)
        .then((res) => {
          setChapterData(res.data);
        });

    } catch (error) {
      console.log(error);
    }

  }, [course_id]);

  const clickhandlerdelete = (chapter_id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        try {
          axios.delete(baseurl + '/chapter/' + chapter_id)
            .then((res) => {
              // swalWithBootstrapButtons.fire(
              //   'Deleted!',
              //   'Your file has been deleted.',
              //   'success'
              // )
              try {

                axios.get(baseurl + '/course-chapters/' + course_id)
                  .then((res) => {
                    setChapterData(res.data);
                  });

              } catch (error) {
                console.log(error);
              }

            })

        } catch (error) {
          swalWithBootstrapButtons.fire(
            'error', 'Data has not been deleted!!'
          )
        }


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
      window.location.href = `/all-chapters/${course_id}`
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
            <h5 className="card-header">All Chapters ({chapterData.length}) <button className='float-end btn btn-warning border-0 fw-bold text-dark'><Link to={`/add-chapters/${course_id}`} className="text-dark">Add Chapter</Link></button></h5>
            <div className="card-body">
              <table className="table table-bordered">

                <thead>
                  <tr>
                    <th>Title of the Chapter</th>
                    <th>Video</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    chapterData.length > 0 ? chapterData.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td><Link to="#">{item.title} <br /> { item.description }</Link></td>
                          <td>
                            <video width="320" height="240" controls>
                              <source src={item.video} type="video/mp4" />
                            </video>
                          </td>
                          <td>{item.remarks}</td>
                          <td>
                            <button className="btn btn-sm btn-warning fw-bold border-0 rounded"><Link className='text-dark fw-bold' to={`/edit-chapter/${course_id}/` + item.id}><i className="bi bi-pencil"></i></Link></button>
                            <button onClick={() => clickhandlerdelete(item.id)} className="btn btn-sm btn-danger fw-bold border-0 rounded ms-3"><Link className='text-white' to={`/delete-chapter/` + item.id}><i className="bi bi-trash"></i></Link></button>
                          </td>
                        </tr>
                      )
                    }) : <>
                      <tr>
                        <td></td>
                        <td><h1 className='text-center text-danger'>Chapter Not Avaiable</h1></td>
                      </tr>
                    </>
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

export default CourseChapters
