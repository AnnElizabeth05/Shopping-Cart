import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

function Home() {
  return (
    <div className="hero-section text-center d-flex align-items-center">
      <Container>
        <h1 className="display-3 fw-bold mb-3">Elevate Your Style</h1>
        <p className="lead mb-4 mx-auto" style={{ maxWidth: '600px' }}>
          Discover our exclusive collection of premium clothing and accessories, 
          curated for the modern individual.
        </p>
        <Button as={Link} to="/shop" variant="dark" size="lg" className="rounded-pill px-5 py-3 fw-bold shadow">
          Shop Now <FaArrowRight className="ms-2" />
        </Button>
      </Container>
    </div>
  );
}

export default Home;
