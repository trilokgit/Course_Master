import React from 'react'
import { Link } from 'react-router-dom'
import django from '../img/django.png'
import axios from 'axios'

const PopularCourses = () => {

 

    return (

        <div className="container mt-4">
            <h3 className='pb-1 mb-4 mt-5'>Popular Courses</h3>
            <div className="row">
                <div className="col-md-3 mb-5">
                    <div className="card shadow">
                        <Link to="/detail/1"><img className="card-img-top" src={django} alt="Card image cap" /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
                        </div>
                        <div className="card-footer">
                            <div className="title text-dark fw-bold">
                                <span>Rating : 4.5/5 </span>
                                <span className="float-end">Views : 2505 </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-5">
                    <div className="card shadow">
                        <Link to=""><img className="card-img-top" src={django} alt="Card image cap" /></Link>
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
                <div className="col-md-3 mb-5">
                    <div className="card shadow">
                        <Link to=""><img className="card-img-top" src={django} alt="Card image cap" /></Link>
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
                <div className="col-md-3 mb-5">
                    <div className="card shadow">
                        <Link to=""><img className="card-img-top" src={django} alt="Card image cap" /></Link>
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
                <div className="col-md-3 mb-5">
                    <div className="card shadow">
                        <Link to=""><img className="card-img-top" src={django} alt="Card image cap" /></Link>
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
                <div className="col-md-3 mb-5">
                    <div className="card shadow">
                        <Link to=""><img className="card-img-top" src={django} alt="Card image cap" /></Link>
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
                <div className="col-md-3 mb-5">
                    <div className="card shadow">
                        <Link to=""><img className="card-img-top" src={django} alt="Card image cap" /></Link>
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
                <div className="col-md-3 mb-5">
                    <div className="card shadow">
                        <Link to=""><img className="card-img-top" src={django} alt="Card image cap" /></Link>
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
                <div className="col-md-3 mb-5">
                    <div className="card shadow">
                        <Link to=""><img className="card-img-top" src={django} alt="Card image cap" /></Link>
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
                <div className="col-md-3 mb-5">
                    <div className="card shadow">
                        <Link to=""><img className="card-img-top" src={django} alt="Card image cap" /></Link>
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
                <div className="col-md-3 mb-5">
                    <div className="card shadow">
                        <Link to=""><img className="card-img-top" src={django} alt="Card image cap" /></Link>
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
                <div className="col-md-3 mb-5">
                    <div className="card shadow">
                        <Link to=""><img className="card-img-top" src={django} alt="Card image cap" /></Link>
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

            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center mb-5">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>

        </div>

    )
}

export default PopularCourses;