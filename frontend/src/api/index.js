import axios from 'axios'

const API = axios.create({baseURL:'http://localhost:8080/auth'})
const baseAPI = axios.create({baseURL:'http://localhost:8080'})

export const login = (authData) =>API.post('/login',authData)
export const verifyEmailForForgetPassword = (email) =>API.get(`/verifyForgetPasswordEmail/${email}`)
export const changePasswordAPI = (passwordData,token) =>API.put(`/changePassword/${token}`,passwordData )
export const verifyTokenAPI = (token) =>API.get(`/tokenVerification/${token}` )
export const register = (regdata) =>API.post('/register',regdata)



// Grouping APIs
export const addMember = (email,memberEmail) =>baseAPI.post('/group/addMember',{email,memberEmail})
export const getMembers = (email) =>baseAPI.get(`/group/getMembers/${email}`)



