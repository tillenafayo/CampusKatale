function AdCard({ image, title, description, badge, buttonText, href }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 truncate">{description}</p>
        <div className="flex justify-between items-center">
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">{badge}</span>
          <a
            href={href}
            className="text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded transition-colors duration-200"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdCard;
