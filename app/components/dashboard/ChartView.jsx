import Image from "next/image";

const performanceData = [
  {
    title: "Delivery Performance",
    buttonText: "view graph",
    imageSrc: "/img/chart-view/performance.png",
  },
  {
    title: "Parcel Summary",
    buttonText: "view summary",
    imageSrc: "/img/chart-view/parcel.png",
  },
];

const ChartView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
      {performanceData.map((item, index) => (
        <div
          key={index}
          className="md:flex justify-between gap-3 px-5 py-6 md:py-10 bg-primary border border-gray rounded-md"
        >
          <div className="md:block">
            <h2 className="text-[20px] text-primary md:text-[24px] font-semibold whitespace-nowrap">
              {item.title}
            </h2>
            <button className="hidden md:block text-[14px] font-medium capitalize button-primary px-3 py-2.5  mt-2 rounded-md cursor-pointer">
              {item.buttonText}
            </button>
          </div>

          <div className="flex items-center justify-between mt-4 md:mt-0 md:block">
            <button className="md:hidden text-[14px] font-medium capitalize button-primary px-3 py-2.5  rounded-md cursor-pointer">
              {item.buttonText}
            </button>
            <div className="md:mt-3">
              <Image
                className="w-32 md:w-52"
                src={item.imageSrc}
                alt={item.title}
                width={208}
                height={125}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChartView;
