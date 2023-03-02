import express from 'express'
const router = express.Router()
import {login,register, confirmMail, verifyToken, verifyEmail,changePassword } from '../controllers/users.js'
import { postIdea, getIdeas, editAdminFields } from '../controllers/PostIdeaController.js';
import {addMember, getMembers} from '../controllers/groupingController.js'
import { getQuery, postQuery } from '../controllers/queryController.js'

import { getTeacher, postTeacher, deleteTeacher, updateTeacher } from "../controllers/teacher.js";
import { getStudent, postStudnet, updateStudent, deleteStudent } from "../controllers/student.js";
import { getCommitie, postCommitie, deleteCommitie, updateCommitie } from "../controllers/commitie.js";
import { getDepartment, deleteDepartment, updateDepartment, postDepartment } from "../controllers/department.js";
import { getSession, postSession, deleteSession, updateSession } from "../controllers/session.js";
import { getSection, postSection, deleteSection, updateSection } from "../controllers/section.js";
import { getCommitteeMember, postCommitteeMember, deleteCommitteeMember, updateCommitteeMember } from "../controllers/committeeMember.js";


router.post('/auth/login',login)
router.post('/auth/register',register)
router.get('/user/confirm/:token',confirmMail)
router.get('/auth/verifyForgetPasswordEmail/:email',verifyEmail)
router.put('/auth/changePassword/:token',changePassword)
router.get('/auth/tokenVerification/:token',verifyToken)


// Grouping Routes
router.post('/group/addMember',addMember)
router.get('/group/getMembers/:email',getMembers)



//department(DONE)
router.get("/getdepartments", getDepartment)
router.post("/postdepartment", postDepartment)
router.delete("/deletedepartment/:id", deleteDepartment)
router.put("/updatedepartment/:id", updateDepartment)


//session
router.get("/getsessions", getSession)
router.post("/postsession", postSession)
router.delete("/deletesession/:id", deleteSession)
router.put("/updatesession/:id", updateSession)


//section
router.get("/getsections", getSection)
router.post("/postsection", postSection)
router.delete("/deletesection/:id", deleteSection)
router.put("/updatesection/:id", updateSection)


//Teacher Routes
router.get("/getteachers", getTeacher)
router.post("/postteacher", postTeacher)
router.delete("/deleteteacher/:id", deleteTeacher)
router.put("/updateteacher/:id", updateTeacher)


//Students Routes(DONE)
router.get("/getstudents", getStudent)
router.post("/poststudent", postStudnet)
router.delete("/deletestudent/:id", deleteStudent)
router.put("/updatestudent/:id", updateStudent)


//Commitie Routes(DONE)
router.get("/getcommities", getCommitie)
router.post("/postcommitie", postCommitie)
router.delete("/deletecommitie/:id", deleteCommitie)
router.put("/updatecommitie/:id", updateCommitie)

//committee Groups
router.get("/getcommitteemembers", getCommitteeMember)
router.post("/postcommitteemember", postCommitteeMember)
router.delete("/deletecommitteemember/:id", deleteCommitteeMember)
router.put("/updatecommitteemember/:id", updateCommitteeMember)




// Ideas Routes
router.post('/viewIdeas/postIdea', postIdea);
router.get('/viewIdeas', getIdeas);
router.put('/viewIdeas', editAdminFields);
router.get("/filter-ideas", getIdeas)

// Queries Routes
router.post('/postQuery', postQuery);
router.get('/viewQuery', getQuery);

export default router