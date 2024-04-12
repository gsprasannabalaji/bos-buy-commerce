import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import {
  Badge,
  Button,
  FormControl,
  InputGroup,
  Nav,
  Offcanvas,
} from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

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

  return (
    <>
      <Navbar sticky="top" key={expand} expand={expand} className="bg-body-tertiary mb-3">
        <Container className="gap-3 flex-nowrap">
          <Navbar.Brand onClick={() => navigate("/")}>BOSBuy</Navbar.Brand>
          <InputGroup className="w-auto flex-grow-1">
            <FormControl
              placeholder="Search for laptops"
              aria-label="Search"
              aria-describedby="search-icon"
              onChange={handleSearchChange}
              onKeyUp={handleKeyPress}
              value={searchQuery}
            />
            <Button variant="primary" onClick={handleSearchSubmit}>
              <BiSearch size={16} />
            </Button>
          </InputGroup>
          <div className="position-relative header__cart">
            <FaShoppingCart
              size={32}
              onClick={handleCartClick}
              color="grey"
              role="button"
            />
            {cartQuantitites > 0 && (
              <Badge
                bg="primary"
                className="position-absolute header__cart__badge"
                onClick={handleCartClick}
                role="button"
              >
                {cartQuantitites}
              </Badge>
            )}
          </div>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            className="flex-grow-1 flex-lg-grow-0"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Hi Prasanna
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 flex-lg-grow-0 pe-3">
                <Button variant="tertiary">Login</Button>
                {/* <Nav.Link href="#action1">Profile</Nav.Link> */}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
