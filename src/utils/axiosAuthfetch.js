import axios from "axios";

const authFetch = axios.create({
    baseURL:"https://weqa-admin.vercel.app/api/v1" /* "http://localhost:3300/api" */,
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
authFetch.interceptors.response.use(
    (respones) => {
        console.log(respones);
        return respones;
      },
      (error) => {
    if(error?.response?.status === 401){
      localStorage.clear()
    
      setTimeout(() => {
        window.location.href = "/auth/signin";
      }, 2000)
      
      console.log("Token expired, redirecting to login...")
    }
    
        return Promise.reject(error);
      }
)
export default authFetch
