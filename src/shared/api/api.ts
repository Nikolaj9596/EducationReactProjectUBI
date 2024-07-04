import axios from "axios";
import { USER_LOCLA_STORAGE_KEY } from "../const/LocalStorage";


export const $api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    authorization: localStorage.getItem(USER_LOCLA_STORAGE_KEY)
  }
})
