import React, { useEffect, useState, type ReactHTMLElement } from "react";
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
          setUsers(response.data);
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

  const uniqueCompanies = Array.from(new Set(users.map(user => user.company)));

  const handleCompanySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
  }

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
     {uniqueCompanies.map((company, index) =>(
        <option value={company} key={index}>{company}</option>
     ))}
      </select>
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
};

export default CompanyFilter;
