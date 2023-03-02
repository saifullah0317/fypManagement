import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

export default function Cards(props) {
  return (
    <MDBCard className='mb-2 text-white' style={{backgroundColor:'#0047AB'}}>
      <MDBCardBody className='justify-content-around'>
        <MDBRow className='gy-2'>
          <MDBCol lg={3} sm={12}>
            <MDBCardTitle>{props.title}</MDBCardTitle>
          </MDBCol>
          <MDBCol lg={6} sm={12}>
            <MDBCardText>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </MDBCardText>
          </MDBCol>
          <MDBCol lg={3} sm={12}>
            <MDBBtn onClick={()=> alert(props.alert)}>{props.btn}</MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}