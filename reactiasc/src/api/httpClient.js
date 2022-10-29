import axios from 'axios';
import Swal from 'sweetalert2'

export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BACKEND_URL,
  withCredentials: true,
  timeout: 20000
});


const expiredSessionModalBuilder = signoutCb => {
  return Swal.fire({
    title: "Session Expired",
    text: "Your session has expired. You will be redirected to the sign in page",
    type: "warning",
    showCancelButton: false,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes",
    closeOnConfirm: false
  }).then(() => { 
    signoutCb()
  });
}

export const initializeInterceptors = (signout) => {
  httpClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if (error?.response?.status === 401 && error?.response?.config?.url !== '/login') {
      // signout and redirect to login
      expiredSessionModalBuilder(() => signout())
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
}
    
  