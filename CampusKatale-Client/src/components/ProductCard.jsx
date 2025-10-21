import "@fontsource-variable/lexend";

function ProductCard({ 
  image, 
  title, 
  description, 
  badge, 
  buttonText, 
  href,
  rating,
  brand,
  category,
  stock,
  id 
}) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl 
      transition-all duration-300 font-[Lexend] border border-transparent 
      hover:border-[#97C040] hover:-translate-y-1"
    >
      {/* Image Section */}
      <div className="relative group">
        <img
          src={image}
          alt={title}
          className="w-full h-90 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Subtle overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D19]/40 via-transparent to-transparent opacity-70 rounded-t-2xl"></div>

        {/* Badge */}
        <div className="absolute top-3 left-3 bg-[#F8C810] text-[#0C0D19] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {badge}
        </div>

        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-3 right-3 bg-[#177529] text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <span>⭐</span>
            {rating}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col justify-between">
        <div>
          {/* Brand and Category */}
          <div className="flex justify-between items-center mb-2">
            {brand && (
              <span className="text-xs font-medium text-[#177529] bg-[#F0F7F0] px-2 py-1 rounded">
                {brand}
              </span>
            )}
            {category && (
              <span className="text-xs text-[#6B7280] capitalize">
                {category}
              </span>
            )}
          </div>

          <h3 className="text-[#0C0D19] font-semibold text-lg mb-1 line-clamp-1">
            {title}
          </h3>
          <p className="text-[#6B7280] text-sm mb-3 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Stock Information */}
          {stock !== undefined && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-[#6B7280] mb-1">
                <span>Availability:</span>
                <span className={stock > 0 ? "text-[#177529]" : "text-red-500"}>
                  {stock > 0 ? `${stock} in stock` : "Out of stock"}
                </span>
              </div>
              {stock > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-[#97C040] h-1.5 rounded-full" 
                    style={{ 
                      width: `${Math.min((stock / 50) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-2">
          <a
            href={href}
            className="text-sm font-medium bg-[#177529] hover:bg-[#97C040] text-white 
            px-4 py-2 rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={stock === 0}
          >
            {stock === 0 ? "Out of Stock" : buttonText}
          </a>

          {/* Product ID for reference */}
          <span className="text-xs text-[#6B7280]">ID: {id}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;