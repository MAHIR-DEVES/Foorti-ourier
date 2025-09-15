'use client';
import React, { useEffect, useRef, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

// Options for dropdowns
const optionsMap = {
  From: ['Dhaka'],
  Destination: ['Dhaka'],
  Category: ['Electronics', 'Clothing', 'Furniture'],
  'Service Type': ['Express', 'Standard', 'Economy'],
};

// Price mapping
const priceMap = {
  Category: {
    Electronics: 30,
    Clothing: 30,
    Furniture: 30,
  },
  'Service Type': {
    Express: 0.8,
    Standard: 1,
    Economy: 1.5,
  },
};

// Dropdown component
const Dropdown = ({ label, options, setSelected }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      <label className="block mb-1 text-md font-medium text-secondary">
        {label}
      </label>
      <button
        type="button"
        className="bg-gray-50 border border-gray-300 rounded-md w-full px-3.5 py-2.5 flex items-center justify-between cursor-pointer font-medium text-sm"
        onClick={() => setIsActive(!isActive)}
      >
        {content || `Select ${label}`}
        <IoChevronDown
          className={`${
            isActive ? 'rotate-180' : ''
          } transition-transform duration-300`}
        />
      </button>
      <div
        ref={dropdownRef}
        className={`absolute top-14 left-0 right-0 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out ${
          isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-[-1]'
        }`}
      >
        {options.map((option, index) => (
          <p
            key={index}
            className="py-2 px-4 hover:bg-gray-100 cursor-pointer transition"
            onClick={() => {
              setContent(option);
              setSelected(option);
              setIsActive(false);
            }}
          >
            {option}
          </p>
        ))}
      </div>
    </div>
  );
};

// Weight input
const WeightInput = ({ value, setValue }) => (
  <div className="w-full mt-1">
    <label className="block mb-1 text-sm font-medium text-secondary">
      Weight (KG)
    </label>
    <input
      type="number"
      min="0"
      className="w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none"
      placeholder="Enter weight in KG"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  </div>
);

// Main component
const SelectInput = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    From: '',
    Destination: '',
    Category: '',
    'Service Type': '',
  });

  const [weight, setWeight] = useState('');

  // Price calculation
  const calculatePrice = () => {
    const categoryPrice = priceMap.Category[selectedOptions.Category] || 0;
    const serviceMultiplier =
      priceMap['Service Type'][selectedOptions['Service Type']] || 1;
    const weightValue = parseFloat(weight) || 0;

    return categoryPrice * serviceMultiplier * weightValue;
  };

  return (
    <div>
      <div className="p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(optionsMap).map(([label, options]) => (
          <Dropdown
            key={label}
            label={label}
            options={options}
            setSelected={value =>
              setSelectedOptions(prev => ({ ...prev, [label]: value }))
            }
          />
        ))}
        <WeightInput value={weight} setValue={setWeight} />
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="button"
          className="bg-gray-50 border border-gray-300 rounded-md px-3.5 py-2.5 flex items-center justify-center cursor-pointer font-medium text-xl"
        >
          {calculatePrice().toFixed(2)} TK
        </button>
      </div>
    </div>
  );
};

export default SelectInput;
