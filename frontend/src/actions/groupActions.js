import * as api from "../api";

export const addMember =
  (
    email,
    memberEmail,
    setMemberEmail,
    getAllMembers,
    setSnackbarSeverity,
    setSnackbar,
    setAlertText,
    setLoading
  ) =>
  async (dispatch) => {
    setLoading(true)
    try {
      // Sign in the user
      console.log(email + " -- " + memberEmail);
      const { data } = await api.addMember(email, memberEmail);
      console.log(data)
      if (data?.message) {
        setSnackbar(true);
        setLoading(false)
        setSnackbarSeverity("error");
        setAlertText(data?.message);
        setMemberEmail('')
        console.log(data);
    } else {
        setSnackbar(true);
        setLoading(false)
        setSnackbarSeverity("success");
        setAlertText(data?.response);
        setMemberEmail('')
        getAllMembers(email)
        console.log(data);
      }
    } catch (error) {
        setSnackbar(true);
        setLoading(false)
        setSnackbarSeverity("error");
        setMemberEmail('')
        setAlertText("Something went wrong");
      console.log(error.message);
    }
  };

export const getMembers =
  (
    email,
    history,
    setSnackbarSeverity,
    setSnackbar,
    setAlertText,
    setLoading
  ) =>
  async (dispatch) => {
    try {
      console.log("Entered");
      const { data } = await api.getMembers(email);
      console.log(data);

        if(data?.result){
            dispatch(dispatch({ type: "LIST_MEMBERS", data }))
        }
        
    } catch (error) {}
  };
