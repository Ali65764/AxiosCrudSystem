import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:3000/users"
})

const request = async (promise) => {
    try {
        const { data } = await promise
        return data
    }
    catch (err) {
        console.log("Api error", err);
        throw err;
    }
}

export const GetUsers = () => request(Api.get('/'))

export const GetSingleUsers = (id) => request(Api.get(`/${id}`))

export const AddUser = (user) => request(Api.post('/', user))

export const EditUser = (id, user) => request(Api.put(`/${id}`, user))

export const DeleteUser = (id) => request(Api.delete(`/${id}`)) 


