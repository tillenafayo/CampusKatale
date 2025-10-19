// pages/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar, Footer, ProductCard } from '../components';
import "@fontsource-variable/lexend";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-[#F9FAFB] font-[Lexend]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-[#177529] rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-[#177529] font-medium">Loading product details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen bg-[#F9FAFB] font-[Lexend]">
      <div className="text-center text-[#177529]">
        <p className="text-lg font-semibold mb-2">⚠️ Error</p>
        <p>{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-[#177529] text-white rounded-lg hover:bg-[#135c21]"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="font-[Lexend] bg-[#F9FAFB] min-h-screen pt-28 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/')}
            className="mb-6 px-4 py-2 text-[#177529] hover:underline"
          >
            ← Back to listings
          </button>
          
          {product && (
            <ProductCard
              id={product.id}
              image={product.images?.[0]}
              title={product.title}
              description={product.description}
              badge={`$${product.price}`}
              buttonText="Add to Cart"
              rating={product.rating}
              brand={product.brand}
              category={product.category}
              stock={product.stock}
            />
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}

export default ProductDetail;