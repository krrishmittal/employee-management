import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmployeeForm({ fetchEmployee }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const response=await fetch("http://localhost:4000/employee");
    const employees = await response.json();
    const isDuplicateEmail = employees.some((emp) => emp.email === email);
    if(isDuplicateEmail) {
      toast.error("Email already exists! Please use a different email.");
      return;
    }
    const addResponse=await fetch("http://localhost:4000/employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, age, salary }),
    });
    const res = await addResponse.json();
    console.log(res);
    setName("");
    setEmail("");
    setAge("");
    setSalary("");
    fetchEmployee();
    toast.success("Employee added successfully!");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text"name="name"placeholder="Enter Employee Name"value={name}onChange={(e) => setName(e.target.value)}required
        />
        <br />
        <label>Email:</label>
        <input type="email"name="email"placeholder="Enter Employee Email"value={email}
          onChange={(e) => setEmail(e.target.value)}required
        />
        <br />
        <label>Age:</label>
        <input type="number"id="age"name="age"placeholder="Enter Employee Age"value={age}onChange={(e) => setAge(e.target.value)}required
        />
        <br />
        <label>Salary:</label>
        <input type="number"id="salary"name="salary" placeholder="Enter Employee Salary" value={salary} onChange={(e) => setSalary(e.target.value)}
        />
        <br />
        <input type="submit" value="Add Employee" />
      </form>
    </div>
  );
}

export default EmployeeForm;