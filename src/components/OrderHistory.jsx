import { Container, Card, Table, Badge, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaArrowLeft } from 'react-icons/fa';

function OrderHistory() {
  const orderHistory = useSelector((state) => state.cart.orderHistory);
  const userDetails = useSelector((state) => state.cart.userDetails);

  if (orderHistory.length === 0) {
    return (
      <Container className="py-5 text-center">
        <div className="mb-4 text-muted">
          <FaBoxOpen size={80} />
        </div>
        <h3 className="fw-bold">No Order History</h3>
        <p className="text-muted">You haven't placed any orders yet.</p>
        <Button as={Link} to="/shop" variant="dark" className="rounded-pill px-4 mt-3">
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Orders</h2>
        <Button as={Link} to="/shop" variant="outline-dark" size="sm">
          <FaArrowLeft className="me-2" /> Back to Shop
        </Button>
      </div>

      {userDetails && (
        <div className="mb-4 p-3 bg-light rounded shadow-sm">
          <h6 className="fw-bold mb-1">Shipping To:</h6>
          <p className="mb-0 text-muted small">
            {userDetails.fullName} | {userDetails.email} | {userDetails.address}, {userDetails.city} - {userDetails.zipCode}
          </p>
        </div>
      )}

      {orderHistory.map((order) => (
        <Card key={order.orderId} className="mb-4 shadow-sm border-0">
          <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center">
            <div>
              <strong>Order ID:</strong> {order.orderId} <br />
              <small className="text-light opacity-75">Placed on: {order.date}</small>
            </div>
            <Badge bg="success" className="fs-6">Delivered</Badge>
          </Card.Header>
          <Card.Body>
            <Table responsive borderless className="mb-0">
              <thead>
                <tr className="border-bottom">
                  <th>Product</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-end">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img src={item.image} alt={item.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px', marginRight: '10px' }} />
                        {item.title}
                      </div>
                    </td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end">${item.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end mt-3 pt-3 border-top">
              <h5 className="fw-bold">Total Paid: <span className="text-success">${order.totalAmount.toFixed(2)}</span></h5>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default OrderHistory;
