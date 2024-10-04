import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-lg fixed w-full z-10 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-white text-3xl font-bold">Review Scorer</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-pink-500 transition-colors duration-300">Home</Link>
            <Link href="/about" className="text-white hover:text-pink-500 transition-colors duration-300">About</Link>
            <Link href="/contact" className="text-white hover:text-pink-500 transition-colors duration-300">Contact</Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="flex md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-pink-500 focus:outline-none">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block text-white hover:bg-pink-500 hover:text-white px-3 py-2 rounded-md transition-colors duration-300">Home</Link>
            <Link href="/about" className="block text-white hover:bg-pink-500 hover:text-white px-3 py-2 rounded-md transition-colors duration-300">About</Link>
            <Link href="/contact" className="block text-white hover:bg-pink-500 hover:text-white px-3 py-2 rounded-md transition-colors duration-300">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
