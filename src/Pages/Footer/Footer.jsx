import React from "react";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10 px-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">Master Chef</h2>
          <p className="mt-3 text-sm text-gray-400">
            Serving delicious dishes with passion and love.  
            Taste the difference at Master Chef Restaurant.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/menu" className="hover:text-white">Menu</NavLink></li>
            <li><NavLink to="/about" className="hover:text-white">About Us</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-white">Contact</NavLink></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16}/> 123 Food Street, Cairo, Egypt
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16}/> +20 123 456 789
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16}/> info@masterchef.com
            </li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white"><Facebook size={20}/></a>
            <a href="#" className="hover:text-white"><Instagram size={20}/></a>
            <a href="#" className="hover:text-white"><Twitter size={20}/></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-2 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Master Chef. All Rights Reserved.
      </div>
    </footer>
  );
}
