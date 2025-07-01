import { useEffect, useState } from "react"
import { dummyFetch, type User } from "./data/dummyFetch"

const CompanyFilter = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("")

    useEffect(()=>{
        const fetchUsers = async () => {
            setIsLoading(true)
            try {
                const response = await dummyFetch('https://example.com/api/users')
                if(response.status === 200){
                    setUsers(response.data)
                }
            } catch (error ) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError("An unexpected error occurred.")
                }
            } finally{
                setIsLoading(false)
            }
        }
        fetchUsers()
    }, [])

  return (
    <div>
      <h2>Users</h2>
    </div>
  )
}

export default CompanyFilter
