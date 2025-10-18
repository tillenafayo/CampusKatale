import { AdCard, Scroll, Navbar, Footer } from "../components";
import { useEffect, useState } from "react";
import "@fontsource-variable/lexend";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
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
      <div className="flex items-center justify-center h-screen bg-[#F9FAFB] font-[Lexend]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-transparent border-[#177529] rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#177529] font-medium">Loading products...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-[#F9FAFB] font-[Lexend]">
        <div className="text-center text-[#177529]">
          <p className="text-lg font-semibold mb-2">⚠️ Error</p>
          <p>{error}</p>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      <main className="font-[Lexend] bg-[#F9FAFB] min-h-screen pt-28 px-6 md:px-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#0C0D19] mb-6">
          Browse Latest Listings
        </h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <AdCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[#6B7280]">No ads available.</p>
        )}
        <Scroll />
        <Footer />
      </main>
    </>
  );
}

export default Home;
