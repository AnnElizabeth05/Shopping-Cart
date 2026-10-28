import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveUserDetails, addOrderToHistory, clearCart } from '../redux/cartSlice';
import { FaUser, FaMapMarkerAlt, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalAmount, totalQuantity } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderDetails = {
      orderId: "ORD-" + Math.floor(Math.random() * 1000000),
      date: new Date().toLocaleDateString(),
      items: [...cartItems],
      totalAmount: totalAmount,
      totalQuantity: totalQuantity,
      shippingDetails: formData
    };

    // Save to Redux
    dispatch(saveUserDetails(formData));
    dispatch(addOrderToHistory(orderDetails));
    
    // Clear Cart and Navigate
    dispatch(clearCart());
    alert(`Order Placed Successfully!\nOrder ID: ${orderDetails.orderId}`);
    navigate('/history');
  };

  if (cartItems.length === 0) {
    return <Container className="py-5 text-center"><h3>Your cart is empty. Cannot checkout.</h3></Container>;
  }

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4 text-center">Secure Checkout</h2>
      <Row className="g-4">
        
        {/* Left Side: Shipping Form */}
        <Col lg={7}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3"><FaMapMarkerAlt className="me-2 text-primary"/> Shipping Details</h5>
              <Form onSubmit={handlePlaceOrder}>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label><FaUser className="me-1"/> Full Name</Form.Label>
                      <Form.Control type="text" name="fullName" required onChange={handleChange} placeholder="John Doe" />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label><FaEnvelope className="me-1"/> Email</Form.Label>
                      <Form.Control type="email" name="email" required onChange={handleChange} placeholder="john@example.com" />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label><FaPhone className="me-1"/> Phone</Form.Label>
                      <Form.Control type="tel" name="phone" required onChange={handleChange} placeholder="1234567890" />
                    </Form.Group>
                  </Col>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text" name="address" required onChange={handleChange} placeholder="123 Main St" />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" name="city" required onChange={handleChange} placeholder="New York" />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control type="text" name="zipCode" required onChange={handleChange} placeholder="10001" />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="dark" type="submit" className="w-100 mt-3 py-2 fw-bold">
                  <FaLock className="me-2" /> Place Order (${totalAmount.toFixed(2)})
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Side: Order Summary */}
        <Col lg={5}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">Order Summary</h5>
              <ul className="list-unstyled">
                {cartItems.map(item => (
                  <li key={item.id} className="d-flex justify-content-between mb-2 border-bottom pb-2">
                    <span>{item.title} <strong>x{item.quantity}</strong></span>
                    <span>${item.totalPrice.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between mt-3">
                <h5 className="fw-bold">Total:</h5>
                <h5 className="fw-bold text-success">${totalAmount.toFixed(2)}</h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
