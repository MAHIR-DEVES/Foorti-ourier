import Image from "next/image";
import { useTranslations } from "next-intl";

const services = [
  {
    image: "/img/landing/factory.png",
    alt: "Industry-leading tech",
  },
  {
    image: "/img/landing/credit-card.png",
    alt: "Content Marketing",
  },
  {
    image: "/img/landing/good-feedback.png",
    alt: "Web Development",
  },
  {
    image: "/img/landing/security.png",
    alt: "Secure handling",
  },
  {
    image: "/img/landing/problem-solving.png",
    alt: "Fastest solutions",
  },
  {
    image: "/img/landing/coverage.png",
    alt: "Multimedia coverage",
  },
];

const ServiceCard = ({ image, alt, title, description }) => (
  <div className="p-8 h-full flex flex-col items-center text-center shadow-md hover:shadow-lg transition-all duration-300 rounded-lg">
    <div className="relative w-16 h-16 mb-6">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 64px, 80px"
      />
    </div>
    <h3 className="text-xl font-bold mb-3 text-primary">{title}</h3>
    <p className="text-secondary">{description}</p>
  </div>
);

const ServicesSection = () => {
  const t = useTranslations("homePage.featuresSection");

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {t("title")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              image={service.image}
              alt={service.alt}
              title={t(`features.${index}.title`)}
              description={t(`features.${index}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
