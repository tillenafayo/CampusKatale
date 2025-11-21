import { useState, useRef, useEffect } from "react";
import { Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fontsource-variable/lexend";

function AddListing() {
  const navigate = useNavigate();
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: [],
    seller: "John Doe",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  // Go home
  const goHome = () => navigate("/");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle selected or dropped files
  const handleFiles = (files) => {
    const selectedFiles = Array.from(files).slice(0, 3);
    setFormData({ ...formData, images: selectedFiles });
  };

  // Handle drag & drop image uploads
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const handleImageChange = (e) => handleFiles(e.target.files);

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  // Upload image to Strapi
  const uploadImageToStrapi = async (file) => {
    const data = new FormData();
    data.append("files", file);
    const res = await axios.post(`${STRAPI_URL}/api/upload`, data);
    return res.data?.[0]?.id;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.price
    ) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    if (formData.images.length === 0) {
      setMessage({ type: "error", text: "Please upload at least one image." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Upload images
      const uploadedImageIds = [];
      for (const file of formData.images) {
        const id = await uploadImageToStrapi(file);
        if (id) uploadedImageIds.push(id);
      }

      // Prepare listing payload
      const payload = {
        data: {
          title: formData.title.trim(),
          description: formData.description.trim(),
          price: formData.price.toString(),
          category: formData.category || "Other",
          images: uploadedImageIds,
          seller: formData.seller,
        },
      };

      console.log("Submitting payload:", payload);

      // Create listing
      const res = await axios.post(`${STRAPI_URL}/api/listings`, payload);

      if (res.status === 200 || res.status === 201) {
        setMessage({
          type: "success",
          text: "🎉 Listing created successfully!",
        });
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.error?.message || "Failed to create listing.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Cleanup object URLs
  useEffect(() => {
    return () => formData.images.forEach((img) => URL.revokeObjectURL(img));
  }, [formData.images]);

  return (
    <div className="min-h-screen bg-white text-[#0C0D19] font-[Lexend] p-6">
      <Navbar />
      <div className="max-w-3xl mx-auto bg-[#F8F8F8] p-8 rounded-2xl shadow-lg mt-20 transition-all duration-300">
        <h1 className="text-3xl font-semibold text-[#177529] mb-6 text-center">
          Add New Listing
        </h1>

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
                type="text"
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
              <option value="Books">Books</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold mb-2">
              Upload Images (max 3)
            </label>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className={`w-full h-36 border-2 border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 bg-white"
              }`}
            >
              <p className="text-gray-500 mb-2">Drag & Drop your images here</p>
              <p className="text-gray-400 text-sm">or click to choose files</p>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {formData.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-28 h-28 rounded-lg overflow-hidden border border-green-400"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
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
