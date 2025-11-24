import { createContext, useContext, useState } from "react";

const GlobalContext = createContext()

const GlobalContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [editedUser, setEditedUser] = useState(null)
    const [deletedUser, setDeletedUser] = useState(null)
    const [showDelete, setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const openDeleteModal = (user) => {
        setShowDelete(true)
        setDeletedUser(user)
    }

    const closeDeleteModal = () => {
        setShowDelete(false)
        setDeletedUser(null)
    }

    const openEditModal = (user) => {
        setShowEdit(true)
        setEditedUser(user)
    }

    const closeEditModal = () => {
        setShowEdit(false)
        setEditedUser(null)
    }

    const inputFields = [
        { name: "fullName", type: "text", placeholder: "Full Name" },
        { name: "position", type: "text", placeholder: "Position" },
        { name: "email", type: "email", placeholder: "Email" },
        { name: "age", type: "number", placeholder: "Age" }
    ]


    const contextValue = {
        loading,
        setLoading,
        deletedUser,
        editedUser,
        showDelete,
        showEdit,
        setShowEdit,
        setDeletedUser,
        setShowDelete,
        setEditedUser,
        closeDeleteModal,
        openDeleteModal,
        openEditModal,
        closeEditModal,
        inputFields
    }

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobalContext = () => useContext(GlobalContext)
export { GlobalContextProvider, useGlobalContext }