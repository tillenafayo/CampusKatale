import { useState } from "react";
import { Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import "@fontsource-variable/lexend";

function AddListing() {
  const navigate = useNavigate();
  const { getToken, userId } = useAuth();

  const STRAPI_URL = "http://localhost:1337"; 

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // go home
  const goHome = () => navigate("/");

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      setMessage({
        type: "error",
        text: "You can upload a maximum of 3 images.",
      });
      return;
    }
    setFormData({ ...formData, images: files });
  };

  // upload single image to Strapi
  const uploadImageToStrapi = async (file, token) => {
    const data = new FormData();
    data.append("files", file);

    const res = await axios.post(`${STRAPI_URL}/api/upload`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data[0].id;
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = await getToken();
      if (!token) throw new Error("Please log in to add a listing.");

      // Upload images first
      const uploadedImageIds = [];
      for (const file of formData.images) {
        const id = await uploadImageToStrapi(file, token);
        uploadedImageIds.push(id);
      }

      // Prepare listing payload
      const payload = {
        data: {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          category: formData.category,
          seller: userId,
          images: uploadedImageIds,
        },
      };

      // Create listing
      const res = await axios.post(`${STRAPI_URL}/api/listings`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200 || res.status === 201) {
        setMessage({
          type: "success",
          text: "🎉 Listing created successfully!",
        });
        setTimeout(() => navigate("/marketplace"), 1500);
      }
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.response?.data?.error?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0C0D19] font-[Lexend] p-6">
      <Navbar />
      <div className="max-w-3xl mx-auto bg-[#F8F8F8] p-8 rounded-2xl shadow-lg mt-20 transition-all duration-300">
        <h1 className="text-3xl font-semibold text-[#177529] mb-6 text-center">
          Add New Listing
        </h1>

        {/* Message Box */}
        {message.text && (
          <div
            className={`text-center py-3 px-4 mb-6 rounded-lg font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-[#97C040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#177529]"
              placeholder="Enter listing title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 border border-[#97C040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#177529]"
              placeholder="Describe your listing"
              required
            ></textarea>
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold mb-2">Price</label>
            <div className="flex items-center border border-[#97C040] rounded-lg focus-within:ring-2 focus-within:ring-[#177529]">
              <span className="px-4 text-[#177529] font-semibold bg-[#F8F8F8] rounded-l-lg">
                UGX
              </span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 rounded-r-lg focus:outline-none bg-white"
                placeholder="Enter price"
                required
                min="100"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-[#97C040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#177529]"
              required
            >
              <option value="">Select category</option>
              <option value="books">Books</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold mb-2">
              Upload Images (max 3)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                         file:bg-[#177529] file:text-white hover:file:bg-[#97C040]
                         cursor-pointer"
            />
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {formData.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-28 h-28 rounded-lg overflow-hidden border border-[#97C040]"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
              loading
                ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                : "bg-[#177529] text-white hover:bg-[#97C040]"
            }`}
          >
            {loading ? "Submitting..." : "Submit Listing"}
          </button>
        </form>

        {/* Back */}
        <div className="flex justify-center mt-6">
          <button
            onClick={goHome}
            className="px-6 py-3 rounded-xl font-semibold text-[#177529] border border-[#177529] hover:bg-[#177529] hover:text-white transition-all shadow-md"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddListing;
