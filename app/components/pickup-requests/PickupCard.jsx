'use client'
import Image from "next/image";
import Modal from "./Modal";
import { useState } from "react";
const cardData = [
  { title: "Regular", hours:"24", icon: "/img/card-icon/card_md_plus.png" },
  { title: "Express", hours:"8", icon: "/img/card-icon/card_md_wallet.png" },
  { title: "Multiple Pickup", hours:"24", icon: "/img/card-icon/card_md_pick_req.png" },
  { title: "Pick N Drop", hours:"24", icon: "/img/card-icon/card_md_location.png" },

];

const PickupCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
  const handleCardClick = (title) => {
    if (title === "Regular") {
      setIsModalOpen(true);
    }
  };
  return (
   <div className="mt-10">
    <h1 className="text-2xl font-bold text-primary  ">
           Pickup Requests
          </h1>
     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-primary px-4 py-8 border border-gray rounded-lg cursor-pointer flex flex-col items-center "
          onClick={() => handleCardClick(card.title)}
        >
          <div className="bg-[#e0f7f9] p-2.5 rounded-xl flex items-center justify-center">
            <Image
              className="w-8 h-8"
              src={card.icon}
              alt={`${card.title} Icon`}
              width={32}
              height={32}
            />
          </div>
          <h3 className="text-md font-medium text-center pt-2 text-secondary">
            {card.title}
          </h3>
          <p className="text-md font-medium text-center pt-2 text-primary-active">  {card.hours}h</p>
        </div>
      ))}
    </div>
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
   </div>
  );
};

export default PickupCard;
