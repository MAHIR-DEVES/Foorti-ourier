'use client';

import Link from 'next/link';
import { useState } from 'react';

const Button = () => {
  const [active, setActive] = useState('Regular');

  const buttonList = [
    { label: 'Regular', href: '/dashboard/add-parcel' },
    { label: 'Express', href: '/dashboard/add-parcel' },
  ];

  return (
    <div>
      <div className="flex gap-4 mb-5 justify-end">
        {buttonList.map(({ label, href }) => (
          <Link
            href={href}
            key={label}
            onClick={() => setActive(label)}
            className={`px-4 py-2 cursor-pointer rounded-sm text-md font-medium whitespace-nowrap 
              ${
                active === label
                  ? 'button-primary text-white'
                  : 'border border-gray text-primary'
              }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Button;
