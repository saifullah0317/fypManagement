import React from 'react';
import './css/table.css'
import { useSelector } from 'react-redux';


const StudentTable = ({  handleEdit, handleDelete }) => {
const { student } = useSelector((store) => store.studentReducer)


  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
        {/*       id: 8,
      firstName: 'Jesica',
      lastName: 'Watlington',
      email: 'jesica@example.com',
      cnic: '60000',
      mobile: '2019-10-10',
      code: 'none',
      password: 'none',
      registration: '2020-CS-110' */}
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>CNIC</th>
            <th>Mobile</th>
            <th>Code</th>
            <th>Password</th>
            <th>Registration No.</th>

            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
        {/* firstName: 'Lyndsey',
    lastName: 'Follette',
    email: 'lyndsey@example.com',
    cnic: '110000',
    mobile: '2020-01-15',
    department: 'Computer Science' */}
          {student.length > 0 ? (
            student.map((studentx, i) => (
              <tr key={studentx.id}>
                <td>{i + 1}</td>
                <td>{studentx.firstName}</td>
                <td>{studentx.lastName}</td>
                <td>{studentx.email}</td>
                <td>{formatter.format(studentx.cnic)}</td>
                <td>{studentx.mobile} </td>
                <td>{studentx.code} </td>
                <td>{studentx.password} </td>
                <td>{studentx.RegistrationNo} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(studentx.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(studentx.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : ( 
            <tr>
              <td colSpan={7}>No student</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
