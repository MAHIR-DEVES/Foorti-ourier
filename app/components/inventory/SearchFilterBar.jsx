import { FiSearch } from "react-icons/fi";
const categories = ["Electronics", "Clothing", "Books", "Groceries"];
const SearchFilterBar = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3  md:p-4 rounded-lg">
      <div className="flex items-center border border-gray rounded px-3 py-2 bg-primary">
        <FiSearch className="text-secondary text-lg mr-2" />
        <input
          type="text"
          placeholder="Search by /SKU/Product Name"
          className="w-full text-sm text-secondary bg-transparent font-medium focus:outline-none"
        />
      </div>

      <select className="border border-gray rounded px-3 py-2 bg-primary text-sm font-medium text-primary focus:outline-none w-full cursor-pointer">
        <option value="">Filter By Category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilterBar;
