import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, CnnLogo, WatchIcon, ListenIcon, SearchIcon, ChevronDownIcon } from './icons';
import NewsTicker from './NewsTicker';

const SearchOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-start pt-20 p-4" onClick={onClose}>
      <div className="relative w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full p-4 text-lg border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-red-500" 
          autoFocus 
        />
        <button onClick={onClose} className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-3xl hover:text-red-500 transition-colors" aria-label="Close search">
          &times;
        </button>
      </div>
    </div>
  );
};

interface HeaderProps {
  onNavigateToHome: () => void;
  onNavigateToLiveTV: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToHome, onNavigateToLiveTV, onSelectCategory, activeCategory }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { label: 'Top Stories', value: 'top' },
    { label: 'US', value: 'domestic' },
    { label: 'World', value: 'world' },
    { label: 'Politics', value: 'politics' },
    { label: 'Business', value: 'business' },
    { label: 'Health', value: 'health' },
    { label: 'Entertainment', value: 'entertainment' },
  ];
  const moreNavItems = [
    { label: 'Style', value: 'lifestyle' },
    { label: 'Tech', value: 'technology' },
    { label: 'Science', value: 'science' },
    { label: 'Travel', value: 'tourism' },
  ];
  
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  const handleDummyClick = (itemName: string) => {
    alert(`Navigating to ${itemName}...`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="border-b border-gray-200 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-6">
              <button className="text-black md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
                <MenuIcon />
              </button>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToHome(); }} aria-label="CNN homepage">
                <CnnLogo />
              </a>
              <nav className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => (
                  <a 
                    key={item.value} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onSelectCategory(item.value); }} 
                    className={`text-sm font-bold hover:text-red-600 transition-colors ${activeCategory === item.value ? 'text-red-600' : ''}`}
                    >
                    {item.label}
                  </a>
                ))}
                <div className="relative" ref={moreDropdownRef}>
                  <button onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)} className="flex items-center text-sm font-bold hover:text-red-600 transition-colors" aria-haspopup="true" aria-expanded={isMoreDropdownOpen}>
                    <span>More</span>
                    <ChevronDownIcon className="ml-1 w-4 h-4" />
                  </button>
                  {isMoreDropdownOpen && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-2 py-2 w-32 z-20">
                      {moreNavItems.map(item => (
                        <a 
                            key={item.value} 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); onSelectCategory(item.value); setIsMoreDropdownOpen(false); }} 
                            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 ${activeCategory === item.value ? 'bg-gray-100 text-red-600' : ''}`}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <a href="#" onClick={(e) => { e.preventDefault(); handleDummyClick('Watch'); }} className="hidden md:flex items-center space-x-1 text-sm font-semibold hover:text-red-600">
                <WatchIcon />
                <span>Watch</span>
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleDummyClick('Listen'); }} className="hidden md:flex items-center space-x-1 text-sm font-semibold hover:text-red-600">
                <ListenIcon />
                <span>Listen</span>
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToLiveTV(); }} className="flex items-center space-x-1 text-sm font-semibold hover:text-red-600">
                <span className="text-red-600 text-xl leading-none">&bull;</span>
                <span>Live TV</span>
              </a>
              <button className="text-black hover:text-red-600" onClick={() => setIsSearchOpen(true)} aria-label="Open search">
                <SearchIcon />
              </button>
              <a href="#" onClick={(e) => { e.preventDefault(); handleDummyClick('Sign In'); }} className="px-4 py-1.5 border border-gray-400 rounded-md text-sm font-bold hover:bg-gray-100 transition-colors">
                Sign In
              </a>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-b shadow-lg transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full -mt-px'}`} style={{ zIndex: 15 }}>
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {[...navItems, ...moreNavItems].map((item) => (
                <a 
                    key={item.value} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onSelectCategory(item.value); setIsMobileMenuOpen(false); }} 
                    className={`text-sm font-bold hover:text-red-600 transition-colors py-1 ${activeCategory === item.value ? 'text-red-600' : ''}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
        </div>
        
        <NewsTicker />
      </header>
      {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
    </>
  );
};

export default Header;