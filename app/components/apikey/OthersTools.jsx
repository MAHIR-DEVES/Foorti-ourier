"use client";
import Image from "next/image";

const pluginData = [
  {
    id: 1,
    title: "WordPress Plugin",
    image: "/img/wp_logo.png",
    downloadLink: "#",
  },
  {
    id: 2,
    title: "Shopify Plugin",
    image: "/img/shopyfy.png",
    downloadLink: "#",
  },
];

const OthersTools = () => {
  return (
    <div className="flex flex-wrap items-center gap-5 my-5">
      {pluginData.map((plugin) => (
        <div
          key={plugin.id}
          className=" w-full md:w-1/3 border border-gray-200 rounded-lg shadow-sm"
        >
          <div className="bg-gray-100 p-4 rounded-t-md">
            <Image
              src={plugin.image}
              alt={plugin.title}
              width={120}
              height={60}
            />
          </div>

          <div className="p-4 ">
            <h2 className="text-lg font-semibold text-primary">
              {plugin.title}
            </h2>
            <a
              href={plugin.downloadLink}
              className="inline-block mt-3 px-4 py-1 border border-gray text-primary-active rounded  transition"
            >
              Download
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OthersTools;