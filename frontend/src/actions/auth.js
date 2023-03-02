import * as api from "../api";

export const login =
  (profileData, history, setSnackbarSeverity, setSnackbar, setAlertText, setLoading) =>
  async (dispatch) => {
    setLoading(true)
    try {
      // Sign in the user
      console.log(profileData);
      const { data } = await api.login(profileData);
      if (data?.message) {
        setSnackbar(true);
        setLoading(false)
        setSnackbarSeverity("error");
        setAlertText(data?.message);
      } else {
        setSnackbar(true);
        setLoading(false)
        setSnackbarSeverity("success");
        setAlertText(data?.response);
        console.log(data)
        dispatch({ type: "AUTH", data });
        setTimeout(function () {
          history("/home");
        }, 500);
      }
    } catch (error) {
      setSnackbar(true);
      setLoading(false)
      setSnackbarSeverity("error");
      setAlertText("Something went wrong");
      console.log(error.message);
    }
  };
export const logout =
  (navigate) =>
  async (dispatch) => {
    dispatch({ type: "LOGOUT"});
          navigate("/auth");
  };

 


export const register =
  (profileData, location, setSnackbarSeverity, setSnackbar, setAlertText, setLoading, setAuthType) =>
  async (dispatch) => {
    setLoading(true)
    try {
      // Sign in the user

      const { data } = await api.register(profileData);
      console.log(data);
      if (data?.message) {
        setSnackbar(true);
        setLoading(false)
        setSnackbarSeverity("error");
        setAlertText(data?.message);
      } else {
        setSnackbar(true);
        setLoading(false)

        setSnackbarSeverity("success");
        setAlertText(data?.response);
        dispatch({ type: "AUTH", data });

        setTimeout(function () {
          setAuthType(false)
        }, 500);
        
        // location('/')
      }
    } catch (error) {
      setSnackbar(true);
      setLoading(false)

      setSnackbarSeverity("error");
      setAlertText("Something went wrong");
      console.log(error.message);
    }
  };




  export const verifyEmailForgetPassword =
  (email,  setSnackbarSeverity, setSnackbar, setAlertText, setLoading, setIsSentEmail) =>
  async (dispatch) => {
    setLoading(true)
    try {
      
      const { data } = await api.verifyEmailForForgetPassword(email);
      if (data?.message) {
        setSnackbar(true);
        setLoading(false)
        setSnackbarSeverity("error");
        setAlertText(data?.message);
        setIsSentEmail(false)
        console.log(data?.message)
      } else {
        setSnackbar(true);
        setLoading(false)
        setSnackbarSeverity("success");
        setAlertText(data?.response);
        setIsSentEmail(true)
        console.log(data?.response)
      }
    } catch (error) {
      setSnackbar(true);
      setLoading(false)
      setSnackbarSeverity("error");
      setIsSentEmail(false)
      setAlertText("Something went wrong");
      console.log(error.message);
    }
  };



  export const changePassword =
  (passswordData,setPasswordData, token , setSnackbarSeverity, setSnackbar, setAlertText, setLoading, setIsUpdated, navigate) =>
  async (dispatch) => {
    setLoading(true)
    try {
      
      const { data } = await api.changePasswordAPI(passswordData,token);
      if (data?.message) {
        setSnackbar(true);
        setLoading(false)
        setSnackbarSeverity("error");
        setAlertText(data?.message);
        setIsUpdated(false)
        console.log(data?.message)
      } else {
        setSnackbar(true);
        setLoading(false)
        setSnackbarSeverity("success");
        setAlertText(data?.response);
        setIsUpdated(true)
        setPasswordData({password: '', confirmPassword: ''})
        console.log(data?.response)
        navigate('/auth/changepassword/Updated')

      }
    } catch (error) {
      setSnackbar(true);
      setLoading(false)
      setIsUpdated(false)
      setSnackbarSeverity("error");
      setAlertText("Something went wrong");
      console.log(error.message);
    }
  };



  export const verifyToken =
  (token , setIsTokenVerified, setSnackbarSeverity, setSnackbar, setAlertText, setLoading) =>
  async (dispatch) => {
    // setLoading(true)
    try {

      console.log(token)
      
      const { data } = await api.verifyTokenAPI(token);
      if (data?.token) {
        // setSnackbar(true);
        // setLoading(false)
        // setSnackbarSeverity("error");
        // setAlertText(data?.message);
        setIsTokenVerified(2)
        console.log(data)
      } 
    } catch (error) {
      // setSnackbar(true);
      // setLoading(false)
      // setSnackbarSeverity("error");
      // setAlertText("Something went wrong");
      setIsTokenVerified(3)
      console.log(error);
    }
  };



