import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { FaTrash, FaArrowLeft, FaCreditCard } from 'react-icons/fa';

function Cart() {
  const dispatch = useDispatch();
  const { cartItems, totalAmount, totalQuantity } = useSelector((state) => state.cart);

  if (cartItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="info" className="shadow-sm">
          <h4 className="mb-3">Your cart is currently empty.</h4>
          <Button as={Link} to="/" variant="dark" className="rounded-pill px-4">
            <FaArrowLeft className="me-2" /> Go Shopping
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Your Shopping Cart</h2>
        <Button variant="outline-danger" onClick={() => dispatch(clearCart())}>
          <FaTrash className="me-2" /> Clear Cart
        </Button>
      </div>

      <Row>
        {/* Left Side: Cart Items */}
        <Col lg={8}>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </Col>

        {/* Right Side: Cart Summary */}
        <Col lg={4}>
          <Card className="shadow border-0 summary-card">
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4">Order Summary</h4>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Total Items:</span>
                <strong>{totalQuantity}</strong>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold">Total Price:</h5>
                <h5 className="fw-bold text-success">${totalAmount.toFixed(2)}</h5>
              </div>

              {/* Updated: Links to Checkout Page */}
              <Button as={Link} to="/checkout" variant="dark" className="w-100 py-2 fw-bold">
                <FaCreditCard className="me-2" /> Proceed to Checkout
              </Button>
              
              <Button as={Link} to="/shop" variant="link" className="w-100 mt-2 text-muted text-decoration-none">
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
