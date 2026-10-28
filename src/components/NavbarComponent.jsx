import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaStore, FaUser } from 'react-icons/fa';

function NavbarComponent() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 d-flex align-items-center">
          <FaStore className="me-2" /> The Style Studio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="fs-5 me-3">Home</Nav.Link>
            <Nav.Link as={Link} to="/shop" className="fs-5 me-3">Shop</Nav.Link>
            
            {/* Profile / Order History Link */}
            <Nav.Link as={Link} to="/history" className="fs-5 me-3" title="My Orders">
              <FaUser size={20} />
            </Nav.Link>

            {/* Cart Link with Badge */}
            <Nav.Link as={Link} to="/cart" className="fs-5 position-relative">
              <FaShoppingCart size={22} />
              {totalQuantity > 0 && (
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {totalQuantity}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;



