import React from 'react';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
  } from 'mdb-react-ui-kit';
  import Cards from '../Components/FormatCards/Cards';

function FormatDownload() {

  const formats = ['Final Report', 'FYP Idea Proposal', 'Format 3', 'Format 4'];

  return (
    <MDBCard className='d-flex justify-content-center m-5'>
      <MDBCardHeader className='fw-bold fs-2 text-center'>Format Download</MDBCardHeader>
      <MDBCardBody className='justify-content-center text-center'>
        <MDBCardTitle className='mb-2'>List of Formats</MDBCardTitle>
          {formats.map((item) => {return <Cards title={item} btn={'Download'} alert={'Downloaded'}/>} )}
      </MDBCardBody>
    </MDBCard>
  )
}

export default FormatDownload