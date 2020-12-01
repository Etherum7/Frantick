import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    //configure axios
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers, //WHICH AUTomatically contains all host and cookies
    });
  } else {
    return axios.create({ baseURL: "/" });
  }
};

export default buildClient;
