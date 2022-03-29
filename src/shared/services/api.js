import axios from "axios";
import Swal from "sweetalert2";
import store from "../redux/store";

const tenat = store.getState().tenants;
const tenantKey = tenat.tenantConfig.scheme;

const api = axios.create({
  baseURL:
    // "http://asset-v2.herokuapp.com/",
    "http://196.43.196.108:3100",
  timeout: 20000,
  // interceptors.reques
});

api.defaults.headers.get["Accept"] = "application/json"; // default header for all get request
api.defaults.headers.post["Accept"] = "application/json"; // default header for all POST request
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
api.defaults.headers["Tenant-Key"] = localStorage.getItem("tenantId");
api.defaults.headers.Authorization =
  "Bearer " + localStorage.getItem("user.usertoken");

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    Swal.fire({
      title: '<i class="pi  pi-spin pi-spinner" ></i><br>Loading',
      text: "please wait",
      // iconHtml:'<i class="pi  pi-spin pi-spinner"></i>',
      // iconColor:'blue',
      showConfirmButton: false,
    });

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    Swal.close();

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // Do something with response error

    var originalRequest = error.config;
    if (
      error.code === "ECONNABORTED" &&
      error.message.indexOf("timeout") !== -1 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return (
        axios.request(originalRequest),
        Swal.fire({
          title: "Request timeout",
          html: "<div>Try Again </div>",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        })
      );
    }

    if (error.response.status === 422) {
      Swal.fire({
        title: JSON.stringify(error.response.status),
        icon: "error",
        html: "<div>Unprocessable Entity<br/> Check Data</div>",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (error.response.status === 417) {
      Swal.fire({
        title: JSON.stringify(error.response.status),
        icon: "error",
        html: "<div>User Account Not Verified</div>",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (
      error.response.status === 409 &&
      error.config.url === "/requests"
    ) {
      Swal.fire({
        title: "Request Error",
        icon: "error",
        text: "Active request for item already exits",
        showConfirmButton: true,
      });
    } else if (
      error.response.status === 409 &&
      error.config.url === "/assets"
    ) {
      Swal.fire({
        title: "Request Error",
        icon: "error",
        html: "<div>Asset with similar info already exits<br/>Check Unique Fields</div>",
        showConfirmButton: true,
      });
    } else if (error.response.status === 409) {
      Swal.fire({
        title: JSON.stringify(error.response.status),
        icon: "error",
        html: "<div>Data Duplicate<br/> Already Exist</div>",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (error.response.status === 404) {
      Swal.fire({
        title: JSON.stringify(error.response.status),
        icon: "error",
        html: "<div>Not found<br/> Check Data </div>",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (error.response.status === 401) {
      Swal.fire({
        title: JSON.stringify(error.response.status),
        icon: "error",
        text: "Unauthorized",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (error.response.status === 400) {
      Swal.fire({
        title: JSON.stringify(error.response.status),
        icon: "error",
        html: "<div>Bad Request<br/> Check Data </div>",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (error.response.status === 408) {
      Swal.fire({
        title: JSON.stringify(error.response.status),
        icon: "error",
        text: "Request Timed Out",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (error.response.status === 500) {
      Swal.fire({
        title: JSON.stringify(error.response.status),
        icon: "error",
        html: "<div>Internal Server Error<br/> Data Validation Error</div>",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    return Promise.reject(error);
  }
);

export default api;
