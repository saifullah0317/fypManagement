import React from 'react'
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBBtn,
  MDBFile
} from 'mdb-react-ui-kit';

function FormatUpload() {
  return (
    <div>
      <MDBCard className='d-flex justify-content-center m-5'>
      <MDBCardHeader className='fw-bold fs-2 text-center'>Format Upload</MDBCardHeader>
      <MDBCardBody className='justify-content-center text-center'>
        <MDBFile label='Upload the file' size='lg' id='formFileLg' />
        <MDBBtn className='m-2'>Upload</MDBBtn>
      </MDBCardBody>
    </MDBCard>
    </div>
  )
}

export default FormatUpload