import React, { useState, useRef, useEffect } from 'react';

export default function Dropdown({ options, value, onChange, placeholder, icon, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={placeholder || "Selecionar opção"}
        className={`flex items-center space-x-3 bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
      >
        {icon && (
          <img 
            src={icon} 
            alt=""
            className="w-4 h-4 object-contain"
          />
        )}
        <span className="text-sm font-medium">{selectedOption?.label || placeholder}</span>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          role="listbox"
          className="absolute top-full left-0 mt-1 w-full max-w-[10rem] bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-auto"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
                value === option.value ? 'bg-purple-50 text-purple-600 font-medium' : 'text-gray-900'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

