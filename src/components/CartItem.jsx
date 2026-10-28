import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/cartSlice';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <Card className="mb-3 shadow-sm border-0 cart-item-card">
      <Card.Body className="d-flex align-items-center">
        <img src={item.image} alt={item.title} className="cart-item-image me-4" />
        
        <div className="flex-grow-1">
          <h5 className="fw-bold mb-1">{item.title}</h5>
          <p className="text-muted mb-0">Price: ${item.price.toFixed(2)}</p>
        </div>

        <div className="d-flex align-items-center me-4">
          <ButtonGroup size="sm">
            <Button variant="outline-dark" onClick={() => dispatch(decreaseQuantity(item.id))}>
              <FaMinus />
            </Button>
            <Button variant="outline-dark" disabled className="text-dark fw-bold">
              {item.quantity}
            </Button>
            <Button variant="outline-dark" onClick={() => dispatch(increaseQuantity(item.id))}>
              <FaPlus />
            </Button>
          </ButtonGroup>
        </div>

        <div className="text-end" style={{ minWidth: '100px' }}>
          <h5 className="fw-bold text-success mb-2">${item.totalPrice.toFixed(2)}</h5>
          <Button variant="outline-danger" size="sm" onClick={() => dispatch(removeFromCart(item.id))}>
            <FaTrash className="me-1" /> Remove
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CartItem;
