import { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { products } from '../data/products';
import ProductCard from './ProductCard';

function ProductList() {
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Combined logic for Category Filter + Search Bar
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5">Our Collection</h2>
        <p className="text-muted lead">Discover premium quality clothing and accessories.</p>
      </div>

      {/* Search Bar and Category Filter Row */}
      <Row className="mb-4 align-items-center">
        <Col md={6} className="mb-3 mb-md-0">
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0">
              <FaSearch className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search for products..."
              className="border-start-0 ps-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
        
        <Col md={6} className="d-flex justify-content-md-end justify-content-center">
          <ButtonGroup>
            <Button variant={category === 'All' ? 'dark' : 'outline-dark'} onClick={() => setCategory('All')}>All</Button>
            <Button variant={category === 'Men' ? 'dark' : 'outline-dark'} onClick={() => setCategory('Men')}>Men</Button>
            <Button variant={category === 'Women' ? 'dark' : 'outline-dark'} onClick={() => setCategory('Women')}>Women</Button>
            <Button variant={category === 'Accessories' ? 'dark' : 'outline-dark'} onClick={() => setCategory('Accessories')}>Accessories</Button>
          </ButtonGroup>
        </Col>
      </Row>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-muted">No products found matching your search.</h5>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ProductList;

