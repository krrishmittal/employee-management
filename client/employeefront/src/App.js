import React, { useEffect, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

function App() {
  const [employee, setEmployee] = useState([]);

  const fetchEmployee = async () => {
    const response = await fetch("http://localhost:4000/employee");
    const data = await response.json();
    setEmployee(data);
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <div className="app-container">
      <div className="employee-form-container">
        <h1>Add An Employee</h1>
        <EmployeeForm fetchEmployee={fetchEmployee} />
      </div>
      <EmployeeList employee={employee} fetchEmployee={fetchEmployee} />
      <ToastContainer /> 
    </div>
  );
}

export default App;