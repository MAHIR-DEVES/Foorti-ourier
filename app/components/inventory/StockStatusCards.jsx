
const StockStatusCards = () => {
  const cardData = [
    {
      title: "All Product",
      count: 56,
      amount: 56400,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "In Stock",
      count: 56,
      amount: 56400,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Low Stock",
      count: 56,
      amount: 56400,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Out Of Stock",
      count: 56,
      amount: 56400,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4  md:p-4 rounded-lg py-4 md:py-0">
      {cardData.map((item, index) => (
        <div
          key={index}
          className="bg-primary  rounded-md border border-gray px-4 py-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-primary">{item.title}</h3>
            <span
              className={`text-sm font-semibold px-2 py-0.5 rounded-md ${item.color}`}
            >
              {item.count}
            </span>
          </div>
          <p className="text-sm font-semibold text-primary text-center my-5">
            {item.amount} TK
          </p>
        </div>
      ))}
    </div>
  );
};

export default StockStatusCards;
