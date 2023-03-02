import React from 'react'
import './css/bootstrap.css'
import './css/sb-admin.css'
import {
  Link
} from "react-router-dom";



const Sidebar = () => {
  return (

    <div>
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        {/* <!-- Brand and toggle get grouped for better mobile display --> */}
        <div class="navbar-header">
          {/* <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button> */}
          <div className="navbar-brand" ><Link to="/"> Admin</Link></div>
        </div>


        <div className="collapse navbar-collapse navbar-ex1-collapse">
          <ul className="nav navbar-nav side-nav">
            <li className="active"><Link to="/"><i className="fa fa-dashboard"></i> Dashboard</Link></li>
            <li><Link to="/teacher"><i className="fa fa-bar-chart-o"></i>Teacher</Link></li>
            <li><Link to="/student"><i className="fa fa-table"></i> Student</Link></li>
            <li><Link to="/commitie"><i className="fa fa-edit"></i>Committie</Link></li>
            <li><Link to="/commitieMember"><i className="fa fa-edit"></i>Committie Member</Link></li>

            <li><Link to="/session"><i className="fa fa-desktop"></i>Session</Link></li>
            <li><Link to="/section"><i className="fa fa-desktop"></i>Section</Link></li>
            <li><Link to="/department"><i className="fa fa-desktop"></i>Department</Link></li>


            <li><a href="blank-page.html"><i className="fa fa-file"></i> Logout</a></li>
          </ul>



        </div>
      </nav>

    </div>

  )
}

export default Sidebar