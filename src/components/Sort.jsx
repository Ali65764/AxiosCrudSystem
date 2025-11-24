const Sort = ({onSortChange}) => {
    const handleChange = (e) =>{
        onSortChange(e.target.value)
    }
    const handleClick = (sortType) => {
        onSortChange(sortType)
    }
    return (
        <div>
            <div className="text-center mt-4">
                <select id="sorts" className="bg-white py-2 px-3 rounded-md cursor-pointer" onChange={handleChange}>
                    <option value="A-Z Fullname">A-Z Fullname</option>
                    <option value="Z-A Fullname">Z-A Fullname</option>
                    <option value="Low To High Age">Low To High Age</option>
                    <option value="High To Low Age">High To Low Age</option>
                </select>
            </div>
            <div className="mt-4">
                <button className="bg-blue-600 hover:bg-blue-800 transition duration-300 cursor-pointer text-white py-2 px-4 rounded-md"
                onClick={()=>handleClick('A-Z Fullname')}>
                    A-Z Fullname
                </button>
                <button className="bg-sky-400 hover:bg-sky-600 transition duration-300 cursor-pointer text-dark py-2 px-4 rounded-md ml-2"
                onClick={()=>handleClick("Z-A Fullname")}>
                    Z-A Fullname
                </button>
                <button className="bg-green-700 hover:bg-green-800 transition duration-300 cursor-pointer text-white py-2 px-4 rounded-md ml-2"
                onClick={()=>handleClick("Low To High Age")}>
                    Low To High Age
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-600 transition duration-300 cursor-pointer text-dark py-2 px-4 rounded-md ml-2"
                onClick={()=>handleClick("High To Low Age")}>
                    High To Low Age
                </button>
                <button className="bg-red-600 hover:bg-red-700 transition duration-300 cursor-pointer text-white py-2 px-4 rounded-md ml-2"
                onClick={()=>handleClick('')}>
                    Reset
                </button>
            </div>
        </div>
    )
}

export default Sort