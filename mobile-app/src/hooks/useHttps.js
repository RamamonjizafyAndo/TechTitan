import axios from "axios";
import { useSelector } from "react-redux";

export const url = "http://192.168.1.148:4000"; 

// cr: "https://intent-wallaby-poorly.ngrok-free.app/api"
// ando: "http://197.215.193.31:9000/api"

const useHttps = () => {
  const user = useSelector((state) => state.user);

  const https = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const http_api = ()=>{
    const https = axios.create({
      baseURL: "https://us-central1-boulou-functions-for-devs.cloudfunctions.net/boulou_check_deviceStatus?developerId=-Nlm4dylAEVqUP6jRrOF&email=ramamonjizafymanitra06@gmail.com&deviceId=bf7f35cf2583be4b5ej9tt",
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const httpsMultipart = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: user && user.token ? user.token : "",
    },
  });

  const imgSrc = (src) => {
    if (src) {
      if (src.indexOf("https") > -1) {
        return src[0] === "/" ? src.substring(1) : src;
      } else {
        return `${url}${src}`;
      }
    }
    return "";
  };
  return {
    url,
    httpsMultipart,
    https,
    imgSrc,
  };
};

export default useHttps;
