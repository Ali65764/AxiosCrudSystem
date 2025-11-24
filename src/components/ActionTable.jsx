import { useGlobalContext } from "../stores/GlobalContext"

const ActionTable = ({user,actionName,onHandleChange,onLoading,onHandleUser}) => {
    const {inputFields} = useGlobalContext()
    return (
        <div className="flex justify-center items-center flex-col">
            <p className="text-white my-4 text-xl">{actionName}</p>
            <form className="bg-[#ced4da] w-[90%] md:w-[50%] rounded-md text-center py-5 border border-blue-600" onSubmit={onHandleUser}>
                {inputFields.map((field) => (
                    <div key={field.name}>
                        <input type={field.type}
                            placeholder={field.placeholder}
                            name={field.name}
                            className="bg-white p-2 my-2 rounded-md w-[75%] border border-blue-600 outline-none"
                            value={user[field.name]}
                            onChange={onHandleChange}
                            required
                        />
                    </div>
                ))}
                <button className="bg-[#0d6efd] w-[75%] text-white rounded-md p-2 text-xl my-3 cursor-pointer">
                    {onLoading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default ActionTable