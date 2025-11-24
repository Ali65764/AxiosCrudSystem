import { useCallback, useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import { DeleteUser, EditUser, GetUsers } from '../service/api'
import { useGlobalContext } from "../stores/GlobalContext"
import { useNavigate } from "react-router-dom"
import DeleteModal from "../components/Modal/DeleteModal"
import { toast } from "react-toastify"
import EditModal from "../components/Modal/EditModal"
import Sort from "../components/Sort"
const Home = () => {
  const [users, setUsers] = useState([])
  const [sortOrder, setSortOrder] = useState("A-Z Fullname")

  const { loading, setLoading, openDeleteModal, closeDeleteModal, openEditModal, closeEditModal } = useGlobalContext()
  const navigate = useNavigate()

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const data = await GetUsers()
      setUsers(data)
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])


  const handleDelete = async (userId) => {
    try {
      await DeleteUser(userId)
      toast.success("User deleted successfully!", { autoClose: 1500 })
      fetchData()
      closeDeleteModal()
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleEdit = async (id, editUser) => {
    try {
      await EditUser(id, editUser)
      toast.success("User edited successfully!", { autoClose: 1500 })
      fetchData()
      closeEditModal()
    }
    catch (err) {
      console.log(err);
    }
  }
  if (loading) {
    return (
      <div>
        <Layout />
        <div className="flex justify-center items-center mt-5">
          <p className="text-5xl text-white">Loading...</p>
        </div>
      </div>
    )
  }

  const handleChangeSort = (sortType) => {
    setSortOrder(sortType)
  }
  
  const sortedUser = [...users].sort((a, b) => {
    switch (sortOrder) {
      case "A-Z Fullname":
        return a.fullName.localeCompare(b.fullName);
      case "Z-A Fullname":
        return b.fullName.localeCompare(a.fullName);
      case "Low To High Age":
        return a.age - b.age;
      case "High To Low Age":
        return b.age - a.age;
      default:
        return 0;
    }
  })
  return (
    <Layout>
      <div className="flex flex-col items-center mt-3">
        <p className="text-white text-xl">User List</p>
        <Sort onSortChange={handleChangeSort} />
        <table className="w-[75%] table-auto mt-4">
          <thead className="text-[22px]">
            <tr className="bg-white">
              <th className="py-2">S.No</th>
              <th className="py-2">FullName</th>
              <th className="py-2">Age</th>
              <th className="py-2">Email</th>
              <th className="py-2">Position</th>
              <th className="py-2">Update</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUser.map((user, index) => (
              <tr key={index} className={`${index % 2 == 0 ? "bg-[#f2f2f2]" : "bg-[#ffffff]"} text-center`}>
                <td className="py-2 text-2xl">{index + 1}</td>
                <td className="py-2 text-2xl">{user.fullName}</td>
                <td className="py-2 text-2xl">{user.age}</td>
                <td className="py-2 text-2xl">{user.email}</td>
                <td className="py-2 text-2xl">{user.position}</td>
                <td className="py-2 text-white">
                  <button className="bg-[#0d6efd] hover:bg-blue-700 transition duration-300 py-2 px-3 rounded-md cursor-pointer hover"
                    onClick={() => openEditModal(user)}>
                    Modal
                  </button>
                  <button className="bg-[#0d6efd] hover:bg-blue-700 transition duration-300 py-2 px-3 rounded-md ml-2 cursor-pointer"
                    onClick={() => navigate(`/UpdateUser/${user.id}`)}>
                    Page
                  </button>
                </td>
                <td className="py-2 text-white">
                  <button className="bg-[#dc3545] hover:bg-red-700 transition duration-300 py-2 px-3 rounded-md cursor-pointer"
                    onClick={() => openDeleteModal(user)}>
                    Delete
                  </button>
                  <button className="bg-[#0dcaf0] hover:bg-sky-400 transition duration-300 py-2 px-3 rounded-md ml-2 cursor-pointer"
                    onClick={() => navigate(`/info/${user.id}`)}>
                    Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteModal removeUser={handleDelete} />
      <EditModal onHandleEdit={handleEdit} />
    </Layout>
  )
}

export default Home