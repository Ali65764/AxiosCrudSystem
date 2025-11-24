import { useCallback, useState } from "react"
import Layout from "../components/Layout/Layout"
import { AddUser } from '../service/api'
import { useGlobalContext } from "../stores/GlobalContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import ActionTable from "../components/ActionTable"
const initialValue = {
  fullName: "",
  email: "",
  position: "",
  age: 0
}

const AddUsers = () => {
  const [newUser, setNewUser] = useState(initialValue)
  const { loading, setLoading } = useGlobalContext()
  const navigate = useNavigate()

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setNewUser((prev) => ({
      ...prev,
      [name]: value
    }))
  }, [])


  const handleAddUser = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await AddUser(newUser)
      setNewUser(initialValue)
      toast.success("User added successfully!", { autoClose: 1000 })
      setTimeout(() => {
        setLoading(false)
        navigate("/")
      }, 1500)
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>
      <ActionTable
        user={newUser}
        actionName={"Add User"}
        onHandleChange={handleChange}
        onLoading={loading}
        onHandleUser={handleAddUser} />
    </Layout>
  )
}

export default AddUsers