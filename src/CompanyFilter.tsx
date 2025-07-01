import { useState } from "react"
import type { User } from "./data/dummyFetch"

const CompanyFilter = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("")

  return (
    <div>
      <h2>Users</h2>
    </div>
  )
}

export default CompanyFilter
