import { IoMdClose } from "react-icons/io";
import { useGlobalContext } from "../../stores/GlobalContext";
import { useCallback } from "react";
const EditModal = ({ onHandleEdit }) => {
  const { showEdit, closeEditModal, editedUser, setEditedUser, inputFields } = useGlobalContext()

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({
      ...prev,
      [name]: value
    }))
  }, [setEditedUser])

   const handleSubmit = (e) => {
    e.preventDefault()
    onHandleEdit(editedUser.id, editedUser)
  }

  if (!showEdit || !editedUser) return null;
   
  return (
    <div className="w-full h-full bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 z-50 flex justify-center items-center px-4" onClick={closeEditModal}>
      <div onClick={(e) => e.stopPropagation()}
        className=" p-4 bg-white w-full max-w-md sm:max-w-lg md:max-w-xl h-auto sm:h-[70%] rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-between items-center border-b border-gray-300 pb-4">
          <p className="sm:text-2xl text-xl md:text-3xl font-semibold">Edit User</p>
          <button onClick={closeEditModal} className="cursor-pointer">
            <IoMdClose className="text-2xl sm:text-3xl text-gray-400" />
          </button>
        </div>

        <div className="mt-5 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            {inputFields.map((field) => (
              <div key={field.name} className="mb-4">
                <p className="mb-2 text-sm sm:text-base">{field.placeholder}</p>
                <input type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="transition-all duration-300 focus:border-blue-500  focus:shadow-[0_5px_15px_rgba(59,130,246,0.5)]  w-full py-2 px-3 outline-none rounded-md border border-gray-300"
                  onChange={handleChange}
                  value={editedUser[field.name]}
                  required />
              </div>
            ))}
            <div className="border-t border-gray-300 mt-3 flex justify-end text-white py-3">
              <button type="button" className="py-2 px-3 bg-gray-500 rounded-lg cursor-pointer hover:bg-gray-400 transition duration-500"
                onClick={closeEditModal}>Cancel</button>
              <button type="submit" className="py-2 px-3 bg-blue-600 rounded-lg ml-3 cursor-pointer hover:bg-blue-400 transition duration-500">Submit</button>
            </div>
          </form>
        </div>


      </div>
    </div>
  )
}

export default EditModal