'use client'
import React, { useState } from "react";
import CardIcon from "../components/dashboard/CardIcon";
import CardTitle from "../components/dashboard/CardTitle";
import TextCard from "../components/dashboard/TextCard";
import AddImage from "../components/dashboard/AddImage";
import ChartView from "../components/dashboard/ChartView";
import PickupRequestModal from "../components/dashboard/PickupRequestModal";
import PaymentRequestModal from "../components/dashboard/PaymentRequestModal";

const DashbordPage = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); 

  const handleCardClick = (title) => {
    if (title === "Pickup Request") {
      setActiveModal("pickup");
      setIsModalOpen(true);
    } else if (title === "Payment Request") {
      setActiveModal("payment");
      setIsModalOpen(true);
    } else {
      
      setIsModalOpen(false);
      setActiveModal(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveModal(null);
  };


  return (
    <div>
      <CardIcon onCardClick={handleCardClick}/>
      {activeModal === "pickup" && (
        <PickupRequestModal isOpen={isModalOpen} onClose={closeModal} />
      )}
      {activeModal === "payment" && (
        <PaymentRequestModal isOpen={isModalOpen} onClose={closeModal} />
      )}
      <TextCard />
      {/* <CardTitle /> */}
      <AddImage />
      <ChartView />
    </div>
  );
};

export default DashbordPage;
