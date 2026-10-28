import { Card, Button, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { FaCartPlus } from 'react-icons/fa';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card className="h-100 shadow-sm border-0 product-card">
      <div className="image-wrapper">
        <Card.Img variant="top" src={product.image} className="product-image" />
        <Badge bg="dark" className="category-badge">{product.category}</Badge>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold fs-5">{product.title}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          Premium quality {product.title.toLowerCase()} perfect for your wardrobe.
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h5 className="mb-0 fw-bold text-dark">${product.price.toFixed(2)}</h5>
          <Button variant="dark" size="sm" onClick={handleAddToCart} className="rounded-pill px-3">
            <FaCartPlus className="me-2" /> Add
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
