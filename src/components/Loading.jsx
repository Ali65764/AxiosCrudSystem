const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh]">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <p className="text-white text-xl mt-4">Loading...</p>
        </div>
    )
}

export default Loading