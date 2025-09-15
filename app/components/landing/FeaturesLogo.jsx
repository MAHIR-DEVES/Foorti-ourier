import Image from "next/image";

const logoData = [
  {
    type: "title",
    text: "TOP ENTERPRISES",
    alt: "Top Enterprises Section",
  },
  {
    type: "logo",
    logo: "/img/landing/color-logo-6.png",
    alt: "RANGS",
    name: "RANGS",
  },
  {
    type: "logo",
    logo: "/img/landing/color-logo-3.png",
    alt: "claraz",
  },
  {
    type: "logo",
    logo: "/img/landing/color-logo-7.png",
    alt: "ojler@sap",
  },
  {
    type: "title",
    text: "TOP SMES",
    alt: "Top SMEs Section",
  },
  {
    type: "logo",
    logo: "/img/landing/color-logo-3.png",
    alt: "othoba",
  },
  {
    type: "logo",
    logo: "/img/landing/color-logo-7.png",
    alt: "SME 2",
  },
  {
    type: "logo",
    logo: "/img/landing/color-logo-6.png",
    alt: "SME 3",
  },
];

const FeaturesLogo = () => {
  return (
    <section className="bg-primary py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-8 gap-4 items-center">
          {logoData.map((item, i) => {
            if (item.type === "title") {
              return (
                <div
                  key={i}
                  className="col-span-4 md:col-span-1 flex items-center justify-start md:justify-center"
                >
                  <h3 className="text-lg font-bold md:font-normal text-secondary  whitespace-nowrap">
                    {item.text}
                  </h3>
                </div>
              );
            } else {
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="relative h-12 w-28">
                    <Image
                      src={item.logo}
                      alt={item.alt}
                      fill
                      className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      sizes="(max-width: 768px) 80px, 120px"
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesLogo;
