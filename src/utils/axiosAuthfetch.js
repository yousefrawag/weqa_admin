import axios from "axios";

const authFetch = axios.create({
    baseURL:"http://localhost:3000/api/v1" /* "http://localhost:3300/api" */,
})

authFetch.interceptors.request.use((request) => {
    request.headers.Accept = 'application/json'
    if (!(request.data instanceof FormData)) {
        request.headers['Content-Type'] = 'application/json';
      }
      const token = JSON.parse(localStorage.getItem('token')) || "" ;
    request.withCredentials = true
    request.headers.Authorization = `Bearer ${token}`
    return request
} , (error) => {
    console.log(error);
    return Promise.reject(error)
})
authFetch.interceptors.response.use((respones) => {
    console.log(respones);
    return respones
} , (error) => {
    console.log(error);

    
    return Promise.reject(error)
})
export default authFetch
