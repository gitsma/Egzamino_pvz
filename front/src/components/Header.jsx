import { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";

import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/authSlice";
import { selectedCategory } from "../features/selectCatSlice";
import { getCategories, resete } from "../features/categoriesSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories, isError, message } = useSelector(
    (state) => state.categories
  );

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getCategories());
    return () => {
      dispatch(resete());
    };
  }, [isError, message, dispatch, navigate]);

  // console.log(categories);

  return (
    <div>
      {categories !== undefined && categories.length > 0 ? (
        <>
          {["md"].map((expand) => (
            <Navbar key={expand} expand={expand} bg="dark" data-bs-theme="dark">
              <Container fluid>
                <Link
                  className="ink-offset-2 link-underline link-underline-opacity-0"
                  to="/"
                >
                  <Navbar.Brand to="/">Skelbimai</Navbar.Brand>
                </Link>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      Meniu
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="me-auto">
                      <NavDropdown title="Kategorijos" id="basic-nav-dropdown">
                        <NavDropdown.Item
                          onClick={() => dispatch(selectedCategory("All"))}
                        >
                          Visi
                        </NavDropdown.Item>
                        {categories.map((cat, index) => (
                          <NavDropdown.Item
                            key={index}
                            onClick={() => dispatch(selectedCategory(cat._id))}
                          >
                            {cat.name}
                          </NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    </Nav>
                    <Nav className="me-auto">
                      <Link className="nav-link ms-2" to="/admin">
                        Mano Profilis
                      </Link>
                    </Nav>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <ul className="d-flex m-0">
                        {user ? (
                          <button
                            className="btn btn-outline-light border-0 text-secondary-emphasis"
                            onClick={onLogout}
                          >
                            <FaSignOutAlt /> Logout
                          </button>
                        ) : (
                          <>
                            <li className="m-2 list-group">
                              <Link
                                className="ink-offset-2 link-underline link-underline-opacity-0 text-secondary-emphasis"
                                to="/Login"
                              >
                                <FaSignInAlt />
                                Login
                              </Link>
                            </li>
                            <li className="m-2 list-group">
                              <Link
                                className="ink-offset-2 link-underline link-underline-opacity-0 text-secondary-emphasis"
                                to="/Register"
                              >
                                <FaUser />
                                Register
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </>
      ) : (
        <>
          {["md"].map((expand) => (
            <Navbar key={expand} expand={expand} bg="dark" data-bs-theme="dark">
              <Container fluid>
                <Link
                  className="ink-offset-2 link-underline link-underline-opacity-0"
                  to="/"
                >
                  <Navbar.Brand to="/">Skelbimai</Navbar.Brand>
                </Link>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      Meniu
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="me-auto">
                      <Nav.Link className="text-light ms-5" disabled>
                        Kategoriju nera
                      </Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <ul className="d-flex m-0">
                        {user ? (
                          <button
                            className="btn btn-outline-light border-0"
                            onClick={onLogout}
                          >
                            <FaSignOutAlt /> Logout
                          </button>
                        ) : (
                          <>
                            <li className="m-2 list-group">
                              <Link
                                className="ink-offset-2 link-underline link-underline-opacity-0 text-secondary-emphasis "
                                to="/Login"
                              >
                                <FaSignInAlt />
                                Login
                              </Link>
                            </li>
                            <li className="m-2 list-group">
                              <Link
                                className="ink-offset-2 link-underline link-underline-opacity-0 text-secondary-emphasis"
                                to="/Register"
                              >
                                <FaUser />
                                Register
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </>
      )}
    </div>
  );
};

export default Header;
