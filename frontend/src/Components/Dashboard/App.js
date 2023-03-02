import React from "react";
import About from "./Pages/About";

import Grouping from "./Pages/Group/Grouping";
import Product from "./Pages/Product";
// import PostIdea from "./Pages/PostIdea/IdeaPage";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Members from "./Pages/Group/members";
import LayoutStructure from "./Components/Dashboard/Layout/LayoutStructure";
import "./App.css";
import { useSelector } from "react-redux";
import auth from "../../reducers/auth";

import ViewIdeas from "./Pages/PostIdea/ViewIdeas";
import IdeaPage from "./Pages/PostIdea/IdeaPage";
import Queries from "./Pages/Queries/Queries";
import FormatUpload from "./Pages/FormatUpload";
import FormatDownload from "./Pages/FormatDownload";
// import Invitation from "./Pages/Group/InvitationConfirm";
import { useEffect } from "react";
import { getTeachers } from "./states/teacher/teacherSlice";
import { useDispatch } from "react-redux";
import { getCommitie } from "./states/committee/commitieSlice";

import TeacherFrame from "./Components/components/TeacherFrame";
import StudentFrame from "./Components/components/StudentFrame";

import Committie from "./Components/components/Committie";

import DepartmentFrame from "./Components/components/DepartmentFrame";

import { getStudents } from "./states/student/studentSlice";
import Section from "./Components/components/Section";
import CommittieMemberFrame from "./Components/components/CommittieMemberFrame";
import Session from "./Components/components/Session";

import { getDepartment } from "./states/department/departmentSlice";
import { getSession } from "./states/session/sessionSlice";

import { getSection } from "./states/section/sectionSlice";

import { getcommitteeMember } from "./states/comitteeMember/committeeMemberSlice";

function App() {
  const authData = useSelector((state) => state?.auth?.authData);
  const navigate = useNavigate();

  let userType = authData?.userType || "Student";
  return (
    <div className="App" style={{ backgroundColor: "white" }}>
      {(() => {
        if (userType.toLowerCase() === "student") {
          return (
            <>
              <LayoutStructure user={userType}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/About" element={<About />} />
                  <Route path="/Product" element={<Product />} />
                  {/* <Route path='/PostIdea' element={<PostIdea />}/> */}
                  {/* <Route path='/teacher' element={<Teacher />}/> */}
                  <Route path="/grouping" element={<Grouping />} />
                  {/* <Route path='/grouping/invite' element={<Invitation />}/> */}
                  <Route path="/members" element={<Members />} />
                  <Route path="/queries" element={<Queries />} />
                  <Route path="/formatUpload" element={<FormatUpload />} />
                  <Route path="/formatDownload" element={<FormatDownload />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/ViewIdeas" element={<ViewIdeas />} />
                  <Route path="/PostIdea" element={<IdeaPage />} />
                  <Route path="/ViewIdeas/DetailView" element={<IdeaPage />} />
                </Routes>
              </LayoutStructure>
            </>
          );
        } else if (userType.toLowerCase() === "admin") {
          
          const Func = () =>{
            const dispatch = useDispatch();
            useEffect(() => {
            dispatch(getCommitie());
          }, [dispatch]);

          useEffect(() => {
            dispatch(getDepartment());
          }, [dispatch]);

          useEffect(() => {
            dispatch(getTeachers());
          }, [dispatch]);

          useEffect(() => {
            dispatch(getStudents());
          }, [dispatch]);

          useEffect(() => {
            dispatch(getSession());
          }, [dispatch]);

          useEffect(() => {
            dispatch(getSection());
          }, [dispatch]);

          useEffect(() => {
            dispatch(getcommitteeMember());
          }, [dispatch]);}
          Func();

          return (
            <>
              <LayoutStructure user={userType}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/About" element={<About />} />
                  <Route path="/Product" element={<Product />} />
                  {/* <Route path='/PostIdea' element={<PostIdea />}/> */}
                  {/* <Route path='/teacher' element={<Teacher />}/> */}
                  <Route path="/grouping" element={<Grouping />} />
                  {/* <Route path='/grouping/invite' element={<Invitation />}/> */}
                  <Route path="/members" element={<Members />} />
                  <Route path="/queries" element={<Queries />} />
                  <Route path="/formatUpload" element={<FormatUpload />} />
                  <Route path="/formatDownload" element={<FormatDownload />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/ViewIdeas" element={<ViewIdeas />} />
                  <Route path="/PostIdea" element={<IdeaPage />} />
                  <Route path="/ViewIdeas/DetailView" element={<IdeaPage />} />
                  <Route path="/teacher" element={<TeacherFrame />}></Route>

                  <Route path="/student" element={<StudentFrame />}></Route>
                  <Route path="/commitie" element={<Committie />}></Route>
                  <Route
                    path="/commitieMember"
                    element={<CommittieMemberFrame />}
                  ></Route>
                  <Route path="/section" element={<Section />}></Route>
                  <Route path="/session" element={<Session />}></Route>
                  <Route
                    path="/department"
                    element={<DepartmentFrame />}
                  ></Route>
                  <Route
                    path="/department"
                    element={<DepartmentFrame />}
                  ></Route>
                </Routes>
              </LayoutStructure>
            </>
          );
        } else {
          return <Navigate to={"/auth"} />;
        }
      })()}
    </div>
  );
}

export default App;
