import "@fontsource-variable/lexend";

function AdCard({ image, title, description, badge, buttonText, href }) {
  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] hover:border-[#97C040] transition-colors duration-200 font-[Lexend]">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-[#0C0D19] font-medium text-lg mb-1">{title}</h3>
        <p className="text-[#6B7280] text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-[#177529] text-sm font-semibold bg-[#F8C810]/20 px-2 py-1 rounded">
            {badge}
          </span>
          <a
            href={href}
            className="bg-[#177529] hover:bg-[#97C040] text-white px-3 py-1 rounded text-sm transition-colors"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdCard;
