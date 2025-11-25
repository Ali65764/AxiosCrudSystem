import { useEffect, useMemo, useState } from "react"
import { GetSingleUsers } from "../service/api"
import { useParams } from "react-router-dom"
import Layout from "../components/Layout/Layout"
import { useGlobalContext } from "../stores/GlobalContext"
import Loading from "../components/Loading"

const Info = () => {
  const [userData, setUserData] = useState(null)
  const { loading, setLoading } = useGlobalContext()
  const { id } = useParams()

  const userFields = useMemo(() => [
    { key: 'fullName', label: 'Fullname', value: userData?.fullName },
    { key: 'position', label: 'position', value: userData?.position },
    { key: 'email', label: "email", value: userData?.email },
    { key: 'age', label: "age", value: userData?.age }
  ],[userData])

  const fetchSingleData = async () => {
    try {
      setLoading(true)
      const data = await GetSingleUsers(id)
      setUserData(data[0])
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchSingleData()
  }, [id])

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }
  return (
    <Layout>
      <div className="flex justify-center mt-15">
        {userData && (
          <div className="text-center bg-white rounded-md w-[90%] md:w-[45%] py-5 text-3xl">
            <p className="py-1 text-[40px] text-gray-500">{userData.fullName}'s Datas</p>
            {userFields.map((field) => (
              <p key={field.key} className="py-1">
                <span className="text-[#dc3545] font-bold">{field.label}: </span>
                {field.value}
              </p>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Info