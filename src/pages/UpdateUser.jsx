import { useCallback, useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import { EditUser, GetSingleUsers } from "../service/api"
import { useNavigate, useParams } from "react-router-dom"
import { useGlobalContext } from "../stores/GlobalContext"
import { toast } from "react-toastify"
import ActionTable from "../components/ActionTable"

const initialValue = {
  fullName: "",
  position: "",
  email: "",
  age: 0
}
const UpdateUser = () => {
  const [editUser, setEditUser] = useState(initialValue)
  const { id } = useParams()
  const { loading, setLoading } = useGlobalContext()
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const data = await GetSingleUsers(id)
      setEditUser(data)
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleEditUser = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await EditUser(id, editUser)
      toast.success("User edited successfully!", { autoClose: 1000 })
      setTimeout(() => {
        navigate("/")
      }, 1500)
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setEditUser((prev) => ({
      ...prev,
      [name]: value
    }))
  }, [])

  return (
    <Layout>
      <ActionTable
        user={editUser}
        actionName={"Edit User"}
        onHandleChange={handleChange}
        onLoading={loading}
        onHandleUser={handleEditUser}/>
    </Layout>
  )
}

export default UpdateUser