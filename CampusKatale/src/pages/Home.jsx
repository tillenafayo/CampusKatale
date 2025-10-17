import { AdCard, Scroll, Navbar } from "../components";
import { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const formattedProducts = data.products.map((product) => ({
          id: product.id,
          image: product.images[0],
          title: product.title,
          description: product.description,
          badge: `$${product.price}`,
          buttonText: "View Details",
          href: `https://dummyjson.com/products/${product.id}`,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
          <p
            className="text-indigo-400 text-lg font-semibold animate-pulse"
            role="status"
          >
            Loading products...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-900 via-red-800 to-black">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">⚠️</div>
          <p className="text-red-300 text-xl font-semibold animate-fadeIn">
            {error}
          </p>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 pt-28">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <AdCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                description={product.description}
                badge={product.badge}
                buttonText={product.buttonText}
                href={product.href}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No ads available.</p>
        )}
        <Scroll />
      </div>
    </>
  );
}

export default Home;
