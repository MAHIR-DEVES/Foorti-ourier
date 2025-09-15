import {
  FaRegClone,
  FaRedoAlt,
  FaTh,
  FaChevronDown,
  FaDownload,
} from "react-icons/fa";
const categories = ["Electronics", "Clothing", "Books", "Groceries"];
export default function ActionBar() {
  return (
    <div className="flex items-center justify-between gap-2 md:gap-0  py-3 md:py-0 md:p-4 rounded ">
      <div className="relative">
        <select className="border border-gray rounded px-3 py-2 bg-primary text-sm font-medium text-primary focus:outline-none w-full cursor-pointer">
          <option value="">Export Selected</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex space-x-2">
        <button className="p-2 border border-gray bg-primary rounded cursor-pointer">
          <FaRegClone />
        </button>
        <button className="p-2 border border-gray bg-primary rounded cursor-pointer">
          <FaRedoAlt />
        </button>
        <button className="p-2 border border-gray bg-primary rounded cursor-pointer">
          <FaTh />
        </button>
        <button className="p-2 border border-gray bg-primary rounded cursor-pointer">
          <FaChevronDown />
        </button>
        <button className="p-2 border border-gray bg-primary rounded cursor-pointer">
          <FaDownload />
        </button>
      </div>
    </div>
  );
}
