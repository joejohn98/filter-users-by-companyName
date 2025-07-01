import React, { useEffect, useState, } from "react";
import { dummyFetch, type User } from "./data/dummyFetch";

const CompanyFilter = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await dummyFetch("https://example.com/api/users");
        if (response.status === 200) {
          setUsers(response.data)
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const uniqueCompanies = Array.from(
    new Set(users.map((user) => user.company))
  );

  const handleCompanySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
  };

  const filteredUsers = selectedCompany
    ? users.filter((user) => user.company === selectedCompany)
    : users;

  if (isLoading) {
    return <p style={styles.loading}>Loading...</p>;
  }
  if (error) {
    return <p style={styles.error}>Error: {error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Users</h2>
      <label htmlFor="company-select">Filter by Company:</label>
      <select
        value={selectedCompany}
        onChange={handleCompanySelect}
        style={{ margin: "10px 0", padding: "5px" }}
      >
        <option value="">All</option>
        {uniqueCompanies.map((company, index) => (
          <option value={company} key={index}>
            {company}
          </option>
        ))}
      </select>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredUsers.map((user, index) => (
          <li key={index} style={styles.item}>
            <p>
              <strong>Name:</strong>
              {user.name}
            </p>
            <p>
              <strong>Email:</strong>
              {user.email}
            </p>
            <p>
              <strong>Company:</strong>
              {user.company}
            </p>
            <p>
              <strong>Website:</strong>
              {user.website}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  loading: {
    color: "blue",
    fontSize: "20px",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "20px",
    fontWeight: "bold",
  },
  container: {
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  item: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    marginBottom: "10px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
};

export default CompanyFilter;
