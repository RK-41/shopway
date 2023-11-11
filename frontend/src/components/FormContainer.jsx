/*
  11.11.

  Form Container Component
*/

import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
	return (
		<Container>
			<Row className='justify-content-md-center'>
				<Col xs={12} md={6}>
					{children}
					{/* <h1>test</h1> */}
				</Col>
			</Row>
		</Container>
	);
};

export default FormContainer;
