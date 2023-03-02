import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { studentData } from './data/studentData'
import Swal from 'sweetalert2';
import StudentTable from './studentTable';


const Student = () => {
  const [employees, setEmployees] = useState(studentData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = id => {
    const [employee] = employees.filter(employee => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [employee] = employees.filter(employee => employee.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const employeesCopy = employees.filter(employee => employee.id !== id);
        localStorage.setItem('employees_data', JSON.stringify(employeesCopy));
        setEmployees(employeesCopy);
      }
    });
  };


  return (


    <div style={{ marginLeft: '280px', marginRight: '280px', marginTop: '100px' }}>

      <div style={{ width: '40%', }}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>CNIC</Form.Label>
            <Form.Control type="text" placeholder="CNIC" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Registration</Form.Label>
            <Form.Control type="text" placeholder="Registration Number" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Phone" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Code</Form.Label>
            <Form.Control type="text" placeholder="Code" />
          </Form.Group>









          <Button variant="primary" type="submit" style={{ width: '150px', marginTop: '10px' }}>
            Add
          </Button>
        </Form>
      </div>

      <h1>Student Details</h1>



      <StudentTable
        employees={employees}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />







    </div>
  )
}

export default Student