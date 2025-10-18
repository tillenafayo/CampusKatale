import { IconBrandInstagram, IconBrandTwitter, IconBrandFacebook, IconMail } from "@tabler/icons-react";
import "@fontsource-variable/lexend";

function Footer() {
  return (
    <footer className="bg-[#177529] text-white font-[Lexend] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Logo & About */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">CampusKatale</h2>
          <p className="text-sm text-[#E5E7EB] leading-relaxed">
            A trusted campus marketplace where students buy, sell, and trade essentials safely within their community.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-medium mb-3 text-[#F8C810]">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-[#97C040] transition">Home</a></li>
            <li><a href="/about" className="hover:text-[#97C040] transition">About Us</a></li>
            <li><a href="/categories" className="hover:text-[#97C040] transition">Categories</a></li>
            <li><a href="/contact" className="hover:text-[#97C040] transition">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Help */}
        <div>
          <h3 className="text-lg font-medium mb-3 text-[#F8C810]">Help & Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-[#97C040] transition">FAQ</a></li>
            <li><a href="/terms" className="hover:text-[#97C040] transition">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-[#97C040] transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 4: Social */}
        <div>
          <h3 className="text-lg font-medium mb-3 text-[#F8C810]">Connect</h3>
          <div className="flex items-center gap-4 mb-4">
            <a href="#" className="hover:text-[#97C040]"><IconBrandInstagram size={22} /></a>
            <a href="#" className="hover:text-[#97C040]"><IconBrandTwitter size={22} /></a>
            <a href="#" className="hover:text-[#97C040]"><IconBrandFacebook size={22} /></a>
            <a href="mailto:info@campuskatale.com" className="hover:text-[#97C040]">
              <IconMail size={22} />
            </a>
          </div>
          <p className="text-sm text-[#E5E7EB]">info@campuskatale.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 text-center py-4 text-sm text-[#E5E7EB]">
        © {new Date().getFullYear()} CampusKatale — A Product of KCF Frontend Cohort-9.
      </div>
    </footer>
  );
}

export default Footer;
