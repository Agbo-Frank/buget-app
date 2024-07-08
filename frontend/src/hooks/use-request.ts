import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../utilities/api";
import { useStore } from "./use-store";
import { useNavigate } from "react-router-dom";

interface IResponse {
  message: string
  status: "failed" | "success",
  data: any
}


export function useRequest(url: string) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IResponse>()
  const [error, setError] = useState<IResponse>()
  const navigate = useNavigate()
  const { token, setToken } = useStore()
  
  async function makeRequest(payload: any, method: string = "post"){
    try {
      setLoading(true)

      const { data } = await axios({
        baseURL: "http://45.79.202.217:5910", url,
        method,
        data: method !== "get" ? payload : null,
        params: method === "get" ? payload : null,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token ? "Bearer " + token : ""
        }
      })
      setData(data)

      if([api.login].includes(url) && data.data && data.status === "success") {
        setToken(data.data);
      }
      if(["post", "put", "delete"].includes(method)){
        toast(data?.message, {type: data?.status === "failed" ? "error": "success"})
      }

      return data
    } catch (error) {
      if(error instanceof AxiosError){
        const data = error.response?.data

        setError(data)
        if(method !== "get"){
          toast(data?.message, {type: data?.status === "failed" ? "error": "success"})
        }
        if(error.response.status === 401) {
          setToken(null)
          return navigate("/login")
        }
        return data
      }
    }
    finally { 
      setLoading(false)
    }
  }

  return { makeRequest, loading, data, error, setData }
}