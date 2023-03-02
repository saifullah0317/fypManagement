import React from 'react';
import './css/table.css'
import { useSelector } from 'react-redux';

const TeacherTable = ({ handleEdit, handleDelete }) => {
  const { teacher } = useSelector((store) => store.teacherReducer)
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>ID</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {teacher ? (
            teacher.map((tech, i) => (
              <tr key={tech._id}>
                <td>{i + 1}</td>
                <td>{tech.firstname}</td>
                <td>{tech.lastname}</td>
                <td>{tech.email}</td>
                <td>{tech.departmentid}</td>
                {/* <td>{tech._id}</td> */}
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(tech._id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(tech._id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
