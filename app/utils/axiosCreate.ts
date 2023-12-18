import axios from "axios"

const axiosCreate = (baseURL: string) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance
}

const axiosInstance = (baseUrlInternal: string, type: string) => {
  const url = baseUrlInternal + type
  return axiosCreate(url)
}

export default axiosInstance