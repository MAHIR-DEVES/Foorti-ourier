import { FaBox } from 'react-icons/fa';
import { MdAddBox } from 'react-icons/md';
import { TbTableImport } from 'react-icons/tb';
import { FaFileImport } from 'react-icons/fa6';
import { MdOutlineError } from 'react-icons/md';
import Link from 'next/link';
const FloatingTab = () => {
  return (
    <div className="fixed top-[85px] left-1/2 transform -translate-x-1/2 z-10 transition-all duration-300 pl-28 ">
      <div className="bg-primary shadow-lg px-6 pt-4 pb-2 rounded-b-3xl flex gap-8 items-center ">
        <Link href="/dashboard/consignments">
          <div className="flex items-center gap-2">
            <FaBox className="text-red-500 text-sm" />
            <span className="text-sm whitespace-nowrap text-primary">
              Consignments
            </span>
          </div>
        </Link>

        <div className="h-6 w-px bg-gray-300"></div>

        <Link href="/dashboard/add-parcel">
          <div className="flex items-center gap-2">
            <MdAddBox className="text-teal-500 text-xl" />
            <span className="text-sm whitespace-nowrap text-primary">
              Add Parcel
            </span>
          </div>
        </Link>

        <div className="h-6 w-px bg-gray-300"></div>

        <Link href="/dashboard/bulk-import">
          <div className="flex items-center gap-2">
            <TbTableImport className="text-orange-500 text-lg" />
            <span className="text-sm whitespace-nowrap text-primary">
              Bulk Import
            </span>
          </div>
        </Link>

        <div className="h-6 w-px bg-gray-300"></div>

        <Link href="/dashboard/fraud-check">
          <div className="flex items-center gap-2">
            <FaFileImport className="text-yellow-500 text-md" />
            <span className="text-sm whitespace-nowrap text-primary">
              Fraud Check
            </span>
          </div>
        </Link>
        <div className="h-6 w-px bg-gray-300"></div>
        <Link href="#">
          <div className="flex items-center gap-2">
            <MdOutlineError className="text-sky-500 text-xl" />
            <span className="text-sm whitespace-nowrap text-primary">
              Support
            </span>
            <div className="h-6 w-px "></div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FloatingTab;
