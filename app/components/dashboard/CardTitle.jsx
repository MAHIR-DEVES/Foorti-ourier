
const CardTitleData = [
    "Consignments",
    "Delivered",
    "Pending",
    "Returned",
   
  ];
  
  const CardTitle = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-10">
        {CardTitleData.map((item, index) => (
          <div key={index} className="border border-gray bg-primary py-6 rounded-lg">
            <p className="text-center font-semibold text-[16px] text-primary">{item}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default CardTitle;
  