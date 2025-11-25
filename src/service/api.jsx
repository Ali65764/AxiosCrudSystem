import axios from "axios";

const Api = axios.create({
    baseURL: "https://zbpyterunbsgmpxznipq.supabase.co/rest/v1",
    headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicHl0ZXJ1bmJzZ21weHpuaXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNjUxNjQsImV4cCI6MjA3OTY0MTE2NH0.W6OqB7YpVGSXK1Q-iKIKAh6LmDjAfO3ErJ6s-rTFOXQ",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicHl0ZXJ1bmJzZ21weHpuaXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNjUxNjQsImV4cCI6MjA3OTY0MTE2NH0.W6OqB7YpVGSXK1Q-iKIKAh6LmDjAfO3ErJ6s-rTFOXQ`
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
