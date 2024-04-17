import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import {
  Badge,
  Button,
  FormControl,
  InputGroup,
  Nav,
  Offcanvas,
  Dropdown,
} from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import useCookieVerifier from "../custom-hooks/useCookieVerifier";
import { setUser } from "../features/user/userSlice";

const Header = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams?.get("q") || "";
  });
  const cartQuantitites = useSelector((state) => {
    return state?.cart?.cartItems?.reduce((acc, item) => {
      return acc + item?.quantity;
    }, 0);
  });
  const [expand] = useState("lg");
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentUserDetails } = useCookieVerifier();
  const { isUserValid } = useSelector((state) => state?.user?.user);
  const isLoading = useSelector((state) => state?.loader?.isLoading);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const dispatch = useDispatch();

  const handleToggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogOut = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/user/clearCookies`,
        { withCredentials: true }
      );
      localStorage.removeItem("userDetails");
      dispatch(
        setUser({
          email: "",
          password: "",
          role: "",
          isUserValid: false,
        })
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event?.target?.value);
  };

  const handleKeyPress = (event) => {
    event.preventDefault();
    if (event?.key === "Enter") {
      navigate(`/searchResults?q=${searchQuery}`);
    }
  };

  const handleSearchSubmit = (event) => {
    navigate(`/searchResults?q=${searchQuery}`);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Navbar
        sticky="top"
        key={expand}
        expand={expand}
        className="mb-3 header__navbar"
      >
        <Container className="gap-3 flex-nowrap">
          <Navbar.Brand onClick={() => navigate("/")}>BOSBuy</Navbar.Brand>
          <div className="w-auto flex-grow-1 header__navbar__search-bar position-relative">
            <FormControl
              className="header__navbar__search-bar__input"
              placeholder="Search for laptops"
              aria-label="Search"
              aria-describedby="search-icon"
              onChange={handleSearchChange}
              onKeyUp={handleKeyPress}
              value={searchQuery}
            />
            <Button variant="primary" className="header__navbar__search-bar__cta" onClick={handleSearchSubmit}>
              <BiSearch size={16} className="header__navbar__search-bar__cta-icon" />
            </Button>
          </div>
          <div className="position-relative header__cart">
            <FaShoppingCart
              size={32}
              onClick={handleCartClick}
              color="grey"
              role="button"
            />
            {cartQuantitites > 0 && (
              <Badge
                bg="white"
                className="position-absolute header__cart__badge"
                onClick={handleCartClick}
                role="button"
              >
                {cartQuantitites}
              </Badge>
            )}
          </div>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${expand}`}
            onClick={() => {
              setShowOffcanvas(true);
            }}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            className="flex-grow-1 flex-lg-grow-0"
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
          >
            <Offcanvas.Header closeButton>
              {currentUserDetails?.userName ? (
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {`Hi ${currentUserDetails?.userName}`}
                </Offcanvas.Title>
              ) : (
                ""
              )}
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 flex-lg-grow-0 pe-3 d-none d-lg-block">
                {isUserValid ? (
                  <Dropdown
                    show={showDropdown}
                    onToggle={handleToggleDropdown}
                    className="header__dropdown"
                  >
                    <Dropdown.Toggle
                      variant="tertiary"
                      id="dropdown-basic"
                      className="header__dropdown__toggle"
                    >
                      {`Hi ${currentUserDetails?.userName}`}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => navigate("/orders")} className="header__dropdown__item">
                        Orders
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogOut} className="header__dropdown__item">
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Button
                    variant="tertiary"
                    className="header__cta--login"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                )}
              </Nav>
              <Nav className="align-items-start d-lg-none">
                {isUserValid ? (
                  <>
                    <Button
                      variant="tertiary"
                      className="header__cta--profile"
                      onClick={() => {
                        setShowOffcanvas(false);
                        navigate("/orders");
                      }}
                    >
                      My Orders
                    </Button>
                    <Button
                      variant="tertiary"
                      className="header__cta--profile"
                      onClick={() => {
                        setShowOffcanvas(false);
                        handleLogOut();
                      }}
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="tertiary"
                    className="header__cta--login"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
