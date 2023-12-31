/**
   29.10.

   Header Component

   08.11.
      Cart Items Count in Header

   11.11.
      Profile Link for Logged-in Users in Header
      User Logout Implementation

   15.11.
      Dropdown Menu for Admin Added

   17.11.
      Search Functionality Added
 */

import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaStar } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';
import SearchBox from './SearchBox';

const Header = () => {
   const { cartItems } = useSelector((state) => state.cart);
   const { userInfo } = useSelector((state) => state.auth);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [logoutApiCall] = useLogoutMutation();

   const logoutHandler = async () => {
      try {
         await logoutApiCall().unwrap();

         dispatch(logout());

         dispatch(resetCart());

         navigate('/');
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <header>
         <Navbar bg='primary' variant='dark' expand='md' collapseOnSelect>
            <Container>
               <LinkContainer to='/'>
                  <Navbar.Brand>
                     <FaStar className='mb-1 mx-1' />
                     ShopWay
                  </Navbar.Brand>
               </LinkContainer>

               <Navbar.Toggle aria-controls='basic-navbar-nav' />

               <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='ms-auto'>
                     <SearchBox />

                     <LinkContainer to='/cart'>
                        <Nav.Link>
                           <FaShoppingCart className='mb-1 mx-1' />
                           Cart
                           {cartItems.length > 0 && (
                              <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                                 {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                              </Badge>
                           )}
                        </Nav.Link>
                     </LinkContainer>

                     {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                           <LinkContainer to='/profile'>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                           </LinkContainer>

                           <NavDropdown.Item onClick={logoutHandler}>
                              Logout
                           </NavDropdown.Item>
                        </NavDropdown>
                     ) : (
                        <LinkContainer to='/login'>
                           <Nav.Link href='/login'>
                              <FaUser className='mb-1 mx-1' />
                              Sign In
                           </Nav.Link>
                        </LinkContainer>
                     )}

                     {userInfo && userInfo.isAdmin && (
                        <NavDropdown title='Admin' id='adminmenu'>
                           <LinkContainer to='admin/productlist'>
                              <NavDropdown.Item>Products</NavDropdown.Item>
                           </LinkContainer>

                           <LinkContainer to='admin/userlist'>
                              <NavDropdown.Item>Users</NavDropdown.Item>
                           </LinkContainer>

                           <LinkContainer to='/admin/orderlist'>
                              <NavDropdown.Item>Orders</NavDropdown.Item>
                           </LinkContainer>
                        </NavDropdown>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   );
};

export default Header;
