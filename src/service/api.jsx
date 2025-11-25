import axios from "axios";
const supaBaseUrl = import.meta.env.VITE_SUPABASE_URL
const supaBaseKey = import.meta.env.VITE_SUPABASE_KEY
const Api = axios.create({
    baseURL: `${supaBaseUrl}`,
    headers: {
        apikey: `${supaBaseKey}`,
        Authorization: `Bearer ${supaBaseKey}`
    }
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

export const GetUsers = () => request(Api.get("/users", {
    params: {
        select: "*"
    }
}))

export const GetSingleUsers = (id) => request(Api.get("/users", {
    params: {
        id: `eq.${id}`,
        select: "*"
    }
}))

export const AddUser = (user) => request(Api.post("/users", user, {
    headers: { Prefer: "return=minimal" }
}))

export const EditUser = (id, user) => request(Api.patch("/users", user, {
    params: { id: `eq.${id}` }
}))

export const DeleteUser = (id) => request(Api.delete("/users", {
    params: { id: `eq.${id}` }
}))
