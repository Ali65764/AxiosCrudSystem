import { useGlobalContext } from "../../stores/GlobalContext"
import { IoMdClose } from "react-icons/io";

const DeleteModal = ({ removeUser }) => {
  const { showDelete, closeDeleteModal, deletedUser } = useGlobalContext()

  if (!showDelete) return null

  return (
    <div 
      className="w-full h-full bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 z-50 flex items-center justify-center px-4"
      onClick={closeDeleteModal}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md sm:max-w-lg md:max-w-xl h-auto sm:h-[200px] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b border-gray-400 pb-2">
          <p className="font-semibold text-blue-500 text-xl sm:text-2xl md:text-3xl">Confirm Deletion</p>
          <button onClick={closeDeleteModal} className="cursor-pointer">
            <IoMdClose className="text-2xl sm:text-3xl"/>
          </button>
        </div>

        <div className="py-4 border-b border-gray-400 text-center">
          <p className="text-blue-500 text-base sm:text-lg md:text-xl">
            Are you sure you want to delete <span className="text-red-600 font-semibold">{deletedUser?.fullName}</span>?
          </p>
        </div>

        <div className="flex justify-center gap-3 mt-4">
          <button
            className="px-6 sm:px-10 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
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
