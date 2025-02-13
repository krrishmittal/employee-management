import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa"; // Import icons

function EmployeeList({ employee, fetchEmployee }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", age: "", salary: "" });

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/employee/${id}`, { method: "DELETE" });
    fetchEmployee();
  };

  const handleEdit = (emp) => {
    setEditId(emp._id);
    setEditData({ name: emp.name, email: emp.email, age: emp.age, salary: emp.salary });
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:4000/employee/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setEditId(null);
    fetchEmployee();
  };

  return (
    <div className="employee-list-container">
      <h1>Employee List</h1>
      <div className="employee-list">
        {employee.map((emp) => (
          <div key={emp._id} className="employee-card">
            {editId === emp._id ? (
              <div className="edit-form">
                <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                <input type="text" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
                <input type="number" value={editData.age} onChange={(e) => setEditData({ ...editData, age: e.target.value })} />
                <input type="number" value={editData.salary} onChange={(e) => setEditData({ ...editData, salary: e.target.value })} />
                <div>
                  <button onClick={handleUpdate}><FaSave /> Save</button>
                  <button onClick={() => setEditId(null)}><FaTimes /> Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h1>Name: {emp.name}</h1>
                <p>Email: {emp.email}</p>
                <p>Age: {emp.age}</p>
                <p>Salary: {emp.salary}</p>
                <div>
                  <button onClick={() => handleEdit(emp)}><FaEdit /> Update</button>
                  <button onClick={() => handleDelete(emp._id)}><FaTrash /> Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;