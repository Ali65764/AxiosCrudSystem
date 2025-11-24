import { useGlobalContext } from "../../stores/GlobalContext"
import { IoMdClose } from "react-icons/io";
const DeleteModal = ({ removeUser }) => {
  const { showDelete, closeDeleteModal, deletedUser } = useGlobalContext()

  if (!showDelete) return null

  return (
    <div className="w-full h-full bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 z-50 "onClick={closeDeleteModal}>
      <div onClick={(e)=>e.stopPropagation()}
       className="bg-white rounded-lg shadow-lg p-4 w-[450px] h-[190px] absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between border-b border-gray-400 pb-2">
          <p className="font-semibold text-blue-500 text-[25px]">Confirm Deletion</p>
          <button onClick={closeDeleteModal} className="cursor-pointer">
            <IoMdClose className="text-2xl"/>
          </button>
        </div>

        <div className="py-4 border-b border-gray-400">
          <p className="text-blue-500 text-xl">Are you sure you want to delete <span className="text-red-600">{deletedUser?.fullName}</span> ?</p>
        </div>

        <div className="flex justify-center gap-3 mt-4">
          <button
            className="px-10 cursor-pointer py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => removeUser(deletedUser.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
