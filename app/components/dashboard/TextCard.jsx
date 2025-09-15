'use client';
import Link from 'next/link';

const textCardData = [
  { label: 'Consignments', href: '/dashboard/consignments' },
  { label: 'Delivered', href: '/dashboard/consignments' },
  { label: 'Pending', href: '/dashboard/consignments' },
  { label: 'Returned', href: '/dashboard/consignments' },
  { label: 'Cancelled', href: '/dashboard/consignments' },
  { label: 'In Transit', href: '/dashboard/consignments' },
];

const TextCard = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 pt-10">
      {textCardData.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="bg-[#bbdefb] py-6 rounded-lg  transition"
        >
          <p className="text-center text-primary font-medium text-[14px]">
            {item.label}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default TextCard;
