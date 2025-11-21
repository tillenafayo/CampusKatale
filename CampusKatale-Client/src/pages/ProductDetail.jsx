// pages/ProductDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../components";
import "@fontsource-variable/lexend";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `http://localhost:1337/api/listings/${id}?populate=*`
        );
        if (!response.ok) throw new Error("Product not found");

        const data = await response.json();
        const item = data.data;

        const images =
          item.images?.map(
            (img) =>
              img.formats?.medium?.url ||
              img.formats?.small?.url ||
              img.url
          ) || [];

        setProduct({
          id: item.documentId,
          title: item.title,
          description: item.description || "No description available.",
          price: item.price,
          category: item.category,
          seller: item.seller,
          images,
        });

        setActiveImage(images[0]); // ✅ Set default image
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-[#F9FAFB] font-[Lexend]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-transparent border-[#177529] rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#177529] font-medium">
            Loading product details...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-[#F9FAFB] font-[Lexend]">
        <div className="text-center text-[#177529]">
          <p className="text-lg font-semibold mb-2">⚠️ Error</p>
          <p>{error}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-[#177529] text-white rounded-lg hover:bg-[#135c21] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />

      <main className="font-[Lexend] bg-[#F9FAFB] min-h-screen pt-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="mb-8 px-4 py-2 text-[#177529] hover:underline transition"
          >
            ← Back to listings
          </button>

          {product && (
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {/* ✅ Image Gallery Section */}
                <div className="flex flex-col items-center">
                  <img
                    src={activeImage}
                    alt={product.title}
                    className="w-full h-[320px] object-cover rounded-lg mb-4 transition-all duration-300"
                  />

                  {product.images.length > 1 && (
                    <div className="flex gap-3 flex-wrap justify-center">
                      {product.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                            img === activeImage
                              ? "border-[#177529]"
                              : "border-transparent hover:border-[#97C040]"
                          }`}
                          onClick={() => setActiveImage(img)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* ✅ Product Details Section */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-[#0C0D19] mb-2">
                      {product.title}
                    </h1>
                    <p className="text-[#177529] font-medium text-lg mb-4">
                      UGX {product.price}
                    </p>
                    <p className="text-[#6B7280] mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="space-y-1 text-sm text-[#0C0D19]/70">
                      <p>
                        <span className="font-semibold text-[#0C0D19]">
                          Category:
                        </span>{" "}
                        {product.category || "Uncategorized"}
                      </p>
                      <p>
                        <span className="font-semibold text-[#0C0D19]">
                          Seller:
                        </span>{" "}
                        {product.seller || "Anonymous"}
                      </p>
                    </div>
                  </div>

                  <button className="mt-8 px-6 py-3 bg-[#177529] text-white rounded-lg hover:bg-[#135c21] transition-colors font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </main>
    </>
  );
}

export default ProductDetail;
