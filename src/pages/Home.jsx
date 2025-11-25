import { useCallback, useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import { DeleteUser, EditUser, GetUsers } from '../service/api'
import { useGlobalContext } from "../stores/GlobalContext"
import { useNavigate } from "react-router-dom"
import DeleteModal from "../components/Modal/DeleteModal"
import { toast } from "react-toastify"
import EditModal from "../components/Modal/EditModal"
import Sort from "../components/Sort"
import Loading from '../components/Loading'
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
        <Loading/>
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
      <div className="flex flex-col items-center mt-3 px-4 sm:px-6 lg:px-8">
        <p className="text-white text-xl sm:text-2xl mb-4">User List</p>


        <div className="w-full max-w-6xl mb-4 text-center">
          <Sort onSortChange={handleChangeSort} />
        </div>


        <div className="hidden lg:block w-full max-w-6xl overflow-x-auto">
          <table className="w-full table-auto mt-4 min-w-[800px]">
            <thead className="text-[18px] sm:text-[22px]">
              <tr className="bg-white">
                <th className="py-2 px-2">S.No</th>
                <th className="py-2 px-2">FullName</th>
                <th className="py-2 px-2">Age</th>
                <th className="py-2 px-2">Email</th>
                <th className="py-2 px-2">Position</th>
                <th className="py-2 px-2">Update</th>
                <th className="py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUser.map((user, index) => (
                <tr key={index} className={`${index % 2 == 0 ? "bg-[#f2f2f2]" : "bg-[#ffffff]"} text-center`}>
                  <td className="py-2 px-2 text-[16px] sm:text-[18px]">{index + 1}</td>
                  <td className="py-2 px-2 text-[16px] sm:text-[18px]">{user.fullName}</td>
                  <td className="py-2 px-2 text-[16px] sm:text-[18px]">{user.age}</td>
                  <td className="py-2 px-2 text-[16px] sm:text-[18px] truncate max-w-[200px]" title={user.email}>
                    {user.email}
                  </td>
                  <td className="py-2 px-2 text-[16px] sm:text-[18px]">{user.position}</td>
                  <td className="py-2 px-2">
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        className="cursor-pointer bg-[#0d6efd] hover:bg-blue-700 transition duration-300 py-2 px-3 rounded-md text-white text-sm sm:text-base"
                        onClick={() => openEditModal(user)}
                      >
                        Modal
                      </button>
                      <button
                        className="cursor-pointer bg-[#0d6efd] hover:bg-blue-700 transition duration-300 py-2 px-3 rounded-md text-white text-sm sm:text-base"
                        onClick={() => navigate(`/UpdateUser/${user.id}`)}
                      >
                        Page
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        className="cursor-pointer bg-[#dc3545] hover:bg-red-700 transition duration-300 py-2 px-3 rounded-md text-white text-sm sm:text-base"
                        onClick={() => openDeleteModal(user)}
                      >
                        Delete
                      </button>
                      <button
                        className="cursor-pointer bg-[#0dcaf0] hover:bg-sky-400 transition duration-300 py-2 px-3 rounded-md text-white text-sm sm:text-base"
                        onClick={() => navigate(`/info/${user.id}`)}
                      >
                        Info
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="lg:hidden w-full max-w-2xl space-y-4 mt-4">
          {sortedUser.map((user, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-md p-4 ${index % 2 === 0 ? "bg-[#f2f2f2]" : "bg-white"}`}>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="col-span-2 flex justify-between items-center border-b pb-2 mb-2">
                  <span className="font-semibold text-lg">{user.fullName}</span>
                  <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                    #{index + 1}
                  </span>
                </div>

                <div>
                  <span className="font-medium text-gray-600">Age:</span>
                  <p className="text-base">{user.age}</p>
                </div>

                <div>
                  <span className="font-medium text-gray-600">Position:</span>
                  <p className="text-base">{user.position}</p>
                </div>

                <div className="col-span-2">
                  <span className="font-medium text-gray-600">Email:</span>
                  <p className="text-base truncate" title={user.email}>{user.email}</p>
                </div>

                <div className="col-span-2 border-t pt-3 mt-2">
                  <span className="font-medium text-gray-600 block mb-2">Update:</span>
                  <div className="flex gap-2 mb-3">
                    <button className="cursor-pointer flex-1 bg-[#0d6efd] hover:bg-blue-700 transition duration-300 py-2 px-2 rounded-md text-white text-sm"
                      onClick={() => openEditModal(user)}>
                      Modal
                    </button>
                    <button className="cursor-pointer flex-1 bg-[#0d6efd] hover:bg-blue-700 transition duration-300 py-2 px-2 rounded-md text-white text-sm"
                      onClick={() => navigate(`/UpdateUser/${user.id}`)}>
                      Page
                    </button>
                  </div>

                  <span className="font-medium text-gray-600 block mb-2">Actions:</span>
                  <div className="flex gap-2">
                    <button className="cursor-pointer flex-1 bg-[#dc3545] hover:bg-red-700 transition duration-300 py-2 px-2 rounded-md text-white text-sm"
                      onClick={() => openDeleteModal(user)}>
                      Delete
                    </button>
                    <button className="cursor-pointer flex-1 bg-[#0dcaf0] hover:bg-sky-400 transition duration-300 py-2 px-2 rounded-md text-white text-sm"
                      onClick={() => navigate(`/info/${user.id}`)}>
                      Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedUser.length === 0 && (
          <div className="text-white text-xl text-center mt-8">
            No users found.
          </div>
        )}
      </div>
      <DeleteModal removeUser={handleDelete} />
      <EditModal onHandleEdit={handleEdit} />
    </Layout>
  )
}

export default Home