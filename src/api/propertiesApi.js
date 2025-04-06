// EXTERNAL
import axios from "axios";

export const client = axios.create({
   baseURL: "http://localhost:8080",
});

export const listAllProperties = () => {
    return client.get("/realestate/v1/realestate")
}

export const listPropertiesToMainBanner = () => {
    return client.get("/realestate/v1/realestate/banner")
}

export const getPropertyById = (id) => {
    return client.get("/realestate/v1/realestate/" + id)
}