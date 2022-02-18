import axios from "axios";
import Swal from "sweetalert2";
//  const tenant_key = props.tenantConfig.key
const api = axios.create({
  baseURL:
    // "http://asset-v2.herokuapp.com/",
    "http://196.43.196.108:3345",
  timeout: 20000,
  // interceptors.reques
});

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
    }

    return Promise.reject(error);
  }
);

export default api;
