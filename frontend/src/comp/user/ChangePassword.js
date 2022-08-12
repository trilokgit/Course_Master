import React from 'react'
import Sidebar from './Sidebar'
const ChangePassword = () => {
  return (
    

      <div className="container mb-5 mt-5">
          <div className="row">
              <aside className="col-md-3">
                  <Sidebar />

              </aside>
              <section className="col-md-9">
                  <div className="card">
                      <h5 className="card-header">Change Password</h5>
                      <div className="card-body">
                          <div className="row mb-4">
                              <label for="exampleInputEmail1" className="col-sm-2 form-label">New Password</label>
                              <div className="col-sm-10">
                                  <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                             </div>
                          </div>
                          <hr />
                          <button className="btn btn-primary">Update</button>
                      </div>
                  </div>

              </section>
          </div>
      </div>


  )
}

export default ChangePassword