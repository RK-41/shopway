/*
  11.11.

  Register Screen
*/

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [register, { isLoading }] = useRegisterMutation();

   const { userInfo } = useSelector((state) => state.auth);

   const { search } = useLocation();
   const sp = new URLSearchParams(search);
   const redirect = sp.get('redirect') || '/';

   useEffect(() => {
      if (userInfo) {
         navigate(redirect);
      }
   }, [userInfo, redirect, navigate]);

   const submitHandler = async (ev) => {
      ev.preventDefault();

      if (password !== confirmPassword) {
         toast.error('Passwords do not match');
      } else {
         try {
            const res = await register({ name, email, password }).unwrap();

            dispatch(setCredentials({ ...res }));

            navigate(redirect);
         } catch (error) {
            toast.error(error?.data?.message || error.error);
         }
      }
   };

   return (
      <FormContainer>
         <h1>Register</h1>

         <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-3'>
               <Form.Label>Name</Form.Label>
               <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-3'>
               <Form.Label>Email</Form.Label>
               <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='my-3'>
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='my-3'>
               <Form.Label>Confirm Password</Form.Label>
               <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(ev) => setConfirmPassword(ev.target.value)}
               ></Form.Control>
            </Form.Group>

            <Button
               type='submit'
               variant='primary'
               className='mt-2'
               disabled={isLoading}
            >
               Register
            </Button>

            {isLoading && <Loader />}
         </Form>

         <Row className='py-3'>
            <Col>
               Already have an account?{' '}
               <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
                  Login
               </Link>
            </Col>
         </Row>
      </FormContainer>
   );
};

export default RegisterScreen;
