import axios from "axios";

class Request {
  instance() {
    const axiosI = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const token = localStorage.getItem("token");
    if (token) {
      axiosI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return axiosI;
  }

  makeRequest(url, method, data = {}) {
    return new Promise((resolve, reject) => {
      this.instance()
        .request({
          url,
          method,
          data,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  }

  get(url) {
    return this.makeRequest(url, "get");
  }

  post(url, data) {
    return this.makeRequest(url, "post", data);
  }

  put(url, data) {
    return this.makeRequest(url, "put", data);
  }

  patch(url, data) {
    return this.makeRequest(url, "patch", data);
  }

  delete(url) {
    return this.makeRequest(url, "delete");
  }
}

const request = new Request();

export default request;
