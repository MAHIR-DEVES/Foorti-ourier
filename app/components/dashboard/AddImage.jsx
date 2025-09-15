import Image from "next/image";

const AddImage = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto py-5">
      {/* Mobile Image */}
      <div className="block sm:hidden">
        <Image
          src="/img/add/ad_sm.png"
          alt="Mobile Ad Banner"
          width={375}  
          height={200}  
          className="w-full h-auto"
          priority
          quality={85}  
          sizes="100vw"
        />
      </div>

      {/* Desktop Image */}
      <div className="hidden sm:block">
        <Image
          src="/img/add/ad.png"
          alt="Desktop Ad Banner"
          width={1200}  
          height={600}  
          className="w-full h-auto"
          priority
          quality={85}
          sizes="(min-width: 1024px) 1200px, 100vw"
        />
      </div>
    </div>
  );
};

export default AddImage;