import axios from 'axios'

export const api = axios.create({
    baseURL: "http://137.184.132.135:8080/api/",

    // headers: { accept: '*/*' }
})
