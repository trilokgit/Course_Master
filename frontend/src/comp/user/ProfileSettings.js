import React from 'react'
import Sidebar from './Sidebar'
const ProfileSettings = () => {
    return (

        <div className="container mb-5 mt-5">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />

                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Profile Settings</h5>
                        <div className="card-body">
                            <form>
                                <div className="row mb-3">
                                    <label for="exampleInputEmail1" className="col-sm-2 form-label">User Name</label>
                                    <div className="col-sm-10">
                                        <input disabled placeholder='ttrilok363' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="exampleInputEmail1" className="col-sm-2 form-label">Full Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label for="exampleInputEmail1" className="col-sm-2 form-label">Email address</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>
                                </div>
                                <div className="mb-3 row">

                                    <label for="exampleInputEmail1" className="col-sm-2 form-label">Profile Image</label>
                                    <div className="col-sm-10">
                                        <input type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>
                                </div>
                                <div className="mb-3 row">

                                    <label for="exampleInputEmail1" className="col-sm-2 form-label">Interest</label>
                                    <div className="col-sm-10">
                                        <input type="text" placeholder="python,django,javaScrip..." className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>
                                </div>

                                <hr />

                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>

                </section>
            </div>
        </div>


    )
}

export default ProfileSettings
