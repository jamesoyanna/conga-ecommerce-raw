import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import { AppDispatch } from "../store";
import { ReduxState } from "../types/ReduxState";
import SearchBox from "./SearchBox";
import AdImage from '../assets/ad.jpg';
import Logo from '../assets/conga-logo.png';

interface Props {}

/**
 * Header component
 */
const Header = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { userInfo } = useSelector((state: ReduxState) => state.userLogin);

  /**
   * Logs a user out of the application
   */
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <img height="75px"src={AdImage}  alt="advert" />
      <div style={{padding: "15px"}}></div>
      <Navbar style={{background:"#e90580", height:"70px"}} variant="dark" expand="lg" collapseOnSelect>

        <Container>
        
          <LinkContainer to="/">
            <Navbar.Brand>
            <img src={Logo}  alt="advert" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">
            <Nav.Link>
            <i className="fa fa-question-circle"></i>
            </Nav.Link>
            <Nav.Link>
                  Help
                </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                <LinkContainer to="/login">
                  <Nav.Link style={{ color: "white" }}>
                    Sign In
                  </Nav.Link>
                </LinkContainer>
                <span style={{ margin: "px 0", color: "white" }}> / </span>
                 <LinkContainer to="/register">
                 <Nav.Link style={{ color: "#fff" }}>
                  Signup
                 </Nav.Link>
               </LinkContainer>
               <LinkContainer to="/cart" style={{ justifyContent:"center", background: "#33b27b", color:"#fff", height:"2.5rem", borderRadius:"0.125rem",  padding: "0.9375rem 1.25rem" }}>
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>My Cart
                </Nav.Link>
              </LinkContainer>
               </>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
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
