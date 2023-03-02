import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TeacherTable from './TeacherTable';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { postTeacher, deleteTeacher, updateTeacher } from '../states/teacher/teacherSlice';
import { getTeachers } from '../states/teacher/teacherSlice';


const Teacher = () => {


  const { teacher } = useSelector((store) => store.teacherReducer)
  const dispatch = useDispatch();
  const [isUpadate, setUpdate] = useState(false)
  const [isSucc, setSucc] = useState(false)
  const [employees, setEmployees] = useState(teacher);
  const [form, setForm] = useState({
    id: '',
    firstname: '',
    lastname: '',
    cnic: '',
    departmentid: '',
    email: '',
    mobile: ''
  })

  // const postt = () => {
  //   dispatch(postTeacher(form))
  // }
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    dispatch(getTeachers())
  }, [dispatch])




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

        dispatch(deleteTeacher(id))

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${employee.firstname} ${employee.lastname}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const employeesCopy = employees.filter(employee => employee.id !== id);
        localStorage.setItem('employees_data', JSON.stringify(employeesCopy));
        setEmployees(employeesCopy);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(postTeacher(form))
  }




  function onHandler(event) {
    const { name, value } = event.target
    setForm(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleEdit = id => {
    setUpdate(true)
    const teacher1 = teacher.filter(employee => employee._id === id);
    const teacher2 = teacher1[0]
    setForm(() => {
      return {
        id: teacher2._id,
        firstname: teacher2.firstname,
        lastname: teacher2.lastname,
        cnic: teacher2.cnic,
        departmentid: teacher2.departmentid,
        email: teacher2.email,
        mobile: teacher2.mobile
      }
    });
    setIsEditing(true);
  };


  const handleUpdate = (e) => {
    e.preventDefault()
    dispatch(updateTeacher(form))
    setSucc(true)
    setForm({
      id: '',
      firstname: '',
      lastname: '',
      cnic: '',
      departmentid: '',
      email: '',
      mobile: ''
    }

    )
    if (isSucc) { setUpdate(false) }


  }
  return (


    <div style={{ marginLeft: '280px', marginRight: '280px', marginTop: '100px' }}>

      <div style={{ width: '40%', }}>
        <Form onSubmit={isUpadate ? handleUpdate : handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>FirstName</Form.Label>
            <Form.Control type="text" placeholder="Enter name"
              value={form.firstname}
              name="firstname"
              onChange={onHandler} />

          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name"
              value={form.lastname}
              name="lastname"
              onChange={onHandler} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>CNIC</Form.Label>
            <Form.Control type="text" placeholder="CNIC"
              value={form.cnic}
              name="cnic"
              onChange={onHandler} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email"
              value={form.email}
              name="email"
              onChange={onHandler} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="text" placeholder="Mobile Number"
              value={form.mobile}
              name="mobile"
              onChange={onHandler} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>departmentid</Form.Label>
            <Form.Control type="text" placeholder="Department name"
              value={form.departmentid}
              name="departmentid"
              onChange={onHandler}
            />
          </Form.Group>









          <Button variant="primary" type="submit" style={{ width: '150px', marginTop: '10px' }} onClick={() => { }}>
            {isUpadate ? "Update" : "Add"}
          </Button>
        </Form>
      </div>

      <h1>Teacher Details</h1>
      <TeacherTable
        employees={employees}
        handleEdit={handleEdit}
        handleDelete={handleDelete}

      />







    </div>
  )
}

export default Teacher